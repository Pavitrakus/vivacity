"""
test_pipeline.py
────────────────
Standalone test for the Vivacity animator pipeline.
Runs every step (script → audio → manim code → render → merge → concat)
without needing the FastAPI server or auth layer.

Usage:
    python test_pipeline.py
Output:
    outputs/<job_id>.mp4   (local file)
    Supabase public URL    (printed at the end)
"""

import os, sys, uuid, json, re, asyncio, subprocess, tempfile, shutil
from pathlib import Path

# ── load .env ──────────────────────────────────────────────────────────────────
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent / ".env")

import anthropic
from openai import AsyncOpenAI

from prompts import (
    SCRIPT_SYSTEM_PROMPT_ENGLISH,
    MANIM_PORTRAIT_PROMPT,
    VOICE_ENGLISH,
    VOICE_INSTRUCTIONS_ENGLISH,
)
import storage

# ── Config ────────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY = (os.getenv("ANTHROPIC_API_KEY") or "").strip().strip('"').strip("'")
OPENAI_API_KEY    = (os.getenv("OPENAI_API_KEY") or "").strip().strip('"').strip("'")
CLAUDE_MODEL      = (os.getenv("CLAUDE_MODEL") or "claude-opus-4-7").strip().strip('"').strip("'")

QUESTION = "Why does time slow down near a Black Hole? (Time Dilation Explained)"
FORMAT   = "portrait"
LANG     = "english"
USER_ID  = "test_user"

OUTPUT_DIR = Path(__file__).parent / "outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

PYTHON_EXE  = sys.executable

def _find_exe(name):
    import shutil as _sh
    found = _sh.which(name)
    if found:
        return found
    if sys.platform == "win32":
        scripts = Path(sys.executable).parent
        for c in [scripts / f"{name}.exe", scripts / name]:
            if c.exists():
                return str(c)
    raise FileNotFoundError(f"Cannot find '{name}' — install it and add to PATH.")

FFMPEG_EXE  = _find_exe("ffmpeg")
FFPROBE_EXE = _find_exe("ffprobe")

MIKTEX_BIN = os.getenv(
    "MIKTEX_BIN",
    r"C:\Users\kushw\AppData\Local\Programs\MiKTeX\miktex\bin\x64"
)

def _configure_miktex():
    exe = Path(MIKTEX_BIN) / "initexmf.exe"
    if exe.exists():
        subprocess.run([str(exe), "--set-config-value", "[MPM]AutoInstall=1"],
                       capture_output=True, timeout=15)

if sys.platform == "win32":
    _configure_miktex()

# ── Helpers ───────────────────────────────────────────────────────────────────

def _build_env():
    env = os.environ.copy()
    if sys.platform == "win32" and MIKTEX_BIN:
        env["PATH"] = f"{MIKTEX_BIN};{Path(FFMPEG_EXE).parent};{env.get('PATH','')}"
    return env

def _get_duration(path: Path) -> float:
    r = subprocess.run(
        [FFPROBE_EXE, "-v", "quiet", "-print_format", "json", "-show_format", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(json.loads(r.stdout)["format"]["duration"])

# ── Step 1: Script ─────────────────────────────────────────────────────────────

async def generate_script(question: str) -> dict:
    print("\n[1/6] Generating script...")
    client = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY)
    resp = await client.messages.create(
        model=CLAUDE_MODEL, max_tokens=4096, temperature=1,
        system=SCRIPT_SYSTEM_PROMPT_ENGLISH,
        messages=[{"role": "user", "content": f"Create a video script for:\n\n{question}"}],
    )
    raw = resp.content[0].text.strip()
    m = re.search(r'\{[\s\S]*\}', raw)
    if not m:
        raise ValueError(f"No JSON in script response: {raw[:400]}")
    script = json.loads(m.group())
    print(f"    OK: {len(script['scenes'])} scenes — title: {script.get('title','?')}")
    return script

# ── Step 2: Audio ──────────────────────────────────────────────────────────────

async def generate_audio(scenes: list, work_dir: Path) -> tuple:
    print(f"\n[2/6] Generating audio for {len(scenes)} scenes...")
    client = AsyncOpenAI(api_key=OPENAI_API_KEY)
    audio_files, durations = [], []
    for i, scene in enumerate(scenes):
        print(f"    Scene {i+1}: {scene['title'][:60]}...")
        resp = await client.audio.speech.create(
            model="gpt-4o-mini-tts",
            voice=VOICE_ENGLISH,
            input=scene["narration"],
            instructions=VOICE_INSTRUCTIONS_ENGLISH,
        )
        path = work_dir / f"audio_{i:02d}.mp3"
        path.write_bytes(resp.content)
        dur = round(_get_duration(path), 2)
        durations.append(dur)
        audio_files.append(path)
        print(f"    OK: audio_{i:02d}.mp3  ({dur}s)")
    return audio_files, durations

# ── Step 3: Manim code ─────────────────────────────────────────────────────────

async def generate_manim_code(question: str, script: dict, durations: list) -> str:
    print(f"\n[3/6] Generating Manim code ({len(script['scenes'])} scene classes)...")
    client = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY)

    scenes_block = "\n\n".join([
        f"SCENE {i+1} — \"{s['title']}\"\n"
        f"  audio_duration: {durations[i]}s  (target = {durations[i]+1.5:.1f}s with tail)\n"
        f"  narration: {s['narration']}\n"
        f"  visuals: {s['visuals']}"
        for i, s in enumerate(script["scenes"])
    ])

    prompt = f"""Generate complete Manim code for this portrait video.

QUESTION: {question}
TITLE: {script.get("title", question)}
FORMAT: PORTRAIT 720x1280 (9:16 - tall vertical canvas)

{scenes_block}

TOTAL SCENES: {len(script["scenes"])}
Generate classes: Scene01 through Scene{len(script["scenes"]):02d}
"""
    resp = await client.messages.create(
        model=CLAUDE_MODEL, max_tokens=16000, temperature=1,
        system=MANIM_PORTRAIT_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = resp.content[0].text.strip()
    m = (re.search(r'```python\s*([\s\S]+?)```', raw)
         or re.search(r'```python\s*([\s\S]+)', raw))
    if m:
        code = m.group(1).strip()
    elif raw.startswith("from manim") or raw.startswith("import"):
        code = raw
    else:
        raise ValueError(f"No Python code in Manim response: {raw[:400]}")
    print(f"    OK: Manim code ready ({len(code)} chars)")
    return code

# ── Step 4: Render ─────────────────────────────────────────────────────────────

async def render_once(work_dir: Path, scene_py: Path, scene_name: str) -> Path:
    media_dir = work_dir / f"media_{scene_name}"
    media_dir.mkdir(exist_ok=True)
    cmd = [PYTHON_EXE, "-m", "manim", str(scene_py), scene_name,
           "--media_dir", str(media_dir), "--disable_caching", "--fps", "30"]
    proc = await asyncio.create_subprocess_exec(
        *cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE,
        cwd=str(work_dir), env=_build_env(),
    )
    _, stderr = await proc.communicate()
    if proc.returncode != 0:
        raise RuntimeError(f"Manim failed for {scene_name}:\n{stderr.decode(errors='replace')[-2000:]}")
    mp4s = list(media_dir.glob(f"**/{scene_name}.mp4")) or list(media_dir.glob("**/*.mp4"))
    if not mp4s:
        raise FileNotFoundError(f"No MP4 found for {scene_name}")
    return sorted(mp4s, key=lambda p: p.stat().st_mtime)[-1]


async def fix_code(code: str, error: str, scene_name: str) -> str:
    print(f"    WARNING: Auto-fixing {scene_name}...")
    client = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY)
    resp = await client.messages.create(
        model=CLAUDE_MODEL, max_tokens=16000,
        system="Fix this Manim code. Return ONLY the complete fixed code in a ```python block. Keep ALL scene classes. Fix only what's broken.",
        messages=[{"role": "user", "content":
            f"Error in {scene_name}:\n{error[-1200:]}\n\nCode:\n```python\n{code}\n```"}],
    )
    raw = resp.content[0].text.strip()
    m = re.search(r'```python\s*([\s\S]+?)```', raw) or re.search(r'```python\s*([\s\S]+)', raw)
    return m.group(1).strip() if m else code


async def render_scene(work_dir: Path, scene_py: Path, scene_name: str) -> Path:
    try:
        return await render_once(work_dir, scene_py, scene_name)
    except RuntimeError as err:
        fixed = await fix_code(scene_py.read_text(encoding="utf-8"), str(err), scene_name)
        scene_py.write_text(fixed, encoding="utf-8")
        return await render_once(work_dir, scene_py, scene_name)


async def render_all(work_dir: Path, scene_py: Path, n: int) -> list:
    print(f"\n[4/6] Rendering {n} scenes in parallel...")
    results = await asyncio.gather(
        *[render_scene(work_dir, scene_py, f"Scene{i+1:02d}") for i in range(n)]
    )
    for i, p in enumerate(results):
        print(f"    OK: Scene{i+1:02d} -> {p.name}")
    return list(results)

# ── Step 5: Merge AV ──────────────────────────────────────────────────────────

async def merge_av(work_dir: Path, video: Path, audio: Path, duration: float, idx: int) -> Path:
    frozen = work_dir / f"frozen_{idx:02d}.mp4"
    freeze_cmd = [
        FFMPEG_EXE, "-y", "-i", str(video),
        "-vf", "tpad=stop_mode=clone:stop_duration=4",
        "-c:v", "libx264", "-preset", "fast", "-crf", "18", "-an",
        str(frozen),
    ]
    proc = await asyncio.create_subprocess_exec(
        *freeze_cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE
    )
    await proc.communicate()
    if proc.returncode != 0:
        frozen = video  # fallback

    out = work_dir / f"merged_{idx:02d}.mp4"
    cmd = [
        FFMPEG_EXE, "-y",
        "-i", str(frozen), "-i", str(audio),
        "-map", "0:v:0", "-map", "1:a:0",
        "-c:v", "libx264", "-preset", "fast", "-crf", "18",
        "-c:a", "aac", "-b:a", "192k",
        "-t", str(duration),
        str(out),
    ]
    proc = await asyncio.create_subprocess_exec(
        *cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE
    )
    _, stderr = await proc.communicate()
    if proc.returncode != 0:
        raise RuntimeError(f"FFmpeg merge failed: {stderr.decode(errors='replace')[-800:]}")
    return out


async def merge_all(work_dir: Path, scene_videos, audio_files, durations) -> list:
    print(f"\n[5/6] Merging audio into {len(scene_videos)} scenes...")
    results = await asyncio.gather(
        *[merge_av(work_dir, v, a, durations[i], i)
          for i, (v, a) in enumerate(zip(scene_videos, audio_files))]
    )
    for i, p in enumerate(results):
        print(f"    OK: merged_{i:02d}.mp4")
    return list(results)

# ── Step 6: Concat ────────────────────────────────────────────────────────────

async def concat(work_dir: Path, parts: list, final_path: Path) -> Path:
    print(f"\n[6/6] Concatenating {len(parts)} parts...")
    if len(parts) == 1:
        shutil.copy(parts[0], final_path)
        return final_path
    lst = work_dir / "concat.txt"
    lst.write_text("\n".join(f"file '{p.resolve()}'" for p in parts), encoding="utf-8")
    cmd = [FFMPEG_EXE, "-y", "-f", "concat", "-safe", "0", "-i", str(lst),
           "-c:v", "libx264", "-preset", "fast", "-crf", "18",
           "-c:a", "aac", "-b:a", "192k", str(final_path)]
    proc = await asyncio.create_subprocess_exec(
        *cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE
    )
    _, stderr = await proc.communicate()
    if proc.returncode != 0:
        raise RuntimeError(f"FFmpeg concat failed: {stderr.decode(errors='replace')[-800:]}")
    print(f"    OK: Final video -> {final_path}")
    return final_path

# ── Main ──────────────────────────────────────────────────────────────────────

async def main():
    job_id    = str(uuid.uuid4())[:8]
    work_dir  = Path(tempfile.mkdtemp(prefix=f"manim_{job_id}_"))
    final_mp4 = OUTPUT_DIR / f"{job_id}.mp4"

    print("=" * 60)
    print(f"  Vivacity Pipeline Test")
    print(f"  Job ID  : {job_id}")
    print(f"  Question: {QUESTION}")
    print(f"  Format  : {FORMAT}  |  Lang: {LANG}")
    print("=" * 60)

    try:
        # 1. Script
        script = await generate_script(QUESTION)
        n = len(script["scenes"])

        # 2. Audio
        audio_files, durations = await generate_audio(script["scenes"], work_dir)

        # 3. Manim code
        code = await generate_manim_code(QUESTION, script, durations)
        scene_py = work_dir / "scene.py"
        scene_py.write_text(code, encoding="utf-8")

        # 4. Render
        scene_videos = await render_all(work_dir, scene_py, n)

        # 5. Merge AV
        merged = await merge_all(work_dir, scene_videos, audio_files, durations)

        # 6. Concat
        await concat(work_dir, merged, final_mp4)

        # 7. Upload to Supabase
        print("\n[+] Uploading to Supabase Storage...")
        public_url = storage.upload_video(str(final_mp4), USER_ID, job_id)

        print("\n" + "=" * 60)
        print("  PIPELINE COMPLETE!")
        print(f"  Local MP4  : {final_mp4}")
        print(f"  Public URL : {public_url}")
        print("=" * 60)

    except Exception as exc:
        print(f"\nPipeline FAILED: {exc}")
        import traceback; traceback.print_exc()
        sys.exit(1)
    finally:
        shutil.rmtree(work_dir, ignore_errors=True)
        print("\n[cleanup] Temp dir removed.")


if __name__ == "__main__":
    asyncio.run(main())

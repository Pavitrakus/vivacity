"""Build industry-clean OG image with Geist Pixel (centered)."""
from __future__ import annotations

import tempfile
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FRAME = ROOT / "public/images/_og-frame.jpg"
VAR_FONT = ROOT / "public/fonts/GeistPixel-Regular-VariableFont_ELSH.ttf"
OUT_PNG = ROOT / "public/images/og-image.png"
OUT_JPG = ROOT / "public/images/og-image.jpg"

W, H = 1200, 630


def static_font_path() -> Path:
    """Instantiate variable Geist Pixel so PIL/FreeType draws glyphs reliably."""
    font = TTFont(str(VAR_FONT))
    inst = instantiateVariableFont(font, {}, inplace=False)
    tmp = Path(tempfile.gettempdir()) / "geist-pixel-regular-static.ttf"
    inst.save(str(tmp))
    return tmp


def load_font(path: Path, size: float) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def center_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    cy: float,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
) -> float:
    """Draw text centered at horizontal mid, with vertical center at cy. Returns bottom y."""
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (W - tw) / 2 - bbox[0]
    y = cy - th / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=fill)
    return y + bbox[3]


def main() -> None:
    font_path = static_font_path()

    img = Image.open(FRAME).convert("RGB")
    img = ImageEnhance.Brightness(img).enhance(0.70)
    img = ImageEnhance.Color(img).enhance(0.55)
    img = ImageEnhance.Contrast(img).enhance(1.05)
    img = img.resize((W, H), Image.Resampling.LANCZOS)
    img = img.filter(ImageFilter.GaussianBlur(radius=1.2))

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)

    for y in range(H):
        t = y / (H - 1)
        if t < 0.38:
            a = int(160 + (100 - 160) * (t / 0.38))
        else:
            a = int(100 + (205 - 100) * ((t - 0.38) / 0.62))
        od.line([(0, y), (W, y)], fill=(0, 0, 0, a))

    spot = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(spot)
    sd.ellipse((W * 0.1, H * 0.02, W * 0.9, H * 0.75), fill=(255, 255, 255, 20))
    spot = spot.filter(ImageFilter.GaussianBlur(radius=78))
    overlay = Image.alpha_composite(overlay, spot)
    od = ImageDraw.Draw(overlay)

    title = load_font(font_path, 188)
    tag = load_font(font_path, 30)
    url = load_font(font_path, 20)

    # vertically center the brand + tagline block
    title_bb = od.textbbox((0, 0), "vivacity", font=title)
    tag_bb = od.textbbox((0, 0), "LLMs answer in text. We make it move.", font=tag)
    title_h = title_bb[3] - title_bb[1]
    tag_h = tag_bb[3] - tag_bb[1]
    gap = 30
    block_h = title_h + gap + tag_h
    block_top = (H - block_h) / 2 - 28

    center_text(od, "vivacity", block_top + title_h / 2, title, (255, 255, 255, 255))
    center_text(
        od,
        "LLMs answer in text. We make it move.",
        block_top + title_h + gap + tag_h / 2,
        tag,
        (255, 255, 255, 204),
    )
    center_text(od, "tryvivacity.com", H - 70, url, (255, 255, 255, 122))

    out = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    out.save(OUT_PNG, format="PNG", optimize=True)
    out.save(OUT_JPG, format="JPEG", quality=86, optimize=True, progressive=True)
    print(f"PNG {OUT_PNG.stat().st_size/1024:.0f}KB · JPG {OUT_JPG.stat().st_size/1024:.0f}KB")


if __name__ == "__main__":
    main()

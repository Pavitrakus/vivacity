"use client";

import { useEffect, useState } from "react";
import {
  Code2,
  History,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
} from "lucide-react";
import { VideoPlayer } from "@/components/video-player";
import { cn } from "@/lib/utils";

const MANIM_SNIPPET = `from manim import *

class Scene02(Scene):
    def construct(self):
        axes = Axes(x_range=[-3, 3], y_range=[-2, 2], tips=False)
        v = Arrow(ORIGIN, [2, 1, 0], buff=0, color=YELLOW)
        label = MathTex(r"A\\vec{v}=\\lambda\\vec{v}").next_to(v, UP)
        self.play(Create(axes), GrowArrow(v), FadeIn(label))
        self.play(v.animate.apply_matrix([[1.5, 0.2], [0.1, 1.2]]))`;

const rail = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "jobs", label: "Jobs", icon: LayoutDashboard },
  { id: "code", label: "Code", icon: Code2 },
  { id: "history", label: "History", icon: History },
  { id: "models", label: "Models", icon: Sparkles },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type RailId = (typeof rail)[number]["id"];

/** Live chat steps for the iPhone mock */
type ChatStep =
  | "idle"
  | "typingUser"
  | "userSent"
  | "typingViva"
  | "vivaReply"
  | "typingViva2"
  | "videoSent"
  | "done";

export function DashboardPeek() {
  const [railActive, setRailActive] = useState<RailId>("chat");
  const [panel, setPanel] = useState<"preview" | "code" | "logs">("preview");

  return (
    <section id="dashboard" className="mx-auto max-w-6xl px-5 py-16 sm:py-20 md:px-8">
      <div className="mb-8 max-w-2xl sm:mb-10">
        <p className="font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
          Product sneak peek
        </p>
        <h2 className="mt-3 font-pixel text-[1.75rem] tracking-tight sm:text-3xl md:text-4xl">
          The workspace, without the noise.
        </h2>
        <p className="mt-3 text-[15px] text-white/55 sm:text-base">
          Chat with Viva. Preview and code beside it on desktop. On phone, it is
          chat first. Video lands in the thread.
        </p>
      </div>

      {/* Desktop / tablet workspace */}
      <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-[#080808] shadow-[0_40px_100px_-50px_rgba(0,0,0,0.95)] lg:block">
        <div className="flex items-center gap-3 border-b border-white/8 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 font-pixel text-[12px] tracking-tight text-white/70">
            vivacity
          </span>
          <span className="text-white/25">·</span>
          <span className="font-pixel text-[11px] text-white/35">workspace</span>
          <span className="ml-auto rounded-full border border-white/10 px-2.5 py-0.5 font-pixel text-[10px] text-white/40">
            job_8f3a
          </span>
        </div>

        <div className="grid min-h-[460px] grid-cols-[176px_1fr_1.1fr]">
          <aside className="flex flex-col border-r border-white/8 bg-[#0a0a0a] p-3">
            <p className="mb-2 px-2 font-pixel text-[10px] tracking-[0.14em] text-white/30 uppercase">
              Navigate
            </p>
            <div className="space-y-1">
              {rail.map((item) => {
                const Icon = item.icon;
                const on = railActive === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setRailActive(item.id);
                      if (item.id === "code") setPanel("code");
                      if (item.id === "chat") setPanel("preview");
                    }}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition",
                      on
                        ? "bg-white/[0.08] text-white ring-1 ring-white/10"
                        : "text-white/45 hover:bg-white/[0.04] hover:text-white/75"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-80" />
                    <span className="font-pixel text-[12px] tracking-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-auto rounded-xl border border-white/8 bg-white/[0.02] p-3">
              <p className="font-pixel text-[10px] text-white/35">plan</p>
              <p className="mt-1 font-pixel text-[12px] text-white/70">builder</p>
              <p className="mt-1 text-[11px] text-white/35">842 credits left</p>
            </div>
          </aside>

          <div className="flex flex-col border-r border-white/8 bg-[#0c0c0c]">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <div>
                <p className="font-pixel text-[12px] tracking-tight text-white/85">
                  Eigenvectors at midnight
                </p>
                <p className="mt-0.5 text-[11px] text-white/35">
                  Viva · hinglish · portrait
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 font-pixel text-[10px] text-emerald-300/80">
                running
              </span>
            </div>

            <div className="flex-1 space-y-4 px-4 py-4">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.08] px-3.5 py-2.5 text-sm leading-relaxed text-white/85">
                  Explain eigenvectors like I am stuck at midnight.
                </div>
              </div>

              <div className="flex justify-start gap-2">
                <span className="mt-1 font-pixel text-[11px] text-white/40">V.</span>
                <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-white/8 bg-black/40 px-3.5 py-2.5 text-sm leading-relaxed text-white/75">
                  Got it. Axes, then the vector, then the stretch. Scenes locking
                  now.
                </div>
              </div>

              <div className="flex justify-start gap-2">
                <span className="mt-1 font-pixel text-[11px] text-white/40">V.</span>
                <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-emerald-400/15 bg-emerald-400/[0.05] px-3.5 py-2.5">
                  <p className="text-sm text-white/75">
                    Scene IR ready · 4 scenes · voice timed
                  </p>
                  <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[68%] rounded-full bg-emerald-400/85" />
                  </div>
                  <p className="mt-2 font-pixel text-[10px] text-white/35">
                    rendering Scene 02 of 04
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/8 p-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2">
                <span className="flex-1 font-pixel text-[11px] text-white/30">
                  Message Viva…
                </span>
                <span className="rounded-full bg-white px-3 py-1 font-pixel text-[10px] text-black">
                  Send
                </span>
              </div>
            </div>
          </div>

          <div className="relative bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_45%)] p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1 font-pixel text-[10px]">
              {(
                [
                  ["preview", "Preview"],
                  ["code", "Code"],
                  ["logs", "Logs"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPanel(id)}
                  className={cn(
                    "flex-1 rounded-full px-2 py-1.5 transition",
                    panel === id
                      ? "bg-white/12 text-white"
                      : "text-white/40 hover:text-white/70"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {panel === "preview" && (
              <div className="space-y-3">
                <VideoPlayer src="/videos/matrix.mp4" />
                <div className="flex flex-wrap gap-2">
                  {[
                    "/videos/unit_circle.mp4",
                    "/videos/divergence.mp4",
                    "/videos/demo-vid1.mp4",
                  ].map((src) => (
                    <div
                      key={src}
                      className="h-14 w-20 overflow-hidden rounded-lg border border-white/10"
                    >
                      <video
                        className="h-full w-full object-cover"
                        src={src}
                        muted
                        loop
                        autoPlay
                        playsInline
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {panel === "code" && (
              <pre className="max-h-[340px] overflow-auto rounded-xl border border-white/10 bg-[#06080b] p-4 font-mono text-[11px] leading-relaxed text-emerald-100/80">
                <code>{MANIM_SNIPPET}</code>
              </pre>
            )}

            {panel === "logs" && (
              <div className="space-y-2 rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-[11px] text-white/55">
                {[
                  "0.0s  job accepted",
                  "0.4s  Scene IR · 4 scenes",
                  "1.8s  TTS durations locked",
                  "2.1s  Manim codegen",
                  "…    render Scene02",
                ].map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: iPhone 17 Pro Max chat-first */}
      <div className="flex justify-center lg:hidden">
        <IphoneWorkspaceChat />
      </div>
    </section>
  );
}

const USER_PROMPT = "Explain eigenvectors like I am stuck at midnight.";
const VIVA_REPLY =
  "On it. Axes, vector, then the stretch. Video lands in this chat.";

function IphoneWorkspaceChat() {
  const [step, setStep] = useState<ChatStep>("idle");
  const [typedUser, setTypedUser] = useState("");
  const [typedViva, setTypedViva] = useState("");

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const typeOut = async (
      text: string,
      set: (s: string) => void,
      speed = 28
    ) => {
      set("");
      for (let i = 0; i <= text.length; i++) {
        if (cancelled) return;
        set(text.slice(0, i));
        await wait(speed);
      }
    };

    const run = async () => {
      while (!cancelled) {
        setStep("idle");
        setTypedUser("");
        setTypedViva("");
        await wait(700);
        if (cancelled) return;

        setStep("typingUser");
        await typeOut(USER_PROMPT, setTypedUser, 22);
        if (cancelled) return;

        setStep("userSent");
        await wait(650);
        if (cancelled) return;

        setStep("typingViva");
        await wait(1100);
        if (cancelled) return;

        setStep("vivaReply");
        await typeOut(VIVA_REPLY, setTypedViva, 18);
        if (cancelled) return;

        await wait(500);
        if (cancelled) return;
        setStep("typingViva2");
        await wait(900);
        if (cancelled) return;

        setStep("videoSent");
        await wait(4200);
        if (cancelled) return;

        setStep("done");
        await wait(2200);
      }
    };

    void run();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const showUserBubble =
    step === "userSent" ||
    step === "typingViva" ||
    step === "vivaReply" ||
    step === "typingViva2" ||
    step === "videoSent" ||
    step === "done";

  const showVivaBubble =
    step === "vivaReply" ||
    step === "typingViva2" ||
    step === "videoSent" ||
    step === "done";

  const showVideo = step === "videoSent" || step === "done";

  return (
    <div className="w-full max-w-[340px]">
      {/* iPhone 17 Pro Max frame */}
      <div
        className="relative mx-auto aspect-[9/19.5] w-full max-w-[320px] rounded-[2.65rem] border-[5px] border-[#2a2a2c] bg-[#0a0a0a] p-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.08)]"
        aria-label="iPhone preview of tryvivacity.com/workspace"
      >
        {/* side buttons */}
        <div className="absolute top-[18%] -left-[7px] h-8 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute top-[28%] -left-[7px] h-14 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute top-[38%] -left-[7px] h-14 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute top-[30%] -right-[7px] h-20 w-[3px] rounded-r-sm bg-[#3a3a3c]" />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[2.35rem] bg-[#050505]">
          {/* Dynamic Island */}
          <div className="pointer-events-none absolute top-2.5 left-1/2 z-20 h-[26px] w-[98px] -translate-x-1/2 rounded-full bg-black" />

          {/* status / URL */}
          <div className="relative z-10 border-b border-white/[0.06] px-4 pt-11 pb-2.5">
            <div className="mx-auto flex max-w-[92%] items-center justify-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              <span className="truncate font-pixel text-[9px] tracking-tight text-white/55">
                tryvivacity.com/workspace
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between px-0.5">
              <div>
                <p className="font-pixel text-[12px] text-white/90">Viva</p>
                <p className="text-[10px] text-white/35">chat first · vivacity</p>
              </div>
              <span className="font-pixel text-[11px] text-white/40">V.</span>
            </div>
          </div>

          {/* chat */}
          <div className="flex flex-1 flex-col gap-3 overflow-hidden px-3.5 py-3">
            <p className="text-center font-pixel text-[9px] text-white/25">
              Tonight
            </p>

            {step === "typingUser" && (
              <div className="flex justify-end">
                <div className="max-w-[88%] rounded-2xl rounded-br-md bg-white/[0.1] px-3 py-2 text-[12px] leading-snug text-white/85">
                  {typedUser}
                  <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-white/70 align-middle" />
                </div>
              </div>
            )}

            {showUserBubble && (
              <div className="flex justify-end">
                <div className="max-w-[88%] rounded-2xl rounded-br-md bg-white/[0.1] px-3 py-2 text-[12px] leading-snug text-white/85">
                  {USER_PROMPT}
                </div>
              </div>
            )}

            {step === "typingViva" && (
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[10px] text-white/40">V.</span>
                <div className="flex items-center gap-1 rounded-2xl border border-white/8 bg-black/50 px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/45" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/35 [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/25 [animation-delay:240ms]" />
                </div>
              </div>
            )}

            {showVivaBubble && (
              <div className="flex gap-2">
                <span className="mt-1 font-pixel text-[10px] text-white/40">V.</span>
                <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-white/8 bg-black/50 px-3 py-2 text-[12px] leading-snug text-white/75">
                  {step === "vivaReply" && typedViva.length < VIVA_REPLY.length
                    ? typedViva
                    : VIVA_REPLY}
                  {step === "vivaReply" &&
                  typedViva.length < VIVA_REPLY.length ? (
                    <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-white/50 align-middle" />
                  ) : null}
                </div>
              </div>
            )}

            {step === "typingViva2" && (
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[10px] text-white/40">V.</span>
                <div className="flex items-center gap-1 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/80" />
                  <span className="font-pixel text-[9px] text-emerald-300/70">
                    rendering…
                  </span>
                </div>
              </div>
            )}

            {showVideo && (
              <div className="flex gap-2">
                <span className="mt-1 font-pixel text-[10px] text-white/40">V.</span>
                <div className="w-[78%] overflow-hidden rounded-2xl rounded-bl-md border border-white/10 bg-black">
                  <div className="relative aspect-[9/14] max-h-[200px]">
                    <video
                      className="h-full w-full object-cover"
                      src="/videos/matrix.mp4"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2.5 py-2">
                      <p className="font-pixel text-[9px] text-white/80">
                        eigenvectors.mp4
                      </p>
                      <p className="text-[9px] text-white/40">~1:48 · hinglish</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* composer */}
          <div className="border-t border-white/[0.06] px-3 pt-2 pb-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              <span className="flex-1 font-pixel text-[10px] text-white/30">
                Message Viva…
              </span>
              <span className="rounded-full bg-white px-2.5 py-1 font-pixel text-[9px] text-black">
                Send
              </span>
            </div>
            <div className="mx-auto mt-2.5 h-1 w-24 rounded-full bg-white/25" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center font-pixel text-[11px] text-white/40">
        iPhone · tryvivacity.com/workspace
      </p>
    </div>
  );
}

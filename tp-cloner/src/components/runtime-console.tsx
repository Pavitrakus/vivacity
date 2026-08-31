"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatNum } from "@/engine/math";
import { Viewport } from "@/engine/viewport";
import {
  actDeltaV,
  commit,
  createWorld,
  fork,
  observe,
  parseCommand,
  rollback,
  selectBranch,
  shownReport,
  simulate,
  tick,
  verifyWorld,
  type RuntimeState,
} from "@/engine/world";

const VERBS: { id: string; run: (s: RuntimeState) => RuntimeState; need?: "commit" }[] = [
  { id: "observe()", run: observe },
  { id: "act(+10% Δv)", run: (s) => actDeltaV(s, 1.1) },
  { id: "fork(5)", run: fork },
  { id: "simulate()", run: simulate },
  { id: "verify()", run: verifyWorld },
  { id: "commit()", run: commit, need: "commit" },
  { id: "rollback()", run: rollback },
];

export function RuntimeConsole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewRef = useRef<Viewport | null>(null);
  const stateRef = useRef<RuntimeState | null>(null);
  const [ui, setUi] = useState<RuntimeState>(createWorld);
  const [cmd, setCmd] = useState("");
  const [dragging, setDragging] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    stateRef.current = createWorld();
    const view = new Viewport(canvas);
    view.setDragHandler(setDragging);
    view.resize();
    viewRef.current = view;
    const onResize = () => view.resize();
    window.addEventListener("resize", onResize);

    let raf = 0;
    let last = performance.now();
    let uiClock = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (stateRef.current) {
        stateRef.current = tick(stateRef.current, 1);
        view.tick(dt);
        view.draw(stateRef.current);
        uiClock += dt;
        if (uiClock > 0.12) {
          uiClock = 0;
          setUi({ ...stateRef.current });
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      view.destroy();
    };
  }, []);

  const apply = (fn: (s: RuntimeState) => RuntimeState) => {
    const current = stateRef.current ?? ui;
    const next = fn(current);
    stateRef.current = next;
    setUi({ ...next });
  };

  const report = shownReport(ui);
  const live = ui.live;

  return (
    <section className="relative pt-20">
      <div className="mx-auto grid max-w-[1440px] items-end gap-10 px-5 pb-8 sm:px-8 lg:grid-cols-[minmax(280px,0.78fr)_1.22fr] lg:gap-12 lg:pt-6">
        <div className="max-w-xl pb-2 lg:pb-8">
          <h1 className="font-serif text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-[#161410] sm:text-6xl lg:text-[4.35rem]">
            Simulation runtime
            <span className="mt-1 block italic text-[#6e675b]">for AI agents.</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#6e675b] sm:text-base">
            Instantiate a world. Inspect its state. Act. Fork the futures. Route
            each branch to the backend that is allowed to be wrong — or not.
            Verify what happened. The pixels are an observation. They are not
            the world.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center rounded-full bg-[#161410] px-5 text-[14px] text-[#f2eee6] hover:bg-black"
            >
              Book a demo
            </Link>
            <a
              href="#runtime"
              className="inline-flex h-11 items-center rounded-full border border-[rgba(22,20,16,0.2)] px-5 text-[14px] text-[#161410] hover:border-[#161410]"
            >
              Open the runtime
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="plate relative overflow-hidden rounded-[2px]">
            <div className="flex items-center justify-between px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-[#efe8dc]/45 uppercase">
              <span>{dragging ? "look" : "world.observe()"}</span>
              <span>
                X {coords.x.toFixed(1)} · Y {coords.y.toFixed(1)}
              </span>
            </div>
            <div className="relative h-[380px] sm:h-[460px] lg:h-[520px]">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full cursor-grab touch-none active:cursor-grabbing"
                onPointerMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCoords({
                    x: Number((((e.clientX - rect.left) / rect.width) * 1000).toFixed(1)),
                    y: Number((((e.clientY - rect.top) / rect.height) * 1000).toFixed(1)),
                  });
                }}
              />
            </div>
          </div>
          <p className="mt-3 font-mono text-[11px] tracking-[0.04em] text-[#6e675b]">
            Exact-physics backend · drag to look · scroll to dolly
          </p>
        </div>
      </div>

      <div id="runtime" className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8">
        <div className="grid gap-px overflow-hidden rounded-[2px] border border-[rgba(22,20,16,0.14)] bg-[rgba(22,20,16,0.14)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[#f7f4ee] p-4 sm:p-5">
            <div className="flex flex-wrap gap-1.5">
              {VERBS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  disabled={v.need === "commit" && !ui.selected}
                  onClick={() => apply(v.run)}
                  className="border border-[rgba(22,20,16,0.16)] bg-[#f2eee6] px-2.5 py-1.5 font-mono text-[11px] text-[#161410] hover:border-[#161410] disabled:opacity-30"
                >
                  {v.id}
                </button>
              ))}
            </div>
            <form
              className="mt-3 flex items-center gap-2 border border-[rgba(22,20,16,0.14)] bg-[#f2eee6] px-3 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                apply((s) => parseCommand(s, cmd));
                setCmd("");
              }}
            >
              <span className="font-mono text-[12px] text-[#c45a24]">›</span>
              <input
                value={cmd}
                onChange={(e) => setCmd(e.target.value)}
                placeholder="act 1.1 · fork · verify · commit · rollback"
                className="w-full bg-transparent font-mono text-[12px] text-[#161410] outline-none placeholder:text-[#6e675b]/70"
              />
            </form>
          </div>

          <aside className="bg-[#f7f4ee]">
            <div className="flex items-center justify-between border-b border-[rgba(22,20,16,0.1)] px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-[#6e675b] uppercase">
              <span>S_t</span>
              <span className={report.stable ? "text-[#2f6b45]" : "text-[#a33b28]"}>
                {report.stable ? "stable" : "unstable"}
              </span>
            </div>
            <dl className="grid grid-cols-4 font-mono text-[11px] sm:grid-cols-4">
              {(
                [
                  ["x", formatNum(live.r.x)],
                  ["y", formatNum(live.r.y)],
                  ["z", formatNum(live.r.z)],
                  ["|v|", formatNum(Math.hypot(live.v.x, live.v.y, live.v.z))],
                  ["E", formatNum(report.energy)],
                  ["e", formatNum(report.eccentricity)],
                  ["rp", formatNum(report.periapsis)],
                  ["T", formatNum(report.period)],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="border-[rgba(22,20,16,0.08)] border-b px-3 py-2">
                  <dt className="text-[#6e675b]">{k}</dt>
                  <dd className="mt-0.5 text-[#161410]">{v}</dd>
                </div>
              ))}
            </dl>
            {ui.branches.length ? (
              <div className="border-t border-[rgba(22,20,16,0.1)] px-2 py-2">
                {ui.branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => apply((s) => selectBranch(s, b.id))}
                    className={`flex w-full items-center justify-between px-2 py-1 font-mono text-[11px] ${
                      ui.selected === b.id ? "bg-[rgba(22,20,16,0.06)] text-[#161410]" : "text-[#6e675b] hover:text-[#161410]"
                    }`}
                  >
                    <span>{b.label}</span>
                    <span className={b.report.stable ? "text-[#2f6b45]" : "text-[#a33b28]"}>
                      {b.report.stable ? "pass" : "fail"}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
            <ul className="max-h-24 space-y-1 overflow-auto border-t border-[rgba(22,20,16,0.1)] px-4 py-2 font-mono text-[10px] text-[#6e675b]">
              {ui.logs.slice(-5).map((l) => (
                <li key={l.t}>
                  <span className="text-[#c45a24]">{l.verb}</span> {l.detail}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

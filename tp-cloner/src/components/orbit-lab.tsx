"use client";

import { useMemo, useState } from "react";
import { OrbitCanvas, type TrailLayer } from "@/components/orbit-canvas";
import {
  circularOrbit,
  formatNum,
  propagate,
  scaleVelocity,
  verify,
  type BodyState,
  type OrbitReport,
} from "@/lib/orbit";

type Branch = {
  id: string;
  factor: number;
  state: BodyState;
  trail: BodyState[];
  report: OrbitReport;
};

type LogLine = { id: number; text: string };

const FORK_FACTORS = [0.82, 0.94, 1.0, 1.1, 1.22];
const STEPS = 420;
const DT = 0.018;

const BRANCH_COLORS = [
  "rgba(232, 120, 96, 0.72)",
  "rgba(238, 210, 130, 0.7)",
  "rgba(238, 234, 226, 0.85)",
  "rgba(146, 196, 160, 0.75)",
  "rgba(130, 168, 220, 0.75)",
];

function makeBranch(id: string, state: BodyState, factor: number): Branch {
  const next = scaleVelocity(state, factor);
  return {
    id,
    factor,
    state: next,
    trail: propagate(next, DT, STEPS),
    report: verify(next),
  };
}

export function OrbitLab() {
  const [world, setWorld] = useState<BodyState>(() => circularOrbit(1));
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogLine[]>([
    { id: 0, text: "world = create({ schema: 'orbital-mechanics' })" },
    { id: 1, text: "observe() → circular LEO analog, e ≈ 0" },
  ]);
  const [logId, setLogId] = useState(2);

  const worldTrail = useMemo(() => propagate(world, DT, STEPS), [world]);
  const worldReport = useMemo(() => verify(world), [world]);
  const selectedBranch = branches.find((b) => b.id === selected) ?? null;
  const shown = selectedBranch?.state ?? world;
  const shownReport = selectedBranch?.report ?? worldReport;

  const pushLog = (text: string) => {
    setLogs((prev) => {
      const next = [...prev, { id: logId, text }];
      return next.slice(-7);
    });
    setLogId((n) => n + 1);
  };

  const layers: TrailLayer[] = [
    {
      points: worldTrail,
      color: "rgba(238,234,226,0.22)",
      width: 1.05,
    },
    ...branches.map((b, i) => ({
      points: b.trail,
      color: BRANCH_COLORS[i % BRANCH_COLORS.length],
      width: selected === b.id ? 1.8 : 1.05,
      alpha: selected && selected !== b.id ? 0.35 : 0.9,
    })),
  ];

  return (
    <section id="lab" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.16em] text-white/38 uppercase">
          01 — The demo that is the company
        </p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#eeeae2] sm:text-5xl">
          Change the world. Do not regenerate it.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-white/55">
          Define an orbit. Increase velocity. Fork five futures. Keep the ones
          that stay bound. This is a local physics backend behind the same
          verbs the runtime exposes: observe, act, fork, simulate, verify,
          commit.
        </p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="bg-[#07080b]">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5 font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
            <span>branchable simulator</span>
            <span>{branches.length ? `${branches.length} forks` : "single world"}</span>
          </div>
          <div className="relative h-[340px] sm:h-[420px]">
            <OrbitCanvas
              layers={layers}
              live={shown}
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2 border-t border-white/8 p-3">
            <LabButton
              onClick={() => {
                pushLog("observe() → state dumped, trajectory rendered");
              }}
            >
              observe()
            </LabButton>
            <LabButton
              onClick={() => {
                const next = scaleVelocity(world, 1.1);
                setWorld(next);
                setBranches([]);
                setSelected(null);
                pushLog("act({ op: 'scale_velocity', factor: 1.10 })");
              }}
            >
              act(+10% Δv)
            </LabButton>
            <LabButton
              onClick={() => {
                const next = FORK_FACTORS.map((factor, i) =>
                  makeBranch(`b${i}-${factor}`, world, factor)
                );
                setBranches(next);
                setSelected(null);
                pushLog(`fork() × ${FORK_FACTORS.length} velocity hypotheses`);
              }}
            >
              fork(5)
            </LabButton>
            <LabButton
              onClick={() => {
                if (!branches.length) {
                  pushLog("simulate() on committed world");
                  return;
                }
                pushLog("simulate() each branch through 2 orbital periods");
              }}
            >
              simulate()
            </LabButton>
            <LabButton
              onClick={() => {
                if (branches.length) {
                  const ok = branches.filter((b) => b.report.stable).length;
                  pushLog(`verify() → ${ok}/${branches.length} branches remain bound + clear`);
                  return;
                }
                pushLog(
                  `verify() → ${shownReport.stable ? "stable" : "unstable"} · E=${formatNum(shownReport.energy)}`
                );
              }}
            >
              verify()
            </LabButton>
            <LabButton
              disabled={!selectedBranch}
              onClick={() => {
                if (!selectedBranch) return;
                setWorld(selectedBranch.state);
                setBranches([]);
                setSelected(null);
                pushLog(`commit(${selectedBranch.id}) · factor ${selectedBranch.factor.toFixed(2)}`);
              }}
            >
              commit()
            </LabButton>
            <LabButton
              onClick={() => {
                setWorld(circularOrbit(1));
                setBranches([]);
                setSelected(null);
                pushLog("rollback() → circular initial condition");
              }}
            >
              rollback()
            </LabButton>
          </div>
        </div>

        <div className="flex flex-col bg-[#0b0d11]">
          <div className="border-b border-white/8 px-4 py-2.5 font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
            S_t · {selectedBranch ? `branch ${selectedBranch.id}` : "committed world"}
          </div>
          <dl className="grid grid-cols-2 gap-px bg-white/6 text-[12px]">
            {(
              [
                ["x", formatNum(shown.x)],
                ["y", formatNum(shown.y)],
                ["vx", formatNum(shown.vx)],
                ["vy", formatNum(shown.vy)],
                ["E", formatNum(shownReport.energy)],
                ["e", formatNum(shownReport.eccentricity)],
                ["rp", formatNum(shownReport.periapsis)],
                ["stable", shownReport.stable ? "true" : "false"],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="bg-[#0b0d11] px-4 py-3">
                <dt className="font-mono text-[10px] tracking-wide text-white/35 uppercase">
                  {k}
                </dt>
                <dd
                  className={
                    k === "stable"
                      ? shownReport.stable
                        ? "mt-1 font-mono text-emerald-300/90"
                        : "mt-1 font-mono text-rose-300/85"
                      : "mt-1 font-mono text-[#eeeae2]"
                  }
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          {branches.length ? (
            <div className="border-t border-white/8 px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
                compare()
              </p>
              <div className="mt-2 space-y-1.5">
                {branches.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelected(b.id)}
                    className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left font-mono text-[11px] ${
                      selected === b.id
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: BRANCH_COLORS[i] }}
                      />
                      Δv × {b.factor.toFixed(2)}
                    </span>
                    <span className={b.report.stable ? "text-emerald-300/85" : "text-rose-300/80"}>
                      {b.report.stable ? "stable" : "fail"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-auto border-t border-white/8 px-4 py-3">
            <p className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
              execution log
            </p>
            <ul className="mt-2 space-y-1 font-mono text-[11px] text-white/50">
              {logs.map((line) => (
                <li key={line.id}>{line.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function LabButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-[11px] text-white/75 hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}

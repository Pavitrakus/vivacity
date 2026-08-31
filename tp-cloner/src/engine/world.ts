import type { Body, OrbitReport } from "@/engine/orbital";
import {
  circularOrbit,
  propagate,
  scaleVelocity,
  stepRK4,
  verify,
} from "@/engine/orbital";
import type { Vec3 } from "@/engine/math";

export type Branch = {
  id: string;
  label: string;
  factor: number;
  body: Body;
  trail: Vec3[];
  report: OrbitReport;
};

export type LogLine = {
  t: number;
  verb: string;
  detail: string;
};

export type RuntimeState = {
  worldId: string;
  schema: "orbital-mechanics";
  backend: "exact-physics";
  time: number;
  live: Body;
  committed: Body;
  committedTrail: Vec3[];
  branches: Branch[];
  selected: string | null;
  logs: LogLine[];
  playing: boolean;
};

const DT = 0.012;
const TRAIL_STEPS = 520;
const TRAIL_DT = 0.02;
const FORK_FACTORS = [0.78, 0.92, 1.0, 1.1, 1.24];

let logSeq = 0;

function log(verb: string, detail: string): LogLine {
  logSeq += 1;
  return { t: logSeq, verb, detail };
}

function trailFor(body: Body): Vec3[] {
  return propagate(body, TRAIL_DT, TRAIL_STEPS);
}

export function createWorld(): RuntimeState {
  const body = circularOrbit();
  return {
    worldId: "w0",
    schema: "orbital-mechanics",
    backend: "exact-physics",
    time: 0,
    live: body,
    committed: body,
    committedTrail: trailFor(body),
    branches: [],
    selected: null,
    logs: [
      log("create", "schema=orbital-mechanics"),
      log("observe", "circular LEO analog"),
    ],
    playing: true,
  };
}

export function tick(state: RuntimeState, frames = 1): RuntimeState {
  if (!state.playing) return state;
  let live = state.live;
  let time = state.time;
  for (let i = 0; i < frames; i += 1) {
    live = stepRK4(live, DT);
    time += DT;
  }
  return { ...state, live, time };
}

export function observe(state: RuntimeState): RuntimeState {
  return {
    ...state,
    logs: [...state.logs, log("observe", `t=${state.time.toFixed(2)}`)].slice(-12),
  };
}

export function actDeltaV(state: RuntimeState, factor: number): RuntimeState {
  const next = scaleVelocity(state.live, factor);
  return {
    ...state,
    live: next,
    committed: next,
    committedTrail: trailFor(next),
    branches: [],
    selected: null,
    logs: [...state.logs, log("act", `scale_velocity ${factor.toFixed(2)}`)].slice(-12),
  };
}

export function fork(state: RuntimeState): RuntimeState {
  const branches = FORK_FACTORS.map((factor, i) => {
    const body = scaleVelocity(state.committed, factor);
    return {
      id: `b${i}`,
      label: `Δv × ${factor.toFixed(2)}`,
      factor,
      body,
      trail: trailFor(body),
      report: verify(body),
    };
  });
  return {
    ...state,
    branches,
    selected: null,
    logs: [...state.logs, log("fork", `${branches.length} velocity hypotheses`)].slice(-12),
  };
}

export function simulate(state: RuntimeState): RuntimeState {
  const n = state.branches.length || 1;
  return {
    ...state,
    logs: [...state.logs, log("simulate", `${n} world${n === 1 ? "" : "s"} × 2 periods`)].slice(-12),
  };
}

export function verifyWorld(state: RuntimeState): RuntimeState {
  if (state.branches.length) {
    const ok = state.branches.filter((b) => b.report.stable).length;
    return {
      ...state,
      logs: [...state.logs, log("verify", `${ok}/${state.branches.length} bound + clear`)].slice(-12),
    };
  }
  const report = verify(state.live);
  return {
    ...state,
    logs: [
      ...state.logs,
      log("verify", report.stable ? "stable" : "unstable"),
    ].slice(-12),
  };
}

export function selectBranch(state: RuntimeState, id: string | null): RuntimeState {
  const branch = state.branches.find((b) => b.id === id);
  if (!branch) return { ...state, selected: null };
  return {
    ...state,
    selected: id,
    live: branch.body,
    logs: [...state.logs, log("observe", `branch ${id}`)].slice(-12),
  };
}

export function commit(state: RuntimeState): RuntimeState {
  const branch = state.branches.find((b) => b.id === state.selected);
  if (!branch) return state;
  return {
    ...state,
    live: branch.body,
    committed: branch.body,
    committedTrail: branch.trail,
    branches: [],
    selected: null,
    logs: [...state.logs, log("commit", branch.label)].slice(-12),
  };
}

export function rollback(state: RuntimeState): RuntimeState {
  const body = circularOrbit();
  return {
    ...state,
    live: body,
    committed: body,
    committedTrail: trailFor(body),
    branches: [],
    selected: null,
    time: 0,
    logs: [...state.logs, log("rollback", "circular initial condition")].slice(-12),
  };
}

export function shownBody(state: RuntimeState): Body {
  const branch = state.branches.find((b) => b.id === state.selected);
  return branch?.body ?? state.live;
}

export function shownReport(state: RuntimeState): OrbitReport {
  const branch = state.branches.find((b) => b.id === state.selected);
  return branch?.report ?? verify(state.live);
}

export function parseCommand(state: RuntimeState, raw: string): RuntimeState {
  const line = raw.trim().toLowerCase();
  if (!line) return state;
  if (line === "observe" || line === "observe()") return observe(state);
  if (line.startsWith("act") || line.includes("dv") || line.includes("1.1")) {
    const n = Number(line.replace(/[^\d.]/g, "")) || 1.1;
    return actDeltaV(state, n > 3 ? 1.1 : n);
  }
  if (line.startsWith("fork")) return fork(state);
  if (line.startsWith("sim")) return simulate(state);
  if (line.startsWith("verify")) return verifyWorld(state);
  if (line.startsWith("commit")) return commit(state);
  if (line.startsWith("roll") || line === "reset") return rollback(state);
  return {
    ...state,
    logs: [...state.logs, log("error", `unknown ${raw}`)].slice(-12),
  };
}

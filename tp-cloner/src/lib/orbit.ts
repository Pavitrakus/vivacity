export type BodyState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  t: number;
};

export type OrbitReport = {
  energy: number;
  angularMomentum: number;
  eccentricity: number;
  periapsis: number;
  bound: boolean;
  clearance: boolean;
  stable: boolean;
};

export const GM = 1;
export const BODY_RADIUS = 0.2;
export const DEFAULT_RADIUS = 1;

export function circularOrbit(radius = DEFAULT_RADIUS): BodyState {
  const v = Math.sqrt(GM / radius);
  return { x: radius, y: 0, vx: 0, vy: v, t: 0 };
}

function accel(x: number, y: number): [number, number] {
  const r2 = x * x + y * y;
  const r = Math.sqrt(Math.max(r2, 1e-12));
  const factor = -GM / (r2 * r);
  return [factor * x, factor * y];
}

export function stepRK4(s: BodyState, dt: number): BodyState {
  const k1v = accel(s.x, s.y);
  const k1x: [number, number] = [s.vx, s.vy];

  const x2 = s.x + k1x[0] * dt * 0.5;
  const y2 = s.y + k1x[1] * dt * 0.5;
  const vx2 = s.vx + k1v[0] * dt * 0.5;
  const vy2 = s.vy + k1v[1] * dt * 0.5;
  const k2v = accel(x2, y2);
  const k2x: [number, number] = [vx2, vy2];

  const x3 = s.x + k2x[0] * dt * 0.5;
  const y3 = s.y + k2x[1] * dt * 0.5;
  const vx3 = s.vx + k2v[0] * dt * 0.5;
  const vy3 = s.vy + k2v[1] * dt * 0.5;
  const k3v = accel(x3, y3);
  const k3x: [number, number] = [vx3, vy3];

  const x4 = s.x + k3x[0] * dt;
  const y4 = s.y + k3x[1] * dt;
  const vx4 = s.vx + k3v[0] * dt;
  const vy4 = s.vy + k3v[1] * dt;
  const k4v = accel(x4, y4);
  const k4x: [number, number] = [vx4, vy4];

  return {
    x: s.x + (dt / 6) * (k1x[0] + 2 * k2x[0] + 2 * k3x[0] + k4x[0]),
    y: s.y + (dt / 6) * (k1x[1] + 2 * k2x[1] + 2 * k3x[1] + k4x[1]),
    vx: s.vx + (dt / 6) * (k1v[0] + 2 * k2v[0] + 2 * k3v[0] + k4v[0]),
    vy: s.vy + (dt / 6) * (k1v[1] + 2 * k2v[1] + 2 * k3v[1] + k4v[1]),
    t: s.t + dt,
  };
}

export function scaleVelocity(s: BodyState, factor: number): BodyState {
  return { ...s, vx: s.vx * factor, vy: s.vy * factor };
}

export function energy(s: BodyState): number {
  const r = Math.hypot(s.x, s.y);
  const v2 = s.vx * s.vx + s.vy * s.vy;
  return 0.5 * v2 - GM / Math.max(r, 1e-12);
}

export function angularMomentum(s: BodyState): number {
  return s.x * s.vy - s.y * s.vx;
}

export function eccentricity(s: BodyState): number {
  const E = energy(s);
  const L = angularMomentum(s);
  const value = 1 + (2 * E * L * L) / (GM * GM);
  return Math.sqrt(Math.max(0, value));
}

export function periapsis(s: BodyState): number {
  const E = energy(s);
  if (E >= 0) return Number.POSITIVE_INFINITY;
  const a = -GM / (2 * E);
  return a * (1 - eccentricity(s));
}

export function verify(s: BodyState): OrbitReport {
  const E = energy(s);
  const L = angularMomentum(s);
  const e = eccentricity(s);
  const rp = periapsis(s);
  const bound = E < -1e-4;
  const clearance = Number.isFinite(rp) && rp > BODY_RADIUS * 1.2;
  return {
    energy: E,
    angularMomentum: L,
    eccentricity: e,
    periapsis: rp,
    bound,
    clearance,
    stable: bound && clearance,
  };
}

export function propagate(
  start: BodyState,
  dt: number,
  steps: number
): BodyState[] {
  const trail: BodyState[] = new Array(steps + 1);
  trail[0] = start;
  let current = start;
  for (let i = 1; i <= steps; i += 1) {
    current = stepRK4(current, dt);
    trail[i] = current;
  }
  return trail;
}

export function formatNum(value: number, digits = 3): string {
  if (!Number.isFinite(value)) return "∞";
  const abs = Math.abs(value);
  if (abs >= 1e4) return value.toExponential(2);
  if (abs !== 0 && abs < 10 ** -digits) return (0).toFixed(digits);
  return value.toFixed(digits);
}

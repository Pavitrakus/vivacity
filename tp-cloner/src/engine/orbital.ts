import { type Vec3, add, cross, dot, len, scale, sub, vx } from "@/engine/math";

export type Body = {
  id: string;
  r: Vec3;
  v: Vec3;
  mass: number;
};

export type OrbitReport = {
  energy: number;
  angularMomentum: number;
  eccentricity: number;
  periapsis: number;
  period: number;
  bound: boolean;
  clearance: boolean;
  stable: boolean;
};

export const GM = 1;
export const BODY_RADIUS = 0.22;
export const DEFAULT_RADIUS = 1.35;

export function circularOrbit(radius = DEFAULT_RADIUS, inclination = 0.42): Body {
  const v = Math.sqrt(GM / radius);
  const i = inclination;
  return {
    id: "craft",
    r: { x: radius, y: 0, z: 0 },
    v: { x: 0, y: v * Math.sin(i), z: v * Math.cos(i) },
    mass: 1,
  };
}

function accelAt(r: Vec3): Vec3 {
  const d = Math.max(len(r), 1e-6);
  return scale(r, -GM / (d * d * d));
}

export function stepRK4(body: Body, dt: number): Body {
  const a1 = accelAt(body.r);
  const r2 = add(body.r, scale(body.v, dt * 0.5));
  const v2 = add(body.v, scale(a1, dt * 0.5));
  const a2 = accelAt(r2);
  const r3 = add(body.r, scale(v2, dt * 0.5));
  const v3 = add(body.v, scale(a2, dt * 0.5));
  const a3 = accelAt(r3);
  const r4 = add(body.r, scale(v3, dt));
  const v4 = add(body.v, scale(a3, dt));
  const a4 = accelAt(r4);
  return {
    ...body,
    r: add(
      body.r,
      scale(add(add(body.v, scale(v2, 2)), add(scale(v3, 2), v4)), dt / 6)
    ),
    v: add(
      body.v,
      scale(add(add(a1, scale(a2, 2)), add(scale(a3, 2), a4)), dt / 6)
    ),
  };
}

export function scaleVelocity(body: Body, factor: number): Body {
  return { ...body, v: scale(body.v, factor) };
}

export function energy(body: Body): number {
  const r = len(body.r);
  return 0.5 * dot(body.v, body.v) - GM / Math.max(r, 1e-9);
}

export function angularMomentum(body: Body): number {
  return len(cross(body.r, body.v));
}

export function eccentricity(body: Body): number {
  const E = energy(body);
  const L = angularMomentum(body);
  return Math.sqrt(Math.max(0, 1 + (2 * E * L * L) / (GM * GM)));
}

export function periapsis(body: Body): number {
  const E = energy(body);
  if (E >= 0) return Number.POSITIVE_INFINITY;
  const a = -GM / (2 * E);
  return a * (1 - eccentricity(body));
}

export function period(body: Body): number {
  const E = energy(body);
  if (E >= 0) return Number.POSITIVE_INFINITY;
  const a = -GM / (2 * E);
  return 2 * Math.PI * Math.sqrt(a * a * a / GM);
}

export function verify(body: Body): OrbitReport {
  const E = energy(body);
  const L = angularMomentum(body);
  const e = eccentricity(body);
  const rp = periapsis(body);
  const T = period(body);
  const bound = E < -1e-4;
  const clearance = Number.isFinite(rp) && rp > BODY_RADIUS * 1.25;
  return {
    energy: E,
    angularMomentum: L,
    eccentricity: e,
    periapsis: rp,
    period: T,
    bound,
    clearance,
    stable: bound && clearance,
  };
}

export function propagate(body: Body, dt: number, steps: number): Vec3[] {
  const trail: Vec3[] = new Array(steps + 1);
  let cur = body;
  trail[0] = cur.r;
  for (let i = 1; i <= steps; i += 1) {
    cur = stepRK4(cur, dt);
    trail[i] = cur.r;
  }
  return trail;
}

export function applyDeltaV(body: Body, delta: Vec3): Body {
  return { ...body, v: add(body.v, delta) };
}

export function radialBurn(body: Body, mag: number): Body {
  const dir = len(body.r) > 0 ? scale(body.r, 1 / len(body.r)) : vx(1, 0, 0);
  return applyDeltaV(body, scale(dir, mag));
}

export function progradeBurn(body: Body, mag: number): Body {
  const speed = len(body.v) || 1;
  return applyDeltaV(body, scale(body.v, mag / speed));
}

export function relativeVelocity(a: Body, b: Body): number {
  return len(sub(a.v, b.v));
}

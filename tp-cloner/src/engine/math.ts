export type Vec3 = { x: number; y: number; z: number };

export const vx = (x = 0, y = 0, z = 0): Vec3 => ({ x, y, z });

export function add(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function scale(a: Vec3, s: number): Vec3 {
  return { x: a.x * s, y: a.y * s, z: a.z * s };
}

export function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

export function len(a: Vec3): number {
  return Math.hypot(a.x, a.y, a.z);
}

export function norm(a: Vec3): Vec3 {
  const l = len(a) || 1;
  return scale(a, 1 / l);
}

export function lerp(a: Vec3, b: Vec3, t: number): Vec3 {
  return add(scale(a, 1 - t), scale(b, t));
}

export function hash(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export function noise3(p: Vec3): number {
  const i = {
    x: Math.floor(p.x),
    y: Math.floor(p.y),
    z: Math.floor(p.z),
  };
  const f = {
    x: p.x - i.x,
    y: p.y - i.y,
    z: p.z - i.z,
  };
  const u = {
    x: f.x * f.x * (3 - 2 * f.x),
    y: f.y * f.y * (3 - 2 * f.y),
    z: f.z * f.z * (3 - 2 * f.z),
  };
  const n000 = hash(i.x + i.y * 57 + i.z * 113);
  const n100 = hash(i.x + 1 + i.y * 57 + i.z * 113);
  const n010 = hash(i.x + (i.y + 1) * 57 + i.z * 113);
  const n110 = hash(i.x + 1 + (i.y + 1) * 57 + i.z * 113);
  const n001 = hash(i.x + i.y * 57 + (i.z + 1) * 113);
  const n101 = hash(i.x + 1 + i.y * 57 + (i.z + 1) * 113);
  const n011 = hash(i.x + (i.y + 1) * 57 + (i.z + 1) * 113);
  const n111 = hash(i.x + 1 + (i.y + 1) * 57 + (i.z + 1) * 113);
  const nx00 = n000 * (1 - u.x) + n100 * u.x;
  const nx10 = n010 * (1 - u.x) + n110 * u.x;
  const nx01 = n001 * (1 - u.x) + n101 * u.x;
  const nx11 = n011 * (1 - u.x) + n111 * u.x;
  const nxy0 = nx00 * (1 - u.y) + nx10 * u.y;
  const nxy1 = nx01 * (1 - u.y) + nx11 * u.y;
  return nxy0 * (1 - u.z) + nxy1 * u.z;
}

export function fbm(p: Vec3, octaves = 5): number {
  let v = 0;
  let a = 0.5;
  let s = { ...p };
  for (let i = 0; i < octaves; i += 1) {
    v += a * noise3(s);
    s = scale(s, 2.03);
    a *= 0.5;
  }
  return v;
}

export function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

export function mix(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t;
}

export function formatNum(value: number, digits = 3): string {
  if (!Number.isFinite(value)) return "∞";
  const abs = Math.abs(value);
  if (abs >= 1e4) return value.toExponential(2);
  if (abs !== 0 && abs < 10 ** -digits) return (0).toFixed(digits);
  return value.toFixed(digits);
}

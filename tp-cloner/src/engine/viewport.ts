import { BODY_RADIUS } from "@/engine/orbital";
import { type Vec3, clamp, fbm, mix, norm, scale, vx } from "@/engine/math";
import type { Branch, RuntimeState } from "@/engine/world";

type Cam = { yaw: number; pitch: number; dist: number };

type Projected = { x: number; y: number; z: number; px: number; py: number };

const STAR_COUNT = 420;
const EARTH_POINTS = 2400;

type Star = { p: Vec3; mag: number };
type EarthPt = { p: Vec3; land: number; ice: number };

function fibonacciSphere(count: number): Vec3[] {
  const pts: Vec3[] = [];
  const offset = 2 / count;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * golden;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

function makeStars(): Star[] {
  return fibonacciSphere(STAR_COUNT).map((p, i) => ({
    p: scale(p, 18 + (i % 7) * 0.35),
    mag: 0.35 + (i % 9) * 0.07,
  }));
}

function makeEarth(): EarthPt[] {
  return fibonacciSphere(EARTH_POINTS).map((p) => {
    const n = fbm(scale(p, 2.4), 5);
    const polar = Math.abs(p.y);
    const land = clamp((n - 0.46) * 4.2, 0, 1);
    const ice = clamp((polar - 0.72) * 4 + n * 0.2, 0, 1);
    return { p: scale(p, BODY_RADIUS), land, ice };
  });
}

const STARS = makeStars();
const EARTH = makeEarth();
const LIGHT = norm(vx(-0.55, 0.35, 0.75));

export class Viewport {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private w = 1;
  private h = 1;
  private dpr = 1;
  private cam: Cam = { yaw: 0.55, pitch: 0.28, dist: 3.35 };
  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private auto = true;
  private onDrag?: (v: boolean) => void;

  private ro?: ResizeObserver;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("canvas");
    this.ctx = ctx;
    this.bind();
    if (typeof ResizeObserver !== "undefined") {
      this.ro = new ResizeObserver(() => this.resize());
      const parent = canvas.parentElement;
      if (parent) this.ro.observe(parent);
    }
  }

  setDragHandler(fn: (v: boolean) => void) {
    this.onDrag = fn;
  }

  destroy() {
    this.ro?.disconnect();
    this.canvas.onpointerdown = null;
    this.canvas.onpointermove = null;
    this.canvas.onpointerup = null;
    this.canvas.onpointerleave = null;
    this.canvas.onwheel = null;
  }

  private bind() {
    this.canvas.onpointerdown = (e) => {
      this.dragging = true;
      this.auto = false;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.canvas.setPointerCapture(e.pointerId);
      this.onDrag?.(true);
    };
    this.canvas.onpointermove = (e) => {
      if (!this.dragging) return;
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.cam.yaw += dx * 0.005;
      this.cam.pitch = clamp(this.cam.pitch + dy * 0.004, -0.9, 0.9);
    };
    this.canvas.onpointerup = () => {
      this.dragging = false;
      this.onDrag?.(false);
    };
    this.canvas.onpointerleave = () => {
      this.dragging = false;
    };
    this.canvas.onwheel = (e) => {
      e.preventDefault();
      this.auto = false;
      this.cam.dist = clamp(this.cam.dist + e.deltaY * 0.0022, 2.1, 6.2);
    };
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (w < 2 || h < 2) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = w;
    this.h = h;
    this.canvas.width = Math.floor(this.w * this.dpr);
    this.canvas.height = Math.floor(this.h * this.dpr);
    this.canvas.style.width = `${this.w}px`;
    this.canvas.style.height = `${this.h}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  tick(dt: number) {
    if (this.auto && !this.dragging) this.cam.yaw += dt * 0.12;
  }

  private basis() {
    const { yaw, pitch, dist } = this.cam;
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    const eye = vx(cy * cp * dist, sp * dist, sy * cp * dist);
    const forward = norm(scale(eye, -1));
    const right = norm(vx(-sy, 0, cy));
    const up = vx(
      right.y * forward.z - right.z * forward.y,
      right.z * forward.x - right.x * forward.z,
      right.x * forward.y - right.y * forward.x
    );
    return { forward, right, up, eye };
  }

  private project(p: Vec3): Projected {
    const { right, up, forward, eye } = this.basis();
    const rel = { x: p.x - eye.x, y: p.y - eye.y, z: p.z - eye.z };
    const x = rel.x * right.x + rel.y * right.y + rel.z * right.z;
    const y = rel.x * up.x + rel.y * up.y + rel.z * up.z;
    const z = rel.x * forward.x + rel.y * forward.y + rel.z * forward.z;
    const s = (Math.min(this.w, this.h) * 0.48) / Math.max(0.28, z);
    return {
      x,
      y,
      z,
      px: this.w / 2 + x * s,
      py: this.h / 2 - y * s,
    };
  }

  draw(state: RuntimeState) {
    const { ctx, w, h } = this;
    ctx.fillStyle = "#13110e";
    ctx.fillRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(w * 0.5, h * 0.48, 20, w * 0.5, h * 0.5, Math.max(w, h) * 0.55);
    glow.addColorStop(0, "rgba(196, 90, 36, 0.12)");
    glow.addColorStop(1, "rgba(19, 17, 14, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    this.drawStars();
    this.drawGrid();
    this.drawAtmosphere();
    this.drawEarth();
    this.drawTrail(state.committedTrail, "rgba(232, 214, 184, 0.35)", 1.15);
    state.branches.forEach((b, i) => {
      const selected = state.selected === b.id;
      this.drawTrail(
        b.trail,
        branchColor(b, i, selected),
        selected ? 2.1 : 1.15
      );
    });
    this.drawCraft(state.live.r);
    this.drawRings();
  }

  private drawStars() {
    const { ctx } = this;
    for (const star of STARS) {
      const p = this.project(star.p);
      if (p.z < 0.4) continue;
      ctx.fillStyle = `rgba(236, 226, 206, ${star.mag * 0.7})`;
      ctx.fillRect(p.px, p.py, star.mag > 0.7 ? 1.6 : 1, star.mag > 0.7 ? 1.6 : 1);
    }
  }

  private drawGrid() {
    const { ctx } = this;
    ctx.strokeStyle = "rgba(232, 214, 184, 0.08)";
    ctx.lineWidth = 1;
    for (let r = 0.7; r <= 2.2; r += 0.5) {
      ctx.beginPath();
      let started = false;
      for (let a = 0; a <= 64; a += 1) {
        const th = (a / 64) * Math.PI * 2;
        const p = this.project({ x: Math.cos(th) * r, y: 0, z: Math.sin(th) * r });
        if (p.z < 0.2) continue;
        if (!started) {
          ctx.moveTo(p.px, p.py);
          started = true;
        } else ctx.lineTo(p.px, p.py);
      }
      ctx.stroke();
    }
  }

  private drawAtmosphere() {
    const { ctx } = this;
    const c = this.project(vx(0, 0, 0));
    const rim = this.project(vx(BODY_RADIUS * 1.55, 0, 0));
    const rad = Math.hypot(rim.px - c.px, rim.py - c.py);
    const g = ctx.createRadialGradient(c.px, c.py, rad * 0.55, c.px, c.py, rad);
    g.addColorStop(0, "rgba(196, 90, 36, 0)");
    g.addColorStop(0.72, "rgba(196, 90, 36, 0.1)");
    g.addColorStop(1, "rgba(196, 90, 36, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(c.px, c.py, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawEarth() {
    const { ctx } = this;
    const center = this.project(vx(0, 0, 0));
    const edge = this.project(vx(BODY_RADIUS, 0, 0));
    const rad = Math.max(8, Math.hypot(edge.px - center.px, edge.py - center.py));
    const disc = ctx.createRadialGradient(
      center.px - rad * 0.25,
      center.py - rad * 0.2,
      rad * 0.1,
      center.px,
      center.py,
      rad
    );
    disc.addColorStop(0, "#2a3a48");
    disc.addColorStop(0.7, "#1a242e");
    disc.addColorStop(1, "#10161c");
    ctx.fillStyle = disc;
    ctx.beginPath();
    ctx.arc(center.px, center.py, rad, 0, Math.PI * 2);
    ctx.fill();

    for (const pt of EARTH) {
      const pr = this.project(pt.p);
      if (pr.z < 0.15) continue;
      const n = norm(pt.p);
      const lit = clamp(n.x * LIGHT.x + n.y * LIGHT.y + n.z * LIGHT.z, 0, 1);
      if (lit < 0.02 && pt.ice < 0.4) continue;
      const size = mix(0.7, 1.7, lit);
      let r = 18;
      let g = 48;
      let b = 82;
      if (pt.land > 0.15) {
        r = mix(28, 92, pt.land);
        g = mix(58, 118, pt.land);
        b = mix(48, 72, pt.land);
      }
      if (pt.ice > 0.35) {
        r = mix(r, 214, pt.ice);
        g = mix(g, 226, pt.ice);
        b = mix(b, 236, pt.ice);
      }
      const shade = 0.18 + lit * 0.82;
      ctx.fillStyle = `rgb(${Math.floor(r * shade)},${Math.floor(g * shade)},${Math.floor(b * shade)})`;
      ctx.fillRect(pr.px, pr.py, size, size);
    }
  }

  private drawTrail(points: Vec3[], color: string, width: number) {
    if (points.length < 2) return;
    const { ctx } = this;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineJoin = "round";
    let started = false;
    for (const p of points) {
      const pr = this.project(p);
      if (pr.z < 0.12) continue;
      if (!started) {
        ctx.moveTo(pr.px, pr.py);
        started = true;
      } else ctx.lineTo(pr.px, pr.py);
    }
    ctx.stroke();
  }

  private drawCraft(r: Vec3) {
    const { ctx } = this;
    const p = this.project(r);
    if (p.z < 0.1) return;
    ctx.save();
    ctx.shadowColor = "rgba(255, 210, 120, 0.8)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#ffe6b0";
    ctx.beginPath();
    ctx.arc(p.px, p.py, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "rgba(255, 230, 176, 0.35)";
    ctx.beginPath();
    ctx.arc(p.px, p.py, 8, 0, Math.PI * 2);
    ctx.stroke();
  }

  private drawRings() {
    const { ctx, w, h } = this;
    const m = 14.5;
    ctx.strokeStyle = "rgba(232, 214, 184, 0.12)";
    ctx.strokeRect(m, m, w - m * 2, h - m * 2);
    ctx.fillStyle = "rgba(196, 90, 36, 0.85)";
    const tick = 7;
    ctx.fillRect(m, m, tick, 1);
    ctx.fillRect(m, m, 1, tick);
    ctx.fillRect(w - m - tick, m, tick, 1);
    ctx.fillRect(w - m - 1, m, 1, tick);
    ctx.fillRect(m, h - m - 1, tick, 1);
    ctx.fillRect(m, h - m - tick, 1, tick);
    ctx.fillRect(w - m - tick, h - m - 1, tick, 1);
    ctx.fillRect(w - m - 1, h - m - tick, 1, tick);
  }
}

function branchColor(b: Branch, i: number, selected: boolean): string {
  if (!b.report.stable) return selected ? "rgba(196, 70, 48, 0.9)" : "rgba(196, 70, 48, 0.4)";
  const palette = [
    "rgba(196, 90, 36, 0.85)",
    "rgba(232, 214, 184, 0.7)",
    "rgba(214, 168, 96, 0.8)",
    "rgba(168, 196, 156, 0.7)",
    "rgba(214, 140, 88, 0.75)",
  ];
  return selected ? palette[i % palette.length].replace("0.7", "0.95").replace("0.85", "1") : palette[i % palette.length];
}


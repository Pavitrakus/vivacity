"use client";

import { useEffect, useRef } from "react";
import { BODY_RADIUS, type BodyState } from "@/lib/orbit";

export type TrailLayer = {
  points: BodyState[];
  color: string;
  width?: number;
  alpha?: number;
};

type OrbitCanvasProps = {
  layers: TrailLayer[];
  live?: BodyState | null;
  className?: string;
};

export function OrbitCanvas({ layers, live, className }: OrbitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = "#07080b";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.34;

      ctx.strokeStyle = "rgba(238,234,226,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 1.45, 0, Math.PI * 2);
      ctx.stroke();

      const toX = (x: number) => cx + x * scale;
      const toY = (y: number) => cy - y * scale;

      for (const layer of layers) {
        if (layer.points.length < 2) continue;
        ctx.beginPath();
        ctx.strokeStyle = layer.color;
        ctx.globalAlpha = layer.alpha ?? 1;
        ctx.lineWidth = layer.width ?? 1.15;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.moveTo(toX(layer.points[0].x), toY(layer.points[0].y));
        for (let i = 1; i < layer.points.length; i += 1) {
          ctx.lineTo(toX(layer.points[i].x), toY(layer.points[i].y));
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      const planetR = BODY_RADIUS * scale;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, planetR * 2.4);
      glow.addColorStop(0, "rgba(238,234,226,0.18)");
      glow.addColorStop(1, "rgba(238,234,226,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, planetR * 2.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#d8d3c8";
      ctx.beginPath();
      ctx.arc(cx, cy, planetR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(8,9,11,0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (live) {
        ctx.fillStyle = "#eeeae2";
        ctx.beginPath();
        ctx.arc(toX(live.x), toY(live.y), 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [layers, live]);

  return <canvas ref={canvasRef} className={className} />;
}

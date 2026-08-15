"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type HighlightItem = {
  label: string;
  color?: string;
};

const DEFAULT_COLORS = [
  "#6b7280",
  "#4b5563",
  "#52525b",
  "#3f3f46",
  "#71717a",
  "#57534e",
];

export function HighlightGrid({
  rows,
  colors = DEFAULT_COLORS,
  className,
}: {
  rows: HighlightItem[][];
  colors?: string[];
  className?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<Map<number, HTMLElement>>(new Map());
  const activeRef = useRef<{ gi: number; color: string } | null>(null);
  const [active, setActive] = useState(0);

  const gridRows = useMemo(() => {
    let gi = 0;
    return rows.map((row) =>
      row.map((item) => {
        const idx = gi++;
        return {
          label: item.label,
          color: item.color ?? colors[idx % colors.length],
          gi: idx,
        };
      })
    );
  }, [rows, colors]);

  const moveTo = useCallback((gi: number, color: string) => {
    const grid = gridRef.current;
    const highlight = highlightRef.current;
    const el = cellRefs.current.get(gi);
    if (!grid || !highlight || !el) return;
    const rect = el.getBoundingClientRect();
    const crect = grid.getBoundingClientRect();
    highlight.style.transform = `translate(${rect.left - crect.left}px, ${rect.top - crect.top}px)`;
    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
    highlight.style.backgroundColor = color;
    activeRef.current = { gi, color };
  }, []);

  useEffect(() => {
    const first = gridRows[0]?.[0];
    if (!first) return;
    const h = highlightRef.current;
    if (h) {
      h.style.transitionDuration = "0s";
      moveTo(first.gi, first.color);
      requestAnimationFrame(() => {
        if (h) h.style.transitionDuration = "250ms";
      });
    }
    const onResize = () => {
      if (activeRef.current) moveTo(activeRef.current.gi, activeRef.current.color);
    };
    const grid = gridRef.current;
    const ro = grid ? new ResizeObserver(onResize) : null;
    if (grid && ro) ro.observe(grid);
    window.addEventListener("resize", onResize);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [gridRows, moveTo]);

  return (
    <div
      ref={gridRef}
      className={cn("relative overflow-hidden rounded-2xl border border-white/12", className)}
    >
      <div
        ref={highlightRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.18), rgba(255,255,255,0) 52%)",
          transitionProperty: "transform, width, height, background-color",
          transitionDuration: "250ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      {gridRows.map((row, r) => (
        <div
          key={r}
          className={cn(
            "flex min-h-[52px]",
            r < gridRows.length - 1 && "border-b border-white/10"
          )}
        >
          {row.map((cell, c) => {
            const isActive = active === cell.gi;
            return (
              <button
                key={cell.gi}
                type="button"
                ref={(el) => {
                  if (el) cellRefs.current.set(cell.gi, el);
                  else cellRefs.current.delete(cell.gi);
                }}
                onMouseEnter={() => {
                  setActive(cell.gi);
                  moveTo(cell.gi, cell.color);
                }}
                className={cn(
                  "flex flex-1 items-center justify-center px-2 py-3",
                  c < row.length - 1 && "border-r border-white/10"
                )}
              >
                <span
                  className={cn(
                    "relative z-[2] font-pixel text-[11px] tracking-wide uppercase transition-colors duration-200 sm:text-xs",
                    isActive ? "text-white" : "text-white/50"
                  )}
                >
                  {cell.label}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

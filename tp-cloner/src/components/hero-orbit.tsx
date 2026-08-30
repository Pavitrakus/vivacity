"use client";

import { useEffect, useMemo, useState } from "react";
import { OrbitCanvas } from "@/components/orbit-canvas";
import {
  circularOrbit,
  formatNum,
  propagate,
  stepRK4,
  verify,
  type BodyState,
} from "@/lib/orbit";

const DT = 0.016;

export function HeroOrbit() {
  const [state, setState] = useState<BodyState>(() => circularOrbit(1));
  const trail = useMemo(() => propagate(circularOrbit(1), 0.02, 360), []);
  const report = verify(state);

  useEffect(() => {
    let frame = 0;
    let current = circularOrbit(1);
    const tick = () => {
      current = stepRK4(current, DT);
      setState(current);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="panel relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5 font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase">
        <span>world.observe()</span>
        <span className="text-emerald-300/80">bound · e={formatNum(report.eccentricity, 3)}</span>
      </div>
      <div className="relative h-[320px] sm:h-[380px]">
        <OrbitCanvas
          layers={[{ points: trail, color: "rgba(238,234,226,0.28)", width: 1.1 }]}
          live={state}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <dl className="grid grid-cols-4 border-t border-white/8 font-mono text-[11px]">
        {[
          ["x", formatNum(state.x)],
          ["y", formatNum(state.y)],
          ["vx", formatNum(state.vx)],
          ["vy", formatNum(state.vy)],
        ].map(([k, v]) => (
          <div key={k} className="border-white/8 px-3 py-2.5 not-first:border-l">
            <dt className="text-white/35">{k}</dt>
            <dd className="mt-0.5 text-[#eeeae2]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

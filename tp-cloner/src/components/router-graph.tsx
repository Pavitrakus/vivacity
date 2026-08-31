const NODES = [
  { id: "agent", x: 72, y: 118, label: "Agent" },
  { id: "runtime", x: 280, y: 118, label: "Vivacity" },
  { id: "phys", x: 520, y: 36, label: "Exact physics" },
  { id: "sci", x: 520, y: 92, label: "Solvers" },
  { id: "robot", x: 520, y: 148, label: "Robotics" },
  { id: "wm", x: 520, y: 204, label: "World models" },
] as const;

export function RouterGraph() {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 640 248"
        className="h-auto w-full min-w-[520px] max-w-[720px]"
        role="img"
        aria-label="Agent calls Vivacity. Vivacity routes to exact physics, solvers, robotics, or world models."
      >
        <line x1="118" y1="118" x2="232" y2="118" stroke="rgba(22,20,16,0.28)" strokeWidth="1.2" />
        {NODES.slice(2).map((n) => (
          <line
            key={n.id}
            x1="328"
            y1="118"
            x2="472"
            y2={n.y}
            stroke="rgba(196,90,36,0.55)"
            strokeWidth="1.15"
          />
        ))}
        {NODES.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x - 46}
              y={n.y - 16}
              width="92"
              height="32"
              rx="1"
              fill={n.id === "runtime" ? "#13110e" : "#f7f3ec"}
              stroke={n.id === "runtime" ? "#13110e" : "rgba(22,20,16,0.18)"}
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fill={n.id === "runtime" ? "#efe8dc" : "#161410"}
              fontSize="11"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

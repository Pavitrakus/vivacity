import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          color: "#eeeae2",
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: 0.55,
          }}
        >
          <span>Vivacity</span>
          <span>tryvivacity.com</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              maxWidth: 920,
            }}
          >
            Simulation runtime for AI agents.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              opacity: 0.62,
              maxWidth: 760,
            }}
          >
            create · observe · act · fork · simulate · verify · commit
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

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
          background: "#f2eee6",
          color: "#161410",
          padding: "72px 80px",
          fontFamily: "Georgia, ui-serif, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "ui-monospace, monospace",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6e675b",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 99,
                background: "#c45a24",
              }}
            />
            Vivacity
          </span>
          <span>tryvivacity.com</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              maxWidth: 940,
            }}
          >
            Simulation runtime for AI agents.
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 20,
              color: "#6e675b",
              letterSpacing: "0.04em",
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

import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "HyperNova Technologies — We build digital things that actually work.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#FAF9F6",
          fontFamily: "sans-serif",
        }}
      >
        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 12,
              height: 12,
              background: "#4A2BFF",
              marginRight: 16,
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#5A5A63",
            }}
          >
            HyperNova Technologies — Independent Digital Studio
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -3,
            color: "#0E0E10",
            maxWidth: 980,
          }}
        >
          We build digital things that actually work.
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #E2E0DA",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: "#5A5A63" }}>
            Digital Cards · Web Apps · Mobile Apps · Marketing Sites
          </div>
          <div style={{ display: "flex", width: 120, height: 8, background: "#4A2BFF" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}

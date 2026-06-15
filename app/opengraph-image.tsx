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
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#111119",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(108,71,255,0.25), transparent 55%), radial-gradient(circle at 90% 95%, rgba(0,217,255,0.18), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eyebrow with accent dot */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "linear-gradient(135deg, #6C47FF, #00D9FF)",
              marginRight: 16,
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9B9BAD",
            }}
          >
            Digital Studio
          </div>
        </div>

        {/* brand name with gradient */}
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            backgroundImage: "linear-gradient(120deg, #F0F0F5 0%, #B9A9FF 60%, #00D9FF 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          HyperNova Technologies
        </div>

        {/* tagline */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 40,
            color: "#F0F0F5",
          }}
        >
          We build digital things that actually work.
        </div>

        {/* accent underline bar */}
        <div
          style={{
            marginTop: 44,
            width: 240,
            height: 8,
            borderRadius: 4,
            background: "linear-gradient(90deg, #6C47FF, #00D9FF)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const alt = "DoCHEng — The Intelligence Ecosystem";
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050510",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "30%",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(59, 130, 246, 0.12), transparent 70%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            marginBottom: 28,
            boxShadow: "0 0 60px rgba(59, 130, 246, 0.3)",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            DC
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#F1F5F9",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 12,
          }}
        >
          DoCHEng
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#64748B",
            letterSpacing: "5px",
            textTransform: "uppercase" as const,
            marginBottom: 24,
          }}
        >
          Driven by Curiosity
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "#94A3B8",
            maxWidth: 650,
            textAlign: "center" as const,
            lineHeight: 1.5,
          }}
        >
          AI-powered tools for learning, work, and technical growth.
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent, #3B82F6, #F59E0B, #3B82F6, transparent)",
          }}
        />
      </div>
    ),
    size
  );
}

import { ImageResponse } from "next/og";

export const alt = "DoCHEng — The Intelligence Ecosystem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "20%",
            width: 400,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(245, 158, 11, 0.08), transparent 70%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            marginBottom: 32,
            boxShadow: "0 0 60px rgba(59, 130, 246, 0.3)",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 36,
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
            fontSize: 72,
            fontWeight: 700,
            color: "#F1F5F9",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          DoCHEng
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#64748B",
            letterSpacing: "6px",
            textTransform: "uppercase" as const,
            marginBottom: 28,
          }}
        >
          Driven by Curiosity
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: "#94A3B8",
            maxWidth: 700,
            textAlign: "center" as const,
            lineHeight: 1.5,
          }}
        >
          The intelligence ecosystem for learning, work, and technical growth.
        </div>

        {/* Bottom accent line */}
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

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-content";

export const alt = siteConfig.description;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 12% 12%, rgba(130,232,192,0.22), transparent 32%), radial-gradient(circle at 85% 18%, rgba(111,190,255,0.18), transparent 24%), linear-gradient(180deg, #071116 0%, #04070a 100%)",
          color: "#f3f8f8",
          padding: "64px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "36px",
            padding: "48px",
            background: "linear-gradient(160deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))",
            boxShadow: "0 28px 90px rgba(0,0,0,0.38)",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "720px" }}>
            <div
              style={{
                fontSize: 16,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#82e8c0",
                fontFamily: "monospace",
              }}
            >
              WeChat AI Agent Bridge
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 72,
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: "-0.06em",
              }}
            >
              Turn WeChat into the operator surface for Claude, Codex, Gemini, and more.
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 28,
                lineHeight: 1.45,
                color: "rgba(243,248,248,0.74)",
              }}
            >
              Install once, scan the QR login, auto-detect ACP, CLI, and HTTP integrations, and route real threads through WeClaw.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 280,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 228,
                height: 228,
                borderRadius: 56,
                border: "14px solid rgba(130,232,192,0.82)",
                position: "relative",
                boxShadow: "0 0 0 14px rgba(255,255,255,0.06) inset",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 36,
                  borderRadius: 42,
                  border: "18px dashed rgba(130,232,192,0.58)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 60,
                  borderRadius: 32,
                  background: "rgba(8,15,20,0.85)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 88,
                  fontWeight: 700,
                }}
              >
                W
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

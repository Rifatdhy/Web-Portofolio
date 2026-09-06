import { ImageResponse } from "next/og";

export const alt = "Rifat Dhiya Ul Lail, Web & Network Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0b0b0d 0%, #15151a 100%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, color: "#f5f5f7", letterSpacing: "-0.03em" }}>
          Rifat Dhiya Ul Lail
        </div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 32, color: "#a1a1a6", fontWeight: 500 }}>
          Web &amp; Network Engineer
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            padding: "12px 32px",
            borderRadius: 999,
            border: "1px solid #3a3a42",
            fontSize: 22,
            color: "#8a8a91",
            fontFamily: "monospace",
          }}
        >
          React, Next.js, Laravel, TypeScript, Networking
        </div>
      </div>
    ),
    { ...size }
  );
}

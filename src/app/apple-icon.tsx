import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen / bookmark icon. Mirrors the "RD" monogram in
 * public/favicon.svg (warm gray #787774, light text) so the bookmark
 * matches the browser tab instead of 404-ing.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#787774",
          color: "#FBFBFA",
          fontSize: 92,
          fontWeight: 700,
        }}
      >
        RD
      </div>
    ),
    { ...size }
  );
}

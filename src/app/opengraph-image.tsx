import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// Social-share card, generated at build time from the owner's name and role,
// using the portfolio palette (light theme).
export const alt = `${profile.name}: ${profile.role}`;
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
          background: "#F7F5F2",
          color: "#141414",
          padding: 80,
          borderLeft: "24px solid #C23D06",
        }}
      >
        <div style={{ fontSize: 28, color: "#C23D06", letterSpacing: 2 }}>
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 44, marginTop: 28, color: "#6b6864" }}>
            {profile.role}
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#6b6864" }}>{profile.education}</div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";
import { weddingConfig as config } from "@/config/wedding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#6E142F",
        padding: 32,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: "2px solid #D8B46A",
          background: "#48205F",
          color: "#FFF8F0",
        }}
      >
        <div
          style={{
            color: "#D8B46A",
            fontSize: 25,
            letterSpacing: 8,
            marginBottom: 24,
          }}
        >
          THE WEDDING INVITATION
        </div>
        <div style={{ display: "flex", fontFamily: "serif", fontSize: 112 }}>
          {config.couple.groom.nameEn} & {config.couple.bride.nameEn}
        </div>
        <div
          style={{ width: 240, borderTop: "1px solid #D8B46A", margin: 28 }}
        />
        <div style={{ fontSize: 31, color: "#D8B46A" }}>{config.dateLabel}</div>
        {config.sample && (
          <div style={{ fontSize: 18, marginTop: 28 }}>SAMPLE INVITATION</div>
        )}
      </div>
    </div>,
  );
}

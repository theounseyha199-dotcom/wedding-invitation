import { ImageResponse } from "next/og";
import { weddingConfig as config } from "@/config/wedding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${config.couple.groom.nameEn} & ${config.couple.bride.nameEn} — Wedding invitation`;

// File-based image metadata cannot inherit CSS variables; mirror globals.css.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#EEDCE4",
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
          border: "2px solid #BE8F83",
          background: "#FFF7F2",
          color: "#4E3A3A",
        }}
      >
        <div
          style={{
            color: "#75504A",
            fontSize: 25,
            letterSpacing: 8,
            marginBottom: 24,
          }}
        >
          THE WEDDING INVITATION
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "serif",
            fontSize: 76,
          }}
        >
          <div>{config.couple.groom.nameEn}</div>
          <div style={{ fontSize: 38, color: "#75504A" }}>&</div>
          <div>{config.couple.bride.nameEn}</div>
        </div>
        <div
          style={{ width: 240, borderTop: "1px solid #BE8F83", margin: 22 }}
        />
        <div style={{ fontSize: 27, color: "#75504A" }}>
          {new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: config.timezone,
          }).format(new Date(config.dateISO))}
        </div>
        {config.sample && (
          <div style={{ fontSize: 16, marginTop: 20 }}>SAMPLE INVITATION</div>
        )}
      </div>
    </div>,
  );
}

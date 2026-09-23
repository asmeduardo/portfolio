import { ImageResponse } from "next/og";

import { portfolio } from "@/data/portfolio";

export const alt = `Portfólio de ${portfolio.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "linear-gradient(135deg, #07111f 0%, #0d2231 60%, #0f766e 140%)",
        color: "#f5fbfa",
        display: "flex",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 86px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
        <span
          style={{
            color: "#5eead4",
            fontSize: 24,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Portfólio profissional
        </span>
        <strong
          style={{ fontSize: 76, letterSpacing: "-0.05em", marginTop: 24 }}
        >
          {portfolio.name}
        </strong>
        <span
          style={{
            color: "#b8c9d2",
            fontSize: 30,
            lineHeight: 1.35,
            marginTop: 20,
          }}
        >
          Engenheiro de Software · Java & Spring Boot · React
        </span>
      </div>
      <div
        style={{
          alignItems: "center",
          border: "2px solid rgba(94,234,212,.45)",
          borderRadius: 48,
          color: "#5eead4",
          display: "flex",
          fontSize: 64,
          height: 190,
          justifyContent: "center",
          width: 190,
        }}
      >
        EM
      </div>
    </div>,
    size,
  );
}

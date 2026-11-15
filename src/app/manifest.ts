import type { MetadataRoute } from "next";

import { portfolio } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${portfolio.name} — Portfólio`,
    short_name: portfolio.name,
    description: `Portfólio profissional de ${portfolio.name}, ${portfolio.title}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#07111f",
    theme_color: "#0f9f85",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

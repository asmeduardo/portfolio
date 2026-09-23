import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eduardo Melo — Portfólio",
    short_name: "Eduardo Melo",
    description:
      "Portfólio profissional de Eduardo Melo, Engenheiro de Software.",
    start_url: "/",
    display: "standalone",
    background_color: "#07111f",
    theme_color: "#0f9f85",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

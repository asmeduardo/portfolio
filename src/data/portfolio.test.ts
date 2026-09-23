import { describe, expect, it } from "vitest";

import { getProject, portfolio } from "@/data/portfolio";

describe("portfolio data", () => {
  it("keeps project slugs unique and resolvable", () => {
    const slugs = portfolio.projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => getProject(slug)?.slug === slug)).toBe(true);
  });

  it("does not publish a telephone number", () => {
    expect(JSON.stringify(portfolio)).not.toMatch(
      /\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}/,
    );
  });

  it("marks every private case explicitly", () => {
    const privateProjects = portfolio.projects.filter(
      (project) => project.status !== "Publicado",
    );

    expect(privateProjects).not.toHaveLength(0);
    expect(privateProjects.every((project) => project.links.length === 0)).toBe(
      true,
    );
  });
});

import { describe, expect, it } from "vitest";

import { getProject, portfolio } from "@/data/portfolio";

describe("portfolio data", () => {
  it("publishes the complete professional name", () => {
    expect(portfolio.name).toBe("Eduardo de Melo");
  });
  it("uses the same title and headline as the résumé", () => {
    expect(portfolio.title).toBe("Desenvolvedor de Software");
    expect(portfolio.role).toBe(
      "Desenvolvedor de Software | Java, Spring Boot e APIs REST",
    );
  });
  it("states experience and location exactly as the résumé", () => {
    expect(portfolio.location).toBe("Ouro Branco, MG");
    expect(portfolio.impact[0].value).toBe("≈3 anos");
    expect(portfolio.about[0]).toContain("cerca de 3 anos");
    expect(portfolio.about[0]).toContain("cofundador de um SaaS");
    expect(JSON.stringify(portfolio)).not.toMatch(/2\+ anos|dois anos/);
  });
  it("presents Vigoru as the launched product described in the résumé", () => {
    const vigoru = getProject("vigoru");

    expect(vigoru?.title).toBe("Vigoru");
    expect(vigoru?.status).toBe("Lançado");
    expect(vigoru?.privateCode).toBe(true);
    expect(vigoru?.technologies).toEqual(
      expect.arrayContaining(["Java 21", "Spring Boot", "Capacitor"]),
    );
    expect(vigoru?.technologies).not.toContain("Flutter");
    expect(vigoru?.links.map((link) => link.href)).toContain(
      "https://vigoru.fit",
    );
    expect(JSON.stringify(vigoru)).not.toMatch(/não é lançado|VigorU/);
  });

  it("keeps project slugs unique and resolvable", () => {
    const slugs = portfolio.projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => getProject(slug)?.slug === slug)).toBe(true);
  });

  it("does not publish a telephone number", () => {
    const publicContent = JSON.stringify(portfolio).replaceAll(
      /amazon\.com\.br\/s\?k=\d{13}/g,
      "amazon.com.br/s?k=ISBN",
    );
    expect(publicContent).not.toMatch(/\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}/);
  });

  it("marks every private case explicitly", () => {
    const privateProjects = portfolio.projects.filter(
      (project) => project.status === "Privado",
    );

    expect(privateProjects).not.toHaveLength(0);
    expect(privateProjects.every((project) => project.links.length === 0)).toBe(
      true,
    );
  });

  it("never links the source code of a project whose code is private", () => {
    const privateCode = portfolio.projects.filter(
      (project) => project.privateCode,
    );

    expect(privateCode).not.toHaveLength(0);
    for (const project of privateCode) {
      expect(
        project.links.every(
          (link) => !new URL(link.href).hostname.endsWith("github.com"),
        ),
      ).toBe(true);
    }
  });
});

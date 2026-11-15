import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const html = readFileSync(resolve("resume/eduardo-melo-publico.html"), "utf8");
const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

describe("public résumé", () => {
  it("never publishes a telephone number", () => {
    expect(text).not.toMatch(/\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}/);
  });

  it("matches the current résumé headline, stack and experience", () => {
    for (const fact of [
      "Desenvolvedor de Software | Java, Spring Boot e APIs REST",
      "cerca de 3 anos",
      "Java 21/25",
      "Vigoru",
      "Liderei a arquitetura",
      "EcoSelo",
      "IPTU Verde",
      "Cálculo Psicrométrico",
      "The Complete JavaScript Course",
    ]) {
      expect(text).toContain(fact);
    }
  });
});

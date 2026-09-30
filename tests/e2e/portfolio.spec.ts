import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("presents the professional home page without accessibility violations", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "problemas reais",
  );
  await expect(
    page.getByRole("heading", {
      name: "Trabalhos selecionados.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Baixar currículo" }),
  ).toHaveAttribute("href", "/eduardo-melo-curriculo.pdf");
  await expect(
    page.getByRole("heading", { name: "Estudo aplicado à prática." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Ideias que levo para o código." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Ver Código Limpo na Amazon" }),
  ).toHaveAttribute("href", /amazon\.com\.br\/s\?k=/);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("opens a case and exposes its evidence", async ({ page }) => {
  await page.goto("/projetos/calculo-psicrometrico");

  await expect(
    page.getByRole("heading", { level: 1, name: "Calculo Psicrometrico" }),
  ).toBeVisible();
  await expect(page.getByText("72,28 para 89,64")).toBeVisible();
  await expect(page.getByText("≈3,6 mil")).toBeVisible();
  await expect(
    page.getByText("dispositivos ativos em julho de 2025"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Ver na Google Play" }),
  ).toHaveAttribute("href", /play\.google\.com/);
  await expect(
    page.getByRole("link", { name: "Ler o artigo no IFMG" }),
  ).toHaveAttribute("href", /ifmg\.edu\.br/);
  await expect(
    page.getByRole("heading", { name: "O produto em imagens" }),
  ).toBeVisible();
  await expect(page.locator(".project-gallery-grid img")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "O que usuários disseram" }),
  ).toBeVisible();
  await expect(page.locator(".project-review-grid img")).toHaveCount(3);
});

test("shows project previews and navigable book covers", async ({ page }) => {
  await page.goto("/");

  const previews = page.locator(".project-visual-with-image img");
  await expect(previews).toHaveCount(2);
  await expect(page.locator(".project-card-3 .project-visual img")).toHaveCount(
    0,
  );
  await expect(
    page.getByRole("link", { name: "Ver projeto Calculo Psicrometrico" }),
  ).toHaveAttribute("href", "/projetos/calculo-psicrometrico");

  const carousel = page.getByRole("region", {
    name: "Livros lidos e estudados",
  });
  await expect(carousel.locator(".book-card img")).toHaveCount(6);
  const firstCover = carousel.locator(".book-card img").first();
  await firstCover.scrollIntoViewIfNeeded();
  await expect(firstCover).toHaveJSProperty("complete", true);
  expect(
    await firstCover.evaluate((image: HTMLImageElement) => image.naturalWidth),
  ).toBeGreaterThan(0);

  const track = carousel.locator(".book-carousel-track");
  await carousel.getByRole("button", { name: "Próximo livro" }).click();
  await expect
    .poll(() => track.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);
  await carousel.getByRole("button", { name: "Pausar rotação" }).click();
  await expect(
    carousel.getByRole("button", { name: "Retomar rotação" }),
  ).toBeVisible();
});

test("rotates book covers automatically and respects reduced motion", async ({
  page,
}) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const track = page.locator(".book-carousel-track");
  await expect(track).toBeVisible();
  await expect(page.locator(".book-carousel")).toHaveAttribute(
    "data-ready",
    "true",
  );

  await page.clock.runFor(5000);
  await expect
    .poll(() => track.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.getByRole("button", { name: "Pausar rotação" }),
  ).toHaveCount(0);
  await page.clock.runFor(1000);
  const position = await track.evaluate((element) => element.scrollLeft);
  await page.clock.runFor(5000);
  expect(
    Math.abs(
      (await track.evaluate((element) => element.scrollLeft)) - position,
    ),
  ).toBeLessThan(8);
});

test("shows sanitized ECOTRES screenshots without presenting demo data as real results", async ({
  page,
}) => {
  await page.goto("/projetos/sistemas-ecotres");

  await expect(
    page.getByRole("heading", { name: "O produto em imagens" }),
  ).toBeVisible();
  await expect(page.locator(".project-gallery-item img")).toHaveCount(4);
  await expect(
    page.getByText("Os dados exibidos são fictícios."),
  ).toBeVisible();
  await expect(page.getByText("O progresso exibido é fictício.")).toBeVisible();

  for (const image of await page.locator(".project-gallery-item img").all()) {
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    ).toBeGreaterThan(0);
  }
});

test("returns the public resume", async ({ request }) => {
  const response = await request.get("/eduardo-melo-curriculo.pdf");

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("renders the custom not-found page", async ({ page }) => {
  const response = await page.goto("/pagina-inexistente");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Esta página não foi encontrada." }),
  ).toBeVisible();
});

test("does not expose the private job bot as a portfolio case", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText("Radar de Vagas")).toHaveCount(0);
  const response = await page.goto("/projetos/radar-de-vagas");
  expect(response?.status()).toBe(404);
});

test("keeps content readable without horizontal overflow", async ({ page }) => {
  await page.goto("/");
  const viewportWidth = page.viewportSize()?.width;
  const documentWidth = await page.evaluate(
    () => document.documentElement.scrollWidth,
  );
  expect(documentWidth).toBeLessThanOrEqual(viewportWidth ?? 0);
  await expect(
    page.getByRole("navigation", { name: "Navegação principal" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Projetos", exact: true }),
  ).toBeVisible();
});

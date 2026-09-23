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
    "software confiável",
  );
  await expect(
    page.getByRole("heading", {
      name: "Produtos e sistemas construídos com propósito",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Baixar currículo" }),
  ).toHaveAttribute("href", "/eduardo-melo-curriculo.pdf");

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
  await expect(
    page.getByRole("link", { name: "Ver na Google Play" }),
  ).toHaveAttribute("href", /play\.google\.com/);
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

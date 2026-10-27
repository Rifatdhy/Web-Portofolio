import { expect, test } from "@playwright/test";

test("home renders the primary content, imagery, and hash focus", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Rifat Dhiya Ul Lail/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /Beberapa yang pernah saya kerjakan/i,
    }),
  ).toBeVisible();

  await expect(page.locator("#proyek article")).toHaveCount(5);
  await expect(page.locator("#proyek img")).toHaveCount(5);

  await page.getByRole("link", { name: "Lihat Proyek" }).click();
  await expect(page).toHaveURL(/\/#proyek$/);
  await expect(page.locator("#proyek")).toBeFocused();
});

test("project cards link to static case studies and unknown slugs return 404", async ({
  page,
}) => {
  await page.goto("/proyek");
  await page.locator("#daftar-proyek article").first().getByRole("link", { name: "Clash.Soccer", exact: true }).click();

  await expect(page).toHaveURL(/\/proyek\/clash-soccer$/);
  await expect(page.getByRole("heading", { level: 1, name: "Clash.Soccer" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ringkasan proyek." })).toBeVisible();
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Clash\.Soccer/);

  const response = await page.goto("/proyek/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Halaman tidak ditemukan" })).toBeVisible();
});

test.describe("URL-synced project filters", () => {
  test("deep links, filter clicks, and history all stay in sync", async ({
    page,
  }) => {
    const cards = page.locator("#daftar-proyek article");
    const status = page.getByRole("status");

    await page.goto("/proyek?tech=React");
    await expect(cards).toHaveCount(2);
    await expect(
      page.getByRole("button", { name: "React", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(status).toContainText(
      "Menampilkan 2 proyek dengan filter React.",
    );

    await page.getByRole("button", { name: "Flutter", exact: true }).click();
    await expect(page).toHaveURL(/\/proyek\?tech=Flutter$/);
    await expect(cards).toHaveCount(1);
    await expect(status).toContainText(
      "Menampilkan 1 proyek dengan filter Flutter.",
    );

    await page.goBack();
    await expect(page).toHaveURL(/\/proyek\?tech=React$/);
    await expect(cards).toHaveCount(2);

    await page.reload();
    await expect(cards).toHaveCount(2);
    await expect(
      page.getByRole("button", { name: "React", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");

    await page.getByRole("button", { name: "Semua", exact: true }).click();
    await expect(page).toHaveURL(/\/proyek$/);
    await expect(cards).toHaveCount(5);
  });

  test("unknown tech values fall back to the unfiltered list", async ({
    page,
  }) => {
    const cards = page.locator("#daftar-proyek article");

    await page.goto("/proyek?tech=COBOL");

    await expect(cards).toHaveCount(5);
    await expect(
      page.getByRole("button", { name: "Semua", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});

test.describe("mobile layout", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("home and project listing do not overflow horizontally", async ({
    page,
  }) => {
    for (const path of ["/", "/proyek"]) {
      await page.goto(path);
      const hasHorizontalOverflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      );
      expect(hasHorizontalOverflow, `${path} overflows horizontally`).toBe(
        false,
      );
    }
  });

  test("project detail does not overflow horizontally", async ({ page }) => {
    await page.goto("/proyek/clash-soccer");
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});

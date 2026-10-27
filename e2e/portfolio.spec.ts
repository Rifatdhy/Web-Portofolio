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
});

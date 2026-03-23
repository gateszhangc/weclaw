import { expect, test } from "@playwright/test";

test("home page renders core marketing flow and metadata", async ({ page }) => {
  await page.goto("/");

  const homePrimaryCta = page
    .getByRole("main")
    .getByRole("link", { name: "One-Click Deploy", exact: true })
    .first();
  const headerPrimaryCta = page
    .getByRole("banner")
    .getByRole("link", { name: "One-Click Deploy", exact: true })
    .first();

  await expect(page).toHaveTitle(/WeClaw \| WeChat AI Agent Bridge for Claude, Codex, Gemini, and More/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Turn WeChat into the operator surface/i,
    }),
  ).toBeVisible();
  await expect(homePrimaryCta).toBeVisible();
  await expect(homePrimaryCta).toHaveAttribute("href", "https://www.easyclaw.pro/en");
  await expect(headerPrimaryCta).toBeVisible();
  await expect(headerPrimaryCta).toHaveAttribute("href", "https://www.easyclaw.pro/en");
  await expect(page.getByRole("main").getByRole("link", { name: /Open GitHub/i })).toHaveCount(2);
  await expect(page.getByRole("main").getByRole("link", { name: /Open GitHub/i }).first()).toBeVisible();
  await expect(page.getByText(/Keep the agent stack you already trust/i)).toBeVisible();
  await expect(page.getByText(/From install command to first routed reply in three steps/i)).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  const canonicalHref = await page.locator("link[rel='canonical']").getAttribute("href");
  expect(canonicalHref).toMatch(/^https:\/\/weclaw\.lol\/?$/);

  const description = await page.locator("meta[name='description']").getAttribute("content");
  expect(description).toContain("auto-detect ACP, CLI, and HTTP integrations");

  const jsonLdBlocks = await page.locator("script[type='application/ld+json']").allTextContents();
  expect(jsonLdBlocks.some((block) => block.includes("SoftwareApplication"))).toBeTruthy();
  expect(jsonLdBlocks.some((block) => block.includes("WebSite"))).toBeTruthy();

  const noHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1;
  });
  expect(noHorizontalOverflow).toBeTruthy();
});

test("quick start page exposes installation flow and command examples", async ({ page }) => {
  await page.goto("/quick-start");

  await expect(page).toHaveTitle(/WeClaw Quick Start/);
  await expect(page.getByRole("heading", { level: 1, name: /Install it once/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /^One-line install$/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /Scan the QR code once/i })).toBeVisible();
  await expect(page.getByText(/Config reference/i)).toBeVisible();
  await expect(page.getByText(/View upstream repository/i)).toBeVisible();

  const canonicalHref = await page.locator("link[rel='canonical']").getAttribute("href");
  expect(canonicalHref).toBe("https://weclaw.lol/quick-start");

  const jsonLdBlocks = await page.locator("script[type='application/ld+json']").allTextContents();
  expect(jsonLdBlocks.some((block) => block.includes("BreadcrumbList"))).toBeTruthy();
});

test("faq page renders FAQ structured data and navigation on mobile", async ({ page, isMobile }) => {
  await page.goto("/faq");

  await expect(page).toHaveTitle(/WeClaw FAQ \| WeChat AI Agent Bridge Setup Questions/);
  await expect(page.getByRole("heading", { level: 1, name: /Clear answers for the search intent around WeClaw/i })).toBeVisible();
  await expect(page.getByRole("navigation", { name: /Primary/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /What is WeClaw\?/i })).toBeVisible();
  await expect(page.getByText(/Need the exact install steps/i)).toBeVisible();

  const jsonLdBlocks = await page.locator("script[type='application/ld+json']").allTextContents();
  expect(jsonLdBlocks.some((block) => block.includes("FAQPage"))).toBeTruthy();
  expect(jsonLdBlocks.some((block) => block.includes("BreadcrumbList"))).toBeTruthy();

  const noHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1;
  });
  expect(noHorizontalOverflow).toBeTruthy();

  if (isMobile) {
    const mobileQuickStart = page
      .getByRole("banner")
      .getByRole("link", { name: "One-Click Deploy", exact: true })
      .first();

    await expect(mobileQuickStart).toBeVisible();
    await expect(mobileQuickStart).toHaveAttribute("href", "https://www.easyclaw.pro/en");
  }
});

test("analytics scripts render when production IDs are configured", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("script[src*='googletagmanager.com/gtag/js?id=G-TEST123456']")).toHaveCount(1);

  const inlineScripts = await page.locator("script").allTextContents();
  expect(inlineScripts.some((content) => content.includes("G-TEST123456"))).toBeTruthy();
  expect(inlineScripts.some((content) => content.includes("w08s8hdqma"))).toBeTruthy();
});

test("robots and sitemap expose crawlable production URLs", async ({ page }) => {
  const robotsResponse = await page.request.get("/robots.txt");
  expect(robotsResponse.ok()).toBeTruthy();
  const robotsText = await robotsResponse.text();
  expect(robotsText).toContain("Sitemap: https://weclaw.lol/sitemap.xml");

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemapText = await sitemapResponse.text();

  for (const url of ["/", "/features", "/quick-start", "/faq"]) {
    expect(sitemapText).toContain(`https://weclaw.lol${url === "/" ? "" : url}`);
  }
});

test("icon and social preview assets resolve", async ({ page }) => {
  const assetPaths = [
    "/favicon.ico",
    "/icon-192.png",
    "/icon-512.png",
    "/apple-touch-icon.png",
    "/opengraph-image",
    "/twitter-image",
  ];

  for (const assetPath of assetPaths) {
    const response = await page.request.get(assetPath);
    expect(response.ok(), `${assetPath} should return 200`).toBeTruthy();
  }
});

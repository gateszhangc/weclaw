import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT ?? 34173);
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-TEST123456";
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "w08s8hdqma";
const projectUrl = process.env.NEXT_PUBLIC_WEB_URL ?? "https://weclaw.lol";
const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME ?? "WeClaw";
const envCommandPrefix =
  `NEXT_PUBLIC_WEB_URL=${projectUrl} ` +
  `NEXT_PUBLIC_PROJECT_NAME=${projectName} ` +
  `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=${googleAnalyticsId} ` +
  `NEXT_PUBLIC_CLARITY_PROJECT_ID=${clarityProjectId}`;
const standalonePrepCommand =
  "rm -rf .next/standalone/public .next/standalone/.next/static && " +
  "mkdir -p .next/standalone/.next && " +
  "cp -R public .next/standalone/public && " +
  "cp -R .next/static .next/standalone/.next/static";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "on-first-retry",
  },
  webServer: {
    command:
      `${envCommandPrefix} pnpm build && ` +
      `${standalonePrepCommand} && ` +
      `cd .next/standalone && ${envCommandPrefix} HOSTNAME=127.0.0.1 PORT=${port} node server.js`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    stdout: "pipe",
    stderr: "pipe",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"] },
    },
  ],
});

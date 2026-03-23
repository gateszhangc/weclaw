const defaultSiteUrl = "https://weclaw.lol";
const defaultProjectName = "WeClaw";

function readPublicEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

function stripTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export const publicEnv = {
  siteUrl: stripTrailingSlash(readPublicEnv("NEXT_PUBLIC_WEB_URL") ?? defaultSiteUrl),
  projectName: readPublicEnv("NEXT_PUBLIC_PROJECT_NAME") ?? defaultProjectName,
  googleAnalyticsId: readPublicEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID") ?? "",
  clarityProjectId: readPublicEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID") ?? "",
} as const;

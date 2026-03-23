const defaultSiteUrl = "https://weclaw.lol";
const defaultProjectName = "WeClaw";

export type PublicEnv = {
  siteUrl: string;
  projectName: string;
  googleAnalyticsId: string;
  clarityProjectId: string;
};

function readPublicEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

function stripTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export function getPublicEnv(): PublicEnv {
  return {
    siteUrl: stripTrailingSlash(readPublicEnv("NEXT_PUBLIC_WEB_URL") ?? defaultSiteUrl),
    projectName: readPublicEnv("NEXT_PUBLIC_PROJECT_NAME") ?? defaultProjectName,
    googleAnalyticsId: readPublicEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID") ?? "",
    clarityProjectId: readPublicEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID") ?? "",
  };
}

export const publicEnv = getPublicEnv();

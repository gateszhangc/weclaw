import { getPublicEnv } from "@/lib/public-env";

export const dynamic = "force-dynamic";

export function GET() {
  const publicEnv = getPublicEnv();
  const body = `window.__WECLAW_PUBLIC_ENV__ = ${JSON.stringify(publicEnv)};`;

  return new Response(body, {
    headers: {
      "content-type": "application/javascript; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate",
    },
  });
}

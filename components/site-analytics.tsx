"use client";

import { useEffect } from "react";

import type { PublicEnv } from "@/lib/public-env";

declare global {
  interface Window {
    __WECLAW_PUBLIC_ENV__?: PublicEnv;
  }
}

function appendScript(id: string, options: { src?: string; html?: string; async?: boolean }) {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.id = id;

  if (options.src) {
    script.src = options.src;
  }

  if (options.async) {
    script.async = true;
  }

  if (options.html) {
    script.innerHTML = options.html;
  }

  document.head.appendChild(script);
}

function readRuntimePublicEnv() {
  return window.__WECLAW_PUBLIC_ENV__;
}

export function SiteAnalytics() {
  useEffect(() => {
    const runtimePublicEnv = readRuntimePublicEnv();
    const googleAnalyticsId = runtimePublicEnv?.googleAnalyticsId ?? "";
    const clarityProjectId = runtimePublicEnv?.clarityProjectId ?? "";

    if (googleAnalyticsId) {
      appendScript("google-analytics-loader", {
        src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
        async: true,
      });
      appendScript("google-analytics-inline", {
        html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("js", new Date());
          gtag("config", "${googleAnalyticsId}");
        `,
      });
    }

    if (clarityProjectId) {
      appendScript("microsoft-clarity-inline", {
        html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);
            t.async=1;
            t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityProjectId}");
        `,
      });
    }
  }, []);

  return <span hidden data-analytics-root="" />;
}

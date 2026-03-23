import Script from "next/script";

import { publicEnv } from "@/lib/public-env";

export function SiteAnalytics() {
  const { clarityProjectId, googleAnalyticsId } = publicEnv;

  return (
    <>
      {googleAnalyticsId ? (
        <>
          <Script
            id="google-analytics-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-inline" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag("js", new Date());
              gtag("config", "${googleAnalyticsId}");
            `}
          </Script>
        </>
      ) : null}
      {clarityProjectId ? (
        <Script id="microsoft-clarity-inline" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");
          `}
        </Script>
      ) : null}
    </>
  );
}

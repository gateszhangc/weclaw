import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[rgb(4_7_10_/0.72)]">
      <div className="shell grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-4">
          <p className="eyebrow">WeClaw</p>
          <h2 className="font-heading text-3xl tracking-[-0.04em] text-white">
            The WeChat bridge for real AI operator workflows.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-white/58">{siteConfig.description}</p>
          <p className="text-sm leading-7 text-white/45">
            Note: the current upstream README states the project is intended for personal learning. Review the
            repository, license, and operational risk before using it beyond evaluation.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/42">Pages</p>
            <ul className="mt-4 space-y-3 text-sm text-white/62">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/42">Source</p>
            <ul className="mt-4 space-y-3 text-sm text-white/62">
              <li>
                <Link href={siteConfig.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  GitHub repository
                  <ArrowUpRight className="size-4" />
                </Link>
              </li>
              <li>
                <Link href="/quick-start" className="hover:text-white">
                  One-line install
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ and usage notes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

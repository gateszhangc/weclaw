"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/lib/button-styles";
import { siteConfig } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgb(5_9_13_/0.74)] backdrop-blur-xl">
      <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-[18px] border border-white/10 bg-black/18 p-2 shadow-[0_12px_30px_rgb(0_0_0_/0.18)]">
              <Image src="/brand/logo-mark.svg" alt="WeClaw logo" width={40} height={40} priority />
            </div>
            <div>
              <span className="block font-heading text-2xl tracking-[-0.04em] text-white">{siteConfig.name}</span>
              <span className="block font-mono text-[0.68rem] uppercase tracking-[0.26em] text-white/44">
                WeChat AI Bridge
              </span>
            </div>
          </Link>
          <Link
            href={siteConfig.deployUrl}
            className={cn(buttonVariants({ size: "sm" }), "rounded-full lg:hidden")}
          >
            One-Click Deploy
          </Link>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2"
          >
            {siteConfig.navigation.map((item) => {
              const active = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "bg-white/11 text-white" : "text-white/64 hover:bg-white/8 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "rounded-full border-white/10 bg-white/6 px-4 text-white hover:bg-white/10",
              )}
            >
              GitHub
              <ArrowUpRight className="size-4" />
            </Link>
            <Link href={siteConfig.deployUrl} className={cn(buttonVariants({ size: "sm" }), "rounded-full px-4")}>
              One-Click Deploy
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

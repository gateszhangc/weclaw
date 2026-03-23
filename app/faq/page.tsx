import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpenText, LifeBuoy } from "lucide-react";

import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/lib/button-styles";
import { faqItems, siteConfig } from "@/lib/site-content";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "WeClaw FAQ | WeChat AI Agent Bridge Setup Questions",
  description:
    "Read common questions about WeClaw: supported AI agents, QR login flow, config location, media handling, proactive messaging, and operational notes.",
  path: "/faq",
  keywords: [
    "weclaw faq",
    "weclaw setup questions",
    "WeChat AI agent bridge FAQ",
    "weclaw config",
  ],
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "WeClaw", path: "/" },
  { name: "FAQ", path: "/faq" },
]);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="shell flex flex-col gap-20 pb-24 pt-8 sm:pt-12 lg:gap-24">
        <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
          <div className="space-y-6">
            <p className="eyebrow">Frequently Asked Questions</p>
            <h1 className="balanced font-heading text-5xl leading-none tracking-[-0.04em] text-white sm:text-6xl">
              Clear answers for the search intent around WeClaw.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/70">
              The FAQ page carries the long-tail keyword traffic: supported agents, transport modes, config location,
              media behavior, and whether outbound messaging is possible.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/quick-start"
                className={cn(buttonVariants({ size: "lg" }), "rounded-full px-5 text-sm font-semibold")}
              >
                Open Quick Start
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "rounded-full border-white/12 bg-white/6 px-5 text-white hover:bg-white/10",
                )}
              >
                Read upstream README
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="surface-panel rounded-[34px] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Support Intent"
              title="Answer the question before the user has to open GitHub."
              description="This page distills the most common setup and compatibility concerns into short, scannable answers."
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
          <FaqAccordion items={faqItems} />

          <div className="space-y-6">
            <article className="surface-panel rounded-[32px] p-6 sm:p-8">
              <div className="rounded-2xl border border-white/10 bg-black/18 p-3 w-fit">
                <BookOpenText className="size-6 text-primary" />
              </div>
              <h2 className="mt-6 font-heading text-3xl tracking-[-0.04em] text-white">Need the exact install steps?</h2>
              <p className="mt-4 text-sm leading-7 text-white/66">
                The Quick Start page keeps the shell commands, first-run flow, config snippets, and routing examples in
                one place for immediate setup.
              </p>
              <Link
                href="/quick-start"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white"
              >
                Go to Quick Start
                <ArrowRight className="size-4" />
              </Link>
            </article>

            <article className="surface-panel rounded-[32px] p-6 sm:p-8">
              <div className="rounded-2xl border border-white/10 bg-black/18 p-3 w-fit">
                <LifeBuoy className="size-6 text-primary" />
              </div>
              <h2 className="mt-6 font-heading text-3xl tracking-[-0.04em] text-white">Need source-of-truth details?</h2>
              <p className="mt-4 text-sm leading-7 text-white/66">
                The current upstream repository is the authoritative reference for commands, examples, and usage notes.
                This site translates the essentials into a cleaner evaluation path.
              </p>
              <Link
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white"
              >
                Open the repository
                <ArrowUpRight className="size-4" />
              </Link>
            </article>
          </div>
        </section>
      </div>
    </>
  );
}

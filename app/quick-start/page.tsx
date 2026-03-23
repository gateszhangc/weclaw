import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Command, Play, QrCode, Send, Settings2 } from "lucide-react";

import { CommandBlock } from "@/components/command-block";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/lib/button-styles";
import {
  commandExamples,
  installOptions,
  quickStartSteps,
  siteConfig,
} from "@/lib/site-content";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";

const stepIcons = [Command, QrCode, Play];

export const metadata: Metadata = buildMetadata({
  title: "WeClaw Quick Start | Install and Connect WeChat to AI Agents",
  description:
    "Install WeClaw with one command, scan the login QR, auto-detect your agent stack, and start sending WeChat threads to Claude, Codex, Gemini, and more.",
  path: "/quick-start",
  keywords: [
    "weclaw quick start",
    "weclaw install",
    "install weclaw",
    "WeChat AI bridge setup",
  ],
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "WeClaw", path: "/" },
  { name: "Quick Start", path: "/quick-start" },
]);

export default function QuickStartPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="shell flex flex-col gap-20 pb-24 pt-8 sm:pt-12 lg:gap-24">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="space-y-6">
          <p className="eyebrow">Quick Start</p>
          <h1 className="balanced font-heading text-5xl leading-none tracking-[-0.04em] text-white sm:text-6xl">
            Install it once. The first QR scan does the rest.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-white/70">
            This page is tuned for the searcher who wants the shortest path from “WeChat AI bridge” to a working
            message loop. It keeps the instructions factual, compact, and runnable.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-5 text-sm font-semibold")}
            >
              View upstream repository
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/features"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "rounded-full border-white/12 bg-white/6 px-5 text-white hover:bg-white/10",
              )}
            >
              Review features
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <CommandBlock
          label="Fastest path"
          caption="shell install"
          code={`${siteConfig.installCommand}

weclaw start`}
        />
        </section>

        <section className="space-y-10">
        <SectionHeading
          eyebrow="Install Options"
          title="Start with the method that matches your workstation."
          description="The README exposes shell, Go, and Docker paths. The site turns them into three clear starting points instead of one long block."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {installOptions.map((option) => (
            <article key={option.title} className="surface-panel rounded-[30px] p-6">
              <p className="eyebrow">{option.kicker}</p>
              <h2 className="mt-4 font-heading text-3xl tracking-[-0.04em] text-white">{option.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/66">{option.description}</p>
              <div className="mt-5">
                <CommandBlock label={option.label} code={option.code} compact />
              </div>
            </article>
          ))}
        </div>
        </section>

        <section className="space-y-10">
        <SectionHeading
          eyebrow="First Run"
          title="Three steps from install to routed chat."
          description="The product story is strongest when first-run behavior is explicit: login, auto-detection, and immediate thread routing."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {quickStartSteps.map((step, index) => {
            const Icon = stepIcons[index];

            return (
              <article key={step.title} className="surface-panel rounded-[30px] p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/18 p-3">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/42">0{index + 1}</span>
                </div>
                <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-white/42">{step.kicker}</p>
                <h2 className="mt-3 font-heading text-3xl tracking-[-0.04em] text-white">{step.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/66">{step.description}</p>
                <div className="mt-5">
                  <CommandBlock label={step.label} code={step.code} compact />
                </div>
              </article>
            );
          })}
        </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <CommandBlock
          label="Config reference"
          caption="~/.weclaw/config.json"
          code={`{
  "default_agent": "claude",
  "agents": {
    "claude": {
      "type": "cli",
      "command": "/usr/local/bin/claude",
      "args": ["--dangerously-skip-permissions"]
    },
    "codex": {
      "type": "cli",
      "command": "/usr/local/bin/codex",
      "args": ["--skip-git-repo-check"]
    }
  }
}`}
        />

        <div className="space-y-6">
          <article className="surface-panel rounded-[32px] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Command Examples"
              title="Use the same thread, just switch routing intent."
              description="WeClaw only needs a few commands to stay powerful: default agent traffic, explicit aliases, status checks, and proactive send workflows."
            />
            <div className="mt-8 grid gap-4">
              {commandExamples.map((example) => (
                <div
                  key={example.command}
                  className="rounded-[24px] border border-white/10 bg-black/18 p-4"
                >
                  <p className="font-mono text-sm text-primary">{example.command}</p>
                  <p className="mt-3 text-sm leading-7 text-white/66">{example.description}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="surface-panel rounded-[30px] p-6">
              <div className="rounded-2xl border border-white/10 bg-black/18 p-3 w-fit">
                <Settings2 className="size-6 text-primary" />
              </div>
              <h3 className="mt-6 font-heading text-3xl tracking-[-0.04em] text-white">Config stays explicit</h3>
              <p className="mt-4 text-sm leading-7 text-white/66">
                Defaults, aliases, transport modes, and permission flags all live in a single JSON file instead of
                being scattered across hidden state.
              </p>
            </article>
            <article className="surface-panel rounded-[30px] p-6">
              <div className="rounded-2xl border border-white/10 bg-black/18 p-3 w-fit">
                <Send className="size-6 text-primary" />
              </div>
              <h3 className="mt-6 font-heading text-3xl tracking-[-0.04em] text-white">Push outbound messages</h3>
              <p className="mt-4 text-sm leading-7 text-white/66">
                Use the `weclaw send` command or the local HTTP endpoint when your automation needs to initiate the
                thread rather than wait for user input.
              </p>
            </article>
          </div>
        </div>
        </section>
      </div>
    </>
  );
}

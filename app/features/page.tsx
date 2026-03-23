import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, Cable, Command, ImageIcon, Send, ShieldCheck, Zap } from "lucide-react";

import { CommandBlock } from "@/components/command-block";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/lib/button-styles";
import {
  agentModes,
  commandExamples,
  featureCards,
  siteConfig,
  supportedAgents,
} from "@/lib/site-content";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";

const featureIcons = [Boxes, Zap, Command, ImageIcon, Send, Cable];

export const metadata: Metadata = buildMetadata({
  title: "WeClaw Features | WeChat AI Agent Bridge Modes and Routing",
  description:
    "Explore WeClaw features for WeChat AI routing: ACP-first performance, CLI and HTTP fallbacks, media handling, proactive messaging, and explicit config.",
  path: "/features",
  keywords: [
    "weclaw features",
    "weclaw agent routing",
    "WeChat AI agent bridge features",
    "Claude Codex Gemini WeChat",
  ],
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "WeClaw", path: "/" },
  { name: "Features", path: "/features" },
]);

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="shell flex flex-col gap-20 pb-24 pt-8 sm:pt-12 lg:gap-24">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="space-y-6">
          <p className="eyebrow">Feature Map</p>
          <h1 className="balanced font-heading text-5xl leading-none tracking-[-0.04em] text-white sm:text-6xl">
            Built for WeChat AI routing, not demo theatrics.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-white/70">
            WeClaw keeps the feature set tight around a real operator loop: connect WeChat, discover agents, choose
            the right transport, preserve media, and keep outbound control in reach.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/quick-start"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-5 text-sm font-semibold")}
            >
              See install flow
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
              Open GitHub
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="surface-panel rounded-[34px] p-6 sm:p-8">
          <p className="eyebrow">Supported Agents</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {supportedAgents.map((agent) => (
              <span
                key={agent}
                className="rounded-full border border-white/10 bg-black/18 px-4 py-2 text-sm font-medium text-white/72"
              >
                {agent}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-white/64">
            The upstream README describes three transport modes and shows explicit routing for Claude, Codex, Gemini,
            Kimi, Cursor, OpenCode, and OpenClaw.
          </p>
        </div>
        </section>

        <section className="space-y-10">
        <SectionHeading
          eyebrow="Agent Modes"
          title="ACP when available, sensible fallbacks when it is not."
          description="Mode selection is one of the product's strongest differentiators, so the site should make the tradeoffs legible instead of hiding them behind marketing fog."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {agentModes.map((mode) => (
            <article key={mode.mode} className="surface-panel rounded-[30px] p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-heading text-3xl tracking-[-0.04em] text-white">{mode.mode}</h2>
                <span className="rounded-full border border-primary/22 bg-primary/12 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-primary">
                  {mode.badge}
                </span>
              </div>
              <p className="mt-4 text-base leading-8 text-white/68">{mode.description}</p>
              <p className="mt-5 text-sm leading-7 text-white/56">{mode.detail}</p>
              <div className="mt-6 rounded-[22px] border border-white/10 bg-black/18 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/42">Examples</p>
                <p className="mt-3 text-sm leading-7 text-white/68">{mode.examples.join(", ")}</p>
              </div>
            </article>
          ))}
        </div>
        </section>

        <section className="space-y-10">
        <SectionHeading
          eyebrow="Core Features"
          title="Six product pillars, one routing model."
          description="This section translates README facts into clearer product language while preserving the technical specifics an evaluator actually needs."
        />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature, index) => {
            const Icon = featureIcons[index];

            return (
              <article key={feature.title} className="surface-panel rounded-[30px] p-6">
                <div className="rounded-2xl border border-white/10 bg-black/18 p-3 w-fit">
                  <Icon className="size-6 text-primary" />
                </div>
                <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-white/42">{feature.eyebrow}</p>
                <h3 className="mt-3 font-heading text-3xl tracking-[-0.04em] text-white">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/66">{feature.description}</p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-white/58">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="surface-panel rounded-[34px] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Command Surface"
            title="Commands are small, memorable, and operator-friendly."
            description="WeClaw keeps the message grammar simple: use a default agent, route to an alias, or send operational commands for status and switching."
          />
          <div className="mt-8 space-y-4">
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
        </div>

        <div className="space-y-6">
          <CommandBlock
            label="Config sample"
            caption="~/.weclaw/config.json"
            code={`{
  "default_agent": "claude",
  "agents": {
    "claude": {
      "type": "acp",
      "command": "/usr/local/bin/claude-agent-acp",
      "model": "sonnet"
    },
    "codex": {
      "type": "acp",
      "command": "/usr/local/bin/codex-acp"
    },
    "openclaw": {
      "type": "http",
      "endpoint": "https://api.example.com/v1/chat/completions",
      "api_key": "sk-xxx",
      "model": "openclaw:main"
    }
  }
}`}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <article className="surface-panel rounded-[30px] p-6">
              <div className="rounded-2xl border border-white/10 bg-black/18 p-3 w-fit">
                <ShieldCheck className="size-6 text-primary" />
              </div>
              <h3 className="mt-6 font-heading text-3xl tracking-[-0.04em] text-white">Permission flags when needed</h3>
              <p className="mt-4 text-sm leading-7 text-white/66">
                The README explicitly calls out CLI flags such as Claude&apos;s permission skip and Codex&apos;s git repo
                bypass so operators can avoid blocking approval prompts inside WeChat.
              </p>
            </article>
            <article className="surface-panel rounded-[30px] p-6">
              <div className="rounded-2xl border border-white/10 bg-black/18 p-3 w-fit">
                <Send className="size-6 text-primary" />
              </div>
              <h3 className="mt-6 font-heading text-3xl tracking-[-0.04em] text-white">Proactive delivery built in</h3>
              <p className="mt-4 text-sm leading-7 text-white/66">
                Use `weclaw send` for operator-triggered outbound messaging or hit the local HTTP endpoint while
                `weclaw start` is running.
              </p>
            </article>
          </div>
        </div>
        </section>
      </div>
    </>
  );
}

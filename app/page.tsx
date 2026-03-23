import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Cable,
  ImageIcon,
  MessagesSquare,
  ScanSearch,
  Send,
  Sparkles,
  TerminalSquare,
  Zap,
} from "lucide-react";

import { CommandBlock } from "@/components/command-block";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/lib/button-styles";
import {
  commandExamples,
  faqItems,
  featureCards,
  quickStartSteps,
  siteConfig,
  supportedAgents,
  workflowSteps,
} from "@/lib/site-content";
import { buildMetadata } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";

const homeFeatureIcons = [Boxes, Zap, TerminalSquare, ImageIcon, Send, Cable];
const workflowIcons = [TerminalSquare, ScanSearch, MessagesSquare];
const previewFaq = faqItems.slice(0, 4);

export const metadata: Metadata = buildMetadata({
  title: "WeClaw | WeChat AI Agent Bridge for Claude, Codex, Gemini, and More",
  description:
    "Install WeClaw once, scan the WeChat QR login, auto-detect ACP, CLI, and HTTP integrations, and route real chats through your existing agent stack.",
  path: "/",
  keywords: [
    "weclaw",
    "weclaw wechat",
    "weclaw install",
    "WeChat AI agent bridge",
    "WeChat Claude bridge",
    "WeChat Codex bridge",
    "WeChat Gemini bridge",
  ],
});

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, Docker",
  description: siteConfig.description,
  url: siteConfig.url,
  downloadUrl: siteConfig.repoUrl,
  sameAs: [siteConfig.repoUrl],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareJsonLd} />
      <div className="shell flex flex-col gap-24 pb-24 pt-8 sm:pt-12 lg:gap-28">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/78 shadow-[0_8px_30px_rgb(0_0_0_/0.18)]">
              <Sparkles className="size-4 text-primary" />
              Built for real WeChat operator workflows
            </div>

            <div className="space-y-6">
              <p className="eyebrow">WeChat AI Agent Bridge</p>
              <h1 className="balanced max-w-4xl font-heading text-5xl leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                Turn WeChat into the operator surface for Claude, Codex, Gemini, and more.
              </h1>
              <p className="balanced max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                WeClaw installs locally, opens a QR login on first run, auto-detects ACP, CLI, and HTTP
                integrations, and routes real chat threads through the agent stack you already trust.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/quick-start"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full px-5 text-sm font-semibold shadow-[0_18px_40px_rgb(131_233_197_/0.22)]",
                )}
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
                Open GitHub
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {siteConfig.keywordChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-black/18 px-3 py-1.5 font-mono text-xs tracking-[0.16em] text-white/62 uppercase"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "3 transports", value: "ACP, CLI, HTTP" },
                { label: "7 integrations", value: "Claude to OpenClaw" },
                { label: "1 thread surface", value: "Reply, route, send" },
              ].map((item) => (
                <div key={item.label} className="surface-panel rounded-[28px] p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/48">{item.label}</p>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-[36px] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-[24px] border border-white/10 bg-black/18 p-3 shadow-[0_20px_50px_rgb(0_0_0_/0.22)]">
                  <Image
                    src="/brand/logo-mark.svg"
                    alt="WeClaw logo mark"
                    width={72}
                    height={72}
                    priority
                    className="h-16 w-16"
                  />
                </div>
                <div>
                  <p className="eyebrow">Operator Flow</p>
                  <h2 className="mt-2 font-heading text-3xl tracking-[-0.04em] text-white">
                    Install. Authenticate. Operate.
                  </h2>
                </div>
              </div>
              <div className="rounded-full border border-primary/30 bg-primary/14 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">
                Ready
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <CommandBlock
                label="One-line install"
                caption="first run prompts WeChat QR login"
                code={siteConfig.installCommand}
              />

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Prefers ACP when a persistent agent bridge is available.",
                  "Falls back to CLI or OpenAI-compatible HTTP when ACP is unavailable.",
                  "Cleans markdown into WeChat-safe text and uploads media as messages.",
                  "Sends outbound text, images, and files from CLI or local HTTP.",
                ].map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/10 bg-black/18 p-4 text-sm leading-7 text-white/70">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="surface-panel rounded-[32px] p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Compatibility</p>
              <h2 className="mt-2 font-heading text-3xl tracking-[-0.04em] text-white">
                Keep the agent stack you already trust.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/66">
                Use WeChat as the thread surface without replacing the tools, models, or launch path you already run
                locally.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {supportedAgents.map((agent) => (
                <span
                  key={agent}
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/74"
                >
                  {agent}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeading
            eyebrow="Workflow"
            title="From install command to first routed reply in three steps."
            description="Evaluation friction is predictable: show the install path, the authentication step, and the first operator action before asking people to trust the feature list."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {workflowSteps.map((step, index) => {
              const Icon = workflowIcons[index];

              return (
                <article key={step.title} className="surface-panel rounded-[30px] p-6">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl border border-white/10 bg-black/18 p-3">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/42">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-3xl tracking-[-0.04em] text-white">{step.title}</h3>
                  <p className="mt-4 text-base leading-8 text-white/68">{step.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeading
            eyebrow="Why WeClaw"
            title="The bridge stays narrow. The operator loop stays intact."
            description="WeClaw does a small number of hard things well: message routing, transport selection, media cleanup, outbound sends, and explicit configuration."
          />
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature, index) => {
              const Icon = homeFeatureIcons[index];

              return (
                <article key={feature.title} className="surface-panel rounded-[30px] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/18 p-3">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-white/38">
                      {feature.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-3xl tracking-[-0.04em] text-white">{feature.title}</h3>
                  <p className="mt-4 text-base leading-8 text-white/68">{feature.description}</p>
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-white/62">
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

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-panel rounded-[34px] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Quick Start"
              title="The first successful reply should happen fast."
              description="The shortest path matters more than feature volume. The home page should make the first run obvious."
            />
            <div className="mt-8 space-y-5">
              {quickStartSteps.map((step) => (
                <div key={step.title} className="rounded-[26px] border border-white/10 bg-black/18 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-2xl tracking-[-0.03em] text-white">{step.title}</h3>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/38">{step.kicker}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/66">{step.description}</p>
                  <div className="mt-4">
                    <CommandBlock label={step.label} code={step.code} compact />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-panel rounded-[34px] p-6 sm:p-8">
              <SectionHeading
                eyebrow="Command Routing"
                title="Route one request or change the default without losing the thread."
                description="Stay in the WeChat message box: send to the default agent, switch defaults, or force a one-off route with a slash command."
              />
              <div className="mt-8 grid gap-4">
                {commandExamples.slice(0, 4).map((example) => (
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

            <div className="grid gap-5 md:grid-cols-2">
              <article className="surface-panel rounded-[30px] p-6">
                <p className="eyebrow">Media</p>
                <h3 className="mt-4 font-heading text-3xl tracking-[-0.04em] text-white">
                  Return usable messages, not raw markdown
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/66">
                  WeClaw cleans agent output for WeChat, turns image URLs into actual uploads, and keeps operators out
                  of copy-paste cleanup.
                </p>
              </article>
              <article className="surface-panel rounded-[30px] p-6">
                <p className="eyebrow">Outbound</p>
                <h3 className="mt-4 font-heading text-3xl tracking-[-0.04em] text-white">
                  Send on demand from CLI or HTTP
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/66">
                  Use `weclaw send` or the local endpoint when an automation or handoff needs to push text, images,
                  or files before the next inbound message.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="surface-panel rounded-[34px] p-6 sm:p-8">
            <SectionHeading
              eyebrow="FAQ Preview"
              title="Handle setup questions before they block the install."
              description="Most evaluation friction is predictable: supported agents, first-run behavior, config location, and outbound sending."
            />
            <div className="mt-8 space-y-4 text-sm leading-7 text-white/66">
              <p>
                Prospective users usually need four facts before they install: what WeClaw is, which stacks it
                supports, where config lives, and how outbound sends work. The FAQ answers those directly.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white"
              >
                Read the full FAQ
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <FaqAccordion items={previewFaq} />
        </section>

        <section className="surface-panel rounded-[38px] p-8 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="eyebrow">Get Started</p>
              <h2 className="balanced font-heading text-4xl tracking-[-0.04em] text-white sm:text-5xl">
                Install the bridge, scan once, and run WeChat as part of your agent workflow.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-white/68">
                The upstream repository currently labels the project for personal-learning usage. Review the README,
                license, and your own operational requirements before moving beyond evaluation.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/quick-start"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full px-5 text-sm font-semibold shadow-[0_18px_40px_rgb(131_233_197_/0.22)]",
                )}
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
                Open GitHub
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

import { publicEnv } from "@/lib/public-env";

export type FaqItem = {
  question: string;
  answer: string;
};

export const siteConfig = {
  name: publicEnv.projectName,
  url: publicEnv.siteUrl,
  repoUrl: "https://github.com/fastclaw-ai/weclaw",
  deployUrl: "https://www.easyclaw.pro/en",
  description:
    "Turn WeChat into an operator channel for Claude, Codex, Gemini, Kimi, Cursor, OpenCode, and OpenClaw with a QR-login bridge built for real agent workflows.",
  installCommand: "curl -sSL https://raw.githubusercontent.com/fastclaw-ai/weclaw/main/install.sh | sh",
  keywords: [
    "weclaw",
    "weclaw install",
    "weclaw quick start",
    "WeChat AI agent bridge",
    "WeChat Claude",
    "WeChat Codex",
    "WeChat Gemini",
    "WeChat AI bridge setup",
    "WeChat AI bot",
    "WeChat QR login AI",
    "wechat clawbot",
  ],
  keywordChips: [
    "WeChat Claude",
    "WeChat Codex",
    "QR Login",
    "ACP / CLI / HTTP",
    "Media + Files",
  ],
  navigation: [
    { href: "/", label: "Overview" },
    { href: "/features", label: "Features" },
    { href: "/quick-start", label: "Quick Start" },
    { href: "/faq", label: "FAQ" },
  ],
} as const;

export const supportedAgents = [
  "Claude",
  "Codex",
  "Gemini",
  "Kimi",
  "Cursor",
  "OpenCode",
  "OpenClaw",
];

export const workflowSteps = [
  {
    title: "Install the bridge",
    description:
      "Run the shell installer, Go install command, or Docker image. WeClaw is meant to sit beside the agent binaries you already operate.",
  },
  {
    title: "Authenticate and inspect the stack",
    description:
      "On first run, scan the WeChat QR code. WeClaw checks ACP, CLI, and HTTP availability, then writes the active local config.",
  },
  {
    title: "Route the first live thread",
    description:
      "Use slash commands, aliases, default-agent switching, and outbound sends to keep the conversation inside WeChat instead of learning another operator UI.",
  },
];

export const featureCards = [
  {
    eyebrow: "Routing",
    title: "Route each request to the right agent",
    description:
      "Keep a default agent for normal traffic, override a single prompt with `/codex` or `/claude`, and switch thread defaults without leaving WeChat.",
    bullets: [
      "Slash commands route a single request, like `/codex` or `/claude`.",
      "Aliases such as `/cc` and `/cx` keep typing short inside the chat box.",
      "Default agent selection is persisted to config and survives restarts.",
    ],
  },
  {
    eyebrow: "Transport",
    title: "Prefer persistent ACP when it exists",
    description:
      "When ACP is available, WeClaw keeps a persistent JSON-RPC bridge alive so agent processes and session state stay warm.",
    bullets: [
      "ACP is the fastest mode because it avoids a fresh process per message.",
      "Mode selection is automatic when ACP and CLI are both present.",
      "Claude, Codex, Gemini, Kimi, Cursor, OpenCode, and OpenClaw fit this model.",
    ],
  },
  {
    eyebrow: "Fallback",
    title: "Drop to CLI or HTTP without losing the flow",
    description:
      "If ACP is not available, WeClaw still routes messages through CLI invocation or an OpenAI-compatible HTTP chat endpoint.",
    bullets: [
      "CLI mode can resume compatible sessions using agent-specific flags.",
      "HTTP mode covers OpenClaw-style endpoints when local binaries are not the right fit.",
      "Transport choice stays explicit in the config file instead of hiding behind magic.",
    ],
  },
  {
    eyebrow: "Media",
    title: "Send back messages people can actually read",
    description:
      "WeClaw flattens agent markdown into WeChat-safe text, turns image URLs into uploads, and keeps files as files instead of broken links.",
    bullets: [
      "Markdown is converted to plain text for better chat readability.",
      "Image URLs from agent replies can be downloaded and sent as actual image messages.",
      "Common media types include images, videos, and arbitrary files.",
    ],
  },
  {
    eyebrow: "Outbound",
    title: "Push text or media without waiting",
    description:
      "Operators can send text or media even when the user has not just messaged, either from the CLI or from a local HTTP endpoint.",
    bullets: [
      "`weclaw send` pushes outbound text, image, or file payloads from the terminal.",
      "The local HTTP API runs on `127.0.0.1:18011` while WeClaw is active.",
      "Outbound flow works for message-driven automations and handoffs.",
    ],
  },
  {
    eyebrow: "Operations",
    title: "Keep the bridge explicit and inspectable",
    description:
      "Config lives in `~/.weclaw/config.json`, default-agent selection is explicit, and environment overrides stay visible where they matter.",
    bullets: [
      "Environment overrides handle default agent and OpenClaw gateway values.",
      "CLI permission flags are documented for operators who need them.",
      "Background mode, logs, launchd, and systemd keep deployment practical.",
    ],
  },
];

export const agentModes = [
  {
    mode: "ACP",
    badge: "Preferred",
    description:
      "A long-running subprocess connected over stdio JSON-RPC for the fastest response path and reusable sessions.",
    detail:
      "ACP is the first choice whenever the agent exposes it because it avoids spawning a fresh process on every message and keeps conversational state warm.",
    examples: ["Claude", "Codex", "Gemini", "Kimi", "Cursor", "OpenCode", "OpenClaw"],
  },
  {
    mode: "CLI",
    badge: "Fallback",
    description:
      "A new process per message with optional session resume, useful when ACP is unavailable or you only have the command-line tool.",
    detail:
      "CLI mode is practical for portable setups and works especially well when the agent supports a resume flag or lightweight invocation model.",
    examples: ["claude -p", "codex exec"],
  },
  {
    mode: "HTTP",
    badge: "Gateway",
    description:
      "An OpenAI-compatible chat completions endpoint for environments where an HTTP bridge is a better operational fit than local binaries.",
    detail:
      "This is documented as the HTTP fallback path and especially relevant for OpenClaw-style gateways or self-hosted agent front doors.",
    examples: ["OpenClaw HTTP fallback"],
  },
];

export const installOptions = [
  {
    kicker: "Shell",
    title: "One-line install",
    description:
      "The shortest path for local evaluation. Run the installer, then start the bridge and scan the QR code when prompted.",
    label: "shell",
    code: "curl -sSL https://raw.githubusercontent.com/fastclaw-ai/weclaw/main/install.sh | sh",
  },
  {
    kicker: "Go",
    title: "Install with Go",
    description:
      "Use the standard Go install flow when you already manage your local tooling that way.",
    label: "go",
    code: "go install github.com/fastclaw-ai/weclaw@latest",
  },
  {
    kicker: "Docker",
    title: "Run in Docker",
    description:
      "Mount the local config directory and start the image when container-first evaluation is a better operational fit.",
    label: "docker",
    code: "docker run -it -v ~/.weclaw:/root/.weclaw ghcr.io/fastclaw-ai/weclaw start",
  },
];

export const quickStartSteps = [
  {
    kicker: "Install",
    title: "Install the bridge",
    description:
      "Use the shell script for the fastest evaluation path, or choose Go or Docker if that better matches your workstation.",
    label: "install",
    code: "curl -sSL https://raw.githubusercontent.com/fastclaw-ai/weclaw/main/install.sh | sh",
  },
  {
    kicker: "Login",
    title: "Scan the QR code once",
    description:
      "Run `weclaw start`, authenticate with WeChat, and let the bridge write the local config it will reuse later.",
    label: "start",
    code: "weclaw start",
  },
  {
    kicker: "Route",
    title: "Send the first routed prompt",
    description:
      "Talk to the default agent, send a one-off request to a named model, or inspect bridge status without leaving the thread.",
    label: "chat commands",
    code: "/codex write a sorting function\n/cc explain this diff\n/status",
  },
];

export const commandExamples = [
  {
    command: "hello",
    description: "Send a message to the current default agent without prefixing an explicit route.",
  },
  {
    command: "/codex write a sorting function",
    description: "Route one request to Codex without changing the default agent for the rest of the thread.",
  },
  {
    command: "/cc explain this diff",
    description: "Use the Claude alias when you want a shorter, chat-friendly route inside the message box.",
  },
  {
    command: "/claude",
    description: "Switch the default agent to Claude and persist that choice in local config.",
  },
  {
    command: "/status",
    description: "Check the active default agent and connection state.",
  },
  {
    command: "weclaw send --to \"user_id@im.wechat\" --text \"Hello from weclaw\"",
    description: "Send a proactive outbound message without waiting for the user to speak first.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What is WeClaw?",
    answer:
      "WeClaw is a WeChat AI agent bridge. It connects WeChat message threads to tools such as Claude, Codex, Gemini, Kimi, Cursor, OpenCode, and OpenClaw.",
  },
  {
    question: "Which AI agents does WeClaw support?",
    answer:
      "The current upstream README lists Claude, Codex, Gemini, Kimi, Cursor, OpenCode, and OpenClaw across ACP, CLI, and HTTP transport modes.",
  },
  {
    question: "What happens on first run?",
    answer:
      "The first `weclaw start` opens a WeChat QR login, detects installed agent integrations, writes `~/.weclaw/config.json`, and starts receiving messages.",
  },
  {
    question: "Where is the config stored?",
    answer:
      "WeClaw stores its main config in `~/.weclaw/config.json`, including default agent settings, transport mode details, and environment-sensitive values.",
  },
  {
    question: "Does WeClaw need ACP to work?",
    answer:
      "No. ACP is preferred when available, but WeClaw also supports CLI mode and an OpenAI-compatible HTTP fallback for supported setups.",
  },
  {
    question: "Can it send images, videos, and files back to WeChat?",
    answer:
      "Yes. The upstream documentation describes image, video, and file sending, plus markdown cleanup that converts agent replies into WeChat-friendly text.",
  },
  {
    question: "Can WeClaw send outbound messages proactively?",
    answer:
      "Yes. You can push outbound text or media with `weclaw send` or use the local HTTP API while the bridge is running.",
  },
  {
    question: "Is the project intended for commercial use?",
    answer:
      "The current upstream README includes a personal-learning notice and says it is not for commercial use. Review that note and the MIT license context before broader deployment.",
  },
];

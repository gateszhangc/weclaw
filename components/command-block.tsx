type CommandBlockProps = {
  label: string;
  code: string;
  caption?: string;
  compact?: boolean;
};

export function CommandBlock({ label, code, caption, compact = false }: CommandBlockProps) {
  const lines = code.trim().split("\n");

  return (
    <div className="surface-panel min-w-0 rounded-[28px] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-primary">{label}</p>
        {caption ? (
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/42">{caption}</p>
        ) : null}
      </div>
      <div className={compact ? "mt-4 min-w-0" : "mt-5 min-w-0"}>
        <pre className="w-full max-w-full min-w-0 overflow-x-auto rounded-[22px] border border-white/10 bg-black/26 p-4 text-left text-sm leading-7 text-white/82 sm:p-5">
          <code className="inline-grid min-w-max gap-1.5 font-mono">
            {lines.map((line, index) => (
              <span key={`${line}-${index}`} className="grid min-w-max grid-cols-[auto_1fr] gap-4">
                <span className="select-none text-white/26">{String(index + 1).padStart(2, "0")}</span>
                <span>{line}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

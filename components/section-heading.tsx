import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl space-y-4", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="balanced font-heading text-4xl tracking-[-0.04em] text-white sm:text-5xl">{title}</h2>
      <p className="text-base leading-8 text-white/68">{description}</p>
    </div>
  );
}

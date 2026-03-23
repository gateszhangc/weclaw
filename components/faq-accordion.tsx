import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/site-content";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <div className={cn("surface-panel rounded-[34px] p-4 sm:p-5", className)}>
      <Accordion defaultValue={items[0] ? [items[0].question] : []}>
        {items.map((item) => (
          <AccordionItem key={item.question} value={item.question} className="border-white/8 px-3 sm:px-4">
            <AccordionTrigger className="py-5 text-base tracking-[-0.02em] text-white hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-7 text-white/64">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

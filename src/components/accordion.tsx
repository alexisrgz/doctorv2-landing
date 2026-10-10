import { Plus } from "lucide-react";

type AccordionItem = {
  question: string;
  answer: string;
};

/** Acordeón accesible con <details>/<summary>; la expansión suave es mejora progresiva (CSS). */
export function Accordion({ items, className = "" }: { items: readonly AccordionItem[]; className?: string }) {
  return (
    <div className={`border-y border-line ${className}`} data-testid="accordion">
      {items.map((item) => (
        <details key={item.question} className="accordion border-b border-line last:border-b-0">
          <summary className="flex min-h-14 items-center justify-between gap-4 py-3 text-[17px] font-bold">
            <span>{item.question}</span>
            <Plus aria-hidden="true" className="accordion-icon size-5 shrink-0" />
          </summary>
          <p className="max-w-[65ch] pr-9 pb-5">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

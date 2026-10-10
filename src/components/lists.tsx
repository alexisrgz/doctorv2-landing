import { Check } from "lucide-react";

type Step = { title: string; text: string };

/** Pasos numerados: solo para secuencias reales. */
export function StepList({
  steps,
  columns = 1,
  headingLevel: Heading = "h3",
}: {
  steps: readonly Step[];
  columns?: 1 | 2;
  headingLevel?: "h3" | "h4";
}) {
  return (
    <ol className={`grid gap-6 ${columns === 2 ? "sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10" : ""}`}>
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-ink font-display text-[18px] font-bold text-white"
          >
            {index + 1}
          </span>
          <div className="pt-1.5">
            <Heading className="font-display text-[20px] leading-tight font-bold tracking-[-0.02em]">
              <span className="sr-only">Paso {index + 1}: </span>
              {step.title}
            </Heading>
            <p className="mt-1.5 max-w-[48ch] text-slate">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Lista con marca de verificación. */
export function CheckList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={2.25} />
          <span className="max-w-[60ch]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stepper({
  steps,
  current = 1,
}: {
  steps: string[];
  current?: number;
}) {
  return (
    <div className="no-scrollbar flex items-center justify-center gap-3 overflow-x-auto py-6">
      {steps.map((label, i) => {
        const active = i + 1 === current;
        return (
          <div key={label} className="flex shrink-0 items-center gap-3">
            <span className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-[13px] font-semibold text-white",
                  active ? "bg-gold-600" : "bg-[#C3C9D4]",
                )}
              >
                {i + 1}
              </span>
              <span
                className={cn(
                  "text-[15px]",
                  active
                    ? "font-semibold text-gold-700"
                    : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </span>
            {i < steps.length - 1 ? (
              <span className="flex items-center text-border">
                <span className="h-px w-10 bg-border" />
                <ChevronRight className="-ml-1 size-3.5 text-muted-foreground" />
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

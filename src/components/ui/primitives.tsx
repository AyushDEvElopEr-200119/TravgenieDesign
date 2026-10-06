import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ Button */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "link" | "ghost";
  size?: "lg" | "md" | "sm";
  loading?: boolean;
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  icon,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-[filter,transform,box-shadow,background-color] duration-150 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
        size === "lg" && "h-[52px] rounded-xl px-7 text-base",
        size === "md" && "h-[46px] rounded-md px-5 text-[15px]",
        size === "sm" && "h-9 rounded-md px-3 text-[13px]",
        variant === "primary" &&
          "bg-gradient-gold text-primary-foreground shadow-[var(--shadow-gold)] hover:-translate-y-px hover:brightness-[1.06] active:translate-y-0 active:brightness-95",
        variant === "outline" &&
          "border border-gold-500 bg-gold-50 text-gold-700 hover:bg-gold-100",
        variant === "ghost" && "text-secondary-foreground hover:bg-muted",
        variant === "link" &&
          "h-auto rounded-none px-0 font-medium text-link hover:underline",
        className,
      )}
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : null}
      {children}
      {!loading && icon}
    </button>
  );
}

/* ------------------------------------------------------------------- Card */

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn("rounded-xl bg-card border border-border/70 shadow-card card-hover", className)}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ Input */

export function TextInput({
  leading,
  className,
  invalid,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  leading?: ReactNode;
  invalid?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-12 items-center gap-3 rounded-md border bg-card px-4 transition-shadow duration-150",
        invalid ? "border-destructive" : "border-border",
        "focus-within:border-gold-500 focus-within:shadow-[0_0_0_3px_rgba(201,150,59,0.2)]",
        className,
      )}
    >
      {leading ? (
        <span className="text-foreground [&>svg]:size-5">{leading}</span>
      ) : null}
      <input
        {...rest}
        className="h-full w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

export function Field({
  label,
  children,
  className,
  error,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  error?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[13px] text-muted-foreground">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs text-destructive">{error}</span>
      ) : null}
    </label>
  );
}

export function FormInput({
  invalid,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      {...rest}
      className={cn(
        "h-[46px] w-full rounded-md border bg-card px-3.5 text-[15px] outline-none transition-shadow duration-150",
        invalid ? "border-destructive" : "border-border",
        "focus:border-gold-500 focus:shadow-[0_0_0_3px_rgba(201,150,59,0.2)]",
        className,
      )}
    />
  );
}

export function Select({
  className,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...rest}
        className={cn(
          "h-[46px] w-full appearance-none rounded-md border border-border bg-card pr-9 pl-3.5 text-[15px] outline-none transition-shadow duration-150 focus:border-gold-500 focus:shadow-[0_0_0_3px_rgba(201,150,59,0.2)]",
          className,
        )}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-secondary-foreground" />
    </div>
  );
}

/* --------------------------------------------------------------- Checkbox */

export function Checkbox({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "group inline-flex items-center gap-2.5 text-[14px] text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150",
          checked
            ? "border-gold-700 bg-gold-700 text-white"
            : "border-border bg-card group-hover:border-gold-500",
        )}
      >
        {checked ? <Check className="size-3.5" strokeWidth={3} /> : null}
      </span>
      <span>{label}</span>
    </button>
  );
}

export function Radio({
  checked,
  onChange,
  label,
  sub,
}: {
  checked: boolean;
  onChange: () => void;
  label: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onChange}
      className="flex w-full items-start gap-3 rounded-md px-1 py-2 text-left transition-colors duration-150 hover:bg-gold-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
    >
      <span
        className={cn(
          "mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          checked ? "border-warning" : "border-border",
        )}
      >
        {checked ? <span className="size-2 rounded-full bg-warning" /> : null}
      </span>
      <span className="text-[14px]">
        <span className="block font-medium">{label}</span>
        {sub ? (
          <span className="block text-xs text-muted-foreground">{sub}</span>
        ) : null}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------- Tabs */

export function PillTabs<T extends string>({
  options,
  value,
  onChange,
  style = "solid",
  className,
}: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
  style?: "solid" | "outline" | "muted";
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)} role="tablist">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "h-10 rounded-md px-5 text-[15px] font-medium transition-colors duration-150",
              !active && "bg-muted text-secondary-foreground hover:bg-gold-50",
              active && style === "solid" && "bg-gradient-gold text-white",
              active &&
                style === "outline" &&
                "border border-gold-500 bg-gold-50 text-gold-700",
              active && style === "muted" && "bg-gold-100 text-gold-700",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function UnderlineTabs<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex items-center" role="tablist">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative h-12 px-6 text-[15px] transition-colors duration-150",
              active
                ? "font-semibold text-gold-700"
                : "bg-muted/60 text-secondary-foreground hover:text-foreground",
            )}
          >
            {opt.label}
            {active ? (
              <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gold-600" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------- Slider */

export function RangeSlider({
  value,
  onChange,
  min = 0,
  max = 24,
  label,
}: {
  value: [number, number];
  onChange: (next: [number, number]) => void;
  min?: number;
  max?: number;
  label: string;
}) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="pt-2">
      <div className="relative h-4">
        <div className="absolute top-1.5 h-1 w-full rounded-full bg-border" />
        <div
          className="absolute top-1.5 h-1 rounded-full bg-gold-600"
          style={{ left: `${pct(value[0])}%`, right: `${100 - pct(value[1])}%` }}
        />
        {[0, 1].map((i) => (
          <input
            key={i}
            type="range"
            aria-label={`${label} ${i === 0 ? "minimum" : "maximum"}`}
            min={min}
            max={max}
            value={value[i]}
            onChange={(e) => {
              const n = Number(e.target.value);
              const next: [number, number] = [...value] as [number, number];
              next[i] = n;
              if (next[0] <= next[1]) onChange(next);
            }}
            className="pointer-events-none absolute inset-x-0 top-0 h-4 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-gold-600 [&::-webkit-slider-thumb]:shadow"
          />
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Badges */

export function PolicyBadge({
  kind,
}: {
  kind: "within" | "approval" | "out";
}) {
  const map = {
    within: { text: "Within Policy", cls: "bg-success-bg text-success-text" },
    approval: { text: "Needs Approval", cls: "bg-warning-bg text-warning" },
    out: { text: "Out of Policy", cls: "bg-[#FDE7E5] text-destructive" },
  } as const;
  const item = map[kind];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium",
        item.cls,
      )}
    >
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-full text-white",
          kind === "within" && "bg-success",
          kind === "approval" && "bg-warning",
          kind === "out" && "bg-destructive",
        )}
      >
        {kind === "within" ? (
          <Check className="size-2.5" strokeWidth={4} />
        ) : (
          <span className="text-[9px] font-bold">!</span>
        )}
      </span>
      {item.text}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-chip px-3 py-1.5 text-[13px] text-secondary-foreground">
      {children}
    </span>
  );
}

export function Stars({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${count} star hotel`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4 fill-warning">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

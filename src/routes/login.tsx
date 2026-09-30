import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BadgeCheck, Mail } from "lucide-react";
import dubaiSkyline from "@/assets/dubai-skyline.jpg";
import skyClouds from "@/assets/sky-clouds.jpg";
import { GenieMark, Logo } from "@/components/brand/Logo";
import { Button, TextInput } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Variant = "dubai" | "sky";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    variant: (search.variant === "dubai" ? "dubai" : "sky") as Variant,
  }),
  head: () => ({
    meta: [
      { title: "Sign in | TravGenie Corporate Travel" },
      {
        name: "description",
        content:
          "Sign in to TravGenie with your work email or employee number to book policy-compliant corporate flights and hotels.",
      },
      { property: "og:title", content: "Sign in | TravGenie Corporate Travel" },
      {
        property: "og:description",
        content:
          "Smarter business travel: corporate fares, policy checks and approvals in one place.",
      },
    ],
  }),
  component: LoginPage,
});

function CwsBlock({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="text-[11px] font-medium tracking-[0.18em] text-secondary-foreground">
        A PRODUCT BY
      </span>
      <span className="h-8 w-px bg-border" />
      <span className="flex items-center gap-2">
        <svg viewBox="0 0 40 40" className="size-8">
          <defs>
            <linearGradient id="cws-globe" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E0B45C" />
              <stop offset="100%" stopColor="#A8741A" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="17" fill="url(#cws-globe)" />
          <g fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.85">
            <ellipse cx="20" cy="20" rx="17" ry="7" />
            <ellipse cx="20" cy="20" rx="7" ry="17" />
            <path d="M3 20h34" />
          </g>
        </svg>
        <span className="leading-none">
          <span className="block text-[20px] font-extrabold tracking-tight text-navy">
            CWS
          </span>
          <span className="block text-[7px] font-bold tracking-[0.1em] text-navy">
            GROUP OF COMPANIES
          </span>
        </span>
      </span>
    </div>
  );
}

function LoginPage() {
  const { variant } = Route.useSearch();
  const [mode, setMode] = useState<"email" | "employee">("email");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const sendOtp = () => {
    const ok =
      mode === "email"
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        : /^[A-Za-z0-9]{4,}$/.test(value);
    if (!ok) {
      setError(
        mode === "email"
          ? "Enter a valid email ID"
          : "Enter a valid employee number",
      );
      return;
    }
    setError(null);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 900);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream">
      {/* layered cream waves */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 700"
        aria-hidden="true"
      >
        <path
          d="M0 120C160 60 250 210 420 170 560 138 640 20 760 0V700H0z"
          fill="#FFFFFF"
          opacity="0.55"
        />
        <path
          d="M0 620C140 560 260 690 430 660 590 632 700 700 820 690V700H0z"
          fill="#FFFFFF"
          opacity="0.7"
        />
      </svg>

      <div className="relative grid min-h-screen lg:grid-cols-[46%_54%]">
        {/* ---------------------------------------------------------- form */}
        <div className="relative flex flex-col justify-center px-6 py-12 sm:px-12 lg:pl-[100px]">
          <div className="w-full max-w-[450px]">
            <Logo width={330} />

            <p className="mt-8 text-[28px] font-normal text-navy">Welcome to</p>
            <h1 className="mt-1 text-[46px] leading-[1.1] font-bold text-navy">
              Smarter
              <br />
              Business Travel
            </h1>

            <div className="mt-9 grid h-12 grid-cols-2 overflow-hidden rounded-md">
              {(
                [
                  ["email", "Email ID"],
                  ["employee", "Employee Number"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setMode(key);
                    setValue("");
                    setError(null);
                  }}
                  className={cn(
                    "text-[15px] transition-colors duration-150",
                    mode === key
                      ? "bg-gold-100 font-medium text-gold-700"
                      : "bg-muted text-secondary-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <TextInput
              className="mt-4"
              invalid={!!error}
              leading={mode === "email" ? <Mail /> : <BadgeCheck />}
              placeholder={
                mode === "email"
                  ? "Enter your email ID"
                  : "Enter your employee number"
              }
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label={mode === "email" ? "Email ID" : "Employee number"}
            />
            {error ? (
              <p className="mt-1 text-xs text-destructive">{error}</p>
            ) : null}

            {otpSent ? (
              <div className="mt-4">
                <p className="mb-2 text-[13px] text-secondary-foreground">
                  Enter the 6-digit code we sent to {value}
                </p>
                <div className="flex gap-2.5">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      value={digit}
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`OTP digit ${i + 1}`}
                      onChange={(e) => {
                        const next = [...otp];
                        next[i] = e.target.value.replace(/\D/g, "").slice(-1);
                        setOtp(next);
                      }}
                      className="h-12 w-12 rounded-md border border-border bg-card text-center text-lg font-semibold outline-none focus:border-gold-500 focus:shadow-[0_0_0_3px_rgba(201,150,59,0.2)]"
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {otpSent ? (
              <Link to="/dashboard" className="mt-4 block">
                <Button
                  size="lg"
                  className="w-full"
                  icon={<ArrowRight className="size-5" />}
                >
                  Verify &amp; Continue
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                loading={loading}
                onClick={sendOtp}
                className="mt-4 w-full"
                icon={<ArrowRight className="size-5" />}
              >
                Send OTP
              </Button>
            )}

            <p className="mt-4 text-sm text-foreground">
              Need help?{" "}
              <button className="font-medium text-link hover:underline">
                Contact Support
              </button>
            </p>

            {variant === "dubai" ? (
              <CwsBlock className="mt-16 justify-end" />
            ) : null}
          </div>
        </div>

        {/* --------------------------------------------------------- photo */}
        <div className="relative hidden min-h-[520px] lg:block">
          <svg className="absolute size-0" aria-hidden="true">
            <clipPath id="login-wave" clipPathUnits="objectBoundingBox">
              <path d="M0.1 0C0.02 0.16 0.13 0.3 0.1 0.45 0.07 0.62 -0.03 0.74 0.05 0.9 0.09 0.97 0.1 0.99 0.1 1H1V0z" />
            </clipPath>
          </svg>
          <div
            className="absolute inset-0"
            style={{ clipPath: "url(#login-wave)" }}
          >
            <img
              src={variant === "dubai" ? dubaiSkyline : skyClouds}
              alt=""
              className="size-full object-cover"
            />
            {variant === "dubai" ? (
              <>
                <GenieMark
                  gradientId="login-genie"
                  className="absolute top-1/2 right-[8%] h-[52%] -translate-y-1/2 opacity-90 drop-shadow-[0_10px_30px_rgba(120,80,10,0.35)]"
                />
                <div className="absolute right-12 bottom-14 text-right">
                  <p className="text-2xl font-light text-white">Travel for</p>
                  <p className="text-[32px] font-bold text-white">
                    a Bigger Tomorrow
                  </p>
                  <span className="mt-4 ml-auto block h-1 w-[70px] bg-gold-500" />
                </div>
              </>
            ) : (
              <GenieMark
                gradientId="login-genie-sky"
                className="absolute top-1/2 right-[14%] h-[300px] -translate-y-[55%] opacity-95 drop-shadow-[0_10px_30px_rgba(120,80,10,0.3)]"
              />
            )}
          </div>

          {variant === "sky" ? (
            <CwsBlock className="absolute right-10 bottom-8 z-10" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

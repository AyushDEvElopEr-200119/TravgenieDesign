import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Plane,
} from "lucide-react";
import { AirlineLogo } from "@/components/brand/AirlineLogo";
import { TopNav } from "@/components/layout/TopNav";
import { Stepper } from "@/components/layout/Stepper";
import {
  Button,
  Card,
  Checkbox,
  Field,
  FormInput,
  Select,
} from "@/components/ui/primitives";

export const Route = createFileRoute("/flights/book")({
  head: () => ({
    meta: [
      { title: "Flight Booking — Traveller Details | TravGenie" },
      {
        name: "description",
        content:
          "Review your Oman Air Muscat–Dubai itinerary, enter traveller details and confirm the in-policy fare of USD 254.40.",
      },
      { property: "og:title", content: "Flight Booking | TravGenie" },
      {
        property: "og:description",
        content: "Confirm flight details and traveller information in four steps.",
      },
    ],
  }),
  component: FlightBookPage,
});

function LegRow({
  label,
  date,
  depart,
  departCode,
  arrive,
  arriveCode,
}: {
  label: string;
  date: string;
  depart: string;
  departCode: string;
  arrive: string;
  arriveCode: string;
}) {
  return (
    <div className="rounded-lg border border-border">
      <div className="flex items-center gap-2.5 px-5 py-3">
        <Plane className="size-4" />
        <span className="text-[15px] font-bold">{label}</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-[15px] text-secondary-foreground">{date}</span>
      </div>
      <div className="flex flex-wrap items-center gap-6 border-t border-divider px-5 py-4">
        <AirlineLogo name="Oman Air" size={44} />
        <div className="w-[90px]">
          <p className="text-[15px] font-bold">Oman Air</p>
          <p className="text-[13px] text-muted-foreground">WY</p>
        </div>
        <div>
          <p className="text-[21px] leading-tight font-bold">{depart}</p>
          <p className="text-[13px] text-secondary-foreground">{departCode}</p>
        </div>
        <div className="flex min-w-[110px] flex-col items-center">
          <span className="text-[13px] text-muted-foreground">1h 30m</span>
          <span className="my-1 flex w-full items-center gap-1">
            <span className="h-px flex-1 bg-border" />
            <Plane className="size-3 rotate-90 text-muted-foreground" />
            <span className="h-px flex-1 bg-border" />
          </span>
          <span className="text-[13px] font-medium text-success">Direct</span>
        </div>
        <div>
          <p className="text-[21px] leading-tight font-bold">{arrive}</p>
          <p className="text-[13px] text-secondary-foreground">{arriveCode}</p>
        </div>
        <span className="hidden h-12 w-px bg-divider sm:block" />
        <button className="flex items-center gap-1.5 text-[14px] font-medium text-gold-700 hover:underline">
          Fare Rules <ChevronDown className="size-4" />
        </button>
        <span className="hidden h-12 w-px bg-divider sm:block" />
        <div className="text-[14px]">
          <p>Economy (Y)</p>
          <p className="text-secondary-foreground">25 kg | 7 kg</p>
        </div>
      </div>
    </div>
  );
}

function FlightBookPage() {
  const [form, setForm] = useState({
    title: "Mr",
    first: "Richard",
    last: "Robario",
    dob: "12 Mar 1980",
    nationality: "India",
    passport: "A1234567",
    ffAirline: "Oman Air - WY",
    ffNumber: "1234567890",
  });
  const [saveFf, setSaveFf] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.first.trim()) next.first = "First name is required";
    if (!form.last.trim()) next.last = "Last name is required";
    if (!/^[A-Z][0-9]{7}$/.test(form.passport))
      next.passport = "Enter a valid passport number, e.g. A1234567";
    if (!/^\d{2} [A-Za-z]{3} \d{4}$/.test(form.dob))
      next.dob = "Use the format 12 Mar 1980";
    setErrors(next);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav active="flight" user={{ initials: "RP", name: "Richard" }} />

      <div className="mx-auto max-w-[1340px] px-4 pb-10">
        <Stepper
          current={1}
          steps={[
            "Flight Details",
            "Traveller Details",
            "Additional Services",
            "Review & Pay",
          ]}
        />

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="min-w-0 flex-1 space-y-5">
            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2.5 text-[19px] font-bold">
                  <CheckCircle2 className="size-6 text-gold-500" />
                  Flight Details
                </h2>
                <button className="text-[15px] font-medium text-link hover:underline">
                  Change Flight
                </button>
              </div>
              <div className="space-y-4">
                <LegRow
                  label="Departure"
                  date="Tue, 12 Nov 2026"
                  depart="10:00"
                  departCode="MCT"
                  arrive="11:30"
                  arriveCode="DXB"
                />
                <LegRow
                  label="Return"
                  date="Fri, 15 Nov 2026"
                  depart="18:40"
                  departCode="DXB"
                  arrive="20:10"
                  arriveCode="MCT"
                />
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="mb-4 flex items-center gap-2.5 text-[19px] font-bold">
                <CheckCircle2 className="size-6 text-gold-500" />
                Traveller Details
              </h2>
              <div className="rounded-lg border border-border p-5">
                <p className="mb-4 text-[16px] font-medium">Traveller 1 (Adult)</p>

                <div className="grid gap-4 sm:grid-cols-[110px_1fr_1fr]">
                  <Field label="Title">
                    <Select
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    >
                      {["Mr", "Ms", "Mrs", "Dr"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="First Name" error={errors.first}>
                    <FormInput
                      value={form.first}
                      invalid={!!errors.first}
                      onChange={(e) => setForm({ ...form, first: e.target.value })}
                    />
                  </Field>
                  <Field label="Last Name" error={errors.last}>
                    <FormInput
                      value={form.last}
                      invalid={!!errors.last}
                      onChange={(e) => setForm({ ...form, last: e.target.value })}
                    />
                  </Field>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <Field label="Date of Birth" error={errors.dob}>
                    <div className="relative">
                      <FormInput
                        value={form.dob}
                        invalid={!!errors.dob}
                        onChange={(e) => setForm({ ...form, dob: e.target.value })}
                        className="pr-10"
                      />
                      <CalendarDays className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-secondary-foreground" />
                    </div>
                  </Field>
                  <Field label="Nationality">
                    <Select
                      value={form.nationality}
                      onChange={(e) =>
                        setForm({ ...form, nationality: e.target.value })
                      }
                    >
                      {["India", "Oman", "United Arab Emirates", "United Kingdom"].map(
                        (c) => (
                          <option key={c}>{c}</option>
                        ),
                      )}
                    </Select>
                  </Field>
                  <Field label="Passport Number" error={errors.passport}>
                    <FormInput
                      value={form.passport}
                      invalid={!!errors.passport}
                      onChange={(e) => setForm({ ...form, passport: e.target.value })}
                    />
                  </Field>
                  <Field label="Frequent Flyer (Optional)">
                    <div className="flex">
                      <Select
                        className="rounded-r-none"
                        value={form.ffAirline}
                        onChange={(e) =>
                          setForm({ ...form, ffAirline: e.target.value })
                        }
                      >
                        {["Oman Air - WY", "Emirates - EK", "Qatar Airways - QR"].map(
                          (a) => (
                            <option key={a}>{a}</option>
                          ),
                        )}
                      </Select>
                      <FormInput
                        className="rounded-l-none border-l-0"
                        value={form.ffNumber}
                        onChange={(e) =>
                          setForm({ ...form, ffNumber: e.target.value })
                        }
                      />
                    </div>
                  </Field>
                </div>

                <Checkbox
                  className="mt-5"
                  checked={saveFf}
                  onChange={setSaveFf}
                  label="Add frequent flyer for next time"
                />
              </div>
            </Card>
          </div>

          <div className="w-full shrink-0 space-y-5 xl:sticky xl:top-4 xl:h-fit xl:w-[400px]">
            <Card className="p-5">
              <h2 className="text-[19px] font-bold">Fare Summary</h2>
              <p className="text-[14px] text-secondary-foreground">
                1 Traveller (Economy)
              </p>
              <dl className="mt-4 space-y-2.5 text-[15px]">
                <div className="flex justify-between">
                  <dt className="text-secondary-foreground">Base Fare</dt>
                  <dd>USD 196.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-secondary-foreground">Taxes &amp; Fees</dt>
                  <dd>USD 58.40</dd>
                </div>
                <div className="h-px bg-divider" />
                <div className="flex justify-between text-[18px] font-bold">
                  <dt>Total Amount</dt>
                  <dd>USD 254.40</dd>
                </div>
              </dl>
              <div className="mt-4 flex items-start gap-3 rounded-md bg-success-bg p-3.5">
                <CheckCircle2 className="size-5 shrink-0 text-success" />
                <p className="text-[14px] text-success-text">
                  This booking is within your company travel policy.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-[19px] font-bold">Fare Rules</h2>
              <ul className="mt-4 space-y-3 text-[14px]">
                {[
                  ["Cancellation", "Charges apply"],
                  ["Date Change", "Charges apply"],
                  ["Baggage", "25 kg (Check-in) + 7 kg (Cabin)"],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-start justify-between gap-4">
                    <span className="flex items-center gap-2.5">
                      <Plane className="size-4 text-secondary-foreground" />
                      {k}
                    </span>
                    <span className="text-right text-secondary-foreground">{v}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 flex items-center gap-2 text-[14px] font-medium text-gold-700 hover:underline">
                <ExternalLink className="size-4" /> View Full Fare Rules
              </button>
            </Card>

            <Button
              size="lg"
              className="w-full"
              onClick={validate}
              icon={<ArrowRight className="size-5" />}
            >
              Continue to Add-ons
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

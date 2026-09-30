import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BedDouble,
  CheckCircle2,
  Image as ImageIcon,
  Info,
  MapPin,
  Maximize,
  Users,
  Wifi,
} from "lucide-react";
import roomCityView from "@/assets/room-city-view.jpg";
import { TopNav } from "@/components/layout/TopNav";
import { Stepper } from "@/components/layout/Stepper";
import {
  Button,
  Card,
  Checkbox,
  Field,
  FormInput,
  Radio,
  Select,
  Stars,
} from "@/components/ui/primitives";
import { hotels } from "@/data/travel";

export const Route = createFileRoute("/hotels/book")({
  head: () => ({
    meta: [
      { title: "Hotel Booking — Rove Downtown Dubai | TravGenie" },
      {
        name: "description",
        content:
          "Confirm your Rove Downtown Dubai stay for 12–15 Nov 2026: room, traveller details, payment method and USD 282.90 total.",
      },
      { property: "og:title", content: "Hotel Booking | TravGenie" },
      {
        property: "og:description",
        content: "Three nights in Downtown Dubai, within company travel policy.",
      },
    ],
  }),
  component: HotelBookPage,
});

const rove = hotels[0];

function HotelBookPage() {
  const [payment, setPayment] = useState("company");
  const [saveFf, setSaveFf] = useState(false);
  const [form, setForm] = useState({
    title: "Mr",
    first: "Azim",
    last: "Robario",
    email: "azim.robario@company.com",
    code: "+968",
    mobile: "9876 5432",
    nationality: "India",
    ffAirline: "Oman Air - WY",
    ffNumber: "1234567890",
  });

  return (
    <div className="min-h-screen bg-background">
      <TopNav active="hotel" user={{ initials: "AZ", name: "Azim" }} />

      <div className="mx-auto max-w-[1340px] px-4 pb-10">
        <Stepper
          current={1}
          steps={[
            "Hotel Details",
            "Room & Add-ons",
            "Traveller Details",
            "Review & Pay",
          ]}
        />

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="min-w-0 flex-1 space-y-5">
            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-[19px] font-bold">Selected Hotel &amp; Room</h2>
                <button className="text-[15px] font-medium text-link hover:underline">
                  Change Hotel
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-5 rounded-lg border border-border p-4">
                <img
                  src={rove.image}
                  alt={rove.name}
                  loading="lazy"
                  className="h-[100px] w-[165px] shrink-0 rounded-md object-cover"
                />
                <div className="min-w-[200px] flex-1">
                  <p className="text-[17px] font-bold">{rove.name}</p>
                  <Stars count={rove.stars} />
                  <p className="mt-1 flex items-center gap-1.5 text-[14px] text-secondary-foreground">
                    <MapPin className="size-4" /> Downtown Dubai, Dubai
                  </p>
                </div>
                {[
                  ["Check-in", "Tue, 12 Nov 2026", "from 3:00 PM"],
                  ["Check-out", "Fri, 15 Nov 2026", "till 12:00 PM"],
                  ["Nights", "3 Nights", ""],
                ].map(([label, value, sub]) => (
                  <div key={label} className="min-w-[130px]">
                    <p className="text-[13px] text-muted-foreground">{label}</p>
                    <p className="text-[15px] font-semibold">{value}</p>
                    {sub ? (
                      <p className="text-[12px] text-secondary-foreground">{sub}</p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-5 rounded-lg border border-border p-4">
                <img
                  src={roomCityView}
                  alt="Rove Room with city view"
                  loading="lazy"
                  className="h-20 w-[100px] shrink-0 rounded-md object-cover"
                />
                <div className="min-w-[220px] flex-1">
                  <p className="text-[16px] font-bold">Rove Room - City View</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-[13px] text-secondary-foreground">
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="size-4" /> 1 King Bed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="size-4" /> City View
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize className="size-4" /> 25 m²
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="size-4" /> Max 2 Adults
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
                    <span className="rounded-sm bg-success-bg px-2.5 py-1 text-success-text">
                      Free Cancellation till 10 Nov 2026
                    </span>
                    <span className="rounded-sm bg-success-bg px-2.5 py-1 text-success-text">
                      Breakfast Included
                    </span>
                    <span className="flex items-center gap-1.5 text-secondary-foreground">
                      <Wifi className="size-4" /> Wi-Fi Included
                    </span>
                  </div>
                </div>
                <Button variant="outline">Change Room</Button>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="mb-4 text-[19px] font-bold">Traveller Details</h2>
              <div className="rounded-lg border border-border p-5">
                <p className="mb-4 text-[16px] font-medium">
                  Traveller 1 (Primary Traveller)
                </p>

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
                  <Field label="First Name">
                    <FormInput
                      value={form.first}
                      onChange={(e) => setForm({ ...form, first: e.target.value })}
                    />
                  </Field>
                  <Field label="Last Name">
                    <FormInput
                      value={form.last}
                      onChange={(e) => setForm({ ...form, last: e.target.value })}
                    />
                  </Field>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <Field label="Email ID">
                    <FormInput
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </Field>
                  <Field label="Mobile">
                    <div className="flex">
                      <Select
                        className="w-[100px] rounded-r-none"
                        value={form.code}
                        onChange={(e) => setForm({ ...form, code: e.target.value })}
                      >
                        {["+968", "+971", "+91", "+44"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </Select>
                      <FormInput
                        className="rounded-l-none border-l-0"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      />
                    </div>
                  </Field>
                  <Field label="Nationality">
                    <Select
                      value={form.nationality}
                      onChange={(e) =>
                        setForm({ ...form, nationality: e.target.value })
                      }
                    >
                      {["India", "Oman", "United Arab Emirates"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </Select>
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
                        {["Oman Air - WY", "Emirates - EK"].map((a) => (
                          <option key={a}>{a}</option>
                        ))}
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
              <h2 className="text-[19px] font-bold">Booking Summary</h2>
              <div className="mt-4 flex gap-3">
                <img
                  src={rove.image}
                  alt=""
                  loading="lazy"
                  className="h-[70px] w-[100px] shrink-0 rounded-md object-cover"
                />
                <div>
                  <p className="text-[15px] font-bold">{rove.name}</p>
                  <Stars count={rove.stars} />
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-secondary-foreground">
                    <MapPin className="size-3.5" /> Downtown Dubai, Dubai
                  </p>
                </div>
              </div>

              <dl className="mt-4 space-y-2.5 text-[14px]">
                {[
                  ["Room Type", "Rove Room - City View"],
                  ["Check-in", "Tue, 12 Nov 2026"],
                  ["Check-out", "Fri, 15 Nov 2026"],
                  ["Nights", "3 Nights"],
                  ["Adults", "1 Adult"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-secondary-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 h-px bg-divider" />

              <div className="mt-4 space-y-2.5 text-[15px]">
                <div className="flex justify-between">
                  <span>
                    Room Charges
                    <span className="block text-[12px] text-muted-foreground">
                      USD 82 x 3 nights
                    </span>
                  </span>
                  <span>USD 246.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Taxes &amp; Fees</span>
                  <span>USD 36.90</span>
                </div>
                <div className="h-px bg-divider" />
                <div className="flex justify-between text-[18px] font-bold">
                  <span>Total Amount</span>
                  <span>USD 282.90</span>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-md bg-success-bg p-3.5">
                <CheckCircle2 className="size-5 shrink-0 text-success" />
                <p className="text-[14px] text-success-text">
                  This booking is within your company travel policy.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-[19px] font-bold">Payment Method</h2>
              <div role="radiogroup" aria-label="Payment method" className="mt-3">
                {[
                  ["company", "Company Account (DCB Bank)"],
                  ["card", "Personal Card"],
                  ["corporate", "Corporate Credit Card"],
                  ["hold", "Hold Booking (Pay Later)"],
                ].map(([key, label]) => (
                  <Radio
                    key={key}
                    checked={payment === key}
                    onChange={() => setPayment(key)}
                    label={
                      key === "hold" ? (
                        <span className="flex items-center gap-1.5">
                          {label} <Info className="size-3.5 text-muted-foreground" />
                        </span>
                      ) : (
                        label
                      )
                    }
                  />
                ))}
              </div>
            </Card>

            <Button size="lg" className="w-full" icon={<ArrowRight className="size-5" />}>
              Proceed to Review &amp; Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

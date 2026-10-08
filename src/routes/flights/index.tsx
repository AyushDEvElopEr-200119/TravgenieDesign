import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Info,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  User,
} from "lucide-react";
import skyClouds from "@/assets/sky-clouds.jpg";
import { SearchShell } from "@/components/layout/SearchShell";
import { Button, Checkbox, PillTabs } from "@/components/ui/primitives";

export const Route = createFileRoute("/flights/")({
  head: () => ({
    meta: [
      { title: "Flight Search | TravGenie Corporate Travel" },
      {
        name: "description",
        content:
          "Search corporate flights with negotiated fares, policy checks and flexible booking between Muscat, Dubai and beyond.",
      },
      { property: "og:title", content: "Flight Search | TravGenie" },
      {
        property: "og:description",
        content: "Business travel made simple: better choices, greater control.",
      },
    ],
  }),
  component: FlightSearchPage,
});

function FieldCell({
  label,
  icon,
  value,
  sub,
  className,
  trailing,
}: {
  label: string;
  icon?: React.ReactNode;
  value: string;
  sub?: string;
  className?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      className={`flex min-w-0 flex-1 flex-col justify-center gap-1 px-5 py-4 text-left transition-colors hover:bg-gold-50/60 ${className ?? ""}`}
    >
      <span className="flex items-center gap-2 text-[14px] text-secondary-foreground">
        {icon}
        {label}
      </span>
      <span className="flex items-center gap-2.5">
        <span className="truncate text-[16px] font-semibold">{value}</span>
        {trailing}
      </span>
      {sub ? (
        <span className="truncate text-[12px] text-muted-foreground">{sub}</span>
      ) : null}
    </button>
  );
}

function FlightSearchPage() {
  const navigate = useNavigate();
  const [trip, setTrip] = useState("one-way");
  const [swapped, setSwapped] = useState(false);
  const [direct, setDirect] = useState(false);
  const [corporate, setCorporate] = useState(true);
  const [nearby, setNearby] = useState(false);

  const from = swapped
    ? { city: "Dubai (DXB)", airport: "Dubai International Airport" }
    : { city: "Muscat (MCT)", airport: "Muscat International Airport" };
  const to = swapped
    ? { city: "Muscat (MCT)", airport: "Muscat International Airport" }
    : { city: "Dubai (DXB)", airport: "Dubai International Airport" };

  return (
    <SearchShell
      tab="flight"
      user={{ initials: "RP", name: "Richard" }}
      image={skyClouds}
      kicker="Business Travel"
      headline="Made Simple"
      tagline="Better Choices. Greater Control."
      benefits={[
        { icon: "policy", title: "Policy Compliant Travel", sub: "Stay within company policy" },
        { icon: "fare", title: "Best Corporate Fares", sub: "Exclusive negotiated rates" },
        { icon: "flex", title: "Flexible Booking", sub: "Free changes where allowed" },
        { icon: "support", title: "24/7 Support", sub: "We're here for you" },
      ]}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PillTabs
          style="outline"
          value={trip}
          onChange={setTrip}
          options={[
            { value: "one-way", label: "One Way" },
            { value: "round", label: "Round Trip" },
            { value: "multi", label: "Multi City" },
          ]}
        />
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 text-[15px] text-secondary-foreground hover:text-foreground">
            Travel Policy <Info className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-5 flex flex-col divide-y divide-border rounded-lg border border-border lg:flex-row lg:divide-x lg:divide-y-0">
        <FieldCell
          label="From"
          icon={<PlaneTakeoff className="size-4" />}
          value={from.city}
          sub={from.airport}
        />
        <div className="relative hidden w-0 lg:block">
          <button
            onClick={() => setSwapped((s) => !s)}
            aria-label="Swap origin and destination"
            className="absolute top-1/2 left-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-50 text-gold-600 transition-transform duration-[250ms] ease-out hover:bg-gold-100"
            style={{ transform: `translate(-50%,-50%) rotate(${swapped ? 180 : 0}deg)` }}
          >
            <ArrowLeftRight className="size-4" />
          </button>
        </div>
        <FieldCell
          label="To"
          icon={<PlaneLanding className="size-4" />}
          value={to.city}
          sub={to.airport}
        />
        <FieldCell
          label="Departure"
          value="Tue, 12 Nov 2026"
          icon={<CalendarDays className="size-4" />}
        />
        <FieldCell
          label="Return"
          value="Fri, 15 Nov 2026"
          icon={<CalendarDays className="size-4" />}
          className={trip === "one-way" ? "opacity-60" : ""}
        />
        <FieldCell
          label="Travellers & Class"
          value="1 Traveller"
          sub="Economy"
          icon={<User className="size-4" />}
          trailing={<ChevronDown className="size-4 text-secondary-foreground" />}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-8">
          <Checkbox checked={direct} onChange={setDirect} label="Direct flights only" />
          <Checkbox
            checked={corporate}
            onChange={setCorporate}
            label="Show corporate fares only"
          />
          <Checkbox
            checked={nearby}
            onChange={setNearby}
            label="Include nearby airports"
          />
        </div>
        <Button
          size="lg"
          className="w-full sm:w-[320px]"
          icon={<ArrowRight className="size-5" />}
          onClick={() => navigate({ to: "/flights/results" })}
        >
          <Plane className="mr-1 hidden size-0" />
          Search Flights
        </Button>
      </div>
    </SearchShell>
  );
}

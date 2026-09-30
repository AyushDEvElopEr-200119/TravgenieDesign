import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeftRight,
  Briefcase,
  ChevronDown,
  Luggage,
  Plane,
} from "lucide-react";
import { AirlineLogo } from "@/components/brand/AirlineLogo";
import { TopNav } from "@/components/layout/TopNav";
import {
  Button,
  Card,
  Checkbox,
  RangeSlider,
  UnderlineTabs,
} from "@/components/ui/primitives";
import { airlineFilters, flights, stopFilters } from "@/data/travel";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/flights/results")({
  head: () => ({
    meta: [
      { title: "Muscat to Dubai Flights | TravGenie" },
      {
        name: "description",
        content:
          "Compare corporate flights from Muscat (MCT) to Dubai (DXB) on 12 Nov 2026 with fares, baggage and fare rules side by side.",
      },
      { property: "og:title", content: "Muscat to Dubai Flights | TravGenie" },
      {
        property: "og:description",
        content: "Direct MCT to DXB corporate fares from USD 196 per traveller.",
      },
    ],
  }),
  component: FlightResultsPage,
});

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-divider pt-4 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-[15px] font-bold">{title}</h3>
      {children}
    </div>
  );
}

function FlightCard({ flight }: { flight: (typeof flights)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="p-5 transition-shadow duration-150 hover:border hover:border-gold-500/40 hover:shadow-float">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <AirlineLogo name={flight.airline} size={56} />
          <div className="w-[110px] shrink-0">
            <p className="text-[15px] font-bold">{flight.airline}</p>
            <p className="text-[13px] text-muted-foreground">{flight.code}</p>
          </div>

          <div className="flex flex-1 items-center gap-5">
            <div>
              <p className="text-[24px] leading-tight font-bold">{flight.depart}</p>
              <p className="text-[14px] text-secondary-foreground">
                {flight.departCode}
              </p>
            </div>
            <div className="flex min-w-[110px] flex-1 flex-col items-center">
              <span className="text-[13px] text-muted-foreground">
                {flight.duration}
              </span>
              <span className="my-1 flex w-full items-center gap-1 text-border">
                <span className="h-px flex-1 bg-border" />
                <Plane className="size-3.5 rotate-90 text-muted-foreground" />
                <span className="h-px flex-1 bg-border" />
              </span>
              <span className="text-[13px] font-medium text-success">
                {flight.stops}
              </span>
            </div>
            <div>
              <p className="text-[24px] leading-tight font-bold">{flight.arrive}</p>
              <p className="text-[14px] text-secondary-foreground">
                {flight.arriveCode}
              </p>
            </div>
          </div>
        </div>

        <span className="hidden h-16 w-px bg-divider xl:block" />

        <div className="flex shrink-0 flex-col gap-2">
          <div className="flex items-center gap-5 text-[14px] text-secondary-foreground">
            <span className="flex items-center gap-1.5">
              <Briefcase className="size-4" /> {flight.checkedBag}
            </span>
            <span className="flex items-center gap-1.5">
              <Luggage className="size-4" /> {flight.cabinBag}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[13px]">
            <button className="text-link underline hover:no-underline">
              Fare Rules
            </button>
            <span className="text-divider">|</span>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="flex items-center gap-1 text-link hover:underline"
            >
              View Details
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  open && "rotate-180",
                )}
              />
            </button>
          </div>
        </div>

        <span className="hidden h-16 w-px bg-divider xl:block" />

        <div className="flex shrink-0 items-center justify-between gap-5 xl:flex-col xl:items-end">
          <div className="text-right">
            <p className="text-[28px] leading-none font-bold">
              USD {flight.price}
            </p>
            <p className="text-[13px] text-muted-foreground">per traveller</p>
          </div>
          <Link to="/flights/book">
            <Button className="w-[116px]">Select</Button>
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden transition-all duration-200 ease-out",
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 rounded-lg bg-surface-tint p-4 text-[13px] text-secondary-foreground">
          <p className="font-semibold text-foreground">
            {flight.airline} {flight.id} · Economy (Y)
          </p>
          <p className="mt-1">
            {flight.departCode} {flight.depart} → {flight.arriveCode} {flight.arrive}{" "}
            · {flight.duration} · {flight.stops}
          </p>
          <p className="mt-1">
            Baggage: {flight.checkedBag} check-in + {flight.cabinBag} cabin ·
            Complimentary meal · Seat selection at check-in
          </p>
        </div>
      </div>
    </Card>
  );
}

function FlightResultsPage() {
  const [stops, setStops] = useState<string[]>(["Direct"]);
  const [airlines, setAirlines] = useState<string[]>(["Oman Air"]);
  const [depTime, setDepTime] = useState<[number, number]>([0, 24]);
  const [arrTime, setArrTime] = useState<[number, number]>([0, 24]);
  const [tab, setTab] = useState("recommended");

  const toggle = (list: string[], set: (v: string[]) => void, name: string) =>
    set(list.includes(name) ? list.filter((n) => n !== name) : [...list, name]);

  const clearAll = () => {
    setStops([]);
    setAirlines([]);
    setDepTime([0, 24]);
    setArrTime([0, 24]);
  };

  const shown = flights.filter(
    (f) => airlines.length === 0 || airlines.includes(f.airline),
  );

  return (
    <div className="min-h-screen bg-background">
      <TopNav active="flight" user={{ initials: "RP", name: "Richard" }} />

      <div className="mx-auto max-w-[1340px] px-4 py-5">
        <Card className="flex flex-wrap items-center gap-5 px-6 py-5">
          <span className="flex items-center gap-3 text-[19px] font-bold">
            <Plane className="size-5" /> Muscat (MCT)
          </span>
          <span className="flex size-9 items-center justify-center rounded-full bg-gold-50 text-gold-600">
            <ArrowLeftRight className="size-4" />
          </span>
          <span className="flex items-center gap-3 text-[19px] font-bold">
            <Plane className="size-5" /> Dubai (DXB)
          </span>
          <span className="hidden h-8 w-px bg-divider sm:block" />
          <span className="text-[14px] text-secondary-foreground">
            Tue, 12 Nov 2026 – Fri, 15 Nov 2026 | 1 Traveller | Economy
          </span>
          <Link to="/flights" className="ml-auto">
            <Button variant="outline">Modify Search</Button>
          </Link>
        </Card>

        <div className="mt-5 flex flex-col gap-5 lg:flex-row">
          <Card className="h-fit shrink-0 space-y-4 p-5 lg:sticky lg:top-4 lg:w-[250px]">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-bold">Filter Results</h2>
              <button
                onClick={clearAll}
                className="text-[14px] font-medium text-link hover:underline"
              >
                Clear All
              </button>
            </div>

            <FilterSection title="Stops">
              <ul className="space-y-3">
                {stopFilters.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-2">
                    <Checkbox
                      checked={stops.includes(s.name)}
                      onChange={() => toggle(stops, setStops, s.name)}
                      label={s.name}
                    />
                    <span className="text-[13px] text-muted-foreground">
                      USD {s.price}
                    </span>
                  </li>
                ))}
              </ul>
            </FilterSection>

            <FilterSection title="Departure Time (MCT)">
              <RangeSlider
                label="Departure time"
                value={depTime}
                onChange={setDepTime}
              />
              <p className="mt-2 text-[13px] text-secondary-foreground">
                {String(depTime[0]).padStart(2, "0")}:00 –{" "}
                {String(depTime[1]).padStart(2, "0")}:00
              </p>
            </FilterSection>

            <FilterSection title="Arrival Time (DXB)">
              <RangeSlider label="Arrival time" value={arrTime} onChange={setArrTime} />
              <p className="mt-2 text-[13px] text-secondary-foreground">
                {String(arrTime[0]).padStart(2, "0")}:00 –{" "}
                {String(arrTime[1]).padStart(2, "0")}:00
              </p>
            </FilterSection>

            <FilterSection title="Airlines">
              <ul className="space-y-3">
                {airlineFilters.map((a) => (
                  <li key={a.name} className="flex items-center justify-between gap-2">
                    <Checkbox
                      checked={airlines.includes(a.name)}
                      onChange={() => toggle(airlines, setAirlines, a.name)}
                      label={a.name}
                    />
                    <span className="text-[13px] text-muted-foreground">
                      USD {a.price}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-3 text-[15px] font-medium text-link hover:underline">
                Show more
              </button>
            </FilterSection>
          </Card>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="overflow-hidden rounded-lg bg-card shadow-card">
                <UnderlineTabs
                  value={tab}
                  onChange={setTab}
                  options={[
                    { value: "recommended", label: "Recommended (42)" },
                    { value: "lowest", label: "Lowest Price (38)" },
                    { value: "shortest", label: "Shortest Duration (15)" },
                  ]}
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[15px] text-secondary-foreground">Sort by</span>
                <span className="relative">
                  <select
                    aria-label="Sort by"
                    className="h-12 appearance-none rounded-md border border-border bg-card pr-10 pl-4 text-[15px] outline-none"
                  >
                    <option>Recommended</option>
                    <option>Price (low to high)</option>
                    <option>Duration</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-secondary-foreground" />
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {shown.length ? (
                shown.map((f) => <FlightCard key={f.id} flight={f} />)
              ) : (
                <Card className="p-10 text-center">
                  <p className="text-[16px] font-semibold">
                    No flights match your filters
                  </p>
                  <Button variant="link" className="mt-2" onClick={clearAll}>
                    Clear All
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

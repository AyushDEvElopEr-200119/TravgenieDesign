import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Info,
  MapPin,
  User,
  X,
} from "lucide-react";
import hotelRoom from "@/assets/hotel-room.jpg";
import { SearchShell } from "@/components/layout/SearchShell";
import { Button, Checkbox, PillTabs } from "@/components/ui/primitives";

export const Route = createFileRoute("/hotels/")({
  head: () => ({
    meta: [
      { title: "Hotel Search | TravGenie Corporate Travel" },
      {
        name: "description",
        content:
          "Find company-preferred hotels with negotiated corporate rates, free cancellation and in-policy stays worldwide.",
      },
      { property: "og:title", content: "Hotel Search | TravGenie" },
      {
        property: "og:description",
        content: "Better stays, higher productivity for every business trip.",
      },
    ],
  }),
  component: HotelSearchPage,
});

function Cell({
  label,
  icon,
  value,
  trailing,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  trailing?: React.ReactNode;
}) {
  return (
    <button className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-5 py-4 text-left transition-colors hover:bg-gold-50/60">
      <span className="text-[14px] text-secondary-foreground">{label}</span>
      <span className="flex items-center gap-2.5">
        <span className="text-gold-600">{icon}</span>
        <span className="truncate text-[16px] font-semibold">{value}</span>
        {trailing}
      </span>
    </button>
  );
}

function HotelSearchPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("city");
  const [business, setBusiness] = useState(false);
  const [preferred, setPreferred] = useState(true);
  const [inPolicy, setInPolicy] = useState(true);

  return (
    <SearchShell
      tab="hotel"
      user={{ initials: "AZ", name: "Azim" }}
      image={hotelRoom}
      kicker="Business Travel"
      headline="Made Simple"
      tagline="Better Stays. Higher Productivity."
      benefits={[
        { icon: "policy", title: "Policy Compliant Stays", sub: "Stay within company policy" },
        { icon: "fare", title: "Exclusive Corporate Rates", sub: "Negotiated hotel rates" },
        { icon: "flex", title: "Flexible Booking Options", sub: "Free cancellation where available" },
        { icon: "support", title: "24/7 Travel Support", sub: "We're here for you" },
      ]}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PillTabs
          style="outline"
          value={mode}
          onChange={setMode}
          options={[
            { value: "city", label: "City Search" },
            { value: "near", label: "Near Me" },
            { value: "multi", label: "Multiple Cities" },
          ]}
        />
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 text-[15px] text-secondary-foreground hover:text-foreground">
            Travel Policy <Info className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="flex flex-1 flex-col divide-y divide-border rounded-lg border border-border lg:flex-row lg:divide-x lg:divide-y-0">
          <Cell
            label="Destination"
            icon={<MapPin className="size-[18px]" />}
            value="Dubai, United Arab Emirates"
            trailing={
              <X className="size-4 shrink-0 text-muted-foreground hover:text-foreground" />
            }
          />
          <Cell
            label="Check-in"
            icon={<CalendarDays className="size-[18px]" />}
            value="Tue, 12 Nov 2026"
          />
          <Cell
            label="Check-out"
            icon={<CalendarDays className="size-[18px]" />}
            value="Fri, 15 Nov 2026"
          />
          <Cell
            label="Rooms & Guests"
            icon={<User className="size-[18px]" />}
            value="1 Room, 1 Guest"
            trailing={<ChevronDown className="size-4 text-secondary-foreground" />}
          />
        </div>
        <Button
          size="lg"
          className="h-[56px] w-full shrink-0 lg:w-[220px]"
          icon={<ArrowRight className="size-5" />}
          onClick={() => navigate({ to: "/hotels/results" })}
        >
          Search Hotels
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-8">
          <Checkbox checked={business} onChange={setBusiness} label="Business trip" />
          <Checkbox
            checked={preferred}
            onChange={setPreferred}
            label="Company preferred hotels"
          />
          <Checkbox
            checked={inPolicy}
            onChange={setInPolicy}
            label="Show hotels within policy"
          />
        </div>
        <button className="flex items-center gap-1.5 text-[15px] font-medium text-link hover:underline">
          Advanced Search <ChevronDown className="size-4" />
        </button>
      </div>
    </SearchShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  Dumbbell,
  Heart,
  MapPin,
  Presentation,
  ShipWheel,
  User,
  Utensils,
  Wifi,
} from "lucide-react";
import { TopNav } from "@/components/layout/TopNav";
import {
  Button,
  Card,
  Checkbox,
  Chip,
  PolicyBadge,
  RangeSlider,
  Stars,
  UnderlineTabs,
} from "@/components/ui/primitives";
import {
  amenityFilters,
  hotelPolicyFilters,
  hotels,
  starFilters,
} from "@/data/travel";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hotels/results")({
  head: () => ({
    meta: [
      { title: "Dubai Hotels | TravGenie Corporate Travel" },
      {
        name: "description",
        content:
          "Company-preferred Dubai hotels for 12–15 Nov 2026 with nightly corporate rates, policy badges and amenities.",
      },
      { property: "og:title", content: "Dubai Hotels | TravGenie" },
      {
        property: "og:description",
        content: "In-policy Dubai stays from USD 75 per night.",
      },
    ],
  }),
  component: HotelResultsPage,
});

const amenityIcons: Record<string, typeof Wifi> = {
  "Free Wi-Fi": Wifi,
  "Breakfast Included": Utensils,
  "Airport Shuttle": ShipWheel,
  "Meeting Facilities": Presentation,
  Gym: Dumbbell,
};

function FilterSection({
  title,
  suffix,
  children,
}: {
  title: string;
  suffix?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-divider pt-4 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-[15px] font-bold">
        {title}
        {suffix ? (
          <span className="font-normal text-secondary-foreground"> {suffix}</span>
        ) : null}
      </h3>
      {children}
    </div>
  );
}

function HotelCard({ hotel }: { hotel: (typeof hotels)[number] }) {
  const [fav, setFav] = useState(false);
  return (
    <Card className="flex flex-col gap-4 p-2 sm:flex-row">
      <div className="relative shrink-0">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="h-[134px] w-full rounded-lg object-cover sm:w-[245px]"
        />
        <span className="absolute top-2.5 left-2.5">
          <PolicyBadge kind={hotel.policy} />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-2 py-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[18px] font-bold">{hotel.name}</h3>
          <button
            onClick={() => setFav((f) => !f)}
            aria-label={fav ? "Remove from favourites" : "Add to favourites"}
            className="shrink-0"
          >
            <Heart
              className={cn(
                "size-5 transition-colors",
                fav ? "fill-destructive text-destructive" : "text-foreground",
              )}
            />
          </button>
        </div>
        <Stars count={hotel.stars} />
        <p className="flex items-center gap-1.5 text-[14px] text-secondary-foreground">
          <MapPin className="size-4" />
          {hotel.area} · {hotel.distance}
        </p>
        <div className="flex flex-wrap gap-2">
          {hotel.amenities.map((a) => (
            <Chip key={a}>{a}</Chip>
          ))}
        </div>
      </div>

      <span className="hidden w-px bg-divider sm:block" />

      <div className="flex shrink-0 items-center justify-between gap-4 px-3 py-1 sm:w-[190px] sm:flex-col sm:items-end sm:justify-center">
        <div className="text-right">
          <p className="text-[26px] leading-none font-bold">USD {hotel.price}</p>
          <p className="text-[13px] text-muted-foreground">per night</p>
        </div>
        <Link to="/hotels/book">
          <Button className="w-[140px]">Select Room</Button>
        </Link>
      </div>
    </Card>
  );
}

function HotelResultsPage() {
  const [policies, setPolicies] = useState<string[]>(["Within Policy"]);
  const [stars, setStars] = useState<number[]>([5]);
  const [price, setPrice] = useState<[number, number]>([0, 500]);
  const [tab, setTab] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <TopNav active="hotel" user={{ initials: "AZ", name: "Azim" }} />

      <div className="mx-auto max-w-[1340px] px-4 py-5">
        <Card className="flex flex-wrap items-center gap-6 px-6 py-4">
          <span className="flex items-center gap-3">
            <MapPin className="size-6 text-foreground" />
            <span>
              <span className="block text-[18px] font-bold">
                Dubai, United Arab Emirates
              </span>
              <span className="block text-[13px] text-muted-foreground">
                Hotel Search
              </span>
            </span>
          </span>
          <span className="hidden h-9 w-px bg-divider sm:block" />
          <span className="flex items-center gap-2.5 text-[15px]">
            <CalendarDays className="size-5" /> Tue, 12 Nov 2026
          </span>
          <span className="flex items-center gap-2.5 text-[15px]">
            <CalendarDays className="size-5" /> Fri, 15 Nov 2026
          </span>
          <span className="flex items-center gap-2.5 text-[15px]">
            <User className="size-5" /> 1 Room, 1 Guest
          </span>
          <Link to="/hotels" className="ml-auto">
            <Button variant="outline">Modify Search</Button>
          </Link>
        </Card>

        <div className="mt-5 flex flex-col gap-5 lg:flex-row">
          <Card className="h-fit shrink-0 space-y-4 p-5 lg:sticky lg:top-4 lg:w-[250px]">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-bold">Filter Results</h2>
              <button
                onClick={() => {
                  setPolicies([]);
                  setStars([]);
                  setPrice([0, 500]);
                }}
                className="text-[14px] font-medium text-link hover:underline"
              >
                Clear All
              </button>
            </div>

            <FilterSection title="Company Policy">
              <ul className="space-y-3">
                {hotelPolicyFilters.map((p) => (
                  <li key={p.name} className="flex items-center justify-between gap-2">
                    <Checkbox
                      checked={policies.includes(p.name)}
                      onChange={() =>
                        setPolicies(
                          policies.includes(p.name)
                            ? policies.filter((n) => n !== p.name)
                            : [...policies, p.name],
                        )
                      }
                      label={p.name}
                    />
                    <span className="text-[13px] text-muted-foreground">
                      {p.count}
                    </span>
                  </li>
                ))}
              </ul>
            </FilterSection>

            <FilterSection title="Price Range" suffix="(USD per night)">
              <p className="text-[14px] text-secondary-foreground">
                USD {price[0]} – USD {price[1]}
              </p>
              <RangeSlider
                label="Price per night"
                min={0}
                max={500}
                value={price}
                onChange={setPrice}
              />
            </FilterSection>

            <FilterSection title="Star Rating">
              <ul className="space-y-3">
                {starFilters.map((s) => (
                  <li key={s.stars} className="flex items-center justify-between gap-2">
                    <Checkbox
                      checked={stars.includes(s.stars)}
                      onChange={() =>
                        setStars(
                          stars.includes(s.stars)
                            ? stars.filter((n) => n !== s.stars)
                            : [...stars, s.stars],
                        )
                      }
                      label={<Stars count={s.stars} />}
                    />
                    <span className="text-[13px] text-muted-foreground">
                      {s.count}
                    </span>
                  </li>
                ))}
              </ul>
            </FilterSection>

            <FilterSection title="Amenities">
              <ul className="space-y-3">
                {amenityFilters.map((a) => {
                  const Icon = amenityIcons[a.name] ?? Building2;
                  return (
                    <li
                      key={a.name}
                      className="flex items-center justify-between gap-2 text-[14px] text-secondary-foreground"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="size-[18px]" />
                        {a.name}
                      </span>
                      <span className="text-[13px] text-muted-foreground">
                        {a.count}
                      </span>
                    </li>
                  );
                })}
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
                    { value: "all", label: "All Hotels (312)" },
                    { value: "preferred", label: "Company Preferred (48)" },
                    { value: "near", label: "Near Me (52)" },
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
                    <option>Star rating</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-secondary-foreground" />
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {hotels.map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

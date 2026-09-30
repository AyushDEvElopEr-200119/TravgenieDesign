import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  ArrowUp,
  Bell,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Coins,
  FileText,
  Hourglass,
  Plane,
  Search,
  ShieldCheck,
  Tag,
} from "lucide-react";
import hotelRoom from "@/assets/hotel-room.jpg";
import dubaiSkyline from "@/assets/dubai-skyline.jpg";
import { GenieMark, Logo } from "@/components/brand/Logo";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, PillTabs } from "@/components/ui/primitives";
import {
  bookingTrend,
  calendarEvents,
  importantUpdates,
  kpis,
  policyCompliance,
  recentBookings,
  spendBreakdown,
  spendTrend,
  topDestinations,
  upcomingTrips,
} from "@/data/travel";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  validateSearch: (search: Record<string, unknown>) => ({
    variant: (search.variant === "B" ? "B" : "A") as "A" | "B",
  }),
  head: () => ({
    meta: [
      { title: "Travel Dashboard | TravGenie" },
      {
        name: "description",
        content:
          "Corporate travel dashboard: flight and hotel bookings, spend trends, policy compliance, approvals and upcoming trips.",
      },
      { property: "og:title", content: "Travel Dashboard | TravGenie" },
      {
        property: "og:description",
        content:
          "See bookings, spend, policy compliance and upcoming business trips at a glance.",
      },
    ],
  }),
  component: DashboardPage,
});

const kpiIcons = { plane: Plane, building: Building2, coins: Coins, hourglass: Hourglass };
const updateIcons = { tag: Tag, doc: FileText, building: Building2 };

function SectionCard({
  title,
  extra,
  children,
  className,
  suffix,
}: {
  title: string;
  suffix?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[17px] font-semibold">
          {title}
          {suffix ? (
            <span className="font-normal text-secondary-foreground"> {suffix}</span>
          ) : null}
        </h2>
        {extra}
      </div>
      {children}
    </Card>
  );
}

function ViewAll({ label = "View All" }: { label?: string }) {
  return (
    <button className="flex items-center gap-1.5 text-[14px] font-medium text-gold-600 transition-transform hover:translate-x-0.5">
      {label}
      <ArrowRight className="size-4" />
    </button>
  );
}

function Sparkline({
  data,
  chart,
  tone,
}: {
  data: number[];
  chart: "area" | "bar";
  tone: "gold" | "blue" | "grey" | "red";
}) {
  const colors = {
    gold: "#C8902F",
    blue: "#1E88E5",
    grey: "#B9C2D0",
    red: "#F0938C",
  } as const;
  const rows = data.map((v, i) => ({ i, v }));
  return (
    <div className="h-10 w-[120px]">
      <ResponsiveContainer width="100%" height="100%">
        {chart === "area" ? (
          <AreaChart data={rows} margin={{ top: 2, bottom: 0, left: 0, right: 0 }}>
            <defs>
              <linearGradient id={`spark-${tone}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors[tone]} stopOpacity={0.35} />
                <stop offset="100%" stopColor={colors[tone]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="linear"
              dataKey="v"
              stroke={colors[tone]}
              strokeWidth={2}
              fill={`url(#spark-${tone})`}
              isAnimationActive
            />
          </AreaChart>
        ) : (
          <BarChart data={rows} margin={{ top: 2, bottom: 0, left: 0, right: 0 }}>
            <Bar dataKey="v" fill={colors[tone]} radius={[2, 2, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function KpiRow({ variant }: { variant: "A" | "B" }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpiIcons[kpi.icon];
        return (
          <Card key={kpi.label} className="relative p-4">
            <button
              aria-label={`Open ${kpi.label}`}
              className="absolute top-4 right-4 flex size-[26px] items-center justify-center rounded-full border border-border text-secondary-foreground transition-colors hover:border-gold-500 hover:text-gold-700"
            >
              <ChevronRight className="size-3.5" />
            </button>
            <div className="flex items-center gap-3">
              <span className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                <Icon className="size-6" />
              </span>
              <span>
                {variant === "B" ? (
                  <>
                    <span className="block text-[13px] text-secondary-foreground">
                      {kpi.label}
                    </span>
                    <span className="block text-[26px] leading-tight font-bold">
                      {kpi.value}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block text-[26px] leading-tight font-bold">
                      {kpi.value}
                    </span>
                    <span className="block text-[14px] text-secondary-foreground">
                      {kpi.label}
                    </span>
                  </>
                )}
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span>
                <span
                  className={cn(
                    "flex items-center gap-1 text-[15px] font-semibold",
                    kpi.up ? "text-success" : "text-destructive",
                  )}
                >
                  <ArrowUp className="size-4" />
                  {kpi.trend}
                </span>
                <span className="text-xs text-muted-foreground">vs. last month</span>
              </span>
              <Sparkline data={kpi.spark} chart={kpi.chart} tone={kpi.tone} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function TrendCard({ variant }: { variant: "A" | "B" }) {
  const [series, setSeries] = useState<"flights" | "hotels">("flights");
  const data = variant === "A" ? spendTrend : bookingTrend;
  const usd = variant === "A";
  return (
    <SectionCard
      title={usd ? "Travel Spend Trend" : "Booking Trends"}
      className="xl:col-span-3"
      extra={
        <div className="flex items-center gap-3">
          <PillTabs
            value={series}
            onChange={setSeries}
            options={[
              { value: "flights", label: "Flights" },
              { value: "hotels", label: "Hotels" },
            ]}
          />
          <span className="relative">
            <select
              aria-label="Period"
              className="h-10 appearance-none rounded-md border border-border bg-card pr-9 pl-4 text-[14px] outline-none"
            >
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-secondary-foreground" />
          </span>
        </div>
      }
    >
      <div className="mb-1 flex justify-end gap-5 text-[13px]">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4 rounded bg-chart-gold" /> Flights
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4 rounded bg-chart-blue" /> Hotels
        </span>
      </div>
      <div className="h-[215px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fill-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8902F" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#C8902F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fill-blue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E88E5" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#1E88E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#EEE9E0" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8A93A6", fontSize: 13 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={usd ? 64 : 34}
              tick={{ fill: "#8A93A6", fontSize: 12 }}
              domain={usd ? [0, 30000] : [0, 40]}
              ticks={usd ? [0, 10000, 20000, 30000] : [0, 10, 20, 30, 40]}
              tickFormatter={(v: number) =>
                usd ? (v === 0 ? "0" : `USD ${v / 1000}K`) : String(v)
              }
            />
            <Area
              type="linear"
              dataKey="flights"
              stroke="#C8902F"
              strokeWidth={2.5}
              fill="url(#fill-gold)"
              dot={{ r: 4, fill: "#C8902F", strokeWidth: 0 }}
              opacity={series === "hotels" ? 0.25 : 1}
            />
            <Area
              type="linear"
              dataKey="hotels"
              stroke="#1E88E5"
              strokeWidth={2.5}
              fill="url(#fill-blue)"
              dot={{ r: 4, fill: "#1E88E5", strokeWidth: 0 }}
              opacity={series === "flights" ? 0.55 : 1}
            />
            <Line type="linear" dataKey="__none" stroke="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}

function BreakdownCard({ variant }: { variant: "A" | "B" }) {
  const [tab, setTab] = useState("product");
  return (
    <SectionCard
      title={variant === "A" ? "Spend Breakdown" : "Spend Analysis"}
      suffix="(USD)"
      className="xl:col-span-2"
    >
      {variant === "A" ? (
        <PillTabs
          className="mb-4"
          style="outline"
          value={tab}
          onChange={setTab}
          options={[
            { value: "product", label: "By Product" },
            { value: "department", label: "By Department" },
            { value: "policy", label: "By Policy" },
          ]}
        />
      ) : null}
      <div className="flex items-center gap-6">
        <div className="relative size-[190px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendBreakdown}
                dataKey="value"
                innerRadius={58}
                outerRadius={93}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {spendBreakdown.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[13px] text-secondary-foreground">USD</span>
            <span className="text-[22px] font-bold">18,420</span>
            <span className="text-[12px] text-muted-foreground">Total Spend</span>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          {spendBreakdown.map((d, i) => (
            <div key={d.name}>
              <div className="flex items-center gap-2.5">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: d.color }}
                />
                <span className="text-[15px] font-medium">{d.name}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between pl-5">
                <span className="text-[19px] font-bold">
                  {variant === "B" ? `USD ${d.value.toLocaleString()}` : d.value.toLocaleString()}
                </span>
                <span className="text-[15px] font-semibold text-secondary-foreground">
                  {d.pct}
                </span>
              </div>
              {i === 0 ? <div className="mt-4 h-px bg-divider" /> : null}
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function BookingsCard() {
  const [tab, setTab] = useState("all");
  const rows = recentBookings.filter((b) =>
    tab === "all" ? true : tab === "flights" ? b.type === "Flight" : b.type === "Hotel",
  );
  const statusColor = {
    Confirmed: "bg-success text-success",
    "Pending Approval": "bg-warning text-warning",
    "On Hold": "bg-hold text-hold",
  } as const;

  return (
    <Card className="p-5 xl:col-span-3">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-[17px] font-semibold">Recent Bookings</h2>
          <PillTabs
            style="outline"
            value={tab}
            onChange={setTab}
            options={[
              { value: "all", label: "All" },
              { value: "flights", label: "Flights" },
              { value: "hotels", label: "Hotels" },
            ]}
          />
        </div>
        <ViewAll />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-[14px]">
          <thead>
            <tr className="text-left text-[12px] font-medium text-muted-foreground">
              {[
                "Booking ID",
                "Type",
                "Traveller(s)",
                "Route / Hotel",
                "Travel Date",
                "Amount (USD)",
                "Status",
                "",
              ].map((h) => (
                <th key={h} className="pb-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr
                key={b.id}
                className="group border-t border-divider row-hover cursor-pointer"
              >
                <td className="h-10 whitespace-nowrap">{b.id}</td>
                <td className="whitespace-nowrap">
                  <span className="flex items-center gap-2">
                    {b.type === "Flight" ? (
                      <Plane className="size-4" />
                    ) : (
                      <Building2 className="size-4" />
                    )}
                    {b.type}
                  </span>
                </td>
                <td className="whitespace-nowrap">{b.traveller}</td>
                <td className="whitespace-nowrap">{b.route}</td>
                <td className="whitespace-nowrap text-secondary-foreground">
                  {b.date}
                </td>
                <td className="font-bold whitespace-nowrap">{b.amount}</td>
                <td className="whitespace-nowrap">
                  <span className="flex items-center gap-2">
                    <span
                      className={cn("size-2 rounded-full", statusColor[b.status])}
                    />
                    <span className={cn("bg-transparent", statusColor[b.status])}>
                      {b.status}
                    </span>
                  </span>
                </td>
                <td className="text-right">
                  <ChevronRight className="inline size-4 text-secondary-foreground transition-transform group-hover:translate-x-0.5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function PolicyComplianceCard() {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold">Policy Compliance</h2>
        <button className="flex items-center gap-1.5 text-[13px] font-medium text-gold-600">
          View Details <ArrowRight className="size-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative size-[120px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={policyCompliance}
                dataKey="value"
                innerRadius={44}
                outerRadius={58}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {policyCompliance.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[20px] font-bold">92%</span>
            <span className="text-[10px] text-muted-foreground">Within Policy</span>
          </div>
        </div>
        <ul className="flex-1 space-y-2.5 text-[14px]">
          {policyCompliance.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: d.color }}
                />
                {d.name}
              </span>
              <span className="font-semibold">{d.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function TopDestinationsCard() {
  const max = Math.max(...topDestinations.map((d) => d.count));
  return (
    <SectionCard
      title="Top Destinations"
      suffix="(This Year)"
      extra={<ViewAll />}
    >
      <ul className="space-y-3">
        {topDestinations.map((d) => (
          <li key={d.city} className="flex items-center gap-3">
            <img
              src={d.image}
              alt=""
              loading="lazy"
              className="size-[26px] rounded-sm object-cover"
            />
            <span className="w-[112px] shrink-0 text-[13px]">{d.city}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-gradient-gold"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </span>
            <span className="w-6 text-right text-[13px] font-semibold">
              {d.count}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

function CalendarCard({ variant }: { variant: "A" | "B" }) {
  // November 2026 starts on a Sunday.
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <SectionCard
      title="My Travel Calendar"
      extra={variant === "B" ? <ViewAll /> : undefined}
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          aria-label="Previous month"
          className="text-secondary-foreground hover:text-gold-700"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-[15px] font-semibold">November 2026</span>
        <button
          aria-label="Next month"
          className="text-secondary-foreground hover:text-gold-700"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-[12px] text-muted-foreground">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <span key={d} className="py-1.5">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-[13px]">
        {days.map((day) => {
          const today = day === 12;
          const dot = calendarEvents[day];
          return (
            <span key={day} className="relative py-1.5">
              <span
                className={cn(
                  "mx-auto flex size-7 items-center justify-center rounded-full",
                  today && "bg-gold-600 font-semibold text-white",
                )}
              >
                {day}
              </span>
              {dot ? (
                <span
                  className={cn(
                    "absolute bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full",
                    dot === "gold" ? "bg-gold-500" : "bg-chart-blue",
                  )}
                />
              ) : null}
            </span>
          );
        })}
      </div>
    </SectionCard>
  );
}

function UpcomingTripsCard({ variant }: { variant: "A" | "B" }) {
  return (
    <SectionCard title="Upcoming Trips" extra={<ViewAll />}>
      <ul className="space-y-1">
        {upcomingTrips.map((trip) => (
          <li key={trip.title}>
            <button className="flex w-full items-center gap-3 rounded-md px-1 py-2.5 text-left transition-colors hover:bg-gold-50">
              {variant === "B" ? (
                <span className="w-[74px] shrink-0 text-[12px] text-secondary-foreground">
                  {trip.date}
                </span>
              ) : null}
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                {trip.kind === "flight" ? (
                  <Plane className="size-5" />
                ) : (
                  <Building2 className="size-5" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-semibold">
                  {trip.title}
                </span>
                {variant === "A" ? (
                  <>
                    <span className="block text-[12px] text-secondary-foreground">
                      {trip.range}
                    </span>
                    <span className="block text-[12px] text-muted-foreground">
                      {trip.sub}
                    </span>
                  </>
                ) : (
                  <span className="block text-[12px] text-muted-foreground">
                    {trip.sub}
                  </span>
                )}
              </span>
              <ChevronRight className="size-4 shrink-0 text-secondary-foreground" />
            </button>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

function UpdatesCard() {
  return (
    <SectionCard title="Important Updates" extra={<ViewAll />}>
      <ul className="space-y-4">
        {importantUpdates.map((u) => {
          const Icon = updateIcons[u.icon];
          const tone =
            u.icon === "doc"
              ? "bg-[#EAF2FD] text-chart-blue"
              : "bg-warning-bg text-warning";
          return (
            <li key={u.title} className="flex gap-3">
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full",
                  tone,
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-2">
                  <span className="text-[13px] font-semibold">{u.title}</span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {u.date}
                  </span>
                </span>
                <span className="mt-0.5 block text-[12px] text-secondary-foreground">
                  {u.body}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}

function HeroA() {
  return (
    <div className="relative h-[188px] overflow-hidden rounded-2xl">
      <img src={hotelRoom} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent" />
      <div className="relative flex h-full items-center justify-between gap-6 px-7">
        <div>
          <p className="text-[16px] text-navy">Good Evening,</p>
          <p className="text-[36px] leading-tight font-bold text-navy">Azim</p>
          <p className="text-[17px] font-bold text-navy">Let's plan your next trip</p>
          <p className="text-[13px] text-navy/80">
            Exclusive corporate fares. Greater control.
          </p>
        </div>
        <div className="hidden shrink-0 flex-col gap-3 md:flex">
          {[
            { to: "/flights", icon: Plane, title: "Book a Flight", sub: "Domestic & International" },
            { to: "/hotels", icon: Building2, title: "Book a Hotel", sub: "Worldwide stays" },
          ].map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="flex h-[62px] w-[290px] items-center gap-3 rounded-xl bg-[#FDF8EF]/85 px-3 backdrop-blur-sm transition-transform hover:-translate-y-px"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                <c.icon className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block text-[15px] font-semibold">{c.title}</span>
                <span className="block text-[12px] text-secondary-foreground">
                  {c.sub}
                </span>
              </span>
              <span className="flex size-7 items-center justify-center rounded-full bg-white text-gold-700">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroB() {
  return (
    <div className="relative h-[188px] overflow-hidden rounded-2xl">
      <img
        src={dubaiSkyline}
        alt=""
        className="absolute inset-0 size-full object-cover object-[center_65%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/88 via-white/45 to-transparent" />
      <GenieMark
        gradientId="hero-b-genie"
        className="absolute top-1/2 right-[14%] h-[150px] -translate-y-1/2 opacity-90"
      />
      <div className="relative flex h-full items-center justify-between gap-6 px-7">
        <div>
          <p className="text-[16px] text-navy">Good Evening,</p>
          <p className="text-[34px] leading-tight font-bold text-navy">Azim</p>
          <span className="mb-2 block h-[3px] w-10 bg-gold-500" />
          <p className="text-[18px] font-bold text-navy">Smarter Business Travel</p>
          <p className="text-[13px] text-navy/80">
            Better Choices. Greater Control.
          </p>
        </div>
        <div className="hidden shrink-0 flex-col gap-3 md:flex">
          {[
            { title: "Corporate Fares", sub: "Exclusive rates for your organisation" },
            { title: "Preferred Hotels", sub: "Negotiated rates worldwide" },
          ].map((c) => (
            <div
              key={c.title}
              className="flex h-[62px] w-[290px] items-center gap-3 rounded-xl bg-[#FDF8EF]/85 px-4 backdrop-blur-sm"
            >
              <span className="flex-1">
                <span className="block text-[15px] font-semibold">{c.title}</span>
                <span className="block text-[12px] text-secondary-foreground">
                  {c.sub}
                </span>
              </span>
              <ArrowRight className="size-4 text-gold-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-gold p-5">
      <GenieMark
        gradientId="support-genie"
        className="absolute -right-4 top-1/2 h-[130px] -translate-y-1/2 opacity-20"
      />
      <p className="relative max-w-[200px] text-[16px] leading-snug font-semibold text-white">
        Dedicated Support for Your Business Travel
      </p>
      <button className="relative mt-4 inline-flex h-10 items-center gap-2 rounded-md bg-[#5A3B0B] px-4 text-[14px] font-semibold text-white transition-transform hover:-translate-y-px">
        Contact Support <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

function DashboardPage() {
  const { variant } = Route.useSearch();

  return (
    <div className="flex min-h-screen gap-3.5 bg-background p-3">
      <Sidebar variant={variant} />

      <div className="flex min-w-0 flex-1 flex-col gap-4 xl:flex-row">
        <main className="flex min-w-0 flex-1 flex-col gap-4">
          {/* top bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="lg:hidden">
                <Logo width={130} />
              </Link>
              <div className="flex h-12 w-full items-center gap-3 rounded-md bg-card px-4 shadow-card sm:w-[520px]">
                <Search className="size-[18px] text-secondary-foreground" />
                <input
                  aria-label="Search flights or hotels"
                  placeholder="Search flights or hotels by city, airport or hotel name..."
                  className="h-full w-full bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="hidden items-center gap-2 text-[14px] sm:flex">
                <ShieldCheck className="size-[18px]" /> Corporate Policy
              </button>
              <button className="hidden items-center gap-2 text-[14px] sm:flex">
                <CircleHelp className="size-[18px]" /> Help
              </button>
              <button className="relative" aria-label="Notifications">
                <Bell className="size-5" />
                <span className="absolute -top-2 -right-2 flex size-[18px] items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                  3
                </span>
              </button>
              <button className="flex items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-full bg-gold-600 text-[15px] font-semibold text-white">
                  AZ
                </span>
                <span className="text-[15px] font-semibold">Azim</span>
                <ChevronDown className="size-4 text-secondary-foreground" />
              </button>
            </div>
          </div>

          {variant === "A" ? <HeroA /> : <HeroB />}

          <KpiRow variant={variant} />

          <div className="grid gap-4 xl:grid-cols-5">
            <TrendCard variant={variant} />
            <BreakdownCard variant={variant} />
          </div>

          <div className="grid gap-4 xl:grid-cols-5">
            <BookingsCard />
            <div className="flex flex-col gap-4 xl:col-span-2">
              <PolicyComplianceCard />
              <TopDestinationsCard />
            </div>
          </div>
        </main>

        <div className="flex w-full shrink-0 flex-col gap-4 xl:w-[265px]">
          <CalendarCard variant={variant} />
          <UpcomingTripsCard variant={variant} />
          {variant === "A" ? <UpdatesCard /> : <SupportBanner />}
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
import { Logo } from "@/components/brand/Logo";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/primitives";
import {
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
        content: "See bookings, spend, policy compliance and upcoming business trips at a glance.",
      },
    ],
  }),
  component: DashboardPage,
});

const kpiIcons = { plane: Plane, building: Building2, coins: Coins, hourglass: Hourglass };
const updateIcons = { tag: Tag, doc: FileText, building: Building2 };

function ViewAllLink({ label = "View All" }: { label?: string }) {
  return (
    <button className="flex items-center gap-1 text-[11px] 2xl:text-[11.5px] font-semibold text-gold-600 transition-transform hover:translate-x-0.5">
      {label}
      <ArrowRight className="size-2.5 2xl:size-3" />
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
    <div className="h-6 2xl:h-7 w-[78px] 2xl:w-[92px] shrink-0">
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
              strokeWidth={1.8}
              fill={`url(#spark-${tone})`}
              isAnimationActive={false}
            />
          </AreaChart>
        ) : (
          <BarChart data={rows} margin={{ top: 2, bottom: 0, left: 0, right: 0 }}>
            <Bar dataKey="v" fill={colors[tone]} radius={[2, 2, 0, 0]} isAnimationActive={false} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function KpiRow() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpiIcons[kpi.icon];
        return (
          <Card key={kpi.label} className="relative p-2.5 2xl:p-3">
            <button
              aria-label={`Open ${kpi.label}`}
              className="absolute top-2.5 right-2.5 flex size-4.5 items-center justify-center rounded-full border border-border/60 text-secondary-foreground transition-colors hover:border-gold-500 hover:text-gold-700"
            >
              <ChevronRight className="size-2.5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-[#FDF3E3] text-[#B8842F]">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <span className="block text-[18px] 2xl:text-[21px] leading-tight font-bold text-foreground truncate">
                  {kpi.value}
                </span>
                <span className="block text-[10.5px] 2xl:text-[11px] font-medium text-secondary-foreground truncate">
                  {kpi.label}
                </span>
              </div>
            </div>
            <div className="mt-1.5 flex items-end justify-between">
              <div>
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-[11px] 2xl:text-[12px] font-semibold",
                    kpi.tone === "red" ? "text-destructive" : "text-[#1FA45B]",
                  )}
                >
                  <ArrowUp className="size-2.5 2xl:size-3" />
                  {kpi.trend}
                </span>
                <span className="text-[9.5px] 2xl:text-[10px] text-muted-foreground">vs. last month</span>
              </div>
              <Sparkline data={kpi.spark} chart={kpi.chart} tone={kpi.tone} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function HeroBanner() {
  return (
    <div className="relative h-[125px] xl:h-[135px] 2xl:h-[146px] overflow-hidden rounded-xl border border-border/40 shadow-xs">
      <img src={hotelRoom} alt="" className="absolute inset-0 size-full object-cover object-[center_45%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/94 via-white/55 to-transparent" />
      <div className="relative flex h-full items-center justify-between gap-4 px-5">
        <div>
          <p className="text-[12px] 2xl:text-[13px] text-navy/80">Good Evening,</p>
          <p className="text-[24px] 2xl:text-[28px] leading-tight font-bold text-navy -mt-0.5">Azim</p>
          <p className="text-[13px] 2xl:text-[14.5px] font-bold text-navy mt-0.5">Let's plan your next trip</p>
          <p className="text-[10.5px] 2xl:text-[11.5px] text-navy/70 mt-0.5">
            Exclusive corporate fares. Greater control.
          </p>
        </div>
        <div className="hidden shrink-0 flex-col gap-1.5 md:flex">
          {[
            {
              to: "/flights",
              icon: Plane,
              title: "Book a Flight",
              sub: "Domestic & International",
            },
            {
              to: "/hotels",
              icon: Building2,
              title: "Book a Hotel",
              sub: "Worldwide stays",
            },
          ].map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="flex h-[38px] xl:h-[42px] 2xl:h-[46px] w-[205px] xl:w-[225px] 2xl:w-[240px] items-center gap-2 rounded-lg bg-white/85 backdrop-blur-md px-2.5 border border-white/70 shadow-xs transition-transform hover:-translate-y-px"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#FDF3E3] text-[#B8842F]">
                <c.icon className="size-3.5" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[11.5px] 2xl:text-[12.5px] font-bold text-navy leading-snug">{c.title}</span>
                <span className="block text-[9.5px] 2xl:text-[10.5px] text-secondary-foreground truncate">{c.sub}</span>
              </span>
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-[#B8842F] shadow-xs">
                <ArrowRight className="size-2.5 2xl:size-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrendCard() {
  const [series, setSeries] = useState<"flights" | "hotels">("flights");

  return (
    <Card className="p-2.5 2xl:p-3.5 md:col-span-3">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <h2 className="text-[13px] 2xl:text-[14.5px] font-bold text-foreground">Travel Spend Trend</h2>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md bg-muted p-0.5 text-[10.5px] 2xl:text-[11.5px]">
            <button
              onClick={() => setSeries("flights")}
              className={cn(
                "rounded px-2.5 py-0.5 font-semibold transition-colors",
                series === "flights" ? "bg-[#C9963B] text-white shadow-xs" : "text-secondary-foreground",
              )}
            >
              Flights
            </button>
            <button
              onClick={() => setSeries("hotels")}
              className={cn(
                "rounded px-2.5 py-0.5 font-semibold transition-colors",
                series === "hotels" ? "bg-[#C9963B] text-white shadow-xs" : "text-secondary-foreground",
              )}
            >
              Hotels
            </button>
          </div>
          <span className="relative">
            <select
              aria-label="Period"
              className="h-7 appearance-none rounded-md border border-border/60 bg-card pr-6 pl-2 text-[10.5px] 2xl:text-[11.5px] font-medium outline-none"
            >
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-3 -translate-y-1/2 text-secondary-foreground" />
          </span>
        </div>
      </div>

      <div className="mb-1 flex justify-end gap-3.5 text-[10.5px] 2xl:text-[11.5px] font-medium text-secondary-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-3.5 rounded bg-[#C8902F]" /> Flights
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-3.5 rounded bg-[#1E88E5]" /> Hotels
        </span>
      </div>

      <div className="h-[135px] xl:h-[145px] 2xl:h-[155px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spendTrend} margin={{ top: 6, right: 12, left: 16, bottom: 0 }}>
            <defs>
              <linearGradient id="fill-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8902F" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#C8902F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fill-blue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E88E5" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#1E88E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#EEE9E0" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8A93A6", fontSize: 10.5 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={62}
              tickMargin={6}
              tick={{ fill: "#8A93A6", fontSize: 10 }}
              domain={[0, 30000]}
              ticks={[0, 10000, 20000, 30000]}
              tickFormatter={(v: number) => (v === 0 ? "0" : `USD ${v / 1000}K`)}
            />
            <Area
              type="linear"
              dataKey="flights"
              stroke="#C8902F"
              strokeWidth={2}
              fill="url(#fill-gold)"
              dot={{ r: 2.5, fill: "#C8902F", strokeWidth: 0 }}
              isAnimationActive={false}
            />
            <Area
              type="linear"
              dataKey="hotels"
              stroke="#1E88E5"
              strokeWidth={2}
              fill="url(#fill-blue)"
              dot={{ r: 2.5, fill: "#1E88E5", strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function BreakdownCard() {
  const [tab, setTab] = useState("product");

  return (
    <Card className="p-2.5 2xl:p-3.5 md:col-span-2">
      <div className="mb-1.5 flex items-center justify-between gap-1.5">
        <h2 className="text-[13px] 2xl:text-[14.5px] font-bold text-foreground">
          Spend Breakdown <span className="font-normal text-secondary-foreground text-[11px] 2xl:text-[12px]">(USD)</span>
        </h2>
        <div className="inline-flex gap-0.5 rounded-md text-[9.5px] 2xl:text-[10.5px] font-medium">
          <button
            onClick={() => setTab("product")}
            className={cn(
              "rounded px-1.5 2xl:px-2 py-0.5 transition-colors",
              tab === "product"
                ? "border border-gold-500 bg-gold-50 font-semibold text-gold-700"
                : "text-secondary-foreground hover:bg-muted",
            )}
          >
            By Product
          </button>
          <button
            onClick={() => setTab("department")}
            className={cn(
              "rounded px-1.5 2xl:px-2 py-0.5 transition-colors",
              tab === "department"
                ? "border border-gold-500 bg-gold-50 font-semibold text-gold-700"
                : "text-secondary-foreground hover:bg-muted",
            )}
          >
            By Dept
          </button>
          <button
            onClick={() => setTab("policy")}
            className={cn(
              "rounded px-1.5 2xl:px-2 py-0.5 transition-colors",
              tab === "policy"
                ? "border border-gold-500 bg-gold-50 font-semibold text-gold-700"
                : "text-secondary-foreground hover:bg-muted",
            )}
          >
            By Policy
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <div className="relative size-[105px] xl:size-[114px] 2xl:size-[122px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendBreakdown}
                dataKey="value"
                innerRadius={36}
                outerRadius={52}
                startAngle={90}
                endAngle={-270}
                stroke="none"
                isAnimationActive={false}
              >
                {spendBreakdown.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[9px] text-muted-foreground font-medium">USD</span>
            <span className="text-[15px] 2xl:text-[16px] font-bold text-foreground leading-tight">18,420</span>
            <span className="text-[8.5px] text-muted-foreground">Total Spend</span>
          </div>
        </div>

        <div className="flex-1 space-y-1.5">
          {spendBreakdown.map((d, i) => (
            <div key={d.name}>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ background: d.color }} />
                <span className="text-[11.5px] 2xl:text-[12px] font-semibold text-foreground">{d.name}</span>
              </div>
              <div className="mt-0.5 flex items-baseline justify-between pl-3.5">
                <span className="text-[14px] 2xl:text-[15px] font-bold text-foreground">{d.value.toLocaleString()}</span>
                <span className="text-[11px] 2xl:text-[12px] font-semibold text-secondary-foreground">{d.pct}</span>
              </div>
              {i === 0 ? <div className="mt-1.5 h-px bg-divider" /> : null}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function BookingsCard() {
  const [tab, setTab] = useState<"all" | "flights" | "hotels">("all");
  const rows = recentBookings.filter((b) =>
    tab === "all" ? true : tab === "flights" ? b.type === "Flight" : b.type === "Hotel",
  );

  return (
    <Card className="p-2.5 2xl:p-3.5 md:col-span-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[13px] 2xl:text-[14.5px] font-bold text-foreground">Recent Bookings</h2>
          <div className="inline-flex gap-1 text-[10.5px] 2xl:text-[11px]">
            <button
              onClick={() => setTab("all")}
              className={cn(
                "rounded px-2 2xl:px-2.5 py-0.5 font-medium transition-colors",
                tab === "all"
                  ? "bg-[#FDF8EF] border border-[#C9963B] text-[#8A5A12] font-semibold"
                  : "bg-muted text-secondary-foreground",
              )}
            >
              All
            </button>
            <button
              onClick={() => setTab("flights")}
              className={cn(
                "rounded px-2 2xl:px-2.5 py-0.5 font-medium transition-colors",
                tab === "flights"
                  ? "bg-[#FDF8EF] border border-[#C9963B] text-[#8A5A12] font-semibold"
                  : "bg-muted text-secondary-foreground",
              )}
            >
              Flights
            </button>
            <button
              onClick={() => setTab("hotels")}
              className={cn(
                "rounded px-2 2xl:px-2.5 py-0.5 font-medium transition-colors",
                tab === "hotels"
                  ? "bg-[#FDF8EF] border border-[#C9963B] text-[#8A5A12] font-semibold"
                  : "bg-muted text-secondary-foreground",
              )}
            >
              Hotels
            </button>
          </div>
        </div>
        <ViewAllLink />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[580px] border-collapse text-[11px] 2xl:text-[12px]">
          <thead>
            <tr className="text-left text-[10px] 2xl:text-[10.5px] font-medium text-muted-foreground border-b border-divider">
              <th className="pb-1 font-medium">Booking ID</th>
              <th className="pb-1 font-medium">Type</th>
              <th className="pb-1 font-medium">Traveller(s)</th>
              <th className="pb-1 font-medium">Route / Hotel</th>
              <th className="pb-1 font-medium">Travel Date</th>
              <th className="pb-1 font-medium">Amount (USD)</th>
              <th className="pb-1 font-medium min-w-[115px]">Status</th>
              <th className="pb-1 font-medium text-right w-4"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="group border-b border-divider/40 hover:bg-[#FBF8F2] transition-colors cursor-pointer">
                <td className="py-1 2xl:py-1.5 whitespace-nowrap font-medium text-foreground">{b.id}</td>
                <td className="py-1 2xl:py-1.5 whitespace-nowrap">
                  <span className="flex items-center gap-1 text-secondary-foreground">
                    {b.type === "Flight" ? <Plane className="size-3" /> : <Building2 className="size-3" />}
                    {b.type}
                  </span>
                </td>
                <td className="py-1 2xl:py-1.5 whitespace-nowrap font-medium text-foreground">{b.traveller}</td>
                <td className="py-1 2xl:py-1.5 whitespace-nowrap text-secondary-foreground truncate max-w-[150px]">{b.route}</td>
                <td className="py-1 2xl:py-1.5 whitespace-nowrap text-secondary-foreground">{b.date}</td>
                <td className="py-1 2xl:py-1.5 whitespace-nowrap font-bold text-foreground">{b.amount}</td>
                <td className="py-1 2xl:py-1.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 min-w-[110px]">
                    <span
                      className={cn(
                        "size-1.5 rounded-full shrink-0",
                        b.status === "Confirmed" && "bg-[#1FA45B]",
                        b.status === "Pending Approval" && "bg-[#F08A24]",
                        b.status === "On Hold" && "bg-[#8C94A6]",
                      )}
                    />
                    <span
                      className={cn(
                        "font-medium whitespace-nowrap text-[11px] 2xl:text-[11.5px]",
                        b.status === "Confirmed" && "text-[#1FA45B]",
                        b.status === "Pending Approval" && "text-[#F08A24]",
                        b.status === "On Hold" && "text-[#8C94A6]",
                      )}
                    >
                      {b.status}
                    </span>
                  </span>
                </td>
                <td className="py-1 2xl:py-1.5 text-right w-4">
                  <ChevronRight className="inline size-3 text-secondary-foreground/60 transition-transform group-hover:translate-x-0.5" />
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
    <Card className="p-2.5 2xl:p-3">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-[12.5px] 2xl:text-[13.5px] font-bold text-foreground">Policy Compliance</h2>
        <ViewAllLink label="View Details" />
      </div>
      <div className="flex items-center gap-2.5">
        <div className="relative size-[64px] 2xl:size-[72px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={policyCompliance}
                dataKey="value"
                innerRadius={20}
                outerRadius={31}
                startAngle={90}
                endAngle={-270}
                stroke="none"
                isAnimationActive={false}
              >
                {policyCompliance.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[13px] 2xl:text-[14px] font-bold leading-none text-foreground">92%</span>
            <span className="text-[7px] 2xl:text-[7.5px] text-muted-foreground mt-0.5 leading-none">Within Policy</span>
          </div>
        </div>

        <ul className="flex-1 space-y-0.5 text-[10.5px] 2xl:text-[11px]">
          {policyCompliance.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-secondary-foreground">
                <span className="size-1.5 rounded-full" style={{ background: d.color }} />
                {d.name}
              </span>
              <span className="font-bold text-foreground">{d.value}</span>
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
    <Card className="p-2.5 2xl:p-3">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-[12.5px] 2xl:text-[13.5px] font-bold text-foreground">
          Top Destinations <span className="font-normal text-secondary-foreground text-[10.5px] 2xl:text-[11px]">(This Year)</span>
        </h2>
        <ViewAllLink />
      </div>
      <ul className="space-y-0.5">
        {topDestinations.map((d) => (
          <li key={d.city} className="flex items-center gap-1.5 py-0.5">
            <img
              src={d.image}
              alt=""
              loading="lazy"
              className="size-3.5 2xl:size-4 rounded-xs object-cover"
            />
            <span className="w-[82px] 2xl:w-[90px] shrink-0 text-[10.5px] 2xl:text-[11px] font-medium text-foreground truncate">{d.city}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-[#C9963B]"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </span>
            <span className="w-4 text-right text-[10.5px] 2xl:text-[11px] font-bold text-foreground">{d.count}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function CalendarCard() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <Card className="p-2.5 2xl:p-3">
      <h2 className="mb-1 text-[12.5px] 2xl:text-[13.5px] font-bold text-foreground">My Travel Calendar</h2>
      <div className="mb-1 flex items-center justify-between">
        <button aria-label="Previous month" className="text-secondary-foreground hover:text-gold-700">
          <ChevronLeft className="size-3.5" />
        </button>
        <span className="text-[11.5px] 2xl:text-[12px] font-semibold text-foreground">November 2026</span>
        <button aria-label="Next month" className="text-secondary-foreground hover:text-gold-700">
          <ChevronRight className="size-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-[10px] 2xl:text-[10.5px] font-medium text-muted-foreground mb-0.5">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <span key={d} className="py-0.5">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-[11px] 2xl:text-[11.5px]">
        {days.map((day) => {
          const today = day === 12;
          const dot = calendarEvents[day];
          return (
            <span key={day} className="relative py-0.5">
              <span
                className={cn(
                  "mx-auto flex size-5 2xl:size-5.5 items-center justify-center rounded-full text-[10px] 2xl:text-[10.5px]",
                  today && "bg-[#B8842F] font-bold text-white shadow-xs",
                )}
              >
                {day}
              </span>
              {dot ? (
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full",
                    dot === "gold" ? "bg-[#C9963B]" : "bg-[#1E88E5]",
                  )}
                />
              ) : null}
            </span>
          );
        })}
      </div>
    </Card>
  );
}

function UpcomingTripsCard() {
  return (
    <Card className="p-2.5 2xl:p-3">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-[12.5px] 2xl:text-[13.5px] font-bold text-foreground">Upcoming Trips</h2>
        <ViewAllLink />
      </div>
      <ul className="space-y-0.5">
        {upcomingTrips.map((trip) => (
          <li key={trip.title}>
            <button className="flex w-full items-center gap-2 rounded-lg p-1 text-left transition-colors hover:bg-gold-50/60">
              <span className="flex size-6.5 shrink-0 items-center justify-center rounded-full bg-[#FDF3E3] text-[#B8842F]">
                {trip.kind === "flight" ? <Plane className="size-3" /> : <Building2 className="size-3" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] 2xl:text-[11.5px] font-bold text-foreground leading-tight">{trip.title}</span>
                <span className="block text-[9.5px] 2xl:text-[10px] text-secondary-foreground leading-tight">{trip.range}</span>
                <span className="block text-[9.5px] 2xl:text-[10px] text-muted-foreground leading-tight truncate">{trip.sub}</span>
              </span>
              <ChevronRight className="size-3 shrink-0 text-secondary-foreground/60" />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function UpdatesCard() {
  return (
    <Card className="p-2.5 2xl:p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-[12.5px] 2xl:text-[13.5px] font-bold text-foreground">
          <Bell className="size-3.5 text-[#C9963B] fill-[#C9963B]" />
          Important Updates
        </h2>
        <ViewAllLink />
      </div>
      <ul className="space-y-1.5">
        {importantUpdates.map((u) => {
          const Icon = updateIcons[u.icon];
          const tone =
            u.icon === "doc"
              ? "bg-[#EAF2FD] text-[#1E88E5]"
              : "bg-[#FDF3E3] text-[#B8842F]";
          return (
            <li key={u.title} className="flex gap-2">
              <span className={cn("flex size-6.5 shrink-0 items-center justify-center rounded-full", tone)}>
                <Icon className="size-3" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-1">
                  <span className="text-[11px] 2xl:text-[11.5px] font-bold text-foreground leading-tight">{u.title}</span>
                  <span className="shrink-0 text-[9px] 2xl:text-[9.5px] text-muted-foreground">{u.date}</span>
                </span>
                <span className="mt-0.5 block text-[10px] 2xl:text-[10.5px] leading-tight text-secondary-foreground">{u.body}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function DashboardPage() {
  return (
    <div className="flex w-full min-h-screen bg-background box-border">
      <Sidebar />

      <div className="flex flex-1 min-w-0 flex-col lg:flex-row gap-2.5 p-2.5 xl:gap-3 xl:p-3">
        <main className="flex flex-1 min-w-0 flex-col gap-2.5 xl:gap-3">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 flex-1 max-w-[480px]">
              <Link to="/dashboard" className="lg:hidden">
                <Logo width={110} />
              </Link>
              <div className="flex h-8.5 w-full items-center gap-2 rounded-lg bg-card px-3 border border-border/50 shadow-xs">
                <Search className="size-3.5 text-muted-foreground shrink-0" />
                <input
                  aria-label="Search flights or hotels"
                  placeholder="Search flights or hotels by city, airport or hotel name..."
                  className="h-full w-full bg-transparent text-[11.5px] 2xl:text-[12px] outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 xl:gap-4 shrink-0">
              <button className="hidden items-center gap-1.5 text-[11.5px] 2xl:text-[12px] font-medium text-secondary-foreground hover:text-foreground sm:flex">
                <ShieldCheck className="size-3.5 text-muted-foreground" /> Corporate Policy
              </button>
              <button className="hidden items-center gap-1.5 text-[11.5px] 2xl:text-[12px] font-medium text-secondary-foreground hover:text-foreground sm:flex">
                <CircleHelp className="size-3.5 text-muted-foreground" /> Help
              </button>
              <button className="relative" aria-label="Notifications">
                <Bell className="size-4 text-secondary-foreground" />
                <span className="absolute -top-1.5 -right-1.5 flex size-3.5 items-center justify-center rounded-full bg-[#E5382E] text-[8.5px] font-bold text-white">
                  3
                </span>
              </button>
              <button className="flex items-center gap-1.5">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#A37036] text-[11px] font-bold text-white">
                  AZ
                </span>
                <span className="text-[12.5px] 2xl:text-[13px] font-bold text-navy">Azim</span>
                <ChevronDown className="size-3 text-secondary-foreground" />
              </button>
            </div>
          </div>

          {/* Hero Banner */}
          <HeroBanner />

          {/* KPI Row (4 Cards) */}
          <KpiRow />

          {/* Middle Row (Spend Trend + Spend Breakdown) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 xl:gap-3">
            <TrendCard />
            <BreakdownCard />
          </div>

          {/* Bottom Row (Recent Bookings + Policy Compliance & Top Destinations) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 xl:gap-3">
            <BookingsCard />
            <div className="flex flex-col gap-2 md:col-span-2">
              <PolicyComplianceCard />
              <TopDestinationsCard />
            </div>
          </div>
        </main>

        {/* Right Sidebar Column */}
        <aside className="flex w-full shrink-0 flex-col gap-2.5 lg:w-[245px] xl:w-[265px] 2xl:w-[285px]">
          <CalendarCard />
          <UpcomingTripsCard />
          <UpdatesCard />
        </aside>
      </div>
    </div>
  );
}

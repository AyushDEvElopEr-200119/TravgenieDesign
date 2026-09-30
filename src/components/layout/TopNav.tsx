import { Link } from "@tanstack/react-router";
import {
  Bell,
  Bus,
  Car,
  ChevronDown,
  LayoutGrid,
  MoreHorizontal,
  Plane,
  ShieldCheck,
  TicketCheck,
  TramFront,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

export type ServiceTab = "flight" | "hotel" | "train" | "bus" | "car" | "more";

const tabs: { key: ServiceTab; label: string; icon: typeof Plane; to?: string }[] = [
  { key: "flight", label: "Flight", icon: Plane, to: "/flights" },
  { key: "hotel", label: "Hotel", icon: LayoutGrid, to: "/hotels" },
  { key: "train", label: "Train", icon: TramFront },
  { key: "bus", label: "Bus", icon: Bus },
  { key: "car", label: "Car", icon: Car },
  { key: "more", label: "More", icon: MoreHorizontal },
];

export function TopNav({
  active,
  user,
  floating = false,
}: {
  active: ServiceTab;
  user: { initials: string; name: string };
  floating?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative z-20",
        floating ? "mx-auto w-full max-w-[1340px] px-4 pt-4" : "bg-card",
      )}
    >
      <div
        className={cn(
          "bg-card",
          floating
            ? "rounded-3xl px-7 shadow-float"
            : "mx-auto max-w-[1340px] px-4",
        )}
      >
        <div className="flex h-[74px] items-center justify-between">
          <Link to="/dashboard" aria-label="TravGenie home">
            <Logo width={150} />
          </Link>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-[15px] text-foreground transition-colors hover:text-gold-700">
              <ShieldCheck className="size-[18px]" />
              Corporate Policies
            </button>
            <button className="flex items-center gap-2 text-[15px] text-foreground transition-colors hover:text-gold-700">
              <TicketCheck className="size-[18px]" />
              My Trips
            </button>
            <button
              className="relative text-foreground transition-colors hover:text-gold-700"
              aria-label="Notifications"
            >
              <Bell className="size-[20px]" />
              <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-destructive ring-2 ring-card" />
            </button>
            <button className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full bg-gold-600 text-[15px] font-semibold text-white">
                {user.initials}
              </span>
              <span className="text-[15px] font-semibold">{user.name}</span>
              <ChevronDown className="size-4 text-secondary-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Service tab row sitting in a notch under the bar */}
      <div
        className={cn(
          "relative flex justify-center",
          floating ? "" : "mx-auto max-w-[1340px] px-4",
        )}
      >
        {floating ? (
          <span className="absolute -top-px left-1/2 h-14 w-[760px] -translate-x-1/2 rounded-b-[36px] bg-card" />
        ) : null}
        <div
          className={cn(
            "no-scrollbar relative flex items-center gap-2 overflow-x-auto px-3",
            floating ? "h-14" : "h-14 bg-card",
          )}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === active;
            const content = (
              <>
                <Icon className="size-[18px]" />
                {tab.label}
              </>
            );
            const cls = cn(
              "flex h-10 shrink-0 items-center gap-2 rounded-3xl px-4 text-[15px] transition-colors duration-150",
              isActive
                ? "bg-gold-100 font-semibold text-gold-700"
                : "text-foreground hover:bg-gold-50",
            );
            return tab.to ? (
              <Link key={tab.key} to={tab.to} className={cls}>
                {content}
              </Link>
            ) : (
              <button key={tab.key} className={cls}>
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Briefcase,
  Building2,
  CircleCheckBig,
  CircleHelp,
  FileText,
  House,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";
import nightBuilding from "@/assets/night-building.jpg";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const primary = [
  { label: "Dashboard", icon: House, to: "/dashboard" },
  { label: "Book Flight", icon: Plane, to: "/flights" },
  { label: "Book Hotel", icon: Building2, to: "/hotels" },
];

const secondary = [
  { label: "My Trips", icon: Briefcase },
  { label: "Approvals", icon: CircleCheckBig, badge: "3" },
  { label: "Travel Policy", icon: ShieldCheck },
  { label: "Expenses", icon: FileText },
  { label: "Reports", icon: BarChart3 },
  { label: "Manage Team", icon: Users },
];

export function Sidebar({ variant = "A" }: { variant?: "A" | "B" }) {
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen w-[172px] shrink-0 flex-col overflow-hidden lg:flex xl:w-[172px]",
        variant === "A" ? "bg-gradient-navy" : "bg-navy-solid",
      )}
    >
      <div className="px-4 pt-5 pb-6">
        <Logo width={132} tone="white" />
      </div>

      <nav className="flex flex-col gap-0.5 px-3">
        {primary.map((item, i) => (
          <Link
            key={item.label}
            to={item.to}
            className={cn(
              "flex h-11 items-center gap-3.5 rounded-md px-3 text-[14px] transition-colors duration-150",
              i === 0
                ? "bg-gradient-gold-soft font-semibold text-navy"
                : "text-white/85 hover:bg-white/8",
            )}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}

        <div className="my-3 h-px bg-white/12" />

        {secondary.map((item) => (
          <button
            key={item.label}
            className="flex h-11 items-center gap-3.5 rounded-md px-3 text-[14px] text-white/85 transition-colors duration-150 hover:bg-white/8"
          >
            <item.icon className="size-5" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge ? (
              <span className="flex size-5 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-white">
                {item.badge}
              </span>
            ) : null}
          </button>
        ))}

        {variant === "B" ? (
          <>
            <div className="my-3 h-px bg-white/12" />
            <button className="flex h-11 items-center gap-3.5 rounded-md px-3 text-[14px] text-white/85 transition-colors duration-150 hover:bg-white/8">
              <CircleHelp className="size-5" />
              Support
            </button>
          </>
        ) : null}
      </nav>

      {variant === "A" ? (
        <div className="relative mt-auto h-[300px]">
          <img
            src={nightBuilding}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1730] via-[#0B1730]/70 to-transparent" />
          <div className="absolute top-8 left-4 right-4">
            <p className="font-serif text-[22px] leading-[1.25] text-white">
              Business
              <br />
              Travel for
              <br />
              a Bigger
              <br />
              Tomorrow
            </p>
            <span className="mt-4 block h-[3px] w-10 bg-gold-500" />
          </div>
        </div>
      ) : null}
    </aside>
  );
}

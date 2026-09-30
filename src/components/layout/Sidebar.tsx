import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Briefcase,
  Building2,
  CircleCheckBig,
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
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden h-screen w-[190px] shrink-0 flex-col justify-between overflow-y-auto overflow-x-hidden no-scrollbar lg:flex",
          "bg-[#0B1730]",
        )}
      >
        {/* Background building image anchoring the lower section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[460px] overflow-hidden">
          <img
            src={nightBuilding}
            alt=""
            loading="lazy"
            className="size-full object-cover object-bottom opacity-85"
          />
          {/* Smooth blend from top dark navy down into the twilight sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1730] via-[#0B1730]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/75 via-transparent to-transparent" />
        </div>

        {/* Content sits cleanly on top with relative z-10 */}
        <div className="relative z-10">
          <div className="px-3.5 pt-4 pb-3">
            <Logo width={140} tone="white" />
          </div>

          <nav className="flex flex-col gap-0.5 px-2.5">
            {primary.map((item, i) => (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "flex h-8.5 items-center gap-2.5 rounded-lg px-2.5 text-[12.5px] font-medium transition-all duration-150",
                  i === 0
                    ? "bg-gradient-to-r from-[#DFB268] via-[#C9963B] to-[#A8741A] font-semibold text-[#0B1730] shadow-sm"
                    : "text-white/85 hover:bg-white/10 hover:text-white",
                )}
              >
                <item.icon
                  className={cn("size-4", i === 0 ? "text-[#0B1730]" : "text-white/85")}
                />
                {item.label}
              </Link>
            ))}

            <div className="my-1.5 h-px bg-white/10" />

            {secondary.map((item) => (
              <button
                key={item.label}
                className="flex h-8.5 items-center gap-2.5 rounded-lg px-2.5 text-[12.5px] text-white/85 transition-colors duration-150 hover:bg-white/10 hover:text-white"
              >
                <item.icon className="size-4 text-white/85" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge ? (
                  <span className="flex size-4 items-center justify-center rounded-full bg-[#E5382E] text-[9.5px] font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom serif tagline with gold underline */}
        <div className="relative z-10 p-3.5 pb-4">
          <p className="font-serif text-[17px] leading-[1.22] text-white drop-shadow-sm">
            Business
            <br />
            Travel for
            <br />
            a Bigger
            <br />
            Tomorrow
          </p>
          <span className="mt-2 block h-[2.5px] w-9 bg-[#C9963B]" />
        </div>
      </aside>

      {/* Spacer to preserve layout flow on desktop */}
      <div className="hidden w-[190px] shrink-0 lg:block" aria-hidden="true" />
    </>
  );
}

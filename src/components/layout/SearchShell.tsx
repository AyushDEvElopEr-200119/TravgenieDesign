import type { ReactNode } from "react";
import { ShieldCheck, Ticket, Clock4, Headset } from "lucide-react";
import { TopNav, type ServiceTab } from "@/components/layout/TopNav";
import { GenieMark } from "@/components/brand/Logo";

export type Benefit = { title: string; sub: string; icon: "policy" | "fare" | "flex" | "support" };

const icons = {
  policy: ShieldCheck,
  fare: Ticket,
  flex: Clock4,
  support: Headset,
};

export function BenefitTiles({ items }: { items: Benefit[] }) {
  return (
    <div className="mx-auto grid w-full max-w-[1340px] gap-4 px-4 pb-10 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((b) => {
        const Icon = icons[b.icon];
        return (
          <div
            key={b.title}
            className="flex items-center gap-3.5 rounded-xl bg-card px-4 py-4 shadow-card"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
              <Icon className="size-5" />
            </span>
            <span>
              <span className="block text-[14px] font-bold">{b.title}</span>
              <span className="block text-[12px] text-secondary-foreground">
                {b.sub}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Hero + floating nav shell used by the flight and hotel search screens. */
export function SearchShell({
  tab,
  user,
  image,
  kicker,
  headline,
  tagline,
  children,
  benefits,
}: {
  tab: ServiceTab;
  user: { initials: string; name: string };
  image: string;
  kicker: string;
  headline: string;
  tagline: string;
  children: ReactNode;
  benefits: Benefit[];
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[400px] overflow-hidden">
          <img
            src={image}
            alt=""
            className="size-full object-cover"
          />
          <GenieMark
            gradientId="hero-genie"
            className="absolute top-[22%] right-[12%] h-[300px] opacity-90"
          />
        </div>

        <TopNav active={tab} user={user} floating />

        <div className="relative mx-auto max-w-[1340px] px-4">
          <div className="pt-16 pb-[70px] pl-2 sm:pl-[90px]">
            <p className="text-[30px] text-navy">{kicker}</p>
            <h1 className="text-[52px] leading-[1.05] font-bold text-navy">
              {headline}
            </h1>
            <p className="mt-2 text-[22px] font-light text-navy/85">{tagline}</p>
          </div>

          <div className="rounded-[18px] bg-card p-6 shadow-float">{children}</div>
        </div>
      </div>

      <div className="pt-6">
        <BenefitTiles items={benefits} />
      </div>
    </div>
  );
}

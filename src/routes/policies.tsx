import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plane,
  Building2,
  Armchair,
  Coins,
  CalendarClock,
  Globe,
  ArrowRight,
  ShieldCheck,
  TicketCheck,
  FileText,
  Edit3,
  X,
  AlertCircle,
  Hotel,
  TramFront,
  Bus,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";
import corporatePolicyHero from "@/assets/corporate-policy-hero.jpg";
import { Logo } from "@/components/brand/Logo";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { UserProfileMenu } from "@/components/layout/UserProfileMenu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Corporate Travel Policies | TravGenie" },
      {
        name: "description",
        content: "Guidelines for a compliant and cost-efficient corporate travel experience.",
      },
      { property: "og:title", content: "Corporate Travel Policies | TravGenie" },
      {
        property: "og:description",
        content: "Guidelines for a compliant and cost-efficient travel experience.",
      },
    ],
  }),
  component: PoliciesPage,
});

interface PolicyCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Plane;
  details: {
    overview: string;
    rules: string[];
    limits: { label: string; value: string }[];
    approvalNeededFor: string[];
  };
}

const policyCards: PolicyCardData[] = [
  {
    id: "flight",
    title: "Flight Policy",
    subtitle: "Approved airlines, fare limits, cabin class and booking rules.",
    icon: Plane,
    details: {
      overview:
        "All corporate flight bookings must prioritize negotiated contracted partner carriers and Lowest Logical Fares (LLF) within policy tolerance.",
      rules: [
        "Contracted partner airlines (Emirates, Oman Air, Qatar Airways) should be selected first when available.",
        "Flights must be booked within ±2 hours of the requested departure time if a cheaper alternative is available.",
        "Direct flights are permitted if the fare is within 15% of the cheapest 1-stop option.",
        "Excess baggage allowance is covered up to 1 piece (23kg) for domestic and 2 pieces for international trips.",
      ],
      limits: [
        { label: "Domestic Flight Cap", value: "USD 250 / sector" },
        { label: "Regional Flight Cap", value: "USD 500 / sector" },
        { label: "International Flight Cap", value: "USD 1,200 / sector" },
      ],
      approvalNeededFor: [
        "Any booking exceeding the sector fare cap",
        "Flights booked less than 7 days prior to departure",
        "Upgrades to Business Class on flights under 6 hours duration",
      ],
    },
  },
  {
    id: "hotel",
    title: "Hotel Policy",
    subtitle: "Preferred hotels, rate limits and location guidelines.",
    icon: Building2,
    details: {
      overview:
        "Hotel accommodations must be selected from company-preferred properties within safe, business-ready districts with breakfast and flexible cancellation.",
      rules: [
        "Employees must choose from approved 3-star or 4-star corporate partner properties (e.g., Rove, Taj, Hilton, Hyatt).",
        "Hotel must be located within 15 km of the client office or conference venue.",
        "Complimentary high-speed WiFi and breakfast must be included in the room rate.",
        "Incidentals (minibar, laundry, room service) are reimbursed against original itemized tax receipts up to daily per-diem.",
      ],
      limits: [
        { label: "Tier 1 Cities (Dubai, London, NYC)", value: "Up to USD 280 / night" },
        { label: "Tier 2 Cities (Bangalore, Muscat)", value: "Up to USD 160 / night" },
        { label: "Standard Room Type", value: "Standard / Deluxe King" },
      ],
      approvalNeededFor: [
        "Nightly rates exceeding local city cap by more than 10%",
        "5-Star luxury properties without prior VP authorization",
        "Stays extending beyond the business event dates",
      ],
    },
  },
  {
    id: "class-wise",
    title: "Class-wise Policy",
    subtitle: "Economy by default. Business class with approval.",
    icon: Armchair,
    details: {
      overview:
        "Travel classes are structured by flight duration and executive banding to balance employee wellbeing and corporate budget efficiency.",
      rules: [
        "Economy Class is the standard booking tier for all domestic flights and short-haul flights under 6 hours.",
        "Premium Economy is permitted for non-stop flights exceeding 6 hours for Senior Managers and Directors.",
        "Business Class is automatically permitted for flights exceeding 8 continuous hours for VP level and above.",
        "Red-eye flights with same-day client meetings qualify for an automatic class upgrade review.",
      ],
      limits: [
        { label: "< 6 Hours Duration", value: "Economy Standard" },
        { label: "6 to 8 Hours Duration", value: "Premium Economy (Dir+)" },
        { label: "> 8 Hours Duration", value: "Business Class (VP+)" },
      ],
      approvalNeededFor: [
        "Business class requested by staff below Director grade",
        "First Class travel on any domestic or international sector",
      ],
    },
  },
  {
    id: "fare-restriction",
    title: "Fare Restriction",
    subtitle: "Book within approved fare limits.",
    icon: Coins,
    details: {
      overview:
        "Dynamic fare capping ensures tickets reflect fair market value while leveraging corporate discount codes and negotiated bulk tariffs.",
      rules: [
        "Travellers must select among the three lowest logical fares offered within the designated search window.",
        "Refundable or flexible ticket options are recommended for high-uncertainty client meetings.",
        "Non-refundable fares should be utilized for confirmed training and annual conferences.",
        "Ancillary add-ons (seat selection, fast track) are covered up to USD 40 per trip.",
      ],
      limits: [
        { label: "Lowest Logical Fare Window", value: "±2 Hours" },
        { label: "Fare Deviation Tolerance", value: "10% over LLF" },
        { label: "Seat Selection Allowance", value: "USD 40 max" },
      ],
      approvalNeededFor: [
        "Selecting a fare more than 15% above the lowest logical fare",
        "Purchasing unrestricted fully-flexible premium tickets",
      ],
    },
  },
  {
    id: "advance-booking",
    title: "Advance Booking",
    subtitle: "Bookings allowed up to 30 days in advance.",
    icon: CalendarClock,
    details: {
      overview:
        "Booking in advance unlocks substantial corporate savings and ensures hotel availability near key business districts.",
      rules: [
        "Domestic travel should ideally be booked at least 14 days prior to departure date.",
        "International travel should be booked at least 21 days in advance.",
        "Bookings can be made up to a maximum of 30 days in advance of the travel date.",
        "Late bookings (under 7 days) incur dynamic surcharge warnings and require immediate manager sign-off.",
      ],
      limits: [
        { label: "Recommended Lead Time", value: "14 – 21 Days" },
        { label: "Maximum Advance Window", value: "30 Days" },
        { label: "Urgent Threshold", value: "< 7 Days before travel" },
      ],
      approvalNeededFor: [
        "Bookings made within 72 hours of departure",
        "Reservations requested further than 30 days in advance",
      ],
    },
  },
  {
    id: "domestic-international",
    title: "Domestic / International",
    subtitle: "Policy varies by travel type and destination.",
    icon: Globe,
    details: {
      overview:
        "Rules, visa allowances, travel insurance, and per diem allowances vary depending on whether travel is within the home territory or abroad.",
      rules: [
        "Domestic travel does not require executive visa processing; automated e-receipts are accepted.",
        "International travel automatically activates CWS Group corporate health & medical travel insurance.",
        "Visa application fees, passport expediting, and required entry inoculations are 100% company reimbursed.",
        "International daily per diem covers meals and incidental local transport (taxis, metro).",
      ],
      limits: [
        { label: "Domestic Meal Per Diem", value: "USD 50 / day" },
        { label: "International Meal Per Diem", value: "USD 95 / day" },
        { label: "Medical Travel Insurance", value: "USD 500,000 Coverage" },
      ],
      approvalNeededFor: [
        "High-risk country destination travel (requires Security team sign-off)",
        "Extended international stays beyond 14 business days",
      ],
    },
  },
];

export function PoliciesPage() {
  const selectedCompany = "DCB Bank";
  const [activeModalPolicy, setActiveModalPolicy] = useState<PolicyCardData | null>(null);
  const [isPolicyChangeOpen, setIsPolicyChangeOpen] = useState(false);
  const [policyChangeSuccess, setPolicyChangeSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Create a programmatic download for the policy document
      const element = document.createElement("a");
      const file = new Blob(
        [
          `TRAVGENIE CORPORATE TRAVEL POLICY\nCompany: ${selectedCompany}\nEffective Date: 2026\nCompliance Threshold: 92%\n\n1. Flight Policy: Contracted partners, Lowest Logical Fare, economy default.\n2. Hotel Policy: 3-4 star preferred properties, USD 280/night cap.\n3. Class-wise Policy: Economy < 6h, Business > 8h with VP approval.\n4. Advance Booking: Bookings up to 30 days in advance.`,
        ],
        { type: "text/plain" },
      );
      element.href = URL.createObjectURL(file);
      element.download = `${selectedCompany.replace(/\s+/g, "_")}_Travel_Policy.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F6F4F0] font-sans antialiased text-[#0D1B3E]">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EBE7DF]/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 sm:px-6 h-[72px]">
          {/* Logo */}
          <Link
            to="/dashboard"
            search={{ variant: "A" }}
            aria-label="TravGenie home"
            className="transition-opacity hover:opacity-90 shrink-0"
          >
            <Logo width={152} />
          </Link>

          {/* Centered Service Tab Navigation Notch */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[14px] font-medium text-[#1E293B]">
            <Link
              to="/flights"
              className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-[#FAF8F5] hover:text-[#C9963B] transition-all"
            >
              <Plane className="size-4 -rotate-45" />
              <span>Flight</span>
            </Link>
            <Link
              to="/hotels"
              className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-[#FAF8F5] hover:text-[#C9963B] transition-all"
            >
              <Hotel className="size-4" />
              <span>Hotel</span>
            </Link>
            <button
              onClick={() => alert("Train booking feature coming soon!")}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-[#FAF8F5] hover:text-[#C9963B] transition-all text-[#475569] cursor-pointer"
            >
              <TramFront className="size-4" />
              <span>Train</span>
            </button>
            <button
              onClick={() => alert("Bus booking feature coming soon!")}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-[#FAF8F5] hover:text-[#C9963B] transition-all text-[#475569] cursor-pointer"
            >
              <Bus className="size-4" />
              <span>Bus</span>
            </button>
            <button
              onClick={() => alert("Additional corporate services coming soon!")}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-[#FAF8F5] hover:text-[#C9963B] transition-all text-[#475569] cursor-pointer"
            >
              <MoreHorizontal className="size-4" />
              <span>More</span>
            </button>
          </nav>

          {/* Top Right Utilities */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 shrink-0">
            {/* Corporate Policies Tab - Active Pill Matching Image */}
            <Link
              to="/policies"
              className="flex items-center gap-2 rounded-xl border border-[#E2B15E] bg-[#FEF8ED] px-3.5 py-2 text-[14px] font-semibold text-[#8A5A12] shadow-2xs ring-1 ring-[#E2B15E]/30 transition-all hover:bg-[#FDF3DE]"
            >
              <ShieldCheck className="size-[18px] text-[#C9963B]" />
              <span className="hidden sm:inline">Corporate Policies</span>
            </Link>

            {/* My Trips Link */}
            <Link
              to="/trips"
              className="flex items-center gap-2 text-[14px] font-medium text-[#0D1B3E] transition-colors hover:text-[#C9963B] px-1 py-2"
            >
              <TicketCheck className="size-[18px] text-[#0D1B3E]" />
              <span className="hidden sm:inline">My Trips</span>
            </Link>

            {/* Notification Bell Dropdown */}
            <NotificationDropdown />

            {/* User Profile Dropdown Menu */}
            <UserProfileMenu />
          </div>
        </div>

        {/* Mobile Submenu Navigation Row */}
        <div className="md:hidden border-t border-[#F2EEE6] bg-[#FCFBF8]/95 px-4 py-1.5 flex items-center justify-around text-[13px] font-medium text-[#1E293B]">
          <Link to="/flights" className="flex items-center gap-1.5 py-1 px-2">
            <Plane className="size-3.5 -rotate-45" />
            <span>Flight</span>
          </Link>
          <Link to="/hotels" className="flex items-center gap-1.5 py-1 px-2">
            <Hotel className="size-3.5" />
            <span>Hotel</span>
          </Link>
          <button
            onClick={() => alert("Train bookings coming soon!")}
            className="flex items-center gap-1.5 py-1 px-2 text-[#475569]"
          >
            <TramFront className="size-3.5" />
            <span>Train</span>
          </button>
          <button
            onClick={() => alert("Bus bookings coming soon!")}
            className="flex items-center gap-1.5 py-1 px-2 text-[#475569]"
          >
            <Bus className="size-3.5" />
            <span>Bus</span>
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative h-[250px] sm:h-[280px] md:h-[300px] w-full overflow-hidden bg-[#0A162B]">
        {/* Airplane Soaring into Sunset Background Image */}
        <img
          src={corporatePolicyHero}
          alt="Commercial Jet Soaring in Twilight Sky"
          className="absolute inset-0 size-full object-cover object-[center_35%] filter brightness-[0.88] contrast-[1.05] transition-transform duration-1000 ease-out hover:scale-102"
        />

        {/* Subtle Ambient Vignette & Text Contrast Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 via-45% to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />

        {/* Hero Content Row */}
        <div className="relative mx-auto flex h-full max-w-[1300px] items-center justify-between px-4 sm:px-6 pb-12 sm:pb-14">
          {/* Left: Headline & Subtitle */}
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-4 duration-600">
            <h1 className="text-[28px] sm:text-[34px] md:text-[38px] font-bold tracking-tight text-white drop-shadow-md">
              Corporate Travel Policies
            </h1>
            <p className="mt-1 text-[14px] sm:text-[16px] md:text-[17px] font-normal text-white/90 drop-shadow-sm">
              Guidelines for a compliant and cost-efficient travel experience.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT: OVERLAPPING WHITE CONTAINER */}
      <main className="relative -mt-12 sm:-mt-14 pb-20 px-3 sm:px-6">
        <div className="mx-auto max-w-[1300px]">
          {/* Overlapping White Shell */}
          <div className="rounded-t-[26px] sm:rounded-t-[30px] bg-white border border-[#EDE8E1] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-5 sm:p-7 md:p-8 space-y-6">
            {/* 6 POLICY CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {policyCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-[#EDE8E1] bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(13,27,62,0.03)] transition-all duration-300 hover:border-[#D5A754]/80 hover:shadow-[0_12px_28px_rgba(13,27,62,0.08)] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-3"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div>
                      {/* Icon inside Warm Golden Circle */}
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FEF6E9] border border-[#FBE3B5] text-[#C48C2B] shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#FDF0D5]">
                        <Icon
                          className={cn(
                            "size-6 text-[#C48C2B]",
                            card.id === "flight" && "-rotate-45",
                          )}
                        />
                      </div>

                      {/* Title & Subtitle */}
                      <h2 className="mt-4 text-[17px] font-bold text-[#0D1B3E] group-hover:text-[#8A5A12] transition-colors">
                        {card.title}
                      </h2>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#5B6478]">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-5 pt-2">
                      <button
                        onClick={() => setActiveModalPolicy(card)}
                        className="group/btn inline-flex items-center gap-1.5 rounded-xl border border-[#D5A754] bg-white px-4 py-2 text-[13.5px] font-semibold text-[#8A5A12] transition-all duration-200 hover:bg-[#FEF8ED] hover:border-[#B88628] hover:shadow-2xs active:scale-97 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 4. BOTTOM TWO-COLUMN ROW: POLICY COMPLIANCE SUMMARY & QUICK ACTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
              {/* Left Column (7 cols): Policy Compliance Summary */}
              <div className="lg:col-span-7 rounded-2xl border border-[#EDE8E1] bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(13,27,62,0.03)] animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-[17px] font-bold text-[#0D1B3E]">Policy Compliance Summary</h2>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-around gap-6">
                  {/* Multi-Segment Donut Chart */}
                  <div className="relative flex size-44 sm:size-48 items-center justify-center shrink-0">
                    <svg className="size-full -rotate-90" viewBox="0 0 140 140">
                      {/* Background Subtle Track */}
                      <circle
                        cx="70"
                        cy="70"
                        r="52"
                        stroke="#F3F4F6"
                        strokeWidth="13"
                        fill="transparent"
                      />
                      {/* 1. Within Policy Segment (Green) - 87.5% */}
                      <circle
                        cx="70"
                        cy="70"
                        r="52"
                        stroke="#20A159"
                        strokeWidth="13"
                        fill="transparent"
                        strokeDasharray="278 326.73"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                      {/* 2. Needs Approval Segment (Orange) - 10.4% */}
                      <circle
                        cx="70"
                        cy="70"
                        r="52"
                        stroke="#F08A24"
                        strokeWidth="13"
                        fill="transparent"
                        strokeDasharray="30 326.73"
                        strokeDashoffset="-285"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                      {/* 3. Out of Policy Segment (Red) - 2.1% */}
                      <circle
                        cx="70"
                        cy="70"
                        r="52"
                        stroke="#E5382E"
                        strokeWidth="13"
                        fill="transparent"
                        strokeDasharray="6 326.73"
                        strokeDashoffset="-319"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>

                    {/* Donut Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[30px] font-extrabold tracking-tight text-[#0D1B3E] leading-none">
                        92%
                      </span>
                      <span className="mt-1 text-[12px] font-medium text-[#5B6478]">
                        Within Policy
                      </span>
                    </div>
                  </div>

                  {/* Legend Breakdown */}
                  <div className="flex w-full sm:w-auto flex-col gap-3.5 min-w-[210px]">
                    {/* Within Policy */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className="size-3 rounded-full bg-[#20A159]" />
                        <span className="text-[14.5px] font-medium text-[#0D1B3E]">
                          Within Policy
                        </span>
                      </div>
                      <span className="text-[15px] font-bold text-[#0D1B3E]">42</span>
                    </div>

                    {/* Needs Approval */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className="size-3 rounded-full bg-[#F08A24]" />
                        <span className="text-[14.5px] font-medium text-[#0D1B3E]">
                          Needs Approval
                        </span>
                      </div>
                      <span className="text-[15px] font-bold text-[#0D1B3E]">5</span>
                    </div>

                    {/* Out of Policy */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className="size-3 rounded-full bg-[#E5382E]" />
                        <span className="text-[14.5px] font-medium text-[#0D1B3E]">
                          Out of Policy
                        </span>
                      </div>
                      <span className="text-[15px] font-bold text-[#0D1B3E]">1</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Quick Actions */}
              <div className="lg:col-span-5 rounded-2xl border border-[#EDE8E1] bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(13,27,62,0.03)] animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-[17px] font-bold text-[#0D1B3E]">Quick Actions</h2>

                <div className="mt-5 space-y-4">
                  {/* Action 1: Download Full Policy Document */}
                  <div className="flex items-center justify-between gap-3 p-2 rounded-xl transition-colors hover:bg-[#FAF8F5]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF4FE] text-[#1D74E8]">
                        <FileText className="size-5" />
                      </div>
                      <span className="text-[14px] sm:text-[14.5px] font-medium text-[#0D1B3E] truncate">
                        Download Full Policy Document
                      </span>
                    </div>
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="shrink-0 rounded-xl border border-[#D5A754] bg-white px-4 py-2 text-[13.5px] font-semibold text-[#8A5A12] transition-all duration-200 hover:bg-[#FEF8ED] hover:border-[#B88628] active:scale-97 cursor-pointer disabled:opacity-50"
                    >
                      {isDownloading ? "Downloading..." : "Download"}
                    </button>
                  </div>

                  {/* Action 2: Request Policy Change */}
                  <div className="flex items-center justify-between gap-3 p-2 rounded-xl transition-colors hover:bg-[#FAF8F5]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF4FE] text-[#1D74E8]">
                        <Edit3 className="size-5" />
                      </div>
                      <span className="text-[14px] sm:text-[14.5px] font-medium text-[#0D1B3E] truncate">
                        Request Policy Change
                      </span>
                    </div>
                    <button
                      onClick={() => setIsPolicyChangeOpen(true)}
                      className="shrink-0 rounded-xl border border-[#D5A754] bg-white px-4 py-2 text-[13.5px] font-semibold text-[#8A5A12] transition-all duration-200 hover:bg-[#FEF8ED] hover:border-[#B88628] active:scale-97 cursor-pointer"
                    >
                      Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 5. MODAL: DETAILED POLICY VIEWER */}
      {activeModalPolicy && (
        <PolicyDetailModal
          policy={activeModalPolicy}
          company={selectedCompany}
          onClose={() => setActiveModalPolicy(null)}
        />
      )}

      {/* 6. MODAL: REQUEST POLICY CHANGE */}
      {isPolicyChangeOpen && (
        <RequestPolicyChangeModal
          company={selectedCompany}
          onClose={() => setIsPolicyChangeOpen(false)}
          onSuccess={() => {
            setIsPolicyChangeOpen(false);
            setPolicyChangeSuccess(true);
            setTimeout(() => setPolicyChangeSuccess(false), 4000);
          }}
        />
      )}

      {/* Success Toast */}
      {policyChangeSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-[#1FA45B] px-5 py-3.5 text-white shadow-xl animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="size-5" />
          <span className="text-[14px] font-medium">
            Policy change request submitted to HR & Travel Desk!
          </span>
        </div>
      )}
    </div>
  );
}

/** Detailed Policy Dialog */
function PolicyDetailModal({
  policy,
  company,
  onClose,
}: {
  policy: PolicyCardData;
  company: string;
  onClose: () => void;
}) {
  const Icon = policy.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-white shadow-2xl border border-[#EDE8E1] p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full bg-[#F3F5F8] text-[#5B6478] hover:bg-[#E6EAF0] hover:text-[#0D1B3E] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="size-4.5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 pb-5 border-b border-[#F0ECE4]">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#FEF6E9] border border-[#FBE3B5] text-[#C48C2B]">
            <Icon className="size-7 text-[#C48C2B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0D1B3E]">
                {policy.title}
              </h2>
              <span className="rounded-md bg-[#FEF8ED] px-2.5 py-0.5 text-[12px] font-semibold text-[#8A5A12] border border-[#FBE6C4]">
                {company}
              </span>
            </div>
            <p className="text-[13px] text-[#5B6478] mt-0.5">{policy.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Overview */}
          <div className="rounded-xl bg-[#FAF8F5] p-4 border border-[#ECE6DC]">
            <h3 className="text-[13px] font-bold text-[#0D1B3E] uppercase tracking-wider">
              Policy Overview
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-[#5B6478]">
              {policy.details.overview}
            </p>
          </div>

          {/* Core Rules */}
          <div>
            <h3 className="text-[14px] font-bold text-[#0D1B3E]">Guidelines & Mandates</h3>
            <ul className="mt-3 space-y-2">
              {policy.details.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#5B6478]">
                  <CheckCircle2 className="size-4 text-[#1FA45B] shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limits & Thresholds */}
          <div>
            <h3 className="text-[14px] font-bold text-[#0D1B3E]">Configured Thresholds</h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {policy.details.limits.map((lim, i) => (
                <div key={i} className="rounded-xl border border-[#EDE8E1] p-3 bg-[#FCFBF8]">
                  <span className="text-[11.5px] text-[#8A93A6] block">{lim.label}</span>
                  <span className="text-[14px] font-bold text-[#0D1B3E] block mt-0.5">
                    {lim.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Triggers */}
          <div className="rounded-xl bg-[#FEF4E6] p-4 border border-[#FADBA9]">
            <div className="flex items-center gap-2 text-[#C96F08] font-bold text-[13.5px]">
              <AlertCircle className="size-4 shrink-0" />
              <span>Manager Approval Trigger Conditions</span>
            </div>
            <ul className="mt-2 space-y-1.5 text-[13px] text-[#8C4F07]">
              {policy.details.approvalNeededFor.map((appr, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#C96F08] shrink-0 mt-2" />
                  <span>{appr}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-xl bg-[#BC8732] px-6 py-2.5 text-[14px] font-semibold text-white shadow-xs hover:bg-[#A37123] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Request Policy Change Modal */
function RequestPolicyChangeModal({
  company,
  onClose,
  onSuccess,
}: {
  company: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [category, setCategory] = useState("Flight Cap");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-[24px] bg-white shadow-2xl border border-[#EDE8E1] p-6 sm:p-7 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-[#F3F5F8] text-[#5B6478] hover:bg-[#E6EAF0] transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>

        <h2 className="text-[20px] font-bold text-[#0D1B3E]">Request Policy Exception / Change</h2>
        <p className="mt-1 text-[13px] text-[#5B6478]">
          Submit a request to update limits for{" "}
          <span className="font-semibold text-[#0D1B3E]">{company}</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#0D1B3E] mb-1">
              Policy Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#D9CFBE] bg-white px-3.5 py-2.5 text-[14px] text-[#0D1B3E] outline-none focus:border-[#BC8732]"
            >
              <option value="Flight Cap">Flight Fare Threshold Increase</option>
              <option value="Hotel Cap">Hotel Nightly Cap Adjustment</option>
              <option value="Advance Window">Advance Booking Window Extension</option>
              <option value="Cabin Upgrade">Cabin Class Exception (Business Upgrade)</option>
              <option value="Other">Other Policy Revision</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#0D1B3E] mb-1">
              Business Justification
            </label>
            <textarea
              rows={3}
              required
              placeholder="State the commercial project, client commitment, or emergency rationale..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-xl border border-[#D9CFBE] bg-white p-3 text-[13.5px] text-[#0D1B3E] outline-none placeholder:text-[#8A93A6] focus:border-[#BC8732]"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#D9CFBE] bg-white py-2.5 text-[14px] font-semibold text-[#5B6478] hover:bg-[#F8F6F2] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#BC8732] py-2.5 text-[14px] font-semibold text-white shadow-xs hover:bg-[#A37123] transition-colors cursor-pointer"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
  Building2,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Clock4,
  ExternalLink,
  FileDown,
  FileText,
  Hotel,
  Info,
  MapPin,
  MoreHorizontal,
  PauseCircle,
  Plane,
  Plus,
  ShieldCheck,
  Ticket,
  TicketCheck,
  TramFront,
  Car,
  User,
  X,
} from "lucide-react";
import hotelRoom from "@/assets/hotel-room.jpg";
import dubaiSkyline from "@/assets/dubai-skyline.jpg";
import bangalorePalace from "@/assets/bangalore-palace.jpg";
import londonBigben from "@/assets/london-bigben.jpg";
import hotelDowntown from "@/assets/hotel-downtown.jpg";
import hotelCreek from "@/assets/hotel-creek.jpg";
import { Logo } from "@/components/brand/Logo";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { UserProfileMenu } from "@/components/layout/UserProfileMenu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trips")({
  head: () => ({
    meta: [
      { title: "My Trips | TravGenie — Corporate Business Travel" },
      {
        name: "description",
        content: "Manage all your corporate business trips, flights, and hotel bookings in one place.",
      },
      { property: "og:title", content: "My Trips | TravGenie" },
      {
        property: "og:description",
        content: "Manage all your business trips in one place.",
      },
    ],
  }),
  component: MyTripsPage,
});

type TripStatus = "Confirmed" | "Pending Approval" | "On Hold" | "Completed" | "Cancelled";

interface TripItem {
  id: string;
  destination: string;
  dateRange: string;
  travellerCount: string;
  image: string;
  flight: {
    route: string;
    date: string;
    airline: string;
    flightNumber: string;
    departTime: string;
    arriveTime: string;
    seat: string;
    terminal: string;
    gate: string;
    cabin: string;
  };
  hotel: {
    name: string;
    stayDates: string;
    roomType: string;
    checkIn: string;
    checkOut: string;
    address: string;
    confirmationCode: string;
  };
  status: TripStatus;
  policyNote: string;
  amount: string;
}

const upcomingTripsList: TripItem[] = [
  {
    id: "TG264875",
    destination: "Dubai, UAE",
    dateRange: "12 Nov 2026 – 15 Nov 2026",
    travellerCount: "1 Traveller",
    image: dubaiSkyline,
    flight: {
      route: "MCT → DXB",
      date: "12 Nov 2026",
      airline: "Oman Air",
      flightNumber: "WY 611",
      departTime: "10:00 AM (MCT)",
      arriveTime: "11:30 AM (DXB)",
      seat: "12A",
      terminal: "Terminal 1",
      gate: "Gate B14",
      cabin: "Business Class",
    },
    hotel: {
      name: "Rove Downtown Dubai",
      stayDates: "12 Nov – 15 Nov 2026",
      roomType: "Rover King Room (City View)",
      checkIn: "12 Nov 2026, 2:00 PM",
      checkOut: "15 Nov 2026, 12:00 PM",
      address: "Downtown Dubai, Financial Centre Rd, Dubai, UAE",
      confirmationCode: "RD-998241",
    },
    status: "Confirmed",
    policyNote: "Within Policy — Corporate rate negotiated with Oman Air & Rove Hotels.",
    amount: "USD 442",
  },
  {
    id: "TG264876",
    destination: "Bangalore, India",
    dateRange: "03 Dec 2026 – 06 Dec 2026",
    travellerCount: "1 Traveller",
    image: bangalorePalace,
    flight: {
      route: "MCT → BLR",
      date: "03 Dec 2026",
      airline: "Air India",
      flightNumber: "AI 972",
      departTime: "01:45 PM (MCT)",
      arriveTime: "06:50 PM (BLR)",
      seat: "14C",
      terminal: "Terminal 2",
      gate: "Gate C08",
      cabin: "Economy Class",
    },
    hotel: {
      name: "Taj MG Road",
      stayDates: "03 Dec – 06 Dec 2026",
      roomType: "Deluxe King Room",
      checkIn: "03 Dec 2026, 2:00 PM",
      checkOut: "06 Dec 2026, 12:00 PM",
      address: "41/3, Mahatma Gandhi Rd, Yellappa Garden, Bengaluru",
      confirmationCode: "TAJ-771249",
    },
    status: "Pending Approval",
    policyNote: "Awaiting Finance Manager sign-off (Exceeds domestic budget threshold).",
    amount: "USD 680",
  },
  {
    id: "TG264877",
    destination: "London, UK",
    dateRange: "10 Jan 2027 – 12 Jan 2027",
    travellerCount: "1 Traveller",
    image: londonBigben,
    flight: {
      route: "MCT → LHR",
      date: "10 Jan 2027",
      airline: "British Airways",
      flightNumber: "BA 124",
      departTime: "08:15 AM (MCT)",
      arriveTime: "01:20 PM (LHR)",
      seat: "22K",
      terminal: "Terminal 5",
      gate: "Gate A10",
      cabin: "Club World",
    },
    hotel: {
      name: "Hilton London",
      stayDates: "10 Jan – 12 Jan 2027",
      roomType: "Executive Queen Room",
      checkIn: "10 Jan 2027, 3:00 PM",
      checkOut: "12 Jan 2027, 11:00 AM",
      address: "22 Park Ln, Mayfair, London W1K 1BE, UK",
      confirmationCode: "HL-443901",
    },
    status: "On Hold",
    policyNote: "Held for 24h at locked corporate tariff. Auto-confirms upon ticketing.",
    amount: "USD 1,280",
  },
];

const pastTripsList: TripItem[] = [
  {
    id: "TG264850",
    destination: "Singapore",
    dateRange: "14 Aug 2026 – 18 Aug 2026",
    travellerCount: "1 Traveller",
    image: hotelDowntown,
    flight: {
      route: "MCT → SIN",
      date: "14 Aug 2026",
      airline: "Singapore Airlines",
      flightNumber: "SQ 491",
      departTime: "09:20 AM (MCT)",
      arriveTime: "08:15 PM (SIN)",
      seat: "16A",
      terminal: "Terminal 3",
      gate: "Gate B04",
      cabin: "Economy Class",
    },
    hotel: {
      name: "Marina Bay Sands",
      stayDates: "14 Aug – 18 Aug 2026",
      roomType: "Deluxe King Bay View",
      checkIn: "14 Aug 2026, 3:00 PM",
      checkOut: "18 Aug 2026, 11:00 AM",
      address: "10 Bayfront Ave, Singapore 018956",
      confirmationCode: "MBS-893120",
    },
    status: "Completed",
    policyNote: "Completed successfully. Expense report reconciled.",
    amount: "USD 1,450",
  },
  {
    id: "TG264842",
    destination: "Paris, France",
    dateRange: "02 Jul 2026 – 07 Jul 2026",
    travellerCount: "1 Traveller",
    image: hotelCreek,
    flight: {
      route: "MCT → CDG",
      date: "02 Jul 2026",
      airline: "Air France",
      flightNumber: "AF 663",
      departTime: "11:00 PM (MCT)",
      arriveTime: "05:40 AM (CDG)",
      seat: "11B",
      terminal: "Terminal 2E",
      gate: "Gate K32",
      cabin: "Premium Economy",
    },
    hotel: {
      name: "Hotel Le Marais",
      stayDates: "02 Jul – 07 Jul 2026",
      roomType: "Superior Double",
      checkIn: "03 Jul 2026, 2:00 PM",
      checkOut: "07 Jul 2026, 12:00 PM",
      address: "Rue de Turenne, 75003 Paris, France",
      confirmationCode: "HLM-31902",
    },
    status: "Completed",
    policyNote: "Completed successfully.",
    amount: "USD 980",
  },
];

const cancelledTripsList: TripItem[] = [
  {
    id: "TG264830",
    destination: "Doha, Qatar",
    dateRange: "15 Sep 2026 – 18 Sep 2026",
    travellerCount: "1 Traveller",
    image: hotelRoom,
    flight: {
      route: "MCT → DOH",
      date: "15 Sep 2026",
      airline: "Qatar Airways",
      flightNumber: "QR 1125",
      departTime: "07:30 AM (MCT)",
      arriveTime: "08:10 AM (DOH)",
      seat: "08C",
      terminal: "Terminal 1",
      gate: "Gate 12",
      cabin: "Business Class",
    },
    hotel: {
      name: "W Doha",
      stayDates: "15 Sep – 18 Sep 2026",
      roomType: "Spectacular Room",
      checkIn: "15 Sep 2026, 3:00 PM",
      checkOut: "18 Sep 2026, 12:00 PM",
      address: "West Bay, Doha, Qatar",
      confirmationCode: "WD-110294",
    },
    status: "Cancelled",
    policyNote: "Meeting rescheduled by client. Full credit voucher issued.",
    amount: "USD 320",
  },
];

export function MyTripsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const [selectedTrip, setSelectedTrip] = useState<TripItem | null>(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const navigate = useNavigate();

  const getTripsForTab = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingTripsList;
      case "past":
        return pastTripsList;
      case "cancelled":
        return cancelledTripsList;
    }
  };

  const trips = getTripsForTab();

  return (
    <div className="min-h-screen bg-[#F6F4F0] font-sans antialiased text-[#0D1B3E]">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EBE7DF]/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex max-w-[1340px] items-center justify-between px-4 sm:px-6 h-[72px]">
          {/* Logo */}
          <Link to="/dashboard" search={{ variant: "A" }} aria-label="TravGenie home" className="transition-opacity hover:opacity-90">
            <Logo width={155} />
          </Link>

          {/* Top Right Utilities */}
          <div className="flex items-center gap-5 sm:gap-7">
            <Link
              to="/policies"
              className="hidden md:flex items-center gap-2 text-[14.5px] font-medium text-[#0D1B3E] transition-colors hover:text-[#C9963B]"
            >
              <ShieldCheck className="size-[19px] text-[#0D1B3E]" />
              <span>Corporate Policies</span>
            </Link>

            <Link
              to="/trips"
              className="flex items-center gap-2 text-[14.5px] font-semibold text-[#8A5A12] transition-colors"
            >
              <TicketCheck className="size-[19px] text-[#C9963B]" />
              <span>My Trips</span>
            </Link>

            {/* Notification Bell Dropdown */}
            <NotificationDropdown />

            {/* User Profile Dropdown Menu */}
            <UserProfileMenu />
          </div>
        </div>

        {/* Centered Service Tab Navigation Notch */}
        <div className="relative border-t border-[#F2EEE6] bg-[#FCFBF8]/90 backdrop-blur-xs">
          <div className="mx-auto flex max-w-[1340px] items-center justify-center overflow-x-auto no-scrollbar py-2 px-4">
            <div className="flex items-center gap-6 sm:gap-10 text-[14px] font-medium text-[#1E293B]">
              <Link
                to="/flights"
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-white hover:text-[#C9963B] transition-all"
              >
                <Plane className="size-4 -rotate-45" />
                <span>Flight</span>
              </Link>
              <Link
                to="/hotels"
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-white hover:text-[#C9963B] transition-all"
              >
                <Hotel className="size-4" />
                <span>Hotel</span>
              </Link>
              <button
                onClick={() => alert("Train bookings coming soon!")}
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-white hover:text-[#C9963B] transition-all text-[#475569]"
              >
                <TramFront className="size-4" />
                <span>Train</span>
              </button>
              <button
                onClick={() => alert("Corporate car rentals coming soon!")}
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-white hover:text-[#C9963B] transition-all text-[#475569]"
              >
                <Car className="size-4" />
                <span>Car</span>
              </button>
              <button
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-white hover:text-[#C9963B] transition-all text-[#475569]"
              >
                <MoreHorizontal className="size-4" />
                <span>More</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative h-[290px] sm:h-[320px] md:h-[350px] w-full overflow-hidden bg-[#0A162B]">
        {/* Background Image: Luxury hotel room overlooking illuminated skyline */}
        <img
          src={hotelRoom}
          alt="Luxury Hotel Room with City View"
          className="absolute inset-0 size-full object-cover object-[center_35%] filter brightness-[0.72] contrast-[1.08] transition-transform duration-1000 ease-out hover:scale-102"
        />

        {/* Ambient Dark/Warm Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Hero Title & Subtitle */}
        <div className="relative mx-auto flex h-full max-w-[1260px] flex-col justify-center px-4 sm:px-6 pb-16">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-4 duration-500">
            <h1 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold tracking-tight text-white drop-shadow-md">
              My Trips
            </h1>
            <p className="mt-1 text-[16px] sm:text-[18px] md:text-[20px] font-normal text-white/90 drop-shadow-sm">
              Manage all your business trips in one place.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FLOATING MAIN TRIPS CONTAINER */}
      <main className="relative -mt-20 sm:-mt-24 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-[1260px] rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-7 md:p-8 shadow-[0_12px_40px_rgba(13,27,62,0.08)] border border-[#EDE8E1] animate-in fade-in slide-in-from-bottom-6 duration-600">
          {/* Top Bar inside Card: Tabs on left, New Booking on right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#F0ECE4]">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={cn(
                  "rounded-xl px-4 sm:px-5 py-2.5 text-[14px] sm:text-[15px] transition-all duration-200 cursor-pointer",
                  activeTab === "upcoming"
                    ? "border border-[#C8963B] bg-[#FDF9F0] font-semibold text-[#8A5A12] shadow-xs ring-1 ring-[#C8963B]/30"
                    : "bg-[#F3F5F8] font-medium text-[#5B6478] hover:bg-[#EAEEF4] hover:text-[#0D1B3E]",
                )}
              >
                Upcoming Trips (3)
              </button>

              <button
                onClick={() => setActiveTab("past")}
                className={cn(
                  "rounded-xl px-4 sm:px-5 py-2.5 text-[14px] sm:text-[15px] transition-all duration-200 cursor-pointer",
                  activeTab === "past"
                    ? "border border-[#C8963B] bg-[#FDF9F0] font-semibold text-[#8A5A12] shadow-xs ring-1 ring-[#C8963B]/30"
                    : "bg-[#F3F5F8] font-medium text-[#5B6478] hover:bg-[#EAEEF4] hover:text-[#0D1B3E]",
                )}
              >
                Past Trips (12)
              </button>

              <button
                onClick={() => setActiveTab("cancelled")}
                className={cn(
                  "rounded-xl px-4 sm:px-5 py-2.5 text-[14px] sm:text-[15px] transition-all duration-200 cursor-pointer",
                  activeTab === "cancelled"
                    ? "border border-[#C8963B] bg-[#FDF9F0] font-semibold text-[#8A5A12] shadow-xs ring-1 ring-[#C8963B]/30"
                    : "bg-[#F3F5F8] font-medium text-[#5B6478] hover:bg-[#EAEEF4] hover:text-[#0D1B3E]",
                )}
              >
                Cancelled Trips (2)
              </button>
            </div>

            {/* + New Booking Button */}
            <button
              onClick={() => setIsNewBookingOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#BC8732] to-[#A37123] px-5 py-2.5 text-[14px] sm:text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:from-[#AD7A27] hover:to-[#94641B] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-98 cursor-pointer"
            >
              <Plus className="size-4 stroke-[2.5]" />
              <span>New Booking</span>
            </button>
          </div>

          {/* List of Trip Cards */}
          <div className="mt-6 flex flex-col gap-4">
            {trips.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[16px] text-[#5B6478]">No trips found in this category.</p>
              </div>
            ) : (
              trips.map((trip, idx) => (
                <div
                  key={trip.id}
                  className="group relative rounded-2xl border border-[#EDE8E1] bg-white p-4 sm:p-5 transition-all duration-200 hover:border-[#D9CFBE] hover:bg-[#FDFCF9] hover:shadow-[0_8px_24px_rgba(13,27,62,0.05)] hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-3"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    {/* Left: Thumbnail & Destination Info */}
                    <div className="flex items-center gap-4 sm:gap-5 min-w-[260px] xl:min-w-[280px]">
                      {/* Thumbnail Image */}
                      <div className="relative h-[78px] w-[110px] sm:h-[82px] sm:w-[118px] shrink-0 overflow-hidden rounded-xl bg-muted shadow-xs">
                        <img
                          src={trip.image}
                          alt={trip.destination}
                          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                        />
                      </div>

                      {/* Destination & Meta */}
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Plane className="size-4 shrink-0 text-[#0D1B3E] -rotate-45" />
                          <h2 className="text-[16.5px] sm:text-[17.5px] font-bold text-[#0D1B3E] truncate">
                            {trip.destination}
                          </h2>
                        </div>
                        <div className="flex items-center gap-1.5 text-[13px] text-[#5B6478]">
                          <CalendarDays className="size-3.5 shrink-0 text-[#5B6478]" />
                          <span>{trip.dateRange}</span>
                        </div>
                        <p className="text-[12.5px] text-[#8A93A6]">
                          {trip.travellerCount} <span className="mx-1 text-[#C8CBD3]">|</span> {trip.id}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Flight Segment */}
                    <div className="flex items-center gap-3.5 min-w-[170px]">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F5F9] text-[#0D1B3E] transition-colors group-hover:bg-[#EAEFF7]">
                        <Plane className="size-4.5 -rotate-45 text-[#0D1B3E]" />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[12px] font-medium text-[#5B6478]">Flight</span>
                        <span className="text-[14px] font-bold text-[#0D1B3E]">{trip.flight.route}</span>
                        <span className="text-[12px] text-[#8A93A6]">{trip.flight.date}</span>
                      </div>
                    </div>

                    {/* Middle: Hotel Segment */}
                    <div className="flex items-center gap-3.5 min-w-[220px]">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F5F9] text-[#0D1B3E] transition-colors group-hover:bg-[#EAEFF7]">
                        <Hotel className="size-4.5 text-[#0D1B3E]" />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[12px] font-medium text-[#5B6478]">Hotel</span>
                        <span className="text-[14px] font-bold text-[#0D1B3E] truncate max-w-[200px]">
                          {trip.hotel.name}
                        </span>
                        <span className="text-[12px] text-[#8A93A6]">{trip.hotel.stayDates}</span>
                      </div>
                    </div>

                    {/* Right: Status Pill & View Details Button */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-3 sm:gap-4 shrink-0 pt-2 lg:pt-0 border-t border-[#F0ECE4] lg:border-t-0">
                      {/* Status Badge */}
                      <StatusBadge status={trip.status} />

                      {/* View Details Button */}
                      <button
                        onClick={() => setSelectedTrip(trip)}
                        className="group/btn inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#C8963B] bg-white px-4 py-2 text-[13.5px] font-semibold text-[#8A5A12] transition-all duration-200 hover:bg-[#FDF9F0] hover:border-[#AD7A27] hover:shadow-xs active:scale-97 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* 4. MODAL: DETAILED TRIP ITINERARY */}
      {selectedTrip && (
        <TripDetailsModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
      )}

      {/* 5. MODAL: NEW BOOKING CHOICE */}
      {isNewBookingOpen && (
        <NewBookingModal
          onClose={() => setIsNewBookingOpen(false)}
          onSelectFlight={() => {
            setIsNewBookingOpen(false);
            navigate({ to: "/flights" });
          }}
          onSelectHotel={() => {
            setIsNewBookingOpen(false);
            navigate({ to: "/hotels" });
          }}
        />
      )}
    </div>
  );
}

/** Status Badge helper matching the exact styles from reference image */
function StatusBadge({ status }: { status: TripStatus }) {
  switch (status) {
    case "Confirmed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#E7F7ED] px-3.5 py-1.5 text-[13px] font-semibold text-[#187D43] border border-[#BCE8CB]/60">
          <CheckCircle2 className="size-3.5 text-[#187D43] stroke-[2.5]" />
          <span>Confirmed</span>
        </span>
      );
    case "Pending Approval":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FEF4E6] px-3.5 py-1.5 text-[13px] font-semibold text-[#C96F08] border border-[#FADBA9]/70">
          <span className="flex size-2 rounded-full bg-[#C96F08]" />
          <span>Pending Approval</span>
        </span>
      );
    case "On Hold":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#EBF2FC] px-3.5 py-1.5 text-[13px] font-semibold text-[#2563EB] border border-[#BDD4FA]/70">
          <Clock4 className="size-3.5 text-[#2563EB]" />
          <span>On Hold</span>
        </span>
      );
    case "Completed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F1F3F7] px-3.5 py-1.5 text-[13px] font-semibold text-[#475569] border border-[#E2E8F0]">
          <CheckCircle2 className="size-3.5 text-[#475569]" />
          <span>Completed</span>
        </span>
      );
    case "Cancelled":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FEECEC] px-3.5 py-1.5 text-[13px] font-semibold text-[#DC2626] border border-[#FECACA]">
          <X className="size-3.5 text-[#DC2626]" />
          <span>Cancelled</span>
        </span>
      );
  }
}

/** Comprehensive Itinerary Modal with Flight & Hotel breakdown */
function TripDetailsModal({ trip, onClose }: { trip: TripItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-white shadow-2xl border border-[#EDE8E1] p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full bg-[#F3F5F8] text-[#5B6478] hover:bg-[#E6EAF0] hover:text-[#0D1B3E] transition-colors"
          aria-label="Close details"
        >
          <X className="size-4.5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 pb-5 border-b border-[#F0ECE4]">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl shadow-xs">
            <img src={trip.image} alt={trip.destination} className="size-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0D1B3E]">{trip.destination}</h2>
              <StatusBadge status={trip.status} />
            </div>
            <p className="text-[13px] text-[#5B6478] mt-0.5">
              Trip ID: <span className="font-semibold text-[#0D1B3E]">{trip.id}</span> • {trip.dateRange} • {trip.travellerCount}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="mt-6 space-y-6">
          {/* Flight Details Section */}
          <div className="rounded-2xl border border-[#E9E4DC] bg-[#FAF8F5] p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE6DC]">
              <div className="flex items-center gap-2 text-[#0D1B3E] font-bold text-[15px]">
                <Plane className="size-4 -rotate-45 text-[#BC8732]" />
                <span>Flight Itinerary</span>
              </div>
              <span className="text-[12.5px] font-semibold text-[#8A5A12] bg-[#FDF9F0] px-2.5 py-1 rounded-md border border-[#E8D1A8]">
                {trip.flight.cabin}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
              <div>
                <span className="text-[#8A93A6] block text-[11.5px]">Flight</span>
                <span className="font-bold text-[#0D1B3E]">{trip.flight.flightNumber}</span>
                <span className="text-[#5B6478] block text-[11.5px]">{trip.flight.airline}</span>
              </div>
              <div>
                <span className="text-[#8A93A6] block text-[11.5px]">Route</span>
                <span className="font-bold text-[#0D1B3E]">{trip.flight.route}</span>
                <span className="text-[#5B6478] block text-[11.5px]">{trip.flight.date}</span>
              </div>
              <div>
                <span className="text-[#8A93A6] block text-[11.5px]">Schedule</span>
                <span className="font-medium text-[#0D1B3E]">{trip.flight.departTime}</span>
                <span className="text-[#5B6478] block text-[11.5px]">Arr: {trip.flight.arriveTime}</span>
              </div>
              <div>
                <span className="text-[#8A93A6] block text-[11.5px]">Seat & Gate</span>
                <span className="font-bold text-[#BC8732]">{trip.flight.seat}</span>
                <span className="text-[#5B6478] block text-[11.5px]">{trip.flight.terminal} • {trip.flight.gate}</span>
              </div>
            </div>
          </div>

          {/* Hotel Details Section */}
          <div className="rounded-2xl border border-[#E9E4DC] bg-[#FAF8F5] p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE6DC]">
              <div className="flex items-center gap-2 text-[#0D1B3E] font-bold text-[15px]">
                <Hotel className="size-4 text-[#BC8732]" />
                <span>Hotel Reservation</span>
              </div>
              <span className="text-[12px] text-[#5B6478]">
                Conf #{trip.hotel.confirmationCode}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-[13px]">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[14.5px] text-[#0D1B3E]">{trip.hotel.name}</span>
                <span className="text-[#8A5A12] font-semibold text-[13px]">{trip.hotel.stayDates}</span>
              </div>
              <p className="text-[#5B6478] text-[12.5px]">{trip.hotel.roomType}</p>
              <p className="text-[#8A93A6] text-[12px] flex items-center gap-1">
                <MapPin className="size-3.5 shrink-0" />
                {trip.hotel.address}
              </p>
              <div className="pt-2 flex gap-6 text-[12px] text-[#5B6478]">
                <span>Check-in: <strong className="text-[#0D1B3E]">{trip.hotel.checkIn}</strong></span>
                <span>Check-out: <strong className="text-[#0D1B3E]">{trip.hotel.checkOut}</strong></span>
              </div>
            </div>
          </div>

          {/* Corporate Compliance & Fare summary */}
          <div className="rounded-xl bg-[#F4F6F9] p-4 flex items-start gap-3">
            <Info className="size-4.5 text-[#1E88E5] shrink-0 mt-0.5" />
            <div className="text-[12.5px]">
              <span className="font-semibold text-[#0D1B3E] block">Corporate Travel Policy Notes:</span>
              <p className="text-[#5B6478] mt-0.5">{trip.policyNote}</p>
              <div className="mt-2 font-semibold text-[#0D1B3E]">
                Total Corporate Fare: <span className="text-[#BC8732] font-bold">{trip.amount}</span> (Company Billed)
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => alert(`Downloading E-Ticket and Voucher for ${trip.id}...`)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#BC8732] text-white py-2.5 px-4 text-[14px] font-semibold hover:bg-[#A37123] transition-colors"
            >
              <FileDown className="size-4" />
              <span>Download E-Ticket & Voucher</span>
            </button>
            <button
              onClick={() => alert(`Added ${trip.destination} to calendar.`)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9CFBE] bg-white text-[#0D1B3E] py-2.5 px-4 text-[14px] font-semibold hover:bg-[#F8F6F2] transition-colors"
            >
              <Calendar className="size-4 text-[#5B6478]" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Quick New Booking Modal */
function NewBookingModal({
  onClose,
  onSelectFlight,
  onSelectHotel,
}: {
  onClose: () => void;
  onSelectFlight: () => void;
  onSelectHotel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-[24px] bg-white shadow-2xl border border-[#EDE8E1] p-6 sm:p-7 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-[#F3F5F8] text-[#5B6478] hover:bg-[#E6EAF0] transition-colors"
        >
          <X className="size-4" />
        </button>

        <h2 className="text-[20px] font-bold text-[#0D1B3E]">Start a New Booking</h2>
        <p className="mt-1 text-[13px] text-[#5B6478]">
          Choose what you want to book for your next corporate business trip:
        </p>

        <div className="mt-5 space-y-3">
          <button
            onClick={onSelectFlight}
            className="group flex w-full items-center gap-4 rounded-xl border border-[#EDE8E1] p-4 text-left transition-all hover:border-[#BC8732] hover:bg-[#FCF9F2] hover:shadow-sm"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FEF8ED] to-[#FDF1D8] text-[#B8842F] border border-[#FBE6C4]/60">
              <Plane className="size-5 -rotate-45" />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-bold text-[#0D1B3E] group-hover:text-[#8A5A12] transition-colors">
                Book a Flight
              </h3>
              <p className="text-[12px] text-[#5B6478]">
                Domestic & international corporate flights with policy-checked fares.
              </p>
            </div>
            <ArrowRight className="size-4 text-[#8A93A6] group-hover:translate-x-1 group-hover:text-[#BC8732] transition-all" />
          </button>

          <button
            onClick={onSelectHotel}
            className="group flex w-full items-center gap-4 rounded-xl border border-[#EDE8E1] p-4 text-left transition-all hover:border-[#BC8732] hover:bg-[#FCF9F2] hover:shadow-sm"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FEF8ED] to-[#FDF1D8] text-[#B8842F] border border-[#FBE6C4]/60">
              <Hotel className="size-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-bold text-[#0D1B3E] group-hover:text-[#8A5A12] transition-colors">
                Book a Hotel
              </h3>
              <p className="text-[12px] text-[#5B6478]">
                Preferred company rates, luxury suites & business-ready amenities.
              </p>
            </div>
            <ArrowRight className="size-4 text-[#8A93A6] group-hover:translate-x-1 group-hover:text-[#BC8732] transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
}

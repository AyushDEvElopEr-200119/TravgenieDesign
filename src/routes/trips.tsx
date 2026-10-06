import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowRight,
  Bell,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Clock4,
  Coffee,
  Dumbbell,
  ExternalLink,
  FileDown,
  FileText,
  Headphones,
  Hotel,
  Info,
  MapPin,
  MoreHorizontal,
  PauseCircle,
  Plane,
  Plus,
  ShieldCheck,
  Star,
  Timer,
  Ticket,
  TicketCheck,
  TramFront,
  Car,
  Utensils,
  User,
  Waves,
  Wifi,
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
import airplaneSunset from "@/assets/airplane-sunset.jpg";

export const Route = createFileRoute("/trips")({
  validateSearch: (search: Record<string, unknown>) => ({
    ticket: typeof search.ticket === "string" ? search.ticket : undefined,
    view: search.view === "hotel" ? ("hotel" as const) : ("flight" as const),
    view: search.view === "hotel" ? ("hotel" as const) : ("flight" as const),
  }),
  head: () => ({
    meta: [
      { title: "My Trips | TravGenie — Corporate Business Travel" },
      {
        name: "description",
        content:
          "Manage all your corporate business trips, flights, and hotel bookings in one place.",
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
type FlightTripType = "one-way" | "round-trip" | "multi-city";

interface FlightLeg {
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
  bookingDate?: string;
  ticketIssueDate?: string;
  ticketNumber?: string;
  frequentFlyerNumber?: string;
  baggageAllowance?: string;
  cabinBaggage?: string;
  meal?: string;
  duration?: string;
}

interface HotelStay {
  name: string;
  image?: string;
  stayDates: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  address: string;
  confirmationCode: string;
  voucherId?: string;
  propertyBrand?: string;
  rating?: number;
  guestCount?: string;
  nights: number;
  roomRate: number;
  taxes: number;
  amenities?: string[];
  cancellationPolicy?: string;
  bookingDate?: string;
  voucherIssuedDate?: string;
}

interface TripItem {
  id: string;
  destination: string;
  dateRange: string;
  travellerCount: string;
  image: string;
  flight: {
    tripType: FlightTripType;
    additionalLegs?: FlightLeg[];
  } & FlightLeg;
  hotel: HotelStay & { additionalStays?: HotelStay[] };
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
      tripType: "round-trip",
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
      bookingDate: "05 Nov 2026",
      ticketIssueDate: "05 Nov 2026",
      additionalLegs: [
        {
          route: "DXB → MCT",
          date: "15 Nov 2026",
          airline: "Oman Air",
          flightNumber: "WY 612",
          departTime: "06:30 PM (DXB)",
          arriveTime: "07:45 PM (MCT)",
          seat: "12A",
          terminal: "Terminal 1",
          gate: "Gate A06",
          cabin: "Business Class",
        },
      ],
    },
    hotel: {
      name: "Rove Downtown Dubai",
      image: hotelDowntown,
      stayDates: "12 Nov – 15 Nov 2026",
      roomType: "Standard Room (1 King Bed)",
      checkIn: "12 Nov 2026, 3:00 PM",
      checkOut: "15 Nov 2026, 12:00 PM",
      address: "312 Al Mustaqbal Street, Downtown Dubai, Dubai, UAE",
      confirmationCode: "RD-998241",
      voucherId: "HTG24874",
      propertyBrand: "ROVE HOTELS",
      rating: 5,
      guestCount: "1 Adult",
      nights: 3,
      roomRate: 210,
      taxes: 36,
      amenities: ["Free Wi-Fi", "Breakfast", "Fitness Centre", "Swimming Pool", "24/7 Front Desk"],
      cancellationPolicy:
        "Free cancellation until 10 Nov 2026, 3:00 PM (local time). After this time, a one-night charge may apply as per hotel policy.",
      bookingDate: "05 Nov 2026",
      voucherIssuedDate: "05 Nov 2026",
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
      tripType: "one-way",
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
      image: hotelRoom,
      stayDates: "03 Dec – 06 Dec 2026",
      roomType: "Deluxe King Room",
      checkIn: "03 Dec 2026, 2:00 PM",
      checkOut: "06 Dec 2026, 12:00 PM",
      address: "41/3, Mahatma Gandhi Rd, Yellappa Garden, Bengaluru",
      confirmationCode: "TAJ-771249",
      nights: 3,
      roomRate: 145,
      taxes: 42,
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
      tripType: "multi-city",
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
      additionalLegs: [
        {
          route: "LHR → CDG",
          date: "11 Jan 2027",
          airline: "British Airways",
          flightNumber: "BA 304",
          departTime: "10:30 AM (LHR)",
          arriveTime: "12:50 PM (CDG)",
          seat: "18A",
          terminal: "Terminal 5",
          gate: "Gate B12",
          cabin: "Club Europe",
        },
        {
          route: "CDG → MCT",
          date: "12 Jan 2027",
          airline: "British Airways",
          flightNumber: "BA 78",
          departTime: "03:15 PM (CDG)",
          arriveTime: "12:10 AM (+1) (MCT)",
          seat: "18A",
          terminal: "Terminal 2E",
          gate: "Gate K18",
          cabin: "Club World",
        },
      ],
    },
    hotel: {
      name: "Hilton London",
      image: hotelDowntown,
      stayDates: "10 Jan – 11 Jan 2027",
      roomType: "Executive Queen Room",
      checkIn: "10 Jan 2027, 3:00 PM",
      checkOut: "11 Jan 2027, 11:00 AM",
      address: "22 Park Ln, Mayfair, London W1K 1BE, UK",
      confirmationCode: "HL-443901",
      nights: 1,
      roomRate: 240,
      taxes: 30,
      additionalStays: [
        {
          name: "Hotel Le Marais",
          image: hotelCreek,
          stayDates: "11 Jan – 12 Jan 2027",
          roomType: "Superior Double",
          checkIn: "11 Jan 2027, 3:00 PM",
          checkOut: "12 Jan 2027, 11:00 AM",
          address: "Rue de Turenne, 75003 Paris, France",
          confirmationCode: "HLM-551027",
          nights: 1,
          roomRate: 180,
          taxes: 24,
        },
      ],
    },
    status: "On Hold",
    policyNote: "Held for 24h at locked corporate tariff. Auto-confirms upon ticketing.",
    amount: "USD 1,280",
  },
  {
    id: "TG264878",
    destination: "Singapore",
    dateRange: "18 Feb 2027 – 22 Feb 2027",
    travellerCount: "1 Traveller",
    image: hotelDowntown,
    flight: {
      tripType: "round-trip",
      route: "MCT → SIN",
      date: "18 Feb 2027",
      airline: "Singapore Airlines",
      flightNumber: "SQ 491",
      departTime: "09:20 AM (MCT)",
      arriveTime: "08:15 PM (SIN)",
      seat: "16A",
      terminal: "Terminal 3",
      gate: "Gate B04",
      cabin: "Economy Class",
      additionalLegs: [
        {
          route: "SIN → MCT",
          date: "22 Feb 2027",
          airline: "Singapore Airlines",
          flightNumber: "SQ 492",
          departTime: "10:30 AM (SIN)",
          arriveTime: "01:45 PM (MCT)",
          seat: "16A",
          terminal: "Terminal 3",
          gate: "Gate C12",
          cabin: "Economy Class",
        },
      ],
    },
    hotel: {
      name: "Marina Bay Business Hotel",
      image: hotelDowntown,
      stayDates: "18 Feb – 22 Feb 2027",
      roomType: "Business King Room",
      checkIn: "18 Feb 2027, 3:00 PM",
      checkOut: "22 Feb 2027, 11:00 AM",
      address: "Marina Bay, Singapore",
      confirmationCode: "MBB-202718",
      nights: 4,
      roomRate: 240,
      taxes: 64,
    },
    status: "Confirmed",
    policyNote: "Round-trip flight and hotel stay confirmed within company policy.",
    amount: "USD 1,024",
  },
  {
    id: "TG264879",
    destination: "Abu Dhabi & Bangkok",
    dateRange: "08 Mar 2027 – 14 Mar 2027",
    travellerCount: "1 Traveller",
    image: dubaiSkyline,
    flight: {
      tripType: "multi-city",
      route: "MCT → AUH",
      date: "08 Mar 2027",
      airline: "Etihad Airways",
      flightNumber: "EY 387",
      departTime: "09:00 AM (MCT)",
      arriveTime: "10:10 AM (AUH)",
      seat: "14A",
      terminal: "Terminal 1",
      gate: "Gate A08",
      cabin: "Business Class",
      additionalLegs: [
        {
          route: "AUH → BKK",
          date: "11 Mar 2027",
          airline: "Etihad Airways",
          flightNumber: "EY 406",
          departTime: "09:30 AM (AUH)",
          arriveTime: "06:15 PM (BKK)",
          seat: "14A",
          terminal: "Terminal A",
          gate: "Gate C22",
          cabin: "Business Class",
        },
        {
          route: "BKK → MCT",
          date: "14 Mar 2027",
          airline: "Etihad Airways",
          flightNumber: "EY 405",
          departTime: "08:00 PM (BKK)",
          arriveTime: "11:20 PM (MCT)",
          seat: "14A",
          terminal: "Terminal 1",
          gate: "Gate D11",
          cabin: "Business Class",
        },
      ],
    },
    hotel: {
      name: "Grand Millennium Al Wahda",
      image: hotelRoom,
      stayDates: "08 Mar – 11 Mar 2027",
      roomType: "Club Room",
      checkIn: "08 Mar 2027, 3:00 PM",
      checkOut: "11 Mar 2027, 11:00 AM",
      address: "Hazza Bin Zayed Street, Abu Dhabi, UAE",
      confirmationCode: "GMA-30827",
      nights: 3,
      roomRate: 220,
      taxes: 48,
      additionalStays: [
        {
          name: "Bangkok Marriott Hotel Sukhumvit",
          image: hotelCreek,
          stayDates: "11 Mar – 14 Mar 2027",
          roomType: "Deluxe City View",
          checkIn: "11 Mar 2027, 3:00 PM",
          checkOut: "14 Mar 2027, 11:00 AM",
          address: "Sukhumvit Road, Bangkok, Thailand",
          confirmationCode: "BMS-31127",
          nights: 3,
          roomRate: 190,
          taxes: 42,
        },
      ],
    },
    status: "Confirmed",
    policyNote: "Multi-city itinerary with two hotel stays confirmed within policy.",
    amount: "USD 1,400",
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
      tripType: "round-trip",
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
      image: hotelDowntown,
      stayDates: "14 Aug – 18 Aug 2026",
      roomType: "Deluxe King Bay View",
      checkIn: "14 Aug 2026, 3:00 PM",
      checkOut: "18 Aug 2026, 11:00 AM",
      address: "10 Bayfront Ave, Singapore 018956",
      confirmationCode: "MBS-893120",
      nights: 4,
      roomRate: 300,
      taxes: 80,
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
      tripType: "one-way",
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
      image: hotelCreek,
      stayDates: "02 Jul – 07 Jul 2026",
      roomType: "Superior Double",
      checkIn: "03 Jul 2026, 2:00 PM",
      checkOut: "07 Jul 2026, 12:00 PM",
      address: "Rue de Turenne, 75003 Paris, France",
      confirmationCode: "HLM-31902",
      nights: 5,
      roomRate: 150,
      taxes: 50,
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
      tripType: "one-way",
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
      image: hotelRoom,
      stayDates: "15 Sep – 18 Sep 2026",
      roomType: "Spectacular Room",
      checkIn: "15 Sep 2026, 3:00 PM",
      checkOut: "18 Sep 2026, 12:00 PM",
      address: "West Bay, Doha, Qatar",
      confirmationCode: "WD-110294",
      nights: 3,
      roomRate: 80,
      taxes: 45,
    },
    status: "Cancelled",
    policyNote: "Meeting rescheduled by client. Full credit voucher issued.",
    amount: "USD 320",
  },
];

function getFlightCardSummary(flight: TripItem["flight"]) {
  const routes = [flight.route, ...(flight.additionalLegs ?? []).map((leg) => leg.route)];
  const stops = routes.map((route) => route.split(" → "));
  const cities = stops.length
    ? [stops[0][0], ...stops.map((route) => route[1])].filter((city): city is string =>
        Boolean(city),
      )
    : [];

  return {
    label:
      flight.tripType === "round-trip"
        ? "Round Trip"
        : flight.tripType === "multi-city"
          ? `Multi-city · ${routes.length} flights`
          : "One Way",
    route:
      flight.tripType === "round-trip" && cities.length > 1
        ? `${cities[0]} ↔ ${cities[1]}`
        : flight.tripType === "multi-city"
          ? cities.join(" → ")
          : flight.route,
  };
}

export function MyTripsPage() {
  const { ticket, view } = Route.useSearch();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const navigate = useNavigate();
  const allTrips = [...upcomingTripsList, ...pastTripsList, ...cancelledTripsList];
  const selectedTrip = allTrips.find((trip) => trip.id === ticket);

  if (ticket) {
    return selectedTrip ? (
      <TripDetailsPage
        trip={selectedTrip}
        view={view}
        onViewChange={(nextView) =>
          navigate({ to: "/trips", search: { ticket: selectedTrip.id, view: nextView } })
        }
        onBack={() => navigate({ to: "/trips", search: { ticket: undefined, view: "flight" } })}
      />
    ) : (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F6F4F0] p-6 text-center">
        <h1 className="text-2xl font-bold text-[#0D1B3E]">Trip not found</h1>
        <p className="text-sm text-[#5B6478]">
          This trip may have been removed or the link is invalid.
        </p>
        <button
          onClick={() => navigate({ to: "/trips", search: { ticket: undefined, view: "flight" } })}
          className="rounded-xl bg-[#BC8732] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#A37123]"
        >
          Back to My Trips
        </button>
      </main>
    );
  }

  const trips =
    activeTab === "upcoming"
      ? upcomingTripsList
      : activeTab === "past"
        ? pastTripsList
        : cancelledTripsList;

  return (
    <div className="min-h-screen bg-[#F6F4F0] font-sans antialiased text-[#0D1B3E]">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EBE7DF]/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex max-w-[1340px] items-center justify-between px-4 sm:px-6 h-[72px]">
          {/* Logo */}
          <Link
            to="/dashboard"
            search={{ variant: "A" }}
            aria-label="TravGenie home"
            className="transition-opacity hover:opacity-90"
          >
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
              <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-white hover:text-[#C9963B] transition-all text-[#475569]">
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
          {/* Top Bar inside Card: Trip status tabs on left, New Booking on right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#F0ECE4]">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setActiveTab("upcoming")}
                aria-pressed={activeTab === "upcoming"}
                className={cn(
                  "rounded-xl px-4 sm:px-5 py-2.5 text-[14px] sm:text-[15px] transition-all duration-200 cursor-pointer",
                  activeTab === "upcoming"
                    ? "border border-[#C8963B] bg-[#FDF9F0] font-semibold text-[#8A5A12] shadow-xs ring-1 ring-[#C8963B]/30"
                    : "bg-[#F3F5F8] font-medium text-[#5B6478] hover:bg-[#EAEEF4] hover:text-[#0D1B3E]",
                )}
              >
                Upcoming Trips ({upcomingTripsList.length})
              </button>

              <button
                onClick={() => setActiveTab("past")}
                aria-pressed={activeTab === "past"}
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
                aria-pressed={activeTab === "cancelled"}
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
                          loading="eager"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = hotelRoom;
                          }}
                          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                        />
                      </div>

                      {/* Destination & Meta */}
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Plane className="size-4 shrink-0 -rotate-45 text-[#0D1B3E]" />
                          <h2 className="text-[16.5px] sm:text-[17.5px] font-bold text-[#0D1B3E] truncate">
                            {trip.destination}
                          </h2>
                        </div>
                        <div className="flex items-center gap-1.5 text-[13px] text-[#5B6478]">
                          <CalendarDays className="size-3.5 shrink-0 text-[#5B6478]" />
                          <span>{trip.dateRange}</span>
                        </div>
                        <p className="text-[12.5px] text-[#8A93A6]">
                          {trip.travellerCount} <span className="mx-1 text-[#C8CBD3]">|</span>{" "}
                          {trip.id}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Flight Segment */}
                    <div className="flex items-center gap-3.5 min-w-[170px]">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F5F9] text-[#0D1B3E] transition-colors group-hover:bg-[#EAEFF7]">
                        <Plane className="size-4.5 -rotate-45 text-[#0D1B3E]" />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[12px] font-medium text-[#5B6478]">
                          {getFlightCardSummary(trip.flight).label}
                        </span>
                        <span className="text-[14px] font-bold text-[#0D1B3E]">
                          {getFlightCardSummary(trip.flight).route}
                        </span>
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
                          {trip.hotel.additionalStays?.length
                            ? `${trip.hotel.additionalStays.length + 1} Hotel Stays`
                            : trip.hotel.name}
                        </span>
                        <span className="text-[12px] text-[#8A93A6]">
                          {trip.hotel.additionalStays?.length
                            ? trip.dateRange
                            : trip.hotel.stayDates}
                        </span>
                      </div>
                    </div>

                    {/* Right: Status Pill & View Details Button */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-3 sm:gap-4 shrink-0 pt-2 lg:pt-0 border-t border-[#F0ECE4] lg:border-t-0">
                      {/* Status Badge */}
                      <StatusBadge status={trip.status} />

                      {/* View Details Button */}
                      <button
                        onClick={() =>
                          navigate({
                            to: "/trips",
                            search: { ticket: trip.id, view: "flight" },
                          })
                        }
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

/** Standalone page for a trip itinerary and hotel voucher. */
function TripDetailsPage({
  trip,
  view,
  onBack,
  onViewChange,
}: {
  trip: TripItem;
  view: "flight" | "hotel";
  onBack: () => void;
  onViewChange: (view: "flight" | "hotel") => void;
}) {
  const tripTypeLabel =
    trip.flight.tripType === "one-way"
      ? "One Way"
      : trip.flight.tripType === "round-trip"
        ? "Round Trip"
        : "Multi-city";
  const flightSegments = [
    {
      ...trip.flight,
      label:
        trip.flight.tripType === "one-way"
          ? "One Way"
          : trip.flight.tripType === "round-trip"
            ? "Outbound"
            : "Segment 1",
    },
    ...(trip.flight.additionalLegs ?? []).map((segment, index) => ({
      ...segment,
      label: trip.flight.tripType === "round-trip" ? "Return" : `Segment ${index + 2}`,
    })),
  ];
  const handleDownload = () => {
    const previousTitle = document.title;
    const cleanup = () => {
      document.body.classList.remove("trip-voucher-printing");
      document.title = previousTitle;
    };

    document.title = `TravGenie-${trip.id}-${view === "flight" ? "E-Ticket" : "Hotel-Voucher"}`;
    document.body.classList.add("trip-voucher-printing");
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#F2F5FA] px-1 py-4 sm:px-2 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <div className="not-print mb-4 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="rounded-lg border border-[#D6DFEA] bg-white px-4 py-2 text-sm font-semibold text-[#203858] transition-colors hover:bg-[#F7FAFE]"
          >
            Back to My Trips
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onViewChange("flight")}
              aria-pressed={view === "flight"}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                view === "flight"
                  ? "bg-[#17396B] text-white"
                  : "border border-[#D6DFEA] bg-white text-[#203858] hover:bg-[#F7FAFE]",
              )}
            >
              Flight E-ticket
            </button>
            <button
              onClick={() => onViewChange("hotel")}
              aria-pressed={view === "hotel"}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                view === "hotel"
                  ? "bg-[#17396B] text-white"
                  : "border border-[#D6DFEA] bg-white text-[#203858] hover:bg-[#F7FAFE]",
              )}
            >
              Hotel Voucher
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg bg-[#BC8732] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#A37123]"
            >
              <FileDown className="size-4" />
              <span>Download / Save PDF</span>
            </button>
          </div>
        </div>

        <article className="trip-ticket-print mx-auto max-w-4xl overflow-hidden rounded-xl border border-[#DCE5F0] bg-white text-[#122343] shadow-[0_12px_40px_rgba(13,27,62,0.10)]">
          {view === "flight" ? (
            <FlightVoucher
              trip={trip}
              flightSegments={flightSegments}
              tripTypeLabel={tripTypeLabel}
            />
          ) : (
            <HotelVoucher trip={trip} />
          )}
        </article>
      </div>
    </main>
  );
}

const airportDetails: Record<
  string,
  { city: string; country: string; airport: string; image?: string }
> = {
  AUH: { city: "Abu Dhabi", country: "UAE", airport: "Zayed International Airport" },
  BKK: { city: "Bangkok", country: "Thailand", airport: "Suvarnabhumi Airport" },
  CDG: { city: "Paris", country: "France", airport: "Charles de Gaulle Airport" },
  DOH: { city: "Doha", country: "Qatar", airport: "Hamad International Airport" },
  BLR: {
    city: "Bangalore",
    country: "India",
    airport: "Kempegowda International Airport",
    image: bangalorePalace,
  },
  DXB: {
    city: "Dubai",
    country: "UAE",
    airport: "Dubai International Airport",
    image: dubaiSkyline,
  },
  LHR: {
    city: "London",
    country: "United Kingdom",
    airport: "Heathrow Airport",
    image: londonBigben,
  },
  MCT: { city: "Muscat", country: "Oman", airport: "Muscat International Airport" },
  SIN: { city: "Singapore", country: "Singapore", airport: "Singapore Changi Airport" },
};

function FlightVoucher({
  trip,
  flightSegments,
  tripTypeLabel,
}: {
  trip: TripItem;
  flightSegments: Array<FlightLeg & { label: string }>;
  tripTypeLabel: string;
}) {
  const [bookingUrl, setBookingUrl] = useState(trip.id);
  const firstSegment = flightSegments[0];
  const seats = flightSegments.map((segment) => segment.seat).join(" / ");

  useEffect(() => {
    const bookingPath = `/trips?ticket=${encodeURIComponent(trip.id)}&view=flight`;
    setBookingUrl(new URL(bookingPath, window.location.origin).toString());
  }, [trip.id]);

  return (
    <>
      <header className="flex items-center justify-between gap-3 border-b border-[#E7ECF3] px-4 py-2.5 sm:px-8">
        <Logo width={205} />
        <p className="text-right text-[9px] leading-relaxed text-[#52647E] sm:text-[10px]">
          A product by
          <br />
          <strong>Misba Travel World</strong>
        </p>
      </header>

      <section className="relative flex min-h-[135px] items-center overflow-hidden bg-[#143565] px-5 py-4 sm:min-h-[160px] sm:px-8">
        <img
          src={airplaneSunset}
          alt=""
          className="absolute inset-0 size-full object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#092756]/90 via-[#12386B]/55 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            E-TICKET
          </h1>
          <p className="mt-0.5 text-2xl font-bold leading-tight text-white sm:text-3xl">
            {tripTypeLabel}
          </p>
          <p className="mt-1 text-xs text-white/90 sm:text-sm">
            {trip.flight.tripType === "round-trip"
              ? "Two Ways. One Seamless Journey."
              : trip.flight.tripType === "multi-city"
                ? "Multiple Destinations. One Booking."
                : "Your Journey. Our Support."}
          </p>
        </div>
      </section>

      <div className="space-y-2 px-3 py-2 sm:space-y-2.5 sm:px-6 sm:py-3">
        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#DCE5F0] bg-[#DCE5F0] sm:grid-cols-4">
          {[
            { label: "Booking ID", value: trip.id, icon: <Building2 className="size-5" /> },
            {
              label: "Booking Date",
              value: firstSegment.bookingDate ?? "Not provided",
              icon: <CalendarDays className="size-5" />,
            },
            {
              label: "Booking Status",
              value: trip.status,
              icon: <CheckCircle2 className="size-5 text-[#319968]" />,
            },
            {
              label: "Ticket Issue Date",
              value: firstSegment.ticketIssueDate ?? "Not provided",
              icon: <TicketCheck className="size-5" />,
            },
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex items-center gap-2 bg-white px-2 py-2 sm:px-3">
              <span className="shrink-0 text-[#153765]">{icon}</span>
              <div className="min-w-0">
                <p className="text-[9px] text-[#718096]">{label}</p>
                <p className="truncate text-[11px] font-bold text-[#13294B] sm:text-xs">{value}</p>
              </div>
            </div>
          ))}
        </section>

        <section>
          <TicketSectionHeading icon={<User className="size-4" />} title="Traveller Details" />
          <div className="mt-1 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[#DCE5F0] bg-[#DCE5F0] sm:grid-cols-5">
            {[
              ["Name", "Azim Robario"],
              ["Employee ID", "EMP001"],
              ["Department", "Management"],
              ["Company", "DCB Bank"],
              ["Traveller Type", "Adult"],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#F1F6FD] px-2.5 py-1.5">
                <p className="text-[9px] text-[#718096]">{label}</p>
                <p className="mt-0.5 text-[10px] font-semibold text-[#172B4D]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <TicketSectionHeading
            icon={<Plane className="size-4 -rotate-45" />}
            title={trip.flight.tripType === "one-way" ? "Flight Details" : "Flight Itinerary"}
          />
          <div className="mt-1 space-y-2">
            {flightSegments.map((segment, index) => {
              const [originCode, destinationCode] = segment.route.split(" → ");
              const origin = airportDetails[originCode] ?? {
                city: originCode,
                country: "",
                airport: `${originCode} Airport`,
              };
              const destination = airportDetails[destinationCode] ?? {
                city: destinationCode,
                country: "",
                airport: `${destinationCode} Airport`,
              };
              return (
                <div
                  key={`${segment.flightNumber}-${segment.date}`}
                  className="overflow-hidden rounded-md border border-[#DCE5F0]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-[#B7D0EC] px-2 py-1.5">
                    <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-bold text-[#13294B] sm:text-xs">
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm bg-[#17396B] text-white">
                        {index + 1}
                      </span>
                      <span className="rounded-sm bg-[#17396B] px-2 py-1 text-white">
                        {segment.label}
                      </span>
                      <span className="truncate">
                        {origin.city} ({originCode}) <span className="px-1">→</span>
                        {destination.city} ({destinationCode})
                      </span>
                    </div>
                    <span className="text-[9px] font-medium text-[#405776]">{segment.date}</span>
                  </div>
                  <div className="grid grid-cols-[1fr_0.7fr_1fr] gap-2 p-2 sm:grid-cols-[1fr_0.7fr_1fr_0.9fr] sm:gap-3">
                    <FlightVoucherAirport
                      code={originCode}
                      city={origin.city}
                      country={origin.country}
                      airport={origin.airport}
                      time={segment.departTime}
                      terminal={segment.terminal}
                      image={origin.image}
                    />
                    <div className="flex flex-col items-center justify-center text-center text-[#52647E]">
                      <div className="flex w-full items-center gap-1">
                        <span className="h-px flex-1 border-t border-dotted border-[#6C7E9B]" />
                        <Plane className="size-5 -rotate-45 text-[#17396B]" />
                        <span className="h-px flex-1 border-t border-dotted border-[#6C7E9B]" />
                      </div>
                      <p className="mt-1 text-[9px] font-semibold">
                        {segment.duration ?? "Duration not listed"}
                      </p>
                      <p className="text-[8px]">Stops not listed</p>
                    </div>
                    <FlightVoucherAirport
                      code={destinationCode}
                      city={destination.city}
                      country={destination.country}
                      airport={destination.airport}
                      time={segment.arriveTime}
                      terminal={segment.terminal}
                      image={destination.image}
                    />
                    <div className="col-span-3 border-t border-[#E7ECF3] pt-2 text-[9px] leading-relaxed text-[#52647E] sm:col-span-1 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
                      <p className="text-center text-xs font-bold text-[#B3302D] sm:mb-1">
                        {segment.airline}
                      </p>
                      <p>Flight No: {segment.flightNumber}</p>
                      <p>Class: {segment.cabin}</p>
                      <p>Seat: {segment.seat}</p>
                      <p>PNR: {trip.id}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-1 sm:grid-cols-4">
          {[
            {
              icon: <BriefcaseBusiness className="size-5" />,
              title: "Baggage Allowance",
              detail: `${firstSegment.baggageAllowance ?? "Check-in: As per airline"}${firstSegment.cabinBaggage ? ` · Cabin: ${firstSegment.cabinBaggage}` : ""}`,
            },
            {
              icon: <Utensils className="size-5" />,
              title: "Meal",
              detail: firstSegment.meal ?? "As per airline",
            },
            {
              icon: <TicketCheck className="size-5" />,
              title: flightSegments.length > 1 ? "Seats" : "Seat",
              detail: `${seats} (Confirmed)`,
            },
            {
              icon: <Timer className="size-5" />,
              title:
                trip.flight.tripType === "round-trip" ? "Total Journey Time" : "Flight Duration",
              detail: firstSegment.duration ?? "Refer to airline itinerary",
            },
          ].map(({ icon, title, detail }) => (
            <div
              key={title}
              className="flex min-h-14 items-center gap-2 rounded-md border border-[#DCE5F0] bg-[#F7FAFE] px-2 py-2"
            >
              <span className="shrink-0 text-[#17396B]">{icon}</span>
              <span className="min-w-0">
                <strong className="block text-[9px] text-[#52647E]">{title}</strong>
                <span className="block text-[9px] font-semibold leading-tight text-[#203858]">
                  {detail}
                </span>
              </span>
            </div>
          ))}
        </section>

        <section>
          <TicketSectionHeading icon={<User className="size-4" />} title="Passenger(s)" />
          <div className="mt-1 overflow-x-auto rounded-md border border-[#DCE5F0]">
            <table className="w-full min-w-[540px] text-left text-[9px]">
              <thead className="bg-[#F1F6FD] text-[#52647E]">
                <tr>
                  {["#", "Name", "Type", "Ticket Number", "Frequent Flyer No.", "Seat"].map(
                    (heading) => (
                      <th key={heading} className="px-2 py-1.5 font-semibold">
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#E7ECF3] text-[#203858]">
                  <td className="px-2 py-1.5">1</td>
                  <td className="px-2 py-1.5 font-semibold">Azim Robario</td>
                  <td className="px-2 py-1.5">Adult</td>
                  <td className="px-2 py-1.5">{firstSegment.ticketNumber ?? "Not provided"}</td>
                  <td className="px-2 py-1.5">
                    {firstSegment.frequentFlyerNumber ?? "Not provided"}
                  </td>
                  <td className="px-2 py-1.5">{seats}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <TicketSectionHeading
            icon={<BriefcaseBusiness className="size-4" />}
            title={
              flightSegments.length > 1
                ? "Fare Details (Separate Fares for Each Sector)"
                : `Fare Details (${tripTypeLabel})`
            }
          />
          <div className="mt-1 overflow-x-auto rounded-md border border-[#DCE5F0]">
            <table className="w-full min-w-[600px] text-left text-[9px]">
              <thead className="bg-[#F1F6FD] text-[#52647E]">
                <tr>
                  {[
                    "Sector",
                    "Base Fare",
                    "Fuel Surcharge",
                    "Taxes & Charges",
                    "Other Charges",
                    "Total (USD)",
                  ].map((heading) => (
                    <th key={heading} className="px-2 py-1.5 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {flightSegments.map((segment) => (
                  <tr
                    key={`${segment.flightNumber}-fare`}
                    className="border-t border-[#E7ECF3] text-[#405776]"
                  >
                    <td className="px-2 py-1.5">{segment.route}</td>
                    <td className="px-2 py-1.5">—</td>
                    <td className="px-2 py-1.5">—</td>
                    <td className="px-2 py-1.5">—</td>
                    <td className="px-2 py-1.5">—</td>
                    <td className="px-2 py-1.5 font-bold">—</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-[#E7ECF3] bg-[#FFF2D6] text-[#713F12]">
                <tr>
                  <td colSpan={5} className="px-2 py-1.5 text-xs font-bold">
                    Total Amount
                  </td>
                  <td className="px-2 py-1.5 text-right text-xs font-extrabold">{trip.amount}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-1 text-[8px] text-[#718096]">
            Sector-level fare components are not supplied with this trip.
          </p>
        </section>

        <section className="grid items-center gap-3 px-2 py-1 sm:grid-cols-[1fr_auto]">
          <div className="max-w-[280px]">
            <VoucherBarcode value={trip.id} />
            <p className="mt-1 text-[9px] font-semibold text-[#52647E]">Booking ID: {trip.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <QRCodeSVG
              value={bookingUrl}
              size={64}
              level="M"
              title={`Flight booking ${trip.id}`}
              className="size-16 shrink-0"
            />
            <p className="max-w-32 text-[9px] leading-tight text-[#52647E]">
              Scan QR Code to view / manage booking on TRAVGENIE.com
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[#DCE5F0] bg-[#DCE5F0] sm:grid-cols-4">
          {[
            {
              icon: <Headphones className="size-5" />,
              title: "24/7 Support",
              detail: "Always here to help",
            },
            {
              icon: <ShieldCheck className="size-5" />,
              title: "Best Fares",
              detail: "Exclusive corporate rates",
            },
            {
              icon: <CalendarDays className="size-5" />,
              title: "Flexible Changes",
              detail: "As per airline policy",
            },
            {
              icon: <Plane className="size-5" />,
              title: "Trusted Partner",
              detail: "Global network",
            },
          ].map(({ icon, title, detail }) => (
            <div
              key={title}
              className="flex items-center justify-center gap-2 bg-[#F1F6FD] px-2 py-2"
            >
              <span className="shrink-0 text-[#C9963B]">{icon}</span>
              <span>
                <strong className="block text-[9px] text-[#203858]">{title}</strong>
                <span className="block text-[8px] text-[#718096]">{detail}</span>
              </span>
            </div>
          ))}
        </section>

        <footer className="flex items-center justify-between gap-2 bg-[#102B55] px-4 py-2.5 text-white">
          <Logo width={175} tone="white" />
          <p className="text-center text-[9px] text-white/85">Corporate Travel Made Simple</p>
          <p className="text-right text-[8px] leading-tight text-white/80">
            A product by
            <br />
            <strong>Misba Travel World</strong>
          </p>
        </footer>
      </div>
    </>
  );
}

function FlightVoucherAirport({
  code,
  city,
  country,
  airport,
  time,
  terminal,
  image,
}: {
  code: string;
  city: string;
  country: string;
  airport: string;
  time: string;
  terminal: string;
  image?: string;
}) {
  const displayTime = time.replace(/\s*\([^)]+\)/, "");

  return (
    <div className="flex min-w-0 items-start gap-2">
      {image ? (
        <img
          src={image}
          alt={`${city} skyline`}
          className="size-14 shrink-0 rounded-md object-cover sm:size-[68px]"
        />
      ) : (
        <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-[#E6EEF8] text-xs font-extrabold text-[#17396B] sm:size-[68px]">
          {code}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm font-extrabold text-[#13294B] sm:text-base">{code}</p>
        <p className="text-[9px] font-semibold text-[#203858]">{city}</p>
        <p className="text-[8px] text-[#52647E]">{country}</p>
        <p className="mt-1 text-sm font-bold text-[#13294B]">{displayTime}</p>
        <p className="line-clamp-2 text-[8px] leading-tight text-[#52647E]">{airport}</p>
        <p className="text-[8px] text-[#52647E]">{terminal}</p>
      </div>
    </div>
  );
}

function HotelVoucher({ trip }: { trip: TripItem }) {
  const stays = [trip.hotel, ...(trip.hotel.additionalStays ?? [])];
  const totalAmount = stays.reduce((total, stay) => total + stay.roomRate + stay.taxes, 0);
  const voucherReference = trip.hotel.voucherId ?? `HTG${trip.id.replace(/^TG/i, "")}`;
  const [bookingUrl, setBookingUrl] = useState(trip.id);
  const formatUsd = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  const amenities = [
    { label: "Free Wi-Fi", icon: <Wifi className="size-4" /> },
    { label: "Breakfast", icon: <Coffee className="size-4" /> },
    { label: "Fitness centre", icon: <Dumbbell className="size-4" /> },
    { label: "Swimming pool", icon: <Waves className="size-4" /> },
    { label: "24/7 reception", icon: <BadgeCheck className="size-4" /> },
  ];
  const metadata = [
    {
      label: "Booking ID",
      value: voucherReference,
      icon: <Building2 className="size-5" />,
    },
    {
      label: "Booking Date",
      value: trip.hotel.bookingDate ?? "Not provided",
      icon: <CalendarDays className="size-5" />,
    },
    {
      label: "Booking Status",
      value: trip.status,
      icon: <CheckCircle2 className="size-5 text-[#319968]" />,
    },
    {
      label: "Voucher Issue Date",
      value: trip.hotel.voucherIssuedDate ?? "Not provided",
      icon: <TicketCheck className="size-5" />,
    },
  ];

  useEffect(() => {
    const bookingPath = `/trips?ticket=${encodeURIComponent(trip.id)}&view=hotel`;
    setBookingUrl(new URL(bookingPath, window.location.origin).toString());
  }, [trip.id]);

  return (
    <>
      <header className="flex items-center justify-between gap-3 border-b border-[#D8E2F0] px-4 py-3 sm:px-8">
        <Logo width={190} />
        <div className="flex items-center gap-3">
          <p className="hidden text-right text-[9px] leading-relaxed text-[#52647E] sm:block">
            A product by
            <br />
            <strong>Misba Travel World</strong>
          </p>
          <div className="flex items-center gap-2 rounded-l-lg bg-[#153765] px-3 py-2 text-white sm:px-5">
            <Hotel className="size-5 shrink-0" />
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wide sm:text-sm">
                Hotel Voucher
              </p>
              <p className="text-[10px] text-white/80">
                {trip.status === "Confirmed" ? "Confirmed Booking" : trip.status}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-px border-b border-[#DCE5F0] bg-[#DCE5F0] sm:grid-cols-4">
        {metadata.map(({ label, value, icon }) => (
          <div key={label} className="flex items-center gap-2 bg-[#F1F6FD] px-3 py-2.5 sm:px-4">
            <span className="shrink-0 text-[#153765]">{icon}</span>
            <div className="min-w-0">
              <p className="text-[10px] text-[#718096]">{label}</p>
              <p className="mt-0.5 truncate text-xs font-bold text-[#13294B] sm:text-sm">{value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="relative flex min-h-[145px] items-center overflow-hidden bg-[#183B6D] px-5 py-4 sm:min-h-[170px] sm:px-8">
        <img
          src={hotelRoom}
          alt=""
          className="absolute inset-0 size-full object-cover object-center opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102C55]/95 via-[#102C55]/65 to-transparent" />
        <div className="relative z-10 max-w-lg">
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Hotel Voucher
          </h1>
          <span className="mt-2 inline-flex rounded-md bg-[#FFF2D6] px-3 py-1 text-xs font-bold text-[#24354B] sm:text-sm">
            {stays.length === 1 ? "Single Stay" : `${stays.length} Hotel Stays`}
          </span>
          <p className="mt-2 text-xs text-white/90 sm:text-sm">
            Your Stay. Our Support.
            <br />
            Business Travel Made Simple.
          </p>
        </div>
      </section>

      <div className="space-y-2 px-4 py-2 sm:space-y-2 sm:px-8 sm:py-2">
        <section>
          <TicketSectionHeading icon={<User className="size-4" />} title="Guest Details" />
          <div className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#DCE5F0] bg-[#DCE5F0] sm:grid-cols-5">
            {[
              ["Guest Name", "Azim Robario"],
              ["Employee ID", "EMP001"],
              ["Department", "Management"],
              ["Company", "DCB Bank"],
              ["Booking Type", "Business"],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#F3F7FC] px-2 py-1.5">
                <p className="text-[9px] text-[#718096]">{label}</p>
                <p className="mt-0.5 text-[10px] font-semibold text-[#172B4D]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <TicketSectionHeading icon={<Plane className="size-4" />} title="Hotel Details" />
          <div className="mt-2 space-y-3">
            {stays.map((stay, index) => (
              <div
                key={stay.confirmationCode}
                className="overflow-hidden rounded-lg border border-[#DCE5F0] bg-white"
              >
                {stays.length > 1 ? (
                  <div className="flex items-center justify-between gap-2 bg-[#DCEAF9] px-3 py-2 text-xs font-bold text-[#13294B] sm:px-4">
                    <span>
                      Hotel Stay {index + 1} of {stays.length}
                    </span>
                    <span>
                      {stay.stayDates} · {stay.nights} {stay.nights === 1 ? "night" : "nights"}
                    </span>
                  </div>
                ) : null}
                <div className="grid gap-3 p-2 sm:grid-cols-[220px_1fr]">
                  <img
                    src={stay.image ?? hotelRoom}
                    alt={`${stay.name} hotel`}
                    className="h-32 w-full rounded-md object-cover sm:h-full sm:min-h-[134px]"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-[#13294B] sm:text-base">
                          {stay.name}
                        </h3>
                        <div
                          className="mt-0.5 flex items-center gap-1"
                          aria-label={`${stay.rating ?? 0} out of 5 stars`}
                        >
                          {Array.from({ length: stay.rating ?? 0 }, (_, starIndex) => (
                            <Star
                              key={starIndex}
                              className="size-3 fill-[#E5A933] text-[#E5A933]"
                            />
                          ))}
                        </div>
                        <p className="mt-1 flex items-start gap-1.5 text-[10px] text-[#52647E]">
                          <MapPin className="mt-0.5 size-3.5 shrink-0" />
                          {stay.address}
                        </p>
                      </div>
                      <p className="pt-1 text-xs font-semibold tracking-[0.28em] text-[#52647E]">
                        {stay.propertyBrand ?? "HOTEL"}
                      </p>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-1 gap-y-1 border-t border-[#E7ECF3] pt-2 sm:grid-cols-5">
                      {[
                        {
                          label: "Check-in",
                          value: stay.checkIn,
                          icon: <CalendarDays className="size-3.5" />,
                        },
                        {
                          label: "Check-out",
                          value: stay.checkOut,
                          icon: <CalendarDays className="size-3.5" />,
                        },
                        {
                          label: "Stay Duration",
                          value: `${stay.nights} ${stay.nights === 1 ? "Night" : "Nights"}`,
                          icon: <Clock4 className="size-3.5" />,
                        },
                        {
                          label: "Room Type",
                          value: stay.roomType,
                          icon: <Hotel className="size-3.5" />,
                        },
                        {
                          label: "Guests",
                          value: stay.guestCount ?? "1 Adult",
                          icon: <User className="size-3.5" />,
                        },
                      ].map(({ label, value, icon }) => (
                        <div key={label}>
                          <p className="flex items-center gap-1 text-[9px] text-[#718096]">
                            <span className="text-[#153765]">{icon}</span>
                            {label}
                          </p>
                          <p className="mt-0.5 text-[9px] font-semibold leading-tight text-[#203858]">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-y-1 border-t border-[#DCE5F0] bg-[#F8FAFD] px-2 py-2 sm:grid-cols-5">
                  {(stay.amenities ?? ["Check with the hotel for available amenities"]).map(
                    (label, amenityIndex) => (
                      <span
                        key={label}
                        className="flex items-center gap-1.5 text-[9px] font-medium text-[#52647E]"
                      >
                        <span className="text-[#9A6D24]">
                          {stay.amenities ? (
                            (amenities[amenityIndex]?.icon ?? <Info className="size-4" />)
                          ) : (
                            <Info className="size-4" />
                          )}
                        </span>
                        {label}
                      </span>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <TicketSectionHeading
            icon={<FileText className="size-4" />}
            title="Room & Rate Details"
          />
          <div className="mt-2 overflow-x-auto rounded-lg border border-[#DCE5F0]">
            <table className="w-full min-w-[680px] text-left text-[10px]">
              <thead className="bg-[#F1F6FD] text-[#52647E]">
                <tr>
                  <th className="px-2 py-1">#</th>
                  <th className="px-2 py-1">Room Type</th>
                  <th className="px-2 py-1">No. of Guests</th>
                  <th className="px-2 py-1">Nights</th>
                  <th className="px-2 py-1">Room Rate (USD)</th>
                  <th className="px-2 py-1">Taxes &amp; Fees (USD)</th>
                  <th className="px-2 py-1 text-right">Total (USD)</th>
                </tr>
              </thead>
              <tbody>
                {stays.map((stay, index) => (
                  <tr
                    key={stay.confirmationCode}
                    className="border-t border-[#E7ECF3] text-[#203858]"
                  >
                    <td className="px-2 py-1">{index + 1}</td>
                    <td className="px-2 py-1">{stay.roomType}</td>
                    <td className="px-2 py-1">{stay.guestCount ?? "1 Adult"}</td>
                    <td className="px-2 py-1">{stay.nights}</td>
                    <td className="px-2 py-1">{formatUsd(stay.roomRate)}</td>
                    <td className="px-2 py-1">{formatUsd(stay.taxes)}</td>
                    <td className="px-2 py-1 text-right font-bold">
                      {formatUsd(stay.roomRate + stay.taxes)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-[#E7ECF3] bg-[#FFF2D6] text-[#713F12]">
                <tr>
                  <td colSpan={6} className="px-3 py-1.5 font-bold">
                    Total Paid
                  </td>
                  <td className="px-3 py-1.5 text-right text-sm font-extrabold">
                    USD {totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-[1fr_1.1fr]">
          <div className="rounded-lg border border-[#DCE5F0] bg-[#F7FAFE] p-2.5 sm:p-3">
            <TicketSectionHeading
              icon={<Info className="size-4" />}
              title="Important Information"
              compact
            />
            <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-[8px] leading-[1.3] text-[#52647E]">
              <li>Check-in time is 3:00 PM and check-out time is 12:00 PM.</li>
              <li>Early check-in or late check-out is subject to availability.</li>
              <li>Please present a valid ID at check-in.</li>
              <li>Room rates include taxes and service charges.</li>
              <li>Cancellation and amendments are as per hotel policy.</li>
              <li>For changes or cancellations, please contact TravGenie support.</li>
              <li>Hotel contact: +971 4 435 0000.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[#DCE5F0] bg-white p-2.5 sm:p-3">
            <TicketSectionHeading
              icon={<Calendar className="size-4 text-[#E35C5C]" />}
              title="Cancellation Policy"
              compact
            />
            <div className="mt-1.5 space-y-1 text-[8px] leading-[1.3] text-[#52647E]">
              {stays.map((stay) => (
                <p key={stay.confirmationCode}>
                  {stay.cancellationPolicy ??
                    "Cancellation and amendment terms are set by the property. Please check the original booking confirmation before making changes."}
                </p>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-3 border-t border-[#E7ECF3] pt-3">
              <div>
                <VoucherBarcode value={voucherReference} />
                <p className="mt-1 text-[9px] font-semibold text-[#52647E]">
                  Voucher Number: {voucherReference}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <QRCodeSVG
                  value={bookingUrl}
                  size={56}
                  level="M"
                  title={`Hotel booking ${trip.id}`}
                  className="size-14 shrink-0"
                />
                <p className="max-w-24 text-[8px] leading-tight text-[#52647E]">
                  Scan QR Code to view / manage booking on TRAVGENIE.com
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#DCE5F0] bg-[#DCE5F0] sm:grid-cols-4">
          {[
            {
              icon: <Headphones className="size-5" />,
              label: "24/7 Support",
              detail: "Always here to help",
            },
            {
              icon: <ShieldCheck className="size-5" />,
              label: "Best Fares",
              detail: "Exclusive corporate rates",
            },
            {
              icon: <CalendarDays className="size-5" />,
              label: "Flexible Changes",
              detail: "As per hotel policy",
            },
            {
              icon: <Plane className="size-5" />,
              label: "Trusted Partner",
              detail: "Global network",
            },
          ].map((benefit) => (
            <div
              key={benefit.label}
              className="flex items-center justify-center gap-2 bg-[#F1F6FD] px-2 py-3"
            >
              <span className="shrink-0 text-[#C9963B]">{benefit.icon}</span>
              <span>
                <strong className="block text-[9px] text-[#203858]">{benefit.label}</strong>
                <span className="block text-[8px] text-[#718096]">{benefit.detail}</span>
              </span>
            </div>
          ))}
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#153765] bg-[#102B55] px-4 py-3 text-white sm:px-5">
          <Logo width={190} tone="white" />
          <p className="hidden text-center text-[10px] text-white/80 sm:block">
            Corporate Travel Made Simple
          </p>
          <p className="text-right text-[9px] leading-relaxed text-white/80">
            A product by
            <br />
            <strong className="text-white">Misba Travel World</strong>
          </p>
        </footer>
      </div>
    </>
  );
}

const code39Patterns: Record<string, string> = {
  "0": "nnnwwnwnn",
  "1": "wnnwnnnnw",
  "2": "nnwwnnnnw",
  "3": "wnwwnnnnn",
  "4": "nnnwwnnnw",
  "5": "wnnwwnnnn",
  "6": "nnwnnwwnn",
  "7": "nnnwnnwnw",
  "8": "wnnwnnwnn",
  "9": "nnwwnnwnn",
  A: "wnnnnwnnw",
  B: "nnwnnwnnw",
  C: "wnwnnwnnn",
  D: "nnnnwwnnw",
  E: "wnnnwwnnn",
  F: "nnwnwwnnn",
  G: "nnnnnwwnw",
  H: "wnnnnwwnn",
  I: "nnwnnwwnn",
  J: "nnnnwwwnn",
  K: "wnnnnnnww",
  L: "nnwnnnnww",
  M: "wnwnnnnwn",
  N: "nnnnwnnww",
  O: "wnnnwnnwn",
  P: "nnwnwnnwn",
  Q: "nnnnnnwww",
  R: "wnnnnnwwn",
  S: "nnwnnnwwn",
  T: "nnnnwnwwn",
  U: "wwnnnnnnw",
  V: "nwwnnnnnw",
  W: "wwwnnnnnn",
  X: "nwnnwnnnw",
  Y: "wwnnwnnnn",
  Z: "nwwnwnnnn",
  "*": "nwnnwnwnn",
};

function VoucherBarcode({ value }: { value: string }) {
  const encodedValue = `*${value.toUpperCase()}*`;
  const height = 36;
  let x = 0;
  const bars: Array<{ x: number; width: number }> = [];

  for (const [characterIndex, character] of [...encodedValue].entries()) {
    const pattern = code39Patterns[character];
    if (!pattern) {
      throw new Error(`Unsupported Code 39 character in voucher reference: ${character}`);
    }

    for (const [elementIndex, element] of [...pattern].entries()) {
      const width = element === "w" ? 3 : 1;
      if (elementIndex % 2 === 0) bars.push({ x, width });
      x += width;
    }
    if (characterIndex < encodedValue.length - 1) x += 1;
  }

  return (
    <svg
      role="img"
      aria-label={`Code 39 barcode for ${value}`}
      viewBox={`0 0 ${x} ${height}`}
      className="h-9 w-full"
      preserveAspectRatio="none"
    >
      <rect width={x} height={height} fill="white" />
      {bars.map((bar, index) => (
        <rect key={index} x={bar.x} y="0" width={bar.width} height={height} fill="#13294B" />
      ))}
    </svg>
  );
}

function TicketSectionHeading({
  icon,
  title,
  compact = false,
}: {
  icon: React.ReactNode;
  title: string;
  compact?: boolean;
}) {
  return (
    <h2
      className={cn(
        "flex items-center gap-2 font-bold text-[#13294B]",
        compact ? "px-3 pt-3 text-xs" : "text-sm sm:text-base",
      )}
    >
      <span className="text-[#BC8732]">{icon}</span>
      {title}
    </h2>
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

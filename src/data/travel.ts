import hotelDowntown from "@/assets/hotel-downtown.jpg";
import hotelCreek from "@/assets/hotel-creek.jpg";
import hotelIbis from "@/assets/hotel-ibis.jpg";

export type PolicyKind = "within" | "approval" | "out";

export type Flight = {
  id: string;
  airline: string;
  code: string;
  depart: string;
  departCode: string;
  arrive: string;
  arriveCode: string;
  duration: string;
  stops: "Direct";
  checkedBag: string;
  cabinBag: string;
  price: number;
};

export const flights: Flight[] = [
  {
    id: "WY611",
    airline: "Oman Air",
    code: "WY",
    depart: "10:00",
    departCode: "MCT",
    arrive: "11:30",
    arriveCode: "DXB",
    duration: "1h 30m",
    stops: "Direct",
    checkedBag: "25 kg",
    cabinBag: "7 kg",
    price: 196,
  },
  {
    id: "EK863",
    airline: "Emirates",
    code: "EK",
    depart: "11:20",
    departCode: "MCT",
    arrive: "12:50",
    arriveCode: "DXB",
    duration: "1h 30m",
    stops: "Direct",
    checkedBag: "30 kg",
    cabinBag: "7 kg",
    price: 224,
  },
  {
    id: "FZ044",
    airline: "flydubai",
    code: "FZ",
    depart: "14:10",
    departCode: "MCT",
    arrive: "15:45",
    arriveCode: "DXB",
    duration: "1h 35m",
    stops: "Direct",
    checkedBag: "20 kg",
    cabinBag: "7 kg",
    price: 210,
  },
  {
    id: "QR1136",
    airline: "Qatar Airways",
    code: "QR",
    depart: "18:30",
    departCode: "MCT",
    arrive: "20:05",
    arriveCode: "DXB",
    duration: "1h 35m",
    stops: "Direct",
    checkedBag: "30 kg",
    cabinBag: "7 kg",
    price: 298,
  },
];

export const airlineFilters = [
  { name: "Oman Air", price: 196 },
  { name: "Emirates", price: 224 },
  { name: "flydubai", price: 210 },
  { name: "Qatar Airways", price: 298 },
  { name: "IndiGo", price: 230 },
];

export const stopFilters = [
  { name: "Direct", price: 196 },
  { name: "1 Stop", price: 224 },
  { name: "2+ Stops", price: 298 },
];

export type Hotel = {
  id: string;
  name: string;
  stars: number;
  area: string;
  distance: string;
  amenities: string[];
  price: number;
  policy: PolicyKind;
  image: string;
};

export const hotels: Hotel[] = [
  {
    id: "rove",
    name: "Rove Downtown Dubai",
    stars: 4,
    area: "Downtown Dubai",
    distance: "2.3 km from City Centre",
    amenities: ["Free Wi-Fi", "Breakfast", "Business Centre", "Gym"],
    price: 82,
    policy: "within",
    image: hotelDowntown,
  },
  {
    id: "hyatt",
    name: "Hyatt Regency Dubai Creek Heights",
    stars: 4,
    area: "Dubai Creek",
    distance: "4.1 km from City Centre",
    amenities: ["Free Wi-Fi", "Breakfast", "Airport Shuttle", "Pool"],
    price: 128,
    policy: "within",
    image: hotelCreek,
  },
  {
    id: "address",
    name: "Address Downtown",
    stars: 5,
    area: "Downtown Dubai",
    distance: "1.2 km from City Centre",
    amenities: ["Free Wi-Fi", "Breakfast", "Spa", "Business Centre"],
    price: 210,
    policy: "approval",
    image: hotelDowntown,
  },
  {
    id: "ibis",
    name: "ibis Dubai World Trade Centre",
    stars: 4,
    area: "Trade Centre",
    distance: "3.8 km from City Centre",
    amenities: ["Free Wi-Fi", "Breakfast", "Metro Access", "Gym"],
    price: 75,
    policy: "within",
    image: hotelIbis,
  },
];

export const hotelPolicyFilters = [
  { name: "Within Policy", count: 184 },
  { name: "Needs Approval", count: 72 },
  { name: "Out of Policy", count: 26 },
];

export const starFilters = [
  { stars: 5, count: 96 },
  { stars: 4, count: 142 },
  { stars: 3, count: 33 },
  { stars: 2, count: 20 },
  { stars: 1, count: 8 },
];

export const amenityFilters = [
  { name: "Free Wi-Fi", count: 322 },
  { name: "Breakfast Included", count: 281 },
  { name: "Airport Shuttle", count: 96 },
  { name: "Meeting Facilities", count: 142 },
  { name: "Gym", count: 118 },
];

/* ------------------------------------------------------------- dashboard */

export const spendTrend = [
  { month: "Apr", flights: 15000, hotels: 7000 },
  { month: "May", flights: 16000, hotels: 11000 },
  { month: "Jun", flights: 17000, hotels: 13000 },
  { month: "Jul", flights: 17500, hotels: 14000 },
  { month: "Aug", flights: 18000, hotels: 14500 },
  { month: "Sep", flights: 17500, hotels: 14000 },
];

export const bookingTrend = [
  { month: "Apr", flights: 18, hotels: 10 },
  { month: "May", flights: 22, hotels: 14 },
  { month: "Jun", flights: 26, hotels: 17 },
  { month: "Jul", flights: 29, hotels: 19 },
  { month: "Aug", flights: 34, hotels: 22 },
  { month: "Sep", flights: 31, hotels: 20 },
];

export const spendBreakdown = [
  { name: "Flights", value: 11200, pct: "61%", color: "#C8902F" },
  { name: "Hotels", value: 7220, pct: "39%", color: "#1E88E5" },
];

export type Booking = {
  id: string;
  type: "Flight" | "Hotel";
  traveller: string;
  route: string;
  date: string;
  amount: string;
  status: "Confirmed" | "Pending Approval" | "On Hold";
};

export const recentBookings: Booking[] = [
  {
    id: "TG264875",
    type: "Flight",
    traveller: "Azim Robario",
    route: "MCT → DXB",
    date: "12 Nov 2026",
    amount: "USD 420",
    status: "Confirmed",
  },
  {
    id: "TG264874",
    type: "Hotel",
    traveller: "Azim Robario",
    route: "Rove Downtown Dubai",
    date: "12 Nov – 15 Nov 2026",
    amount: "USD 246",
    status: "Confirmed",
  },
  {
    id: "TG264873",
    type: "Flight",
    traveller: "Team (3)",
    route: "MCT → BLR",
    date: "03 Dec 2026",
    amount: "USD 680",
    status: "Pending Approval",
  },
  {
    id: "TG264872",
    type: "Hotel",
    traveller: "Azim Robario",
    route: "Hyatt Regency Dubai",
    date: "10 Jan – 12 Jan 2027",
    amount: "USD 1,280",
    status: "On Hold",
  },
  {
    id: "TG264871",
    type: "Flight",
    traveller: "John Mathew",
    route: "DXB → LHR",
    date: "20 Jan 2027",
    amount: "USD 590",
    status: "Confirmed",
  },
];

export const topDestinations = [
  { city: "Dubai, UAE", count: 22, image: hotelDowntown },
  { city: "Bangalore, India", count: 8, image: hotelCreek },
  { city: "London, UK", count: 5, image: hotelIbis },
  { city: "Muscat, Oman", count: 4, image: hotelCreek },
  { city: "Singapore", count: 3, image: hotelDowntown },
];

export const upcomingTrips = [
  {
    kind: "flight" as const,
    date: "12 Nov 2026",
    title: "Dubai, UAE",
    range: "12 Nov – 15 Nov 2026",
    sub: "MCT → DXB | 1 Traveller",
  },
  {
    kind: "hotel" as const,
    date: "12 Nov 2026",
    title: "Rove Downtown Dubai",
    range: "12 Nov – 15 Nov 2026",
    sub: "1 Room | 1 Guest",
  },
  {
    kind: "flight" as const,
    date: "03 Dec 2026",
    title: "Bangalore, India",
    range: "03 Dec – 06 Dec 2026",
    sub: "MCT → BLR | 1 Traveller",
  },
];

export const importantUpdates = [
  {
    icon: "tag" as const,
    title: "Corporate Fare Update",
    body: "New discounted fares available for Dubai and London routes.",
    date: "28 Sep 2026",
  },
  {
    icon: "doc" as const,
    title: "Travel Policy Reminder",
    body: "Advance approval required for business class travel.",
    date: "25 Sep 2026",
  },
  {
    icon: "building" as const,
    title: "Hotel Inventory Update",
    body: "New partner hotels added in Dubai and Singapore.",
    date: "22 Sep 2026",
  },
];

export const kpis = [
  {
    icon: "plane" as const,
    value: "24",
    label: "Flight Bookings",
    trend: "20%",
    up: true,
    spark: [8, 11, 9, 14, 13, 18, 16, 21],
    tone: "gold" as const,
    chart: "area" as const,
  },
  {
    icon: "building" as const,
    value: "18",
    label: "Hotel Bookings",
    trend: "12%",
    up: true,
    spark: [6, 9, 8, 12, 11, 15, 17, 19],
    tone: "blue" as const,
    chart: "area" as const,
  },
  {
    icon: "coins" as const,
    value: "USD 18,420",
    label: "Total Spend",
    trend: "15%",
    up: true,
    spark: [7, 9, 12, 10, 14, 13, 17, 19],
    tone: "grey" as const,
    chart: "bar" as const,
  },
  {
    icon: "hourglass" as const,
    value: "3",
    label: "Pending Approvals",
    trend: "50%",
    up: false,
    spark: [4, 6, 5, 9, 7, 11, 10, 15],
    tone: "red" as const,
    chart: "bar" as const,
  },
];

export const policyCompliance = [
  { name: "Within Policy", value: 42, color: "#1FA45B" },
  { name: "Needs Approval", value: 5, color: "#F08A24" },
  { name: "Out of Policy", value: 1, color: "#E5382E" },
];

/** Event dots in the November 2026 calendar. */
export const calendarEvents: Record<number, "gold" | "blue"> = {
  2: "gold",
  3: "gold",
  14: "gold",
  19: "blue",
  22: "gold",
};

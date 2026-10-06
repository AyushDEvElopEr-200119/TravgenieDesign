import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  CheckCheck,
  ChevronRight,
  Filter,
  HandCoins,
  Plane,
  Building2,
  FileText,
  Info,
  CheckCircle2,
  Lock,
  Search,
  Trash2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  TicketCheck,
  TramFront,
  Bus,
  Car,
  MoreHorizontal,
  Hotel,
  Calendar,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { UserProfileMenu } from "@/components/layout/UserProfileMenu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | TravGenie — Corporate Business Travel" },
      {
        name: "description",
        content: "Stay updated on your flight schedules, approval requests, hotel confirmations, and corporate policy changes.",
      },
    ],
  }),
  component: NotificationsCenterPage,
});

type NotificationCategory = "all" | "travel" | "approvals" | "policy" | "system";

interface FullNotificationItem {
  id: string;
  category: "travel" | "approvals" | "policy" | "system";
  title: string;
  message: string;
  time: string;
  group: "Today" | "Yesterday" | "Earlier This Week";
  unread: boolean;
  iconBg: string;
  iconColor: string;
  icon: typeof Bell;
  actionLabel?: string;
  link?: string;
  details?: {
    description: string;
    referenceCode?: string;
    actionType?: string;
    date?: string;
  };
}

const initialAllNotifications: FullNotificationItem[] = [
  {
    id: "notif-1",
    category: "approvals",
    title: "Approval Required",
    message: "Your flight booking TG264876 to Bangalore requires manager sign-off because it exceeds the standard domestic budget limit.",
    time: "10 mins ago",
    group: "Today",
    unread: true,
    iconBg: "bg-[#FEF2E6]",
    iconColor: "text-[#E07A1A]",
    icon: HandCoins,
    actionLabel: "Review Booking",
    link: "/trips",
    details: {
      description: "Flight reservation for MCT → BLR on 03 Dec 2026 with Air India AI972 ($680). Awaiting approval from Finance Manager.",
      referenceCode: "TG264876",
      date: "03 Dec 2026",
    },
  },
  {
    id: "notif-2",
    category: "travel",
    title: "Flight Schedule Change",
    message: "Your flight to Dubai (Oman Air WY611) has been rescheduled by 15 minutes. Check updated boarding schedule.",
    time: "1 hour ago",
    group: "Today",
    unread: true,
    iconBg: "bg-[#EAF2FD]",
    iconColor: "text-[#1E88E5]",
    icon: Plane,
    actionLabel: "View Itinerary",
    link: "/trips",
    details: {
      description: "Departure updated from 09:45 AM to 10:00 AM from Muscat International Airport (MCT) Terminal 1, Gate B14.",
      referenceCode: "TG264875",
      date: "12 Nov 2026",
    },
  },
  {
    id: "notif-3",
    category: "travel",
    title: "Hotel Booking Confirmed",
    message: "Your corporate hotel reservation at Rove Downtown Dubai has been confirmed with complimentary breakfast and free cancellation.",
    time: "3 hours ago",
    group: "Today",
    unread: false,
    iconBg: "bg-[#E7F7ED]",
    iconColor: "text-[#1FA45B]",
    icon: Building2,
    actionLabel: "View Voucher",
    link: "/trips",
    details: {
      description: "Check-in: 12 Nov 2026, 2:00 PM. Room: Rover King Room (City View). Confirmation Voucher Code: RD-998241.",
      referenceCode: "RD-998241",
      date: "12 Nov – 15 Nov 2026",
    },
  },
  {
    id: "notif-4",
    category: "policy",
    title: "Travel Policy Reminder",
    message: "Advance booking is required for international travel. Please book international sectors at least 14 days in advance.",
    time: "1 day ago",
    group: "Yesterday",
    unread: false,
    iconBg: "bg-[#FEF8ED]",
    iconColor: "text-[#BC8732]",
    icon: FileText,
    actionLabel: "Read Policy",
    link: "/policies",
    details: {
      description: "Bookings created under 7 days before departure now require automated VP approval per Q4 2026 corporate travel policy.",
      referenceCode: "POL-ADV-26",
    },
  },
  {
    id: "notif-5",
    category: "policy",
    title: "New Corporate Hotel Rates Effective",
    message: "New negotiated partner rates for Taj MG Road and Hilton London have been loaded into your corporate booking engine.",
    time: "2 days ago",
    group: "Earlier This Week",
    unread: false,
    iconBg: "bg-[#EEF2F6]",
    iconColor: "text-[#5B6478]",
    icon: Info,
    actionLabel: "Explore Hotels",
    link: "/hotels",
    details: {
      description: "Save up to 25% on standard flexible rates with executive lounge access included for business travellers.",
      referenceCode: "CORP-HTL-2026",
    },
  },
  {
    id: "notif-6",
    category: "system",
    title: "Two-Factor Authentication Confirmed",
    message: "A new secure sign-in session was recognized from Windows PC in Muscat, Oman.",
    time: "4 days ago",
    group: "Earlier This Week",
    unread: false,
    iconBg: "bg-[#F3F5F9]",
    iconColor: "text-[#475569]",
    icon: Lock,
    actionLabel: "Security Settings",
    link: "/profile",
    details: {
      description: "IP: 195.144.20.12, Muscat, Oman. Device: Windows PC (Chrome 128.0).",
      referenceCode: "SEC-LOG-891",
    },
  },
];

export function NotificationsCenterPage() {
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");
  const [notifications, setNotifications] = useState<FullNotificationItem[]>(initialAllNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotif, setSelectedNotif] = useState<FullNotificationItem | null>(null);
  const [onlyUnread, setOnlyUnread] = useState(false);
  const navigate = useNavigate();

  // Counts
  const unreadCount = notifications.filter((n) => n.unread).length;
  const travelCount = notifications.filter((n) => n.category === "travel").length;
  const approvalsCount = notifications.filter((n) => n.category === "approvals").length;
  const policyCount = notifications.filter((n) => n.category === "policy").length;
  const systemCount = notifications.filter((n) => n.category === "system").length;

  // Filtered
  const filtered = notifications.filter((n) => {
    const matchesTab = activeTab === "all" || n.category === activeTab;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnread = !onlyUnread || n.unread;
    return matchesTab && matchesSearch && matchesUnread;
  });

  // Group by timeline
  const groups: ("Today" | "Yesterday" | "Earlier This Week")[] = [
    "Today",
    "Yesterday",
    "Earlier This Week",
  ];

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markItemAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

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
              className="flex items-center gap-2 text-[14.5px] font-medium text-[#0D1B3E] transition-colors hover:text-[#C9963B]"
            >
              <TicketCheck className="size-[19px] text-[#0D1B3E]" />
              <span>My Trips</span>
            </Link>

            {/* Notification Bell Dropdown */}
            <NotificationDropdown />

            {/* User Profile Menu */}
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
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-white hover:text-[#C9963B] transition-all text-[#475569]"
              >
                <TramFront className="size-4" />
                <span>Train</span>
              </button>
              <button
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-white hover:text-[#C9963B] transition-all text-[#475569]"
              >
                <Bus className="size-4" />
                <span>Bus</span>
              </button>
              <button
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

      {/* 2. MAIN NOTIFICATIONS CENTER */}
      <main className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8 sm:py-10">
        {/* Title & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#EBE7DF]">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] sm:text-[32px] font-bold text-[#0D1B3E] tracking-tight">
                Notifications Center
              </h1>
              {unreadCount > 0 && (
                <span className="flex items-center justify-center rounded-full bg-[#E5382E] px-2.5 py-0.5 text-[12px] font-bold text-white shadow-2xs">
                  {unreadCount} Unread
                </span>
              )}
            </div>
            <p className="mt-1 text-[14px] sm:text-[15px] text-[#5B6478]">
              Stay updated on flight changes, approvals, vouchers, and corporate policies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Mark All As Read */}
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4A354] bg-white px-4 py-2 text-[13.5px] font-semibold text-[#8A5A12] shadow-2xs transition-all hover:bg-[#FEF8EE] active:scale-98 cursor-pointer"
              >
                <CheckCheck className="size-4 text-[#8A5A12]" />
                <span>Mark all as read</span>
              </button>
            )}

            {/* Unread Only Toggle */}
            <button
              onClick={() => setOnlyUnread(!onlyUnread)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[13.5px] font-semibold transition-all cursor-pointer",
                onlyUnread
                  ? "bg-[#0D1B3E] text-white shadow-xs"
                  : "bg-white border border-[#EDE8E1] text-[#5B6478] hover:bg-[#FAF8F5]",
              )}
            >
              <Filter className="size-3.5" />
              <span>{onlyUnread ? "Showing Unread" : "Filter Unread"}</span>
            </button>
          </div>
        </div>

        {/* Search & Category Tabs Bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "rounded-xl px-4 py-2 text-[13.5px] sm:text-[14px] transition-all cursor-pointer whitespace-nowrap",
                activeTab === "all"
                  ? "border border-[#D4A354] bg-[#FEF8EE] font-semibold text-[#8A5A12] shadow-2xs"
                  : "bg-white border border-[#EDE8E1] font-medium text-[#5B6478] hover:bg-[#FAF8F5]",
              )}
            >
              All ({notifications.length})
            </button>

            <button
              onClick={() => setActiveTab("travel")}
              className={cn(
                "rounded-xl px-4 py-2 text-[13.5px] sm:text-[14px] transition-all cursor-pointer whitespace-nowrap",
                activeTab === "travel"
                  ? "border border-[#D4A354] bg-[#FEF8EE] font-semibold text-[#8A5A12] shadow-2xs"
                  : "bg-white border border-[#EDE8E1] font-medium text-[#5B6478] hover:bg-[#FAF8F5]",
              )}
            >
              Travel ({travelCount})
            </button>

            <button
              onClick={() => setActiveTab("approvals")}
              className={cn(
                "rounded-xl px-4 py-2 text-[13.5px] sm:text-[14px] transition-all cursor-pointer whitespace-nowrap",
                activeTab === "approvals"
                  ? "border border-[#D4A354] bg-[#FEF8EE] font-semibold text-[#8A5A12] shadow-2xs"
                  : "bg-white border border-[#EDE8E1] font-medium text-[#5B6478] hover:bg-[#FAF8F5]",
              )}
            >
              Approvals ({approvalsCount})
            </button>

            <button
              onClick={() => setActiveTab("policy")}
              className={cn(
                "rounded-xl px-4 py-2 text-[13.5px] sm:text-[14px] transition-all cursor-pointer whitespace-nowrap",
                activeTab === "policy"
                  ? "border border-[#D4A354] bg-[#FEF8EE] font-semibold text-[#8A5A12] shadow-2xs"
                  : "bg-white border border-[#EDE8E1] font-medium text-[#5B6478] hover:bg-[#FAF8F5]",
              )}
            >
              Policy ({policyCount})
            </button>

            <button
              onClick={() => setActiveTab("system")}
              className={cn(
                "rounded-xl px-4 py-2 text-[13.5px] sm:text-[14px] transition-all cursor-pointer whitespace-nowrap",
                activeTab === "system"
                  ? "border border-[#D4A354] bg-[#FEF8EE] font-semibold text-[#8A5A12] shadow-2xs"
                  : "bg-white border border-[#EDE8E1] font-medium text-[#5B6478] hover:bg-[#FAF8F5]",
              )}
            >
              System ({systemCount})
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8A93A6]" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#EDE8E1] bg-white pl-9 pr-3.5 py-2 text-[13.5px] text-[#0D1B3E] outline-none placeholder:text-[#8A93A6] focus:border-[#BC8732] shadow-2xs"
            />
          </div>
        </div>

        {/* 3. GROUPED NOTIFICATIONS LIST */}
        <div className="mt-6 space-y-7">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-[#EDE8E1] bg-white p-12 text-center shadow-xs">
              <Bell className="mx-auto size-10 text-[#C8CBD3]" />
              <h3 className="mt-3 text-[16px] font-bold text-[#0D1B3E]">No notifications found</h3>
              <p className="mt-1 text-[13.5px] text-[#5B6478]">
                {onlyUnread
                  ? "You have no unread notifications right now."
                  : "Try clearing your search query or switching tabs."}
              </p>
            </div>
          ) : (
            groups.map((grp) => {
              const grpItems = filtered.filter((item) => item.group === grp);
              if (grpItems.length === 0) return null;

              return (
                <div key={grp} className="space-y-3">
                  {/* Group Header */}
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#8A93A6] px-1">
                    {grp}
                  </h3>

                  {/* Group Items Card */}
                  <div className="rounded-2xl border border-[#EDE8E1] bg-white shadow-[0_4px_20px_rgba(13,27,62,0.04)] divide-y divide-[#F0ECE4] overflow-hidden">
                    {grpItems.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            markItemAsRead(item.id);
                            setSelectedNotif(item);
                          }}
                          className={cn(
                            "group flex items-start gap-4 p-4 sm:p-5 transition-all duration-200 hover:bg-[#FAF8F5] cursor-pointer",
                            item.unread && "bg-[#FDFBF7]",
                          )}
                        >
                          {/* Circular Icon */}
                          <div
                            className={cn(
                              "flex size-11 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-108",
                              item.iconBg,
                              item.iconColor,
                            )}
                          >
                            <ItemIcon className={cn("size-5.5", item.id === "notif-2" && "-rotate-45")} />
                          </div>

                          {/* Message Body */}
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex items-baseline gap-2">
                              <h4 className="text-[15px] sm:text-[15.5px] font-bold text-[#0D1B3E] group-hover:text-[#8A5A12] transition-colors truncate">
                                {item.title}
                              </h4>
                              {item.unread && (
                                <span className="size-2 rounded-full bg-[#E5382E] shrink-0" />
                              )}
                            </div>
                            <p className="mt-1 text-[13px] sm:text-[13.5px] text-[#5B6478] leading-relaxed">
                              {item.message}
                            </p>

                            {/* Direct Action Link if any */}
                            {item.actionLabel && (
                              <div className="mt-2.5">
                                <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#BC8732] group-hover:text-[#8A5A12] transition-colors">
                                  <span>{item.actionLabel}</span>
                                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Meta & Delete Button */}
                          <div className="flex flex-col items-end gap-2 shrink-0 pt-0.5">
                            <span className="text-[12px] text-[#8A93A6] whitespace-nowrap">
                              {item.time}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => deleteNotification(item.id, e)}
                                title="Dismiss notification"
                                className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-[#8A93A6] hover:bg-[#F3F5F8] hover:text-[#DC2626] transition-all"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                              <ChevronRight className="size-4 text-[#8A93A6] group-hover:text-[#0D1B3E] group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* 4. MODAL: DETAILED NOTIFICATION VIEWER */}
      {selectedNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-[24px] bg-white p-6 sm:p-7 shadow-2xl border border-[#EDE8E1] animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedNotif(null)}
              className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-[#F3F5F8] text-[#5B6478] hover:bg-[#E6EAF0] transition-colors"
            >
              <X className="size-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-[#F0ECE4]">
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-2xl",
                  selectedNotif.iconBg,
                  selectedNotif.iconColor,
                )}
              >
                <selectedNotif.icon className="size-6" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#0D1B3E]">{selectedNotif.title}</h3>
                <span className="text-[12.5px] text-[#8A93A6]">{selectedNotif.time}</span>
              </div>
            </div>

            {/* Body */}
            <div className="mt-5 space-y-4 text-[13.5px]">
              <p className="leading-relaxed text-[#5B6478]">{selectedNotif.message}</p>

              {selectedNotif.details && (
                <div className="rounded-xl bg-[#FAF8F5] p-4 border border-[#ECE6DC] space-y-2">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#8A5A12] block">
                    Event Particulars
                  </span>
                  <p className="text-[#0D1B3E] font-medium leading-relaxed">
                    {selectedNotif.details.description}
                  </p>
                  {selectedNotif.details.referenceCode && (
                    <div className="pt-1 text-[12px] text-[#5B6478]">
                      Reference Code: <strong className="text-[#0D1B3E]">{selectedNotif.details.referenceCode}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSelectedNotif(null)}
                  className="flex-1 rounded-xl border border-[#D9CFBE] bg-white py-2.5 font-semibold text-[#5B6478] hover:bg-[#F8F6F2] transition-colors"
                >
                  Dismiss
                </button>
                {selectedNotif.link && (
                  <button
                    onClick={() => {
                      const dest = selectedNotif.link;
                      setSelectedNotif(null);
                      navigate({ to: dest as any });
                    }}
                    className="flex-1 rounded-xl bg-[#BC8732] py-2.5 font-semibold text-white shadow-xs hover:bg-[#A37123] transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <span>{selectedNotif.actionLabel || "View Page"}</span>
                    <ArrowRight className="size-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


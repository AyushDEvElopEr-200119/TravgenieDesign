import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  ArrowRight,
  HandCoins,
  Plane,
  Building2,
  FileText,
  Info,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationCategory = "all" | "travel" | "approvals" | "policy" | "system";

interface NotificationItem {
  id: string;
  category: "travel" | "approvals" | "policy" | "system";
  title: string;
  message: string;
  time: string;
  unread: boolean;
  iconBg: string;
  iconColor: string;
  icon: typeof Bell;
  link?: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    category: "approvals",
    title: "Approval Required",
    message: "Your flight booking TG264876 to Bangalore requires approval.",
    time: "10 mins ago",
    unread: true,
    iconBg: "bg-[#FEF2E6]",
    iconColor: "text-[#E07A1A]",
    icon: HandCoins,
    link: "/trips",
  },
  {
    id: "notif-2",
    category: "travel",
    title: "Flight Change",
    message: "Your flight to Dubai has been rescheduled. Check details.",
    time: "1 hour ago",
    unread: true,
    iconBg: "bg-[#EAF2FD]",
    iconColor: "text-[#1E88E5]",
    icon: Plane,
    link: "/trips",
  },
  {
    id: "notif-3",
    category: "travel",
    title: "Hotel Booking Confirmed",
    message: "Your hotel booking at Rove Downtown Dubai is confirmed.",
    time: "3 hours ago",
    unread: false,
    iconBg: "bg-[#E7F7ED]",
    iconColor: "text-[#1FA45B]",
    icon: Building2,
    link: "/trips",
  },
  {
    id: "notif-4",
    category: "policy",
    title: "Policy Reminder",
    message: "Advance booking is required for international travel.",
    time: "1 day ago",
    unread: false,
    iconBg: "bg-[#FEF8ED]",
    iconColor: "text-[#BC8732]",
    icon: FileText,
    link: "/policies",
  },
  {
    id: "notif-5",
    category: "policy",
    title: "New Corporate Policy",
    message: "Updated hotel policy is now effective.",
    time: "2 days ago",
    unread: false,
    iconBg: "bg-[#EEF2F6]",
    iconColor: "text-[#5B6478]",
    icon: Info,
    link: "/policies",
  },
];

export function NotificationDropdown({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Calculate unread count
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Tab counts
  const travelCount = notifications.filter((n) => n.category === "travel").length;
  const approvalsCount = notifications.filter((n) => n.category === "approvals").length;
  const policyCount = notifications.filter((n) => n.category === "policy").length;
  const systemCount = notifications.filter((n) => n.category === "system").length;

  // Filtered notifications
  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => n.category === activeTab);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleItemClick = (item: NotificationItem) => {
    // Mark this item as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n)),
    );
    setIsOpen(false);
    if (item.link) {
      navigate({ to: item.link as any });
    }
  };

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      {/* Trigger: Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 text-[#0D1B3E] transition-colors hover:text-[#C9963B] cursor-pointer"
        aria-label={`${unreadCount} Unread notifications`}
        aria-expanded={isOpen}
      >
        <Bell className="size-[21px]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex size-[17px] items-center justify-center rounded-full bg-[#E5382E] text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in-75 duration-200">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown (Matching Reference Image) */}
      {isOpen && (
        <div className="absolute right-[-100px] sm:right-[-40px] md:right-0 top-full mt-2.5 w-[360px] sm:w-[440px] md:w-[460px] rounded-[22px] bg-white p-5 sm:p-6 shadow-[0_16px_50px_rgba(13,27,62,0.18)] border border-[#EDE8E1] z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
          {/* Top Arrow Pointer Accent */}
          <div className="hidden md:block absolute -top-2 right-5 size-4 rotate-45 bg-white border-t border-l border-[#EDE8E1]" />

          {/* Header Row: Title & Mark all as read */}
          <div className="relative flex items-center justify-between pb-3.5">
            <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0D1B3E]">
              Notifications
            </h3>
            <button
              onClick={markAllAsRead}
              className="text-[13px] font-semibold text-[#1E88E5] hover:text-[#1565C0] transition-colors cursor-pointer"
            >
              Mark all as read
            </button>
          </div>

          {/* Horizontal Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-3 pt-1">
            {/* Tab: All (3) */}
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12.5px] sm:text-[13px] transition-all cursor-pointer whitespace-nowrap",
                activeTab === "all"
                  ? "border border-[#D4A354] bg-[#FEF8EE] font-semibold text-[#8A5A12] shadow-2xs"
                  : "bg-[#F4F6F9] font-medium text-[#5B6478] hover:bg-[#EAEFF5]",
              )}
            >
              All ({unreadCount})
            </button>

            {/* Tab: Travel */}
            <button
              onClick={() => setActiveTab("travel")}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12.5px] sm:text-[13px] transition-all cursor-pointer whitespace-nowrap",
                activeTab === "travel"
                  ? "border border-[#D4A354] bg-[#FEF8EE] font-semibold text-[#8A5A12] shadow-2xs"
                  : "bg-[#F4F6F9] font-medium text-[#5B6478] hover:bg-[#EAEFF5]",
              )}
            >
              Travel ({travelCount})
            </button>

            {/* Tab: Approvals */}
            <button
              onClick={() => setActiveTab("approvals")}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12.5px] sm:text-[13px] transition-all cursor-pointer whitespace-nowrap",
                activeTab === "approvals"
                  ? "border border-[#D4A354] bg-[#FEF8EE] font-semibold text-[#8A5A12] shadow-2xs"
                  : "bg-[#F4F6F9] font-medium text-[#5B6478] hover:bg-[#EAEFF5]",
              )}
            >
              Approvals ({approvalsCount})
            </button>

            {/* Tab: Policy */}
            <button
              onClick={() => setActiveTab("policy")}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12.5px] sm:text-[13px] transition-all cursor-pointer whitespace-nowrap",
                activeTab === "policy"
                  ? "border border-[#D4A354] bg-[#FEF8EE] font-semibold text-[#8A5A12] shadow-2xs"
                  : "bg-[#F4F6F9] font-medium text-[#5B6478] hover:bg-[#EAEFF5]",
              )}
            >
              Policy ({policyCount})
            </button>

            {/* Tab: System */}
            <button
              onClick={() => setActiveTab("system")}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12.5px] sm:text-[13px] transition-all cursor-pointer whitespace-nowrap",
                activeTab === "system"
                  ? "border border-[#D4A354] bg-[#FEF8EE] font-semibold text-[#8A5A12] shadow-2xs"
                  : "bg-[#F4F6F9] font-medium text-[#5B6478] hover:bg-[#EAEFF5]",
              )}
            >
              System ({systemCount})
            </button>
          </div>

          {/* Notification Items List */}
          <div className="mt-1 divide-y divide-[#F0ECE4] max-h-[360px] overflow-y-auto no-scrollbar">
            {filteredNotifications.length === 0 ? (
              <div className="py-8 text-center text-[13.5px] text-[#5B6478]">
                No notifications in this category.
              </div>
            ) : (
              filteredNotifications.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="group flex items-start gap-3.5 py-3.5 px-2 rounded-xl transition-colors hover:bg-[#FAF8F5] cursor-pointer"
                  >
                    {/* Circle Icon Badge */}
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105",
                        item.iconBg,
                        item.iconColor,
                      )}
                    >
                      <ItemIcon className={cn("size-5", item.id === "notif-2" && "-rotate-45")} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-1">
                      <h4 className="text-[14px] sm:text-[14.5px] font-bold text-[#0D1B3E] leading-snug group-hover:text-[#8A5A12] transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-[12px] sm:text-[12.5px] text-[#5B6478] leading-tight line-clamp-2">
                        {item.message}
                      </p>
                    </div>

                    {/* Timestamp & Indicator */}
                    <div className="flex flex-col items-end gap-1 shrink-0 pt-0.5">
                      <span className="text-[11.5px] text-[#8A93A6] whitespace-nowrap">
                        {item.time}
                      </span>
                      <div className="flex items-center gap-1">
                        {item.unread && (
                          <span className="size-2 rounded-full bg-[#E5382E] shadow-2xs" />
                        )}
                        <ChevronRight className="size-3.5 text-[#8A93A6] group-hover:text-[#0D1B3E] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer: View All Notifications Button */}
          <div className="mt-4 pt-3 border-t border-[#F0ECE4] text-center">
            <Link
              to="/notifications"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#D4A354] bg-white px-5 py-2 text-[13.5px] font-semibold text-[#8A5A12] transition-all hover:bg-[#FEF8EE] hover:border-[#AD7A27] hover:shadow-2xs active:scale-98 cursor-pointer w-full sm:w-auto"
            >
              <span>View All Notifications</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


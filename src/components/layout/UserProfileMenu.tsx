import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  User,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfileMenuProps {
  user?: {
    initials: string;
    name: string;
    empId?: string;
    email?: string;
  };
  className?: string;
}

export function UserProfileMenu({
  user = {
    initials: "AZ",
    name: "Azim",
    empId: "EMP001",
    email: "azim@dcbank.com",
  },
  className,
}: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
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

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    setIsOpen(false);
    navigate({ to: "/login", search: { variant: "A" } as any });
  };

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      {/* Trigger Button: AZ Azim v */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1 rounded-xl transition-all duration-150 hover:bg-black/5 active:scale-98 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User account menu"
      >
        <span className="flex size-9.5 items-center justify-center rounded-full bg-gradient-to-br from-[#BC8732] to-[#8C5D19] text-[14px] font-bold text-white shadow-xs">
          {user.initials}
        </span>
        <span className="text-[14.5px] font-semibold text-[#0D1B3E]">{user.name}</span>
        <ChevronDown
          className={cn(
            "size-4 text-[#5B6478] transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu (Image 1) */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[240px] rounded-2xl bg-white p-3 shadow-[0_12px_36px_rgba(13,27,62,0.14)] border border-[#EDE8E1] z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
          {/* Top User Info Section */}
          <div className="flex items-center gap-3 px-1 py-1">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#BC8732] to-[#8C5D19] text-[15px] font-bold text-white shadow-xs">
              {user.initials}
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="text-[15px] font-bold text-[#0D1B3E] leading-tight truncate">
                {user.name}
              </h4>
              <p className="text-[12px] text-[#5B6478] font-medium leading-tight mt-0.5">
                {user.empId || "EMP001"}
              </p>
              <p className="text-[11.5px] text-[#8A93A6] truncate leading-tight mt-0.5">
                {user.email || "azim@dcbank.com"}
              </p>
            </div>
          </div>

          <div className="my-2.5 h-px bg-[#F0ECE4]" />

          {/* Menu Items */}
          <div className="space-y-1">
            {/* 1. My Profile */}
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="group flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[14px] font-semibold text-[#0D1B3E] transition-all duration-150 hover:bg-[#F3F5F8] cursor-pointer"
            >
              <User className="size-4.5 text-[#0D1B3E] transition-transform group-hover:scale-105" />
              <span>My Profile</span>
            </Link>

            {/* 2. Log Out */}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsLogoutModalOpen(true);
              }}
              className="group flex w-full items-center gap-2.5 rounded-xl bg-[#FEF8EE] px-3 py-2 text-[14px] font-semibold text-[#8A5A12] border border-[#FBE6C4]/60 transition-all duration-150 hover:bg-[#FDEED3] cursor-pointer"
            >
              <LogOut className="size-4.5 text-[#8A5A12] transition-transform group-hover:translate-x-0.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal (Image 3) */}
      {isLogoutModalOpen && (
        <LogoutConfirmationModal
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}

/** Logout Confirmation Modal matching Image 3 */
export function LogoutConfirmationModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[400px] rounded-[24px] bg-white p-6 sm:p-7 shadow-[0_20px_60px_rgba(13,27,62,0.22)] border border-[#EDE8E1] text-center animate-in zoom-in-95 duration-200">
        {/* Top Close 'x' Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-[#8A93A6] hover:bg-[#F3F5F8] hover:text-[#0D1B3E] transition-colors"
          aria-label="Close"
        >
          <X className="size-4.5" />
        </button>

        {/* Circular Coral / Orange Logout Icon */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#FEF0EA] border border-[#FDDCD0] shadow-xs">
          <LogOut className="size-7 text-[#E54D2E] stroke-[2.2]" />
        </div>

        {/* Headline */}
        <h3 className="mt-4 text-[19px] sm:text-[20px] font-bold text-[#0D1B3E] tracking-tight">
          Are you sure you want to log out?
        </h3>

        {/* Subtext */}
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#5B6478]">
          You will be signed out from your Travgenie account.
        </p>

        {/* Bottom Actions */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-[#F3F5F8] py-2.5 px-4 text-[14.5px] font-semibold text-[#0D1B3E] hover:bg-[#EAEFF5] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-gradient-to-r from-[#BC8732] to-[#A37123] py-2.5 px-4 text-[14.5px] font-semibold text-white shadow-xs hover:from-[#AD7A27] hover:to-[#94641B] transition-all cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}


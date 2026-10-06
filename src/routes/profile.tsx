import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Edit2,
  Hotel,
  Lock,
  MoreHorizontal,
  Pencil,
  Plane,
  ShieldCheck,
  TicketCheck,
  TramFront,
  Bus,
  Car,
  User,
  X,
  Smartphone,
  Laptop,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { UserProfileMenu } from "@/components/layout/UserProfileMenu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile | TravGenie — Corporate Business Travel" },
      {
        name: "description",
        content: "Manage your personal information, travel preferences, and account security.",
      },
    ],
  }),
  component: MyProfilePage,
});

export function MyProfilePage() {
  // Profile state
  const [profile, setProfile] = useState({
    initials: "AZ",
    name: "Azim",
    empId: "EMP001",
    status: "Active",
    department: "Management",
    designation: "Admin",
    email: "azim@dcbank.com",
    phone: "+968 9123 4567",
    company: "DCB Bank",
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    cabinClass: "Economy",
    airlines: "Emirates, Qatar Airways",
    seat: "Aisle",
    meal: "Regular",
    frequentFlyer: "Not Added",
  });

  // Notification toggles state
  const [notifications, setNotifications] = useState({
    bookingConfirmations: true,
    approvalUpdates: true,
    policyAlerts: true,
    specialOffers: true,
  });

  // Modal states
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditPreferencesOpen, setIsEditPreferencesOpen] = useState(false);
  const [isManageSessionsOpen, setIsManageSessionsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast("Notification preferences updated");
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

            {/* Interactive User Profile Dropdown Menu (Image 1) */}
            <UserProfileMenu
              user={{
                initials: profile.initials,
                name: profile.name,
                empId: profile.empId,
                email: profile.email,
              }}
            />
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
                onClick={() => showToast("Train bookings coming soon")}
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-white hover:text-[#C9963B] transition-all text-[#475569]"
              >
                <TramFront className="size-4" />
                <span>Train</span>
              </button>
              <button
                onClick={() => showToast("Bus bookings coming soon")}
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-white hover:text-[#C9963B] transition-all text-[#475569]"
              >
                <Bus className="size-4" />
                <span>Bus</span>
              </button>
              <button
                onClick={() => showToast("Car rentals coming soon")}
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

      {/* 2. MAIN PROFILE CONTENT */}
      <main className="mx-auto max-w-[1260px] px-4 sm:px-6 py-8 sm:py-10">
        {/* Header Title & Edit Profile Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 sm:pb-8 animate-in fade-in slide-in-from-top-3 duration-400">
          <div>
            <h1 className="text-[28px] sm:text-[34px] font-bold text-[#0D1B3E] tracking-tight">
              My Profile
            </h1>
            <p className="mt-1 text-[14.5px] sm:text-[15.5px] text-[#5B6478]">
              Manage your personal information and travel preferences.
            </p>
          </div>

          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#BC8732] to-[#A37123] px-5 py-2.5 text-[14px] sm:text-[14.5px] font-semibold text-white shadow-sm transition-all duration-200 hover:from-[#AD7A27] hover:to-[#94641B] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-98 cursor-pointer self-start sm:self-auto"
          >
            <Pencil className="size-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* 4-Card 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Card 1: Profile Summary (Top-Left) */}
          <div className="rounded-2xl border border-[#EDE8E1] bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(13,27,62,0.04)] transition-all duration-300 hover:border-[#D9CFBE] hover:shadow-[0_8px_28px_rgba(13,27,62,0.07)] hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-3 duration-400">
            {/* Top Avatar & Name Info */}
            <div className="flex items-center gap-4 sm:gap-5 pb-6 border-b border-[#F0ECE4]">
              <span className="flex size-16 sm:size-18 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#BC8732] to-[#8C5D19] text-[22px] font-bold text-white shadow-xs">
                {profile.initials}
              </span>
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0D1B3E]">
                  {profile.name}
                </h2>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-[13.5px] text-[#5B6478]">
                    Employee ID: <strong className="font-semibold text-[#0D1B3E]">{profile.empId}</strong>
                  </span>
                  <span className="rounded-full bg-[#E7F7ED] px-2.5 py-0.5 text-[11.5px] font-semibold text-[#187D43] border border-[#BCE8CB]/60">
                    {profile.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Field Rows */}
            <div className="mt-5 space-y-3.5 text-[14px]">
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5B6478]">Department</span>
                <span className="font-semibold text-[#0D1B3E]">{profile.department}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5B6478]">Designation</span>
                <span className="font-semibold text-[#0D1B3E]">{profile.designation}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5B6478]">Email</span>
                <span className="font-semibold text-[#0D1B3E]">{profile.email}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5B6478]">Phone</span>
                <span className="font-semibold text-[#0D1B3E]">{profile.phone}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5B6478]">Company</span>
                <span className="font-semibold text-[#0D1B3E]">{profile.company}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Travel Preferences (Top-Right) */}
          <div className="rounded-2xl border border-[#EDE8E1] bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(13,27,62,0.04)] transition-all duration-300 hover:border-[#D9CFBE] hover:shadow-[0_8px_28px_rgba(13,27,62,0.07)] hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-3 duration-400 delay-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#F0ECE4]">
              <div className="flex items-center gap-2.5">
                <Plane className="size-5 text-[#BC8732] -rotate-45" />
                <h2 className="text-[17px] sm:text-[18px] font-bold text-[#0D1B3E]">
                  Travel Preferences
                </h2>
              </div>
              <button
                onClick={() => setIsEditPreferencesOpen(true)}
                className="text-[13.5px] font-semibold text-[#1E88E5] hover:text-[#1565C0] transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>

            {/* Field Rows */}
            <div className="mt-5 space-y-3.5 text-[14px]">
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5B6478]">Preferred Cabin Class</span>
                <span className="font-semibold text-[#0D1B3E]">{preferences.cabinClass}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5B6478]">Preferred Airlines</span>
                <span className="font-semibold text-[#0D1B3E]">{preferences.airlines}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5B6478]">Preferred Seat</span>
                <span className="font-semibold text-[#0D1B3E]">{preferences.seat}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5B6478]">Meal Preference</span>
                <span className="font-semibold text-[#0D1B3E]">{preferences.meal}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5B6478]">Frequent Flyer No.</span>
                <span className="font-semibold text-[#0D1B3E]">{preferences.frequentFlyer}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Notification Preferences (Bottom-Left) */}
          <div className="rounded-2xl border border-[#EDE8E1] bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(13,27,62,0.04)] transition-all duration-300 hover:border-[#D9CFBE] hover:shadow-[0_8px_28px_rgba(13,27,62,0.07)] hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-3 duration-400 delay-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#F0ECE4]">
              <div className="flex items-center gap-2.5">
                <Bell className="size-5 text-[#BC8732]" />
                <h2 className="text-[17px] sm:text-[18px] font-bold text-[#0D1B3E]">
                  Notification Preferences
                </h2>
              </div>
              <button
                onClick={() => showToast("Click individual toggles to update preferences")}
                className="text-[13.5px] font-semibold text-[#1E88E5] hover:text-[#1565C0] transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>

            {/* Toggle Rows */}
            <div className="mt-5 space-y-4 text-[14px]">
              {/* Row 1 */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[#5B6478]">Booking Confirmations</span>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-[#0D1B3E]">Email & In-App</span>
                  <Switch
                    checked={notifications.bookingConfirmations}
                    onChange={() => toggleNotification("bookingConfirmations")}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[#5B6478]">Approval Updates</span>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-[#0D1B3E]">Email & In-App</span>
                  <Switch
                    checked={notifications.approvalUpdates}
                    onChange={() => toggleNotification("approvalUpdates")}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[#5B6478]">Policy Alerts</span>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-[#0D1B3E]">Email Only</span>
                  <Switch
                    checked={notifications.policyAlerts}
                    onChange={() => toggleNotification("policyAlerts")}
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[#5B6478]">Special Offers</span>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-[#0D1B3E]">Email Only</span>
                  <Switch
                    checked={notifications.specialOffers}
                    onChange={() => toggleNotification("specialOffers")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Security & Login (Bottom-Right) */}
          <div className="rounded-2xl border border-[#EDE8E1] bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(13,27,62,0.04)] transition-all duration-300 hover:border-[#D9CFBE] hover:shadow-[0_8px_28px_rgba(13,27,62,0.07)] hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-3 duration-400 delay-300 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#F0ECE4]">
                <div className="flex items-center gap-2.5">
                  <Lock className="size-5 text-[#BC8732]" />
                  <h2 className="text-[17px] sm:text-[18px] font-bold text-[#0D1B3E]">
                    Security & Login
                  </h2>
                </div>
                <button
                  onClick={() => setIsManageSessionsOpen(true)}
                  className="text-[13.5px] font-semibold text-[#1E88E5] hover:text-[#1565C0] transition-colors cursor-pointer"
                >
                  Edit
                </button>
              </div>

              {/* Fields */}
              <div className="mt-5 space-y-3.5 text-[14px]">
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#5B6478]">Login Email</span>
                  <span className="font-semibold text-[#0D1B3E]">{profile.email}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#5B6478]">Last Login</span>
                  <span className="font-semibold text-[#0D1B3E]">10 Oct 2026, 10:24 AM</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#5B6478]">Two-Factor Authentication</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F7ED] px-3 py-0.5 text-[12px] font-semibold text-[#187D43] border border-[#BCE8CB]/60">
                    <CheckCircle2 className="size-3.5" />
                    <span>Enabled</span>
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#5B6478]">Active Sessions</span>
                  <span className="font-semibold text-[#0D1B3E]">1 Device</span>
                </div>
              </div>
            </div>

            {/* Bottom Manage Sessions Button */}
            <div className="mt-6 pt-4 border-t border-[#F0ECE4] flex justify-end">
              <button
                onClick={() => setIsManageSessionsOpen(true)}
                className="rounded-xl border border-[#D4A354] bg-white px-5 py-2 text-[13.5px] font-semibold text-[#8A5A12] transition-all duration-200 hover:bg-[#FDF9F0] hover:border-[#AD7A27] hover:shadow-xs active:scale-97 cursor-pointer"
              >
                Manage Sessions
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL 1: EDIT PROFILE */}
      {isEditProfileOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={(updated) => {
            setProfile(updated);
            setIsEditProfileOpen(false);
            showToast("Profile information updated successfully!");
          }}
        />
      )}

      {/* MODAL 2: EDIT TRAVEL PREFERENCES */}
      {isEditPreferencesOpen && (
        <EditPreferencesModal
          preferences={preferences}
          onClose={() => setIsEditPreferencesOpen(false)}
          onSave={(updated) => {
            setPreferences(updated);
            setIsEditPreferencesOpen(false);
            showToast("Travel preferences updated!");
          }}
        />
      )}

      {/* MODAL 3: MANAGE SESSIONS */}
      {isManageSessionsOpen && (
        <ManageSessionsModal
          onClose={() => setIsManageSessionsOpen(false)}
          onTerminateOthers={() => {
            setIsManageSessionsOpen(false);
            showToast("Terminated other active sessions.");
          }}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-[#0D1B3E] px-4 py-3 text-[13.5px] font-semibold text-white shadow-xl animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="size-4 text-[#1FA45B]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

/** Simple Toggle Switch component */
function Switch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
        checked ? "bg-[#1E88E5]" : "bg-[#D1D5DB]",
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}

/** Modal to Edit Profile Info */
function EditProfileModal({
  profile,
  onClose,
  onSave,
}: {
  profile: any;
  onClose: () => void;
  onSave: (p: any) => void;
}) {
  const [formData, setFormData] = useState({ ...profile });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-[24px] bg-white p-6 sm:p-7 shadow-2xl border border-[#EDE8E1] animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-[#F3F5F8] text-[#5B6478] hover:bg-[#E6EAF0] transition-colors"
        >
          <X className="size-4" />
        </button>

        <h3 className="text-[20px] font-bold text-[#0D1B3E]">Edit Profile Details</h3>
        <p className="mt-1 text-[13px] text-[#5B6478]">Update your personal and contact information.</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-[13.5px]">
          <div>
            <label className="block font-semibold text-[#0D1B3E] mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-[#D9CFBE] bg-white px-3.5 py-2 text-[#0D1B3E] outline-none focus:border-[#BC8732]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#0D1B3E] mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full rounded-xl border border-[#D9CFBE] bg-white px-3.5 py-2 text-[#0D1B3E] outline-none focus:border-[#BC8732]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#0D1B3E] mb-1">Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full rounded-xl border border-[#D9CFBE] bg-white px-3.5 py-2 text-[#0D1B3E] outline-none focus:border-[#BC8732]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#0D1B3E] mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-[#D9CFBE] bg-white px-3.5 py-2 text-[#0D1B3E] outline-none focus:border-[#BC8732]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#0D1B3E] mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-[#D9CFBE] bg-white px-3.5 py-2 text-[#0D1B3E] outline-none focus:border-[#BC8732]"
            />
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#D9CFBE] bg-white py-2.5 font-semibold text-[#5B6478] hover:bg-[#F8F6F2] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#BC8732] py-2.5 font-semibold text-white shadow-xs hover:bg-[#A37123] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** Modal to Edit Travel Preferences */
function EditPreferencesModal({
  preferences,
  onClose,
  onSave,
}: {
  preferences: any;
  onClose: () => void;
  onSave: (pref: any) => void;
}) {
  const [formData, setFormData] = useState({ ...preferences });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-[24px] bg-white p-6 sm:p-7 shadow-2xl border border-[#EDE8E1] animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-[#F3F5F8] text-[#5B6478] hover:bg-[#E6EAF0] transition-colors"
        >
          <X className="size-4" />
        </button>

        <h3 className="text-[20px] font-bold text-[#0D1B3E]">Edit Travel Preferences</h3>
        <p className="mt-1 text-[13px] text-[#5B6478]">Update your seating, meal, and airline priorities.</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-[13.5px]">
          <div>
            <label className="block font-semibold text-[#0D1B3E] mb-1">Preferred Cabin Class</label>
            <select
              value={formData.cabinClass}
              onChange={(e) => setFormData({ ...formData, cabinClass: e.target.value })}
              className="w-full rounded-xl border border-[#D9CFBE] bg-white px-3.5 py-2 text-[#0D1B3E] outline-none focus:border-[#BC8732]"
            >
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#0D1B3E] mb-1">Preferred Seat</label>
            <select
              value={formData.seat}
              onChange={(e) => setFormData({ ...formData, seat: e.target.value })}
              className="w-full rounded-xl border border-[#D9CFBE] bg-white px-3.5 py-2 text-[#0D1B3E] outline-none focus:border-[#BC8732]"
            >
              <option value="Aisle">Aisle</option>
              <option value="Window">Window</option>
              <option value="Middle">Middle (No preference)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#0D1B3E] mb-1">Meal Preference</label>
            <select
              value={formData.meal}
              onChange={(e) => setFormData({ ...formData, meal: e.target.value })}
              className="w-full rounded-xl border border-[#D9CFBE] bg-white px-3.5 py-2 text-[#0D1B3E] outline-none focus:border-[#BC8732]"
            >
              <option value="Regular">Regular</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Halal">Halal</option>
              <option value="Gluten-Free">Gluten-Free</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#0D1B3E] mb-1">Frequent Flyer Number</label>
            <input
              type="text"
              placeholder="e.g. EK 123456789"
              value={formData.frequentFlyer === "Not Added" ? "" : formData.frequentFlyer}
              onChange={(e) => setFormData({ ...formData, frequentFlyer: e.target.value || "Not Added" })}
              className="w-full rounded-xl border border-[#D9CFBE] bg-white px-3.5 py-2 text-[#0D1B3E] outline-none focus:border-[#BC8732]"
            />
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#D9CFBE] bg-white py-2.5 font-semibold text-[#5B6478] hover:bg-[#F8F6F2] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#BC8732] py-2.5 font-semibold text-white shadow-xs hover:bg-[#A37123] transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** Manage Sessions Modal */
function ManageSessionsModal({
  onClose,
  onTerminateOthers,
}: {
  onClose: () => void;
  onTerminateOthers: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-[24px] bg-white p-6 sm:p-7 shadow-2xl border border-[#EDE8E1] animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-[#F3F5F8] text-[#5B6478] hover:bg-[#E6EAF0] transition-colors"
        >
          <X className="size-4" />
        </button>

        <h3 className="text-[20px] font-bold text-[#0D1B3E]">Active Device Sessions</h3>
        <p className="mt-1 text-[13px] text-[#5B6478]">Manage where your corporate account is currently signed in.</p>

        <div className="mt-5 space-y-3">
          {/* Current device */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#BCE8CB] bg-[#F4FBF6]">
            <div className="flex items-center gap-3">
              <Laptop className="size-5 text-[#1FA45B]" />
              <div>
                <span className="font-bold text-[13.5px] text-[#0D1B3E] block">Windows PC • Chrome</span>
                <span className="text-[12px] text-[#5B6478]">Current Session • Muscat, Oman</span>
              </div>
            </div>
            <span className="text-[11.5px] font-bold text-[#187D43] bg-white px-2 py-0.5 rounded-md border border-[#BCE8CB]">
              Active
            </span>
          </div>
        </div>

        <div className="mt-6 pt-3 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#D9CFBE] bg-white py-2.5 font-semibold text-[#5B6478] hover:bg-[#F8F6F2] transition-colors text-[13.5px]"
          >
            Close
          </button>
          <button
            onClick={onTerminateOthers}
            className="flex-1 rounded-xl bg-[#BC8732] py-2.5 font-semibold text-white shadow-xs hover:bg-[#A37123] transition-colors text-[13.5px]"
          >
            Log Out Other Devices
          </button>
        </div>
      </div>
    </div>
  );
}


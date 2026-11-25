import React, { useState } from "react";
import AdminLayout from "../../components/layouts/admin/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import { Notification } from "@/components/notification";

type SettingsTab = "General" | "Team & access" | "Notifications" | "Security" | "Integrations";

interface SettingsState {
  username: string;
  email: string;
  role: string;
  language: string;
  workspaceName: string;
  timeZone: string;
  dateFormat: string;
  weekStartsOn: string;
  weeklySummary: boolean;
  ruleReviewRequests: boolean;
  productNews: boolean;
  twoFactorEnabled: boolean;
}

interface PasswordErrors {
  currentPassword?: string;
  NewPassword?: string;
  NewPasswordConfirmation?: string;
}

const defaultSettings: SettingsState = {
  username: "",
  email: "",
  role: "",
  language: "English",
  workspaceName: "Well Diet",
  timeZone: "(UTC+07:00) Jakarta",
  dateFormat: "DD / MM / YYYY",
  weekStartsOn: "Monday",
  weeklySummary: true,
  ruleReviewRequests: true,
  productNews: false,
  twoFactorEnabled: false,
};

const settingsTabs: SettingsTab[] = [
  "General",
  "Team & access",
  "Notifications",
  "Security",
  "Integrations",
];

export const AdminSettingsPage: React.FC = () => {
  const { user } = useAuth();

  const username = user?.username ?? "";
  const email = user?.email ?? "";
  const role = user?.role ?? "Admin";

  const [activeTab, setActiveTab] = useState<SettingsTab>("General");
  const [savedData, setSavedData] = useState<SettingsState>({
    ...defaultSettings,
    username: username,
    email: email,
    role: role
  });
  const [formData, setFormData] = useState<SettingsState>({
    ...defaultSettings,
    username: username,
    email: email,
    role: role
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("");
  const [lastPasswordChanged, setLastPasswordChanged] = useState("October 22, 2026");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<PasswordErrors>({});

  const handleFieldChange = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSaveSuccess(false);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    setFormData(savedData);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/profile-change`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            formData
          })
        },
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }
    } catch (error: any) {

    } finally {
      setIsLoading(false);
    }

    setSavedData(formData);
    setSaveSuccess(true);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedPassword: PasswordErrors = {};

    if(!currentPassword) {
      validatedPassword.currentPassword = "Current password cannot be empty.";
    }

    if(!newPassword) {
      validatedPassword.NewPassword = "New password cannot be empty.";
    }

    if(!newPasswordConfirmation) {
      validatedPassword.NewPasswordConfirmation = "New password confirmation cannot be empty.";
    }

    if(newPassword && newPasswordConfirmation && newPassword !== newPasswordConfirmation) {
      validatedPassword.NewPasswordConfirmation = "New password does not match.";
    }

    setErrorMessage(validatedPassword);

    if(Object.keys(validatedPassword).length > 0) return;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/change-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          current: currentPassword,
          password: newPassword
        })
      }
    );
    
    const result = await response.json();

    if(!response.ok) {
      Notification(
        result.message,
        "error",
        false
      );

      return;
    }

    Notification(
      result.message,
      "success",
      false
    );

    const updatedAt = result.updateDate;

    setLastPasswordChanged("November 15, 2026");
    setCurrentPassword("");
    setNewPassword("");
    setIsPasswordModalOpen(false);
    setSaveSuccess(true);
  };

  if(isLoading) {
    <p>Loading...</p>
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-330 space-y-6">
        {/* Top Page Header & Action Buttons */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5D7366]">
              Make Space For Better Work
            </p>
            <h1 className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#182B20] sm:text-[36px]">
              Settings
            </h1>
            <p className="mt-1 text-xs text-[#5A6560] sm:text-sm">
              Manage your profile, workspace preferences, and how you stay connected.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {saveSuccess && (
              <span className="mr-1 text-xs font-medium text-[#2C4C3B]">
                ✓ Changes saved
              </span>
            )}

            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white px-5 py-2 text-xs font-medium text-[#182B20] transition-colors hover:bg-stone-50"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#2C4C3B] px-5 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
            >
              Save changes
            </button>
          </div>
        </div>

        {/* Horizontal Sub-Navigation Tab Bar */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200/90 bg-white p-1.5">
          <div className="flex min-w-max items-center gap-2 sm:gap-4">
            {settingsTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer rounded-xl px-5 py-2 text-xs transition-colors ${
                    isActive
                      ? "bg-[#E4ECE0] font-semibold text-[#182B20]"
                      : "font-medium text-[#6E7A74] hover:bg-stone-50 hover:text-[#182B20]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace Protection Notice Banner */}
        <div className="rounded-2xl bg-[#E4ECE0] px-5 py-4">
          <p className="text-xs font-semibold text-[#213A2D]">
            Your workspace, thoughtfully protected.
          </p>
          <p className="mt-0.5 text-[11px] text-[#4E6458]">
            Only administrators can change workspace details. Personal preferences apply to your
            account only.
          </p>
        </div>

        {/* General Tab Content (2x2 Grid Cards) */}
        {activeTab === "General" ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Card 1: Your Profile */}
            <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
              <h2 className="font-serif text-xl font-normal text-[#182B20]">Your profile</h2>
              <p className="mt-0.5 text-xs text-[#6E7A74]">
                Your details are visible to the Well Diet team.
              </p>

              <div className="mt-5 space-y-4">
                {/* First & Last Name */}
                <div>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 block text-xs font-medium text-[#182B20]"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleFieldChange("username", e.target.value)}
                      className="w-full rounded-xl border border-stone-200/80 bg-[#F6F6F2] px-3.5 py-2.5 text-xs font-medium text-[#182B20] transition-colors focus:border-[#2C4C3B] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="profileEmail"
                    className="mb-1.5 block text-xs font-medium text-[#182B20]"
                  >
                    Email address
                  </label>
                  <input
                    id="profileEmail"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className="w-full rounded-xl border border-stone-200/80 bg-[#F6F6F2] px-3.5 py-2.5 text-xs font-medium text-[#182B20] transition-colors focus:border-[#2C4C3B] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Role & Language */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="profileRole"
                      className="mb-1.5 block text-xs font-medium text-[#182B20]"
                    >
                      Role
                    </label>
                    <input
                      id="profileRole"
                      type="text"
                      readOnly
                      value={formData.role}
                      className="w-full cursor-not-allowed rounded-xl border border-stone-200/80 bg-[#F6F6F2] px-3.5 py-2.5 text-xs font-medium text-[#5A6560] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profileLanguage"
                      className="mb-1.5 block text-xs font-medium text-[#182B20]"
                    >
                      Language
                    </label>
                    <div className="relative">
                      <select
                        id="profileLanguage"
                        value={formData.language}
                        onChange={(e) => handleFieldChange("language", e.target.value)}
                        className="w-full cursor-pointer appearance-none rounded-xl border border-stone-200/80 bg-[#F6F6F2] py-2.5 pr-8 pl-3.5 text-xs font-medium text-[#182B20] transition-colors focus:border-[#2C4C3B] focus:bg-white focus:outline-none"
                      >
                        <option value="English">English</option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                      </select>
                      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] text-[#5A6560]">
                        ▾
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Workspace Preferences */}
            <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
              <h2 className="font-serif text-xl font-normal text-[#182B20]">
                Workspace preferences
              </h2>
              <p className="mt-0.5 text-xs text-[#6E7A74]">
                Keep your team aligned, wherever they work.
              </p>

              <div className="mt-5 space-y-4">
                {/* Workspace Name */}
                <div>
                  <label
                    htmlFor="workspaceName"
                    className="mb-1.5 block text-xs font-medium text-[#182B20]"
                  >
                    Workspace name
                  </label>
                  <input
                    id="workspaceName"
                    type="text"
                    value={formData.workspaceName}
                    onChange={(e) => handleFieldChange("workspaceName", e.target.value)}
                    className="w-full rounded-xl border border-stone-200/80 bg-[#F6F6F2] px-3.5 py-2.5 text-xs font-medium text-[#182B20] transition-colors focus:border-[#2C4C3B] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Time Zone */}
                <div>
                  <label
                    htmlFor="timeZone"
                    className="mb-1.5 block text-xs font-medium text-[#182B20]"
                  >
                    Time zone
                  </label>
                  <div className="relative">
                    <select
                      id="timeZone"
                      value={formData.timeZone}
                      onChange={(e) => handleFieldChange("timeZone", e.target.value)}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-stone-200/80 bg-[#F6F6F2] py-2.5 pr-8 pl-3.5 text-xs font-medium text-[#182B20] transition-colors focus:border-[#2C4C3B] focus:bg-white focus:outline-none"
                    >
                      <option value="(UTC+07:00) Jakarta">(UTC+07:00) Jakarta</option>
                      <option value="(UTC+08:00) Singapore">(UTC+08:00) Singapore</option>
                      <option value="(UTC+00:00) London">(UTC+00:00) London</option>
                      <option value="(UTC-05:00) New York">(UTC-05:00) New York</option>
                    </select>
                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] text-[#5A6560]">
                      ▾
                    </span>
                  </div>
                </div>

                {/* Date Format & Week Starts On */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="dateFormat"
                      className="mb-1.5 block text-xs font-medium text-[#182B20]"
                    >
                      Date format
                    </label>
                    <div className="relative">
                      <select
                        id="dateFormat"
                        value={formData.dateFormat}
                        onChange={(e) => handleFieldChange("dateFormat", e.target.value)}
                        className="w-full cursor-pointer appearance-none rounded-xl border border-stone-200/80 bg-[#F6F6F2] py-2.5 pr-8 pl-3.5 text-xs font-medium text-[#182B20] transition-colors focus:border-[#2C4C3B] focus:bg-white focus:outline-none"
                      >
                        <option value="DD / MM / YYYY">DD / MM / YYYY</option>
                        <option value="MM / DD / YYYY">MM / DD / YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] text-[#5A6560]">
                        ▾
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="weekStartsOn"
                      className="mb-1.5 block text-xs font-medium text-[#182B20]"
                    >
                      Week starts on
                    </label>
                    <div className="relative">
                      <select
                        id="weekStartsOn"
                        value={formData.weekStartsOn}
                        onChange={(e) => handleFieldChange("weekStartsOn", e.target.value)}
                        className="w-full cursor-pointer appearance-none rounded-xl border border-stone-200/80 bg-[#F6F6F2] py-2.5 pr-8 pl-3.5 text-xs font-medium text-[#182B20] transition-colors focus:border-[#2C4C3B] focus:bg-white focus:outline-none"
                      >
                        <option value="Monday">Monday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] text-[#5A6560]">
                        ▾
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Stay in the Loop */}
            <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
              <h2 className="font-serif text-xl font-normal text-[#182B20]">Stay in the loop</h2>
              <p className="mt-0.5 text-xs text-[#6E7A74]">
                Choose the updates that matter to you.
              </p>

              <div className="mt-5 divide-y divide-stone-100">
                {/* Toggle 1 */}
                <div className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1">
                  <div>
                    <p className="text-xs font-semibold text-[#182B20]">Weekly summary</p>
                    <p className="mt-0.5 text-[11px] text-[#7D8A83]">
                      A digest of member wellbeing and workspace activity.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.weeklySummary}
                    onClick={() => handleFieldChange("weeklySummary", !formData.weeklySummary)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                      formData.weeklySummary ? "bg-[#2C4C3B]" : "bg-[#E2E4DE]"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-2xs transition-transform ${
                        formData.weeklySummary ? "translate-x-4.5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 2 */}
                <div className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1">
                  <div>
                    <p className="text-xs font-semibold text-[#182B20]">Rule review requests</p>
                    <p className="mt-0.5 text-[11px] text-[#7D8A83]">
                      Get notified when a rule needs your approval.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.ruleReviewRequests}
                    onClick={() =>
                      handleFieldChange("ruleReviewRequests", !formData.ruleReviewRequests)
                    }
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                      formData.ruleReviewRequests ? "bg-[#2C4C3B]" : "bg-[#E2E4DE]"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-2xs transition-transform ${
                        formData.ruleReviewRequests ? "translate-x-4.5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 3 */}
                <div className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1">
                  <div>
                    <p className="text-xs font-semibold text-[#182B20]">Product news</p>
                    <p className="mt-0.5 text-[11px] text-[#7D8A83]">
                      Occasional updates about new Well Diet features.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.productNews}
                    onClick={() => handleFieldChange("productNews", !formData.productNews)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                      formData.productNews ? "bg-[#2C4C3B]" : "bg-[#E2E4DE]"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-2xs transition-transform ${
                        formData.productNews ? "translate-x-4.5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4: Account Security */}
            <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
              <h2 className="font-serif text-xl font-normal text-[#182B20]">Account security</h2>
              <p className="mt-0.5 text-xs text-[#6E7A74]">
                A little peace of mind for your everyday work.
              </p>

              <div className="mt-5 divide-y divide-stone-100">
                {/* Password Row */}
                <div className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1">
                  <div>
                    <p className="text-xs font-semibold text-[#182B20]">Password</p>
                    <p className="mt-0.5 text-[11px] text-[#7D8A83]">
                      Last changed {lastPasswordChanged}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="cursor-pointer rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-[#182B20] transition-colors hover:bg-stone-50"
                  >
                    Change password
                  </button>
                </div>

                {/* Two-factor Authentication Row */}
                <div className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1">
                  <div>
                    <p className="text-xs font-semibold text-[#182B20]">
                      Two-factor authentication
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#7D8A83]">
                      An extra layer of protection for your account.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleFieldChange("twoFactorEnabled", !formData.twoFactorEnabled)
                    }
                    className={`cursor-pointer rounded-full px-3.5 py-1 text-[11px] font-medium transition-colors ${
                      formData.twoFactorEnabled
                        ? "bg-[#E4ECE0] text-[#2C4C3B]"
                        : "bg-stone-100 text-[#6E7A74]"
                    }`}
                  >
                    {formData.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </button>
                </div>

                {/* Active Sessions Row */}
                <div className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1">
                  <div>
                    <p className="text-xs font-semibold text-[#182B20]">Active sessions</p>
                    <p className="mt-0.5 text-[11px] text-[#7D8A83]">
                      1 device · Current browser
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("Security")}
                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#2C4C3B] hover:underline"
                  >
                    <span>Manage</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Placeholder tampilan untuk tab sekunder agar tidak kosong saat diklik */
          <div className="rounded-2xl border border-stone-200/90 bg-white p-8">
            <h2 className="font-serif text-xl font-normal text-[#182B20]">{activeTab}</h2>
            <p className="mt-1 text-xs text-[#6E7A74]">
              Configure {activeTab.toLowerCase()} settings for your Well Diet workspace.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab("General")}
              className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#2C4C3B] hover:underline"
            >
              <span>← Back to General settings</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal Change Password */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">Change password</h3>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Current password <span className="text-[#182B20]">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
                {errorMessage.currentPassword && (
                  <span className={`
                      ${errorMessage === null ? 'hidden' : ''}
                      text-xs text-[#182B20] bg-[#E4ECE0] font-bold px-2 py-1.5 rounded-xl
                    `}
                  >
                    {errorMessage.currentPassword}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  New password <span className="text-[#182B20]">*</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
                {errorMessage.NewPassword && (
                  <span className={`
                      ${errorMessage === null ? 'hidden' : ''}
                      text-xs text-[#182B20] bg-[#E4ECE0] font-bold px-2 py-1.5 rounded-xl
                    `}
                  >
                    {errorMessage.NewPassword}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  New password Confirmation <span className="text-[#182B20]">*</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPasswordConfirmation}
                  onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
                {errorMessage.NewPasswordConfirmation && (
                  <span className={`
                      ${errorMessage === null ? 'hidden' : ''}
                      text-xs text-[#182B20] bg-[#E4ECE0] font-bold px-2 py-1.5 rounded-xl
                    `}
                  >
                    {errorMessage.NewPasswordConfirmation}
                  </span>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-[#5A6560] hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#2C4C3B] px-5 py-2 text-xs font-medium text-white hover:bg-[#213A2D]"
                >
                  Update password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSettingsPage;
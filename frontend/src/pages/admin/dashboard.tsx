import React, { useState } from "react";
import AdminLayout from "../../components/layouts/admin/AdminLayout";

type TimeRange = "7 days" | "30 days" | "90 days";
type MemberFilter = "all" | "needs_care";

interface MemberItem {
  id: string;
  initials: string;
  name: string;
  email: string;
  plan: string;
  status: "Active" | "Needs care";
  engagement: number;
}

const kpiCards = [
  {
    title: "Total members",
    value: "2,846",
    delta: "+12.8%",
    subtitle: "324 new members this month",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-[#4A5D52]">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7a3 3 0 11-6 0 3 3 0 016 0zM4 16.5a5.5 5.5 0 0112 0"
        />
      </svg>
    ),
  },
  {
    title: "Active nutrition plans",
    value: "1,924",
    delta: "+8.2%",
    subtitle: "Across 12 curated programs",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-[#4A5D52]">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 3.5H5.5a1 1 0 00-1 1v11a1 1 0 001 1h9a1 1 0 001-1V9"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 3.5l3 3-6.5 6.5H7v-3l6.5-6.5z" />
      </svg>
    ),
  },
  {
    title: "Weekly engagement",
    value: "78.6%",
    delta: "+5.4%",
    subtitle: "Members building healthy habits",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-[#4A5D52]">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 16.5s-6-3.8-6-8.3A3.5 3.5 0 0110 5.6a3.5 3.5 0 016 2.6c0 4.5-6 8.3-6 8.3z"
        />
      </svg>
    ),
  },
  {
    title: "Plan completion",
    value: "86.2%",
    delta: "+3.1%",
    subtitle: "Small steps, lasting progress",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-[#4A5D52]">
        <circle cx="10" cy="10" r="7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 10.2l2 2 4-4.2" />
      </svg>
    ),
  },
];

const planBreakdown = [
  { name: "Balanced living", members: "808 members", percentage: 42, color: "bg-[#2C4C3B]" },
  { name: "Mindful weight care", members: "539 members", percentage: 28, color: "bg-[#6E9375]" },
  { name: "Plant-powered", members: "346 members", percentage: 18, color: "bg-[#A9C2AD]" },
  { name: "Energy & vitality", members: "231 members", percentage: 12, color: "bg-[#D5E2D7]" },
];

const initialMembers: MemberItem[] = [
  {
    id: "1",
    initials: "OB",
    name: "Olivia Bennett",
    email: "olivia.bennett@email.com",
    plan: "Balanced living",
    status: "Active",
    engagement: 92,
  },
  {
    id: "2",
    initials: "JW",
    name: "James Wilson",
    email: "james.wilson@email.com",
    plan: "Plant-powered",
    status: "Active",
    engagement: 85,
  },
  {
    id: "3",
    initials: "SC",
    name: "Sophia Chen",
    email: "sophia.chen@email.com",
    plan: "Mindful weight care",
    status: "Active",
    engagement: 78,
  },
  {
    id: "4",
    initials: "NW",
    name: "Noah Williams",
    email: "noah.williams@email.com",
    plan: "Energy & vitality",
    status: "Needs care",
    engagement: 34,
  },
  {
    id: "5",
    initials: "ID",
    name: "Isabella Davis",
    email: "isabella.davis@email.com",
    plan: "Balanced living",
    status: "Active",
    engagement: 88,
  },
];

const liveActivities = [
  {
    id: "a1",
    bold: "12 new members",
    text: " started their wellness journey.",
    meta: "Member registrations · 12 min ago",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5 text-[#2C4C3B]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7a3 3 0 11-6 0 3 3 0 016 0zM4 16a5 5 0 0110 0M15 8v4m-2-2h4" />
      </svg>
    ),
  },
  {
    id: "a2",
    bold: "Autumn balance",
    text: " nutrition plan published by Dr. Sarah Miller.",
    meta: "Nutrition plans · 38 min ago",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5 text-[#2C4C3B]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h6l3 3v11H6V3z" />
      </svg>
    ),
  },
  {
    id: "a3",
    bold: "Olivia Bennett",
    text: " completed her 30-day Balanced living plan.",
    meta: "Member milestone · 1 hour ago",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5 text-[#2C4C3B]">
        <circle cx="10" cy="8" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 11.5L6.5 17l3.5-1.8 3.5 1.8-1-5.5" />
      </svg>
    ),
  },
  {
    id: "a4",
    bold: "Weekly check-in",
    text: " completed by 218 members today.",
    meta: "Wellness engagement · 2 hours ago",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5 text-[#2C4C3B]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 16s-5.5-3.4-5.5-7.5A3.2 3.2 0 0110 6a3.2 3.2 0 015.5 2.5C15.5 12.6 10 16 10 16z" />
      </svg>
    ),
  },
];

export const AdminDashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("30 days");
  const [memberFilter, setMemberFilter] = useState<MemberFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = initialMembers.filter((member) => {
    const matchesTab =
      memberFilter === "all" || (memberFilter === "needs_care" && member.status === "Needs care");
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.plan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="mx-auto max-w-[1320px] space-y-6">
        {/* Top Greeting & Date / Export Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5D7366]">
              Growing Well, Together
            </p>
            <h1 className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#182B20] sm:text-[34px]">
              A healthier community, at a glance.
            </h1>
            <p className="mt-1 text-xs text-[#5A6560] sm:text-sm">
              Welcome back, Emma. Here&apos;s how Well Diet is nourishing everyday wellbeing.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="text-[11px] text-[#7D8A83]">Monday, November 9, 2026</span>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-[#182B20] transition-colors hover:bg-stone-50"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 text-[#5A6560]">
                  <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
                  <path strokeLinecap="round" d="M5.5 2v2.5M10.5 2v2.5M2.5 6.5h11" />
                </svg>
                <span>Nov 1 – 30, 2026</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#2C4C3B] px-4 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 2.5v7.5m0 0l-3-3m3 3l3-3M3 13.5h10" />
                </svg>
                <span>Export report</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-stone-200/90 bg-white p-5 transition-shadow hover:shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#5A6560]">{card.title}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F4F6F1]">
                  {card.icon}
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="font-serif text-3xl font-normal text-[#182B20]">{card.value}</span>
                <span className="inline-flex items-center rounded-full bg-[#E6EDE4] px-2 py-0.5 text-[10px] font-semibold text-[#2C4C3B]">
                  ↗ {card.delta}
                </span>
              </div>

              <p className="mt-2 text-[11px] text-[#7D8A83]">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Middle Row: Healthy Habits Chart + Nourishment by Plan */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left 8 Cols: Line Chart Card */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-6 lg:col-span-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h2 className="font-serif text-xl font-normal text-[#182B20]">
                  Healthy habits in motion
                </h2>
                <p className="mt-0.5 text-xs text-[#6E7A74]">
                  Daily member activity · Last {timeRange}
                </p>

                {/* Legend */}
                <div className="mt-3 flex items-center gap-5 text-[11px] text-[#5A6560]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#2C4C3B]" />
                    Meal logs
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#8FB095]" />
                    Wellness check-ins
                  </span>
                </div>
              </div>

              {/* Range Switcher */}
              <div className="inline-flex rounded-full border border-stone-200/80 bg-[#FAF9F6] p-1">
                {(["7 days", "30 days", "90 days"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setTimeRange(range)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                      timeRange === range
                        ? "bg-white text-[#182B20] shadow-2xs"
                        : "text-[#6E7A74] hover:text-[#182B20]"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Smooth Dual-Line Chart */}
            <div className="mt-5">
              <svg viewBox="0 0 640 190" className="h-48 w-full overflow-visible">
                <defs>
                  <linearGradient id="mealLogsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2C4C3B" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#2C4C3B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines & Y-Axis Labels */}
                {[
                  { y: 20, label: "1,200" },
                  { y: 60, label: "900" },
                  { y: 100, label: "600" },
                  { y: 140, label: "300" },
                ].map((row) => (
                  <g key={row.label}>
                    <text x="0" y={row.y + 4} className="fill-[#8C9892] text-[10px]">
                      {row.label}
                    </text>
                    <line
                      x1="38"
                      y1={row.y}
                      x2="630"
                      y2={row.y}
                      stroke="#ECECE8"
                      strokeWidth="1"
                    />
                  </g>
                ))}

                {/* Area Under Primary Line */}
                <path
                  d="M 45 125 C 75 120, 85 95, 110 102 C 135 109, 150 75, 175 78 C 200 81, 215 62, 240 68 C 265 74, 285 92, 310 85 C 335 78, 355 48, 380 50 C 405 52, 425 58, 450 45 C 475 32, 495 40, 520 30 C 545 20, 565 32, 590 25 L 625 18 L 625 145 L 45 145 Z"
                  fill="url(#mealLogsFill)"
                />

                {/* Dashed Secondary Line (Wellness check-ins) */}
                <path
                  d="M 45 135 C 75 132, 90 112, 115 118 C 140 124, 155 96, 180 98 C 205 100, 225 84, 250 90 C 275 96, 295 104, 320 96 C 345 88, 365 65, 390 68 C 415 71, 435 74, 460 62 C 485 50, 505 58, 530 48 C 555 38, 580 48, 625 36"
                  fill="none"
                  stroke="#9AB89F"
                  strokeWidth="1.75"
                  strokeDasharray="4 4"
                />

                {/* Primary Solid Line (Meal logs) */}
                <path
                  d="M 45 125 C 75 120, 85 95, 110 102 C 135 109, 150 75, 175 78 C 200 81, 215 62, 240 68 C 265 74, 285 92, 310 85 C 335 78, 355 48, 380 50 C 405 52, 425 58, 450 45 C 475 32, 495 40, 520 30 C 545 20, 565 32, 590 25 L 625 18"
                  fill="none"
                  stroke="#2C4C3B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* X-Axis Dates */}
                {[
                  { x: 45, label: "Oct 11" },
                  { x: 140, label: "Oct 16" },
                  { x: 235, label: "Oct 21" },
                  { x: 330, label: "Oct 26" },
                  { x: 425, label: "Oct 31" },
                  { x: 520, label: "Nov 5" },
                  { x: 605, label: "Nov 9" },
                ].map((tick) => (
                  <text key={tick.label} x={tick.x} y="168" className="fill-[#8C9892] text-[10px]">
                    {tick.label}
                  </text>
                ))}
              </svg>
            </div>

            <div className="mt-2 flex items-center gap-2 border-t border-stone-100 pt-3 text-[11px] text-[#5A6560]">
              <span className="font-semibold text-[#2C4C3B]">↗</span>
              <span>
                Meal logging is up <strong className="font-semibold text-[#182B20]">18.4%</strong>{" "}
                compared with the previous 30 days.
              </span>
            </div>
          </div>

          {/* Right 4 Cols: Nourishment by Plan */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 lg:col-span-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-serif text-xl font-normal text-[#182B20]">
                    Nourishment, by plan
                  </h2>
                  <p className="mt-0.5 text-xs text-[#6E7A74]">1,924 active plans · 12 programs</p>
                </div>
                <button
                  type="button"
                  aria-label="More options"
                  className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100"
                >
                  •••
                </button>
              </div>

              {/* Segmented Horizontal Bar */}
              <div className="mt-5 flex h-2.5 w-full gap-1 overflow-hidden rounded-full">
                {planBreakdown.map((item) => (
                  <div
                    key={item.name}
                    style={{ width: `${item.percentage}%` }}
                    className={`${item.color} h-full rounded-full`}
                  />
                ))}
              </div>

              {/* Breakdown List */}
              <div className="mt-6 space-y-4">
                {planBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-start gap-2.5">
                      <span className={`mt-1.5 h-2 w-2 rounded-full ${item.color}`} />
                      <div>
                        <p className="text-xs font-medium text-[#182B20]">{item.name}</p>
                        <p className="text-[11px] text-[#7D8A83]">{item.members}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#182B20]">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Members Table + Around Well Diet Live Feed */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left 8 Cols: Your Members Table */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-6 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-baseline gap-2.5">
                <h2 className="font-serif text-xl font-normal text-[#182B20]">Your members</h2>
                <span className="text-xs text-[#7D8A83]">2,846</span>
              </div>

              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#2C4C3B] hover:underline"
              >
                <span>+</span>
                <span>Add member</span>
              </button>
            </div>

            {/* Filter Tabs & Search */}
            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => setMemberFilter("all")}
                  className={`cursor-pointer pb-1 font-medium transition-colors ${
                    memberFilter === "all"
                      ? "border-b-2 border-[#2C4C3B] font-semibold text-[#182B20]"
                      : "text-[#6E7A74] hover:text-[#182B20]"
                  }`}
                >
                  All members
                </button>
                <button
                  type="button"
                  onClick={() => setMemberFilter("needs_care")}
                  className={`cursor-pointer pb-1 font-medium transition-colors ${
                    memberFilter === "needs_care"
                      ? "border-b-2 border-[#2C4C3B] font-semibold text-[#182B20]"
                      : "text-[#6E7A74] hover:text-[#182B20]"
                  }`}
                >
                  Needs care (24)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#8C9892]"
                  >
                    <circle cx="7" cy="7" r="4.5" />
                    <path strokeLinecap="round" d="M10.5 10.5L13.5 13.5" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search members"
                    className="w-44 rounded-full border border-stone-200 bg-[#FAF9F6] py-1.5 pr-3 pl-8 text-xs text-[#182B20] placeholder:text-[#8C9892] focus:border-[#2C4C3B] focus:bg-white focus:outline-none sm:w-52"
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-[#182B20] hover:bg-stone-50"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" d="M2.5 4.5h11M4.5 8h7M6.5 11.5h3" />
                  </svg>
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-y border-stone-200/80 bg-[#FAF9F6] text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                    <th className="w-8 py-2.5 pl-3">
                      <input type="checkbox" aria-label="Select all members" className="rounded border-stone-300" />
                    </th>
                    <th className="py-2.5 pr-4">Member</th>
                    <th className="py-2.5 pr-4">Nutrition Plan</th>
                    <th className="py-2.5 pr-4">Status</th>
                    <th className="py-2.5 pr-4">Engagement</th>
                    <th className="w-8 py-2.5 pr-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {filteredMembers.map((member) => {
                    const isNeedsCare = member.status === "Needs care";
                    return (
                      <tr key={member.id} className="transition-colors hover:bg-[#FAF9F6]/80">
                        <td className="py-3 pl-3">
                          <input
                            type="checkbox"
                            aria-label={`Select ${member.name}`}
                            className="rounded border-stone-300"
                          />
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E6EDE4] text-[11px] font-semibold text-[#2C4C3B]">
                              {member.initials}
                            </span>
                            <div>
                              <p className="font-medium text-[#182B20]">{member.name}</p>
                              <p className="text-[11px] text-[#7D8A83]">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-[#5A6560]">{member.plan}</td>
                        <td className="py-3 pr-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                              isNeedsCare
                                ? "bg-amber-50 text-amber-800"
                                : "bg-[#E6EDE4] text-[#2C4C3B]"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isNeedsCare ? "bg-amber-600" : "bg-[#2C4C3B]"
                              }`}
                            />
                            {member.status}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2.5">
                            <div className="h-1.5 w-14 overflow-hidden rounded-full bg-stone-200/80">
                              <div
                                style={{ width: `${member.engagement}%` }}
                                className={`h-full rounded-full ${
                                  isNeedsCare ? "bg-amber-700/70" : "bg-[#2C4C3B]"
                                }`}
                              />
                            </div>
                            <span className="text-[11px] font-medium text-[#5A6560]">
                              {member.engagement}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-right text-[#7D8A83]">•••</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-3.5 text-[11px] text-[#7D8A83]">
              <span>Showing 1–{filteredMembers.length} of 2,846 members</span>
              <div className="flex items-center gap-1">
                <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                  &lt;
                </button>
                <button
                  type="button"
                  className="rounded-md bg-[#E6EDE4] px-2.5 py-1 font-semibold text-[#2C4C3B]"
                >
                  1
                </button>
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  2
                </button>
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  3
                </button>
                <span className="px-1">...</span>
                <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Around Well Diet Live Activity */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 lg:col-span-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-normal text-[#182B20]">Around Well Diet</h2>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2C4C3B]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <div className="mt-5 divide-y divide-stone-100">
                {liveActivities.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4F6F1]">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs leading-relaxed text-[#182B20]">
                        <strong className="font-semibold">{item.bold}</strong>
                        {item.text}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#7D8A83]">{item.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-stone-100 pt-3.5">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#2C4C3B] hover:underline"
              >
                <span>View all activity</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
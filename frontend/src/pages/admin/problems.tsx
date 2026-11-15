import React, { useState } from "react";
import AdminLayout from "../../components/layouts/admin/AdminLayout";

type ProblemStatus = "New" | "Investigating" | "Known error" | "Resolved";
type ProblemPriority = "High" | "Medium" | "Low";
type StatusTab = "all" | "open" | "investigating" | "known_error" | "resolved";

interface ResolutionStep {
  id: string;
  title: string;
  subtitle: string;
  state: "completed" | "in_progress" | "planned";
}

interface ProblemItem {
  id: string;
  category: string;
  title: string;
  updatedAt: string;
  priority: ProblemPriority;
  status: ProblemStatus;
  ownerInitials: string;
  ownerName: string;
  incidents: number;
  targetResolution: string;
  hypothesisStatus: string;
  rootCauseDescription: string;
  workaround: string;
  steps: ResolutionStep[];
  latestUpdateTime: string;
  latestUpdateText: string;
}

const initialProblems: ProblemItem[] = [
  {
    id: "PRB-024",
    category: "Meal tracking",
    title: "Duplicate meal logs after offline sync",
    updatedAt: "Updated 12 min ago",
    priority: "High",
    status: "Investigating",
    ownerInitials: "AM",
    ownerName: "Alex Morgan",
    incidents: 18,
    targetResolution: "Nov 12, 2026",
    hypothesisStatus: "Hypothesis",
    rootCauseDescription:
      "Retry requests may bypass duplicate checks when a member reconnects. The team is validating sync logs from iOS 18 devices.",
    workaround: "Workaround shared: refresh the diary before retrying a meal entry.",
    steps: [
      {
        id: "s1",
        title: "Link incidents & reproduce",
        subtitle: "Completed Nov 7 · Support",
        state: "completed",
      },
      {
        id: "s2",
        title: "Share member workaround",
        subtitle: "Completed Nov 8 · Member care",
        state: "completed",
      },
      {
        id: "s3",
        title: "Validate root cause",
        subtitle: "In progress · Platform engineering",
        state: "in_progress",
      },
      {
        id: "s4",
        title: "Deploy fix & monitor",
        subtitle: "Planned Nov 12 · Platform engineering",
        state: "planned",
      },
    ],
    latestUpdateTime: "12 min ago",
    latestUpdateText: "Alex added sync traces from 3 affected members.",
  },
  {
    id: "PRB-023",
    category: "Nutrition plans",
    title: "Nutrition plans fail to renew",
    updatedAt: "Updated 36 min ago",
    priority: "High",
    status: "Known error",
    ownerInitials: "SM",
    ownerName: "Sarah Miller",
    incidents: 12,
    targetResolution: "Nov 14, 2026",
    hypothesisStatus: "Confirmed cause",
    rootCauseDescription:
      "Scheduled renewal jobs time out when a member switches diet goals mid-cycle without regenerating macro targets.",
    workaround: "Workaround shared: manually trigger plan refresh from the member profile.",
    steps: [
      {
        id: "s1",
        title: "Link incidents & reproduce",
        subtitle: "Completed Nov 5 · Support",
        state: "completed",
      },
      {
        id: "s2",
        title: "Identify billing webhook race",
        subtitle: "Completed Nov 7 · Backend team",
        state: "completed",
      },
      {
        id: "s3",
        title: "Patch renewal queue worker",
        subtitle: "Completed Nov 9 · Platform engineering",
        state: "completed",
      },
      {
        id: "s4",
        title: "Deploy fix & monitor",
        subtitle: "Planned Nov 14 · Platform engineering",
        state: "planned",
      },
    ],
    latestUpdateTime: "36 min ago",
    latestUpdateText: "Sarah verified patch behavior on staging environment.",
  },
  {
    id: "PRB-022",
    category: "Notifications",
    title: "Check-in reminders arrive late",
    updatedAt: "Updated 1 hour ago",
    priority: "Medium",
    status: "Investigating",
    ownerInitials: "JL",
    ownerName: "James Lee",
    incidents: 9,
    targetResolution: "Nov 15, 2026",
    hypothesisStatus: "Hypothesis",
    rootCauseDescription:
      "Timezone offset caching causes push notifications to queue behind UTC batch dispatches for APAC users.",
    workaround: "Workaround shared: re-save preferred reminder time in notification settings.",
    steps: [
      {
        id: "s1",
        title: "Collect delivery latency logs",
        subtitle: "Completed Nov 8 · Support",
        state: "completed",
      },
      {
        id: "s2",
        title: "Audit timezone scheduler",
        subtitle: "In progress · Notifications squad",
        state: "in_progress",
      },
      {
        id: "s3",
        title: "Roll out queue priority fix",
        subtitle: "Planned Nov 13 · Platform engineering",
        state: "planned",
      },
      {
        id: "s4",
        title: "Verify on-time delivery rate",
        subtitle: "Planned Nov 15 · QA",
        state: "planned",
      },
    ],
    latestUpdateTime: "1 hour ago",
    latestUpdateText: "James isolated delayed push batches to UTC+7 and UTC+8 cohorts.",
  },
  {
    id: "PRB-021",
    category: "Recipe library",
    title: "Recipe allergens missing on mobile",
    updatedAt: "Updated 2 hours ago",
    priority: "High",
    status: "New",
    ownerInitials: "EC",
    ownerName: "Emma Collins",
    incidents: 6,
    targetResolution: "Nov 11, 2026",
    hypothesisStatus: "Initial triage",
    rootCauseDescription:
      "Newly published autumn recipes omit nested allergen tag serialization in the v2 mobile API response.",
    workaround: "Workaround shared: full allergen details remain visible on web meal cards.",
    steps: [
      {
        id: "s1",
        title: "Audit affected recipe entries",
        subtitle: "In progress · Nutrition ops",
        state: "in_progress",
      },
      {
        id: "s2",
        title: "Enforce schema validation",
        subtitle: "Planned Nov 10 · Backend team",
        state: "planned",
      },
      {
        id: "s3",
        title: "Backfill missing allergen tags",
        subtitle: "Planned Nov 11 · Content ops",
        state: "planned",
      },
      {
        id: "s4",
        title: "Confirm mobile badge rendering",
        subtitle: "Planned Nov 11 · Mobile QA",
        state: "planned",
      },
    ],
    latestUpdateTime: "2 hours ago",
    latestUpdateText: "Emma flagged 14 new seasonal recipes for immediate tag backfill.",
  },
  {
    id: "PRB-020",
    category: "Member insights",
    title: "Weekly progress totals mismatch",
    updatedAt: "Updated 3 hours ago",
    priority: "Medium",
    status: "Known error",
    ownerInitials: "AM",
    ownerName: "Alex Morgan",
    incidents: 8,
    targetResolution: "Nov 16, 2026",
    hypothesisStatus: "Confirmed cause",
    rootCauseDescription:
      "Sunday evening entries logged after 11:30 PM are counted toward the following week's summary card.",
    workaround: "Workaround shared: daily breakdown view displays accurate per-day totals.",
    steps: [
      {
        id: "s1",
        title: "Reproduce boundary date query",
        subtitle: "Completed Nov 6 · Analytics",
        state: "completed",
      },
      {
        id: "s2",
        title: "Align week-start window logic",
        subtitle: "Completed Nov 8 · Platform engineering",
        state: "completed",
      },
      {
        id: "s3",
        title: "Recalculate historical rollups",
        subtitle: "Completed Nov 9 · Data engineering",
        state: "completed",
      },
      {
        id: "s4",
        title: "Release dashboard hotfix",
        subtitle: "Planned Nov 16 · Web & mobile",
        state: "planned",
      },
    ],
    latestUpdateTime: "3 hours ago",
    latestUpdateText: "Alex completed rollup verification across 420 member records.",
  },
  {
    id: "PRB-019",
    category: "Member onboarding",
    title: "Welcome emails sent twice",
    updatedAt: "Updated Yesterday",
    priority: "Low",
    status: "Resolved",
    ownerInitials: "JL",
    ownerName: "James Lee",
    incidents: 7,
    targetResolution: "Nov 8, 2026",
    hypothesisStatus: "Resolved",
    rootCauseDescription:
      "Duplicate onboarding events fired when users verified their email while already logged in.",
    workaround: "No workaround needed — idempotency key deployed.",
    steps: [
      {
        id: "s1",
        title: "Trace duplicate event trigger",
        subtitle: "Completed Nov 6 · Support",
        state: "completed",
      },
      {
        id: "s2",
        title: "Add idempotency lock",
        subtitle: "Completed Nov 7 · Backend team",
        state: "completed",
      },
      {
        id: "s3",
        title: "Deploy to production",
        subtitle: "Completed Nov 8 · Platform engineering",
        state: "completed",
      },
      {
        id: "s4",
        title: "Monitor 24h signup volume",
        subtitle: "Completed Nov 9 · Member care",
        state: "completed",
      },
    ],
    latestUpdateTime: "Yesterday",
    latestUpdateText: "Zero duplicate welcome emails recorded over the past 24 hours.",
  },
  {
    id: "PRB-018",
    category: "Account settings",
    title: "Plan preferences are not saved",
    updatedAt: "Updated Yesterday",
    priority: "Medium",
    status: "Investigating",
    ownerInitials: "SM",
    ownerName: "Sarah Miller",
    incidents: 5,
    targetResolution: "Nov 17, 2026",
    hypothesisStatus: "Hypothesis",
    rootCauseDescription:
      "Optimistic UI state resets when dietary restriction toggles are updated rapidly offline.",
    workaround: "Workaround shared: save one dietary preference change at a time.",
    steps: [
      {
        id: "s1",
        title: "Gather browser console traces",
        subtitle: "Completed Nov 8 · Support",
        state: "completed",
      },
      {
        id: "s2",
        title: "Debounce preference PATCH calls",
        subtitle: "In progress · Frontend team",
        state: "in_progress",
      },
      {
        id: "s3",
        title: "Add save confirmation toast",
        subtitle: "Planned Nov 15 · Frontend team",
        state: "planned",
      },
      {
        id: "s4",
        title: "Verify persistence across sessions",
        subtitle: "Planned Nov 17 · QA",
        state: "planned",
      },
    ],
    latestUpdateTime: "Yesterday",
    latestUpdateText: "Sarah reproduced the race condition on slow 3G throttling.",
  },
];

const kpiStats = [
  {
    title: "Open problems",
    value: "24",
    badge: "+ 4 this month",
    badgeTone: "green",
    subtitle: "10 new · 8 investigating · 6 known errors",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-[#4A5D52]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 3L3 6.5 10 10l7-3.5L10 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l7 3.5 7-3.5M3 13.5L10 17l7-3.5" />
      </svg>
    ),
  },
  {
    title: "High-priority problems",
    value: "5",
    badge: "2 need attention",
    badgeTone: "amber",
    subtitle: "Member-facing issues to focus on first",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-[#4A5D52]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3.5v13m0-12h9l-1.8 3 1.8 3h-9" />
      </svg>
    ),
  },
  {
    title: "Recurring incidents",
    value: "68",
    badge: "↓ 18.1%",
    badgeTone: "green",
    subtitle: "Linked to open problems · Last 30 days",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-[#4A5D52]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8.5A6 6 0 0114.5 5.5L16 7m0 4.5A6 6 0 015.5 14.5L4 13" />
      </svg>
    ),
  },
  {
    title: "Resolved this month",
    value: "12",
    badge: "↑ 3 vs. October",
    badgeTone: "green",
    subtitle: "Average resolution time: 4.2 days",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-[#4A5D52]">
        <circle cx="10" cy="10" r="7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 10.2l2 2 4-4.2" />
      </svg>
    ),
  },
];

export const ProblemManagementPage: React.FC = () => {
  const [problems, setProblems] = useState<ProblemItem[]>(initialProblems);
  const [selectedId, setSelectedId] = useState<string>("PRB-024");
  const [activeTab, setActiveTab] = useState<StatusTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "board">("list");

  const filteredProblems = problems.filter((item) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "open" && item.status !== "Resolved") ||
      (activeTab === "investigating" && item.status === "Investigating") ||
      (activeTab === "known_error" && item.status === "Known error") ||
      (activeTab === "resolved" && item.status === "Resolved");

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesOwner = ownerFilter === "all" || item.ownerName === ownerFilter;
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter;

    return matchesTab && matchesSearch && matchesOwner && matchesPriority;
  });

  const selectedProblem =
    problems.find((p) => p.id === selectedId) || filteredProblems[0] || problems[0];

  const completedStepsCount = selectedProblem.steps.filter((s) => s.state === "completed").length;
  const completionPercent = Math.round(
    (completedStepsCount / selectedProblem.steps.length) * 100
  );

  const toggleStepState = (stepId: string) => {
    setProblems((prev) =>
      prev.map((problem) => {
        if (problem.id !== selectedProblem.id) return problem;
        return {
          ...problem,
          steps: problem.steps.map((step) => {
            if (step.id !== stepId) return step;
            return {
              ...step,
              state: step.state === "completed" ? "in_progress" : "completed",
            };
          }),
        };
      })
    );
  };

  const renderPriorityBadge = (priority: ProblemPriority) => {
    const barColor =
      priority === "High"
        ? "bg-[#C2593F]"
        : priority === "Medium"
          ? "bg-[#C98A3A]"
          : "bg-[#8FA397]";

    return (
      <span className="inline-flex items-center gap-2 text-xs text-[#5A6560]">
        <span className={`h-3 w-[3px] rounded-full ${barColor}`} />
        <span>{priority}</span>
      </span>
    );
  };

  const renderStatusBadge = (status: ProblemStatus) => {
    if (status === "Investigating") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6EDE4] px-2.5 py-0.5 text-[11px] font-medium text-[#2C4C3B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2C4C3B]" />
          Investigating
        </span>
      );
    }
    if (status === "Known error") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5EFE0] px-2.5 py-0.5 text-[11px] font-medium text-[#8A6D3B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A68246]" />
          Known error
        </span>
      );
    }
    if (status === "Resolved") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3EC] px-2.5 py-0.5 text-[11px] font-medium text-[#3B6E4C]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3B6E4C]" />
          Resolved
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F3EE] px-2.5 py-0.5 text-[11px] font-medium text-[#5A6560]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#6E7A74]" />
        New
      </span>
    );
  };

  return (
    <AdminLayout breadcrumb="Problem management">
      <div className="mx-auto max-w-[1380px] space-y-6">
        {/* Top Page Title & Action Buttons */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5D7366]">
              Care That Keeps Improving
            </p>
            <h1 className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#182B20] sm:text-[34px]">
              Problem management
            </h1>
            <p className="mt-1 text-xs text-[#5A6560] sm:text-sm">
              Find the cause. Prevent the repeat. Keep every member&apos;s wellbeing on track.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="text-[11px] text-[#7D8A83]">Monday, November 9, 2026</span>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-[#182B20] transition-colors hover:bg-stone-50"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5 text-[#5A6560]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 2.5v7.5m0 0l-3-3m3 3l3-3M3 13.5h10" />
                </svg>
                <span>Export report</span>
              </button>

              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#2C4C3B] px-4 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
              >
                <span>+</span>
                <span>New problem</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiStats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-stone-200/90 bg-white p-5 transition-shadow hover:shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#5A6560]">{stat.title}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F4F6F1]">
                  {stat.icon}
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="font-serif text-3xl font-normal text-[#182B20]">{stat.value}</span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    stat.badgeTone === "amber"
                      ? "bg-[#F5EFE0] text-[#8A6D3B]"
                      : "bg-[#E6EDE4] text-[#2C4C3B]"
                  }`}
                >
                  {stat.badge}
                </span>
              </div>

              <p className="mt-2 text-[11px] text-[#7D8A83]">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Master-Detail Split Layout */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          {/* Left 8 Cols: Your Problems List */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 xl:col-span-8">
            <div>
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-serif text-xl font-normal text-[#182B20]">Your problems</h2>
                  <span className="text-xs text-[#7D8A83]">36</span>
                </div>

                {/* List / Board Switcher */}
                <div className="inline-flex rounded-full border border-stone-200/80 bg-[#FAF9F6] p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-[#182B20] shadow-2xs"
                        : "text-[#6E7A74] hover:text-[#182B20]"
                    }`}
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3">
                      <path strokeLinecap="round" d="M3 4.5h10M3 8h10M3 11.5h10" />
                    </svg>
                    <span>List</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("board")}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                      viewMode === "board"
                        ? "bg-white text-[#182B20] shadow-2xs"
                        : "text-[#6E7A74] hover:text-[#182B20]"
                    }`}
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3">
                      <rect x="2.5" y="3" width="4" height="10" rx="1" />
                      <rect x="9.5" y="3" width="4" height="7" rx="1" />
                    </svg>
                    <span>Board</span>
                  </button>
                </div>
              </div>

              {/* Status Tabs */}
              <div className="mt-4 flex flex-wrap items-center gap-5 border-b border-stone-100 text-xs">
                {[
                  { key: "all" as StatusTab, label: "All problems", count: 36 },
                  { key: "open" as StatusTab, label: "Open", count: 24 },
                  { key: "investigating" as StatusTab, label: "Investigating", count: 8 },
                  { key: "known_error" as StatusTab, label: "Known errors", count: 6 },
                  { key: "resolved" as StatusTab, label: "Resolved", count: 12 },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`cursor-pointer pb-2.5 transition-colors ${
                      activeTab === tab.key
                        ? "border-b-2 border-[#2C4C3B] font-semibold text-[#182B20]"
                        : "text-[#6E7A74] hover:text-[#182B20]"
                    }`}
                  >
                    {tab.label} <span className="ml-0.5 text-[11px] text-[#8C9892]">{tab.count}</span>
                  </button>
                ))}
              </div>

              {/* Search & Filter Controls */}
              <div className="mt-4 flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
                <div className="relative flex-1 sm:max-w-xs">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-[#8C9892]"
                  >
                    <circle cx="7" cy="7" r="4.5" />
                    <path strokeLinecap="round" d="M10.5 10.5L13.5 13.5" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search problems or IDs..."
                    className="w-full rounded-full border border-stone-200 bg-[#FAF9F6] py-1.5 pr-4 pl-9 text-xs text-[#182B20] placeholder:text-[#8C9892] focus:border-[#2C4C3B] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={ownerFilter}
                    onChange={(e) => setOwnerFilter(e.target.value)}
                    aria-label="Filter by owner"
                    className="cursor-pointer rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                  >
                    <option value="all">All owners</option>
                    <option value="Alex Morgan">Alex Morgan</option>
                    <option value="Sarah Miller">Sarah Miller</option>
                    <option value="James Lee">James Lee</option>
                    <option value="Emma Collins">Emma Collins</option>
                  </select>

                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    aria-label="Filter by priority"
                    className="cursor-pointer rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                  >
                    <option value="all">Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("all");
                      setOwnerFilter("all");
                      setPriorityFilter("all");
                      setSearchQuery("");
                    }}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-[#182B20] hover:bg-stone-50"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" d="M2.5 4.5h11M4.5 8h7M6.5 11.5h3" />
                    </svg>
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Problems Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-y border-stone-200/80 bg-[#FAF9F6] text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                      <th className="w-8 py-2.5 pl-3">
                        <input
                          type="checkbox"
                          aria-label="Select all problems"
                          className="rounded border-stone-300 accent-[#2C4C3B]"
                        />
                      </th>
                      <th className="py-2.5 pr-4">Problem</th>
                      <th className="py-2.5 pr-4">Priority</th>
                      <th className="py-2.5 pr-4">Status</th>
                      <th className="py-2.5 pr-4">Owner</th>
                      <th className="py-2.5 pr-4 text-right">Incidents</th>
                      <th className="py-2.5 pr-4">Progress</th>
                      <th className="w-7 py-2.5 pr-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {filteredProblems.map((problem) => {
                      const isSelected = problem.id === selectedProblem.id;
                      const doneCount = problem.steps.filter((s) => s.state === "completed").length;
                      const pct = Math.round((doneCount / problem.steps.length) * 100);

                      return (
                        <tr
                          key={problem.id}
                          onClick={() => setSelectedId(problem.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? "bg-[#F3F6F0]" : "hover:bg-[#FAF9F6]/80"
                          }`}
                        >
                          <td className="py-3.5 pl-3" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => setSelectedId(problem.id)}
                              aria-label={`Select ${problem.id}`}
                              className="rounded border-stone-300 accent-[#2C4C3B]"
                            />
                          </td>

                          <td className="py-3.5 pr-4">
                            <p className="text-[10px] font-medium text-[#7D8A83]">
                              <span className="font-semibold text-[#5A6560]">{problem.id}</span> ·{" "}
                              {problem.category}
                            </p>
                            <p className="mt-0.5 font-semibold text-[#182B20]">{problem.title}</p>
                            <p className="mt-0.5 text-[10px] text-[#8C9892]">{problem.updatedAt}</p>
                          </td>

                          <td className="py-3.5 pr-4 whitespace-nowrap">
                            {renderPriorityBadge(problem.priority)}
                          </td>

                          <td className="py-3.5 pr-4 whitespace-nowrap">
                            {renderStatusBadge(problem.status)}
                          </td>

                          <td className="py-3.5 pr-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6EDE4] text-[10px] font-semibold text-[#2C4C3B]">
                                {problem.ownerInitials}
                              </span>
                              <span className="text-[#5A6560]">{problem.ownerName}</span>
                            </div>
                          </td>

                          <td className="py-3.5 pr-4 text-right font-medium text-[#182B20]">
                            {problem.incidents}
                          </td>

                          <td className="py-3.5 pr-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-12 overflow-hidden rounded-full bg-stone-200/80">
                                <div
                                  style={{ width: `${pct}%` }}
                                  className="h-full rounded-full bg-[#2C4C3B]"
                                />
                              </div>
                              <span className="text-[11px] text-[#6E7A74]">{pct}%</span>
                            </div>
                          </td>

                          <td className="py-3.5 pr-3 text-right text-[#7D8A83]">
                            {isSelected ? "›" : "•••"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-3.5 text-[11px] text-[#7D8A83]">
              <span>Showing 1–{filteredProblems.length} of 36 problems</span>
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
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  6
                </button>
                <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: In Focus Detail Panel */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 xl:col-span-4">
            <div>
              {/* Panel Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-normal text-[#182B20]">In focus</h2>
                <button
                  type="button"
                  aria-label="Expand problem details"
                  className="rounded-lg p-1.5 text-[#6E7A74] transition-colors hover:bg-stone-100 hover:text-[#182B20]"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 2.5h4v4m0-4L9 7M6.5 13.5h-4v-4m0 4L7 9" />
                  </svg>
                </button>
              </div>

              {/* Problem Metadata */}
              <div className="mt-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider">
                <span className="text-[#6E7A74]">
                  {selectedProblem.id} · {selectedProblem.category}
                </span>
                <span
                  className={
                    selectedProblem.priority === "High"
                      ? "normal-case font-semibold text-[#B4533C]"
                      : "normal-case font-semibold text-[#8A6D3B]"
                  }
                >
                  {selectedProblem.priority} priority
                </span>
              </div>

              {/* Problem Title */}
              <h3 className="mt-2 font-serif text-2xl font-normal leading-snug text-[#182B20]">
                {selectedProblem.title}
              </h3>

              {/* Status + Linked Incidents */}
              <div className="mt-3.5 flex items-center justify-between">
                {renderStatusBadge(selectedProblem.status)}
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5A6560] hover:text-[#182B20]"
                >
                  <span>{selectedProblem.incidents} linked incidents</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>

              {/* Owner & Target Resolution */}
              <div className="mt-5 grid grid-cols-2 gap-4 border-y border-stone-100 py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                    Problem Owner
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6EDE4] text-[10px] font-semibold text-[#2C4C3B]">
                      {selectedProblem.ownerInitials}
                    </span>
                    <span className="text-xs font-medium text-[#182B20]">
                      {selectedProblem.ownerName}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                    Target Resolution
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#182B20]">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 text-[#5A6560]">
                      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
                      <path strokeLinecap="round" d="M5.5 2v2.5M10.5 2v2.5M2.5 6.5h11" />
                    </svg>
                    <span>{selectedProblem.targetResolution}</span>
                  </div>
                </div>
              </div>

              {/* Root-Cause Investigation */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-normal text-[#182B20]">
                    Root-cause investigation
                  </h4>
                  <span className="text-[11px] font-medium text-[#8A6D3B]">
                    {selectedProblem.hypothesisStatus}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-[#5A6560]">
                  {selectedProblem.rootCauseDescription}
                </p>

                {/* Workaround Callout */}
                <div className="mt-3.5 flex items-start gap-2.5 rounded-xl bg-[#F4F6F1] p-3.5 text-[11px] leading-relaxed text-[#182B20]">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2C4C3B]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.5 13h3M8 2.5a3.5 3.5 0 00-2 6.35c.4.32.65.8.65 1.32V11h2.7v-.83c0-.52.25-1 .65-1.32A3.5 3.5 0 008 2.5z"
                    />
                  </svg>
                  <span>{selectedProblem.workaround}</span>
                </div>
              </div>

              {/* Path to Resolution */}
              <div className="mt-5 border-t border-stone-100 pt-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-normal text-[#182B20]">
                    Path to resolution
                  </h4>
                  <span className="text-[11px] font-medium text-[#6E7A74]">
                    {completedStepsCount} of {selectedProblem.steps.length} complete ·{" "}
                    {completionPercent}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-stone-200/80">
                  <div
                    style={{ width: `${completionPercent}%` }}
                    className="h-full rounded-full bg-[#2C4C3B] transition-all duration-300"
                  />
                </div>

                {/* Resolution Checklist */}
                <div className="mt-4 space-y-3">
                  {selectedProblem.steps.map((step) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => toggleStepState(step.id)}
                      className="flex w-full cursor-pointer items-start gap-3 text-left transition-opacity hover:opacity-85"
                    >
                      {step.state === "completed" ? (
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2C4C3B] text-white">
                          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-2.5 w-2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 6.2l2.3 2.3L9.5 3.8" />
                          </svg>
                        </span>
                      ) : step.state === "in_progress" ? (
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#2C4C3B]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#2C4C3B]" />
                        </span>
                      ) : (
                        <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-stone-300" />
                      )}

                      <div>
                        <p className="text-xs font-medium text-[#182B20]">{step.title}</p>
                        <p className="text-[11px] text-[#7D8A83]">{step.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Latest Update */}
              <div className="mt-5 border-t border-stone-100 pt-4">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#182B20]">Latest update</span>
                  <span className="text-[#8C9892]">{selectedProblem.latestUpdateTime}</span>
                </div>
                <p className="mt-1 text-xs text-[#5A6560]">{selectedProblem.latestUpdateText}</p>
              </div>
            </div>

            {/* Bottom View Full Problem Link */}
            <div className="mt-5 border-t border-stone-100 pt-3.5">
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between text-xs font-semibold text-[#2C4C3B] hover:underline"
              >
                <span>View full problem</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Operational Footer */}
        <footer className="flex flex-col justify-between gap-2 border-t border-stone-200/70 pt-4 text-[11px] text-[#7D8A83] sm:flex-row sm:items-center">
          <span>Well Diet operations · Root-cause and problem management</span>
          <span>Last synced today at 09:42</span>
        </footer>
      </div>
    </AdminLayout>
  );
};

export default ProblemManagementPage;
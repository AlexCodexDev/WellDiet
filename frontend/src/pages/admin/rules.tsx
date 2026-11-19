import React, { useState } from "react";
import AdminLayout from "../../components/layouts/admin/AdminLayout";

type RuleStatus = "Published" | "In review" | "Draft";

interface RuleItem {
  id: string;
  title: string;
  category: string;
  status: RuleStatus;
  updatedAt: string;
  ifCondition: string;
  thenAction: string;
  owner: string;
  version: string;
}

const initialRules: RuleItem[] = [
  {
    id: "RUL-024",
    title: "Flag missing allergen information",
    category: "Recipe safety",
    status: "In review",
    updatedAt: "Nov 9, 2026",
    ifCondition: "A recipe has no allergen information",
    thenAction: "Hold publication and request a nutritionist review.",
    owner: "Sarah Miller",
    version: "1.2",
  },
  {
    id: "RUL-023",
    title: "Match meal plans to dietary preferences",
    category: "Nutrition plans",
    status: "Published",
    updatedAt: "Nov 8, 2026",
    ifCondition: "Member selects vegetarian, vegan, or gluten-free preference",
    thenAction: "Filter out incompatible ingredients and recalculate macro balance.",
    owner: "Emma Collins",
    version: "2.0",
  },
  {
    id: "RUL-022",
    title: "Review incomplete diagnosis answers",
    category: "Diagnosis",
    status: "Published",
    updatedAt: "Nov 7, 2026",
    ifCondition: "Body stats or target weight fields contain incomplete values",
    thenAction: "Prompt member to complete required inputs before generating plan.",
    owner: "Alex Morgan",
    version: "1.4",
  },
  {
    id: "RUL-021",
    title: "Prompt a weekly wellbeing check-in",
    category: "Member care",
    status: "Published",
    updatedAt: "Nov 6, 2026",
    ifCondition: "Member has logged meals for 7 consecutive days",
    thenAction: "Send a gentle weekly progress reflection and hydration reminder.",
    owner: "Sarah Miller",
    version: "1.1",
  },
  {
    id: "RUL-020",
    title: "Route conflicting answers to an expert",
    category: "Diagnosis",
    status: "Draft",
    updatedAt: "Nov 5, 2026",
    ifCondition: "Target weight change exceeds safe weekly threshold for current BMI",
    thenAction: "Flag profile for certified dietitian consultation before plan activation.",
    owner: "Emma Collins",
    version: "0.9",
  },
];

const summaryMetrics = [
  {
    label: "Total rules",
    value: "24",
    subtitle: "Across 6 nutrition categories",
  },
  {
    label: "Published",
    value: "18",
    subtitle: "Available to the diagnosis engine",
  },
  {
    label: "In review",
    value: "4",
    subtitle: "Awaiting expert approval",
  },
  {
    label: "Drafts",
    value: "2",
    subtitle: "Not yet used in recommendations",
  },
];

const reviewActivities = [
  {
    id: "act-1",
    title: "Rule submitted for review",
    meta: "Sarah Miller · RUL-024 · 12 min ago",
  },
  {
    id: "act-2",
    title: "Dietary preferences rule published",
    meta: "Emma Collins · RUL-023 · 1 hour ago",
  },
  {
    id: "act-3",
    title: "Diagnosis condition updated",
    meta: "Alex Morgan · RUL-022 · Yesterday",
  },
];

export const RulesAndFactsPage: React.FC = () => {
  const [rules, setRules] = useState<RuleItem[]>(initialRules);
  const [selectedRuleId, setSelectedRuleId] = useState<string>("RUL-024");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk form tambah rule baru
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Recipe safety");
  const [newIf, setNewIf] = useState("");
  const [newThen, setNewThen] = useState("");

  const filteredRules = rules.filter((rule) => {
    const matchesCat = categoryFilter === "all" || rule.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || rule.status === statusFilter;
    return matchesCat && matchesStatus;
  });

  const activeRule =
    rules.find((r) => r.id === selectedRuleId) || filteredRules[0] || rules[0];

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newIf.trim() || !newThen.trim()) return;

    const nextNumber = 25 + (rules.length - initialRules.length);
    const created: RuleItem = {
      id: `RUL-0${nextNumber}`,
      title: newTitle.trim(),
      category: newCategory,
      status: "Draft",
      updatedAt: "Nov 9, 2026",
      ifCondition: newIf.trim(),
      thenAction: newThen.trim(),
      owner: "Emma Collins",
      version: "1.0",
    };

    setRules([created, ...rules]);
    setSelectedRuleId(created.id);
    setNewTitle("");
    setNewIf("");
    setNewThen("");
    setIsModalOpen(false);
  };

  const renderStatusPill = (status: RuleStatus) => {
    if (status === "Published") {
      return (
        <span className="inline-flex items-center rounded-full bg-[#E4ECE1] px-3 py-0.5 text-[11px] font-medium text-[#2C4C3B]">
          Published
        </span>
      );
    }
    if (status === "In review") {
      return (
        <span className="inline-flex items-center rounded-full bg-[#F3EBDD] px-3 py-0.5 text-[11px] font-medium text-[#8C6D3F]">
          In review
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-[#EFECE6] px-3 py-0.5 text-[11px] font-medium text-[#7B7468]">
        Draft
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-[1320px] space-y-6">
        {/* Top Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5D7366]">
              Knowledge That Cares
            </p>
            <h1 className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#182B20] sm:text-[36px]">
              Rules &amp; facts
            </h1>
            <p className="mt-1 text-xs text-[#5A6560] sm:text-sm">
              Keep your nutrition knowledge clear, consistent, and ready for expert review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-[#182B20] transition-colors hover:bg-stone-50"
            >
              Import rules
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#2C4C3B] px-4 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
            >
              <span>+</span>
              <span>Add rule</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryMetrics.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-stone-200/90 bg-white p-5 transition-shadow hover:shadow-2xs"
            >
              <p className="text-xs font-medium text-[#5A6560]">{item.label}</p>
              <p className="mt-3 font-serif text-3xl font-normal text-[#182B20]">{item.value}</p>
              <p className="mt-2.5 text-[11px] text-[#7D8A83]">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Middle Table Card: Your Rules */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
          {/* Card Header */}
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#182B20]">Your rules</h2>
              <p className="mt-0.5 text-xs text-[#7D8A83]">
                24 rules · Last updated Nov 9, 2026
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filter by category"
                className="cursor-pointer rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
              >
                <option value="all">All categories</option>
                <option value="Recipe safety">Recipe safety</option>
                <option value="Nutrition plans">Nutrition plans</option>
                <option value="Diagnosis">Diagnosis</option>
                <option value="Member care">Member care</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by status"
                className="cursor-pointer rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
              >
                <option value="all">Filter</option>
                <option value="Published">Published</option>
                <option value="In review">In review</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Rules Table */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-stone-200/80 text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                  <th className="py-3 pr-4 pl-2">Rule ID</th>
                  <th className="py-3 pr-4">Rule &amp; Condition</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Updated</th>
                  <th className="py-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {filteredRules.map((rule) => {
                  const isSelected = rule.id === activeRule.id;
                  return (
                    <tr
                      key={rule.id}
                      onClick={() => setSelectedRuleId(rule.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-[#F4F6F0]" : "hover:bg-[#FAF9F6]"
                      }`}
                    >
                      <td className="py-3.5 pr-4 pl-2 font-semibold whitespace-nowrap text-[#3A5446]">
                        {rule.id}
                      </td>
                      <td className="py-3.5 pr-4 font-semibold text-[#182B20]">{rule.title}</td>
                      <td className="py-3.5 pr-4 whitespace-nowrap text-[#5A6560]">
                        {rule.category}
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap">
                        {renderStatusPill(rule.status)}
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap text-[#6E7A74]">
                        {rule.updatedAt}
                      </td>
                      <td className="py-3.5 pr-2 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRuleId(rule.id);
                          }}
                          className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#2C4C3B] hover:underline"
                        >
                          <span>Edit</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-[11px] text-[#7D8A83]">
            <span>Showing 1–{filteredRules.length} of 24 rules</span>
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
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                4
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                5
              </button>
              <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Split Section: Rule Preview + Review Activity */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left 8 Cols: Rule Preview */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 lg:col-span-8">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-normal text-[#182B20]">Rule preview</h2>
                {renderStatusPill(activeRule.status)}
              </div>

              {/* Eyebrow */}
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[#5D7366]">
                {activeRule.id} · {activeRule.category}
              </p>

              {/* Rule Title */}
              <h3 className="mt-1.5 font-serif text-2xl font-normal text-[#182B20]">
                {activeRule.title}
              </h3>

              {/* IF / THEN Logic Box */}
              <div className="mt-4 space-y-3 rounded-2xl bg-[#F4F5EF] p-5">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-12 sm:items-baseline sm:gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83] sm:col-span-1">
                    IF
                  </span>
                  <p className="text-xs font-medium text-[#182B20] sm:col-span-11">
                    {activeRule.ifCondition}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-1 sm:grid-cols-12 sm:items-baseline sm:gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83] sm:col-span-1">
                    THEN
                  </span>
                  <p className="text-xs font-medium text-[#182B20] sm:col-span-11">
                    {activeRule.thenAction}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <p className="mt-4 text-[11px] text-[#7D8A83]">
                Owner: {activeRule.owner} · Version {activeRule.version} · Updated{" "}
                {activeRule.updatedAt}
              </p>
            </div>

            {/* Bottom Link */}
            <div className="mt-5 pt-2">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#2C4C3B] hover:underline"
              >
                <span>View full rule</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* Right 4 Cols: Review Activity */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 lg:col-span-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#182B20]">Review activity</h2>

              <div className="mt-5 divide-y divide-stone-100">
                {reviewActivities.map((activity) => (
                  <div key={activity.id} className="py-3.5 first:pt-0 last:pb-0">
                    <p className="text-xs font-semibold text-[#182B20]">{activity.title}</p>
                    <p className="mt-1 text-[11px] text-[#7D8A83]">{activity.meta}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-2">
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

      {/* Modal Tambah Rule Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">Add new rule</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRule} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Rule name
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Flag high sodium meals"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                >
                  <option value="Recipe safety">Recipe safety</option>
                  <option value="Nutrition plans">Nutrition plans</option>
                  <option value="Diagnosis">Diagnosis</option>
                  <option value="Member care">Member care</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  IF Condition
                </label>
                <input
                  type="text"
                  required
                  value={newIf}
                  onChange={(e) => setNewIf(e.target.value)}
                  placeholder="When condition is met..."
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  THEN Action
                </label>
                <input
                  type="text"
                  required
                  value={newThen}
                  onChange={(e) => setNewThen(e.target.value)}
                  placeholder="Execute system action..."
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-[#5A6560] hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#2C4C3B] px-5 py-2 text-xs font-medium text-white hover:bg-[#213A2D]"
                >
                  Save draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default RulesAndFactsPage;
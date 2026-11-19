import React, { useState } from "react";
import AdminLayout from "../../components/layouts/admin/AdminLayout";

type PeriodOption = "Nov 1–9, 2026" | "October 2026" | "September 2026";

interface DailyActivityPoint {
  date: string;
  mealLogs: number;
  checkIns: number;
}

interface SavedReport {
  id: string;
  name: string;
  period: string;
  format: "PDF" | "CSV";
  createdBy: string;
}

const kpiMetrics = [
  {
    label: "Total members",
    value: "2,846",
    growth: "+12.8% vs. previous period",
  },
  {
    label: "Active nutrition plans",
    value: "1,924",
    growth: "+8.2% vs. previous period",
  },
  {
    label: "Weekly engagement",
    value: "78.6%",
    growth: "+5.4% vs. previous period",
  },
  {
    label: "Plan completion",
    value: "86.2%",
    growth: "+3.1% vs. previous period",
  },
];

const dailyActivityData: DailyActivityPoint[] = [
  { date: "Nov 1", mealLogs: 640, checkIns: 400 },
  { date: "Nov 2", mealLogs: 720, checkIns: 460 },
  { date: "Nov 3", mealLogs: 690, checkIns: 420 },
  { date: "Nov 4", mealLogs: 850, checkIns: 530 },
  { date: "Nov 5", mealLogs: 880, checkIns: 590 },
  { date: "Nov 6", mealLogs: 940, checkIns: 610 },
  { date: "Nov 7", mealLogs: 980, checkIns: 660 },
  { date: "Nov 8", mealLogs: 1050, checkIns: 720 },
  { date: "Nov 9", mealLogs: 1120, checkIns: 790 },
];

const nourishmentByPlan = [
  {
    name: "Balanced living",
    percentage: 42,
    members: "808 members",
    barColor: "bg-[#2C4C3B]",
  },
  {
    name: "Mindful weight care",
    percentage: 28,
    members: "539 members",
    barColor: "bg-[#6E9375]",
  },
  {
    name: "Plant-powered",
    percentage: 18,
    members: "346 members",
    barColor: "bg-[#A9C2AD]",
  },
  {
    name: "Energy & vitality",
    percentage: 12,
    members: "231 members",
    barColor: "bg-[#C8D8C9]",
  },
];

const initialSavedReports: SavedReport[] = [
  {
    id: "rep-1",
    name: "Member wellbeing overview",
    period: "Nov 1–9, 2026",
    format: "PDF",
    createdBy: "Emma Collins",
  },
  {
    id: "rep-2",
    name: "Nutrition plan performance",
    period: "October 2026",
    format: "CSV",
    createdBy: "Sarah Miller",
  },
  {
    id: "rep-3",
    name: "Monthly community summary",
    period: "October 2026",
    format: "PDF",
    createdBy: "Emma Collins",
  },
];

export const AdminReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>("Nov 1–9, 2026");
  const [savedReports] = useState<SavedReport[]>(initialSavedReports);
  const [scheduleText, setScheduleText] = useState("Every Monday at 09:00");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleDay, setScheduleDay] = useState("Monday");
  const [scheduleTime, setScheduleTime] = useState("09:00");

  const maxChartValue = 1200;

  const handleDownloadReport = (report: SavedReport) => {
    const csvContent =
      "Report Name,Period,Format,Created By\n" +
      `"${report.name}","${report.period}","${report.format}","${report.createdBy}"`;
    const blob = new Blob([csvContent], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.name.toLowerCase().replace(/\s+/g, "-")}.${report.format.toLowerCase()}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleText(`Every ${scheduleDay} at ${scheduleTime}`);
    setIsScheduleOpen(false);
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-[1320px] space-y-6">
        {/* Top Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5D7366]">
              Turn Insights Into Better Care
            </p>
            <h1 className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#182B20] sm:text-[36px]">
              Report
            </h1>
            <p className="mt-1 text-xs text-[#5A6560] sm:text-sm">
              See what is working, understand your members, and share your progress.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Period Dropdown */}
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as PeriodOption)}
                aria-label="Select report period"
                className="cursor-pointer appearance-none rounded-full border border-stone-200 bg-white py-2 pr-8 pl-4 text-xs font-medium text-[#182B20] transition-colors hover:bg-stone-50 focus:border-[#2C4C3B] focus:outline-none"
              >
                <option value="Nov 1–9, 2026">Nov 1–9, 2026</option>
                <option value="October 2026">October 2026</option>
                <option value="September 2026">September 2026</option>
              </select>
              <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] text-[#5A6560]">
                ▾
              </span>
            </div>

            {/* Export Button */}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#2C4C3B] px-5 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
            >
              Export report
            </button>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-stone-200/90 bg-white p-5 transition-shadow hover:shadow-2xs"
            >
              <p className="text-xs font-medium text-[#5A6560]">{metric.label}</p>
              <p className="mt-3 font-serif text-3xl font-normal text-[#182B20]">{metric.value}</p>
              <p className="mt-2.5 text-[11px] font-medium text-[#5D7366]">{metric.growth}</p>
            </div>
          ))}
        </div>

        {/* Middle Section: Grouped Bar Chart + Nourishment by Plan */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left 8 Cols: Healthy habits, measured */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 lg:col-span-8">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#182B20]">
                Healthy habits, measured
              </h2>
              <p className="mt-0.5 text-xs text-[#6E7A74]">
                Daily member activity ·{" "}
                {selectedPeriod === "Nov 1–9, 2026" ? "November 1–9, 2026" : selectedPeriod}
              </p>

              {/* Legend */}
              <div className="mt-3.5 flex items-center gap-5 text-[11px] text-[#5A6560]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#2C4C3B]" />
                  Meal logs
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#A8C09E]" />
                  Wellness check-ins
                </span>
              </div>

              {/* Grouped Vertical Bar Chart */}
              <div className="mt-6">
                <div className="relative h-52">
                  {/* Horizontal Grid Lines & Y-Axis Labels */}
                  <div className="flex h-44 flex-col justify-between">
                    {[1200, 900, 600, 300, 0].map((tick) => (
                      <div key={tick} className="flex items-center gap-3">
                        <span className="w-7 text-right text-[10px] text-[#8C9892]">{tick}</span>
                        <div className="h-[1px] flex-1 bg-stone-100" />
                      </div>
                    ))}
                  </div>

                  {/* Bars Overlay */}
                  <div className="absolute inset-x-0 top-0 bottom-8 flex items-end justify-between pl-11 pr-2">
                    {dailyActivityData.map((day) => {
                      const mealHeight = Math.round((day.mealLogs / maxChartValue) * 100);
                      const checkInHeight = Math.round((day.checkIns / maxChartValue) * 100);

                      return (
                        <div
                          key={day.date}
                          className="group flex h-full flex-1 flex-col items-center justify-end"
                        >
                          <div className="flex h-full items-end gap-1 sm:gap-1.5">
                            {/* Meal logs bar */}
                            <div
                              title={`${day.date} Meal logs: ${day.mealLogs}`}
                              style={{ height: `${mealHeight}%` }}
                              className="w-2.5 rounded-t-md bg-[#2C4C3B] transition-opacity group-hover:opacity-90 sm:w-3.5"
                            />
                            {/* Wellness check-ins bar */}
                            <div
                              title={`${day.date} Check-ins: ${day.checkIns}`}
                              style={{ height: `${checkInHeight}%` }}
                              className="w-2.5 rounded-t-md bg-[#A8C09E] transition-opacity group-hover:opacity-90 sm:w-3.5"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* X-Axis Date Labels */}
                  <div className="mt-2 flex items-center justify-between pl-11 pr-2">
                    {dailyActivityData.map((day) => (
                      <span
                        key={day.date}
                        className="flex-1 text-center text-[10px] text-[#8C9892]"
                      >
                        {day.date}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-[#6E7A74]">
              Meal logging is up 18.4% compared with the previous period.
            </p>
          </div>

          {/* Right 4 Cols: Nourishment, by plan */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 lg:col-span-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#182B20]">
                Nourishment, by plan
              </h2>
              <p className="mt-0.5 text-xs text-[#6E7A74]">
                1,924 active plans · 12 curated programs
              </p>

              {/* Progress List */}
              <div className="mt-6 space-y-5">
                {nourishmentByPlan.map((plan) => (
                  <div key={plan.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#182B20]">{plan.name}</span>
                      <span className="font-semibold text-[#182B20]">{plan.percentage}%</span>
                    </div>

                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EFECE6]">
                      <div
                        style={{ width: `${plan.percentage}%` }}
                        className={`h-full rounded-full ${plan.barColor}`}
                      />
                    </div>

                    <p className="mt-1.5 text-[11px] text-[#7D8A83]">{plan.members}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-2">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#2C4C3B] hover:underline"
              >
                <span>View program performance</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Card: Your report library */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl font-normal text-[#182B20]">Your report library</h2>

            <button
              type="button"
              onClick={() => setIsScheduleOpen(true)}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-[#182B20] transition-colors hover:bg-stone-50"
            >
              Schedule report
            </button>
          </div>

          {/* Report Table */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-stone-200/80 bg-[#F6F6F2] text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                  <th className="py-3 pr-4 pl-3">Report Name</th>
                  <th className="py-3 pr-4">Period</th>
                  <th className="py-3 pr-4">Format</th>
                  <th className="py-3 pr-4">Created By</th>
                  <th className="py-3 pr-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {savedReports.map((report) => (
                  <tr key={report.id} className="transition-colors hover:bg-[#FAF9F6]">
                    <td className="py-4 pr-4 pl-3 font-semibold text-[#182B20]">{report.name}</td>
                    <td className="py-4 pr-4 whitespace-nowrap text-[#6E7A74]">{report.period}</td>
                    <td className="py-4 pr-4 whitespace-nowrap font-semibold text-[#2C4C3B]">
                      {report.format}
                    </td>
                    <td className="py-4 pr-4 whitespace-nowrap text-[#6E7A74]">
                      {report.createdBy}
                    </td>
                    <td className="py-4 pr-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleDownloadReport(report)}
                        className="cursor-pointer font-semibold text-[#2C4C3B] hover:underline"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="mt-4 flex flex-col justify-between gap-2 pt-1 text-[11px] text-[#7D8A83] sm:flex-row sm:items-center">
            <span>Showing {savedReports.length} saved reports</span>
            <span>Scheduled delivery: {scheduleText}</span>
          </div>
        </div>
      </div>

      {/* Modal Schedule Report */}
      {isScheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">Schedule report</h3>
              <button
                type="button"
                onClick={() => setIsScheduleOpen(false)}
                className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Delivery day
                </label>
                <select
                  value={scheduleDay}
                  onChange={(e) => setScheduleDay(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                >
                  <option value="Monday">Every Monday</option>
                  <option value="Wednesday">Every Wednesday</option>
                  <option value="Friday">Every Friday</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">Time</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleOpen(false)}
                  className="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-[#5A6560] hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#2C4C3B] px-5 py-2 text-xs font-medium text-white hover:bg-[#213A2D]"
                >
                  Save schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminReportsPage;
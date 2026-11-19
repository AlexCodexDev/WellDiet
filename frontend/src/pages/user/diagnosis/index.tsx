import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../../components/layouts/user/PageLayout";
import Container from "../../../components/layouts/user/container";

type DietGoal = "fat_loss" | "muscle_gain";
type Gender = "male" | "female";

interface BodyStats {
  age: number;
  height: number;
  currentWeight: number;
  targetWeight: number;
}

export const DietPlanSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<DietGoal>("fat_loss");
  const [gender, setGender] = useState<Gender>("male");
  const [stats, setStats] = useState<BodyStats>({
    age: 21,
    height: 170,
    currentWeight: 60,
    targetWeight: 70,
  });

  const handleNumberChange = (field: keyof BodyStats, value: string) => {
    const parsed = parseInt(value, 10);
    setStats((prev) => ({
      ...prev,
      [field]: Number.isNaN(parsed) ? 0 : Math.max(0, parsed),
    }));
  };

  const stepValue = (field: keyof BodyStats, delta: number, min: number, max: number) => {
    setStats((prev) => ({
      ...prev,
      [field]: Math.min(max, Math.max(min, prev[field] + delta)),
    }));
  };

const handleContinue = (e: React.FormEvent) => {
  e.preventDefault();
  const payload = {
    goal: selectedGoal,
    gender,
    ...stats,
  };

  sessionStorage.setItem("welldiet_user_stats", JSON.stringify(payload));
  navigate("/diagnosis/questions", { state: payload });
};

  return (
    <PageLayout>
      <section className="bg-[#FAF9F6] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            {/* Page Heading */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-[#182B20] sm:text-3xl">
                Select Your Desired Diet Plan
              </h1>
              <p className="mt-1.5 text-xs text-[#6E7A74] sm:text-sm">
                customize your personal body stats &amp; goals
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleContinue} className="mt-8 space-y-6">
              {/* Diet Goal Selection Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Fat Loss Card */}
                <button
                  type="button"
                  onClick={() => setSelectedGoal("fat_loss")}
                  className={`flex cursor-pointer items-start gap-3.5 rounded-2xl border bg-white p-5 text-left transition-all ${
                    selectedGoal === "fat_loss"
                      ? "border-[1.5px] border-[#2C4C3B] shadow-2xs"
                      : "border-[#D5E2D7] hover:border-[#9EB5A3]"
                  }`}
                >
                  {/* Scale Icon */}
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#182B20]/80 text-[#182B20]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.5a6.5 6.5 0 019 0l-1.5 2.5a3.5 3.5 0 00-6 0L7.5 8.5z"
                      />
                      <path strokeLinecap="round" d="M12 10.5l1.5-2" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-[#182B20]">Fat Loss</h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#6E7A74]">
                      Burn excess body fat while maintaining lean body mass.
                    </p>
                  </div>
                </button>

                {/* Muscle Gain Card */}
                <button
                  type="button"
                  onClick={() => setSelectedGoal("muscle_gain")}
                  className={`flex cursor-pointer items-start gap-3.5 rounded-2xl border bg-white p-5 text-left transition-all ${
                    selectedGoal === "muscle_gain"
                      ? "border-[1.5px] border-[#2C4C3B] shadow-2xs"
                      : "border-[#D5E2D7] hover:border-[#9EB5A3]"
                  }`}
                >
                  {/* Flexed Bicep Icon */}
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center text-[#182B20]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-7 w-7"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.5c.8-1.8 2.6-2.5 4.4-1.8 1.5.6 2.4 2.1 2.2 3.8-.3 2.5-2.5 4.5-5.6 4.5H7.2C5.4 19 4 17.6 4 15.8c0-1.4.4-3.1 1.2-5.1L6.5 7c.4-1 1.4-1.5 2.4-1.2.9.3 1.4 1.2 1.1 2.1L9.2 10.5"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.5 14.5c1.2.5 2.7.2 3.5-.8"
                      />
                    </svg>
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-[#182B20]">Muscle Gain</h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#6E7A74]">
                      Gain lean muscle mass with optimal protein intake.
                    </p>
                  </div>
                </button>
              </div>

              {/* Gender Selector */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[#182B20]">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Male Option */}
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-full border bg-white py-3 text-xs font-medium transition-all ${
                      gender === "male"
                        ? "border-[1.5px] border-[#2C4C3B] text-[#182B20]"
                        : "border-[#D5E2D7] text-[#5A6560] hover:border-[#9EB5A3]"
                    }`}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      className="h-4 w-4 text-[#38BDF8]"
                      aria-hidden="true"
                    >
                      <circle cx="8.5" cy="11.5" r="4.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l4-4m0 0h-3.5m3.5 0v3.5" />
                    </svg>
                    <span>Male</span>
                  </button>

                  {/* Female Option */}
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-full border bg-white py-3 text-xs font-medium transition-all ${
                      gender === "female"
                        ? "border-[1.5px] border-[#2C4C3B] text-[#182B20]"
                        : "border-[#D5E2D7] text-[#5A6560] hover:border-[#9EB5A3]"
                    }`}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      className="h-4 w-4 text-[#F472B6]"
                      aria-hidden="true"
                    >
                      <circle cx="10" cy="7.5" r="4.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 12v5.5m-2.5-2.5h5" />
                    </svg>
                    <span>Female</span>
                  </button>
                </div>
              </div>

              {/* Body Stats Inputs (2x2 Grid) */}
              <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                {/* Age */}
                <div>
                  <label htmlFor="age" className="mb-1.5 block text-xs font-medium text-[#182B20]">
                    Age
                  </label>
                  <div className="flex items-center justify-between rounded-full border border-[#D5E2D7] bg-white px-5 py-2.5 transition-colors focus-within:border-[#2C4C3B]">
                    <input
                      id="age"
                      type="number"
                      min={10}
                      max={100}
                      required
                      value={stats.age}
                      onChange={(e) => handleNumberChange("age", e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-[#182B20] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <div className="flex items-center gap-2.5">
                      <div className="flex flex-col leading-none">
                        <button
                          type="button"
                          onClick={() => stepValue("age", 1, 10, 100)}
                          aria-label="Increase age"
                          className="cursor-pointer text-[9px] text-[#182B20] hover:text-[#2C4C3B]"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => stepValue("age", -1, 10, 100)}
                          aria-label="Decrease age"
                          className="cursor-pointer text-[9px] text-[#182B20] hover:text-[#2C4C3B]"
                        >
                          ▼
                        </button>
                      </div>
                      <span className="text-xs font-medium text-[#8FA397]">yrs</span>
                    </div>
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label htmlFor="height" className="mb-1.5 block text-xs font-medium text-[#182B20]">
                    Height
                  </label>
                  <div className="flex items-center justify-between rounded-full border border-[#D5E2D7] bg-white px-5 py-2.5 transition-colors focus-within:border-[#2C4C3B]">
                    <input
                      id="height"
                      type="number"
                      min={100}
                      max={250}
                      required
                      value={stats.height}
                      onChange={(e) => handleNumberChange("height", e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-[#182B20] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <div className="flex items-center gap-2.5">
                      <div className="flex flex-col leading-none">
                        <button
                          type="button"
                          onClick={() => stepValue("height", 1, 100, 250)}
                          aria-label="Increase height"
                          className="cursor-pointer text-[9px] text-[#182B20] hover:text-[#2C4C3B]"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => stepValue("height", -1, 100, 250)}
                          aria-label="Decrease height"
                          className="cursor-pointer text-[9px] text-[#182B20] hover:text-[#2C4C3B]"
                        >
                          ▼
                        </button>
                      </div>
                      <span className="text-xs font-medium text-[#8FA397]">cm</span>
                    </div>
                  </div>
                </div>

                {/* Current Weight */}
                <div>
                  <label
                    htmlFor="currentWeight"
                    className="mb-1.5 block text-xs font-medium text-[#182B20]"
                  >
                    Current Weight
                  </label>
                  <div className="flex items-center justify-between rounded-full border border-[#D5E2D7] bg-white px-5 py-2.5 transition-colors focus-within:border-[#2C4C3B]">
                    <input
                      id="currentWeight"
                      type="number"
                      min={30}
                      max={300}
                      required
                      value={stats.currentWeight}
                      onChange={(e) => handleNumberChange("currentWeight", e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-[#182B20] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <div className="flex items-center gap-2.5">
                      <div className="flex flex-col leading-none">
                        <button
                          type="button"
                          onClick={() => stepValue("currentWeight", 1, 30, 300)}
                          aria-label="Increase current weight"
                          className="cursor-pointer text-[9px] text-[#182B20] hover:text-[#2C4C3B]"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => stepValue("currentWeight", -1, 30, 300)}
                          aria-label="Decrease current weight"
                          className="cursor-pointer text-[9px] text-[#182B20] hover:text-[#2C4C3B]"
                        >
                          ▼
                        </button>
                      </div>
                      <span className="text-xs font-medium text-[#8FA397]">kg</span>
                    </div>
                  </div>
                </div>

                {/* Target Weight */}
                <div>
                  <label
                    htmlFor="targetWeight"
                    className="mb-1.5 block text-xs font-medium text-[#182B20]"
                  >
                    Target Weight
                  </label>
                  <div className="flex items-center justify-between rounded-full border border-[#D5E2D7] bg-white px-5 py-2.5 transition-colors focus-within:border-[#2C4C3B]">
                    <input
                      id="targetWeight"
                      type="number"
                      min={30}
                      max={300}
                      required
                      value={stats.targetWeight}
                      onChange={(e) => handleNumberChange("targetWeight", e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-[#182B20] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <div className="flex items-center gap-2.5">
                      <div className="flex flex-col leading-none">
                        <button
                          type="button"
                          onClick={() => stepValue("targetWeight", 1, 30, 300)}
                          aria-label="Increase target weight"
                          className="cursor-pointer text-[9px] text-[#182B20] hover:text-[#2C4C3B]"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => stepValue("targetWeight", -1, 30, 300)}
                          aria-label="Decrease target weight"
                          className="cursor-pointer text-[9px] text-[#182B20] hover:text-[#2C4C3B]"
                        >
                          ▼
                        </button>
                      </div>
                      <span className="text-xs font-medium text-[#8FA397]">kg</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Button (Bottom Right) */}
              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#2C4C3B] px-8 py-3 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#213A2D]"
                >
                  <span>Continue</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.167 10h11.666m0 0L11.667 5.833M15.833 10l-4.166 4.167"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default DietPlanSelectionPage;
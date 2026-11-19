import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../../../components/layouts/user/PageLayout";
import Container from "../../../components/layouts/user/container";

type AnswerOption = "yes" | "no" | "not_sure";

interface DiagnosticQuestion {
  id: string;
  factCode: string;
  text: string;
}

const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "q1",
    factCode: "F01",
    text: "Do you engage in moderate to vigorous physical exercise at least 3 times per week?",
  },
  {
    id: "q2",
    factCode: "F02",
    text: "Do you frequently feel fatigued or experience low energy levels during the afternoon?",
  },
  {
    id: "q3",
    factCode: "F03",
    text: "Do you regularly skip breakfast or have an irregular daily meal schedule?",
  },
  {
    id: "q4",
    factCode: "F04",
    text: "Do you consume sugary beverages, packaged snacks, or fast food more than 3 times a week?",
  },
  {
    id: "q5",
    factCode: "F05",
    text: "Do you have any known food allergies or intolerances (such as lactose, gluten, or nuts)?",
  },
  {
    id: "q6",
    factCode: "F06",
    text: "Do you drink at least 2 liters (around 8 glasses) of plain water every day?",
  },
  {
    id: "q7",
    factCode: "F07",
    text: "Do you experience digestive discomfort such as bloating or acid reflux after heavy meals?",
  },
  {
    id: "q8",
    factCode: "F08",
    text: "Do you get at least 7 hours of quality sleep on most nights?",
  },
  {
    id: "q9",
    factCode: "F09",
    text: "Do you prefer plant-based or vegetarian meals over animal-based protein sources?",
  },
  {
    id: "q10",
    factCode: "F10",
    text: "Are you currently managing any metabolic condition such as high blood sugar or cholesterol?",
  },
];

export const DiagnosingQAPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerOption>>({});

  const totalQuestions = diagnosticQuestions.length;
  const currentQuestion = diagnosticQuestions[currentIndex];
  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const currentAnswer = answers[currentQuestion.id];

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      navigate("/diet-plans");
    }
  };

  const handleSelectAnswer = (option: AnswerOption) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: option,
    };
    setAnswers(updatedAnswers);

    // Lanjut ke pertanyaan berikutnya, atau arahkan ke halaman hasil jika sudah pertanyaan ke-10
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        const storedStats = sessionStorage.getItem("welldiet_user_stats");
        const userStats = location.state || (storedStats ? JSON.parse(storedStats) : null);

        const diagnosticPayload = {
          userStats,
          answers: updatedAnswers,
        };

        sessionStorage.setItem("welldiet_diagnosis_result", JSON.stringify(diagnosticPayload));
        navigate("/hasil", { state: diagnosticPayload });
      }
    }, 180);
  };

  return (
    <PageLayout>
      <section className="bg-[#FAF9F6] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-xl">
            {/* Top Back Link */}
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-[#5A6560] transition-colors hover:text-[#182B20]"
            >
              <span aria-hidden="true">←</span>
              <span>
                {currentIndex === 0 ? "Back to Categories" : "Previous Question"}
              </span>
            </button>

            {/* Progress Card */}
            <div className="mt-4 rounded-2xl border border-[#D5E2D7] bg-white px-6 py-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#182B20]">Question</span>
                <span className="font-medium text-[#6E7A74]">
                  {currentIndex + 1} of {totalQuestions}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#EFECE6]">
                <div
                  style={{ width: `${progressPercentage}%` }}
                  className="h-full rounded-full bg-[#A8C090] transition-all duration-300"
                />
              </div>
            </div>

            {/* Question & Options Card */}
            <div className="mt-5 rounded-[24px] border border-[#D5E2D7] bg-white px-7 py-8 sm:px-10 sm:py-10">
              {/* Question Text */}
              <p className="min-h-[48px] text-sm leading-relaxed font-normal text-[#182B20] sm:text-[15px]">
                {currentQuestion.text}
              </p>

              {/* Top Divider */}
              <hr className="my-7 border-[#E6ECE1]" />

              {/* Three Answer Buttons */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {[
                  { value: "yes" as AnswerOption, label: "Yes" },
                  { value: "no" as AnswerOption, label: "No" },
                  { value: "not_sure" as AnswerOption, label: "Not Sure" },
                ].map((option) => {
                  const isSelected = currentAnswer === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelectAnswer(option.value)}
                      className={`cursor-pointer rounded-xl border py-3 text-xs font-medium transition-all sm:text-sm ${
                        isSelected
                          ? "border-[#2C4C3B] bg-[#E6EDE4] text-[#182B20] shadow-2xs"
                          : "border-[#D5E2D7] bg-white text-[#182B20] hover:border-[#2C4C3B] hover:bg-[#F4F6F1]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Divider */}
              <hr className="mt-7 border-[#E6ECE1]" />
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default DiagnosingQAPage;
import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../../components/layouts/user/PageLayout";
import Container from "../../../components/layouts/user/container";
import heroImg from "../../../assets/hero.png";

const steps = [
  {
    id: 1,
    title: "1. Define Your Goals",
    description:
      "Share your dietary needs, lifestyle, and preferences so every recipe and plan fits your body perfectly.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 text-[#4A5D52]"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5.5" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "2. Get Personalized Plans",
    description:
      "Receive tailored macro guides, clean whole-food menus, and chef-curated shopping lists customized just for you.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 text-[#4A5D52]"
      >
        <circle cx="5" cy="6.5" r="1.5" />
        <path strokeLinecap="round" d="M9.5 6.5h10" />
        <circle cx="5" cy="12" r="1.5" />
        <path strokeLinecap="round" d="M9.5 12h10" />
        <circle cx="5" cy="17.5" r="1.5" />
        <path strokeLinecap="round" d="M9.5 17.5h10" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "3. Achieve Lasting Health",
    description:
      "Track your daily progress with real-time feedback, sustainable habits, and access to professional dietitians.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 text-[#4A5D52]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18V11m0 0c0-3.2 2.5-5.5 6-5.5 0 3.5-2.3 5.5-6 5.5zm0 2c0-2.8-2.2-4.8-5.2-4.8 0 3 2 4.8 5.2 4.8z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.5 18.5h11l-1.2 2H7.7l-1.2-2z"
        />
      </svg>
    ),
  },
];

export const BerandaPage: React.FC = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="border-b border-stone-200/80 bg-[#FAF9F6]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            {/* Left Copywriting Column */}
            <div className="px-5 py-14 sm:px-8 sm:py-20 lg:col-span-7 lg:py-24 lg:pl-16 xl:pl-24">
              {/* Eyebrow Label */}
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-5 bg-[#8FA397]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5D7366]">
                  Expert Nutrition. Lasting Results.
                </span>
              </div>

              {/* Serif Main Headline */}
              <h1 className="mt-4 max-w-2xl font-serif text-4xl font-normal leading-[1.12] tracking-tight text-[#182B20] sm:text-5xl lg:text-[54px]">
                Transform Your Health &amp; Diet Effortlessly
              </h1>

              {/* Supporting Description */}
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5A6560] sm:text-[17px]">
                Turn overwhelming health goals into clear daily choices. Our nutritionist-backed
                expert program helps you discover personalized meal paths and practical lifestyle
                changes that fit your body.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/diet-plans"
                  className="inline-flex items-center justify-center rounded-full bg-[#2C4C3B] px-7 py-3 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#213A2D]"
                >
                  Start Planning
                </Link>
                <a
                  href="#about-us"
                  className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-7 py-3 text-sm font-medium text-[#182B20] transition-colors hover:bg-stone-50"
                >
                  About Us
                </a>
              </div>
            </div>

            {/* Right Image Panel */}
            <div className="h-[340px] w-full bg-white sm:h-[420px] lg:col-span-5 lg:h-[500px]">
              <img
                src={heroImg}
                alt="Fresh vegetables and citrus for healthy diet planning"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three-Step Process Section */}
      <section id="about-us" className="bg-[#FAF9F6] py-16 sm:py-20">
        <Container>
          <h2 className="font-serif text-2xl font-normal tracking-tight text-[#182B20] sm:text-[32px]">
            From initial goals to sustainable habit, in three steps.
          </h2>

          <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className="rounded-2xl border border-stone-200/90 bg-white p-7 transition-shadow duration-200 hover:shadow-sm sm:p-8"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200/70 bg-[#FAF9F6]">
                  {step.icon}
                </div>
                <h3 className="mt-6 text-base font-semibold text-[#182B20]">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#5A6560]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default BerandaPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/layouts/user/PageLayout";
import Container from "../../components/layouts/user/container";
import heroImg from "../../assets/hero.png";
import bowlImg from "../../assets/login-bowl.png";

interface TestimonialItem {
  id: string;
  quote: string;
  initials: string;
  name: string;
  role: string;
}

interface CorePillar {
  id: string;
  title: string;
  description: string;
}

const communityVoices: TestimonialItem[] = [
  {
    id: "v1",
    quote:
      "“I used to feel overwhelmed by strict diets and constant tracking. Well Diet gave me clear, realistic macro targets that actually fit my work schedule.”",
    initials: "PN",
    name: "Priya Nair",
    role: "Balanced Living · 4 months",
  },
  {
    id: "v2",
    quote:
      "“The daily check-ins helped me notice how hydration and meal timing affected my afternoon energy. Small adjustments made a lasting difference.”",
    initials: "DL",
    name: "Daniel Lim",
    role: "Energy & Vitality · 3 months",
  },
  {
    id: "v3",
    quote:
      "“Finding a steady balance between fat loss and strength training used to feel like guesswork. Having structured nutrition guidance removed all the stress.”",
    initials: "MR",
    name: "Maya Rahma",
    role: "Fat Loss Plan · 5 months",
  },
  {
    id: "v4",
    quote:
      "“What I appreciate most is that nothing feels extreme. I still enjoy meals with my family while hitting my protein goals consistently every week.”",
    initials: "AK",
    name: "Arif Kurniawan",
    role: "Muscle Gain Plan · 6 months",
  },
  {
    id: "v5",
    quote:
      "“The diagnostic questions pinpointed habits I hadn’t realized were holding me back. My digestion and sleep quality improved within the first few weeks.”",
    initials: "SC",
    name: "Sophia Chen",
    role: "Mindful Weight Care · 2 months",
  },
  {
    id: "v6",
    quote:
      "“Simple, calm, and grounded in real science. Well Diet helped me rebuild a healthy relationship with food without feeling restricted.”",
    initials: "TW",
    name: "Tessa Wijaya",
    role: "Plant-Powered · 4 months",
  },
];

const corePillars: CorePillar[] = [
  {
    id: "whole-food",
    title: "Whole-food focus",
    description:
      "Prioritizing nutrient-dense, minimally processed ingredients that nourish your body naturally.",
  },
  {
    id: "sustainable-habits",
    title: "Sustainable habits",
    description:
      "Building steady, repeatable daily routines rather than short-lived restrictive diets.",
  },
  {
    id: "transparent-guidance",
    title: "Transparent guidance",
    description:
      "Clear, evidence-backed macro and nutrition recommendations you can understand and trust.",
  },
];

export const AboutUsPage: React.FC = () => {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const togglePillar = (id: string) => {
    setExpandedPillar((prev) => (prev === id ? null : id));
  };

  return (
    <PageLayout>
      {/* SECTION 1: Editorial Hero & Brand Story */}
      <section className="bg-[#FAF9F6] pt-14 pb-16 sm:pt-20 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Hero Serif Headline */}
            <h1 className="max-w-xl font-serif text-3xl font-normal leading-[1.16] tracking-tight text-[#182B20] sm:text-[42px]">
              Nutrition that grounds your routine, so you can thrive with clarity and energy.
            </h1>

            {/* Intro Paragraph */}
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-[#5A6560] sm:text-sm">
              At Well Diet, we believe healthy eating shouldn&apos;t feel complicated or restrictive.
              Through personalized macro insights, mindful habits, and evidence-backed guidance, we
              help you build a sustainable rhythm that fits naturally into your everyday life.
            </p>

            {/* Asymmetric Two-Photo Showcase */}
            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-12">
              <div className="overflow-hidden rounded-2xl border border-stone-200/70 sm:col-span-4">
                <img
                  src={heroImg}
                  alt="Fresh nutrient-dense salad bowl"
                  className="h-56 w-full object-cover object-center sm:h-64"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-stone-200/70 sm:col-span-8">
                <img
                  src={bowlImg}
                  alt="Balanced grain and vegetable meal preparation"
                  className="h-56 w-full object-cover object-center sm:h-64"
                />
              </div>
            </div>

            {/* Philosophy Sub-Headline */}
            <h2 className="mt-14 max-w-xl font-serif text-2xl font-normal leading-[1.22] tracking-tight text-[#182B20] sm:text-[32px]">
              Eat intentionally. Live better. It’s not just a tagline – it’s how we calculate every
              macro, every meal, and every habit.
            </h2>

            {/* Two-Column Story Split */}
            <div className="mt-8 grid grid-cols-1 items-start gap-8 md:grid-cols-12">
              <div className="overflow-hidden rounded-2xl border border-stone-200/70 md:col-span-5">
                <img
                  src={bowlImg}
                  alt="Preparing wholesome daily meals"
                  className="h-64 w-full object-cover object-center sm:h-72"
                />
              </div>

              <div className="space-y-4 text-xs leading-relaxed text-[#5A6560] sm:text-[13px] md:col-span-7">
                <p>
                  We believe nutrition should adapt to your life—not the other way around. Every
                  recommendation is tailored to your body, goals, and daily pace.
                </p>
                <p>
                  Rooted in the principles of whole-food nourishment and clinical precision, Well
                  Diet bridges the gap between strict tracking and intuitive eating—giving you
                  clear targets for calories, protein, carbs, and fats without guesswork.
                </p>
                <p>
                  Whether you are focused on steady fat loss, lean muscle gain, or balanced
                  everyday energy, our system turns complex nutritional science into simple,
                  actionable daily choices.
                </p>
              </div>
            </div>

            {/* Subtle Full-Width Pill Strip */}
            <div className="mt-8 rounded-full bg-[#EFECE6] px-6 py-2.5 text-center text-[11px] font-medium text-[#5A6560]">
              Built with nutrition science, guided by real habits, and designed for lasting
              wellbeing.
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2: Voices from the Community & Core Pillars (Warm Sand Background) */}
      <section className="bg-[#F2EDE4] py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Voices from the Community */}
            <div>
              <h2 className="font-serif text-2xl font-normal tracking-tight text-[#182B20] sm:text-[28px]">
                Voices from the Community
              </h2>

              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {communityVoices.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl border border-stone-200/60 bg-[#FAF9F6] p-6 shadow-2xs"
                  >
                    <p className="text-xs leading-relaxed text-[#3E4A44]">{item.quote}</p>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2C4C3B] text-[10px] font-semibold text-white">
                        {item.initials}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-[#182B20]">{item.name}</p>
                        <p className="text-[10px] text-[#7D8A83]">{item.role}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Caring for the body that carries you */}
            <div className="mt-20 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Left Copy & Thumbnail */}
              <div className="lg:col-span-5">
                <h2 className="font-serif text-2xl font-normal leading-snug tracking-tight text-[#182B20] sm:text-[30px]">
                  Caring for the body that carries you
                </h2>

                <div className="mt-5 flex items-start gap-4">
                  <img
                    src={heroImg}
                    alt="Nourishing bowl"
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <p className="text-xs leading-relaxed text-[#5A6560]">
                    Every detail of our approach is grounded in respect for your body—honoring
                    nourishment, consistency, and sustainable progress over quick fixes.
                  </p>
                </div>
              </div>

              {/* Right 3 Stacked Pill Cards */}
              <div className="space-y-3 lg:col-span-7">
                {corePillars.map((pillar) => {
                  const isOpen = expandedPillar === pillar.id;
                  return (
                    <div
                      key={pillar.id}
                      className="overflow-hidden rounded-[26px] border border-stone-200/70 bg-[#FAF9F6] transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => togglePillar(pillar.id)}
                        className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6EDE4] text-[#2C4C3B]">
                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              className="h-3.5 w-3.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.5 8.5l3 3 6-6.5"
                              />
                            </svg>
                          </span>
                          <span className="text-xs font-semibold text-[#182B20] sm:text-sm">
                            {pillar.title}
                          </span>
                        </div>
                        <span className="text-xs text-[#7D8A83]">{isOpen ? "−" : "+"}</span>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-4 pl-15 text-xs leading-relaxed text-[#5A6560]">
                          {pillar.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3: Start Your Routine CTA Banner */}
      <section className="bg-[#FAF9F6] py-16 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-12">
            {/* Left Highlights */}
            <div className="md:col-span-4">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">Start Your Routine</h3>
              <ul className="mt-4 space-y-2.5 text-xs text-[#5A6560]">
                <li className="flex items-center gap-2.5">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E6EDE4] text-[10px] text-[#2C4C3B]">
                    ✓
                  </span>
                  <span>Personalized daily macro targets</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E6EDE4] text-[10px] text-[#2C4C3B]">
                    ✓
                  </span>
                  <span>Curated meal &amp; habit check-ins</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E6EDE4] text-[10px] text-[#2C4C3B]">
                    ✓
                  </span>
                  <span>Adaptive expert-backed plans</span>
                </li>
              </ul>
            </div>

            {/* Center Bowl Card */}
            <div className="flex justify-center md:col-span-4">
              <div className="h-44 w-44 overflow-hidden rounded-2xl border border-stone-200/80 shadow-xs">
                <img
                  src={heroImg}
                  alt="Well Diet Signature Bowl"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Right CTA Copy */}
            <div className="md:col-span-4">
              <h3 className="font-serif text-xl font-normal leading-snug text-[#182B20]">
                We’re more than a calorie calculator —
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5A6560]">
                Build lasting nutrition habits with a plan shaped around your real life.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Link
                  to="/diet-plans"
                  className="inline-flex items-center justify-center rounded-full bg-[#2C4C3B] px-5 py-2.5 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
                >
                  Start planning
                </Link>
                <Link
                  to="/diet-plans"
                  className="text-xs font-semibold text-[#2C4C3B] transition-colors hover:text-[#182B20] hover:underline"
                >
                  Explore plans →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default AboutUsPage;
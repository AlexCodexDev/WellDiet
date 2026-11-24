import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../components/layouts/user/PageLayout";
import Container from "../../components/layouts/user/container";
import loginBowlImg from "../../assets/login-bowl.png";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();
      
      if(!response.ok) {
        setErrorMessage(data.message || "Login failed.");
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <section className="bg-[#FAF9F6] py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Left Editorial Feature Card */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-[26px] border border-stone-200/70 bg-[#E7EFE8] shadow-xs">
                {/* Top Sage Copy Area */}
                <div className="px-7 pt-9 pb-8 sm:px-10 sm:pt-11 sm:pb-9">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-3">
                    <span className="h-px w-5 bg-[#7D9285]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5D7366]">
                      Small Steps. Lasting Wellness.
                    </span>
                  </div>

                  {/* Serif Title */}
                  <h2 className="mt-4 font-serif text-3xl font-normal leading-[1.15] tracking-tight text-[#182B20] sm:text-[38px]">
                    A little balance.
                    <br />A healthier you.
                  </h2>

                  {/* Supporting Copy */}
                  <p className="mt-3.5 max-w-md text-sm leading-relaxed text-[#5A6560]">
                    Come back to nourishing meals, mindful habits, and a plan that feels right for
                    you.
                  </p>
                </div>

                {/* Bottom Food Image + Floating Badge */}
                <div className="relative h-65 w-full sm:h-77.5">
                  <img
                    src={loginBowlImg}
                    alt="Nourishing grain and avocado bowl"
                    className="h-full w-full object-cover object-center"
                  />

                  {/* Bottom-Left Floating Pill */}
                  <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF9F6]/95 px-4 py-2 text-xs font-medium text-[#182B20] shadow-sm backdrop-blur-xs">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-4 w-4 text-[#2C4C3B]"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 19v-7m0 0c0-3.2 2.4-5.5 5.8-5.5 0 3.4-2.2 5.5-5.8 5.5zm0 2c0-2.7-2.1-4.7-5-4.7 0 2.9 1.9 4.7 5 4.7z"
                        />
                      </svg>
                      <span>Expert nutrition. Your everyday rhythm.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Login Form Column */}
            <div className="lg:col-span-6">
              <div className="mx-auto w-full max-w-md">
                {/* Eyebrow */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6E7A74]">
                  Your Wellness, Continued
                </p>

                {/* Heading */}
                <h1 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#182B20] sm:text-[38px]">
                  Welcome back
                </h1>

                {/* Subtitle */}
                <p className="mt-2.5 text-sm leading-relaxed text-[#5A6560]">
                  Log in to your Well Diet account and pick up where you left off.
                </p>

                {/* Error Alert */}
                {errorMessage && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                    {errorMessage}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold text-[#182B20]"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-stone-200/90 bg-white px-4 py-3 text-sm text-[#182B20] placeholder:text-stone-400 transition-colors focus:border-[#2C4C3B] focus:outline-none focus:ring-1 focus:ring-[#2C4C3B]"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-xs font-semibold text-[#182B20]"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-stone-200/90 bg-white py-3 pr-11 pl-4 text-sm text-[#182B20] placeholder:text-stone-400 transition-colors focus:border-[#2C4C3B] focus:outline-none focus:ring-1 focus:ring-[#2C4C3B]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute top-1/2 right-3.5 -translate-y-1/2 text-stone-500 transition-colors hover:text-[#182B20]"
                      >
                        {showPassword ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-[#2C4C3B] transition-colors hover:text-[#182B20] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#2C4C3B] px-6 py-3.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#213A2D] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span>{isLoading ? "Logging in..." : "Log in"}</span>
                    {!isLoading && (
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
                    )}
                  </button>
                </form>

                {/* Sign Up Link */}
                <p className="mt-5 text-center text-xs text-[#5A6560]">
                  New to Well Diet?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-[#2C4C3B] transition-colors hover:text-[#182B20] hover:underline"
                  >
                    Sign up
                  </Link>
                </p>

                {/* Divider & Privacy Footer Note */}
                <div className="mt-7 border-t border-stone-200/80 pt-5">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7B8680]">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.167 9.167H5.833c-.92 0-1.666.746-1.666 1.666v4.167c0 .92.746 1.667 1.666 1.667h8.334c.92 0 1.666-.747 1.666-1.667v-4.167c0-.92-.746-1.666-1.666-1.666zM7.5 9.167V6.667a2.5 2.5 0 015 0v2.5"
                      />
                    </svg>
                    <span>Your wellbeing is personal. Your data stays private.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default LoginPage;
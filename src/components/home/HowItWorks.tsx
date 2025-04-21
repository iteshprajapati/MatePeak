
import React, { useState } from "react";
import { Search, CalendarDays, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Find Your Mentor",
    subtitle: "Browse Experts",
    description: "Discover top mentors by skill, domain, or passion.",
    icon: Search,
    color: "from-[#FFFBEB] to-[#FFF8DC]",
  },
  {
    title: "Book a Session",
    subtitle: "Pick a Time",
    description: "Choose when and what you'd like to discuss.",
    icon: CalendarDays,
    color: "from-[#FFF8DC] to-[#FFFBEB]",
  },
  {
    title: "Connect & Grow",
    subtitle: "Learn & Evolve",
    description: "Join your session and grow with guidance.",
    icon: Users,
    color: "from-white to-[#FFFBEB]",
  },
];

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const HowItWorks = ({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement> }) => {
  const [active, setActive] = useState(0);

  const goLeft = () => setActive((prev) => mod(prev - 1, steps.length));
  const goRight = () => setActive((prev) => mod(prev + 1, steps.length));

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-[#f9fafd] via-[#f7f8fa] to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-matepeak-primary mb-3 font-poppins">
            How MatePeak Works
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Get mentorship in three easy steps—from browsing experts to growing your skills.
          </p>
        </div>
        <div className="relative flex items-center justify-center mb-10 select-none overflow-visible">
          <button
            aria-label="Previous step"
            onClick={goLeft}
            className="z-10 absolute left-2 md:left-0 top-1/2 -translate-y-1/2 bg-white shadow-md border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition hover:bg-[#FFFBEB] focus:outline-none"
          >
            <svg width={22} height={22} viewBox="0 0 24 24" stroke="#888" fill="none"><path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="flex w-full max-w-3xl items-center justify-center h-[340px] md:h-[280px] relative">
            {[...Array(3)].map((_, i) => {
              // -1: left, 0: center, 1: right (from active)
              const stepIdx = mod(active + i - 1, steps.length);
              let pos = i - 1; // -1, 0, 1

              // Determine visual style based on position
              const step = steps[stepIdx];
              let scale = pos === 0 ? "scale-100" : "scale-95";
              let blur = pos === 0 ? "blur-0" : "blur-[1px]"; // reduced blur
              let z = pos === 0 ? "z-10" : "z-0";
              let opacity = pos === 0 ? "opacity-100" : "opacity-80"; // increased opacity
              let yTrans = pos === 0 ? "translate-y-0" : "translate-y-3"; // reduced y-offset
              let boxShadow =
                pos === 0
                  ? "shadow-xl"
                  : "shadow-md";

              return (
                <div
                  key={step.title}
                  aria-hidden={pos !== 0}
                  className={cn(
                    "absolute transition-all duration-500 ease-in-out flex flex-col items-center w-5/6 md:w-2/5 max-w-md mx-auto cursor-default",
                    scale,
                    blur,
                    z,
                    opacity,
                    yTrans,
                    boxShadow
                  )}
                  style={{
                    left:
                      pos === -1
                        ? "5%"
                        : pos === 1
                        ? "55%"
                        : "30%",
                  }}
                >
                  <div
                    className={cn(
                      "w-full rounded-2xl bg-gradient-to-br",
                      step.color,
                      "p-8 md:p-10 flex flex-col items-center min-h-[260px] md:min-h-[220px] shadow-sm"
                    )}
                  >
                    <div
                      className={cn(
                        "w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow group transition duration-300",
                        "hover:scale-110"
                      )}
                      style={{
                        boxShadow:
                          "0 4px 16px 0 rgba(40,40,40,0.06), 0 2px 8px 0 rgba(120,120,160,0.10)",
                      }}
                    >
                      <step.icon
                        size={36}
                        className="text-matepeak-primary transition-transform group-hover:scale-110"
                        strokeWidth={2.2}
                      />
                    </div>
                    <span className="uppercase text-xs text-matepeak-secondary font-medium tracking-widest mb-1 opacity-80">
                      {step.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold mb-2 text-matepeak-primary tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-center text-base opacity-90 font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            aria-label="Next step"
            onClick={goRight}
            className="z-10 absolute right-2 md:right-0 top-1/2 -translate-y-1/2 bg-white shadow-md border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition hover:bg-[#FFFBEB] focus:outline-none"
          >
            <svg width={22} height={22} viewBox="0 0 24 24" stroke="#888" fill="none"><path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className="text-center mt-8">
          <a href="/how-it-works">
            <button
              className="rounded-full border border-matepeak-primary text-matepeak-primary font-semibold px-8 py-3 text-base group relative transition bg-white hover:bg-[#FFFBEB] overflow-hidden"
              style={{
                boxShadow: "0 1px 4px rgba(34,34,34,0.07)",
              }}
            >
              <span className="relative z-10 flex items-center">
                Learn More About How It Works
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M13 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="absolute left-5 bottom-0 h-0.5 bg-[#FFD966] w-0 group-hover:w-[85%] transition-all duration-300"></span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

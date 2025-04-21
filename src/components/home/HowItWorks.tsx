
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Search, CalendarDays, Users, ArrowRight } from "lucide-react";

interface HowItWorksProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const steps = [
  {
    title: "Find Your Mentor",
    subtitle: "Browse Experts",
    description: "Discover top mentors by skill, domain, or passion.",
    icon: Search,
    bg: "bg-[#D3E4FD]",
  },
  {
    title: "Book a Session",
    subtitle: "Pick a Time",
    description: "Choose when and what you'd like to discuss.",
    icon: CalendarDays,
    bg: "bg-[#F1F0FB]",
  },
  {
    title: "Connect & Grow",
    subtitle: "Learn & Evolve",
    description: "Join your session and grow with guidance.",
    icon: Users,
    bg: "bg-white",
  },
];

const HowItWorks = ({ sectionRef }: HowItWorksProps) => {
  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white"
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
        <div className="relative max-w-3xl mx-auto">
          <Carousel opts={{ align: "center", loop: true }}>
            <CarouselContent>
              {steps.map((step, idx) => (
                <CarouselItem
                  key={step.title}
                  className="md:basis-1/2 lg:basis-1/3 px-4"
                >
                  <div
                    className={
                      `rounded-2xl shadow-lg ${step.bg} transition-shadow duration-300 flex flex-col items-center p-8 relative h-full group hover:shadow-xl`
                    }
                  >
                    <div
                      className={
                        "w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6 transition-transform duration-300 bg-white group-hover:scale-110"
                      }
                      style={{
                        boxShadow:
                          "0 4px 16px 0 rgba(40,40,40,0.05), 0 1.5px 5px 0 rgba(120,120,160,0.07)",
                      }}
                    >
                      {/* Icon with subtle hover scale */}
                      <step.icon
                        size={36}
                        className="text-matepeak-primary transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={2.2}
                      />
                    </div>
                    <span className="uppercase text-xs text-matepeak-secondary font-medium tracking-widest mb-1 opacity-80">
                      {step.subtitle}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-matepeak-primary tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-center text-base opacity-90">
                      {step.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious aria-label="Previous Step" />
            <CarouselNext aria-label="Next Step" />
          </Carousel>
        </div>
        <div className="text-center mt-12">
          <Link to="/how-it-works">
            <Button
              variant="outline"
              className="rounded-full border-matepeak-primary text-matepeak-primary font-semibold px-8 py-3 text-base group relative transition
                before:absolute before:left-5 before:bottom-0 before:h-0.5 before:bg-matepeak-primary before:w-0 before:transition-all before:duration-300 group-hover:before:w-[85%]"
              style={{
                boxShadow:
                  "0 1px 4px rgba(34,34,34,0.06)",
                overflow: "hidden"
              }}
            >
              <span className="relative z-10 flex items-center">
                Learn More About How It Works
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

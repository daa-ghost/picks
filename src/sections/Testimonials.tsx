import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Amina Benali",
    role: "Food Blogger",
    avatar: "AB",
    rating: 5,
    text: "The best fast food experience in Morocco! The Royal Double Burger is absolutely incredible - juicy, flavorful, and perfectly seasoned. Pick Morocco has set a new standard for street food.",
  },
  {
    name: "Karim Idrissi",
    role: "Regular Customer",
    avatar: "KI",
    rating: 5,
    text: "I order from Pick Morocco at least twice a week. The delivery is always fast, the food arrives hot, and the quality never disappoints. The chicken shawarma wrap is my absolute favorite!",
  },
  {
    name: "Sofia El Amrani",
    role: "Travel Influencer",
    avatar: "SE",
    rating: 5,
    text: "As someone who travels the world tasting street food, I can honestly say Pick Morocco competes with the best. The flavors are authentic, the presentation is stunning, and the atmosphere is electric.",
  },
  {
    name: "Youssef Tahiri",
    role: "Local Guide",
    avatar: "YT",
    rating: 5,
    text: "I bring all my tour groups here. It's the perfect introduction to modern Moroccan cuisine. The staff is friendly, the restaurant is beautiful, and the food is consistently amazing.",
  },
  {
    name: "Fatima Zahra",
    role: "Chef",
    avatar: "FZ",
    rating: 5,
    text: "As a professional chef, I'm incredibly picky about where I eat. Pick Morocco impresses me every time with their attention to detail, quality ingredients, and bold flavors. Truly exceptional.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".test-header", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;
    gsap.to(sliderRef.current, {
      x: `-${current * 100}%`,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [current]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF7A00, transparent 70%)" }}
      />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="test-header text-brand-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Testimonials
          </h2>
          <h3 className="test-header text-white text-4xl md:text-6xl font-extrabold tracking-tight">
            WHAT OUR <span className="text-brand-orange">CUSTOMERS</span> SAY
          </h3>
        </div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div ref={sliderRef} className="flex will-change-transform">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="text-center">
                    <Quote className="w-12 h-12 text-brand-orange/30 mx-auto mb-8" />

                    {/* Stars */}
                    <div className="flex items-center justify-center gap-1 mb-8">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-6 h-6 text-brand-orange fill-brand-orange"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {/* Avatar */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-orange to-brand-burnt flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div className="text-left">
                        <h4 className="text-white font-bold text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-white/50 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-brand-orange"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

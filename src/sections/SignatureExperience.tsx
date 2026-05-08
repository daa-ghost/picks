import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Truck, Clock, Users, ChefHat, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Flame,
    title: "Authentic Moroccan Flavors",
    description: "Our recipes are inspired by the bustling street food markets of Marrakech, Casablanca, and Tangier. Every spice blend is crafted in-house.",
  },
  {
    icon: ChefHat,
    title: "Fresh Ingredients Daily",
    description: "We source the finest local ingredients every morning. Our meats are halal-certified and our produce is always farm-fresh.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Hot food delivered to your door in 30 minutes or less. Our delivery fleet covers every corner of the city.",
  },
  {
    icon: Users,
    title: "Friendly Atmosphere",
    description: "Step into any Pick Morocco location and feel the warmth. Our staff treats every guest like family.",
  },
  {
    icon: Clock,
    title: "Open Late",
    description: "Cravings don't follow a schedule. Most of our locations are open until 2 AM on weekends.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Voted Best Fast Food in Morocco 2024. Our signature burger has won national culinary awards three years running.",
  },
];

export default function SignatureExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".exp-header", {
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

      gsap.from(".exp-card", {
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF7A00, transparent 70%)" }}
      />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="exp-header text-brand-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Why Choose Us
          </h2>
          <h3 className="exp-header text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            THE <span className="text-brand-orange">PICK MOROCCO</span> EXPERIENCE
          </h3>
          <p className="exp-header text-white/60 text-lg max-w-2xl mx-auto">
            We don't just serve food, we deliver an experience that brings the vibrant streets of Morocco to your plate.
          </p>
        </div>

        {/* Features Grid */}
        <div className="exp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="exp-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-orange/40 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6 group-hover:bg-brand-orange/20 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-brand-orange" />
              </div>
              <h4 className="text-white text-xl font-bold mb-3">
                {feature.title}
              </h4>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "0 0 40px rgba(255, 122, 0, 0.1), inset 0 0 40px rgba(255, 122, 0, 0.03)" }}
              />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "15+", label: "Locations" },
            { value: "2M+", label: "Happy Customers" },
            { value: "50+", label: "Menu Items" },
            { value: "30min", label: "Avg Delivery" },
          ].map((stat, i) => (
            <div key={i} className="exp-card text-center">
              <div className="text-5xl md:text-6xl font-extrabold text-brand-orange mb-2">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

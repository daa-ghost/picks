import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PromoSpotlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !marqueeRef.current) return;

    const ctx = gsap.context(() => {
      // Endless Marquee Animation
      gsap.to(".marquee-text", {
        xPercent: -100,
        repeat: -1,
        duration: 10,
        ease: "linear",
      });

      // Simple pop-up on scroll for the image
      gsap.from(".promo-card", {
        y: 100,
        opacity: 0,
        rotation: -4,
        scale: 0.9,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-brand-red overflow-hidden border-t-8 border-brand-charcoal border-b-8"
    >
      {/* Endless Marquee Background */}
      <div 
        ref={marqueeRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 flex whitespace-nowrap opacity-20 pointer-events-none select-none z-0"
        style={{ transform: "translateY(-50%) rotate(-5deg)" }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="marquee-text flex-shrink-0 flex items-center">
            <span className="text-[12vw] font-black text-brand-charcoal uppercase tracking-tighter leading-none mx-4">
              BEST QUALITY
            </span>
            <span className="text-[8vw] font-black text-brand-cream uppercase tracking-tighter leading-none mx-4">
              ★
            </span>
            <span className="text-[12vw] font-black text-brand-charcoal uppercase tracking-tighter leading-none mx-4">
              THE PICKY EXPERIENCE
            </span>
            <span className="text-[8vw] font-black text-brand-cream uppercase tracking-tighter leading-none mx-4">
              ★
            </span>
          </div>
        ))}
      </div>

      <div className="section-padding relative z-10 flex flex-col items-center justify-center">
        
        {/* Neobrutalist Promo Card */}
        <div className="promo-card bg-brand-cream border-4 border-brand-charcoal rounded-[16px] p-6 md:p-10 max-w-4xl w-full" style={{ boxShadow: "12px 12px 0px 0px #111111" }}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            
            <div className="w-full md:w-1/2 aspect-square relative border-4 border-brand-charcoal rounded-[8px] overflow-hidden bg-brand-ash" style={{ boxShadow: "6px 6px 0px 0px #111111" }}>
              <img
                src={`${import.meta.env.BASE_URL}images/promo-food.jpg`}
                alt="Promo Food"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-start text-left">
              <div className="bg-brand-charcoal text-brand-cream px-4 py-2 text-sm font-bold uppercase tracking-widest rounded-full mb-6">
                Limited Time
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-charcoal uppercase leading-none mb-6" style={{ textShadow: "2px 2px 0px #C9222B" }}>
                Nothing But <br />The Best
              </h2>
              <p className="text-brand-charcoal font-bold text-lg mb-8">
                Experience the finest ingredients and authentic flavors, hand-picked for your enjoyment. Don't settle for less.
              </p>
              <button className="btn-primary w-full md:w-auto">
                Claim Offer
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}

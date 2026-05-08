import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Staggered text reveal
      gsap.from(".hero-word", {
        y: 120,
        rotation: 10,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.5)",
        delay: 0.2,
      });

      // Floating badge
      gsap.to(".spin-badge", {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "linear",
      });

      // Hero image pop
      gsap.from(".hero-image", {
        scale: 0,
        rotation: -20,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        delay: 0.6,
      });

      // Floating elements
      gsap.to(".floating-element", {
        y: -15,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.2
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => {
    const el = document.querySelector("#menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-brand-cream overflow-hidden pt-20"
    >
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#1A1A1A 2px, transparent 2px)", 
          backgroundSize: "30px 30px",
          opacity: 0.05 
        }}
      ></div>

      <div className="section-padding w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-start pt-10 lg:pt-0 relative z-20">
          
          <div className="overflow-hidden mb-4">
            <span className="hero-word block bg-brand-charcoal text-brand-cream px-4 py-2 font-bold uppercase tracking-widest text-sm rounded-full border-2 border-brand-charcoal shadow-[4px_4px_0px_#1A1A1A]">
              100% Genuine Taste
            </span>
          </div>
          
          <h1 className="font-black uppercase leading-[0.85] tracking-tighter text-brand-charcoal mb-8"
              style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
          >
            <div className="overflow-hidden py-2"><span className="hero-word block">Crave</span></div>
            <div className="overflow-hidden py-2">
              <span className="hero-word block text-brand-red flex items-center gap-4" style={{ textShadow: "4px 4px 0px #1A1A1A" }}>
                The Bold
                <Star className="hidden lg:block text-brand-cream fill-brand-charcoal w-12 h-12 lg:w-20 lg:h-20 stroke-[3]" />
              </span>
            </div>
            <div className="overflow-hidden py-2"><span className="hero-word block">Difference.</span></div>
          </h1>
          
          <p className="hero-word text-brand-charcoal text-lg md:text-2xl font-bold max-w-lg mb-10 leading-snug">
            Welcome to PICKS. We serve up massive flavor, zero compromise, and a dining experience you won't forget.
          </p>

          <div className="hero-word flex flex-wrap gap-4">
            <button
              onClick={scrollToMenu}
              className="btn-primary flex items-center gap-2 group"
            >
              Order Now 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToMenu}
              className="btn-secondary"
            >
              View Menu
            </button>
          </div>
        </div>

        {/* Right Image/Graphic Area */}
        <div className="relative w-full h-[50vh] lg:h-auto flex items-center justify-center mt-10 md:mt-0 z-10">
          
          {/* Spinning Badge */}
          <div className="spin-badge absolute top-0 lg:top-10 right-4 lg:-right-4 w-28 h-28 lg:w-36 lg:h-36 bg-brand-red border-4 border-brand-charcoal rounded-full flex items-center justify-center z-30 shadow-[6px_6px_0px_#1A1A1A]">
            <div className="text-white font-black text-center leading-none">
              <span className="text-2xl lg:text-3xl block">BEST</span>
              <span className="text-sm lg:text-base block">IN TOWN</span>
            </div>
          </div>

          {/* Main Image Container */}
          <div className="hero-image relative w-[90%] max-w-[450px] aspect-square bg-brand-ash border-[8px] border-brand-charcoal rounded-full flex items-center justify-center shadow-[16px_16px_0px_#1A1A1A] overflow-visible">
            
            {/* The Image inside the circle */}
            <div className="absolute inset-0 rounded-full overflow-hidden bg-brand-ash">
              <img src={`${import.meta.env.BASE_URL}images/promo-food.jpg`} alt="Delicious Food" className="w-full h-full object-cover scale-110" />
            </div>
            
            {/* Floating pop-out element */}
            <div className="floating-element absolute -bottom-6 -left-6 bg-white border-4 border-brand-charcoal p-4 rounded-[12px] shadow-[8px_8px_0px_#1A1A1A] z-20 transform -rotate-6">
              <span className="text-brand-red font-black text-xl flex items-center gap-2 uppercase tracking-wide">
                <span className="text-3xl">🔥</span> Served Hot
              </span>
            </div>

            {/* Another smaller floating element */}
            <div className="floating-element absolute top-10 -left-8 bg-brand-charcoal border-4 border-brand-cream p-3 rounded-[12px] shadow-[6px_6px_0px_#EE4238] z-20 transform rotate-12" style={{ animationDelay: '0.5s' }}>
              <span className="text-brand-cream font-bold flex items-center gap-2 uppercase text-sm tracking-widest">
                100% Fresh
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

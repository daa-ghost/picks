import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    city: "Marrakech",
    address: "Avenue Mohammed VI, Gueliz, Marrakech",
    hours: "10:00 AM - 12:00 AM",
    phone: "+212 5244-XXXXX",
    mapUrl: "https://maps.google.com/?q=Marrakech",
  },
  {
    city: "Casablanca",
    address: "Boulevard d'Anfa, Maarif, Casablanca",
    hours: "10:00 AM - 2:00 AM",
    phone: "+212 5222-XXXXX",
    mapUrl: "https://maps.google.com/?q=Casablanca",
  },
  {
    city: "Rabat",
    address: "Avenue Allal El Fassi, Agdal, Rabat",
    hours: "10:00 AM - 12:00 AM",
    phone: "+212 5377-XXXXX",
    mapUrl: "https://maps.google.com/?q=Rabat",
  },
  {
    city: "Tangier",
    address: "Boulevard Mohamed VI, Tangier",
    hours: "10:00 AM - 1:00 AM",
    phone: "+212 5399-XXXXX",
    mapUrl: "https://maps.google.com/?q=Tangier",
  },
  {
    city: "Agadir",
    address: "Boulevard Hassan II, Agadir",
    hours: "10:00 AM - 12:00 AM",
    phone: "+212 5288-XXXXX",
    mapUrl: "https://maps.google.com/?q=Agadir",
  },
];

export default function Locations() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".loc-header", {
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

      gsap.from(".loc-card", {
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".loc-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="loc-header text-brand-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Find Us
          </h2>
          <h3 className="loc-header text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            OUR <span className="text-brand-orange">LOCATIONS</span>
          </h3>
          <p className="loc-header text-white/60 text-lg max-w-2xl mx-auto">
            Visit any of our restaurants across Morocco for an unforgettable dining experience.
          </p>
        </div>

        {/* Location Cards */}
        <div className="loc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="loc-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-orange/40 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/20 transition-colors">
                  <MapPin className="w-7 h-7 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-white text-xl font-bold mb-1">
                    {loc.city}
                  </h4>
                  <p className="text-white/50 text-sm">
                    {loc.address}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Clock className="w-4 h-4 text-brand-orange" />
                  <span>{loc.hours}</span>
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <span>{loc.phone}</span>
                </div>
              </div>

              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-brand-orange/10 text-brand-orange font-semibold text-sm hover:bg-brand-orange hover:text-white transition-all duration-300"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>

              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "0 0 40px rgba(255, 122, 0, 0.1), inset 0 0 40px rgba(255, 122, 0, 0.03)" }}
              />
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="loc-card relative rounded-3xl overflow-hidden border border-white/10" style={{ height: "400px" }}>
          <img
            src={`${import.meta.env.BASE_URL}images/restaurant-interior.jpg`}
            alt="Restaurant Interior"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-brand-orange mx-auto mb-4 animate-bounce" />
              <h4 className="text-white text-2xl font-bold mb-2">
                Find Your Nearest Pick Morocco
              </h4>
              <p className="text-white/60 mb-6">
                We have 15+ locations across Morocco
              </p>
              <button className="btn-primary px-8 py-3">
                View All Locations
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Home, Utensils, MapPin, Store, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Menu", href: "/#menu" },
  { label: "Locations", href: "/#locations" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Franchise", href: "/franchise" },
];

const mobileNavLinks = [
  { label: "Home", href: "/#home", icon: Home },
  { label: "Menu", href: "/#menu", icon: Utensils },
  { label: "Locations", href: "/#locations", icon: MapPin },
  { label: "Franchise", href: "/franchise", icon: Store },
  { label: "Contact", href: "/#contact", icon: Phone },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle hash scrolls when landing on the home page from another page
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.replace("/", "");
      if (location.pathname === "/") {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      {/* Top Header Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-nav py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("/#home")}
            className="flex flex-col items-start group"
          >
            <img 
              src={`${import.meta.env.BASE_URL}images/img.png`} 
              alt="PICKS Logo" 
              className="h-16 md:h-20 w-auto object-contain rounded-[8px] border-2 border-brand-charcoal shadow-[3px_3px_0px_#111111] transition-transform duration-300 group-hover:-translate-y-1"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-black uppercase tracking-widest text-brand-charcoal hover:text-brand-red transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block flex-shrink-0">
            <button 
              onClick={() => handleNavClick("/#menu")}
              className="btn-primary text-sm py-3 px-6"
            >
              Order Now
            </button>
          </div>

          {/* Mobile Order Button in Top Right */}
          <div className="md:hidden flex-shrink-0">
             <button 
              onClick={() => handleNavClick("/#menu")}
              className="bg-brand-red text-white border-2 border-brand-charcoal shadow-[3px_3px_0px_#111111] font-black uppercase text-xs py-2 px-4 rounded-[6px] active:translate-y-1 active:translate-x-1 active:shadow-[1px_1px_0px_#111111] transition-all"
            >
              Order
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Mobile Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-brand-cream border-t-4 border-brand-charcoal shadow-[0px_-4px_0px_rgba(17,17,17,0.1)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center px-2 py-3">
          {mobileNavLinks.map((link) => {
            const Icon = link.icon;
            const linkHash = link.href.replace("/", "");
            // Check if active based on path and hash
            const isActive = 
              (location.pathname === "/" && location.hash === linkHash) || 
              (location.pathname === link.href) || 
              (location.pathname === "/" && linkHash === "#home" && !location.hash);
            
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`flex flex-col items-center justify-center w-full gap-1.5 transition-all duration-300 ${
                  isActive 
                    ? "text-brand-red scale-110 -translate-y-2" 
                    : "text-brand-charcoal hover:text-brand-red hover:-translate-y-1"
                }`}
              >
                <div className={`relative ${isActive ? "bg-white p-2 rounded-full border-2 border-brand-charcoal shadow-[2px_2px_0px_#111111]" : ""}`}>
                  <Icon size={isActive ? 22 : 24} strokeWidth={isActive ? 3 : 2} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider ${isActive ? "opacity-100" : "opacity-70"}`}>
                  {link.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Menu", href: "/#menu" },
  { label: "Locations", href: "/#locations" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Franchise", href: "/franchise" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    setMobileOpen(false);
    
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
            src={`${import.meta.env.BASE_URL}images/picks.jpg`} 
            alt="PICKS Logo" 
            className="h-12 w-auto object-contain rounded-md border-2 border-brand-charcoal shadow-[2px_2px_0px_#111111]"
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
        <div className="hidden md:block">
          <button className="btn-primary text-sm py-3 px-6">
            Order Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-charcoal p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-brand-cream border-b-4 border-brand-charcoal transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100 border-b-4" : "max-h-0 opacity-0 border-b-0"
        }`}
      >
        <div className="section-padding py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
               key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-lg font-black uppercase tracking-wider text-brand-charcoal hover:text-brand-red transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button className="btn-primary text-sm py-3 px-6 mt-4 w-full">
            Order Now
          </button>
        </div>
      </div>
    </nav>
  );
}

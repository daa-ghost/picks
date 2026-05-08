import { useState } from "react";
import { Instagram, Facebook, Twitter, Youtube, Send, Heart } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Locations", href: "#locations" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
      {/* Top Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />

      {/* Main Footer */}
      <div className="section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-extrabold text-white mb-4">
              Pick <span className="text-brand-orange">Morocco</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Authentic Moroccan street food with a modern twist. Taste the difference in every bite.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/50 text-sm hover:text-brand-orange transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/50 text-sm hover:text-brand-orange transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Newsletter
            </h4>
            <p className="text-white/50 text-sm mb-4">
              Subscribe for exclusive deals and new menu updates.
            </p>
            {subscribed ? (
              <div className="text-brand-orange font-semibold text-sm">
                Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white text-sm placeholder-white/30 outline-none focus:border-brand-orange transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white hover:bg-brand-burnt transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Big Typography */}
      <div className="section-padding pb-10 overflow-hidden">
        <div className="text-center select-none pointer-events-none">
          <div
            className="font-extrabold uppercase leading-none tracking-tighter"
            style={{ fontSize: "clamp(3rem, 15vw, 14rem)", color: "rgba(255,255,255,0.03)" }}
          >
            PICK
          </div>
          <div
            className="font-extrabold uppercase leading-none tracking-tighter -mt-4 md:-mt-10"
            style={{ fontSize: "clamp(3rem, 15vw, 14rem)", color: "rgba(255,122,0,0.06)" }}
          >
            MOROCCO
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="section-padding py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center md:text-left">
            &copy; 2024 Pick Morocco. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-brand-orange fill-brand-orange" /> in Morocco
          </p>
        </div>
      </div>
    </footer>
  );
}

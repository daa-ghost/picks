import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Phone, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-left", {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact-right", {
        x: 80,
        opacity: 0,
        duration: 0.8,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Info */}
          <div className="contact-left">
            <h2 className="text-brand-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Get In Touch
            </h2>
            <h3 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              JOIN THE <span className="text-brand-orange">FAMILY</span>
            </h3>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              Whether you want to franchise, partner, or just say hello, we would love to hear from you. Pick Morocco is expanding across Africa and beyond.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Email</p>
                  <p className="text-white font-semibold">hello@pickmorocco.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Phone</p>
                  <p className="text-white font-semibold">+212 522-XXXXXX</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Headquarters</p>
                  <p className="text-white font-semibold">Casablanca, Morocco</p>
                </div>
              </div>
            </div>

            {/* Franchise Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-extrabold text-brand-orange mb-1">50+</div>
                <div className="text-white/50 text-xs uppercase tracking-wider">Cities</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-extrabold text-brand-orange mb-1">15+</div>
                <div className="text-white/50 text-xs uppercase tracking-wider">Locations</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-extrabold text-brand-orange mb-1">200+</div>
                <div className="text-white/50 text-xs uppercase tracking-wider">Employees</div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-right">
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10"
            >
              <h4 className="text-white text-2xl font-bold mb-8">
                Send us a message
              </h4>

              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-brand-orange/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-brand-orange" />
                  </div>
                  <h5 className="text-white text-xl font-bold mb-2">Message Sent!</h5>
                  <p className="text-white/60">We will get back to you shortly.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="input-glow"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="input-glow"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+212 XXX-XXXXXX"
                      className="input-glow"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your inquiry..."
                      rows={4}
                      className="input-glow resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

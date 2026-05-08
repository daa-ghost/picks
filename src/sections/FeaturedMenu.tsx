import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Burgers", "Tacos", "Shawarma", "Panini", "Pizza", "Drinks", "Desserts"];

const menuItems = [
  { id: 1, name: "Royal Double Burger", description: "Double beef patty, melted cheddar, caramelized onions, special sauce", price: "55 MAD", category: "Burgers", image: "/images/menu-1.png" },
  { id: 2, name: "Crispy Chicken Tacos", description: "Golden fried chicken, salsa, cilantro, lime, orange spicy sauce", price: "42 MAD", category: "Tacos", image: "/images/menu-2.png" },
  { id: 3, name: "Grilled Chicken Shawarma", description: "Marinated chicken, tahini sauce, pickled turnips, fresh veggies", price: "38 MAD", category: "Shawarma", image: "/images/menu-3.png" },
  { id: 4, name: "Mozzarella Panini", description: "Grilled chicken, mozzarella, sun-dried tomatoes, pesto", price: "45 MAD", category: "Panini", image: "/images/menu-4.png" },
  { id: 5, name: "Merguez Pizza", description: "Spicy sausage, roasted peppers, olives, herbs, thin crust", price: "65 MAD", category: "Pizza", image: "/images/menu-5.png" },
  { id: 6, name: "Orange Blossom Juice", description: "Fresh orange juice with mint, ice, and a hint of rose water", price: "22 MAD", category: "Drinks", image: "/images/menu-6.png" },
  { id: 7, name: "Spiced Fries", description: "Golden crispy fries with Moroccan paprika and herb seasoning", price: "18 MAD", category: "Burgers", image: "/images/menu-7.png" },
  { id: 8, name: "Crispy Chicken Wings", description: "Golden fried chicken wings with signature orange dipping sauce", price: "48 MAD", category: "Burgers", image: "/images/menu-8.png" },
  { id: 9, name: "Honey Chebakia", description: "Traditional Moroccan honey sesame cookies, orange blossom garnish", price: "25 MAD", category: "Desserts", image: "/images/menu-9.png" },
];

export default function FeaturedMenu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeCategory === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".menu-header", {
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
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".menu-card-item");
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    );
  }, [activeCategory]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-brand-cream border-t-8 border-brand-charcoal"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="menu-header text-brand-red text-sm font-black uppercase tracking-[0.2em] mb-4">
            Our Menu
          </h2>
          <h3 className="menu-header text-brand-charcoal text-4xl md:text-6xl font-black tracking-tight mb-6">
            SIGNATURE <span className="text-brand-red" style={{ textShadow: "3px 3px 0px #1A1A1A" }}>CREATIONS</span>
          </h3>
          <p className="menu-header text-brand-charcoal font-bold text-lg max-w-2xl mx-auto">
            Every dish is crafted with passion using the finest ingredients, bringing authentic Moroccan flavors to modern fast food.
          </p>
        </div>

        {/* Category Filter */}
        <div className="menu-header flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-[8px] text-sm font-bold transition-all duration-200 uppercase tracking-wider border-2 border-brand-charcoal ${
                activeCategory === cat
                  ? "bg-brand-red text-white"
                  : "bg-white text-brand-charcoal hover:bg-brand-cream"
              }`}
              style={activeCategory === cat ? { boxShadow: "3px 3px 0px 0px #1A1A1A", transform: "translate(-2px, -2px)" } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="menu-card-item menu-card group"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-brand-ash border-b-4 border-brand-charcoal flex items-center justify-center p-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[4px_4px_0px_rgba(26,26,26,0.3)]"
                />
                <button className="absolute bottom-4 right-4 w-12 h-12 rounded-[8px] border-2 border-brand-charcoal bg-brand-red text-white flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#1A1A1A]">
                  <Plus size={22} className="stroke-[3px]" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-brand-charcoal text-xl font-black leading-tight uppercase">
                    {item.name}
                  </h4>
                  <span className="text-brand-red font-black text-lg whitespace-nowrap ml-3 drop-shadow-[1px_1px_0px_#1A1A1A]">
                    {item.price}
                  </span>
                </div>
                <p className="text-brand-charcoal font-bold text-sm leading-relaxed">
                  {item.description}
                </p>
                <button className="mt-5 w-full py-3 rounded-[8px] border-2 border-brand-charcoal bg-brand-cream text-brand-charcoal text-sm font-black hover:bg-brand-red hover:text-white transition-all duration-300 shadow-[3px_3px_0px_0px_#1A1A1A] hover:shadow-[4px_4px_0px_0px_#1A1A1A] uppercase tracking-wider">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-14">
          <button className="btn-primary px-10 py-4">
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
}

import { useEffect } from "react";
import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";

export default function Franchise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-cream font-sans text-brand-charcoal pt-24">
      {/* Since Navigation floats, we just need padding-top */}
      <Navigation />
      
      <div className="section-padding py-16 md:py-24 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-brand-charcoal drop-shadow-[2px_2px_0px_#EE4238]">
          Franchise
        </h1>
        <p className="text-lg font-bold text-brand-charcoal mb-12">
          Nous vous remercions de votre intérêt pour l'acquisition d'une franchise PICKS! Remplissez le formulaire ci-dessous pour commencer.
        </p>

        <form className="bg-white border-4 border-brand-charcoal rounded-[16px] p-8 md:p-12 shadow-[8px_8px_0px_0px_#1A1A1A] space-y-8">
          
          {/* Informations personnelles */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase border-b-4 border-brand-charcoal pb-2">Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase tracking-wider text-sm">Nom</label>
                <input type="text" className="w-full p-3 border-2 border-brand-charcoal rounded-[8px] focus:outline-none focus:ring-4 focus:ring-brand-red/20 transition-all font-bold" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase tracking-wider text-sm">Nom de famille</label>
                <input type="text" className="w-full p-3 border-2 border-brand-charcoal rounded-[8px] focus:outline-none focus:ring-4 focus:ring-brand-red/20 transition-all font-bold" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-bold uppercase tracking-wider text-sm">Courriel</label>
                <input type="email" className="w-full p-3 border-2 border-brand-charcoal rounded-[8px] focus:outline-none focus:ring-4 focus:ring-brand-red/20 transition-all font-bold" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-bold uppercase tracking-wider text-sm">Adresse</label>
                <input type="text" className="w-full p-3 border-2 border-brand-charcoal rounded-[8px] focus:outline-none focus:ring-4 focus:ring-brand-red/20 transition-all font-bold" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase tracking-wider text-sm">Ville</label>
                <input type="text" className="w-full p-3 border-2 border-brand-charcoal rounded-[8px] focus:outline-none focus:ring-4 focus:ring-brand-red/20 transition-all font-bold" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase tracking-wider text-sm">Code postal</label>
                <input type="text" className="w-full p-3 border-2 border-brand-charcoal rounded-[8px] focus:outline-none focus:ring-4 focus:ring-brand-red/20 transition-all font-bold" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-bold uppercase tracking-wider text-sm">Comment avez-vous entendu parler de nous ?</label>
                <input type="text" className="w-full p-3 border-2 border-brand-charcoal rounded-[8px] focus:outline-none focus:ring-4 focus:ring-brand-red/20 transition-all font-bold" />
              </div>
            </div>
          </div>

          {/* Expérience */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase border-b-4 border-brand-charcoal pb-2">Expérience</h2>
            
            <div className="space-y-4">
              <label className="font-bold uppercase tracking-wider text-sm block">Avez-vous de l’expérience en franchise ?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 font-bold cursor-pointer hover:text-brand-red">
                  <input type="radio" name="exp_franchise" value="Oui" className="w-5 h-5 accent-brand-red border-2 border-brand-charcoal" /> Oui
                </label>
                <label className="flex items-center gap-2 font-bold cursor-pointer hover:text-brand-red">
                  <input type="radio" name="exp_franchise" value="Non" className="w-5 h-5 accent-brand-red border-2 border-brand-charcoal" /> Non
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-bold uppercase tracking-wider text-sm block">Si oui, quelle bannière ?</label>
              <input type="text" className="w-full p-3 border-2 border-brand-charcoal rounded-[8px] focus:outline-none focus:ring-4 focus:ring-brand-red/20 transition-all font-bold" />
            </div>

            <div className="space-y-4">
              <label className="font-bold uppercase tracking-wider text-sm block">Échéancier ?</label>
              <input type="text" placeholder="Ex: Dans 6 mois" className="w-full p-3 border-2 border-brand-charcoal rounded-[8px] focus:outline-none focus:ring-4 focus:ring-brand-red/20 transition-all font-bold" />
            </div>

            <div className="space-y-4">
              <label className="font-bold uppercase tracking-wider text-sm block">Avez-vous de l’expérience en restauration ?</label>
              <div className="flex flex-wrap gap-4">
                {["Aucune", "Employé", "Gérant", "Propriétaire"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 font-bold cursor-pointer hover:text-brand-red">
                    <input type="radio" name="exp_restauration" value={opt} className="w-5 h-5 accent-brand-red border-2 border-brand-charcoal" /> {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-bold uppercase tracking-wider text-sm block">Avez-vous de l’expérience en commerce de détail ?</label>
              <div className="flex flex-wrap gap-4">
                {["Aucune", "Employé", "Gérant", "Propriétaire"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 font-bold cursor-pointer hover:text-brand-red">
                    <input type="radio" name="exp_retail" value={opt} className="w-5 h-5 accent-brand-red border-2 border-brand-charcoal" /> {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Localisation */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase border-b-4 border-brand-charcoal pb-2">Information sur la localisation</h2>
            <div className="space-y-4">
              <label className="font-bold uppercase tracking-wider text-sm block">Est-ce que vous résidez dans la ville de l’emplacement désiré ?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 font-bold cursor-pointer hover:text-brand-red">
                  <input type="radio" name="reside_ville" value="Oui" className="w-5 h-5 accent-brand-red border-2 border-brand-charcoal" /> Oui
                </label>
                <label className="flex items-center gap-2 font-bold cursor-pointer hover:text-brand-red">
                  <input type="radio" name="reside_ville" value="Non" className="w-5 h-5 accent-brand-red border-2 border-brand-charcoal" /> Non
                </label>
              </div>
            </div>
          </div>

          {/* Informations financières */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase border-b-4 border-brand-charcoal pb-2">Informations financières</h2>
            
            {[
              { id: "net_worth", label: "J’ai une valeur nette de plus de 500 000 CHF" },
              { id: "liquid", label: "J’ai des liquidités libres de dettes de plus de 500 000 CHF" },
              { id: "multi_unit", label: "Je suis intéressée par le franchisage d’unités multiples" },
              { id: "finance", label: "J’ai accès au financement" }
            ].map(item => (
              <div key={item.id} className="space-y-2">
                <label className="font-bold uppercase tracking-wider text-sm block">{item.label}</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 font-bold cursor-pointer hover:text-brand-red">
                    <input type="radio" name={item.id} value="Oui" className="w-5 h-5 accent-brand-red border-2 border-brand-charcoal" /> Oui
                  </label>
                  <label className="flex items-center gap-2 font-bold cursor-pointer hover:text-brand-red">
                    <input type="radio" name={item.id} value="Non" className="w-5 h-5 accent-brand-red border-2 border-brand-charcoal" /> Non
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Commentaires */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase border-b-4 border-brand-charcoal pb-2">Commentaires</h2>
            <textarea className="w-full flex-1 p-3 border-2 border-brand-charcoal rounded-[8px] focus:outline-none focus:ring-4 focus:ring-brand-red/20 transition-all font-bold min-h-[150px]"></textarea>
          </div>

          <button type="submit" className="btn-primary w-full text-lg py-5 mt-8 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#1A1A1A] transition-all">
            SOUMETTRE LA DEMANDE
          </button>

        </form>
      </div>

      <Footer />
    </div>
  );
}
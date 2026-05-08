import { Routes, Route } from "react-router-dom";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import FeaturedMenu from "./sections/FeaturedMenu";
import PromoSpotlight from "./sections/PromoSpotlight";
import SignatureExperience from "./sections/SignatureExperience";
import Locations from "./sections/Locations";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Franchise from "./pages/Franchise";

function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <FeaturedMenu />
      <PromoSpotlight />
      <SignatureExperience />
      <Locations />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/franchise" element={<Franchise />} />
      </Routes>
    </div>
  );
}

import FooterSection from "../components/layout/footer";
import Navbar from "../components/layout/navbar";
import AboutSection from "../components/sections/about-section";
import ContactSection from "../components/sections/contact-section";
import FireworksSection from "../components/sections/fireworks-section";
import HeroSection from "../components/sections/hero-section";


export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FireworksSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
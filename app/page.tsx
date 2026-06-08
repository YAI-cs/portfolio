import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <WorkSection />
      <AboutSection />
      <Footer />
    </main>
  );
}

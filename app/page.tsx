import AboutSection from "@/components/AboutSection";
import AnchorNav from "@/components/AnchorNav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PressMark from "@/components/PressMark";
import WorkSection from "@/components/WorkSection";

export default function Home() {
  return (
    <main className="relative">
      <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-5 sm:px-10 sm:pt-7">
        <PressMark />
        <AnchorNav />
      </header>

      <Hero />
      <WorkSection />
      <AboutSection />
      <Footer />
    </main>
  );
}

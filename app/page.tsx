import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Services from "@/components/services";
import Work from "@/components/work";
import Process from "@/components/process";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ScrollWatermark from "@/components/scroll-watermark";

export default function Home() {
  return (
    <>
      {/* Fixed background watermark — sits behind everything */}
      <ScrollWatermark />

      {/* Page content — stacked above the watermark */}
      <main className="relative z-10 min-h-screen bg-bg text-primary overflow-x-hidden">
        <Nav />
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

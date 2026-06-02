import dynamic from "next/dynamic";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Services from "@/components/services";
import Work from "@/components/work";
import Process from "@/components/process";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

const ShaderBackground = dynamic(
  () => import("@/components/ui/animated-shader-background"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* Aurora shader — fixed full-screen at z-0, 50% opacity */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      >
        <ShaderBackground />
      </div>

      {/* Page content — stacked above the shader */}
      <main className="relative z-10 min-h-screen text-primary overflow-x-hidden">
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

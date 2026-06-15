import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Services from "@/components/services";
import AIShowcase from "@/components/ai-showcase";
import Work from "@/components/work";
import CTABand from "@/components/cta-band";

// Home — hero + condensed highlights (services preview, AI showcase, a
// 3-project work preview) + closing CTA. Deeper detail lives on the routed
// pages; the previews link through to them.
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services preview />
      <AIShowcase />
      <Work preview />
      <CTABand />
    </>
  );
}

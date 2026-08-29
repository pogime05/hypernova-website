import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Services from "@/components/services";
import AIShowcase from "@/components/ai-showcase";
import Work from "@/components/work";
import CTABand from "@/components/cta-band";

// Home — hero + condensed highlights (capabilities strip, services preview with
// live product UI, an AI showcase preview, a 4-project work preview) + closing
// CTA. Deeper detail lives on the routed pages; the previews link through.
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services preview />
      <AIShowcase preview />
      <Work preview />
      <CTABand />
    </>
  );
}

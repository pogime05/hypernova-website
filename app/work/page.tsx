import type { Metadata } from "next";
import Work from "@/components/work";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Work — HyperNova Technologies",
  description:
    "Selected work from HyperNova Technologies — web apps, marketing sites, and digital cards built to last.",
};

export default function WorkPage() {
  return (
    <>
      <Work />
      <CTABand
        heading="Like what you see?"
        sub="Your project could be next. Tell us what you're building and we'll map the fastest path to shipping it."
      />
    </>
  );
}

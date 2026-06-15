import type { Metadata } from "next";
import { Suspense } from "react";
import WorkFiltered from "@/components/work-filtered";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Work — HyperNova Technologies",
  description:
    "Real, shipped work from HyperNova Technologies — websites, web apps, and digital cards, all live.",
};

export default function WorkPage() {
  return (
    <>
      <Suspense fallback={null}>
        <WorkFiltered />
      </Suspense>
      <CTABand
        heading="Like what you see?"
        sub="Your project could be next. Tell us what you're building and we'll map the fastest path to shipping it."
      />
    </>
  );
}

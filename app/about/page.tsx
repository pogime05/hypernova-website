import type { Metadata } from "next";
import About from "@/components/about";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About — HyperNova Technologies",
  description:
    "The independent studio behind the work — small team, direct ownership, production-grade standards.",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <CTABand />
    </>
  );
}

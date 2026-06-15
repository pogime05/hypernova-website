import type { Metadata } from "next";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About — HyperNova Technologies",
  description:
    "The studio behind the work — a boutique team building digital products with production-grade standards.",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Testimonials />
      <CTABand />
    </>
  );
}

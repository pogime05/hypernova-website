import type { Metadata } from "next";
import Services from "@/components/services";
import Process from "@/components/process";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Services — HyperNova Technologies",
  description:
    "What we build: digital cards, web apps, AI services, and mobile apps — plus how we work.",
};

export default function ServicesPage() {
  return (
    <>
      <Services />
      <Process />
      <CTABand
        heading="Ready to build?"
        sub="From digital cards to full platforms — pick a starting point and we'll scope it with you."
      />
    </>
  );
}

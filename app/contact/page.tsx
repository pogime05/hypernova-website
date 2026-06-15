import type { Metadata } from "next";
import Contact from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact — HyperNova Technologies",
  description:
    "Start a project with HyperNova Technologies. Tell us what you're building.",
};

export default function ContactPage() {
  return <Contact />;
}

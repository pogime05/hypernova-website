"use client";

import { useSearchParams } from "next/navigation";
import Work from "./work";

/**
 * Reads the ?category= query param and feeds it to the full Work section.
 * Kept in its own client component so the page can wrap *only this* in a
 * Suspense boundary (useSearchParams opts a route out of static prerender
 * otherwise).
 */
export default function WorkFiltered() {
  const category = useSearchParams().get("category");
  return <Work category={category} />;
}

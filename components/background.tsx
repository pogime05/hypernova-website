"use client";

import dynamic from "next/dynamic";

// Aurora shader lives behind a client boundary so `ssr: false` is legal and the
// shader mounts exactly once for the whole app (it sits in the root layout,
// outside the per-route transition, so it never re-initializes on navigation).
const ShaderBackground = dynamic(
  () => import("@/components/ui/animated-shader-background"),
  { ssr: false }
);

export default function Background() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    >
      <ShaderBackground />
    </div>
  );
}

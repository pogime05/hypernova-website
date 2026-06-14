import { CSSProperties } from "react";

/**
 * A single anchored radial glow. Colors are brand violet/cyan; opacity stays in
 * the 4–8% range so sections read as "light pockets" over the dark canvas
 * rather than uniform black. Purely decorative + non-interactive.
 */
export interface Glow {
  color: string;
  /** 0–1, defaults to 0.06 (≈6%). */
  opacity?: number;
  /** Blob diameter in px. */
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

/** 1px violet→transparent divider at the top edge of a section. */
export function SectionDivider() {
  return <div className="section-divider" aria-hidden="true" />;
}

export function SectionGlow({ glows }: { glows: Glow[] }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {glows.map((g, i) => {
        const size = g.size ?? 620;
        const style: CSSProperties = {
          width: size,
          height: size,
          top: g.top,
          left: g.left,
          right: g.right,
          bottom: g.bottom,
          opacity: g.opacity ?? 0.06,
          background: `radial-gradient(circle, ${g.color} 0%, transparent 70%)`,
          filter: "blur(30px)",
        };
        return <div key={i} className="absolute rounded-full" style={style} />;
      })}
    </div>
  );
}

import type { HTMLAttributes } from "react";

/**
 * Base surface for grouped content — large radius, soft shadow, generous padding.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl bg-white p-5 shadow-soft ${className}`}
      {...props}
    />
  );
}

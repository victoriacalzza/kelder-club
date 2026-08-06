import type { ReactNode } from "react";

/**
 * A friendly, tappable quick-action tile — a colored icon medallion over a label and a
 * short benefit-oriented subtitle. Each action carries a distinct tint for personality,
 * and lifts on hover so it feels interactive rather than administrative.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
export type QuickActionTint = "kelder" | "green" | "amber" | "info";

interface QuickActionProps {
  icon: ReactNode;
  label: string;
  subtitle?: string;
  tint?: QuickActionTint;
  onClick?: () => void;
}

const tintClasses: Record<QuickActionTint, string> = {
  kelder: "bg-kelder-50 text-kelder-600",
  green: "bg-success-100 text-success-600",
  amber: "bg-warning-100 text-warning-700",
  info: "bg-info-100 text-info-700",
};

export function QuickAction({ icon, label, subtitle, tint = "kelder", onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="lift flex min-h-[104px] flex-col items-start gap-3 rounded-3xl bg-white p-4 text-left shadow-soft hover:shadow-card"
    >
      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tintClasses[tint]}`}>{icon}</span>
      <span>
        <span className="block text-[15px] font-semibold text-ink-900">{label}</span>
        {subtitle && <span className="mt-0.5 block text-sm text-ink-500">{subtitle}</span>}
      </span>
    </button>
  );
}

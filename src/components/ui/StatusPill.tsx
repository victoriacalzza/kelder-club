import { Check, Clock, XCircle } from "lucide-react";
import type { ValeEstado } from "@/lib/mock-data";

/**
 * Status indicator that always pairs an icon and a label with color — never color alone,
 * so state reads correctly for colorblind users and in grayscale.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
const config: Record<ValeEstado, { label: string; icon: typeof Check; className: string }> = {
  disponible: { label: "Disponible", icon: Check, className: "bg-success-100 text-success-600" },
  en_pago: { label: "En pago", icon: Clock, className: "bg-warning-100 text-warning-600" },
  // Extravale is available money → the badge reads "Disponible" (green), like an unused voucher.
  extravale: { label: "Disponible", icon: Check, className: "bg-success-100 text-success-600" },
  vencido: { label: "Vencido", icon: XCircle, className: "bg-ink-100 text-ink-500" },
  // Utilizado = fully used/completed CrediVale → neutral, like an archived item.
  utilizado: { label: "Utilizado", icon: Check, className: "bg-ink-100 text-ink-500" },
};

export function StatusPill({ estado }: { estado: ValeEstado }) {
  const { label, icon: Icon, className } = config[estado];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${className}`}>
      <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
      {label}
    </span>
  );
}

import { ShoppingBag, Ticket, PercentCircle } from "lucide-react";
import type { Actividad, ActividadTipo } from "@/lib/mock-data";

/**
 * A single, narrative entry in the activity timeline. Each event reads like a small
 * story ("Compraste… · Ganaste $45 de cashback") rather than a table row, with a tinted
 * icon medallion and an amount badge. A brand-new benefit gets a pulsing "Nuevo" ring.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
const config: Record<ActividadTipo, { icon: typeof ShoppingBag; className: string }> = {
  compra: { icon: ShoppingBag, className: "bg-info-100 text-info-700" },
  credivale: { icon: Ticket, className: "bg-kelder-50 text-kelder-600" },
  canje: { icon: PercentCircle, className: "bg-success-100 text-success-600" },
};

export function ActivityItem({ item, last }: { item: Actividad; last?: boolean }) {
  const { icon: Icon, className } = config[item.tipo];

  return (
    <li className="relative flex gap-4">
      {!last && <span className="absolute left-[23px] top-12 h-[calc(100%-1rem)] w-px bg-ink-100" aria-hidden="true" />}
      <span
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${className} ${
          item.nuevo ? "pulse-ring" : ""
        }`}
      >
        <Icon size={20} aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 items-start justify-between gap-3 pb-6">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-medium text-ink-900">
            <span className="truncate">{item.titulo}</span>
            {item.nuevo && (
              <span className="shrink-0 rounded-full bg-kelder-50 px-2 py-0.5 text-xs font-semibold text-kelder-600">
                Nuevo
              </span>
            )}
          </p>
          <p className="mt-0.5 text-sm text-ink-500">{item.detalle}</p>
          <p className="mt-0.5 text-xs text-ink-400">{item.tiempo}</p>
        </div>
        <span className={`shrink-0 text-[15px] font-semibold ${item.positivo ? "text-success-600" : "text-ink-500"}`}>
          {item.monto}
        </span>
      </div>
    </li>
  );
}

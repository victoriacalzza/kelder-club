import { Truck, ArrowRight } from "lucide-react";
import type { Pedido } from "@/lib/mock-data";

/**
 * Block 3 — an in-progress order. Renders ONLY when an active order exists; when there is
 * none the block is absent and leaves no gap. Product image is an empty light-gray slot
 * (real photo in production). Shows status, estimated delivery and a tracking CTA.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
export function OrderInProgress({ pedido, onTrack }: { pedido: Pedido; onTrack?: () => void }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft sm:p-6">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-50">
        {pedido.imagen && (
          <img src={pedido.imagen} alt={`${pedido.marca} ${pedido.producto}`} className="h-full w-full object-contain p-1.5" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-info-100 px-2.5 py-1 text-xs font-semibold text-info-700">
          <Truck size={13} aria-hidden="true" />
          {pedido.estado}
        </span>
        <p className="mt-2 truncate font-semibold text-ink-900">
          {pedido.marca} {pedido.producto}
        </p>
        <p className="text-sm text-ink-500">{pedido.fechaEntrega}</p>
      </div>
      <button
        onClick={onTrack}
        className="lift flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-2xl border border-ink-200 px-4 text-sm font-semibold text-ink-900 hover:bg-ink-50"
      >
        Seguir pedido
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

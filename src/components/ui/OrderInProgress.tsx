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
    <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft sm:p-6">
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink-50 sm:h-20 sm:w-20">
          {pedido.imagen && (
            <img src={pedido.imagen} alt={`${pedido.marca} ${pedido.producto}`} className="h-full w-full object-contain p-1.5" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-info-100 px-2.5 py-1 text-xs font-semibold text-info-700">
            <Truck size={13} aria-hidden="true" />
            {pedido.estado}
          </span>
          <p className="mt-2 truncate text-[15px] font-semibold text-ink-900 sm:text-base">
            {pedido.marca} {pedido.producto}
          </p>
          <p className="text-sm text-ink-500">{pedido.fechaEntrega}</p>
        </div>
        {/* desktop inline CTA */}
        <button
          onClick={onTrack}
          className="lift hidden min-h-[44px] shrink-0 items-center gap-1.5 rounded-2xl border border-ink-200 px-4 text-sm font-semibold text-ink-900 hover:bg-ink-50 sm:flex"
        >
          Seguir pedido
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
      {/* mobile full-width CTA */}
      <button
        onClick={onTrack}
        className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-1.5 rounded-2xl border border-ink-200 text-[15px] font-semibold text-ink-900 hover:bg-ink-50 sm:hidden"
      >
        Seguir pedido
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

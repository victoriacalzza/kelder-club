import { MapPin, ArrowUpRight, CalendarClock, Store } from "lucide-react";
import { tiendaDePromo, type Promocion } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

/**
 * Actionable promotion card. The single most important message is that these offers are
 * PHYSICAL-STORE ONLY — so under the title every card carries a full-width, high-contrast strip
 * ("Promoción exclusiva en tienda física") that reads in under 2s while fast-scrolling. Red stays
 * reserved for the discount/CTA; the strip uses the warm `warning` accent so it pops without
 * competing. Then: store + distance, validity, and two actions (Ver productos en tienda, Cómo llegar).
 * `mostrarTienda={false}` when already inside a store context (the store is implicit).
 */
export function PromoCard({
  promo,
  onVerProductos,
  mostrarTienda = true,
}: {
  promo: Promocion;
  onVerProductos?: () => void;
  mostrarTienda?: boolean;
}) {
  const tienda = tiendaDePromo(promo);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-4 shadow-soft">
      {/* Benefit badge (red stays for the discount only) */}
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-kelder-600 px-2.5 py-1 text-xs font-bold text-white">{promo.descuentoLabel}</span>
      </div>

      <p className="mt-3 text-[15px] font-semibold text-ink-900">{promo.titulo}</p>

      {/* Physical-store-only strip — the whole point of the card, impossible to miss */}
      <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-warning-100 px-3 py-2 text-warning-700">
        <Store size={16} className="shrink-0" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wide">Promoción exclusiva en tienda física</span>
      </div>

      {/* Store + distance */}
      {mostrarTienda && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink-600">
          <MapPin size={14} className="text-kelder-600" aria-hidden="true" />
          Disponible en {tienda.nombre} · {tienda.distancia}
        </p>
      )}

      {/* Validity */}
      <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-ink-500">
        <CalendarClock size={14} aria-hidden="true" />
        {promo.vigencia}
      </p>

      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={() => {
            track("promotion_product_click", { promo: promo.id });
            onVerProductos?.();
          }}
          className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600"
        >
          Ver productos en tienda
        </button>
        <button
          onClick={() => track("directions_click", { tienda: tienda.id, promo: promo.id })}
          className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900"
        >
          Cómo llegar
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

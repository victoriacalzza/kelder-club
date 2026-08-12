import { MapPin, ArrowUpRight, CalendarClock } from "lucide-react";
import { tiendaDePromo, type Promocion } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

/**
 * Actionable promotion card — Promociones must generate visit/purchase intent, not be a wall of
 * banners. Shows the discount, the store + distance, validity, an in-store label, and two clear
 * actions (Ver productos → catalog of the promo, Cómo llegar). Promociones ≠ Beneficios.
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
  const exclusivo = promo.label === "Exclusivo en tienda";

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-4 shadow-soft">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-kelder-600 px-2.5 py-1 text-xs font-bold text-white">{promo.descuentoLabel}</span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            exclusivo ? "bg-kelder-50 text-kelder-700" : "bg-ink-100 text-ink-600"
          }`}
        >
          {promo.label}
        </span>
      </div>

      <p className="mt-3 text-[15px] font-semibold text-ink-900">{promo.titulo}</p>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
        {mostrarTienda && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} className="text-kelder-600" aria-hidden="true" />
            {tienda.nombre} · {tienda.distancia}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <CalendarClock size={14} aria-hidden="true" />
          {promo.vigencia}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={() => {
            track("promotion_product_click", { promo: promo.id });
            onVerProductos?.();
          }}
          className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600"
        >
          Ver productos
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

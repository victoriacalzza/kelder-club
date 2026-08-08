import { MapPin } from "lucide-react";
import type { Producto } from "@/lib/mock-data";
import { formatMXN, cashbackDe, precioConCashback } from "@/lib/mock-data";

/**
 * Product card — Nike-style. Photo on a very light surface (≈65% of card height), then
 * brand (small gray), name (black medium), price (primary) and the cashback the purchase
 * generates (small red). Used both in Home "Recomendados" and in the product-search grid.
 * Optional props layer on the search-grid extras without changing the Home usage:
 *   · poderCompraCashback → adds a discreet "Con tu cashback pagarías $X" line (never rivals price)
 *   · disponibilidad → adds a discreet "Disponible en N tiendas"
 *   · onClick → opens the product detail
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
interface ProductCardProps {
  producto: Producto;
  onClick?: () => void;
  poderCompraCashback?: number; // available cashback → shows purchasing power
  mostrarDisponibilidad?: boolean; // opt-in (search grid); keeps Home cards unchanged
}

export function ProductCard({ producto, onClick, poderCompraCashback, mostrarDisponibilidad }: ProductCardProps) {
  const cashback = cashbackDe(producto.precio);
  const conCashback = poderCompraCashback ? precioConCashback(producto.precio, poderCompraCashback) : null;

  return (
    <button
      onClick={onClick}
      className="lift group flex h-full min-h-[320px] w-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white text-left shadow-soft hover:shadow-card"
    >
      <div className="h-[62%] w-full shrink-0 overflow-hidden bg-ink-50">
        {producto.imagen && (
          <img
            src={producto.imagen}
            alt={`${producto.marca} ${producto.modelo}`}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center p-4">
        <p className="text-xs text-ink-400">{producto.marca}</p>
        <p className="truncate text-[15px] font-medium text-ink-900">{producto.modelo}</p>
        <p className="mt-1 text-[15px] font-semibold text-ink-900">{formatMXN(producto.precio)}</p>
        <p className="mt-0.5 text-xs font-semibold text-kelder-600">Generas {formatMXN(cashback)} de cashback</p>
        {conCashback !== null && (
          <p className="mt-1 text-xs text-ink-500">Con tu cashback pagarías {formatMXN(conCashback)}</p>
        )}
        {mostrarDisponibilidad && producto.tiendas !== undefined && (
          <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-ink-500">
            <MapPin size={12} aria-hidden="true" />
            Disponible en {producto.tiendas} tiendas
          </p>
        )}
      </div>
    </button>
  );
}

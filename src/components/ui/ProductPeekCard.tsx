import { Heart, MapPin, Bell, Truck } from "lucide-react";
import type { Producto, DispContexto } from "@/lib/mock-data";
import { formatMXN, precioConCashback } from "@/lib/mock-data";
import { useClub } from "@/lib/ClubContext";
import { track } from "@/lib/analytics";

/**
 * Compact, image-forward product card for horizontal carousels and favorites/visit lists.
 * Priority: image → product → price → availability. Carries a ♡ save toggle. Intentionally
 * lighter than the design-system `ProductCard` (which stays the grid/search primitive) so the
 * store-context modules feel editorial, not like a dense catalog grid. No "Comprar" — the
 * commercial intent is availability + visit.
 */
interface ProductPeekCardProps {
  producto: Producto;
  onClick?: () => void;
  contexto?: DispContexto; // single most-relevant availability signal (preferred)
  disponibilidadLabel?: string; // legacy fallback label
  disponibilidadTono?: "ok" | "low" | "muted";
  poderCompraCashback?: number; // available cashback → shows "Con tu cashback pagarías $X"
}

const tonoClass = { ok: "text-success-700", low: "text-warning-600", muted: "text-ink-500" } as const;
// One contextual availability line — colour + icon per tono; physical availability reads positive.
const ctxStyle: Record<DispContexto["tono"], { cls: string; Icon: typeof MapPin }> = {
  aqui: { cls: "text-success-700", Icon: MapPin },
  cerca: { cls: "text-ink-600", Icon: MapPin },
  avisar: { cls: "text-warning-600", Icon: Bell },
  envio: { cls: "text-ink-500", Icon: Truck },
};

export function ProductPeekCard({ producto, onClick, contexto, disponibilidadLabel, disponibilidadTono = "ok", poderCompraCashback }: ProductPeekCardProps) {
  const { esFavorito, toggleFavorito } = useClub();
  const guardado = esFavorito(producto.id);
  const conCashback = poderCompraCashback ? precioConCashback(producto.precio, poderCompraCashback) : null;
  const ctx = contexto ? ctxStyle[contexto.tono] : null;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className="lift group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white text-left shadow-soft hover:shadow-card"
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-ink-50">
        {producto.imagen && (
          <img
            src={producto.imagen}
            alt={`${producto.marca} ${producto.modelo}`}
            className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorito(producto.id);
            if (!guardado) track("product_favorite", { producto: producto.id });
          }}
          aria-label={guardado ? "Quitar de favoritos" : "Guardar"}
          aria-pressed={guardado}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow-soft backdrop-blur transition-colors hover:text-kelder-600"
        >
          <Heart size={17} className={guardado ? "fill-kelder-600 text-kelder-600" : ""} aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-xs text-ink-400">{producto.marca}</p>
        <p className="truncate text-[14px] font-medium text-ink-900">{producto.modelo}</p>
        <p className="mt-0.5 text-[15px] font-semibold text-ink-900">{formatMXN(producto.precio)}</p>
        {conCashback !== null && (
          <p className="mt-0.5 text-xs font-medium text-kelder-600">
            {conCashback === 0 ? "✓ Te alcanza con tu cashback" : `Con tu cashback pagarías ${formatMXN(conCashback)}`}
          </p>
        )}
        {/* ONE contextual availability signal (preferred: contexto; else legacy label) */}
        {ctx && contexto ? (
          <p className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${ctx.cls}`}>
            <ctx.Icon size={12} aria-hidden="true" />
            {contexto.mensaje}
          </p>
        ) : (
          disponibilidadLabel && (
            <p className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${tonoClass[disponibilidadTono]}`}>
              {disponibilidadTono !== "muted" && <span className={`h-1.5 w-1.5 rounded-full ${disponibilidadTono === "low" ? "bg-warning-600" : "bg-success-600"}`} aria-hidden="true" />}
              {disponibilidadLabel}
            </p>
          )
        )}
      </div>
    </div>
  );
}

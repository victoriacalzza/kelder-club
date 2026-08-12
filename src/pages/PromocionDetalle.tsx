import { useParams, useNavigate } from "react-router-dom";
import { MapPin, ArrowUpRight, CalendarClock } from "lucide-react";
import { BackButton } from "@/components/layout/BackButton";
import { ProductPeekCard } from "@/components/ui/ProductPeekCard";
import { promoPorId, productosDePromo, tiendaDePromo } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

/**
 * Promotion detail — closes the PROMOCIÓN → PRODUCTO → TIENDA → VISITA chain: the offer, its
 * store and validity, then the concrete products it covers, each opening its availability.
 */
export function PromocionDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const promo = promoPorId(id);

  if (!promo) {
    return (
      <div>
        <BackButton />
        <p className="mt-8 text-center text-sm text-ink-500">Esta promoción ya no está disponible.</p>
      </div>
    );
  }

  const tienda = tiendaDePromo(promo);
  const productos = productosDePromo(promo);
  const exclusivo = promo.label === "Exclusivo en tienda";

  return (
    <div>
      <BackButton />

      {/* offer header */}
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-kelder-600 px-3 py-1 text-sm font-bold text-white">{promo.descuentoLabel}</span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${exclusivo ? "bg-kelder-50 text-kelder-700" : "bg-ink-100 text-ink-600"}`}>
          {promo.label}
        </span>
      </div>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900">{promo.titulo}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={14} className="text-kelder-600" aria-hidden="true" />
          {tienda.nombre} · {tienda.distancia}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarClock size={14} aria-hidden="true" />
          Vigencia: {promo.vigencia}
        </span>
      </div>

      <div className="mt-4 flex gap-2.5">
        <button
          onClick={() => {
            track("store_view", { tienda: tienda.id, promo: promo.id });
            navigate(`/tienda/${tienda.id}`);
          }}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-kelder-600 px-5 text-sm font-semibold text-white"
        >
          Ver tienda
        </button>
        <button
          onClick={() => track("directions_click", { tienda: tienda.id, promo: promo.id })}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-ink-200 px-5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
        >
          Cómo llegar
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-ink-400">Productos en esta promoción</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {productos.map((p) => (
          <ProductPeekCard
            key={p.id}
            producto={p}
            onClick={() => {
              track("promotion_product_click", { promo: promo.id, producto: p.id });
              navigate(`/producto/${p.id}`);
            }}
            disponibilidadLabel="Disponible en esta tienda"
          />
        ))}
      </div>
    </div>
  );
}

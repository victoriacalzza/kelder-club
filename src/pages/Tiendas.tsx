import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowUpRight, ArrowRight, ChevronRight, Repeat, Package, Tag } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { StoreSelectorSheet } from "@/components/layout/StoreSelectorSheet";
import { sucursales, tiendaCercana, comercialDeTienda, logoDeUnidad } from "@/lib/mock-data";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import { track } from "@/lib/analytics";

// "9:00 – 21:00" → "9:00 PM"
function cierre12h(horario: string): string | null {
  const end = horario.split("–").pop()?.trim();
  const m = end?.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = Number(m[1]);
  return `${h % 12 === 0 ? 12 : h % 12}:${m[2]} ${h >= 12 ? "PM" : "AM"}`;
}

/**
 * Tiendas — a tool to visit and explore stores, not a map. The selected store ("Mi tienda") is
 * already permanent context in the header, so here it's a COMPACT block (no giant storefront
 * photo): status + distance + actions, then in-store search and quick access to products/promos.
 * Below, "Tiendas cerca de ti" is a lean list of the other branches by distance.
 */
export function Tiendas() {
  const navigate = useNavigate();
  const { tienda: miTienda } = useTiendaContexto();
  const seleccionada = miTienda ?? tiendaCercana;
  const [cambiar, setCambiar] = useState(false);

  const { promociones: nPromos, novedades: nNovedades } = comercialDeTienda(seleccionada.id);
  const cierre = cierre12h(seleccionada.horario);
  const otras = sucursales.filter((t) => t.id !== seleccionada.id).sort((a, b) => a.distanciaKm - b.distanciaKm);

  return (
    <div>
      <TopBar title="Tiendas" />

      {/* MI TIENDA — premium visual card: panoramic storefront photo makes the physical store
          desirable to visit; the info below gives the practical reasons. Not too tall. */}
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Mi tienda</p>
      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
        <div className="h-36 w-full overflow-hidden sm:h-44">
          {seleccionada.imagen ? (
            <img src={seleccionada.imagen} alt={`Tienda ${seleccionada.nombre}`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-ink-950 px-8" aria-hidden="true">
              <img src={logoDeUnidad(seleccionada.unidad)} alt="" className="max-h-9 w-auto max-w-[60%] object-contain" style={{ filter: "brightness(0) invert(1)" }} />
            </div>
          )}
        </div>
        <div className="p-5">
          <p className="text-lg font-semibold text-ink-900">{seleccionada.nombre}</p>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${seleccionada.abierta ? "bg-success-600" : "bg-ink-300"}`} aria-hidden="true" />
              <span className={seleccionada.abierta ? "font-medium text-success-700" : "font-medium text-ink-500"}>
                {seleccionada.abierta ? "Abierta" : "Cerrada"}
              </span>
            </span>
            {cierre && <span className="text-ink-500">· hasta {cierre}</span>}
            <span className="text-ink-400" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-ink-500">
              <MapPin size={14} aria-hidden="true" />
              {seleccionada.distancia}
            </span>
          </p>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              onClick={() => track("directions_click", { tienda: seleccionada.id })}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-kelder-600 px-5 text-sm font-semibold text-white"
            >
              Cómo llegar
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
            <button
              onClick={() => setCambiar(true)}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-ink-200 px-5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
            >
              <Repeat size={15} aria-hidden="true" />
              Cambiar tienda
            </button>
          </div>
        </div>
      </div>

      {/* Search in this store */}
      <p className="mb-2 mt-6 text-sm font-medium text-ink-900">Buscar en esta tienda</p>
      <button
        onClick={() => navigate("/buscar")}
        className="flex w-full items-center gap-2 rounded-2xl border border-ink-200 bg-white px-4 py-3 text-left text-sm text-ink-500"
      >
        <Search size={18} aria-hidden="true" />
        Buscar productos...
      </button>

      {/* Quick access — full-width rows, one under the other. Products leads (slightly higher
          hierarchy): showing what's physically in the store is a core Kelder Club goal. */}
      <div className="mt-3 flex flex-col gap-3">
        <button
          onClick={() => navigate(`/tienda/${seleccionada.id}`)}
          className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white px-5 py-4 text-left shadow-soft transition-shadow hover:shadow-card"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-info-100 text-info-700" aria-hidden="true">
            <Package size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[16px] font-semibold text-ink-900">Productos disponibles</span>
            <span className="block text-sm text-ink-500">{nNovedades} novedades en esta tienda</span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-ink-400" aria-hidden="true" />
        </button>
        <button
          onClick={() => navigate("/promociones")}
          className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white px-5 py-3.5 text-left shadow-soft transition-shadow hover:shadow-card"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-kelder-50 text-kelder-600" aria-hidden="true">
            <Tag size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold text-ink-900">Promociones</span>
            <span className="block text-sm text-ink-500">{nPromos} promociones activas</span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-ink-400" aria-hidden="true" />
        </button>
      </div>

      {/* Otras tiendas cerca de ti — lean list */}
      <p className="mb-2 mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Otras tiendas cerca de ti</p>
      <div className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        {otras.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              track("store_view", { tienda: t.id, origen: "tiendas" });
              navigate(`/tienda/${t.id}`);
            }}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-ink-50"
          >
            <MapPin size={18} className="shrink-0 text-ink-400" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-medium text-ink-900">{t.nombre}</span>
              <span className="block text-sm text-ink-500">
                {t.distancia} ·{" "}
                <span className={t.abierta ? "font-medium text-success-700" : "text-ink-500"}>{t.abierta ? "Abierta" : "Cerrada"}</span>
              </span>
            </span>
            <ChevronRight size={18} className="shrink-0 text-ink-400" aria-hidden="true" />
          </button>
        ))}
      </div>

      <button
        onClick={() => setCambiar(true)}
        className="mx-auto mt-4 flex min-h-[44px] items-center justify-center text-sm font-semibold text-kelder-600"
      >
        Ver todas las tiendas
      </button>

      <StoreSelectorSheet open={cambiar} onClose={() => setCambiar(false)} />
    </div>
  );
}

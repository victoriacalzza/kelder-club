import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowUpRight, ArrowRight, ChevronRight, Repeat, Package, Tag } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { StoreSelectorSheet } from "@/components/layout/StoreSelectorSheet";
import { sucursales, tiendaCercana, comercialDeTienda } from "@/lib/mock-data";
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

      {/* MI TIENDA — compact, no photo (identity already lives in the header) */}
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Mi tienda</p>
      <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
        <p className="flex items-start gap-2 text-lg font-semibold text-ink-900">
          <MapPin size={20} className="mt-0.5 shrink-0 text-kelder-600" aria-hidden="true" />
          {seleccionada.nombre}
        </p>
        <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm">
          <span className={`h-2 w-2 rounded-full ${seleccionada.abierta ? "bg-success-600" : "bg-ink-300"}`} aria-hidden="true" />
          <span className={seleccionada.abierta ? "font-medium text-success-700" : "font-medium text-ink-500"}>
            {seleccionada.abierta ? "Abierta" : "Cerrada"}
          </span>
          {cierre && <span className="text-ink-500">· hasta {cierre}</span>}
        </p>
        <p className="mt-0.5 text-sm text-ink-500">{seleccionada.distancia}</p>

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

      {/* Search in this store */}
      <p className="mb-2 mt-6 text-sm font-medium text-ink-900">Buscar en esta tienda</p>
      <button
        onClick={() => navigate("/buscar")}
        className="flex w-full items-center gap-2 rounded-2xl border border-ink-200 bg-white px-4 py-3 text-left text-sm text-ink-500"
      >
        <Search size={18} aria-hidden="true" />
        Buscar productos...
      </button>

      {/* Quick access — products & promotions of this store */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate(`/tienda/${seleccionada.id}`)}
          className="flex items-center gap-2.5 rounded-2xl border border-ink-100 bg-white px-4 py-3 text-left shadow-soft"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-info-100 text-info-700" aria-hidden="true">
            <Package size={17} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-ink-900">Productos disponibles</span>
            <span className="block text-xs text-ink-500">{nNovedades} novedades</span>
          </span>
          <ArrowRight size={15} className="shrink-0 text-ink-400" aria-hidden="true" />
        </button>
        <button
          onClick={() => navigate("/promociones")}
          className="flex items-center gap-2.5 rounded-2xl border border-ink-100 bg-white px-4 py-3 text-left shadow-soft"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-kelder-50 text-kelder-600" aria-hidden="true">
            <Tag size={17} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-ink-900">Promociones</span>
            <span className="block text-xs text-ink-500">{nPromos} activas</span>
          </span>
          <ArrowRight size={15} className="shrink-0 text-ink-400" aria-hidden="true" />
        </button>
      </div>

      {/* Otras tiendas cerca de ti — lean list */}
      <p className="mb-2 mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Tiendas cerca de ti</p>
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

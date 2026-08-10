import { useState } from "react";
import { Search, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { StorePreview } from "@/components/ui/StorePreview";
import { sucursales, tiendaCercana, unidadesNegocio, logoDeUnidad, type UnidadNegocio, type Tienda } from "@/lib/mock-data";

export function Tiendas() {
  const [query, setQuery] = useState("");
  const [unidad, setUnidad] = useState<UnidadNegocio | "todas">("todas");

  const ql = query.trim().toLowerCase();
  const filtradas = sucursales
    .filter((t) => unidad === "todas" || t.unidad === unidad)
    .filter((t) => ql === "" || `${t.nombre} ${t.ciudad} ${t.unidad}`.toLowerCase().includes(ql))
    .sort((a, b) => a.distanciaKm - b.distanciaKm);

  const cercana = filtradas[0] ?? tiendaCercana;
  const otras = filtradas.filter((t) => t.id !== cercana.id);

  return (
    <div>
      <TopBar title="Encuentra una tienda" subtitle="Tiendas de todo el Grupo Calzzapato." />

      {/* search */}
      <label className="relative block">
        <span className="sr-only">Buscar tienda</span>
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por ciudad, plaza o tienda..."
          className="h-12 w-full rounded-2xl border border-ink-200 bg-white pl-11 pr-4 text-base"
        />
      </label>

      {/* business-unit filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <FiltroChip label="Todas" activo={unidad === "todas"} onClick={() => setUnidad("todas")} />
        {unidadesNegocio.map((u) => (
          <FiltroChip key={u.nombre} label={u.nombre} activo={unidad === u.nombre} onClick={() => setUnidad(u.nombre)} />
        ))}
      </div>

      {/* nearest */}
      <div className="mt-6">
        <StorePreview tienda={cercana} />
      </div>

      {/* other branches, by proximity */}
      {otras.length > 0 && (
        <>
          <h2 className="mb-3 mt-8 text-sm font-medium text-ink-500">Más sucursales</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {otras.map((t) => (
              <SucursalCard key={t.id} tienda={t} />
            ))}
          </div>
        </>
      )}

      {filtradas.length === 0 && (
        <p className="mt-8 text-center text-sm text-ink-500">
          No encontramos sucursales para «{query}». Prueba con otra ciudad o unidad de negocio.
        </p>
      )}
    </div>
  );
}

function FiltroChip({ label, activo, onClick }: { label: string; activo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[40px] rounded-full border px-4 text-sm font-medium transition-colors ${
        activo ? "border-kelder-600 bg-kelder-600 text-white" : "border-ink-200 text-ink-700 hover:bg-ink-50"
      }`}
    >
      {label}
    </button>
  );
}

function SucursalCard({ tienda }: { tienda: Tienda }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      {/* brand image — real photo if present, else this unit's own logo (never a mismatched brand) */}
      <div className="h-28 w-full overflow-hidden">
        {tienda.imagen ? (
          <img src={tienda.imagen} alt={`Tienda ${tienda.nombre}`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink-950 px-6" aria-hidden="true">
            <img src={logoDeUnidad(tienda.unidad)} alt="" className="max-h-8 w-auto max-w-[60%] object-contain" style={{ filter: "brightness(0) invert(1)" }} />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{tienda.unidad}</p>
            <p className="mt-0.5 truncate font-semibold text-ink-900">{tienda.nombre}</p>
          </div>
          <MapPin size={18} className="shrink-0 text-kelder-600" aria-hidden="true" />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} aria-hidden="true" />
            <span className={tienda.abierta ? "font-medium text-success-700" : "font-medium text-ink-500"}>
              {tienda.abierta ? "Abierta" : "Cerrada"}
            </span>
            · {tienda.horario}
          </span>
          <span>A {tienda.distancia}</span>
        </div>
        <button className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600">
          Cómo llegar
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

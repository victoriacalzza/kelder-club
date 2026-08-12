import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import type { Tienda } from "@/lib/mock-data";
import { logoDeUnidad } from "@/lib/mock-data";

/**
 * "Tu tienda más cercana" — connects the digital club to the physical ecosystem.
 * Shows the nearest store, whether it's open, hours and distance, with a way to get
 * directions. The left panel is an art-directed image slot for a real storefront photo.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
export function StorePreview({
  tienda,
  onDirections,
  onVerTodas,
  onExplorar,
}: {
  tienda: Tienda;
  onDirections?: () => void;
  onVerTodas?: () => void;
  onExplorar?: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <div className="flex flex-col md:min-h-[240px] md:flex-row">
        {/* storefront image — real photo when it matches the unit, else the unit's own logo */}
        <div className="h-48 w-full overflow-hidden md:h-auto md:w-2/5 md:shrink-0">
          {tienda.imagen ? (
            <img src={tienda.imagen} alt={`Tienda ${tienda.nombre}`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-ink-950 p-8" aria-hidden="true">
              <img src={logoDeUnidad(tienda.unidad)} alt="" className="max-h-10 w-auto max-w-[70%] object-contain" style={{ filter: "brightness(0) invert(1)" }} />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-center gap-2 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Tu tienda más cercana · {tienda.unidad}</p>
              <p className="mt-0.5 text-lg font-semibold text-ink-900">{tienda.nombre}</p>
            </div>
            <MapPin size={20} className="shrink-0 text-kelder-600" aria-hidden="true" />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              <span className={tienda.abierta ? "font-medium text-success-700" : "font-medium text-ink-500"}>
                {tienda.abierta ? "Abierta" : "Cerrada"}
              </span>
              · {tienda.horario}
            </span>
            <span>A {tienda.distancia}</span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            {onExplorar && (
              <button onClick={onExplorar} className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600">
                Explorar esta tienda
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            )}
            <button onClick={onDirections} className={`inline-flex min-h-[44px] items-center gap-1 text-sm ${onExplorar ? "font-medium text-ink-500 hover:text-ink-900" : "font-semibold text-kelder-600"}`}>
              Cómo llegar
              {!onExplorar && <ArrowUpRight size={15} aria-hidden="true" />}
            </button>
            <button onClick={onVerTodas} className="inline-flex min-h-[44px] items-center text-sm font-medium text-ink-500 hover:text-ink-900">
              Ver todas las sucursales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

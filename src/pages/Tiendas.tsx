import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { StorePreview } from "@/components/ui/StorePreview";
import { sucursales, tiendaCercana } from "@/lib/mock-data";

export function Tiendas() {
  const otras = sucursales.filter((s) => s.id !== tiendaCercana.id);

  return (
    <div>
      <TopBar title="Tiendas" subtitle="Encuentra tu tienda del grupo y vive la experiencia Kelder Club." />

      <StorePreview tienda={tiendaCercana} />

      <h2 className="mb-3 mt-8 text-sm font-medium text-ink-500">Todas las sucursales</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {otras.map((t) => (
          <div key={t.id} className="lift rounded-3xl bg-white p-5 shadow-soft hover:shadow-card">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-ink-900">{t.nombre}</p>
              <MapPin size={20} className="shrink-0 text-kelder-600" aria-hidden="true" />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                <span className={t.abierta ? "font-medium text-success-700" : "font-medium text-ink-500"}>
                  {t.abierta ? "Abierta" : "Cerrada"}
                </span>
                · {t.horario}
              </span>
              <span>A {t.distancia}</span>
            </div>
            <button className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600">
              Cómo llegar
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

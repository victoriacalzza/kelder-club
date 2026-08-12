import { useNavigate } from "react-router-dom";
import { MapPin, ArrowUpRight, X, Store } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { catalogo, sucursales, disponibilidadDeProducto, formatMXN, type Tienda } from "@/lib/mock-data";
import { useClub } from "@/lib/ClubContext";
import { track } from "@/lib/analytics";

/**
 * Mi lista para visitar — helps the member PLAN a store visit around several products. It does
 * NOT reserve or hold anything (no "apartado"): it just finds the nearest store(s) where the
 * chosen products are available. A conceptual bridge toward a future Click & Collect.
 */
export function MiVisita() {
  const navigate = useNavigate();
  const { visita, toggleVisita } = useClub();
  const productos = catalogo.filter((p) => visita.includes(p.id));

  // Nearest store that stocks the MOST of the selected products (whole-list first, else best coverage).
  const mejorTienda: { tienda: Tienda; cubre: number } | null = productos.length
    ? [...sucursales]
        .sort((a, b) => a.distanciaKm - b.distanciaKm)
        .map((tienda) => ({
          tienda,
          cubre: productos.filter((p) => disponibilidadDeProducto(p).some((d) => d.tienda.id === tienda.id)).length,
        }))
        .sort((a, b) => b.cubre - a.cubre)[0] ?? null
    : null;

  return (
    <div>
      <BackButton />
      <TopBar title="Mi lista para visitar" subtitle="Planea tu visita: reúne lo que quieres ver físicamente y te decimos dónde encontrarlo." />

      {productos.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-white p-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-kelder-50 text-kelder-600" aria-hidden="true">
            <Store size={26} />
          </span>
          <p className="font-medium text-ink-900">Tu lista está vacía</p>
          <p className="max-w-sm text-sm text-ink-500">Agrega productos con «Agregar a mi lista para visitar» para planear tu próxima visita a tienda.</p>
          <button onClick={() => navigate("/catalogo")} className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-kelder-600 px-5 text-sm font-semibold text-white">
            Explorar catálogo
          </button>
        </div>
      ) : (
        <>
          {/* where to find them */}
          {mejorTienda && mejorTienda.cubre > 0 && (
            <div className="mb-5 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
              <p className="text-sm text-ink-600">
                {mejorTienda.cubre === productos.length
                  ? `Los ${productos.length} productos están disponibles en:`
                  : `${mejorTienda.cubre} de ${productos.length} productos están disponibles en:`}
              </p>
              <p className="mt-1 text-lg font-semibold text-ink-900">{mejorTienda.tienda.nombre}</p>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-ink-500">
                <MapPin size={14} className="text-kelder-600" aria-hidden="true" />A {mejorTienda.tienda.distancia}
              </p>
              <div className="mt-3 flex gap-2.5">
                <button
                  onClick={() => {
                    track("store_view", { tienda: mejorTienda.tienda.id, origen: "visita" });
                    navigate(`/tienda/${mejorTienda.tienda.id}`);
                  }}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-kelder-600 px-5 text-sm font-semibold text-white"
                >
                  Ver tienda
                </button>
                <button
                  onClick={() => track("directions_click", { tienda: mejorTienda.tienda.id, origen: "visita" })}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-ink-200 px-5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
                >
                  Cómo llegar
                  <ArrowUpRight size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* products in the list */}
          <div className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
            {productos.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3">
                <button onClick={() => navigate(`/producto/${p.id}`)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                  <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink-50">
                    {p.imagen && <img src={p.imagen} alt="" className="h-full w-full object-contain p-1.5" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-ink-400">{p.marca}</span>
                    <span className="block truncate text-[15px] font-medium text-ink-900">{p.modelo}</span>
                    <span className="block text-sm font-semibold text-ink-900">{formatMXN(p.precio)}</span>
                  </span>
                </button>
                <button
                  onClick={() => toggleVisita(p.id)}
                  aria-label={`Quitar ${p.modelo} de mi lista`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-ink-50 hover:text-ink-900"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-400">Esta lista solo te ayuda a planear tu visita. No aparta ni reserva productos.</p>
        </>
      )}
    </div>
  );
}

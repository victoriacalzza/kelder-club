import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Store } from "lucide-react";
import { ProductPeekCard } from "@/components/ui/ProductPeekCard";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import { inventarioDeTienda, comercialDeTienda, availabilityForStore, type Producto } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

/**
 * Home's "Disponible en tu tienda" module. The store is the CONTEXT (it lives permanently in the
 * header) and the products are the CONTENT — so this section shows NO store name/hours/distance,
 * only a count + chips + the product carousel. Each product tags availability relative to the
 * selected store. Connects DISCOVERY → PRODUCTO → TIENDA → VISITA FÍSICA.
 */
type Chip = { key: string; label: string; test: (p: Producto) => boolean };
const chips: Chip[] = [
  { key: "todos", label: "Para ti", test: () => true },
  { key: "mujer", label: "Mujer", test: (p) => p.departamento === "Mujer" },
  { key: "hombre", label: "Hombre", test: (p) => p.departamento === "Hombre" },
  { key: "tenis", label: "Tenis", test: (p) => p.tipo === "Calzado" },
  { key: "ropa", label: "Ropa", test: (p) => p.tipo === "Ropa" },
];

export function StoreContextModule() {
  const navigate = useNavigate();
  const { tienda, origen } = useTiendaContexto();
  const [chip, setChip] = useState("todos");

  // No store context → invite to choose one.
  if (!tienda || origen === "ninguna") {
    return (
      <section aria-label="Encuentra productos cerca de ti">
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-kelder-50 text-kelder-600" aria-hidden="true">
            <Store size={20} />
          </span>
          <div>
            <p className="text-[17px] font-semibold text-ink-900">Encuentra productos cerca de ti</p>
            <p className="mt-0.5 text-sm text-ink-500">Selecciona una tienda para descubrir qué puedes encontrar.</p>
          </div>
          <button onClick={() => navigate("/tiendas")} className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-kelder-600 px-5 text-sm font-semibold text-white">
            Elegir tienda
          </button>
        </div>
      </section>
    );
  }

  const { novedades } = comercialDeTienda(tienda.id);
  const inventario = inventarioDeTienda(tienda.id);
  const activo = chips.find((c) => c.key === chip)!;
  const productos = inventario.filter(activo.test).slice(0, 8);

  return (
    <section aria-label="Disponible en tu tienda">
      {/* Store is the context (header); products are the content — so no store name/hours/distance here */}
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink-900">Disponible en tu tienda</h2>
        <button
          onClick={() => {
            track("store_view", { tienda: tienda.id, origen: "store_context" });
            navigate(`/tienda/${tienda.id}`);
          }}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-kelder-600"
        >
          Ver todo
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
      <p className="mt-0.5 text-sm text-ink-500">{novedades} novedades</p>

      {/* compact chips */}
      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {chips.map((c) => (
          <button
            key={c.key}
            onClick={() => setChip(c.key)}
            className={`min-h-[34px] shrink-0 rounded-full border px-3.5 text-sm font-medium transition-colors ${
              chip === c.key ? "border-kelder-600 bg-kelder-600 text-white" : "border-ink-200 text-ink-600 hover:bg-ink-50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* horizontal product carousel */}
      <div className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {productos.map((p) => {
          const low = availabilityForStore(p, tienda.id) === "low_stock";
          return (
            <div key={p.id} className="w-[42%] min-w-[150px] max-w-[190px] shrink-0 snap-start sm:w-[30%] lg:w-[19%]">
              <ProductPeekCard
                producto={p}
                onClick={() => {
                  track("product_view", { producto: p.id, origen: "store_context" });
                  navigate(`/producto/${p.id}`);
                }}
                disponibilidadLabel={low ? "Últimas piezas" : "Disponible aquí"}
                disponibilidadTono={low ? "low" : "ok"}
              />
            </div>
          );
        })}
        {productos.length === 0 && (
          <p className="py-6 text-sm text-ink-500">No hay productos de esta categoría en tu tienda por ahora.</p>
        )}
      </div>
    </section>
  );
}

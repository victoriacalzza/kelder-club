import { useNavigate } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import { ProductPeekCard } from "@/components/ui/ProductPeekCard";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import { catalogoExtendidoDeTienda } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

/**
 * Home "Catálogo extendido" — editorial teaser for products that aren't physically in the selected
 * store but can be requested there. Prepares the future "pide y recoge en tienda" model WITHOUT a
 * checkout: today it only leads to discovery. Visually distinct from in-store availability.
 */
export function ExtendedCatalogTeaser() {
  const navigate = useNavigate();
  const { tienda } = useTiendaContexto();
  const productos = catalogoExtendidoDeTienda(tienda?.id ?? "t1").slice(0, 6);

  return (
    <section aria-label="Catálogo extendido">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
            <Package size={14} aria-hidden="true" />
            Catálogo extendido
          </p>
          <h2 className="mt-1 text-lg font-semibold text-ink-900">Descubre más de lo que hay en tienda</h2>
          <p className="mt-0.5 text-sm text-ink-500">
            Productos que puedes solicitar {tienda ? `en ${tienda.nombre}` : "en tu tienda"}.
          </p>
        </div>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {productos.map((p) => (
          <div key={p.id} className="w-[42%] min-w-[150px] max-w-[190px] shrink-0 snap-start sm:w-[30%] lg:w-[19%]">
            <ProductPeekCard
              producto={p}
              onClick={() => {
                track("product_view", { producto: p.id, origen: "extended_catalog" });
                navigate(`/producto/${p.id}`);
              }}
              disponibilidadLabel="Catálogo extendido"
              disponibilidadTono="muted"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/catalogo?modo=extendido")}
        className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600"
      >
        Explorar catálogo extendido
        <ArrowRight size={15} aria-hidden="true" />
      </button>
    </section>
  );
}

import { useNavigate } from "react-router-dom";
import { Heart, ListChecks, ArrowRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { ProductPeekCard } from "@/components/ui/ProductPeekCard";
import { catalogo, disponibilidadDeProducto } from "@/lib/mock-data";
import { useClub } from "@/lib/ClubContext";
import { track } from "@/lib/analytics";

/**
 * Mis favoritos — saved products the member can later find in a store. A bridge to the physical
 * visit, not a cart. Also surfaces the "Mi lista para visitar" entry when it has items.
 */
export function Favoritos() {
  const navigate = useNavigate();
  const { favoritos, visita } = useClub();
  const guardados = catalogo.filter((p) => favoritos.includes(p.id));

  return (
    <div>
      <BackButton to="/club" label="Mi Club" />
      <TopBar title="Mis favoritos" subtitle="Los productos que guardaste, listos para encontrarlos en tienda." />

      {/* Mi lista para visitar — entry */}
      {visita.length > 0 && (
        <button
          onClick={() => {
            track("visit_list_view", { total: visita.length });
            navigate("/mi-visita");
          }}
          className="mb-5 flex w-full items-center gap-3 rounded-2xl border border-ink-100 bg-white px-4 py-3.5 text-left shadow-soft"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-kelder-50 text-kelder-600" aria-hidden="true">
            <ListChecks size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-medium text-ink-900">Mi lista para visitar</p>
            <p className="text-sm text-ink-500">{visita.length} {visita.length === 1 ? "producto" : "productos"} para ver en tienda</p>
          </div>
          <ArrowRight size={18} className="shrink-0 text-ink-400" aria-hidden="true" />
        </button>
      )}

      {guardados.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-white p-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-kelder-50 text-kelder-600" aria-hidden="true">
            <Heart size={26} />
          </span>
          <p className="font-medium text-ink-900">Aún no guardas productos</p>
          <p className="max-w-sm text-sm text-ink-500">Toca ♡ en cualquier producto para guardarlo aquí y encontrarlo después en tienda.</p>
          <button onClick={() => navigate("/catalogo")} className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-kelder-600 px-5 text-sm font-semibold text-white">
            Explorar catálogo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {guardados.map((p) => {
            const disp = disponibilidadDeProducto(p);
            return (
              <ProductPeekCard
                key={p.id}
                producto={p}
                onClick={() => {
                  track("product_view", { producto: p.id, origen: "favoritos" });
                  navigate(`/producto/${p.id}`);
                }}
                disponibilidadLabel={`Disponible en ${disp.length} ${disp.length === 1 ? "tienda" : "tiendas"}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

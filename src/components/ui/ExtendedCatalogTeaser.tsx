import { useNavigate } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * Home "Catálogo extendido" — a COMPACT continuation of the in-store carousel (no big image),
 * placed right after "Disponible en tu tienda" and before any commercial campaign. It frames the
 * extended catalog as "more of what's in this store", preparing the future "pide y recoge en
 * tienda" model without a checkout.
 */
export function ExtendedCatalogTeaser() {
  const navigate = useNavigate();
  return (
    <section aria-label="Catálogo extendido">
      <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-ink-600" aria-hidden="true">
            <Package size={20} />
          </span>
          <div className="min-w-0">
            <p className="text-[16px] font-semibold text-ink-900">¿Buscas algo más?</p>
            <p className="mt-0.5 text-sm text-ink-500">Descubre productos adicionales que puedes solicitar en esta tienda</p>
          </div>
        </div>
        <button
          onClick={() => {
            track("product_view", { origen: "extended_catalog" });
            navigate("/catalogo?modo=extendido");
          }}
          className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600"
        >
          Explorar catálogo extendido
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

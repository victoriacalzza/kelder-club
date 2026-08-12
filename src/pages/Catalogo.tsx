import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Package, MapPin } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { ProductPeekCard } from "@/components/ui/ProductPeekCard";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import {
  catalogo,
  cuenta,
  tiposProducto,
  catalogoExtendidoDeTienda,
  cashbackEligibleEnTienda,
  availabilityForStore,
  availabilityLabel,
  formatMXN,
  type TipoProducto,
  type Producto,
} from "@/lib/mock-data";
import { track } from "@/lib/analytics";

type Chip = TipoProducto | "Todo";
const chips: Chip[] = ["Todo", ...tiposProducto];

/**
 * Catálogo extendido — discovery scoped to the selected store. Three modes via query params:
 *   ?contexto=cashback → "qué puedo comprar" with your cashback, in-store items first (visit intent)
 *   ?modo=extendido    → products orderable at your store but not physically there (future pick-up)
 *   (default)          → full catalog, each item tagged with availability at your store
 * The card CTA is always the product detail — never "Comprar". PRODUCTO → DISPONIBILIDAD → TIENDA.
 */
export function Catalogo() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const cashbackMode = params.get("contexto") === "cashback";
  const extendidoMode = params.get("modo") === "extendido";
  const { tienda } = useTiendaContexto();
  const storeId = tienda?.id ?? "t1";
  const [chip, setChip] = useState<Chip>("Todo");

  let lista: Producto[];
  if (cashbackMode) lista = cashbackEligibleEnTienda(storeId);
  else if (extendidoMode) lista = catalogoExtendidoDeTienda(storeId);
  else lista = catalogo.filter((p) => p.disponible !== false);
  if (chip !== "Todo") lista = lista.filter((p) => p.tipo === chip);

  const title = cashbackMode ? "Qué puedo comprar" : extendidoMode ? "Catálogo extendido" : "Catálogo";
  const subtitle = cashbackMode
    ? `Con tus ${formatMXN(cuenta.cashbackDisponible)} de cashback, esto puedes comprar o complementar en tu tienda.`
    : extendidoMode
      ? "Productos que puedes solicitar en tu tienda aunque no estén físicamente ahí."
      : "Descubre lo que puedes encontrar en tu tienda y en el catálogo del grupo.";

  return (
    <div>
      <BackButton />
      <TopBar title={title} subtitle={subtitle} />

      {!cashbackMode && !extendidoMode && (
        <button
          onClick={() => navigate("/buscar")}
          className="mb-4 flex w-full items-center gap-2 rounded-2xl border border-ink-200 bg-white px-4 py-3 text-left text-sm text-ink-500"
        >
          <Search size={18} aria-hidden="true" />
          Buscar productos, marcas o categorías
        </button>
      )}

      {tienda && (
        <p className="mb-3 inline-flex items-center gap-1.5 text-xs text-ink-400">
          {extendidoMode ? <Package size={13} aria-hidden="true" /> : <MapPin size={13} aria-hidden="true" />}
          {cashbackMode ? "En " : extendidoMode ? "Solicitar en " : "Disponibilidad en "}
          <span className="font-medium text-ink-600">{tienda.nombre}</span>
        </p>
      )}

      {/* category chips */}
      <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setChip(c)}
            className={`min-h-[38px] shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${
              chip === c ? "border-kelder-600 bg-kelder-600 text-white" : "border-ink-200 text-ink-700 hover:bg-ink-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* product grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {lista.map((p) => {
          const av = extendidoMode ? "extended_catalog" : availabilityForStore(p, storeId);
          const { label, tone } = availabilityLabel(av);
          return (
            <ProductPeekCard
              key={p.id}
              producto={p}
              onClick={() => {
                track(cashbackMode ? "cashback_product_click" : "product_view", { producto: p.id, origen: "catalogo" });
                navigate(`/producto/${p.id}`);
              }}
              poderCompraCashback={cashbackMode ? cuenta.cashbackDisponible : undefined}
              disponibilidadLabel={label}
              disponibilidadTono={tone}
            />
          );
        })}
      </div>

      {lista.length === 0 && <p className="mt-8 text-center text-sm text-ink-500">No hay productos en esta categoría por ahora.</p>}
    </div>
  );
}

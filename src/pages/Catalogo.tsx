import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { ProductPeekCard } from "@/components/ui/ProductPeekCard";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import { catalogo, tiposProducto, disponibilidadDeProducto, type TipoProducto } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

type Chip = TipoProducto | "Cerca de mí" | "Todo";
const chips: Chip[] = ["Todo", "Cerca de mí", ...tiposProducto];

/**
 * Catálogo extendido — discovery of products available in physical stores (may differ from
 * ecommerce). Logic is PRODUCTO → DISPONIBILIDAD → TIENDA → VISITA; the card CTA is the product
 * detail (availability), never "Comprar". "Cerca de mí" ranks by the closest store that stocks it.
 */
export function Catalogo() {
  const navigate = useNavigate();
  const { tienda } = useTiendaContexto();
  const [chip, setChip] = useState<Chip>("Todo");

  let lista = catalogo.filter((p) => p.disponible !== false);
  if (chip !== "Todo" && chip !== "Cerca de mí") lista = lista.filter((p) => p.tipo === chip);
  if (chip === "Cerca de mí") {
    lista = [...lista].sort((a, b) => {
      const da = disponibilidadDeProducto(a)[0]?.tienda.distanciaKm ?? 99;
      const db = disponibilidadDeProducto(b)[0]?.tienda.distanciaKm ?? 99;
      return da - db;
    });
  }

  return (
    <div>
      <BackButton />
      <TopBar title="Catálogo" subtitle="Descubre lo que puedes encontrar en tiendas cerca de ti." />

      {/* jump to full search */}
      <button
        onClick={() => navigate("/buscar")}
        className="mb-4 flex w-full items-center gap-2 rounded-2xl border border-ink-200 bg-white px-4 py-3 text-left text-sm text-ink-500"
      >
        <Search size={18} aria-hidden="true" />
        Buscar productos, marcas o categorías
      </button>

      {tienda && (
        <p className="mb-3 text-xs text-ink-400">
          Mostrando disponibilidad cerca de <span className="font-medium text-ink-600">{tienda.nombre}</span>
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
          const disp = disponibilidadDeProducto(p);
          return (
            <ProductPeekCard
              key={p.id}
              producto={p}
              onClick={() => {
                track("product_view", { producto: p.id, origen: "catalogo" });
                navigate(`/producto/${p.id}`);
              }}
              disponibilidadLabel={`Disponible en ${disp.length} ${disp.length === 1 ? "tienda" : "tiendas"}`}
            />
          );
        })}
      </div>

      {lista.length === 0 && <p className="mt-8 text-center text-sm text-ink-500">No hay productos en esta categoría por ahora.</p>}
    </div>
  );
}

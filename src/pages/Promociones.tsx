import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { PromoCard } from "@/components/ui/PromoCard";
import { promociones, promoCategorias, tiendaDePromo, type PromoCategoria } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

type Chip = PromoCategoria | "Cerca de mí" | "Ver todo";
const chips: Chip[] = ["Ver todo", "Cerca de mí", ...promoCategorias];

/**
 * Promociones vigentes — current commercial offers meant to generate store visits (NOT membership
 * Beneficios, NOT a banner wall). Each promo is actionable: Ver productos + Cómo llegar.
 */
export function Promociones() {
  const navigate = useNavigate();
  const [chip, setChip] = useState<Chip>("Ver todo");

  let lista = promociones;
  if (chip !== "Ver todo" && chip !== "Cerca de mí") lista = lista.filter((p) => p.categoria === chip);
  if (chip === "Cerca de mí") lista = [...lista].sort((a, b) => tiendaDePromo(a).distanciaKm - tiendaDePromo(b).distanciaKm);

  return (
    <div>
      <BackButton />
      <TopBar title="Promociones" subtitle="Ofertas vigentes en las tiendas del grupo. Aprovéchalas en tu próxima visita." />

      {/* horizontal filter chips */}
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

      <div className="grid gap-3 sm:grid-cols-2">
        {lista.map((promo) => (
          <PromoCard
            key={promo.id}
            promo={promo}
            onVerProductos={() => {
              track("promotion_view", { promo: promo.id });
              navigate(`/promocion/${promo.id}`);
            }}
          />
        ))}
      </div>

      {lista.length === 0 && <p className="mt-8 text-center text-sm text-ink-500">No hay promociones en esta categoría por ahora.</p>}
    </div>
  );
}

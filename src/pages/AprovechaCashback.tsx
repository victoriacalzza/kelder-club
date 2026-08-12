import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { CashbackProductCard } from "@/components/ui/CashbackProductCard";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import { cuenta, cashbackShoppablesEnTienda, availabilityForStore, formatMXN } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

type Tier = "todo" | "alcanza" | "mas";
const tiers: { key: Tier; label: string }[] = [
  { key: "alcanza", label: "Me alcanza" },
  { key: "mas", label: "Pongo un poco más" },
  { key: "todo", label: "Todo" },
];

/**
 * "Aprovecha tus $X" — the cashback screen. NOT another store catalog (that's Home's "Disponible
 * en tu tienda"). It answers only "what can I do with my cashback": which products I can take home
 * fully ("Me alcanza") and on which I'd pay just the difference ("Pongo un poco más"). Options are
 * scoped to the selected store to invite an actual visit; availability is shown as secondary info.
 */
export function AprovechaCashback() {
  const navigate = useNavigate();
  const { tienda } = useTiendaContexto();
  const storeId = tienda?.id ?? "t1";
  const cashback = cuenta.cashbackDisponible;
  const [tier, setTier] = useState<Tier>("todo");

  const base = cashbackShoppablesEnTienda(storeId);
  const lista = base.filter((p) =>
    tier === "alcanza" ? p.precio <= cashback : tier === "mas" ? p.precio > cashback : true,
  );

  return (
    <div className="mx-auto max-w-2xl">
      <BackButton />
      <TopBar title={`Aprovecha tus ${formatMXN(cashback)}`} subtitle="Descubre qué puedes llevarte o cuánto pagarías usando tu cashback." />

      {tienda && (
        <p className="mb-4 inline-flex items-center gap-1.5 text-xs text-ink-400">
          <MapPin size={13} aria-hidden="true" />
          En <span className="font-medium text-ink-600">{tienda.nombre}</span>
        </p>
      )}

      {/* cashback-oriented filters (not category filters) */}
      <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {tiers.map((t) => (
          <button
            key={t.key}
            onClick={() => setTier(t.key)}
            className={`min-h-[38px] shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${
              tier === t.key ? "border-kelder-600 bg-kelder-600 text-white" : "border-ink-200 text-ink-700 hover:bg-ink-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {lista.map((p) => {
          const av = availabilityForStore(p, storeId);
          const label = av === "in_store" ? "Disponible en tu tienda" : av === "low_stock" ? "Últimas piezas en tu tienda" : undefined;
          return (
            <CashbackProductCard
              key={p.id}
              producto={p}
              cashback={cashback}
              disponibilidadLabel={label}
              onClick={() => {
                track("cashback_product_click", { producto: p.id });
                navigate(`/producto/${p.id}`);
              }}
            />
          );
        })}
      </div>

      {lista.length === 0 && <p className="mt-8 text-center text-sm text-ink-500">No hay opciones en esta categoría por ahora.</p>}
    </div>
  );
}

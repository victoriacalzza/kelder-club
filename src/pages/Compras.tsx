import { useState } from "react";
import { Truck, ArrowRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { compras, formatMXN, type CompraCanal } from "@/lib/mock-data";

type Filtro = "todos" | "tienda" | "linea";
const tabs: { key: Filtro; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "tienda", label: "En tienda" },
  { key: "linea", label: "En línea" },
];

const canalLabel: Record<CompraCanal, string> = { tienda: "En tienda", linea: "En línea" };

export function Compras() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const lista = compras.filter((c) => filtro === "todos" || c.canal === filtro);

  return (
    <div>
      <TopBar title="Compras" subtitle="Tus compras en tienda y en línea, con el cashback que generaste." />

      {/* Discreet tabs — one unified experience, easy to tell the type apart */}
      <div className="mb-6 inline-flex items-center gap-1 rounded-full border border-ink-100 bg-white p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFiltro(t.key)}
            className={`min-h-[40px] rounded-full px-4 text-sm font-medium transition-colors ${
              filtro === t.key ? "bg-kelder-600 text-white" : "text-ink-500 hover:text-ink-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {lista.map((c) => (
          <div key={c.id} className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-4 sm:flex-row sm:items-center sm:p-5">
            {/* product image — protagonist */}
            <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-ink-50 sm:h-24 sm:w-24">
              {c.imagen && <img src={c.imagen} alt={`${c.marca} ${c.producto}`} className="h-full w-full object-contain p-2" />}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xs text-ink-500">{c.marca}</p>
                <span className="text-ink-300" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-xs text-ink-500">
                  {c.canal === "linea" && <Truck size={12} aria-hidden="true" />}
                  {canalLabel[c.canal]}
                </span>
                {c.estado && (
                  <span className="rounded-full bg-info-100 px-2 py-0.5 text-xs font-semibold text-info-700">{c.estado}</span>
                )}
              </div>
              <p className="mt-0.5 font-semibold text-ink-900">{c.producto}</p>
              <p className="text-sm text-ink-500">
                {c.sucursal} · {c.fecha}
              </p>
            </div>

            <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-center sm:gap-1">
              <div className="text-left sm:text-right">
                <p className="text-lg font-semibold text-ink-900">{formatMXN(c.monto)}</p>
                <p className="text-sm font-semibold text-success-600">+{formatMXN(c.cashback)} cashback</p>
              </div>
              <button className="inline-flex min-h-[44px] items-center gap-1 whitespace-nowrap text-sm font-semibold text-kelder-600">
                {c.canal === "linea" ? "Seguir pedido" : "Ver compra"}
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

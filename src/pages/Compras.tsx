import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, ArrowRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import {
  compras,
  resumenCompras,
  totalCompra,
  articulosCompra,
  formatMXN,
  type CompraCanal,
} from "@/lib/mock-data";

type Filtro = "todas" | "tienda" | "linea";
const tabs: { key: Filtro; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "tienda", label: "En tienda" },
  { key: "linea", label: "En línea" },
];
const canalLabel: Record<CompraCanal, string> = { tienda: "Compra en tienda", linea: "Pedido en línea" };

export function Compras() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const lista = compras.filter((c) => filtro === "todas" || c.canal === filtro);

  return (
    <div>
      <TopBar title="Mis compras" subtitle="Consulta tus compras, pedidos y el cashback que has generado." />

      {/* Compact horizontal cashback summary (not three big cards) */}
      <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-ink-100 bg-white px-6 py-4">
        <div>
          <span className="text-sm text-ink-500">Cashback disponible</span>{" "}
          <span className="text-base font-semibold text-ink-900">{formatMXN(resumenCompras.cashbackDisponible)}</span>
        </div>
        <span className="hidden h-4 w-px bg-ink-100 sm:block" aria-hidden="true" />
        <div>
          <span className="text-sm text-ink-500">Cashback generado</span>{" "}
          <span className="text-base font-semibold text-ink-900">{formatMXN(resumenCompras.cashbackGenerado)}</span>
        </div>
        <span className="hidden h-4 w-px bg-ink-100 sm:block" aria-hidden="true" />
        <div>
          <span className="text-sm text-ink-500">Compras realizadas</span>{" "}
          <span className="text-base font-semibold text-ink-900">{resumenCompras.comprasRealizadas}</span>
        </div>
        <button onClick={() => navigate("/cashback")} className="ml-auto inline-flex min-h-[40px] items-center gap-1 text-sm font-semibold text-kelder-600">
          Ver movimientos de cashback
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>

      {/* Filters */}
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

      {/* One card per transaction (ticket / order) */}
      <div className="space-y-4">
        {lista.map((c) => {
          const total = totalCompra(c);
          const nArt = articulosCompra(c);
          const thumbs = c.items.slice(0, 3);
          const extra = c.items.length - thumbs.length;
          return (
            <div key={c.id} className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">{c.tienda}</p>
                  <p className="text-sm text-ink-500">
                    {c.fecha} · {canalLabel[c.canal]} · Ticket {c.ticket}
                  </p>
                </div>
                {c.estado && (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-info-100 px-2.5 py-1 text-xs font-semibold text-info-700">
                    <Truck size={13} aria-hidden="true" />
                    {c.estado}
                  </span>
                )}
              </div>

              {/* product thumbnails */}
              <div className="mt-4 flex items-center gap-2">
                {thumbs.map((it, i) => (
                  <span key={i} className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-ink-50">
                    {it.imagen && <img src={it.imagen} alt={`${it.marca} ${it.modelo}`} className="h-full w-full object-contain p-1.5" />}
                  </span>
                ))}
                {extra > 0 && (
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink-50 text-sm font-semibold text-ink-500">
                    +{extra}
                  </span>
                )}
              </div>

              {/* summary + actions */}
              <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-ink-100 pt-4">
                <div>
                  <p className="text-[15px] font-semibold text-ink-900">
                    {nArt} {nArt === 1 ? "artículo" : "artículos"} · Total {formatMXN(total)}
                  </p>
                  <p className="text-sm font-semibold text-success-600">+{formatMXN(c.cashback)} cashback</p>
                </div>
                <div className="flex items-center gap-4">
                  {c.canal === "linea" && c.estado !== "Entregado" && (
                    <button
                      onClick={() => navigate(`/compras/${c.id}`)}
                      className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-900"
                    >
                      Seguir pedido
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/compras/${c.id}`)}
                    className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600"
                  >
                    Ver detalle
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

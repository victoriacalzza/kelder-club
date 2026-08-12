import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { compras, totalCompra, articulosCompra, formatMXN, type Compra } from "@/lib/mock-data";

const canalLabel = { tienda: "Compra en tienda", linea: "Pedido en línea" } as const;

export function CompraDetalle({ compra: compraProp }: { compra?: Compra }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const compra = compraProp ?? compras.find((c) => c.id === id) ?? compras[0];
  const total = totalCompra(compra);
  const nArt = articulosCompra(compra);

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate("/compras")}
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl pr-3 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Mis compras
      </button>

      {/* header */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-ink-900">{compra.tienda}</h1>
            <p className="mt-0.5 text-sm text-ink-500">
              {compra.fecha} · {canalLabel[compra.canal]} · Ticket {compra.ticket}
            </p>
          </div>
          {compra.estado && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-info-100 px-2.5 py-1 text-xs font-semibold text-info-700">
              <Truck size={13} aria-hidden="true" />
              {compra.estado}
            </span>
          )}
        </div>
        {(compra.estado === "En preparación" || compra.estado === "En camino") && (
          <button className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600">
            Seguir pedido
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* items */}
      <div className="mt-4 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
        {compra.items.map((it, i) => (
          <div key={i} className="flex items-center gap-4 p-4 sm:p-5">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink-50">
              {it.imagen && <img src={it.imagen} alt={`${it.marca} ${it.modelo}`} className="h-full w-full object-contain p-2" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink-400">{it.marca}</p>
              <p className="font-medium text-ink-900">{it.modelo}</p>
              <p className="text-sm text-ink-500">
                {it.talla !== undefined && <>Talla {it.talla} · </>}
                Cantidad {it.cantidad} · {formatMXN(it.precioUnitario)} c/u
              </p>
            </div>
            <p className="shrink-0 text-[15px] font-semibold text-ink-900">{formatMXN(it.precioUnitario * it.cantidad)}</p>
          </div>
        ))}
      </div>

      {/* totals + cashback */}
      <div className="mt-4 rounded-2xl border border-ink-100 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between text-sm text-ink-500">
          <span>
            {nArt} {nArt === 1 ? "artículo" : "artículos"}
          </span>
          <span>Subtotal {formatMXN(total)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-ink-100 pt-3">
          <span className="font-semibold text-ink-900">Total de la compra</span>
          <span className="text-lg font-semibold text-ink-900">{formatMXN(total)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-success-100 px-4 py-3">
          <span className="text-sm font-medium text-success-700">Cashback generado con esta compra</span>
          <span className="text-base font-semibold text-success-700">+{formatMXN(compra.cashback)}</span>
        </div>
      </div>

      {compra.canal === "tienda" && (
        <Button variant="secondary" fullWidth className="mt-4">
          Ver ticket
        </Button>
      )}
    </div>
  );
}

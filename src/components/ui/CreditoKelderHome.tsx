import { ArrowRight, CreditCard } from "lucide-react";
import { creditoKelder, formatMXN } from "@/lib/mock-data";

/**
 * Home module — CRÉDITO KELDER. A financial MODULE with a bold red product header (identity)
 * over white financial content, so it reads as its own product — not a look-alike of the
 * CrediVales module. Personal credit only: no mayoristas, no vouchers.
 */
export function CreditoKelderHome({ onVer }: { onVer?: () => void }) {
  const { saldoPendiente, proximoPago } = creditoKelder;
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
      {/* product header — solid red band, clearly a product identifier */}
      <div className="flex items-center gap-3 bg-kelder-600 px-5 py-4 text-white sm:px-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15" aria-hidden="true">
          <CreditCard size={18} strokeWidth={2} />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em]">Crédito Kelder</p>
          <p className="text-sm text-white/85">Tu crédito personal</p>
        </div>
      </div>

      {/* financial content — white. Mobile: vertical (saldo prominent). Desktop: 3 columns. */}
      <div className="p-5 sm:p-6">
        {/* mobile */}
        <div className="sm:hidden">
          <p className="text-sm text-ink-500">Saldo pendiente</p>
          <p className="mt-0.5 text-3xl font-semibold tracking-tight text-ink-900">{formatMXN(saldoPendiente)}</p>
          <p className="mt-1.5 text-sm text-ink-600">
            Próximo pago <span className="font-semibold text-ink-900">{formatMXN(proximoPago.monto)}</span> · {proximoPago.fecha}
          </p>
        </div>

        {/* desktop / tablet */}
        <div className="hidden grid-cols-3 gap-4 sm:grid">
          <div>
            <p className="text-sm text-ink-500">Saldo pendiente</p>
            <p className="mt-0.5 text-2xl font-semibold tracking-tight text-ink-900">{formatMXN(saldoPendiente)}</p>
          </div>
          <div className="border-l border-ink-100 pl-4">
            <p className="text-sm text-ink-500">Próximo pago</p>
            <p className="mt-0.5 text-2xl font-semibold text-ink-900">{formatMXN(proximoPago.monto)}</p>
          </div>
          <div className="border-l border-ink-100 pl-4">
            <p className="text-sm text-ink-500">Fecha</p>
            <p className="mt-0.5 text-2xl font-semibold text-ink-900">{proximoPago.fecha}</p>
          </div>
        </div>

        <button
          onClick={onVer}
          className="mt-4 inline-flex min-h-[44px] items-center gap-1 text-[15px] font-semibold text-kelder-600"
        >
          Ver mi Crédito Kelder
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

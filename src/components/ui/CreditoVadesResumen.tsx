import { ArrowRight, CreditCard, Ticket } from "lucide-react";
import { creditoKelder, credivalesEnPago, credivalesDisponibles, formatMXN } from "@/lib/mock-data";

/**
 * Home summary for "Crédito y vales" — the Home RESUMES and DIRECTS; the dedicated tab
 * EXPLAINS and MANAGES. This is one compact card with two one-line rows (Crédito Kelder,
 * CrediVales) and a single CTA into the full section. It never lists mayoristas, payments
 * or individual CrediVales — those live in /vales. Crédito Kelder and CrediVale stay distinct.
 */
export function CreditoVadesResumen({ onVer }: { onVer?: () => void }) {
  const enPago = credivalesEnPago.length;
  const disponibles = credivalesDisponibles.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
      <div className="flex items-center justify-between gap-3 px-5 pt-4 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">Crédito y vales</p>
        <button onClick={onVer} className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600">
          Ver Crédito y Vales
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>

      <button onClick={onVer} className="block w-full text-left">
        <div className="divide-y divide-ink-100 px-5 pb-4 sm:px-6">
          {/* Crédito Kelder */}
          <div className="flex items-center gap-3 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-kelder-50 text-kelder-600" aria-hidden="true">
              <CreditCard size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink-900">Crédito Kelder</p>
              <p className="text-sm text-ink-500">
                Próximo pago <span className="font-semibold text-ink-900">{formatMXN(creditoKelder.proximoPago.monto)}</span> · {creditoKelder.proximoPago.fecha}
              </p>
            </div>
          </div>

          {/* CrediVales */}
          <div className="flex items-center gap-3 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-700" aria-hidden="true">
              <Ticket size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink-900">CrediVales</p>
              <p className="text-sm text-ink-500">
                {enPago} en pago · {disponibles} disponibles
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

import { ArrowRight, Ticket, Wallet } from "lucide-react";
import { credivalesEnPago, resumenCrediValesDisponibles, iniciales, formatMXN } from "@/lib/mock-data";

/**
 * Home module — MIS CREDIVALES (en pago). A financial MODULE with a dark charcoal product
 * header, deliberately DIFFERENT from Crédito Kelder's red header so the two products never
 * look alike. Vouchers assigned by mayoristas; here only the ones already USED, i.e. the ones
 * generating quincenal payments. Available vouchers live in their own card (never mixed).
 */
export function CrediValesEnPagoHome({ onVer }: { onVer?: () => void }) {
  const enPago = credivalesEnPago;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
      {/* product header — charcoal band */}
      <div className="flex items-center gap-3 bg-ink-900 px-5 py-4 text-white sm:px-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10" aria-hidden="true">
          <Ticket size={18} strokeWidth={2} />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em]">Mis CrediVales</p>
          <p className="text-sm text-white/70">Vales asignados por tus mayoristas</p>
        </div>
      </div>

      {/* content — the EN PAGO state, explicitly labelled */}
      <div className="p-5 sm:p-6">
        <div className="mb-1 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warning-600">CrediVales en pago</p>
          <span className="text-sm text-ink-400">
            {enPago.length} {enPago.length === 1 ? "CrediVale" : "CrediVales"}
          </span>
        </div>

        <div className="divide-y divide-ink-100">
          {enPago.map((v) => (
            <div key={v.id} className="flex items-center gap-3 py-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-50 text-[11px] font-semibold text-ink-700"
                aria-hidden="true"
              >
                {iniciales(v.mayoristaPersona)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-medium text-ink-900">{v.mayoristaPersona}</span>
                  <span className="text-ink-400"> · CrediVale {v.folio}</span>
                </p>
                <p className="text-sm text-ink-500">
                  <span className="font-semibold text-ink-900">Pago quincenal {formatMXN(v.proximoPago?.monto ?? 0)}</span>
                  {v.proximoPago && <> · Próximo pago {v.proximoPago.fecha}</>}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onVer} className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600">
          Ver mis CrediVales
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/**
 * Home card — CrediVales DISPONIBLES. Shown APART from the en-pago module so an available
 * voucher is never presented as a debt. Compact, with a green "available" accent.
 */
export function CrediValesDisponiblesHome({ onVer }: { onVer?: () => void }) {
  const { count, total } = resumenCrediValesDisponibles;
  if (count === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-success-100 text-success-600" aria-hidden="true">
        <Wallet size={20} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-ink-900">
          Tienes {count} {count === 1 ? "CrediVale disponible" : "CrediVales disponibles"}
        </p>
        <p className="text-sm text-ink-500">Hasta {formatMXN(total)} disponibles para utilizar</p>
      </div>
      <button onClick={onVer} className="inline-flex min-h-[44px] shrink-0 items-center gap-1 text-sm font-semibold text-kelder-600">
        Ver CrediVales
        <ArrowRight size={15} aria-hidden="true" />
      </button>
    </div>
  );
}

import { ChevronRight, User, Sparkles } from "lucide-react";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatMXN, type Vale } from "@/lib/mock-data";
import logoCredivale from "../../assets/logos/credivale.png";

/**
 * Official CrediVale logo (the real asset, never a text re-creation). Contained height +
 * object-contain keeps its aspect ratio. Default ~24px tall; pass a taller className (e.g.
 * "h-7") on the detail card. Used on every CrediVale surface — never on an Extravale.
 */
export function CrediValeLogo({ className = "h-6" }: { className?: string }) {
  return <img src={logoCredivale} alt="CrediVale" className={`w-auto max-w-[140px] object-contain ${className}`} />;
}

/**
 * CrediVale cards — a modern, minimal take on the real CrediVale credential. There are three
 * shapes, one per lifecycle state, because a DISPONIBLE voucher has NO payment data, while an
 * EN PAGO one is all about its quincenal payments. Never mix Crédito Kelder data in here.
 */

/** DISPONIBLE — unused voucher. Communicates only how much can be used, mayorista, validity. */
export function CrediValeDisponibleCard({ vale, onClick }: { vale: Vale; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col rounded-2xl border border-ink-100 bg-white p-5 text-left transition-shadow hover:shadow-soft"
    >
      <div className="flex items-center justify-between gap-3">
        <CrediValeLogo />
        <StatusPill estado={vale.estado} />
      </div>

      <span className="mt-4 inline-flex w-fit items-center rounded-full bg-ink-50 px-3 py-1 font-mono text-sm tracking-wide text-ink-600">
        {vale.folio}
      </span>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">Puedes utilizar hasta</p>
      <p className="mt-0.5 text-3xl font-semibold tracking-tight text-ink-900">{formatMXN(vale.monto)}</p>

      <div className="mt-3 space-y-1 text-sm">
        <p className="inline-flex items-center gap-1.5 text-ink-500">
          <User size={14} className="text-ink-400" aria-hidden="true" />
          Mayorista <span className="font-medium text-ink-900">{vale.mayoristaPersona}</span>
        </p>
        <p className="text-ink-500">
          Vigente hasta <span className="font-medium text-ink-700">{vale.fechaVigencia}</span>
        </p>
      </div>

      <span className="mt-4 inline-flex items-center gap-1 border-t border-ink-100 pt-3 text-sm font-semibold text-kelder-600">
        Ver CrediVale
        <ChevronRight size={15} aria-hidden="true" />
      </span>
    </button>
  );
}

/** EN PAGO — used voucher. Deliberately SHORT: folio + mayorista, next payment, pending balance,
 *  progress, "Ver detalle". Everything else (calendar, breakdown) lives in the detail (Level 3). */
export function CrediValeEnPagoCard({ vale, onClick }: { vale: Vale; onClick?: () => void }) {
  const progreso = vale.pagoActual !== undefined && vale.pagosTotales !== undefined
    ? Math.round(((vale.pagoActual - 1) / vale.pagosTotales) * 100)
    : 0;

  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col rounded-2xl border border-ink-100 bg-white p-5 text-left transition-shadow hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-sm text-ink-600">{vale.folio}</p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink-900">
            <User size={14} className="text-ink-400" aria-hidden="true" />
            {vale.mayoristaPersona}
          </p>
        </div>
        <StatusPill estado={vale.estado} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-ink-500">Próximo pago</p>
          <p className="mt-0.5 text-[15px] font-semibold text-ink-900">
            {formatMXN(vale.proximoPago?.monto ?? 0)} · {vale.proximoPago?.fecha ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-ink-500">Saldo pendiente</p>
          <p className="mt-0.5 text-[15px] font-semibold text-ink-900">{formatMXN(vale.saldoPendiente ?? 0)}</p>
        </div>
      </div>

      {vale.pagoActual !== undefined && vale.pagosTotales !== undefined && (
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-kelder-600" style={{ width: `${progreso}%` }} />
          </div>
          <span className="shrink-0 text-xs text-ink-500">
            {vale.pagoActual} de {vale.pagosTotales} pagos
          </span>
        </div>
      )}

      <span className="mt-4 inline-flex items-center gap-1 border-t border-ink-100 pt-3 text-sm font-semibold text-kelder-600">
        Ver detalle
        <ChevronRight size={15} aria-hidden="true" />
      </span>
    </button>
  );
}

/** VENCIDO — expired without use. Only the authorized amount, mayorista and expiry date. */
export function CrediValeVencidoCard({ vale, onClick }: { vale: Vale; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col rounded-2xl border border-ink-100 bg-white p-5 text-left opacity-90 transition-shadow hover:shadow-soft"
    >
      <div className="flex items-center justify-between gap-3">
        <CrediValeLogo className="opacity-70" />
        <StatusPill estado={vale.estado} />
      </div>

      <span className="mt-4 inline-flex w-fit items-center rounded-full bg-ink-50 px-3 py-1 font-mono text-sm tracking-wide text-ink-500">
        {vale.folio}
      </span>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">Monto autorizado</p>
      <p className="mt-0.5 text-2xl font-semibold tracking-tight text-ink-700">{formatMXN(vale.monto)}</p>

      <div className="mt-3 space-y-1 text-sm">
        <p className="inline-flex items-center gap-1.5 text-ink-500">
          <User size={14} className="text-ink-400" aria-hidden="true" />
          Mayorista <span className="font-medium text-ink-700">{vale.mayoristaPersona}</span>
        </p>
        <p className="text-ink-500">
          Venció el <span className="font-medium text-ink-700">{vale.fechaVigencia}</span>
        </p>
      </div>

      <span className="mt-4 inline-flex items-center gap-1 border-t border-ink-100 pt-3 text-sm font-semibold text-kelder-600">
        Ver CrediVale
        <ChevronRight size={15} aria-hidden="true" />
      </span>
    </button>
  );
}

/**
 * EXTRAVALE — leftover AVAILABLE balance from a used CrediVale. The hero figure is the money
 * still usable ("$X disponibles"), never "Monto autorizado". Green "Disponible" badge; shows
 * the origin CrediVale so its provenance is clear. Not a debt, never an "en pago" card.
 */
export function ExtravaleCard({ vale, onClick }: { vale: Vale; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col rounded-2xl border border-ink-100 bg-white p-5 text-left transition-shadow hover:shadow-soft"
    >
      {/* Extravale keeps ITS OWN identity — no CrediVale logo here */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-success-700">
          <Sparkles size={13} aria-hidden="true" />
          Extravale
        </span>
        <StatusPill estado={vale.estado} />
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-tight text-ink-900">{formatMXN(vale.disponible)} disponibles</p>
      <p className="text-sm text-ink-500">Saldo restante de tu CrediVale</p>

      <div className="mt-3 space-y-1 text-sm">
        <p className="text-ink-500">
          Generado a partir del <span className="font-medium text-ink-900">CrediVale {vale.origenFolio}</span>
        </p>
        <p className="inline-flex items-center gap-1.5 text-ink-500">
          <User size={14} className="text-ink-400" aria-hidden="true" />
          Mayorista <span className="font-medium text-ink-900">{vale.mayoristaPersona}</span>
        </p>
        <p className="text-ink-500">
          Vigente hasta <span className="font-medium text-ink-700">{vale.fechaVigencia}</span>
        </p>
      </div>

      <span className="mt-4 inline-flex items-center gap-1 border-t border-ink-100 pt-3 text-sm font-semibold text-kelder-600">
        Ver Extravale
        <ChevronRight size={15} aria-hidden="true" />
      </span>
    </button>
  );
}

/**
 * Decorative, non-interactive CrediVale credential for empty states.
 */
export function CrediValeGlyph({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-60 select-none rounded-2xl border border-ink-100 bg-white p-5 shadow-soft ${className}`}
    >
      <div className="flex items-center justify-between">
        <CrediValeLogo className="h-4" />
        <span className="inline-flex items-center gap-1 rounded-full bg-success-100 px-2 py-0.5 text-[11px] font-semibold text-success-600">
          Disponible
        </span>
      </div>
      <span className="mt-3 inline-flex w-fit items-center rounded-full bg-ink-50 px-2.5 py-0.5 font-mono text-xs tracking-wide text-ink-500">
        •••• 1587
      </span>
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">Puedes utilizar hasta</p>
      <p className="text-2xl font-semibold tracking-tight text-ink-900">$500</p>
      <p className="mt-2 text-xs text-ink-400">Vigente hasta 02 nov 2026</p>
    </div>
  );
}

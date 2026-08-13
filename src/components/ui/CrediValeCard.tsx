import { ChevronRight, ChevronDown, User, Sparkles } from "lucide-react";
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

/** DISPONIBLE — unused voucher. COMPACT: small logo + folio, "Disponible" pill, the available
 *  amount as the hero, and mayorista/validity in a second column. ~35% shorter so two cards fit. */
export function CrediValeDisponibleCard({ vale, onClick }: { vale: Vale; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col rounded-2xl border border-ink-100 bg-white p-4 text-left transition-shadow hover:shadow-soft"
    >
      {/* Secondary identification: small logo + folio, status on the right */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <CrediValeLogo className="h-3.5" />
          <span className="font-mono text-xs tracking-wide text-ink-500">{vale.folio}</span>
        </div>
        <StatusPill estado={vale.estado} />
      </div>

      {/* Two columns: the amount (hero) vs. mayorista + validity */}
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">Disponible</p>
          <p className="mt-0.5 text-2xl font-semibold tracking-tight text-ink-900">{formatMXN(vale.monto)}</p>
        </div>
        <div className="shrink-0 text-right text-sm">
          <p className="inline-flex items-center gap-1 text-ink-900">
            <User size={13} className="text-ink-400" aria-hidden="true" />
            <span className="font-medium">{vale.mayoristaPersona}</span>
          </p>
          <p className="mt-0.5 text-xs text-ink-500">Vigente hasta {vale.fechaVigencia}</p>
        </div>
      </div>

      <span className="mt-3 inline-flex items-center gap-1 border-t border-ink-100 pt-2.5 text-sm font-semibold text-kelder-600">
        Ver CrediVale
        <ChevronRight size={15} aria-hidden="true" />
      </span>
    </button>
  );
}

/**
 * EN PAGO — expandable/collapsible (accordion) card. COLLAPSED shows only the essentials: folio,
 * mayorista, "En pago" pill, next payment + date, pending balance, and a summarized progress
 * ("2 de 4 pagos"). EXPANDED adds the progress bar and "Ver detalle" (calendar/history). Only one
 * card is expanded at a time (state owned by the parent). Progressive disclosure: what/when/whom
 * first, the rest on demand.
 */
export function CrediValeEnPagoCard({
  vale,
  expanded = false,
  onToggle,
  onVerDetalle,
}: {
  vale: Vale;
  expanded?: boolean;
  onToggle?: () => void;
  onVerDetalle?: () => void;
}) {
  const progreso = vale.pagoActual !== undefined && vale.pagosTotales !== undefined
    ? Math.round(((vale.pagoActual - 1) / vale.pagosTotales) * 100)
    : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      {/* Collapsed header — tap (or chevron) toggles */}
      <button onClick={onToggle} aria-expanded={expanded} className="flex w-full items-start gap-3 p-4 text-left">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-sm text-ink-600">{vale.folio}</p>
            <StatusPill estado={vale.estado} />
          </div>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink-900">
            <User size={14} className="text-ink-400" aria-hidden="true" />
            {vale.mayoristaPersona}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-4">
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
            <p className="mt-2 text-xs text-ink-500">{vale.pagoActual} de {vale.pagosTotales} pagos</p>
          )}
        </div>
        <ChevronDown size={20} className={`mt-0.5 shrink-0 text-ink-400 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {/* Expanded content — smooth height transition (grid-rows trick) */}
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="border-t border-ink-100 px-4 pb-4 pt-3">
            {vale.pagoActual !== undefined && vale.pagosTotales !== undefined && (
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full rounded-full bg-kelder-600" style={{ width: `${progreso}%` }} />
                </div>
                <span className="shrink-0 text-xs text-ink-500">{vale.pagoActual} de {vale.pagosTotales} pagos</span>
              </div>
            )}
            <button onClick={onVerDetalle} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-kelder-600">
              Ver detalle
              <ChevronRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
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

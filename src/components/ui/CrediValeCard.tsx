import { Check, ChevronRight } from "lucide-react";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatMXN, type Vale } from "@/lib/mock-data";

/**
 * CrediVale — a modern, minimal take on the REAL CrediVale credential (logo, folio, monto
 * autorizado, titular, vigencia, estado). NOT a cut-edge ticket and NOT a bank card.
 * A CrediVale is a distinct product from Crédito Kelder; this component never shows any
 * Crédito Kelder saldo/pago data. Summary view hides personal data — full data lives in detail.
 */

// The CrediVale wordmark, rebuilt in Kelder's language: quiet type + a red check medallion
// echoing the real logo's checkmark. Used on every CrediVale surface for brand continuity.
export function CrediValeWordmark({ size = "md" }: { size?: "sm" | "md" }) {
  const text = size === "sm" ? "text-sm" : "text-[17px]";
  const badge = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const check = size === "sm" ? 11 : 13;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`font-semibold lowercase tracking-tight text-ink-900 ${text}`}>
        credi<span className="text-ink-500">vale</span>
      </span>
      <span className={`flex ${badge} items-center justify-center rounded-full bg-kelder-600 text-white`} aria-hidden="true">
        <Check size={check} strokeWidth={3} />
      </span>
    </span>
  );
}

export function CrediValeCard({ vale, onClick }: { vale: Vale; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col rounded-2xl border border-ink-100 bg-white p-5 text-left transition-shadow hover:shadow-soft"
    >
      {/* Credential header — wordmark + status */}
      <div className="flex items-center justify-between gap-3">
        <CrediValeWordmark />
        <StatusPill estado={vale.estado} />
      </div>

      {/* Folio chip */}
      <span className="mt-4 inline-flex w-fit items-center rounded-full bg-ink-50 px-3 py-1 font-mono text-sm tracking-wide text-ink-600">
        {vale.folio}
      </span>

      {/* Monto autorizado — the credential's hero figure */}
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">Monto autorizado</p>
      <p className="mt-0.5 text-3xl font-semibold tracking-tight text-ink-900">{formatMXN(vale.monto)}</p>
      {vale.disponible !== vale.monto && (
        <p className="mt-0.5 text-sm text-ink-500">Disponible {formatMXN(vale.disponible)}</p>
      )}

      {/* Vigencia */}
      <p className="mt-3 text-sm text-ink-500">
        Vigencia <span className="font-medium text-ink-700">{vale.fechaVigencia}</span>
      </p>

      <span className="mt-4 inline-flex items-center gap-1 border-t border-ink-100 pt-3 text-sm font-semibold text-kelder-600">
        Ver detalle
        <ChevronRight size={15} aria-hidden="true" />
      </span>
    </button>
  );
}

/**
 * Decorative, non-interactive CrediVale credential for empty states — a clean digital
 * card that can float/tilt to add visual richness without exposing real data.
 */
export function CrediValeGlyph({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-60 select-none rounded-2xl border border-ink-100 bg-white p-5 shadow-soft ${className}`}
    >
      <div className="flex items-center justify-between">
        <CrediValeWordmark size="sm" />
        <span className="inline-flex items-center gap-1 rounded-full bg-success-100 px-2 py-0.5 text-[11px] font-semibold text-success-600">
          Activo
        </span>
      </div>
      <span className="mt-3 inline-flex w-fit items-center rounded-full bg-ink-50 px-2.5 py-0.5 font-mono text-xs tracking-wide text-ink-500">
        •••• 1587
      </span>
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">Monto autorizado</p>
      <p className="text-2xl font-semibold tracking-tight text-ink-900">$500</p>
      <p className="mt-2 text-xs text-ink-400">Vigencia 02 nov 2026</p>
    </div>
  );
}

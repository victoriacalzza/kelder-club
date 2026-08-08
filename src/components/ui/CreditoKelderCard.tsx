import { ArrowRight } from "lucide-react";

/**
 * Home block 2, state C — shown ONLY to members WITHOUT Crédito Kelder. No financial
 * data at all (no balances, vales, mayoristas or payments): an editorial invitation.
 * This is the ONLY credit state with photography — a lifestyle image full-bleed on the
 * right half. Same container family (radius, border, padding) as states A/B so the block
 * keeps a consistent, light footprint. Never coexists with the reminder (A/B).
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
export function CreditoKelderCard({ onConocer }: { onConocer?: () => void }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white sm:flex-row">
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Conoce Crédito Kelder</p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-ink-900">Compra hoy y paga en quincenas</p>
        <p className="mt-1.5 max-w-md text-sm text-ink-500">
          Adquiere productos en tiendas del grupo y paga de forma flexible. Solicítalo con tu mayorista.
        </p>
        <button onClick={onConocer} className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-kelder-600">
          Conocer cómo funciona
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
      {/* lifestyle photo — full-bleed right half (real people photography in production) */}
      <div className="h-40 w-full bg-ink-50 sm:h-auto sm:w-1/2" aria-hidden="true" />
    </div>
  );
}

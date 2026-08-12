import { ArrowRight, CreditCard, Ticket } from "lucide-react";
import { creditoKelder, credivalesEnPago, credivalesDisponibles, formatMXN } from "@/lib/mock-data";

/**
 * Home summary for "Crédito y vales" — the Home RESUMES and DIRECTS; the dedicated tab
 * EXPLAINS and MANAGES. Single responsibility: show WHICH financial products the member has
 * and their state, then send them to the detail. It never shows products, catalog, availability,
 * promotions or cashback — those are other Home blocks. Crédito Kelder and CrediVale stay distinct.
 *
 * Content is built from the member's real state via `tieneCredito` / `tieneCredivales`:
 *   1) both        → Crédito Kelder summary + CrediVales summary
 *   2) only crédito → Crédito Kelder summary + "conoce CrediVale" invitation
 *   3) only vales   → "conoce Crédito Kelder" invitation + CrediVales summary
 *   4) neither      → informative dual intro to both products (never fake balances)
 */
interface CreditoVadesResumenProps {
  onVer?: () => void;
  onConocerCredito?: () => void;
  onConocerCredivale?: () => void;
  tieneCredito?: boolean;
  tieneCredivales?: boolean;
}

export function CreditoVadesResumen({
  onVer,
  onConocerCredito,
  onConocerCredivale,
  tieneCredito = true,
  tieneCredivales = true,
}: CreditoVadesResumenProps) {
  const enPago = credivalesEnPago.length;
  const disponibles = credivalesDisponibles.length;
  const tieneAlguno = tieneCredito || tieneCredivales;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
      <div className="flex items-center justify-between gap-3 px-5 pt-4 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">Crédito y vales</p>
        {tieneAlguno && (
          <button onClick={onVer} className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600">
            Ver Crédito y Vales
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="divide-y divide-ink-100 px-5 pb-4 sm:px-6">
        {/* Crédito Kelder */}
        {tieneCredito ? (
          <SummaryRow
            icon={<CreditCard size={18} />}
            iconClass="bg-kelder-50 text-kelder-600"
            title="Crédito Kelder"
            onClick={onVer}
          >
            Próximo pago <span className="font-semibold text-ink-900">{formatMXN(creditoKelder.proximoPago.monto)}</span> · {creditoKelder.proximoPago.fecha}
          </SummaryRow>
        ) : (
          <InviteRow
            title={tieneCredivales ? "¿Aún no tienes Crédito Kelder?" : "Crédito Kelder"}
            desc="Compra hoy y paga en quincenas."
            cta={tieneCredivales ? "Conocer Crédito Kelder" : "Conocer más"}
            onClick={onConocerCredito}
          />
        )}

        {/* CrediVales */}
        {tieneCredivales ? (
          <SummaryRow icon={<Ticket size={18} />} iconClass="bg-ink-100 text-ink-700" title="CrediVales" onClick={onVer}>
            {enPago} en pago · {disponibles} disponibles
          </SummaryRow>
        ) : (
          <InviteRow
            title={tieneCredito ? "¿Aún no tienes CrediVales?" : "CrediVale"}
            desc={tieneCredito ? "Conoce cómo funcionan y cómo puedes utilizarlos." : "Conoce cómo funcionan tus vales y cómo utilizarlos."}
            cta={tieneCredito ? "Conocer CrediVale" : "Conocer más"}
            onClick={onConocerCredivale}
          />
        )}
      </div>
    </div>
  );
}

function SummaryRow({
  icon,
  iconClass,
  title,
  children,
  onClick,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 py-3 text-left">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClass}`} aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink-900">{title}</p>
        <p className="text-sm text-ink-500">{children}</p>
      </div>
    </button>
  );
}

function InviteRow({ title, desc, cta, onClick }: { title: string; desc: string; cta: string; onClick?: () => void }) {
  return (
    <div className="py-3">
      <p className="text-sm font-medium text-ink-900">{title}</p>
      <p className="text-sm text-ink-500">{desc}</p>
      <button onClick={onClick} className="mt-1 inline-flex min-h-[36px] items-center gap-1 text-sm font-semibold text-kelder-600">
        {cta}
        <ArrowRight size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

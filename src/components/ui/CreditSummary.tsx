import { ArrowRight, CreditCard } from "lucide-react";
import { pagosMayoristas, mayoristasAsignados, iniciales, formatMXN, type PagoMayorista } from "@/lib/mock-data";

/**
 * Home credit slot — the CRÉDITO KELDER reminder (payment series). This is strictly the
 * Crédito Kelder product: who I pay, how much and when. It is NOT a CrediVale surface and
 * never shows CrediVale credentials — the two are independent products. No payment flow,
 * no consequences, no summed total across mayoristas. Context is progress ("Pago 3 de 6").
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
interface CreditSummaryProps {
  estado?: "con_vales" | "sin_vales";
  onVerCredito?: () => void;
  onSolicitar?: () => void;
}

// Overdue rows first, then soonest upcoming payment.
function ordenar(rows: PagoMayorista[]) {
  return [...rows].sort((a, b) => {
    if (a.vencido !== b.vencido) return a.vencido ? -1 : 1;
    return (a.enDias ?? 0) - (b.enDias ?? 0);
  });
}

function listarNombres(nombres: string[]) {
  if (nombres.length === 1) return nombres[0];
  return `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`;
}

export function CreditSummary({ estado = "con_vales", onVerCredito, onSolicitar }: CreditSummaryProps) {
  const rows = ordenar(pagosMayoristas);
  const visibles = rows.slice(0, 3);
  const extra = rows.length - visibles.length;
  const nMayoristas = rows.length;

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
          <CreditCard size={18} strokeWidth={1.75} className="text-ink-500" aria-hidden="true" />
          <span>
            Crédito Kelder
            {estado === "con_vales" && nMayoristas > 1 && <span className="text-ink-400"> · {nMayoristas} mayoristas</span>}
          </span>
        </p>
        {estado === "con_vales" ? (
          <button onClick={onVerCredito} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-kelder-600">
            Ver mi crédito
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        ) : (
          <button onClick={onSolicitar} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-kelder-600">
            Ver mi crédito
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      {estado === "con_vales" ? (
        <div className="mt-2 divide-y divide-ink-100">
          {visibles.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center gap-x-2.5 gap-y-1 py-3 text-[15px]">
              <span
                className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-ink-50 text-[11px] font-semibold text-ink-700"
                aria-hidden="true"
              >
                {iniciales(r.mayorista)}
              </span>
              <span className="font-medium text-ink-900">{r.mayorista}</span>
              <span className="text-ink-300" aria-hidden="true">·</span>
              {r.vencido ? (
                <span className="text-kelder-700">
                  Pago vencido <span className="font-semibold">{formatMXN(r.monto)}</span>
                </span>
              ) : (
                <span className="text-ink-700">
                  Próximo pago <span className="font-semibold text-ink-900">{formatMXN(r.monto)}</span>
                </span>
              )}
              <span className="text-ink-300" aria-hidden="true">·</span>
              <span className="text-ink-500">
                {r.vencido ? (
                  `desde el ${r.vencidoDesde}`
                ) : (
                  <>
                    {r.fecha} ·{" "}
                    <span className={r.enDias !== undefined && r.enDias <= 5 ? "font-medium text-ink-700" : ""}>
                      en {r.enDias} días
                    </span>
                  </>
                )}
              </span>
              <span className="ml-auto text-sm text-ink-500">
                Pago {r.pagoActual} de {r.pagosTotales}
              </span>
            </div>
          ))}
          {extra > 0 && <p className="pt-3 text-sm text-ink-500">y {extra} mayoristas más</p>}
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-[15px] font-medium text-ink-900">No tienes pagos pendientes</p>
          <p className="mt-1 max-w-md text-sm text-ink-500">
            Tu Crédito Kelder está al corriente con {listarNombres(mayoristasAsignados)}.
          </p>
        </div>
      )}
    </div>
  );
}

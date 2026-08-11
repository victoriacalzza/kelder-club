import { useNavigate } from "react-router-dom";
import { ChevronLeft, CalendarClock, CheckCircle2 } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { creditoKelder, formatMXN } from "@/lib/mock-data";

/**
 * Mi Crédito Kelder — the member's PERSONAL credit. It shows ONLY the personal credit:
 * balance, upcoming payments and history. It NEVER shows mayoristas, "créditos activos",
 * CrediVales, folios or any voucher data — those belong to CrediVales, a different product.
 */
export function CreditoDetalle() {
  const navigate = useNavigate();
  const { saldoPendiente, proximoPago, pagos } = creditoKelder;

  const proximos = pagos.filter((p) => p.estado === "proximo" || p.estado === "pendiente");
  const historial = pagos.filter((p) => p.estado === "pagado").sort((a, b) => b.numero - a.numero);

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate("/vales")}
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl pr-3 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Crédito y vales
      </button>

      <TopBar title="Mi Crédito Kelder" subtitle="Consulta el estado de tu crédito, tus próximos pagos y tu historial." />

      {/* summary — personal credit only */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          <div>
            <p className="text-sm text-ink-500">Saldo pendiente</p>
            <p className="mt-0.5 text-2xl font-semibold tracking-tight text-ink-900">{formatMXN(saldoPendiente)}</p>
          </div>
          <div className="sm:border-l sm:border-ink-100 sm:pl-5">
            <p className="text-sm text-ink-500">Próximo pago</p>
            <p className="mt-0.5 text-2xl font-semibold text-ink-900">{formatMXN(proximoPago.monto)}</p>
          </div>
          <div className="sm:border-l sm:border-ink-100 sm:pl-5">
            <p className="text-sm text-ink-500">Fecha</p>
            <p className="mt-0.5 text-2xl font-semibold text-ink-900">{proximoPago.fecha}</p>
          </div>
        </div>
      </div>

      {/* Próximos pagos — Crédito Kelder only */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">Próximos pagos</h2>
        <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
          {proximos.map((p) => (
            <div key={p.id} className="flex items-center gap-3 px-4 py-3.5">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  p.estado === "proximo" ? "bg-kelder-50 text-kelder-600" : "bg-ink-50 text-ink-400"
                }`}
              >
                <CalendarClock size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink-900">
                  Pago {p.numero} de {creditoKelder.pagosTotales} · {p.fecha}
                </p>
                <p className="text-sm text-ink-500">{p.estado === "proximo" ? "Próximo pago" : "Pendiente"}</p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-ink-900">{formatMXN(p.monto)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Historial de pagos — Crédito Kelder only */}
      {historial.length > 0 && (
        <section className="mt-6 pb-4">
          <h2 className="mb-3 text-lg font-semibold text-ink-900">Historial de pagos</h2>
          <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
            {historial.map((h) => (
              <div key={h.id} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success-100 text-success-600">
                  <CheckCircle2 size={16} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink-900">
                    Pago {h.numero} de {creditoKelder.pagosTotales}
                  </p>
                  <p className="text-sm text-ink-500">Pagado · {h.fecha}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-ink-900">{formatMXN(h.monto)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { ChevronLeft, CalendarClock, CheckCircle2 } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { cuenta, pagosMayoristas, iniciales, formatMXN } from "@/lib/mock-data";

/**
 * Detalle de Crédito Kelder — the credit's own screen. The payment calendar lives here
 * (no longer a separate navigation from the main screen). Crédito Kelder stays independent
 * from vales: this screen never shows vale information.
 */
export function CreditoDetalle() {
  const navigate = useNavigate();
  const { saldoPendiente, proximoPago, valesActivos } = cuenta.credito;

  // Upcoming payments across active credits, soonest first.
  const proximos = [...pagosMayoristas].sort((a, b) => (a.enDias ?? 0) - (b.enDias ?? 0));

  // Synthesized payment history (payments already made per credit).
  const historial = pagosMayoristas.flatMap((p) =>
    Array.from({ length: p.pagoActual - 1 }, (_, i) => ({
      id: `${p.id}-${i}`,
      mayorista: p.mayorista,
      pago: i + 1,
      total: p.pagosTotales,
      monto: p.monto,
    })),
  );

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate("/vales")}
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl pr-3 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Crédito y vales
      </button>

      <TopBar title="Crédito Kelder" subtitle="El detalle de tu crédito y su calendario de pagos." />

      {/* summary */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          <div>
            <p className="text-sm text-ink-500">Saldo pendiente total</p>
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
          <div className="sm:border-l sm:border-ink-100 sm:pl-5">
            <p className="text-sm text-ink-500">Créditos activos</p>
            <p className="mt-0.5 text-2xl font-semibold text-ink-900">{valesActivos}</p>
          </div>
        </div>
      </div>

      {/* payment calendar */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">Calendario de próximos pagos</h2>
        <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
          {proximos.map((p) => (
            <div key={p.id} className="flex items-center gap-3 px-4 py-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500">
                <CalendarClock size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink-900">{p.fecha} · {p.mayorista}</p>
                <p className="text-sm text-ink-500">
                  Pago {p.pagoActual} de {p.pagosTotales}
                  {p.enDias !== undefined && <> · en {p.enDias} días</>}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-ink-900">{formatMXN(p.monto)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* per-credit detail */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">Tus créditos activos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {pagosMayoristas.map((p) => {
            const progreso = Math.round(((p.pagoActual - 1) / p.pagosTotales) * 100);
            return (
              <div key={p.id} className="rounded-2xl border border-ink-100 bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-ink-50 text-[11px] font-semibold text-ink-700">
                    {iniciales(p.mayorista)}
                  </span>
                  <p className="font-medium text-ink-900">{p.mayorista}</p>
                </div>
                <p className="mt-3 text-sm text-ink-500">
                  Próximo pago <span className="font-semibold text-ink-900">{formatMXN(p.monto)}</span> · {p.fecha}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-kelder-600" style={{ width: `${progreso}%` }} />
                  </div>
                  <span className="shrink-0 text-sm text-ink-500">Pago {p.pagoActual} de {p.pagosTotales}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* payment history */}
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
                    Pago {h.pago} de {h.total} · {h.mayorista}
                  </p>
                  <p className="text-sm text-ink-500">Pagado</p>
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

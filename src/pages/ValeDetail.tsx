import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, User, CalendarClock, CheckCircle2, Circle, Ticket, Sparkles } from "lucide-react";
import { StatusPill } from "@/components/ui/StatusPill";
import { CrediValeLogo } from "@/components/ui/CrediValeCard";
import { vales, formatMXN, type Vale } from "@/lib/mock-data";

/**
 * CrediVale detail — one screen, three shapes. A DISPONIBLE voucher shows what can be used
 * (no payments). An EN PAGO one is all about its quincenal payments, progress and calendar.
 * A VENCIDO one shows only what was authorized and when it expired. Never Crédito Kelder data.
 */
export function ValeDetail({ vale: valeProp }: { vale?: Vale }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const vale = valeProp ?? vales.find((v) => v.id === id) ?? vales[0];

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={() => navigate("/vales")}
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl pr-3 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Mis CrediVales
      </button>

      {vale.estado === "extravale" ? (
        <h1 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">Extravale</h1>
      ) : (
        <h1 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">CrediVale {vale.folio}</h1>
      )}
      <p className="mb-4 mt-1 inline-flex items-center gap-1.5 text-sm text-ink-500">
        <User size={15} className="text-ink-400" aria-hidden="true" />
        Mayorista <span className="font-medium text-ink-900">{vale.mayoristaPersona}</span>
      </p>

      {vale.estado === "en_pago" ? (
        <EnPagoDetalle vale={vale} />
      ) : vale.estado === "extravale" ? (
        <ExtravaleDetalle vale={vale} />
      ) : vale.estado === "vencido" ? (
        <VencidoDetalle vale={vale} />
      ) : (
        <DisponibleDetalle vale={vale} />
      )}
    </div>
  );
}

/* ── Disponible: what you can still use, no payments ── */
function DisponibleDetalle({ vale }: { vale: Vale }) {
  return (
    <>
      <div className="rounded-2xl border border-ink-100 bg-white p-6">
        <div className="flex items-start justify-between gap-3">
          <CrediValeLogo className="h-7" />
          <StatusPill estado={vale.estado} />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Puedes utilizar hasta</p>
        <p className="mt-0.5 text-4xl font-semibold tracking-tight text-ink-900">{formatMXN(vale.monto)}</p>
      </div>

      <dl className="mt-4 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
        {[
          ["Estado", <StatusPill key="s" estado={vale.estado} />],
          ["Folio", vale.folio],
          ["Mayorista", vale.mayoristaPersona],
          ["Vigente hasta", vale.fechaVigencia],
          ["Emitido", vale.fechaEmision],
        ].map(([label, value], i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <dt className="text-sm text-ink-500">{label}</dt>
            <dd className="text-sm font-medium text-ink-900">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 pb-4 text-sm text-ink-500">
        Este CrediVale aún no ha sido utilizado. Cuando lo uses, generará pagos quincenales que verás aquí.
      </p>
    </>
  );
}

/* ── Vencido: expired without use ── */
function VencidoDetalle({ vale }: { vale: Vale }) {
  return (
    <>
      <div className="rounded-2xl border border-ink-100 bg-white p-6">
        <div className="flex items-start justify-between gap-3">
          <CrediValeLogo className="h-7 opacity-60" />
          <StatusPill estado={vale.estado} />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Monto que estuvo autorizado</p>
        <p className="mt-0.5 text-4xl font-semibold tracking-tight text-ink-700">{formatMXN(vale.monto)}</p>
      </div>

      <dl className="mt-4 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
        {[
          ["Estado", <StatusPill key="s" estado={vale.estado} />],
          ["Folio", vale.folio],
          ["Mayorista", vale.mayoristaPersona],
          ["Venció el", vale.fechaVigencia],
        ].map(([label, value], i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <dt className="text-sm text-ink-500">{label}</dt>
            <dd className="text-sm font-medium text-ink-900">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 pb-4 text-sm text-ink-500">
        Este CrediVale venció sin ser utilizado, por lo que no generó pagos.
      </p>
    </>
  );
}

/* ── Extravale: leftover available balance from a used CrediVale (not a debt) ── */
function ExtravaleDetalle({ vale }: { vale: Vale }) {
  const navigate = useNavigate();
  return (
    <>
      {/* Extravale keeps ITS OWN identity — no CrediVale logo here */}
      <div className="rounded-2xl border border-ink-100 bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-success-700">
            <Sparkles size={13} aria-hidden="true" />
            Extravale
          </span>
          <StatusPill estado={vale.estado} />
        </div>
        <p className="mt-4 text-4xl font-semibold tracking-tight text-ink-900">{formatMXN(vale.disponible)} disponibles</p>
        <p className="text-sm text-ink-500">Saldo restante de tu CrediVale</p>
      </div>

      <dl className="mt-4 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
        {[
          ["Estado", <StatusPill key="s" estado={vale.estado} />],
          ["Origen", `CrediVale ${vale.origenFolio}`],
          ["Mayorista", vale.mayoristaPersona],
          ["Vigente hasta", vale.fechaVigencia],
        ].map(([label, value], i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <dt className="text-sm text-ink-500">{label}</dt>
            <dd className="text-sm font-medium text-ink-900">{value}</dd>
          </div>
        ))}
      </dl>

      {vale.origenId && (
        <button
          onClick={() => navigate(`/vales/${vale.origenId}`)}
          className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-kelder-600"
        >
          <Ticket size={16} aria-hidden="true" />
          Ver CrediVale de origen
          <ChevronRight size={15} aria-hidden="true" />
        </button>
      )}

      <p className="mt-4 pb-4 text-sm text-ink-500">
        Este Extravale es saldo disponible que te sobró de tu CrediVale. Úsalo cuando quieras antes de su vigencia.
      </p>
    </>
  );
}

/* ── En pago: used voucher with quincenal payments ── */
function EnPagoDetalle({ vale }: { vale: Vale }) {
  const navigate = useNavigate();
  const pagosTotales = vale.pagosTotales ?? 0;
  const realizados = (vale.pagoActual ?? 1) - 1;
  const progreso = pagosTotales ? Math.round((realizados / pagosTotales) * 100) : 0;
  const historial = (vale.pagos ?? []).filter((p) => p.estado === "pagado");

  return (
    <>
      {/* Saldo restante → Extravale generado (available money, not a debt) */}
      {vale.extravaleId && vale.extravaleMonto !== undefined && (
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-success-100 bg-success-50 p-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-success-600">Saldo restante</p>
            <p className="mt-0.5 text-sm text-ink-700">
              Extravale generado <span className="font-semibold text-ink-900">{formatMXN(vale.extravaleMonto)} disponibles</span>
            </p>
          </div>
          <button
            onClick={() => navigate(`/vales/${vale.extravaleId}`)}
            className="inline-flex min-h-[40px] shrink-0 items-center gap-1 text-sm font-semibold text-kelder-600"
          >
            Ver Extravale
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* resumen — the four figures the user needs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Monto utilizado", formatMXN(vale.utilizado)],
          ["Saldo pendiente", formatMXN(vale.saldoPendiente ?? 0)],
          ["Pago quincenal", formatMXN(vale.proximoPago?.monto ?? 0)],
          ["Próximo pago", vale.proximoPago?.fecha ?? "—"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-ink-100 bg-white p-4">
            <p className="text-sm text-ink-500">{label}</p>
            <p className="mt-0.5 text-lg font-semibold text-ink-900">{value}</p>
          </div>
        ))}
      </div>

      {/* avance */}
      <section className="mt-6">
        <h2 className="mb-2 text-lg font-semibold text-ink-900">Avance de pagos</h2>
        <div className="rounded-2xl border border-ink-100 bg-white p-5">
          <p className="text-sm text-ink-700">
            <span className="font-semibold text-ink-900">{realizados} de {pagosTotales}</span> pagos realizados
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-kelder-600" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </section>

      {/* calendario */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">Calendario de pagos</h2>
        <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
          {(vale.pagos ?? []).map((p) => {
            const Icon = p.estado === "pagado" ? CheckCircle2 : p.estado === "proximo" ? CalendarClock : Circle;
            const tint =
              p.estado === "pagado"
                ? "bg-success-100 text-success-600"
                : p.estado === "proximo"
                  ? "bg-kelder-50 text-kelder-600"
                  : "bg-ink-50 text-ink-400";
            const etiqueta = p.estado === "pagado" ? "Pagado" : p.estado === "proximo" ? "Próximo" : "Pendiente";
            return (
              <div key={p.id} className="flex items-center gap-3 px-4 py-3.5">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tint}`}>
                  <Icon size={16} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink-900">Pago {p.numero} de {pagosTotales}</p>
                  <p className="text-sm text-ink-500">{etiqueta} · {p.fecha}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-ink-900">{formatMXN(p.monto)}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* historial */}
      {historial.length > 0 && (
        <section className="mt-6 pb-4">
          <h2 className="mb-3 text-lg font-semibold text-ink-900">Historial de pagos</h2>
          <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
            {historial.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success-100 text-success-600">
                  <CheckCircle2 size={16} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink-900">Pago {p.numero} de {pagosTotales}</p>
                  <p className="text-sm text-ink-500">Pagado · {p.fecha}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-ink-900">{formatMXN(p.monto)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

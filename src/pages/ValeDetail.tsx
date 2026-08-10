import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { StatusPill } from "@/components/ui/StatusPill";
import { CrediValeWordmark } from "@/components/ui/CrediValeCard";
import { vales, user, formatMXN, type Vale } from "@/lib/mock-data";

export function ValeDetail({ vale: valeProp }: { vale?: Vale }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const vale = valeProp ?? vales.find((v) => v.id === id) ?? vales[0];
  const progreso = Math.round((vale.disponible / vale.monto) * 100);
  const parcial = vale.utilizado > 0 && vale.disponible > 0;

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={() => navigate("/vales")}
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl pr-3 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Crédito y vales
      </button>

      {/* credential header — monto AUTORIZADO is the CrediVale's hero figure */}
      <div className="rounded-2xl border border-ink-100 bg-white p-6">
        <div className="flex items-start justify-between gap-3">
          <CrediValeWordmark />
          <StatusPill estado={vale.estado} />
        </div>
        <span className="mt-4 inline-flex w-fit items-center rounded-full bg-ink-50 px-3 py-1 font-mono text-sm tracking-wide text-ink-600">
          {vale.folio}
        </span>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Monto autorizado</p>
        <p className="mt-0.5 text-4xl font-semibold tracking-tight text-ink-900">{formatMXN(vale.monto)}</p>
        <p className="text-sm text-ink-500">{formatMXN(vale.disponible)} disponibles</p>
        {parcial && (
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-kelder-600" style={{ width: `${progreso}%` }} />
          </div>
        )}
      </div>

      {/* amounts */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          ["Monto autorizado", formatMXN(vale.monto)],
          ["Disponible", formatMXN(vale.disponible)],
          ["Utilizado", formatMXN(vale.utilizado)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-ink-100 bg-white p-4">
            <p className="text-sm text-ink-500">{label}</p>
            <p className="mt-0.5 text-lg font-semibold text-ink-900">{value}</p>
          </div>
        ))}
      </div>

      {/* credential detail — the full CrediVale data */}
      <dl className="mt-4 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
        {[
          ["Estado", <StatusPill key="s" estado={vale.estado} />],
          ["Titular", vale.titular ?? user.nombreCompleto.toUpperCase()],
          ["Celular", vale.celular ?? "—"],
          ["Folio", vale.folio],
          ["Vigencia", vale.fechaVigencia],
          ["Emitido", vale.fechaEmision],
          ["Mayorista", vale.mayoristaPersona],
          ["Postergado", vale.postergado ? "Sí" : "No"],
        ].map(([label, value], i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <dt className="text-sm text-ink-500">{label}</dt>
            <dd className="text-sm font-medium text-ink-900">{value}</dd>
          </div>
        ))}
      </dl>

      {/* purchases made with this vale */}
      {vale.compras && vale.compras.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-medium text-ink-500">Compras con este CrediVale</h2>
          <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
            {vale.compras.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink-900">{c.tienda}</p>
                  <p className="text-sm text-ink-500">{c.fecha}</p>
                </div>
                <p className="text-sm font-semibold text-ink-900">{formatMXN(c.monto)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* movements */}
      {vale.movimientos && vale.movimientos.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-medium text-ink-500">Movimientos</h2>
          <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
            {vale.movimientos.map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-4 py-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    m.tipo === "emision" ? "bg-success-100 text-success-600" : "bg-ink-50 text-ink-500"
                  }`}
                >
                  {m.tipo === "emision" ? <ArrowDownLeft size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-900">{m.concepto}</p>
                  <p className="text-sm text-ink-500">{m.fecha}</p>
                </div>
                <p className={`text-sm font-semibold ${m.tipo === "emision" ? "text-success-600" : "text-ink-500"}`}>
                  {m.tipo === "emision" ? "+" : "-"}
                  {formatMXN(m.monto)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <p className="mt-4 pb-4 text-sm text-ink-500">
        Presenta este CrediVale en caja o úsalo en línea con el correo asociado a tu cuenta Kelder Club.
      </p>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import {
  CrediValeDisponibleCard,
  CrediValeEnPagoCard,
  CrediValeVencidoCard,
  ExtravaleCard,
} from "@/components/ui/CrediValeCard";
import { CrediValesEmpty } from "@/components/ui/CrediValesEmpty";
import { CreditoKelderCard } from "@/components/ui/CreditoKelderCard";
import { vales as valesDefault, creditoKelder, resumenCrediVales, formatMXN, type Vale } from "@/lib/mock-data";

type Tab = "disponibles" | "en_pago" | "extravales" | "vencidos";
const estadoDeTab: Record<Tab, Vale["estado"]> = {
  disponibles: "disponible",
  en_pago: "en_pago",
  extravales: "extravale",
  vencidos: "vencido",
};
const tabs: { key: Tab; label: string }[] = [
  { key: "disponibles", label: "Disponibles" },
  { key: "en_pago", label: "En pago" },
  { key: "extravales", label: "Extravales" },
  { key: "vencidos", label: "Vencidos" },
];

/**
 * Crédito Kelder and CrediVale are DIFFERENT, independent products. This screen keeps them
 * in two separate blocks. Within CrediVales the tabs mean different things: Disponibles are
 * UNUSED (no payments), En pago are USED (quincenal payments), Vencidos expired unused.
 */
export function Vales({
  vales = valesDefault,
  tieneCredito = true,
  initialTab = "disponibles",
}: {
  vales?: Vale[];
  tieneCredito?: boolean;
  initialTab?: Tab;
}) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>(initialTab);
  const cuenta = (t: Tab) => vales.filter((v) => v.estado === estadoDeTab[t]).length;
  const lista = vales.filter((v) => v.estado === estadoDeTab[tab]);
  const sinNada = !tieneCredito && vales.length === 0; // discovery state

  return (
    <div>
      <TopBar
        title="Crédito y vales"
        subtitle={sinNada ? "Consulta aquí tus opciones de crédito y CrediVales." : "Consulta tu Crédito Kelder y administra tus CrediVales."}
      />

      {/* ───────────── Product A · Crédito Kelder (independent) ─────────────
          Has credit → real summary (labelled block). No credit → the red invitation card
          (it carries its own "Crédito Kelder" identity, so no outer eyebrow). */}
      <section aria-label="Crédito Kelder" className="mb-10 md:mb-14">
        {tieneCredito ? (
          <>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Crédito Kelder</h2>
            <CreditoBlock onDetalle={() => navigate("/credito")} />
          </>
        ) : (
          <CreditoKelderCard onConocer={() => navigate("/")} />
        )}
      </section>

      {/* ───────────── Product B · Mis CrediVales (independent) ─────────────
          Has vouchers → labelled tabs + cards. None → the CrediVale invitation banner
          (white + blue illustration; it carries its own identity, so no outer eyebrow). */}
      <section aria-label="Mis CrediVales">
        {vales.length === 0 ? (
          <CrediValesEmpty onConocer={() => navigate("/")} />
        ) : (
          <>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Mis CrediVales</h2>
            <p className="mb-4 mt-1 text-sm text-ink-500">Consulta tus vales, el saldo disponible y los pagos asociados a cada mayorista.</p>

            {/* tabs with counts */}
            <div className="mb-6 inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-ink-100 bg-white p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`min-h-[40px] shrink-0 rounded-full px-4 text-sm font-medium transition-colors ${
                    tab === t.key ? "bg-kelder-600 text-white" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {t.label} <span className={tab === t.key ? "text-white/80" : "text-ink-400"}>({cuenta(t.key)})</span>
                </button>
              ))}
            </div>

            {lista.length === 0 ? (
              <p className="rounded-2xl border border-ink-100 bg-white px-5 py-8 text-center text-sm text-ink-500">
                No tienes CrediVales en esta sección.
              </p>
            ) : tab === "disponibles" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lista.map((v) => (
                  <CrediValeDisponibleCard key={v.id} vale={v} onClick={() => navigate(`/vales/${v.id}`)} />
                ))}
              </div>
            ) : tab === "vencidos" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lista.map((v) => (
                  <CrediValeVencidoCard key={v.id} vale={v} onClick={() => navigate(`/vales/${v.id}`)} />
                ))}
              </div>
            ) : tab === "extravales" ? (
              <>
                <p className="mb-4 max-w-2xl text-sm text-ink-500">
                  Saldo que te sobró de un CrediVale que ya utilizaste. Sigue disponible para que lo uses cuando quieras.
                </p>
                {/* máximo 2 por fila en desktop */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {lista.map((v) => (
                    <ExtravaleCard key={v.id} vale={v} onClick={() => navigate(`/vales/${v.id}`)} />
                  ))}
                </div>
              </>
            ) : (
              <EnPago lista={lista} onOpen={(id) => navigate(`/vales/${id}`)} />
            )}
          </>
        )}
      </section>
    </div>
  );
}

/* ─────────────────────────── En pago tab ─────────────────────────── */

function EnPago({ lista, onOpen }: { lista: Vale[]; onOpen: (id: string) => void }) {
  const { saldoPendiente, proximaQuincena, proximaFecha, enPago } = resumenCrediVales;
  // Rows that fall in the soonest fortnight (drive the "total esta quincena").
  const quincena = lista.filter((v) => v.proximoPago?.fecha === proximaFecha);
  const total = quincena.reduce((s, v) => s + (v.proximoPago?.monto ?? 0), 0);

  return (
    <div className="space-y-8">
      {/* Resumen de CrediVales — explicitly labelled, never confused with Crédito Kelder */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6">
        <h3 className="text-base font-semibold text-ink-900">Resumen de tus CrediVales en pago</h3>
        <p className="mt-0.5 text-sm text-ink-500">Consulta cuánto tienes pendiente y tus próximos pagos quincenales.</p>

        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4">
          <div>
            <p className="text-sm text-ink-500">Saldo pendiente en CrediVales</p>
            <p className="mt-0.5 text-2xl font-semibold tracking-tight text-ink-900">{formatMXN(saldoPendiente)}</p>
            <p className="mt-0.5 text-xs text-ink-400">Total pendiente de todos tus CrediVales</p>
          </div>
          <div className="sm:border-l sm:border-ink-100 sm:pl-5">
            <p className="text-sm text-ink-500">Próximo pago quincenal</p>
            <p className="mt-0.5 text-2xl font-semibold text-ink-900">{formatMXN(proximaQuincena)}</p>
            <p className="mt-0.5 text-xs text-ink-400">Suma de los pagos de la próxima quincena</p>
          </div>
          <div className="sm:border-l sm:border-ink-100 sm:pl-5">
            <p className="text-sm text-ink-500">Próxima fecha de pago</p>
            <p className="mt-0.5 text-2xl font-semibold text-ink-900">{proximaFecha}</p>
          </div>
          <div className="sm:border-l sm:border-ink-100 sm:pl-5">
            <p className="text-sm text-ink-500">CrediVales en pago</p>
            <p className="mt-0.5 text-2xl font-semibold text-ink-900">{enPago}</p>
          </div>
        </div>
      </div>

      {/* Desglose del próximo pago */}
      <div>
        <h3 className="text-base font-semibold text-ink-900">Tu próximo pago de CrediVales</h3>
        <p className="mb-3 mt-0.5 text-sm text-ink-500">Esto es lo que corresponde pagar en la próxima quincena.</p>

        {/* desktop: table */}
        <div className="hidden overflow-hidden rounded-2xl border border-ink-100 bg-white md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                <th className="px-4 py-3 font-medium">CrediVale</th>
                <th className="px-4 py-3 font-medium">Mayorista</th>
                <th className="px-4 py-3 font-medium">Pago quincenal</th>
                <th className="px-4 py-3 font-medium">Avance</th>
                <th className="px-4 py-3 font-medium">Próxima fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {quincena.map((v) => (
                <tr key={v.id}>
                  <td className="px-4 py-3 font-mono text-ink-600">{v.folio}</td>
                  <td className="px-4 py-3 text-ink-900">{v.mayoristaPersona}</td>
                  <td className="px-4 py-3 font-semibold text-ink-900">{formatMXN(v.proximoPago!.monto)}</td>
                  <td className="px-4 py-3 text-ink-500">{v.pagoActual} de {v.pagosTotales}</td>
                  <td className="px-4 py-3 text-ink-500">{v.proximoPago!.fecha}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink-100 bg-ink-50">
                <td className="px-4 py-3 font-semibold text-ink-900" colSpan={2}>Total a pagar esta quincena</td>
                <td className="px-4 py-3 text-lg font-bold text-kelder-600">{formatMXN(total)}</td>
                <td className="px-4 py-3 text-ink-400" colSpan={2}>{proximaFecha}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* mobile: cards + total */}
        <div className="space-y-3 md:hidden">
          {quincena.map((v) => (
            <div key={v.id} className="rounded-2xl border border-ink-100 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-ink-600">{v.folio}</span>
                <span className="text-lg font-semibold text-ink-900">{formatMXN(v.proximoPago!.monto)}</span>
              </div>
              <p className="mt-1 text-sm text-ink-500">
                {v.mayoristaPersona} · Pago {v.pagoActual} de {v.pagosTotales} · {v.proximoPago!.fecha}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-2xl border border-kelder-100 bg-kelder-50 px-4 py-3">
            <span className="text-sm font-semibold text-ink-900">Total a pagar esta quincena</span>
            <span className="text-lg font-bold text-kelder-600">{formatMXN(total)}</span>
          </div>
        </div>
      </div>

      {/* Detalle de CrediVales en pago */}
      <div>
        <h3 className="mb-3 text-base font-semibold text-ink-900">Detalle de CrediVales en pago</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {lista.map((v) => (
            <CrediValeEnPagoCard key={v.id} vale={v} onClick={() => onOpen(v.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Crédito Kelder block ─────────────────────────── */

function CreditoBlock({ onDetalle }: { onDetalle?: () => void }) {
  const { saldoPendiente, proximoPago, estado } = creditoKelder;
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6">
      <div className="flex justify-end">
        <button onClick={onDetalle} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-kelder-600">
          Ver mi Crédito Kelder
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
      <div className="mt-1 grid grid-cols-2 gap-5 sm:grid-cols-4">
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
        <div className="sm:border-l sm:border-ink-100 sm:pl-5">
          <p className="text-sm text-ink-500">Estado</p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-base font-semibold text-success-600">
            <span className="h-2 w-2 rounded-full bg-success-600" aria-hidden="true" />
            {estado}
          </p>
        </div>
      </div>
    </div>
  );
}


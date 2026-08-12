import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

// Main CrediVale navigation prioritizes what the member can act on NOW. Disponibles = UNUSED
// (usable), En pago = USED (quincenal payments), Extravales = leftover AVAILABLE money (its own
// tab — high value, never buried), Historial = past/non-actionable (vencidos, utilizados).
type MainTab = "disponibles" | "en_pago" | "extravales" | "historial";
type HistFiltro = "todos" | "vencidos" | "utilizados";
// Legacy tab values (older storyboards) map onto the new structure.
type InitialTab = MainTab | "vencidos";

const mainTabs: { key: MainTab; label: string }[] = [
  { key: "disponibles", label: "Disponibles" },
  { key: "en_pago", label: "En pago" },
  { key: "extravales", label: "Extravales" },
  { key: "historial", label: "Historial" },
];
const histChips: { key: HistFiltro; label: string; estados: Vale["estado"][] }[] = [
  { key: "todos", label: "Todos", estados: ["vencido", "utilizado"] },
  { key: "vencidos", label: "Vencidos", estados: ["vencido"] },
  { key: "utilizados", label: "Utilizados", estados: ["utilizado"] },
];

function mapInitial(t: InitialTab): { tab: MainTab; hist: HistFiltro } {
  if (t === "vencidos") return { tab: "historial", hist: "vencidos" };
  return { tab: t, hist: "todos" };
}

/**
 * Crédito Kelder and CrediVale are DIFFERENT, independent products. This screen keeps them
 * in two separate blocks. The screen leads with what's actionable (Disponibles / En pago);
 * the past lives behind "Historial" so it never pushes current items down the scroll.
 */
export function Vales({
  vales = valesDefault,
  tieneCredito = true,
  initialTab = "disponibles",
}: {
  vales?: Vale[];
  tieneCredito?: boolean;
  initialTab?: InitialTab;
}) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const queryTab = params.get("tab") as InitialTab | null;
  const init = mapInitial(queryTab ?? initialTab);
  const [tab, setTab] = useState<MainTab>(init.tab);
  const [hist, setHist] = useState<HistFiltro>(init.hist);

  const disponiblesList = vales.filter((v) => v.estado === "disponible");
  const enPagoList = vales.filter((v) => v.estado === "en_pago");
  const extravalesList = vales.filter((v) => v.estado === "extravale");
  const histEstados = histChips.find((c) => c.key === hist)!.estados;
  const histList = vales.filter((v) => histEstados.includes(v.estado));
  const cuentaTab: Record<MainTab, number | null> = {
    disponibles: disponiblesList.length,
    en_pago: enPagoList.length,
    extravales: extravalesList.length,
    historial: null,
  };

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

            {/* Extravale highlight — available money, easy to spot without digging into a CrediVale */}
            {extravalesList.length > 0 && (
              <button
                onClick={() => setTab("extravales")}
                className="mb-4 flex w-full items-center justify-between gap-4 rounded-2xl border border-success-100 bg-success-50 p-4 text-left"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-success-700">Extravale disponible</p>
                  <p className="mt-0.5 text-2xl font-semibold tracking-tight text-ink-900">
                    {formatMXN(extravalesList.reduce((s, v) => s + v.disponible, 0))}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-kelder-600">
                  Ver Extravale
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </button>
            )}

            {/* primary tabs — lead with what's actionable; Historial holds the past */}
            <div className="mb-6 inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-ink-100 bg-white p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mainTabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`min-h-[40px] shrink-0 rounded-full px-4 text-sm font-medium transition-colors ${
                    tab === t.key ? "bg-kelder-600 text-white" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {t.label}
                  {cuentaTab[t.key] !== null && (
                    <span className={tab === t.key ? "text-white/80" : "text-ink-400"}> ({cuentaTab[t.key]})</span>
                  )}
                </button>
              ))}
            </div>

            {/* content is swapped in place per tab — no long scroll to reach another category */}
            {tab === "disponibles" ? (
              disponiblesList.length === 0 ? (
                <EmptyRow>No tienes CrediVales disponibles por ahora.</EmptyRow>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {disponiblesList.map((v) => (
                    <CrediValeDisponibleCard key={v.id} vale={v} onClick={() => navigate(`/vales/${v.id}`)} />
                  ))}
                </div>
              )
            ) : tab === "en_pago" ? (
              enPagoList.length === 0 ? (
                <EmptyRow>No tienes CrediVales en pago.</EmptyRow>
              ) : (
                <EnPago lista={enPagoList} onOpen={(id) => navigate(`/vales/${id}`)} />
              )
            ) : tab === "extravales" ? (
              /* Extravales — leftover AVAILABLE money, its own tab so it's never buried */
              extravalesList.length === 0 ? (
                <EmptyRow>No tienes Extravales por ahora.</EmptyRow>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {extravalesList.map((v) => (
                    <ExtravaleCard key={v.id} vale={v} onClick={() => navigate(`/vales/${v.id}`)} />
                  ))}
                </div>
              )
            ) : (
              /* Historial — secondary sub-filters, then the filtered list */
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  {histChips.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setHist(c.key)}
                      className={`min-h-[36px] rounded-full border px-3.5 text-sm font-medium transition-colors ${
                        hist === c.key ? "border-kelder-600 bg-kelder-50 text-kelder-700" : "border-ink-200 text-ink-600 hover:bg-ink-50"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                {histList.length === 0 ? (
                  <EmptyRow>No tienes CrediVales en esta categoría.</EmptyRow>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {histList.map((v) => (
                      <CrediValeVencidoCard key={v.id} vale={v} onClick={() => navigate(`/vales/${v.id}`)} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function EmptyRow({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl border border-ink-100 bg-white px-5 py-8 text-center text-sm text-ink-500">{children}</p>
  );
}

/* ─────────────────────────── En pago tab ───────────────────────────
   Progressive disclosure: a single COMPACT summary (next payment + total pending), then the
   CrediVales directly. The old big resumen, próximo-pago table and "detalle" heading are gone —
   that Level-3 data now lives inside each CrediVale's detail. */

function EnPago({ lista, onOpen }: { lista: Vale[]; onOpen: (id: string) => void }) {
  const { saldoPendiente, proximaQuincena, proximaFecha } = resumenCrediVales;
  // Each CrediVale is a debt with a DIFFERENT mayorista — the summary must break the fortnight
  // down per mayorista, not only show a consolidated total.
  const quincena = lista.filter((v) => v.proximoPago?.fecha === proximaFecha);

  return (
    <div className="space-y-4">
      {/* Compact summary — total to pay next fortnight AND how much goes to each mayorista */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Próxima quincena</p>
        <p className="mt-0.5 text-lg font-semibold text-ink-900">{proximaFecha}</p>

        <div className="mt-3 flex items-baseline justify-between gap-3">
          <span className="text-sm text-ink-500">Total a pagar</span>
          <span className="text-2xl font-semibold tracking-tight text-ink-900">{formatMXN(proximaQuincena)}</span>
        </div>

        {/* per-mayorista breakdown of the fortnight */}
        <div className="mt-3 space-y-1.5 border-t border-ink-100 pt-3">
          {quincena.map((v) => (
            <div key={v.id} className="flex items-center justify-between text-sm">
              <span className="text-ink-600">{v.mayoristaPersona}</span>
              <span className="font-medium text-ink-900">{formatMXN(v.proximoPago!.monto)}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3 text-sm">
          <span className="text-ink-500">Deuda total en CrediVales</span>
          <span className="font-semibold text-ink-900">{formatMXN(saldoPendiente)}</span>
        </div>
      </div>

      {/* The CrediVales themselves — compact cards keep each mayorista's name + amounts, detail on demand */}
      <div className="grid gap-4 sm:grid-cols-2">
        {lista.map((v) => (
          <CrediValeEnPagoCard key={v.id} vale={v} onClick={() => onOpen(v.id)} />
        ))}
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


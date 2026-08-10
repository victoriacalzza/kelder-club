import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CreditCard } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { CrediValeCard } from "@/components/ui/CrediValeCard";
import { CrediValesEmpty } from "@/components/ui/CrediValesEmpty";
import { vales as valesDefault, cuenta, formatMXN, type Vale } from "@/lib/mock-data";

type Tab = "disponibles" | "utilizados" | "vencidos";
const tabs: { key: Tab; label: string }[] = [
  { key: "disponibles", label: "Disponibles" },
  { key: "utilizados", label: "Utilizados" },
  { key: "vencidos", label: "Vencidos" },
];

function enTab(v: Vale, t: Tab) {
  if (t === "disponibles") return v.estado === "activo" || v.estado === "por_vencer";
  if (t === "utilizados") return v.estado === "usado";
  return v.estado === "vencido";
}

/**
 * Crédito Kelder and CrediVale are DIFFERENT, independent products that can coexist. This
 * screen keeps them in two conceptually, visually and functionally separate blocks —
 * each with its own empty state — and never implies CrediVales belong to the credit.
 */
export function Vales({ vales = valesDefault, tieneCredito = true }: { vales?: Vale[]; tieneCredito?: boolean }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("disponibles");
  const lista = vales.filter((v) => enTab(v, tab));

  return (
    <div>
      <TopBar title="Crédito y vales" subtitle="Consulta tu Crédito Kelder y administra tus CrediVales." />

      {/* ───────────── Block A · Crédito Kelder (independent product) ───────────── */}
      <section aria-label="Crédito Kelder" className="mb-10">
        {tieneCredito ? <CreditoBlock onDetalle={() => navigate("/credito")} /> : <CreditoEmpty onConocer={() => navigate("/")} />}
      </section>

      {/* ───────────── Block B · Mis CrediVales (independent product) ───────────── */}
      <section aria-label="Mis CrediVales">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">Mis CrediVales</h2>

        {vales.length === 0 ? (
          <CrediValesEmpty onConocer={() => navigate("/")} />
        ) : (
          <>
            <div className="mb-6 inline-flex items-center gap-1 rounded-full border border-ink-100 bg-white p-1">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`min-h-[40px] rounded-full px-4 text-sm font-medium transition-colors ${
                    tab === t.key ? "bg-kelder-600 text-white" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {lista.length === 0 ? (
              <p className="rounded-2xl border border-ink-100 bg-white px-5 py-8 text-center text-sm text-ink-500">
                No tienes CrediVales en esta sección.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lista.map((v) => (
                  <CrediValeCard key={v.id} vale={v} onClick={() => navigate(`/vales/${v.id}`)} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function CreditoBlock({ onDetalle }: { onDetalle?: () => void }) {
  const { saldoPendiente, proximoPago, valesActivos } = cuenta.credito;
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
          <CreditCard size={18} strokeWidth={1.75} aria-hidden="true" />
          Crédito Kelder
        </p>
        <button onClick={onDetalle} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-kelder-600">
          Ver detalle del crédito
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-4">
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
          <p className="text-sm text-ink-500">Créditos activos</p>
          <p className="mt-0.5 text-2xl font-semibold text-ink-900">{valesActivos}</p>
        </div>
      </div>
    </div>
  );
}

function CreditoEmpty({ onConocer }: { onConocer?: () => void }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6 sm:p-7">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
        <CreditCard size={18} strokeWidth={1.75} aria-hidden="true" />
        Crédito Kelder
      </p>
      <p className="mt-3 text-xl font-semibold text-ink-900">¿Aún no tienes Crédito Kelder?</p>
      <p className="mt-1 max-w-md text-sm text-ink-500">Conoce las opciones disponibles para comprar a crédito.</p>
      <Button className="mt-4" onClick={onConocer}>
        Conocer Crédito Kelder
      </Button>
    </div>
  );
}

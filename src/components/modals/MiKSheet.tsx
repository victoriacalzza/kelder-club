import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PercentCircle, Ticket, Sparkles, CreditCard, ArrowRight } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { KelderCodigo } from "@/components/ui/KelderCodigo";
import { cuenta, formatMXN, resumenCrediValesDisponibles, extravales } from "@/lib/mock-data";

/**
 * "Mi K" — the member's in-store identity. Shows the identification/payment code FIRST (present at
 * the register), then the resources they can choose to use. The K is no longer only cashback.
 * NOTE: selecting a resource is VISUAL ONLY for now — the architecture is ready for a future POS
 * integration that applies the chosen balance; nothing is applied automatically yet.
 */
type Recurso = "cashback" | "credivales" | "extravales" | "credito";

export function MiKSheet({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [sel, setSel] = useState<Recurso>("cashback");
  const extravaleTotal = extravales.reduce((s, v) => s + v.disponible, 0);

  const recursos: { key: Recurso; label: string; monto?: string; sub?: string; icon: typeof PercentCircle; tint: string }[] = [
    { key: "cashback", label: "Cashback", monto: formatMXN(cuenta.cashbackDisponible), icon: PercentCircle, tint: "bg-success-100 text-success-600" },
    { key: "credivales", label: "CrediVales disponibles", monto: formatMXN(resumenCrediValesDisponibles.total), sub: `${resumenCrediValesDisponibles.count} disponibles`, icon: Ticket, tint: "bg-kelder-50 text-kelder-600" },
    ...(extravaleTotal > 0 ? [{ key: "extravales" as const, label: "Extravales", monto: formatMXN(extravaleTotal), icon: Sparkles, tint: "bg-success-100 text-success-600" }] : []),
    { key: "credito", label: "Crédito Kelder", sub: "Paga a quincenas", icon: CreditCard, tint: "bg-info-100 text-info-700" },
  ];

  return (
    <Sheet title="Mi K" description="Muéstralo en caja para identificarte y pagar." onClose={onClose}>
      <KelderCodigo />

      <div className="mt-6">
        <p className="text-sm font-semibold text-ink-900">¿Qué quieres usar al pagar?</p>
        <p className="mt-0.5 text-xs text-ink-400">Selecciónalo antes de pagar en caja. Por ahora es informativo.</p>

        <div className="mt-3 space-y-2">
          {recursos.map((r) => {
            const on = sel === r.key;
            return (
              <button
                key={r.key}
                onClick={() => setSel(r.key)}
                aria-pressed={on}
                className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                  on ? "border-kelder-600 bg-kelder-50/60" : "border-ink-100 bg-white hover:bg-ink-50"
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${r.tint}`} aria-hidden="true">
                  <r.icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium text-ink-900">{r.label}</span>
                  {r.sub && <span className="block text-xs text-ink-500">{r.sub}</span>}
                </span>
                {r.monto && <span className="shrink-0 text-[15px] font-semibold text-ink-900">{r.monto}</span>}
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${on ? "border-kelder-600" : "border-ink-300"}`} aria-hidden="true">
                  {on && <span className="h-2.5 w-2.5 rounded-full bg-kelder-600" />}
                </span>
              </button>
            );
          })}
        </div>

        {sel === "extravales" && extravaleTotal > 0 && (
          <button
            onClick={() => {
              onClose();
              navigate("/vales?tab=extravales");
            }}
            className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-kelder-600"
          >
            Ver Extravale
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        )}
      </div>
    </Sheet>
  );
}

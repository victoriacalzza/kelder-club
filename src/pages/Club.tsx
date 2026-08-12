import { useNavigate } from "react-router-dom";
import {
  PercentCircle,
  ShoppingBag,
  CreditCard,
  Ticket,
  Gift,
  BadgePercent,
  Settings,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import {
  user,
  cuenta,
  creditoKelder,
  credivalesEnPago,
  credivalesDisponibles,
  formatMXN,
} from "@/lib/mock-data";

/**
 * "Mi Club" — the member's personal hub. It doesn't duplicate any logic; it's a clean set of
 * entry points into the existing sections (cashback, compras, Crédito Kelder, CrediVales,
 * perfil) plus placeholders for benefits/coupons that will come later. Crédito Kelder and
 * CrediVale stay as two DIFFERENT products, each with its own entry.
 */
interface Entry {
  label: string;
  desc: string;
  icon: typeof PercentCircle;
  tint: string;
  to?: string;
  soon?: boolean;
}

export function Club() {
  const navigate = useNavigate();

  const entries: Entry[] = [
    { label: "Mi cashback", desc: `${formatMXN(cuenta.cashbackDisponible)} disponibles`, icon: PercentCircle, tint: "bg-success-100 text-success-600", to: "/cashback" },
    { label: "Mis compras", desc: "Historial, pedidos y cashback generado", icon: ShoppingBag, tint: "bg-info-100 text-info-700", to: "/compras" },
    { label: "Crédito Kelder", desc: `Tu crédito personal · saldo ${formatMXN(creditoKelder.saldoPendiente)}`, icon: CreditCard, tint: "bg-kelder-50 text-kelder-600", to: "/credito" },
    { label: "CrediVales", desc: `${credivalesEnPago.length} en pago · ${credivalesDisponibles.length} disponibles`, icon: Ticket, tint: "bg-ink-100 text-ink-700", to: "/vales" },
    { label: "Beneficios", desc: "Promociones y experiencias del grupo", icon: Gift, tint: "bg-warning-100 text-warning-600", soon: true },
    { label: "Cupones y recompensas", desc: "Tus cupones canjeables", icon: BadgePercent, tint: "bg-success-100 text-success-600", soon: true },
    { label: "Perfil y configuración", desc: "Tus datos y preferencias", icon: Settings, tint: "bg-ink-100 text-ink-600", to: "/perfil" },
  ];

  return (
    <div>
      <TopBar title="Mi Club" subtitle={`Hola, ${user.nombre}. Aquí gestionas tu cuenta y tus beneficios.`} />

      {/* Cashback highlight — quick access to the primary benefit */}
      <button
        onClick={() => navigate("/cashback")}
        className="mb-6 flex w-full items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 text-left shadow-soft transition-shadow hover:shadow-card"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success-100 text-success-600" aria-hidden="true">
          <PercentCircle size={24} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-ink-500">Cashback disponible</p>
          <p className="text-2xl font-semibold tracking-tight text-ink-900">{formatMXN(cuenta.cashbackDisponible)}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-kelder-600">
          Ver movimientos
          <ArrowRight size={15} aria-hidden="true" />
        </span>
      </button>

      {/* Entradas de la cuenta */}
      <div className="grid gap-3 sm:grid-cols-2">
        {entries.map((e) => {
          const Icon = e.icon;
          const inner = (
            <>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${e.tint}`} aria-hidden="true">
                <Icon size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-medium text-ink-900">
                  {e.label}
                  {e.soon && (
                    <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-500">Pronto</span>
                  )}
                </p>
                <p className="truncate text-sm text-ink-500">{e.desc}</p>
              </div>
              {!e.soon && <ChevronRight size={18} className="shrink-0 text-ink-400" aria-hidden="true" />}
            </>
          );
          return e.soon ? (
            <div key={e.label} className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 opacity-70">
              {inner}
            </div>
          ) : (
            <button
              key={e.label}
              onClick={() => e.to && navigate(e.to)}
              className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 text-left transition-shadow hover:shadow-soft"
            >
              {inner}
            </button>
          );
        })}
      </div>
    </div>
  );
}

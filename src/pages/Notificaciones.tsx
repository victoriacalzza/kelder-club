import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PercentCircle, Tag, CreditCard, Truck, Store, Bell } from "lucide-react";
import { BackButton } from "@/components/layout/BackButton";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import { notificaciones as seed, type Notificacion, type NotificacionTipo } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

/**
 * Notificaciones — a full navigation screen (NOT a modal), reached from the header bell. Clean
 * vertical list (no big cards): category icon · title · description · time · a small red dot only
 * when unread. Every row is fully clickable and deep-links to its related content; going back
 * from that detail returns here. Prepared to grow as more notification types appear.
 */
const iconoDe: Record<NotificacionTipo, { icon: typeof Bell; tint: string }> = {
  cashback: { icon: PercentCircle, tint: "bg-success-100 text-success-700" },
  promo: { icon: Tag, tint: "bg-kelder-50 text-kelder-600" },
  credito: { icon: CreditCard, tint: "bg-info-100 text-info-700" },
  pedido: { icon: Truck, tint: "bg-info-100 text-info-700" },
  tienda: { icon: Store, tint: "bg-ink-100 text-ink-600" },
};

export function Notificaciones() {
  const navigate = useNavigate();
  const { tienda } = useTiendaContexto();
  const [items, setItems] = useState<Notificacion[]>(seed);
  const noLeidas = items.filter((n) => !n.leida).length;

  const destino = (n: Notificacion) => (n.tipo === "tienda" ? `/tienda/${tienda?.id ?? "t1"}` : n.to ?? "/");

  const abrir = (n: Notificacion) => {
    setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, leida: true } : x)));
    track("product_view", { notificacion: n.id });
    navigate(destino(n));
  };

  return (
    <div className="mx-auto max-w-2xl">
      <BackButton />

      <div className="mb-5 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">Notificaciones</h1>
        {noLeidas > 0 && (
          <button
            onClick={() => setItems((prev) => prev.map((x) => ({ ...x, leida: true })))}
            className="shrink-0 text-sm font-semibold text-kelder-600 hover:text-kelder-700"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-white p-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-kelder-50 text-kelder-600" aria-hidden="true">
            <Bell size={26} />
          </span>
          <p className="font-medium text-ink-900">Sin notificaciones</p>
          <p className="max-w-sm text-sm text-ink-500">Aquí verás avisos de tu cashback, promociones, pedidos y tu tienda.</p>
        </div>
      ) : (
        <ul className="divide-y divide-ink-100">
          {items.map((n) => {
            const { icon: Icon, tint } = iconoDe[n.tipo];
            return (
              <li key={n.id}>
                <button onClick={() => abrir(n)} className="flex w-full items-start gap-3 py-4 text-left transition-colors hover:bg-ink-50/60">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tint}`} aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[15px] ${n.leida ? "font-medium text-ink-800" : "font-semibold text-ink-900"}`}>{n.titulo}</span>
                    <span className="mt-0.5 block text-sm text-ink-500">{n.detalle}</span>
                    <span className="mt-1 block text-xs text-ink-400">{n.tiempo}</span>
                  </span>
                  {!n.leida && <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-kelder-600" aria-label="No leída" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

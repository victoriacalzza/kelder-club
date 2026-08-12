import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { PercentCircle, Tag, CreditCard, Truck, Store, Bell } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { notificaciones, type NotificacionTipo } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

/**
 * Notifications panel — opened from the header bell. Mock data for now; each item deep-links to
 * the relevant section (cashback, promos, order, credit, store). Portaled to <body> so the
 * sticky header's backdrop-blur doesn't trap the fixed overlay.
 */
const iconoDe: Record<NotificacionTipo, { icon: typeof Bell; tint: string }> = {
  cashback: { icon: PercentCircle, tint: "bg-success-100 text-success-700" },
  promo: { icon: Tag, tint: "bg-kelder-50 text-kelder-600" },
  credito: { icon: CreditCard, tint: "bg-info-100 text-info-700" },
  pedido: { icon: Truck, tint: "bg-info-100 text-info-700" },
  tienda: { icon: Store, tint: "bg-ink-100 text-ink-600" },
};

export function NotificationsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  if (!open) return null;

  return createPortal(
    <Sheet title="Notificaciones" description="Avisos de cashback, promociones, pedidos y tu tienda." onClose={onClose}>
      {notificaciones.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-kelder-50 text-kelder-600" aria-hidden="true">
            <Bell size={26} />
          </span>
          <p className="font-medium text-ink-900">Sin notificaciones</p>
          <p className="max-w-xs text-sm text-ink-500">Aquí verás avisos de tu cashback, promociones y pedidos.</p>
        </div>
      ) : (
        <ul className="-mx-1 flex flex-col">
          {notificaciones.map((n) => {
            const { icon: Icon, tint } = iconoDe[n.tipo];
            return (
              <li key={n.id}>
                <button
                  onClick={() => {
                    track("product_view", { notificacion: n.id });
                    onClose();
                    if (n.to) navigate(n.to);
                  }}
                  className="flex w-full items-start gap-3 rounded-2xl px-2 py-3 text-left hover:bg-ink-50"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tint}`} aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="min-w-0 flex-1 text-[15px] font-medium text-ink-900">{n.titulo}</span>
                      {!n.leida && <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-kelder-600" aria-label="No leída" />}
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-500">{n.detalle}</span>
                    <span className="mt-0.5 block text-xs text-ink-400">{n.tiempo}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Sheet>,
    document.body,
  );
}

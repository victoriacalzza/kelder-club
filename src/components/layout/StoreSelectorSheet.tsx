import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Check, Store } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { useClub } from "@/lib/ClubContext";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import { sucursales } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

/**
 * Shared "Mi tienda" picker — the selected store is global context, so both the header
 * (StoreSwitcher) and the Tiendas tab ("Cambiar tienda") open THIS one sheet. Persists via
 * ClubContext. Portaled to <body> so the sticky header's backdrop-blur doesn't trap the fixed
 * overlay. Terminology: the chosen store is "Mi tienda"; the rest are "tiendas cerca de ti".
 */
export function StoreSelectorSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { setTiendaPreferida } = useClub();
  const { tienda } = useTiendaContexto();

  if (!open) return null;
  const ordenadas = [...sucursales].sort((a, b) => a.distanciaKm - b.distanciaKm);
  const seleccionadaId = tienda?.id;

  return createPortal(
    <Sheet title="Comprar cerca de ti" description="Elige tu tienda para consultar productos y disponibilidad." onClose={onClose}>
      <ul className="-mx-1 flex flex-col">
        {ordenadas.map((t) => {
          const activa = t.id === seleccionadaId;
          return (
            <li key={t.id}>
              <button
                onClick={() => {
                  setTiendaPreferida(t.id);
                  track("store_view", { tienda: t.id, origen: "selector" });
                  onClose();
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-2 py-3 text-left hover:bg-ink-50"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${activa ? "bg-kelder-600 text-white" : "bg-ink-50 text-ink-500"}`}
                  aria-hidden="true"
                >
                  {activa ? <Check size={18} /> : <Store size={17} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-medium text-ink-900">{t.nombre}</span>
                  <span className="block text-sm text-ink-500">
                    {t.distancia} ·{" "}
                    <span className={t.abierta ? "font-medium text-success-700" : "text-ink-500"}>{t.abierta ? "Abierta" : "Cerrada"}</span>
                  </span>
                </span>
                {activa && <span className="shrink-0 text-xs font-semibold text-kelder-600">Mi tienda</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => {
          onClose();
          navigate("/tiendas");
        }}
        className="mt-3 flex min-h-[48px] w-full items-center justify-center rounded-full border border-ink-200 text-sm font-semibold text-ink-700 hover:bg-ink-50"
      >
        Ver todas las tiendas
      </button>
    </Sheet>,
    document.body,
  );
}

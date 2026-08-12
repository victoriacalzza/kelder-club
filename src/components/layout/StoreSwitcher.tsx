import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { StoreSelectorSheet } from "@/components/layout/StoreSelectorSheet";
import { useTiendaContexto } from "@/lib/useTiendaContexto";

/**
 * The selected store, surfaced in the global header — transversal context, not decoration:
 * every product surface reads availability relative to it. Once resolved (chosen or nearest) it
 * is always "Mi tienda". Tapping opens the shared store picker. Compact single line to keep the
 * sticky header short.
 */
export function StoreSwitcher({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const { tienda } = useTiendaContexto();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex min-w-0 items-center gap-1.5 text-left ${compact ? "max-w-[70vw]" : ""}`}
        aria-label="Cambiar de tienda"
      >
        <MapPin size={15} className="shrink-0 text-kelder-600" aria-hidden="true" />
        <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-ink-400">Mi tienda</span>
        <span className="truncate text-[13px] font-semibold text-ink-900">{tienda?.nombre ?? "Elegir tienda"}</span>
        <ChevronDown size={14} className="shrink-0 text-ink-400" aria-hidden="true" />
      </button>

      <StoreSelectorSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}

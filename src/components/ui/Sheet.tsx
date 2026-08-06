import type { ReactNode } from "react";
import { X } from "lucide-react";

/**
 * Modal surface anchored as a centered card on desktop / bottom sheet on mobile.
 * Used for the QR display, the redeem flow, and vale detail.
 * The canvas for this component is at tempo/designs/design-system/sheet/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
interface SheetProps {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}

export function Sheet({ title, description, onClose, children }: SheetProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/40 sm:items-center">
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-modal sm:rounded-3xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-ink-900">{title}</h2>
            {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

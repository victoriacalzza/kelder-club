import { CreditCard, Ticket, ChevronRight } from "lucide-react";
import { StatusPill } from "./StatusPill";
import type { Vale } from "@/lib/mock-data";
import { formatMXN } from "@/lib/mock-data";

/**
 * Wallet-style card for a Vale or CrediVale digital — proportioned like a payment
 * card, not a product card, so it reads as a financial instrument.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
export function ValeCard({ vale, onClick }: { vale: Vale; onClick?: () => void }) {
  const isCredivale = vale.tipo === "credivale";
  const muted = vale.estado === "vencido";

  return (
    <button
      onClick={onClick}
      className={`block w-full rounded-3xl p-5 text-left shadow-card transition-opacity ${
        isCredivale ? "bg-ink-950 text-white" : "bg-white text-ink-900"
      } ${muted ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isCredivale ? "bg-white/10 text-white" : "bg-kelder-50 text-kelder-600"
          }`}
        >
          {isCredivale ? <CreditCard size={20} aria-hidden="true" /> : <Ticket size={20} aria-hidden="true" />}
        </span>
        <StatusPill estado={vale.estado} />
      </div>

      <p className={`mt-4 text-3xl font-semibold ${isCredivale ? "text-white" : "text-ink-900"}`}>
        {formatMXN(vale.monto)}
      </p>
      <p className={`mt-0.5 text-sm ${isCredivale ? "text-white/60" : "text-ink-500"}`}>
        {isCredivale ? "CrediVale digital" : "Vale de compra"} · {vale.mayorista}
      </p>

      <div className={`mt-4 flex items-center justify-between border-t pt-3 text-sm ${isCredivale ? "border-white/10 text-white/60" : "border-ink-100 text-ink-500"}`}>
        <span>Vigente hasta {vale.fechaVigencia}</span>
        <span className={`inline-flex items-center gap-0.5 font-medium ${isCredivale ? "text-white" : "text-kelder-600"}`}>
          Ver detalle
          <ChevronRight size={16} aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}

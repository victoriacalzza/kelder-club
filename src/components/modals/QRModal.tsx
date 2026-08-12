import { Sheet } from "@/components/ui/Sheet";
import { KelderCodigo } from "@/components/ui/KelderCodigo";
import { cuenta, formatMXN } from "@/lib/mock-data";

/**
 * "Paga con tu cashback" — the cashback-only payment sheet (Home hero, Cashback screen). The
 * bottom-nav K opens the richer "Mi K" sheet instead. Shares the code visual via KelderCodigo.
 */
export function QRModal({ onClose }: { onClose: () => void }) {
  return (
    <Sheet title="Paga con tu cashback" description="Muéstralo en caja antes de pagar." onClose={onClose}>
      <div className="mb-4 rounded-2xl bg-success-50 p-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-success-700/90">Saldo disponible</p>
        <p className="mt-0.5 text-3xl font-semibold tracking-tight text-success-700">{formatMXN(cuenta.cashbackDisponible)}</p>
      </div>
      <KelderCodigo />
    </Sheet>
  );
}

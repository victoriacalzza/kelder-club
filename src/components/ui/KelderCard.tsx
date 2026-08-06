import { QrCode, Sparkles } from "lucide-react";
import { cuenta, user, formatMXN } from "@/lib/mock-data";

/**
 * The Kelder Club wallet card — the emotional centerpiece of the Home. Designed to
 * feel like a premium financial / loyalty pass (Apple Wallet, Nubank, Mercado Pago):
 * available money is the hero, CrediVale + cashback are pills, membership level is the
 * badge, and a single unmistakable "Mostrar QR" is the one primary action.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
export function KelderCard({ onShowQR }: { onShowQR?: () => void }) {
  const disponible = cuenta.cashbackDisponible + cuenta.credivaleDisponible;

  return (
    <div
      className="sheen rise relative flex flex-col justify-between overflow-hidden rounded-[28px] p-6 text-white shadow-card"
      style={{
        background:
          "radial-gradient(120% 120% at 0% 0%, #f0555c 0%, #d3122a 38%, #9a0f22 78%, #7a1020 100%)",
        minHeight: 300,
      }}
    >
      {/* decorative rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgb(255 255 255 / 0.12), transparent)" }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-sm font-bold">K</span>
          <span className="text-[15px] font-semibold tracking-tight">Kelder Club</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
          <Sparkles size={13} aria-hidden="true" />
          {cuenta.nivel}
        </span>
      </div>

      <div className="relative mt-6">
        <p className="text-sm text-white/70">Disponible para tus compras</p>
        <p className="mt-1 text-[44px] font-semibold leading-none tracking-tight">{formatMXN(disponible)}</p>
        <p className="mt-2 text-sm text-white/80">{cuenta.beneficio}</p>
      </div>

      <div className="relative mt-6 flex gap-3">
        <div className="flex-1 rounded-2xl bg-white/12 px-3.5 py-2.5">
          <p className="text-xs text-white/70">CrediVale</p>
          <p className="text-lg font-semibold">{formatMXN(cuenta.credivaleDisponible)}</p>
        </div>
        <div className="flex-1 rounded-2xl bg-white/12 px-3.5 py-2.5">
          <p className="text-xs text-white/70">Cashback</p>
          <p className="text-lg font-semibold">{formatMXN(cuenta.cashbackDisponible)}</p>
        </div>
      </div>

      <button
        onClick={onShowQR}
        className="lift relative mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-white text-[15px] font-semibold text-kelder-700 hover:shadow-lg"
      >
        <QrCode size={20} aria-hidden="true" />
        Mostrar QR para pagar
      </button>

      <p className="relative mt-3 text-xs text-white/60">{user.nombreCompleto}</p>
    </div>
  );
}

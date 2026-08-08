import { QrCode, CreditCard, Store } from "lucide-react";
import { cuenta, formatMXN } from "@/lib/mock-data";
import heroShoe from "../../assets/hero-nb530.png";

/**
 * The cashback hero — block 1 and the single heaviest element of the Home. It is the
 * ONLY surface allowed a red tint, and even here it is mostly black (Amex Black feel):
 * a deep, desaturated red glow is concentrated in the lower-left, behind the amount.
 * The right half is a photo slot (real product photography, e.g. /hero-shoe.png).
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
interface KelderCardProps {
  cashback: number;
  onShowQR?: () => void;
  onUse?: () => void;
  onStart?: () => void;
}

export function KelderCard({ cashback, onShowQR, onUse, onStart }: KelderCardProps) {
  const tieneCashback = cashback > 0;
  const { faltan, meta } = cuenta.proximaRecompensa;
  const progreso = Math.min(100, Math.round(((meta - faltan) / meta) * 100));

  return (
    <div
      className="rise relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl text-white shadow-card"
      style={{
        background:
          "radial-gradient(90% 100% at 8% 92%, rgba(122,16,32,0.60) 0%, rgba(15,13,19,0) 55%), linear-gradient(160deg, #1a1720 0%, #100e15 100%)",
      }}
    >
      {/* product — seated on the right, calm slight tilt, cropped at the right edge (no card) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[52%] sm:w-[48%]" aria-hidden="true">
        {/* extremely subtle red glow to seat the product into the background */}
        <div
          className="absolute right-0 top-1/2 h-[85%] w-full -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(211,18,42,0.20), transparent 72%)" }}
        />
        {/* soft ambient shadow beneath the product */}
        <div
          className="absolute bottom-[16%] left-1/2 h-5 w-[58%] -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{ background: "rgba(0,0,0,0.5)" }}
        />
        <img
          src={heroShoe}
          alt="New Balance 530"
          className="absolute right-0 top-1/2 w-[124%] max-w-[660px] object-contain"
          style={{
            transform: "translateY(-50%) translateX(10%) scaleX(-1) rotate(26deg)",
            transformOrigin: "center",
            filter: "drop-shadow(0 22px 30px rgba(0,0,0,0.45))",
          }}
        />
      </div>

      <div className="relative p-8 sm:p-10">
        {tieneCashback ? (
          <div className="max-w-[380px]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Tu cashback disponible</p>
            <p className="mt-2 text-6xl font-semibold leading-none tracking-tight sm:text-7xl">{formatMXN(cashback)}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">Es tuyo. Úsalo para ahorrar en tu próxima compra.</p>

            <div className="mt-7 space-y-3">
              <button
                onClick={onShowQR}
                className="lift flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-white text-[15px] font-semibold text-ink-950 hover:bg-white/90"
              >
                <QrCode size={20} aria-hidden="true" />
                Mostrar QR para pagar
              </button>
              <button
                onClick={onUse}
                className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] text-[15px] font-semibold text-white hover:bg-white/[0.12]"
              >
                <CreditCard size={19} aria-hidden="true" />
                Canjear en línea
              </button>
            </div>

            {/* progress — message first, short bar, no numeric percent */}
            <div className="mt-6">
              <p className="text-sm text-white/70">
                Te faltan <span className="font-semibold text-white">{formatMXN(faltan)}</span> para tu próxima recompensa
              </p>
              <div className="mt-2 h-1 w-40 overflow-hidden rounded-full bg-white/15 sm:w-52">
                <div className="h-full rounded-full bg-white" style={{ width: `${progreso}%` }} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Cashback</p>
            <p className="mt-2 max-w-sm text-3xl font-semibold leading-snug sm:text-4xl">Empieza a ganar cashback</p>
            <p className="mt-3 max-w-sm text-[15px] text-white/70">
              Compra en cualquier tienda del grupo y tu cashback se acumula solo.
            </p>
            <button
              onClick={onStart}
              className="lift mt-7 flex min-h-[52px] w-fit items-center justify-center gap-2 rounded-2xl bg-white px-6 text-[15px] font-semibold text-ink-950 hover:bg-white/90"
            >
              <Store size={19} aria-hidden="true" />
              Encontrar una tienda
            </button>
          </>
        )}
      </div>
    </div>
  );
}

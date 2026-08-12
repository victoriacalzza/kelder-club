import { QrCode, CreditCard, Store } from "lucide-react";
import { cuenta, formatMXN } from "@/lib/mock-data";
import heroShoe from "../../assets/hero-producto.png";

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
  onComprar?: () => void;
}

export function KelderCard({ cashback, onShowQR, onUse, onStart, onComprar }: KelderCardProps) {
  const tieneCashback = cashback > 0;
  const { faltan, meta } = cuenta.proximaRecompensa;
  const progreso = Math.min(100, Math.round(((meta - faltan) / meta) * 100));

  return (
    <div
      className="rise relative flex min-h-[188px] flex-col justify-end overflow-hidden rounded-2xl text-white shadow-card lg:min-h-[360px]"
      style={{
        background:
          "radial-gradient(90% 100% at 8% 92%, rgba(122,16,32,0.60) 0%, rgba(15,13,19,0) 55%), linear-gradient(160deg, #1a1720 0%, #100e15 100%)",
      }}
    >
      {/* product — compact top-right on mobile (clear of the copy and the actions), full
          editorial composition on desktop. */}
      <img
        src={heroShoe}
        alt="Tenis Kelder Club"
        aria-hidden="true"
        className="pointer-events-none absolute right-1 top-3 h-[42%] w-[34%] max-w-[136px] rotate-[-6deg] object-contain object-right lg:right-[-1.5rem] lg:top-[60%] lg:h-[104%] lg:w-[55%] lg:max-w-[660px] lg:-translate-y-1/2 lg:rotate-[-5deg]"
        style={{ filter: "drop-shadow(0 24px 38px rgba(0,0,0,0.5))" }}
      />

      <div className="relative p-5 sm:p-6 lg:p-10">
        {tieneCashback ? (
          <>
            {/* MOBILE / tablet — compact: amount + progress + secondary actions (QR lives in Pagar) */}
            <div className="lg:hidden">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">Tu cashback</p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-5xl font-semibold leading-none tracking-tight">{formatMXN(cashback)}</span>
                <span className="text-sm text-white/70">disponibles</span>
              </p>
              <div className="mt-4 max-w-[260px]">
                <p className="text-[13px] leading-snug text-white/70">
                  Te faltan <span className="font-semibold text-white">{formatMXN(faltan)}</span> para tu próxima recompensa
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-white" style={{ width: `${progreso}%` }} />
                </div>
              </div>
              <div className="mt-4 flex gap-2.5">
                <button
                  onClick={onComprar}
                  className="flex min-h-[44px] flex-[1.4] items-center justify-center gap-1.5 rounded-full bg-white px-3 text-[14px] font-semibold text-ink-950 hover:bg-white/90"
                >
                  <Store size={16} aria-hidden="true" />
                  Ver qué puedo comprar
                </button>
                <button
                  onClick={onUse}
                  className="flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[14px] font-semibold text-white hover:bg-white/[0.12]"
                >
                  Canjear en línea
                </button>
              </div>
            </div>

            {/* DESKTOP — full hero (unchanged) */}
            <div className="hidden max-w-[380px] lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Tu cashback disponible</p>
              <p className="mt-2 text-7xl font-semibold leading-none tracking-tight">{formatMXN(cashback)}</p>
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

              <div className="mt-6">
                <p className="text-sm text-white/70">
                  Te faltan <span className="font-semibold text-white">{formatMXN(faltan)}</span> para tu próxima recompensa
                </p>
                <div className="mt-2 h-1 w-52 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-white" style={{ width: `${progreso}%` }} />
                </div>
              </div>
            </div>
          </>
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

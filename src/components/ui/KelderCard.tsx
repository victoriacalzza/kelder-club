import { QrCode, CreditCard, Store, ArrowRight } from "lucide-react";
import { cuenta, formatMXN } from "@/lib/mock-data";
import heroProducto from "@/assets/hero-producto.png";

/**
 * The cashback hero — block 1 and the heaviest element of the Home, styled like a premium
 * wallet/rewards card (not a promo banner). It is the ONLY surface allowed a red tint, and even
 * here it is mostly black (Amex Black feel): a deep, desaturated red glow in the lower-left,
 * behind the amount. On WEB (desktop, lg+) the right half shows product photography (hero-producto);
 * on the mobile app (below lg) that image is intentionally hidden so it never appears there.
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
      {/* Producto (fotografía) — SOLO en web/desktop (lg+); oculto en la app móvil (below lg) */}
      <img
        src={heroProducto}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 hidden h-[80%] w-[45%] max-w-[520px] -translate-y-1/2 object-contain object-right lg:block"
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
              <div className="mt-5 max-w-[280px]">
                <p className="text-[13px] leading-snug text-white/70">
                  Te faltan <span className="font-semibold text-white">{formatMXN(faltan)}</span> para tu próxima recompensa
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-white" style={{ width: `${progreso}%` }} />
                </div>
              </div>
              {/* Primary commercial action — full width, single line. Redeem online is a discreet
                  secondary link below (no second big button competing on the same row). */}
              <div className="mt-6">
                <button
                  onClick={onComprar}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white text-[15px] font-semibold text-ink-950 hover:bg-white/90"
                >
                  <Store size={17} aria-hidden="true" />
                  Ver qué puedo comprar
                </button>
                <button
                  onClick={onUse}
                  className="mx-auto mt-3 flex min-h-[36px] items-center justify-center gap-1 text-[13px] font-medium text-white/70 hover:text-white"
                >
                  Canjear en línea
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* DESKTOP — full hero (unchanged) */}
            <div className="hidden max-w-[380px] lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Tu cashback disponible</p>
              <p className="mt-2 text-7xl font-semibold leading-none tracking-tight">{formatMXN(cashback)}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/75">Es tuyo. Úsalo para ahorrar en tu próxima compra.</p>

              <div className="mt-7 space-y-3">
                {/* Primary commercial CTA (web keeps a natural QR access below it, unlike the app) */}
                <button
                  onClick={onComprar}
                  className="lift flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-white text-[15px] font-semibold text-ink-950 hover:bg-white/90"
                >
                  <Store size={19} aria-hidden="true" />
                  Ver qué puedo comprar
                </button>
                <button
                  onClick={onShowQR}
                  className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] text-[15px] font-semibold text-white hover:bg-white/[0.12]"
                >
                  <QrCode size={20} aria-hidden="true" />
                  Mostrar QR para pagar
                </button>
                <button
                  onClick={onUse}
                  className="mx-auto flex min-h-[44px] items-center justify-center gap-1.5 text-sm font-medium text-white/70 hover:text-white"
                >
                  <CreditCard size={17} aria-hidden="true" />
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

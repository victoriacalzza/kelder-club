import { ArrowRight } from "lucide-react";
import { imgCreditoKelder } from "@/lib/mock-data";

/**
 * Crédito Kelder INVITATION — shown ONLY to members without Crédito Kelder. A high-presence,
 * premium PROMO card (not an empty state, not an alert): a predominant Kelder-red gradient
 * that contrasts against the cream Home, white copy with a clear hierarchy, and a white CTA
 * button. Deliberately DIFFERENT from the CrediVale invitation (white card + blue illustration)
 * because they are different products. Strictly Crédito Kelder — never "vales".
 * The photo blends into the red via a soft mask so it doesn't look pasted on top.
 * On mobile it becomes a vertical card: info → CTA → image (CTA always visible, no inner scroll).
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 */
export function CreditoKelderCard({ onConocer }: { onConocer?: () => void }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-card"
      style={{ background: "linear-gradient(120deg, #d3122a 0%, #a80f22 60%, #8f0e22 100%)" }}
    >
      {/* Desktop photo — right ~34%, blended into the red with a left mask fade */}
      <img
        src={imgCreditoKelder}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[38%] object-cover md:block"
        style={{
          objectPosition: "55% 18%",
          maskImage: "linear-gradient(to right, transparent 0%, #000 46%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 46%)",
        }}
      />

      <div className="relative z-10 flex flex-col">
        {/* Copy + CTA */}
        <div className="p-6 sm:p-8 md:max-w-[60%]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Crédito Kelder</p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
            ¿Aún no tienes Crédito Kelder?
          </h3>
          <p className="mt-2 text-[15px] font-medium text-white/90">Compra hoy y paga en quincenas.</p>
          <p className="mt-1 max-w-md text-sm text-white/70">
            Solicita tu crédito y compra en las tiendas participantes del grupo.
          </p>
          <button
            onClick={onConocer}
            className="lift mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-kelder-700 shadow-sm hover:bg-white/95"
          >
            Conocer Crédito Kelder
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Mobile photo — full-width band below the CTA, top-faded into the red */}
        <img
          src={imgCreditoKelder}
          alt=""
          aria-hidden="true"
          className="h-40 w-full object-cover md:hidden"
          style={{
            objectPosition: "50% 22%",
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 42%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 42%)",
          }}
        />
      </div>
    </div>
  );
}

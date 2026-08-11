import { ArrowRight } from "lucide-react";
import { imgCreditoKelder } from "@/lib/mock-data";

/**
 * Home credit slot, state C — shown ONLY to members WITHOUT Crédito Kelder. A compact,
 * low-height SECONDARY promo banner (not a full section): copy on the left, a lifestyle
 * photo entering large from the right and cropped by the banner's bottom/right edges.
 * No bag icon, no big button — a red text CTA with arrow. Strictly Crédito Kelder (never
 * "vales" — CrediVale is a different product). Never coexists with the reminder/empty states.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
export function CreditoKelderCard({ onConocer }: { onConocer?: () => void }) {
  return (
    <div className="relative flex min-h-[132px] items-center overflow-hidden rounded-2xl border border-ink-100 bg-cream">
      {/* Warm tint — beige/rose, ONLY in the BACKGROUND toward the right, fading fully before
          the center. Sits behind the photo; never over the people. Never a solid fill. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-2/3"
        style={{ background: "linear-gradient(to left, rgba(249,224,222,0.7) 0%, rgba(249,224,222,0) 78%)" }}
      />

      {/* Copy — ~45% of the banner */}
      <div className="relative z-10 max-w-[48%] py-5 pl-6 sm:pl-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">Crédito Kelder</p>
        <p className="mt-1.5 text-lg font-semibold tracking-tight text-ink-900">¿Aún no tienes Crédito Kelder?</p>
        <p className="mt-1 text-sm text-ink-500">Compra hoy y paga en quincenas.</p>
        <button onClick={onConocer} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-kelder-600">
          Conocer cómo funciona
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>

      {/* Lifestyle photo — the couple at FULL opacity (no mask/fade over people), ~34% of the
          banner, both faces + shoulders/upper torso, nudged toward the center with a small gap
          from the right edge. Any gradient stays in the background behind it, never on top. */}
      <img
        src={imgCreditoKelder}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-6 z-[5] w-[32%] object-cover sm:right-8 sm:w-[34%]"
        style={{ objectPosition: "50% 22%" }}
      />
    </div>
  );
}

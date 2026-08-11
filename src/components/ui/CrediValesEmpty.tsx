import { ArrowRight } from "lucide-react";
import credivaleCard from "../../assets/credivale-card.png";

/**
 * CrediVale invitation banner — Home. A single, clean 2-column banner: copy on the left,
 * the FINAL CrediVale illustration asset (white card on a light-blue circle, tilted, shadow)
 * on the right. The illustration is the real image (object-contain) — never recreated in
 * HTML/CSS and never written over. Text-only explanation: a CrediVale is not requested here.
 * Replace src/assets/credivale-card.png with the official illustration if it changes.
 */
export function CrediValesEmpty({ onConocer }: { onConocer?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 sm:p-8 md:flex-row md:gap-8">
      {/* Left column — copy */}
      <div className="w-full text-center md:flex-1 md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Tus CrediVales</p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-ink-900 sm:text-2xl">¿Aún no tienes CrediVales?</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-500 md:mx-0">
          Cuando recibas un CrediVale podrás consultarlo aquí, conocer cuánto puedes utilizar y, una vez usado, dar seguimiento a tus pagos quincenales.
        </p>
        <button
          onClick={onConocer}
          className="mt-4 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600"
        >
          Conocer cómo funcionan
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>

      {/* Right column — the official CrediVale illustration (real asset, never recreated) */}
      <div className="w-full max-w-[420px] md:w-[45%] md:max-w-[480px]">
        <img src={credivaleCard} alt="CrediVale" className="h-auto w-full object-contain" />
      </div>
    </div>
  );
}

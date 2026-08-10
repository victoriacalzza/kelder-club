import { ArrowRight } from "lucide-react";
import { CrediValeGlyph } from "@/components/ui/CrediValeCard";

/**
 * Empty state for CrediVales — used on the Home credit slot and on the "Crédito y vales"
 * screen. Instead of a generic empty card, it previews a real-looking CrediVale credential
 * (floating/tilted) on the right so members recognize the product before they own one.
 * Same light container family as the other blocks; never shows Crédito Kelder data.
 */
export function CrediValesEmpty({ onConocer }: { onConocer?: () => void }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white sm:flex-row">
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Tus CrediVales</p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-ink-900">Aún no tienes CrediVales</p>
        <p className="mt-1.5 max-w-md text-sm text-ink-500">
          Cuando recibas un CrediVale podrás consultarlo y darle seguimiento desde aquí.
        </p>
        <button onClick={onConocer} className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-kelder-600">
          Conocer cómo funcionan
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
      {/* Floating CrediVale preview */}
      <div className="relative flex min-h-[180px] w-full items-center justify-center overflow-hidden bg-cream px-6 py-8 sm:w-[45%]">
        <CrediValeGlyph className="rotate-[-6deg] transition-transform" />
      </div>
    </div>
  );
}

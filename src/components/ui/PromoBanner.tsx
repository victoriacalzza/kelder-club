import { ArrowRight } from "lucide-react";
import type { Campania } from "@/lib/mock-data";

/**
 * Block 5 — featured campaign, themed to a launch / new season (not cashback). An
 * editorial composition, not another dashboard card: a large photo (≈55%, real campaign
 * photography in production) beside a spare, brand-forward text panel. Minimal copy.
 * Never uses black or the red gradient — the hero owns the dark surface.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
export function PromoBanner({ campania, onClick }: { campania: Campania; onClick?: () => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <div className="flex flex-col md:min-h-[360px] md:flex-row">
        {/* campaign photography — ≈50%, product-forward, cover crop */}
        <div className="h-52 w-full overflow-hidden bg-ink-50 sm:h-60 md:h-auto md:w-1/2">
          {campania.imagen && (
            <img
              src={campania.imagen}
              alt={`${campania.etiqueta}: ${campania.titulo}`}
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 60%" }}
            />
          )}
        </div>

        <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:gap-4 sm:p-10 lg:p-12">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-kelder-600">{campania.etiqueta}</span>
          <p className="text-3xl font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">{campania.titulo}</p>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-600">{campania.detalle}</p>
          <button
            onClick={onClick}
            className="lift mt-2 flex min-h-[48px] w-fit items-center gap-1.5 rounded-2xl bg-kelder-600 px-6 text-[15px] font-semibold text-white hover:bg-kelder-700"
          >
            {campania.cta}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

import calzzapato from "../../assets/logos/calzzapato.png";
import kelder from "../../assets/logos/kelder.png";
import urbanna from "../../assets/logos/urbanna.png";
import calzzasport from "../../assets/logos/calzzasport.png";
import calzakids from "../../assets/logos/calzakids.png";

/**
 * Business-units marquee — a single editorial strip (no per-logo cards, boxes or borders)
 * with an infinite, slow right-to-left scroll. Logos ship as white single-color marks, so
 * they're rendered monochrome-gray on the light background (brightness(0) + low opacity) and
 * lift to full opacity on hover, which also pauses the animation. Soft fades at both edges.
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
const logos = [
  { src: calzzapato, nombre: "Calzzapato" },
  { src: kelder, nombre: "Kelder" },
  { src: urbanna, nombre: "Urbanna" },
  { src: calzzasport, nombre: "CalzzaSport" },
  { src: calzakids, nombre: "CalzaKids" },
];

export function MarcasMarquee({ onSelect }: { onSelect?: (nombre: string) => void }) {
  // Two copies of the sequence so the -50% loop is seamless.
  const secuencia = [...logos, ...logos];

  return (
    <section aria-label="Unidades de negocio del grupo" className="py-2 sm:py-3">
      <p className="mb-5 text-sm font-medium text-ink-500 sm:mb-6">Compra y disfruta tus beneficios en:</p>

      <div
        className="marquee-group relative overflow-hidden py-3 sm:py-4"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <ul className="animate-marquee flex w-max items-center gap-[72px] sm:gap-20">
          {secuencia.map((l, i) => (
            <li key={i} className="shrink-0">
              <button
                onClick={() => onSelect?.(l.nombre)}
                aria-label={`Explorar ${l.nombre}`}
                className="group flex h-7 items-center"
              >
                <img
                  src={l.src}
                  alt={l.nombre}
                  className="h-7 w-auto max-w-[150px] object-contain opacity-40 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ filter: "brightness(0)" }}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";

/**
 * Wheel/slider picker (à la Zara/iOS), Kelder-styled: light background, red highlight. Scroll to
 * spin; the centered value is the selection (bigger, in Kelder red). Works vertically (footwear,
 * measurements) or horizontally (apparel letters). Value is committed via onChange on the fly.
 */
export function WheelPicker<T extends string | number>({
  options,
  value,
  onChange,
  unit,
  orientation = "v",
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  unit?: string;
  orientation?: "v" | "h";
}) {
  const V = orientation === "v";
  const size = V ? 48 : 76; // extent of one item along the scroll axis
  const visible = 5;
  const ref = useRef<HTMLDivElement>(null);
  const startIdx = Math.max(0, options.findIndex((o) => String(o) === String(value)));
  const [center, setCenter] = useState(startIdx);

  // Snap to the initial value on mount.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (V) el.scrollTop = startIdx * size;
    else el.scrollLeft = startIdx * size;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const pos = V ? el.scrollTop : el.scrollLeft;
    const i = Math.min(options.length - 1, Math.max(0, Math.round(pos / size)));
    if (i !== center) {
      setCenter(i);
      onChange(options[i]);
    }
  };

  const spacerStyle = V ? { height: size * 2 } : { width: size * 2, flexShrink: 0 };

  return (
    <div className="relative select-none" style={V ? { height: size * visible } : { height: size }}>
      {/* center selection band */}
      <div
        className={`pointer-events-none absolute rounded-xl border border-kelder-100 bg-kelder-50 ${
          V ? "inset-x-8 top-1/2 h-12 -translate-y-1/2" : "inset-y-1 left-1/2 -translate-x-1/2"
        }`}
        style={V ? undefined : { width: size }}
      />
      <div
        ref={ref}
        onScroll={onScroll}
        className={`relative z-10 h-full snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          V ? "snap-y overflow-y-auto" : "flex snap-x overflow-x-auto"
        }`}
      >
        <div style={spacerStyle} aria-hidden="true" />
        {options.map((o, i) => (
          <div
            key={String(o)}
            onClick={() => {
              const el = ref.current;
              if (!el) return;
              if (V) el.scrollTo({ top: i * size, behavior: "smooth" });
              else el.scrollTo({ left: i * size, behavior: "smooth" });
            }}
            className={`flex snap-center items-center justify-center ${V ? "" : "shrink-0"}`}
            style={V ? { height: size } : { width: size, height: size }}
          >
            <span className={i === center ? "text-2xl font-semibold text-kelder-600" : "text-lg text-ink-300"}>
              {o}
              {i === center && unit ? <span className="ml-1 text-sm font-normal text-ink-400">{unit}</span> : null}
            </span>
          </div>
        ))}
        <div style={spacerStyle} aria-hidden="true" />
      </div>
    </div>
  );
}

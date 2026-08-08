/**
 * A monochrome sneaker illustration used as a stand-in for real product photography
 * in the prototype (the canvas/app can't load external images). Renders in currentColor
 * so it reads as a ghosted product on the dark hero and as a crisp silhouette on light
 * cards. In production these slots hold real lifestyle / product photos.
 */
export function Sneaker({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 110" fill="none" className={className} aria-hidden="true">
      {/* sole */}
      <path
        d="M14 78 C8 78 6 84 12 88 C16 90 22 91 30 91 L170 91 C182 91 190 87 190 80 L190 77 C160 81 120 80 84 76 L34 71 C24 70 18 72 14 78 Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* midsole highlight */}
      <path d="M16 79 C60 84 130 86 188 79 L188 82 C130 88 60 86 16 82 Z" fill="currentColor" opacity="0.4" />
      {/* upper */}
      <path
        d="M34 71 L28 55 C25 48 28 40 36 38 L58 33 C66 31 72 27 80 21 C90 13 102 11 110 18 L124 30 C132 37 144 41 158 43 L176 46 C185 47 190 52 190 60 L190 77 C160 81 120 80 84 76 L34 71 Z"
        fill="currentColor"
        opacity="0.55"
      />
      {/* toe cap */}
      <path d="M158 43 C172 45 186 49 190 60 L190 74 C176 70 164 60 158 48 Z" fill="currentColor" opacity="0.7" />
      {/* heel collar */}
      <path d="M28 55 C25 48 28 40 36 38 L48 35 L44 60 L34 71 Z" fill="currentColor" opacity="0.72" />
      {/* three stripes */}
      <g fill="currentColor" opacity="0.9">
        <path d="M96 30 L104 44 L96 48 L88 34 Z" />
        <path d="M110 27 L118 41 L110 45 L102 31 Z" />
        <path d="M124 25 L132 39 L124 43 L116 29 Z" />
      </g>
      {/* laces */}
      <g stroke="currentColor" strokeWidth="2.4" opacity="0.85" strokeLinecap="round">
        <path d="M62 40 L74 34" />
        <path d="M66 48 L78 42" />
        <path d="M70 56 L82 50" />
      </g>
    </svg>
  );
}

import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

/**
 * Standard back affordance for drill-in screens. iOS has no hardware back button and the
 * WKWebView doesn't give a SPA the native swipe-back, so every screen reached by tapping into
 * something needs an explicit way out. Pass `to` for a fixed parent (shown as its label) or
 * omit it to step back through history. 44px tap target for comfortable thumb reach.
 */
export function BackButton({ to, label = "Atrás" }: { to?: string; label?: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      aria-label={`Regresar${to ? ` a ${label}` : ""}`}
      className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl pr-3 text-sm font-medium text-ink-500 hover:text-ink-900"
    >
      <ChevronLeft size={20} aria-hidden="true" />
      {label}
    </button>
  );
}

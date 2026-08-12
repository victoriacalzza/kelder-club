import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Sparkles } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";

const TITULOS: Record<string, { titulo: string; desc: string }> = {
  beneficios: { titulo: "Beneficios", desc: "Recompensas, promociones y experiencias del grupo." },
  notificaciones: { titulo: "Notificaciones", desc: "Avisos de pagos, cashback y novedades." },
  favoritos: { titulo: "Mis favoritos", desc: "Los productos que guardaste para después." },
  preferencias: { titulo: "Preferencias", desc: "Idioma, tienda favorita y ajustes de tu experiencia." },
  ayuda: { titulo: "Centro de ayuda", desc: "Preguntas frecuentes y guías de Kelder Club." },
  contacto: { titulo: "Contáctanos", desc: "Escríbenos y te ayudamos con lo que necesites." },
  terminos: { titulo: "Términos y privacidad", desc: "Avisos legales y manejo de tus datos." },
};

/**
 * Lightweight placeholder for sections that will exist later (benefits, notifications,
 * preferences, help…). Keeps every access in "Mi Club" tappable and honest instead of a
 * dead tap, and reuses the standard back-link + TopBar pattern.
 */
export function Proximamente() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const info = (slug && TITULOS[slug]) || { titulo: "Próximamente", desc: "Estamos preparando esta sección para ti." };

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={() => navigate("/club")}
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl pr-3 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Mi Club
      </button>

      <TopBar title={info.titulo} subtitle={info.desc} />

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-ink-100 bg-white p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-kelder-50 text-kelder-600" aria-hidden="true">
          <Sparkles size={26} />
        </span>
        <p className="font-medium text-ink-900">Muy pronto</p>
        <p className="max-w-sm text-sm text-ink-500">Estamos preparando esta sección para que la disfrutes desde Kelder Club.</p>
      </div>
    </div>
  );
}

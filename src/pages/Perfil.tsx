import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { user } from "@/lib/mock-data";
import { useClub } from "@/lib/ClubContext";

const TALLAS_MX = [22, 23, 24, 25, 26, 27, 28, 29];

interface Section {
  id: string;
  label: string;
  done: boolean;
  summary: string;
  fields: { label: string; placeholder: string }[];
}

const initialSections: Section[] = [
  { id: "datos", label: "Datos básicos", done: true, summary: "Ana Victoria Aragón Gómez · 04/11/1997", fields: [] },
  { id: "contacto", label: "Contacto", done: true, summary: user.correo, fields: [] },
  {
    id: "direccion",
    label: "Dirección de envío",
    done: false,
    summary: "Necesaria para enviarte vales físicos y CrediVales.",
    fields: [
      { label: "Calle y número", placeholder: "Av. Insurgentes 123" },
      { label: "Ciudad", placeholder: "Los Mochis, Sinaloa" },
    ],
  },
  {
    id: "preferencias",
    label: "Preferencias de talla",
    done: false,
    summary: "Para que tus recomendaciones sean más precisas.",
    fields: [{ label: "Talla de calzado", placeholder: "Ej. 27" }],
  },
];

export function Perfil() {
  const [sections, setSections] = useState(initialSections);
  const [openId, setOpenId] = useState<string | null>(null);
  const { tallaMx, setTallaMx } = useClub();

  const done = sections.filter((s) => s.done).length;
  const percent = Math.round((done / sections.length) * 100);

  function saveSection(id: string) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, done: true } : s)));
    setOpenId(null);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <BackButton to="/club" label="Mi Club" />
      <TopBar title="Perfil" subtitle="Completa tu información a tu ritmo — solo lo que necesites, cuando lo necesites." />

      <Card className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-kelder-50 text-xl font-semibold text-kelder-600">
          {user.nombre.slice(0, 2).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-medium text-ink-900">{user.nombreCompleto}</p>
          <p className="truncate text-sm text-ink-500">{user.correo}</p>
        </div>
      </Card>

      {/* Mi talla — set once, remembered, used to personalize catalog/search/availability */}
      <div className="mt-4 rounded-3xl bg-white p-5 shadow-soft">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-medium text-ink-900">Mi talla</p>
          <p className="text-sm text-ink-500">{tallaMx != null ? `${tallaMx} MX` : "Sin definir"}</p>
        </div>
        <p className="mt-0.5 text-sm text-ink-500">Personaliza tu catálogo, búsqueda y disponibilidad.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TALLAS_MX.map((t) => (
            <button
              key={t}
              onClick={() => setTallaMx(t)}
              aria-pressed={tallaMx === t}
              className={`flex h-11 min-w-[44px] items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors ${
                tallaMx === t ? "border-kelder-600 bg-kelder-50 text-kelder-700" : "border-ink-200 text-ink-900 hover:border-ink-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {percent < 100 && (
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-ink-900">Perfil {percent}% completo</span>
            <span className="text-ink-500">{done}/{sections.length} secciones</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-kelder-600" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-2 text-sm text-ink-500">No es necesario completarlo todo hoy. Cada dato que agregas mejora tu experiencia.</p>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {sections.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-3xl bg-white shadow-soft">
            <button
              onClick={() => !s.done && setOpenId(openId === s.id ? null : s.id)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left"
              aria-expanded={openId === s.id}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  s.done ? "bg-success-100 text-success-600" : "bg-ink-100 text-ink-400"
                }`}
              >
                {s.done ? <Check size={16} aria-hidden="true" /> : <span className="h-2 w-2 rounded-full bg-ink-400" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink-900">{s.label}</p>
                <p className="truncate text-sm text-ink-500">{s.summary}</p>
              </div>
              {s.done ? (
                <span className="shrink-0 text-sm font-medium text-success-600">Completo</span>
              ) : (
                <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-kelder-600">
                  Completar
                  <ChevronDown size={16} className={`transition-transform ${openId === s.id ? "rotate-180" : ""}`} aria-hidden="true" />
                </span>
              )}
            </button>

            {!s.done && openId === s.id && (
              <div className="space-y-3 border-t border-ink-100 px-5 py-4">
                {s.fields.map((f) => (
                  <label key={f.label} className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink-900">{f.label}</span>
                    <input placeholder={f.placeholder} className="h-12 w-full rounded-2xl border border-ink-200 px-4 text-base" />
                  </label>
                ))}
                <Button size="sm" onClick={() => saveSection(s.id)}>
                  Guardar sección
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import { user } from "@/lib/mock-data";
import { useClub } from "@/lib/ClubContext";

interface Section {
  id: string;
  label: string;
  done: boolean;
  summary: string;
  fields: { label: string; placeholder: string }[];
}

/**
 * "Mis tallas" — a quick size preference, NOT the star of the Perfil screen. Collapsed it's a
 * single compact row summarizing each category; tapping "Editar" reveals a segmented editor
 * (Calzado | Ropa) so all sizes are never shown at once. New categories (pantalón, infantil,
 * accesorios) just get added to `CATEGORIAS` — no redesign. Feeds catalog/search/availability.
 */
const TALLAS_CALZADO: (string | number)[] = [22, 23, 24, 25, 26, 27, 28, 29];
const TALLAS_ROPA: (string | number)[] = ["XS", "S", "M", "L", "XL", "XXL"];

function MisTallas() {
  const { tallaMx, setTallaMx, tallaRopa, setTallaRopa } = useClub();
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("calzado");

  const CATEGORIAS = [
    {
      key: "calzado",
      label: "Calzado",
      opciones: TALLAS_CALZADO,
      sel: tallaMx as string | number | null,
      set: (v: string | number) => setTallaMx(Number(v)),
      fmt: (v: string | number) => `${v} MX`,
    },
    {
      key: "ropa",
      label: "Ropa",
      opciones: TALLAS_ROPA,
      sel: tallaRopa as string | number | null,
      set: (v: string | number) => setTallaRopa(String(v)),
      fmt: (v: string | number) => String(v),
    },
  ];
  const activa = CATEGORIAS.find((c) => c.key === cat)!;

  return (
    <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-soft">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-3 px-5 py-4 text-left">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-ink-900">Mis tallas</p>
          <p className="mt-0.5 truncate text-sm text-ink-500">
            {CATEGORIAS.map((c, i) => (
              <span key={c.key}>
                {i > 0 && " · "}
                {c.label} <span className="font-semibold text-ink-900">{c.sel != null ? c.fmt(c.sel) : "—"}</span>
              </span>
            ))}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold text-kelder-600">
          {open ? "Listo" : "Editar"}
          <ChevronRight size={16} className={`transition-transform ${open ? "rotate-90" : ""}`} aria-hidden="true" />
        </span>
      </button>

      {open && (
        <div className="border-t border-ink-100 px-5 py-4">
          {/* segmented category selector — never shows every size at once */}
          <div className="inline-flex items-center rounded-full border border-ink-200 bg-white p-0.5">
            {CATEGORIAS.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`min-h-[34px] rounded-full px-4 text-sm font-medium transition-colors ${
                  cat === c.key ? "bg-kelder-600 text-white" : "text-ink-600"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {activa.opciones.map((t) => {
              const on = activa.sel === t;
              return (
                <button
                  key={String(t)}
                  onClick={() => activa.set(t)}
                  aria-pressed={on}
                  className={`flex h-11 min-w-[44px] items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors ${
                    on ? "border-kelder-600 bg-kelder-600 text-white" : "border-ink-200 text-ink-900 hover:border-ink-300"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
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

      {/* Mis tallas — a quick preference, compact by default (one row); grows only when editing */}
      <MisTallas />

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

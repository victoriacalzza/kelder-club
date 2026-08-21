import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ImageUp, Info } from "lucide-react";
import { PageHeader, Card, Btn, Stepper, Field, Input, Select, PreviewTabs, KV, cx } from "../ui";
import { ubicaciones, segmentos } from "../lib/data";

const STEPS = ["Contenido", "Ubicación", "Audiencia", "Vigencia", "Vista previa", "Publicar"];

function ImageDrop({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
      <ImageUp size={20} className="text-slate-400" />
      <p className="mt-2 text-[13px] font-medium text-slate-600">{label}</p>
      <p className="text-xs text-slate-400">PNG o JPG · arrastra o selecciona</p>
    </div>
  );
}

export function PublicidadWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [ubis, setUbis] = useState<string[]>(["Home app"]);
  const [audiencia, setAudiencia] = useState("Todos");
  const [sinTermino, setSinTermino] = useState(false);
  const [nombre, setNombre] = useState("Regreso a Clases 2026");

  const toggleUbi = (u: string) => setUbis((p) => (p.includes(u) ? p.filter((x) => x !== u) : [...p, u]));
  const back = () => (step === 0 ? navigate("/admin/publicidad") : setStep((s) => s - 1));
  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const finish = () => navigate("/admin/publicidad");

  return (
    <div className="space-y-5">
      <PageHeader title="Nueva publicidad" subtitle="Crea una campaña paso a paso." actions={
        <Btn onClick={() => navigate("/admin/publicidad")}>Cancelar</Btn>
      } />

      <Card className="p-4">
        <Stepper steps={STEPS} current={step} />
      </Card>

      <Card className="p-5">
        {/* PASO 1 — CONTENIDO */}
        {step === 0 && (
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              <Field label="Nombre interno" required hint="Solo visible en el backoffice.">
                <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </Field>
              <Field label="Título"><Input defaultValue="¡Llegó el Regreso a Clases!" /></Field>
              <Field label="Subtítulo"><Input defaultValue="Encuentra todo lo que necesitas en tu tienda." /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="CTA (acción)"><Select defaultValue="Ver promociones"><option>Ver promociones</option><option>Ver colección</option><option>Encontrar tienda</option><option>Ninguna</option></Select></Field>
                <Field label="Texto del botón"><Input defaultValue="Ver ofertas" /></Field>
              </div>
              <Field label="URL o destino interno" hint="Ej. /promociones o una URL externa."><Input defaultValue="/promociones" /></Field>
              <Field label="Texto alternativo (accesibilidad)"><Input defaultValue="Banner Regreso a Clases" /></Field>
            </div>
            <div className="space-y-4">
              <Field label="Imagen desktop" required><ImageDrop label="Imagen para desktop (16:9)" /></Field>
              <Field label="Imagen mobile" required><ImageDrop label="Imagen para mobile (4:5)" /></Field>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
                <span className="font-medium text-slate-700">Vista previa inmediata:</span> el contenido se refleja en el paso 5.
              </div>
            </div>
          </div>
        )}

        {/* PASO 2 — UBICACIÓN */}
        {step === 1 && (
          <div className="max-w-2xl space-y-3">
            <p className="text-sm text-slate-600">Selecciona dónde aparecerá. Puedes elegir más de una ubicación compatible.</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {ubicaciones.map((u) => {
                const on = ubis.includes(u);
                return (
                  <button key={u} onClick={() => toggleUbi(u)} className={cx("flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm", on ? "border-kelder-300 bg-kelder-50 text-kelder-800" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50")}>
                    <span className={cx("flex h-4 w-4 items-center justify-center rounded border", on ? "border-kelder-500 bg-kelder-500 text-white" : "border-slate-300")}>{on && "✓"}</span>
                    {u}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PASO 3 — AUDIENCIA */}
        {step === 2 && (
          <div className="max-w-2xl space-y-3">
            <p className="text-sm text-slate-600">¿Para quién se mostrará? Las opciones sin conexión de datos aún aparecen como <span className="font-medium">Próximamente</span>.</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {segmentos.map((s) => (
                <button key={s.nombre} disabled={!s.disponible} onClick={() => setAudiencia(s.nombre)}
                  className={cx("flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm",
                    !s.disponible ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400" :
                    audiencia === s.nombre ? "border-kelder-300 bg-kelder-50 text-kelder-800" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50")}>
                  {s.nombre}
                  {!s.disponible && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-400">Próximamente</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PASO 4 — VIGENCIA */}
        {step === 3 && (
          <div className="max-w-xl space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha de inicio"><Input type="date" defaultValue="2026-08-12" /></Field>
              <Field label="Hora de inicio"><Input type="time" defaultValue="10:00" /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha de fin"><Input type="date" defaultValue="2026-08-31" disabled={sinTermino} /></Field>
              <Field label="Hora de fin"><Input type="time" defaultValue="23:59" disabled={sinTermino} /></Field>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={sinTermino} onChange={(e) => setSinTermino(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-kelder-600" />
              Sin fecha de término
            </label>
            <p className="flex items-center gap-1.5 text-xs text-slate-400"><Info size={13} />También podrás publicar de inmediato desde el último paso.</p>
          </div>
        )}

        {/* PASO 5 — VISTA PREVIA */}
        {step === 4 && (
          <div>
            <p className="mb-3 text-sm text-slate-600">Así se verá tu campaña en cada superficie.</p>
            <PreviewTabs>
              <div className="relative">
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-kelder-600 to-kelder-700 text-white">
                  <div className="px-6 text-center">
                    <p className="text-lg font-semibold">¡Llegó el Regreso a Clases!</p>
                    <p className="mt-1 text-sm text-white/85">Encuentra todo lo que necesitas en tu tienda.</p>
                    <span className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-kelder-700">Ver ofertas</span>
                  </div>
                </div>
              </div>
            </PreviewTabs>
          </div>
        )}

        {/* PASO 6 — PUBLICAR */}
        {step === 5 && (
          <div className="max-w-xl">
            <h3 className="text-sm font-semibold text-slate-900">Resumen</h3>
            <div className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 px-4">
              <KV label="Qué se publicará">{nombre}</KV>
              <KV label="Dónde">{ubis.join(", ") || "—"}</KV>
              <KV label="Para quién">{audiencia}</KV>
              <KV label="Desde">12 ago 2026 · 10:00</KV>
              <KV label="Hasta">{sinTermino ? "Sin término" : "31 ago 2026 · 23:59"}</KV>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Btn onClick={finish}>Guardar borrador</Btn>
              <Btn onClick={finish}>Programar</Btn>
              <Btn variant="primary" onClick={finish}>Publicar ahora</Btn>
            </div>
          </div>
        )}
      </Card>

      {/* Navegación del wizard */}
      {step < 5 && (
        <div className="flex items-center justify-between">
          <Btn onClick={back}><ArrowLeft size={16} />{step === 0 ? "Cancelar" : "Atrás"}</Btn>
          <div className="flex gap-2">
            <Btn onClick={finish}>Guardar borrador</Btn>
            <Btn variant="primary" onClick={next}>Siguiente<ArrowRight size={16} /></Btn>
          </div>
        </div>
      )}
    </div>
  );
}

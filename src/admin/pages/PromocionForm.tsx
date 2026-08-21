import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageUp } from "lucide-react";
import { PageHeader, Card, Btn, Field, Input, Textarea, Select, PreviewTabs, cx } from "../ui";
import { unidades } from "../lib/data";
import type { Canal } from "../lib/data";

const CANALES: { id: Canal; label: string; desc: string }[] = [
  { id: "tienda", label: "Solo tienda física", desc: "Aplica únicamente comprando en sucursal." },
  { id: "online", label: "Solo online", desc: "Aplica únicamente en la tienda en línea." },
  { id: "ambos", label: "Tienda y online", desc: "Aplica en ambos canales." },
];

export function PromocionForm() {
  const navigate = useNavigate();
  const [canal, setCanal] = useState<Canal>("ambos");

  return (
    <div className="space-y-5">
      <PageHeader title="Nueva promoción" subtitle="Define el beneficio, el canal y su vigencia." actions={
        <><Btn onClick={() => navigate("/admin/promociones")}>Cancelar</Btn><Btn variant="primary" onClick={() => navigate("/admin/promociones")}>Publicar</Btn></>
      } />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card className="space-y-4 p-5">
            <Field label="Título" required><Input defaultValue="20% en Nike seleccionados" /></Field>
            <Field label="Descripción"><Textarea defaultValue="Aprovecha 20% de descuento en modelos seleccionados de Nike." /></Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Tipo de promoción"><Select defaultValue="Porcentaje"><option>Porcentaje</option><option>2x1</option><option>Precio especial</option><option>Otro</option></Select></Field>
              <Field label="Valor" hint="% de descuento, precio o condición"><Input defaultValue="20%" /></Field>
            </div>
            <Field label="Imagen">
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
                <ImageUp size={20} className="text-slate-400" /><p className="mt-2 text-[13px] font-medium text-slate-600">Imagen de la promoción</p>
              </div>
            </Field>
          </Card>

          {/* Canal — muy visible */}
          <Card className="p-5">
            <p className="text-sm font-semibold text-slate-900">Canal de aplicación</p>
            <p className="mt-0.5 text-xs text-slate-500">Comunica claramente si la promoción es solo en tienda física.</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {CANALES.map((c) => (
                <button key={c.id} onClick={() => setCanal(c.id)} className={cx("rounded-lg border p-3 text-left", canal === c.id ? "border-kelder-300 bg-kelder-50 ring-1 ring-kelder-200" : "border-slate-200 bg-white hover:bg-slate-50")}>
                  <p className={cx("text-sm font-medium", canal === c.id ? "text-kelder-800" : "text-slate-800")}>{c.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{c.desc}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label="Unidad de negocio"><Select>{unidades.map((u) => <option key={u}>{u}</option>)}<option>Todas</option></Select></Field>
            <Field label="Tiendas participantes"><Select defaultValue="Todas"><option>Todas</option><option>Selección personalizada…</option></Select></Field>
            <Field label="Categorías"><Input placeholder="Ej. Running, Casual" /></Field>
            <Field label="Productos relacionados"><Input placeholder="Buscar por SKU o nombre" /></Field>
            <Field label="Vigencia — inicio"><Input type="date" defaultValue="2026-08-10" /></Field>
            <Field label="Vigencia — fin"><Input type="date" defaultValue="2026-08-24" /></Field>
            <Field label="Orden / prioridad"><Input type="number" defaultValue={1} /></Field>
            <Field label="CTA"><Input defaultValue="Ver promoción" /></Field>
            <div className="sm:col-span-2"><Field label="Términos y condiciones"><Textarea placeholder="Restricciones, vigencia, tiendas aplicables…" /></Field></div>
          </Card>
        </div>

        {/* Preview lateral */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <p className="mb-3 text-sm font-semibold text-slate-900">Vista previa</p>
            <PreviewTabs>
              <div className="p-4">
                <div className="rounded-xl border border-slate-200 p-4">
                  <span className="inline-block rounded-md bg-kelder-50 px-2 py-0.5 text-xs font-semibold text-kelder-700">20% OFF</span>
                  <p className="mt-2 text-base font-semibold text-slate-900">20% en Nike seleccionados</p>
                  <p className="mt-1 text-sm text-slate-500">Aprovecha el descuento en modelos seleccionados.</p>
                </div>
              </div>
            </PreviewTabs>
          </Card>
          <div className="mt-3 flex gap-2">
            <Btn className="flex-1" onClick={() => navigate("/admin/promociones")}>Guardar borrador</Btn>
            <Btn variant="primary" className="flex-1" onClick={() => navigate("/admin/promociones")}>Publicar</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

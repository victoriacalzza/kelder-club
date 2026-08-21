import { useState } from "react";
import { Pencil, Eye } from "lucide-react";
import { PageHeader, Card, Btn, Pill, Drawer, Field, Input, Textarea, PreviewTabs } from "../ui";
import { landingBloques } from "../lib/data";
import type { LandingBloque } from "../lib/data";

export function LandingEditor() {
  const [edit, setEdit] = useState<LandingBloque | null>(null);
  const pendientes = landingBloques.filter((b) => b.estado === "Cambio pendiente").length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Landing informativa"
        subtitle="Edita el contenido de la landing por bloques predefinidos, sin tocar código."
        actions={<>
          <Btn><Eye size={16} />Vista previa</Btn>
          <Btn variant="primary" disabled={pendientes === 0}>Publicar cambios{pendientes > 0 ? ` (${pendientes})` : ""}</Btn>
        </>}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="border-b border-slate-200 px-4 py-3"><h2 className="text-sm font-semibold text-slate-900">Bloques</h2></div>
          <div className="divide-y divide-slate-100">
            {landingBloques.map((b) => (
              <div key={b.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    {b.nombre}
                    {b.estado === "Cambio pendiente" && <Pill tone="amber">Cambio pendiente</Pill>}
                  </p>
                  <p className="truncate text-xs text-slate-400">{b.descripcion} · {b.actualizado}</p>
                </div>
                <Btn size="sm" onClick={() => setEdit(b)}><Pencil size={14} />Editar</Btn>
              </div>
            ))}
          </div>
          <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-400">La estructura de la landing es fija; solo se edita el contenido de cada bloque.</p>
        </Card>

        <Card className="p-4">
          <p className="mb-3 text-sm font-semibold text-slate-900">Vista previa</p>
          <PreviewTabs>
            <div className="p-6 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-kelder-600">Kelder Club+</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">Comprar tiene más beneficios.</p>
              <p className="mt-1 text-sm text-slate-500">Descubre productos, encuentra tu talla y acumula puntos.</p>
              <span className="mt-4 inline-block rounded-full bg-kelder-600 px-4 py-1.5 text-xs font-semibold text-white">Crear mi cuenta</span>
            </div>
          </PreviewTabs>
        </Card>
      </div>

      <Drawer open={!!edit} onClose={() => setEdit(null)} title={edit ? `Editar bloque · ${edit.nombre}` : ""}
        footer={<><Btn onClick={() => setEdit(null)}>Cancelar</Btn><Btn onClick={() => setEdit(null)}>Guardar</Btn><Btn variant="primary" onClick={() => setEdit(null)}>Guardar y publicar</Btn></>}>
        {edit && (
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">{edit.descripcion}</div>
            <Field label="Título"><Input defaultValue="Comprar tiene más beneficios." /></Field>
            <Field label="Subtítulo / texto"><Textarea defaultValue="Descubre productos, encuentra tu talla, acumula puntos y lleva tus compras contigo." /></Field>
            <Field label="Texto del botón (CTA)"><Input defaultValue="Crear mi cuenta" /></Field>
            <Field label="Imagen"><Input placeholder="Reemplazar imagen del bloque" /></Field>
            <p className="text-xs text-slate-400">Se conservará la versión anterior en el historial; podrás compararla o restaurarla.</p>
          </div>
        )}
      </Drawer>
    </div>
  );
}

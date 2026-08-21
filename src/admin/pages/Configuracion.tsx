import { useState } from "react";
import { Plus, History } from "lucide-react";
import { PageHeader, Card, Tabs, Btn, Table, Th, Td, Field, Input, Pill } from "../ui";
import { unidades } from "../lib/data";

const CATALOGOS = [
  { nombre: "Unidades de negocio", items: unidades.length, origen: "Sincronizado" },
  { nombre: "Plazas", items: 14, origen: "Sincronizado" },
  { nombre: "Categorías", items: 22, origen: "Editable" },
  { nombre: "Tipos de promoción", items: 4, origen: "Editable" },
  { nombre: "Tipos de notificación", items: 7, origen: "Editable" },
];

export function Configuracion() {
  const [tab, setTab] = useState("catalogos");
  return (
    <div className="space-y-5">
      <PageHeader title="Configuración" subtitle="Catálogos, parámetros del sistema y versionado de contenido." />
      <Tabs value={tab} onChange={setTab} tabs={[{ id: "catalogos", label: "Catálogos" }, { id: "parametros", label: "Parámetros" }, { id: "versionado", label: "Versionado" }]} />

      {tab === "catalogos" && (
        <Card>
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">Catálogos</h2>
            <Btn size="sm"><Plus size={15} />Nuevo catálogo</Btn>
          </div>
          <Table head={<><Th className="pl-4">Catálogo</Th><Th>Elementos</Th><Th>Origen</Th><Th className="text-right pr-4">Acciones</Th></>}>
            {CATALOGOS.map((c) => (
              <tr key={c.nombre} className="hover:bg-slate-50">
                <Td className="pl-4"><span className="font-medium text-slate-900">{c.nombre}</span></Td>
                <Td><span className="text-slate-500">{c.items}</span></Td>
                <Td><Pill tone={c.origen === "Editable" ? "green" : "slate"}>{c.origen}</Pill></Td>
                <Td className="pr-4 text-right"><Btn size="sm" disabled={c.origen !== "Editable"}>Editar</Btn></Td>
              </tr>
            ))}
          </Table>
        </Card>
      )}

      {tab === "parametros" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="space-y-4 p-5">
            <h2 className="text-sm font-semibold text-slate-900">Parámetros generales</h2>
            <Field label="Nombre del programa"><Input defaultValue="Kelder Club+" /></Field>
            <Field label="Teléfono de contacto (landing)"><Input defaultValue="800 927 28 67" /></Field>
            <Field label="Valor de 1 punto"><Input defaultValue="$1 MXN" /></Field>
          </Card>
          <Card className="space-y-3 p-5">
            <h2 className="text-sm font-semibold text-slate-900">Publicación y aprobación</h2>
            {[
              { l: "Requerir aprobación antes de publicar", d: "Aplica a roles distintos de Administrador general." },
              { l: "Sesión: expiración por inactividad", d: "Cerrar sesión tras 30 min sin actividad." },
              { l: "Registrar toda acción en Auditoría", d: "No puede desactivarse.", locked: true },
            ].map((p) => (
              <label key={p.l} className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 px-3 py-2.5">
                <span><span className="block text-sm font-medium text-slate-800">{p.l}</span><span className="text-xs text-slate-400">{p.d}</span></span>
                <input type="checkbox" defaultChecked disabled={p.locked} className="h-4 w-4 rounded border-slate-300 text-kelder-600" />
              </label>
            ))}
          </Card>
        </div>
      )}

      {tab === "versionado" && (
        <Card className="p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900"><History size={16} className="text-slate-400" />Versionado de contenido</h2>
          <p className="mt-1 text-sm text-slate-500">Para Landing, Publicidad, Promociones y Home se conservan versiones anteriores. Puedes ver, comparar y restaurar.</p>
          <div className="mt-4 divide-y divide-slate-100 rounded-lg border border-slate-200">
            {[
              { v: "v4 — actual", quien: "Victoria", fecha: "Hoy, 09:14", actual: true },
              { v: "v3", quien: "Mercadotecnia", fecha: "Ayer, 17:40" },
              { v: "v2", quien: "Ecommerce", fecha: "10 ago 2026" },
            ].map((r) => (
              <div key={r.v} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1"><p className="text-sm font-medium text-slate-900">{r.v}</p><p className="text-xs text-slate-400">{r.quien} · {r.fecha}</p></div>
                {r.actual ? <Pill tone="green">Actual</Pill> : <><Btn size="sm">Comparar</Btn><Btn size="sm">Restaurar</Btn></>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

import { useState } from "react";
import { Lock, Pencil, Store } from "lucide-react";
import { PageHeader, Card, Toolbar, Table, Th, Td, Btn, Pill, Drawer, Field, Textarea, Input } from "../ui";
import { tiendas } from "../lib/data";
import type { Tienda } from "../lib/data";

export function TiendasAdmin() {
  const [edit, setEdit] = useState<Tienda | null>(null);
  return (
    <div className="space-y-5">
      <PageHeader
        title="Tiendas"
        subtitle="Los datos maestros provienen de otro sistema (solo lectura). Aquí administras únicamente el contenido editorial y su visibilidad."
      />
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
        <Lock size={13} /> Nombre, unidad, plaza, dirección, horario y teléfono son <span className="font-medium text-slate-700">solo lectura</span> (sincronizados del maestro de sucursales).
      </div>
      <Card>
        <Toolbar search="Buscar tienda…" />
        <Table head={<>
          <Th className="pl-4">Tienda</Th><Th>Plaza</Th><Th>Dirección</Th><Th>Horario</Th><Th>Teléfono</Th><Th>Visible</Th><Th className="text-right pr-4">Editorial</Th>
        </>}>
          {tiendas.map((t) => (
            <tr key={t.id} className="hover:bg-slate-50">
              <Td className="pl-4"><div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-400"><Store size={15} /></span><div><span className="font-medium text-slate-900">{t.nombre}</span><span className="block text-xs text-slate-400">{t.unidad}</span></div></div></Td>
              <Td><span className="text-slate-500">{t.plaza}</span></Td>
              <Td><span className="text-slate-500">{t.direccion}</span></Td>
              <Td><span className="text-slate-500">{t.horario}</span></Td>
              <Td><span className="text-slate-500">{t.telefono}</span></Td>
              <Td><Pill tone={t.visible ? "green" : "slate"}>{t.visible ? "Visible" : "Oculta"}</Pill></Td>
              <Td className="pr-4"><div className="flex justify-end"><Btn size="sm" onClick={() => setEdit(t)}><Pencil size={14} />Editar</Btn></div></Td>
            </tr>
          ))}
        </Table>
      </Card>

      <Drawer open={!!edit} onClose={() => setEdit(null)} title={edit ? `Editorial · ${edit.nombre}` : ""}
        footer={<><Btn onClick={() => setEdit(null)}>Cancelar</Btn><Btn variant="primary" onClick={() => setEdit(null)}>Guardar</Btn></>}>
        {edit && (
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
              <p className="flex items-center gap-1.5 font-medium text-slate-600"><Lock size={12} />Datos maestros (solo lectura)</p>
              <p className="mt-1.5">{edit.nombre} · {edit.plaza}</p><p>{edit.direccion}</p><p>{edit.horario} · {edit.telefono}</p>
            </div>
            <Field label="Fotografía visible"><Input placeholder="Subir o reemplazar foto de la tienda" /></Field>
            <Field label="Descripción"><Textarea placeholder="Descripción editorial de la tienda." /></Field>
            <Field label="Promociones destacadas"><Input placeholder="Vincular promociones" /></Field>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" defaultChecked={edit.visible} className="h-4 w-4 rounded border-slate-300 text-kelder-600" />
              Visible en Kelder Club+
            </label>
          </div>
        )}
      </Drawer>
    </div>
  );
}

import { useState } from "react";
import { Plus, LayoutGrid } from "lucide-react";
import { PageHeader, Card, Toolbar, Table, Th, Td, StatusPill, RowMenu, Btn, Drawer, Field, Input, Textarea, Select } from "../ui";
import { colecciones, segmentos } from "../lib/data";

export function Colecciones() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-5">
      <PageHeader title="Colecciones" subtitle="Agrupaciones editoriales de productos (Regreso a clases, Running, Tendencias…)."
        actions={<Btn variant="primary" onClick={() => setOpen(true)}><Plus size={16} />Nueva colección</Btn>} />
      <Card>
        <Toolbar search="Buscar colección…" />
        <Table head={<>
          <Th className="pl-4">Nombre</Th><Th>Productos</Th><Th>Audiencia</Th><Th>Vigencia</Th><Th>Estado</Th><Th className="text-right pr-4">Acciones</Th>
        </>}>
          {colecciones.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50">
              <Td className="pl-4"><div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-400"><LayoutGrid size={15} /></span><span className="font-medium text-slate-900">{c.nombre}</span></div></Td>
              <Td><span className="text-slate-600">{c.productos} productos</span></Td>
              <Td><span className="text-slate-500">{c.audiencia}</span></Td>
              <Td><span className="text-slate-500">{c.desde}{c.hasta ? ` – ${c.hasta}` : c.desde !== "—" ? " · sin término" : ""}</span></Td>
              <Td><StatusPill estado={c.estado} /></Td>
              <Td className="pr-4"><div className="flex items-center justify-end gap-1"><Btn size="sm">Editar</Btn><RowMenu items={[{ label: "Duplicar" }, { label: "Desactivar" }, { label: "Eliminar", danger: true }]} /></div></Td>
            </tr>
          ))}
        </Table>
      </Card>

      <Drawer open={open} onClose={() => setOpen(false)} title="Nueva colección"
        footer={<><Btn onClick={() => setOpen(false)}>Guardar borrador</Btn><Btn variant="primary" onClick={() => setOpen(false)}>Publicar</Btn></>}>
        <div className="space-y-4">
          <Field label="Nombre" required><Input placeholder="Ej. Regreso a clases" /></Field>
          <Field label="Descripción"><Textarea placeholder="Breve descripción editorial de la colección." /></Field>
          <Field label="Productos incluidos"><Input placeholder="Buscar por SKU o nombre" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Vigencia — inicio"><Input type="date" /></Field>
            <Field label="Vigencia — fin"><Input type="date" /></Field>
          </div>
          <Field label="Audiencia"><Select>{segmentos.filter((s) => s.disponible).map((s) => <option key={s.nombre}>{s.nombre}</option>)}</Select></Field>
          <Field label="CTA"><Input defaultValue="Ver colección" /></Field>
        </div>
      </Drawer>
    </div>
  );
}

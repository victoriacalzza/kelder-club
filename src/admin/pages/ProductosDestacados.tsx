import { useState } from "react";
import { Plus, Search, Lock } from "lucide-react";
import { PageHeader, Card, Table, Th, Td, Btn, RowMenu, Drawer, Field, Input, Pill } from "../ui";
import { productosDestacados } from "../lib/data";

export function ProductosDestacados() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-5">
      <PageHeader
        title="Productos destacados"
        subtitle="Selecciona productos del catálogo para destacarlos. El catálogo y la disponibilidad provienen de otro sistema (solo lectura)."
        actions={<Btn variant="primary" onClick={() => setOpen(true)}><Plus size={16} />Destacar producto</Btn>}
      />
      <Card>
        <div className="flex items-center gap-2 border-b border-slate-200 p-3">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input placeholder="Buscar por SKU, nombre, marca o categoría…" className="h-9 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100" />
          </div>
        </div>
        <Table head={<>
          <Th className="pl-4">Producto</Th><Th>SKU</Th><Th>Marca</Th><Th>Categoría</Th><Th>Campaña</Th><Th>Orden</Th><Th>Disponibilidad</Th><Th className="text-right pr-4">Acciones</Th>
        </>}>
          {productosDestacados.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50">
              <Td className="pl-4"><div className="flex items-center gap-2.5"><span className="h-8 w-8 rounded-md bg-slate-100" /><span className="font-medium text-slate-900">{p.nombre}</span></div></Td>
              <Td><span className="font-mono text-xs text-slate-500">{p.sku}</span></Td>
              <Td><span className="text-slate-600">{p.marca}</span></Td>
              <Td><span className="text-slate-500">{p.categoria}</span></Td>
              <Td>{p.campania ? <Pill tone="blue">{p.campania}</Pill> : <span className="text-slate-300">—</span>}</Td>
              <Td><span className="text-slate-500">{p.orden}</span></Td>
              <Td><span className="inline-flex items-center gap-1 text-xs text-slate-400"><Lock size={11} />{p.disponibilidad}</span></Td>
              <Td className="pr-4"><div className="flex items-center justify-end gap-1"><Btn size="sm">Editar</Btn><RowMenu items={[{ label: "Cambiar orden" }, { label: "Quitar de destacados", danger: true }]} /></div></Td>
            </tr>
          ))}
        </Table>
      </Card>

      <Drawer open={open} onClose={() => setOpen(false)} title="Destacar producto del catálogo"
        footer={<><Btn onClick={() => setOpen(false)}>Cancelar</Btn><Btn variant="primary" onClick={() => setOpen(false)}>Agregar</Btn></>}>
        <div className="space-y-4">
          <Field label="Buscar producto" hint="El catálogo proviene de otro sistema (solo lectura).">
            <Input placeholder="SKU, nombre o marca" />
          </Field>
          <div className="rounded-lg border border-slate-200 divide-y divide-slate-100">
            {["New Balance 574", "Adidas Samba OG", "Puma Palermo"].map((n) => (
              <button key={n} className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-slate-50">
                <span className="h-8 w-8 rounded-md bg-slate-100" /><span className="flex-1 text-slate-700">{n}</span><Plus size={15} className="text-slate-400" />
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Campaña asociada"><Input placeholder="Ej. Nuevos ingresos" /></Field>
            <Field label="Orden"><Input type="number" defaultValue={1} /></Field>
          </div>
          <Field label="Tiendas / unidades donde se mostrará"><Input placeholder="Todas" /></Field>
        </div>
      </Drawer>
    </div>
  );
}

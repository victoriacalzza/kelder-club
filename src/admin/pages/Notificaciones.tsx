import { useState } from "react";
import { Plus, Users, AlertTriangle } from "lucide-react";
import { PageHeader, Card, Toolbar, Table, Th, Td, StatusPill, RowMenu, Btn, Drawer, Modal, Field, Input, Textarea, Select, Pill } from "../ui";
import { notificaciones, segmentos } from "../lib/data";
import type { NotifTipo } from "../lib/data";

const TIPOS: NotifTipo[] = ["Promoción", "Cashback/puntos", "Crédito", "CrediVale", "Pedido", "Tienda", "General"];

export function Notificaciones() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const estimado = 48210;

  return (
    <div className="space-y-5">
      <PageHeader title="Notificaciones" subtitle="Push e in-app para los miembros de Kelder Club+."
        actions={<Btn variant="primary" onClick={() => setOpen(true)}><Plus size={16} />Nueva notificación</Btn>} />
      <Card>
        <Toolbar search="Buscar notificación…" />
        <Table head={<>
          <Th className="pl-4">Título</Th><Th>Tipo</Th><Th>Audiencia</Th><Th>Programación</Th><Th>Estado</Th><Th>Enviadas</Th><Th>Aperturas</Th><Th className="text-right pr-4">Acciones</Th>
        </>}>
          {notificaciones.map((n) => (
            <tr key={n.id} className="hover:bg-slate-50">
              <Td className="pl-4"><span className="font-medium text-slate-900">{n.titulo}</span></Td>
              <Td><Pill tone="blue">{n.tipo}</Pill></Td>
              <Td><span className="text-slate-500">{n.audiencia}</span></Td>
              <Td><span className="text-slate-500">{n.programacion}</span></Td>
              <Td><StatusPill estado={n.estado} /></Td>
              <Td>{n.enviadas != null ? n.enviadas.toLocaleString("es-MX") : <span className="text-slate-300">—</span>}</Td>
              <Td>{n.aperturas != null ? `${n.aperturas}%` : <span className="text-slate-300">—</span>}</Td>
              <Td className="pr-4"><div className="flex items-center justify-end gap-1"><Btn size="sm">Editar</Btn><RowMenu items={[{ label: "Duplicar" }, { label: "Ver historial" }, { label: "Cancelar envío", danger: true }]} /></div></Td>
            </tr>
          ))}
        </Table>
      </Card>

      <Drawer open={open} onClose={() => setOpen(false)} title="Nueva notificación"
        footer={<><Btn onClick={() => setOpen(false)}>Guardar borrador</Btn><Btn variant="primary" onClick={() => setConfirm(true)}>Programar / Enviar</Btn></>}>
        <div className="space-y-4">
          <Field label="Título" required><Input placeholder="Ej. ¡Llegó el Regreso a Clases!" /></Field>
          <Field label="Mensaje" required><Textarea placeholder="Texto del push (máx. recomendado 120 caracteres)." /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tipo"><Select>{TIPOS.map((t) => <option key={t}>{t}</option>)}</Select></Field>
            <Field label="Destino"><Select><option>Promociones</option><option>Cashback</option><option>Tienda</option><option>Pantalla específica…</option></Select></Field>
          </div>
          <Field label="CTA"><Input defaultValue="Ver ahora" /></Field>
          <Field label="Imagen (opcional)"><Input placeholder="Sin imagen" /></Field>
          <Field label="Audiencia"><Select>{segmentos.filter((s) => s.disponible).map((s) => <option key={s.nombre}>{s.nombre}</option>)}</Select></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Fecha"><Input type="date" /></Field>
            <Field label="Hora"><Input type="time" /></Field>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
            <Users size={16} className="text-slate-400" />
            Esta notificación será enviada a aproximadamente <span className="font-semibold text-slate-900">{estimado.toLocaleString("es-MX")}</span> usuarios.
          </div>
        </div>
      </Drawer>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Confirmar envío masivo"
        footer={<><Btn onClick={() => setConfirm(false)}>Cancelar</Btn><Btn variant="primary" onClick={() => { setConfirm(false); setOpen(false); }}>Sí, enviar</Btn></>}>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600"><AlertTriangle size={16} /></span>
          <p>Estás a punto de enviar esta notificación a aproximadamente <span className="font-semibold text-slate-900">{estimado.toLocaleString("es-MX")}</span> usuarios. Esta acción no se puede deshacer una vez enviada.</p>
        </div>
      </Modal>
    </div>
  );
}

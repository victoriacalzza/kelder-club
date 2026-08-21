import { PageHeader, Card, Table, Th, Td, Btn, Select } from "../ui";
import { auditoria } from "../lib/data";

export function Auditoria() {
  return (
    <div className="space-y-5">
      <PageHeader title="Auditoría" subtitle="Historial completo y trazable de cambios en el backoffice." actions={<Btn>Exportar</Btn>} />
      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 p-3">
          <Select className="w-auto"><option>Todas las fechas</option><option>Hoy</option><option>Últimos 7 días</option><option>Este mes</option></Select>
          <Select className="w-auto"><option>Todos los usuarios</option><option>Victoria</option><option>Mercadotecnia</option><option>Ecommerce</option></Select>
          <Select className="w-auto"><option>Todos los módulos</option><option>Publicidad</option><option>Promociones</option><option>Home</option><option>Landing</option><option>Notificaciones</option></Select>
          <Select className="w-auto"><option>Todas las acciones</option><option>Creó</option><option>Modificó</option><option>Publicó</option><option>Desactivó</option></Select>
        </div>
        <Table head={<>
          <Th className="pl-4">Usuario</Th><Th>Acción</Th><Th>Módulo</Th><Th>Registro</Th><Th>Cambio</Th><Th className="text-right pr-4">Fecha</Th>
        </>}>
          {auditoria.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50">
              <Td className="pl-4"><span className="font-medium text-slate-900">{a.usuario}</span></Td>
              <Td><span className="text-slate-600">{a.accion}</span></Td>
              <Td><span className="text-slate-500">{a.modulo}</span></Td>
              <Td><span className="text-slate-700">{a.registro}</span></Td>
              <Td><span className="text-slate-400">{a.antes}</span><span className="mx-1.5 text-slate-300">→</span><span className="font-medium text-slate-700">{a.despues}</span></Td>
              <Td className="pr-4 text-right"><span className="text-slate-500">{a.fecha}</span></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}

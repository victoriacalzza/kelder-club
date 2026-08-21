import { useState } from "react";
import { Plus, Check, Minus, GitBranch } from "lucide-react";
import { PageHeader, Card, Table, Th, Td, Btn, Pill, RowMenu, Drawer, Field, Input, Select, cx } from "../ui";
import { adminUsuarios } from "../lib/data";
import { ROLE_LABEL, ROLE_PERMISOS, type AdminRole, type Permiso } from "../lib/adminAuth";

const ROLES: AdminRole[] = ["admin", "mercadotecnia", "ecommerce", "atencion", "lectura"];
const PERMISOS: Permiso[] = ["ver", "crear", "editar", "publicar", "eliminar"];
const PERMISO_LABEL: Record<Permiso, string> = { ver: "Ver", crear: "Crear", editar: "Editar", publicar: "Publicar", eliminar: "Eliminar" };

export function Usuarios() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-5">
      <PageHeader title="Usuarios y permisos" subtitle="Personal administrativo del backoffice. Separado de los usuarios cliente de Kelder Club+."
        actions={<Btn variant="primary" onClick={() => setOpen(true)}><Plus size={16} />Invitar usuario</Btn>} />

      <Card>
        <div className="border-b border-slate-200 px-4 py-3"><h2 className="text-sm font-semibold text-slate-900">Usuarios</h2></div>
        <Table head={<><Th className="pl-4">Usuario</Th><Th>Rol</Th><Th>Estado</Th><Th>Último acceso</Th><Th className="text-right pr-4">Acciones</Th></>}>
          {adminUsuarios.map((u) => (
            <tr key={u.id} className="hover:bg-slate-50">
              <Td className="pl-4"><div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">{u.nombre.slice(0, 2).toUpperCase()}</span><div><span className="font-medium text-slate-900">{u.nombre}</span><span className="block text-xs text-slate-400">{u.email}</span></div></div></Td>
              <Td><span className="text-slate-600">{u.rol}</span></Td>
              <Td><Pill tone={u.estado === "Activo" ? "green" : u.estado === "Invitado" ? "amber" : "slate"}>{u.estado}</Pill></Td>
              <Td><span className="text-slate-500">{u.ultimoAcceso}</span></Td>
              <Td className="pr-4"><div className="flex items-center justify-end gap-1"><Btn size="sm">Editar</Btn><RowMenu items={[{ label: "Cambiar rol" }, { label: "Reenviar invitación" }, { label: "Desactivar", danger: true }]} /></div></Td>
            </tr>
          ))}
        </Table>
      </Card>

      {/* Matriz de permisos por rol */}
      <Card>
        <div className="border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Permisos por rol</h2>
          <p className="mt-0.5 text-xs text-slate-500"><span className="font-medium text-slate-700">Crear</span> y <span className="font-medium text-slate-700">Publicar</span> son permisos separados: un rol puede preparar contenido sin poder publicarlo.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
              <th className="px-4 py-2.5 font-medium">Rol</th>
              {PERMISOS.map((p) => <th key={p} className="px-4 py-2.5 text-center font-medium">{PERMISO_LABEL[p]}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {ROLES.map((r) => (
                <tr key={r}>
                  <td className="px-4 py-3 font-medium text-slate-900">{ROLE_LABEL[r]}</td>
                  {PERMISOS.map((p) => {
                    const on = ROLE_PERMISOS[r].includes(p);
                    return <td key={p} className="px-4 py-3 text-center">
                      <span className={cx("inline-flex h-6 w-6 items-center justify-center rounded-md", on ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-300")}>
                        {on ? <Check size={14} /> : <Minus size={14} />}
                      </span>
                    </td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Flujo de aprobación */}
      <Card className="p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900"><GitBranch size={16} className="text-slate-400" />Flujo de aprobación (opcional)</h2>
        <p className="mt-1 text-xs text-slate-500">Puede activarse por rol. El Administrador general puede publicar directamente.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">
          {["Borrador", "Pendiente de aprobación", "Aprobado", "Programado / Publicado"].map((s, i, arr) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600">{s}</span>
              {i < arr.length - 1 && <span className="text-slate-300">→</span>}
            </span>
          ))}
        </div>
      </Card>

      <Drawer open={open} onClose={() => setOpen(false)} title="Invitar usuario"
        footer={<><Btn onClick={() => setOpen(false)}>Cancelar</Btn><Btn variant="primary" onClick={() => setOpen(false)}>Enviar invitación</Btn></>}>
        <div className="space-y-4">
          <Field label="Nombre" required><Input placeholder="Nombre completo" /></Field>
          <Field label="Correo corporativo" required><Input type="email" placeholder="nombre@garlo.mx" /></Field>
          <Field label="Rol"><Select>{ROLES.map((r) => <option key={r}>{ROLE_LABEL[r]}</option>)}</Select></Field>
          <p className="text-xs text-slate-400">El usuario recibirá una invitación para configurar su acceso. Los usuarios administrativos no se mezclan con los clientes de Kelder Club+.</p>
        </div>
      </Drawer>
    </div>
  );
}

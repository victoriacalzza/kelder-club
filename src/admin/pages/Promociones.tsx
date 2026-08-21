import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { PageHeader, Card, Toolbar, Table, Th, Td, StatusPill, CanalBadge, RowMenu, Btn } from "../ui";
import { promociones } from "../lib/data";

export function Promociones() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const rows = promociones.filter((p) => p.nombre.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-5">
      <PageHeader
        title="Promociones"
        subtitle="Administra promociones y su canal de aplicación (tienda física / online)."
        actions={<Btn variant="primary" onClick={() => navigate("/admin/promociones/nueva")}><Plus size={16} />Nueva promoción</Btn>}
      />
      <Card>
        <Toolbar search="Buscar promoción…" onSearch={setQ} />
        <Table head={<>
          <Th className="pl-4">Nombre</Th><Th>Beneficio</Th><Th>Canal</Th><Th>Tiendas</Th><Th>Vigencia</Th><Th>Estado</Th><Th className="text-right pr-4">Acciones</Th>
        </>}>
          {rows.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50">
              <Td className="pl-4"><span className="font-medium text-slate-900">{p.nombre}</span><span className="block text-xs text-slate-400">{p.unidad}</span></Td>
              <Td><span className="text-slate-600">{p.beneficio}</span></Td>
              <Td><CanalBadge canal={p.canal} /></Td>
              <Td><span className="text-slate-500">{p.tiendas}</span></Td>
              <Td><span className="text-slate-500">{p.desde}{p.hasta ? ` – ${p.hasta}` : p.desde !== "—" ? " · sin término" : ""}</span></Td>
              <Td><StatusPill estado={p.estado} /></Td>
              <Td className="pr-4">
                <div className="flex items-center justify-end gap-1">
                  <Btn size="sm" onClick={() => navigate("/admin/promociones/nueva")}>Editar</Btn>
                  <RowMenu items={[{ label: "Duplicar" }, { label: "Ver historial" }, { label: "Desactivar" }, { label: "Eliminar", danger: true }]} />
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}

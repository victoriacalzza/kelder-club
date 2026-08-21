import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Megaphone } from "lucide-react";
import { PageHeader, Card, Toolbar, Table, Th, Td, StatusPill, RowMenu, Btn, EmptyState } from "../ui";
import { banners } from "../lib/data";

export function Publicidad() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const rows = banners.filter((b) => b.nombre.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Publicidad / Banners"
        subtitle="Gestiona las campañas visuales de la app, web y landing."
        actions={<Btn variant="primary" onClick={() => navigate("/admin/publicidad/nueva")}><Plus size={16} />Nueva publicidad</Btn>}
      />
      <Card>
        <Toolbar search="Buscar campaña…" onSearch={setQ} />
        {rows.length === 0 ? (
          <EmptyState
            icon={<Megaphone size={22} />}
            title="No hay campañas que coincidan"
            hint="Ajusta la búsqueda o crea una nueva publicidad para empezar."
            action={<Btn variant="primary" onClick={() => navigate("/admin/publicidad/nueva")}><Plus size={16} />Crear publicidad</Btn>}
          />
        ) : (
          <Table head={<>
            <Th className="pl-4">Campaña</Th><Th>Ubicación</Th><Th>Audiencia</Th><Th>Vigencia</Th><Th>Estado</Th><Th>Última modificación</Th><Th className="text-right pr-4">Acciones</Th>
          </>}>
            {rows.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <Td className="pl-4"><span className="font-medium text-slate-900">{b.nombre}</span></Td>
                <Td><span className="text-slate-500">{b.ubicaciones.join(", ")}</span></Td>
                <Td><span className="text-slate-500">{b.audiencia}</span></Td>
                <Td><span className="text-slate-500">{b.desde}{b.hasta ? ` – ${b.hasta}` : b.desde !== "—" ? " · sin término" : ""}</span></Td>
                <Td><StatusPill estado={b.estado} /></Td>
                <Td><span className="text-slate-500">{b.modificado}</span><span className="block text-xs text-slate-400">por {b.modificadoPor}</span></Td>
                <Td className="pr-4">
                  <div className="flex items-center justify-end gap-1">
                    <Btn size="sm">Editar</Btn>
                    <RowMenu items={[{ label: "Duplicar" }, { label: "Ver historial" }, { label: "Desactivar" }, { label: "Eliminar", danger: true }]} />
                  </div>
                </Td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
}

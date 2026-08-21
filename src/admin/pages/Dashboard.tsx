import { useNavigate } from "react-router-dom";
import { Megaphone, Percent, Bell, CalendarClock, AlertTriangle, Plus, ArrowUpRight } from "lucide-react";
import { PageHeader, Card, Btn } from "../ui";
import { auditoria } from "../lib/data";

const KPIS = [
  { label: "Campañas activas", value: 3, icon: Megaphone, to: "/admin/publicidad" },
  { label: "Banners publicados", value: 4, icon: Megaphone, to: "/admin/publicidad" },
  { label: "Promociones vigentes", value: 2, icon: Percent, to: "/admin/promociones" },
  { label: "Contenidos programados", value: 5, icon: CalendarClock, to: "/admin/publicidad" },
  { label: "Próximos a vencer", value: 2, icon: CalendarClock, to: "/admin/publicidad" },
  { label: "Notificaciones programadas", value: 1, icon: Bell, to: "/admin/notificaciones" },
];

const ATENCION = [
  { txt: "El banner “Regreso a Clases” vence mañana.", to: "/admin/publicidad" },
  { txt: "La promoción “2x1 en calcetería” no tiene imagen mobile.", to: "/admin/promociones" },
  { txt: "Campaña “Aniversario Calzzapato” programada sin destino.", to: "/admin/publicidad" },
  { txt: "La sección “Tiendas” de la Landing tiene un cambio pendiente de publicar.", to: "/admin/landing" },
];

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Inicio"
        subtitle="Resumen operativo del contenido de Kelder Club+."
        actions={<Btn variant="primary" onClick={() => navigate("/admin/publicidad/nueva")}><Plus size={16} />Nueva publicidad</Btn>}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <button key={k.label} onClick={() => navigate(k.to)} className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-slate-300">
              <Icon size={18} className="text-slate-400" />
              <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{k.value}</p>
              <p className="mt-0.5 text-[13px] text-slate-500">{k.label}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Requiere atención */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
            <AlertTriangle size={16} className="text-amber-500" />
            <h2 className="text-sm font-semibold text-slate-900">Requiere atención</h2>
            <span className="ml-auto rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200">{ATENCION.length}</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {ATENCION.map((a) => (
              <li key={a.txt}>
                <button onClick={() => navigate(a.to)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span className="flex-1 text-[13px] text-slate-700">{a.txt}</span>
                  <ArrowUpRight size={15} className="shrink-0 text-slate-300" />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Actividad reciente */}
        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">Actividad reciente</h2>
            <button onClick={() => navigate("/admin/auditoria")} className="text-xs font-medium text-kelder-600 hover:text-kelder-700">Ver auditoría</button>
          </div>
          <ul className="divide-y divide-slate-100">
            {auditoria.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
                  {a.usuario.slice(0, 2).toUpperCase()}
                </span>
                <p className="flex-1 text-[13px] text-slate-700">
                  <span className="font-medium text-slate-900">{a.usuario}</span> {a.accion.toLowerCase()} <span className="font-medium text-slate-900">{a.registro}</span>
                  <span className="text-slate-400"> · {a.modulo}</span>
                </p>
                <span className="shrink-0 text-xs text-slate-400">{a.fecha}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

import { Check, Info } from "lucide-react";
import { PageHeader, Card, Pill, cx } from "../ui";
import { segmentos } from "../lib/data";

export function Segmentacion() {
  const disponibles = segmentos.filter((s) => s.disponible);
  const futuros = segmentos.filter((s) => !s.disponible);
  return (
    <div className="space-y-5">
      <PageHeader title="Segmentaciones" subtitle="Criterios para dirigir contenido y campañas a la audiencia correcta." />

      <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm text-blue-800">
        <Info size={16} className="mt-0.5 shrink-0" />
        Solo se muestran como disponibles las segmentaciones con datos realmente conectados. El resto se marca <span className="font-medium">Próximamente</span> hasta integrarse.
      </div>

      <Card>
        <div className="border-b border-slate-200 px-4 py-3"><h2 className="text-sm font-semibold text-slate-900">Disponibles</h2></div>
        <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {disponibles.map((s) => (
            <div key={s.nombre} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 text-sm">
              <span className="font-medium text-slate-800">{s.nombre}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50 text-emerald-600"><Check size={13} /></span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="border-b border-slate-200 px-4 py-3"><h2 className="text-sm font-semibold text-slate-900">Próximamente</h2><p className="mt-0.5 text-xs text-slate-500">Requieren integración con otros sistemas (crédito, puntos, comportamiento).</p></div>
        <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {futuros.map((s) => (
            <div key={s.nombre} className={cx("flex items-center justify-between rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2.5 text-sm")}>
              <span className="text-slate-400">{s.nombre}</span>
              <Pill tone="slate">Próximamente</Pill>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

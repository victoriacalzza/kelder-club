import { useState } from "react";
import { ArrowUp, ArrowDown, Eye, Lock, GripVertical, Pencil } from "lucide-react";
import { PageHeader, Card, Btn, Pill } from "../ui";
import { homeBloques as seed } from "../lib/data";

export function HomeAdmin() {
  const [bloques, setBloques] = useState(seed);

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= bloques.length) return;
    const copy = [...bloques];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setBloques(copy);
  }
  function toggle(id: string) {
    setBloques((p) => p.map((b) => (b.id === id ? { ...b, activo: !b.activo } : b)));
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Home"
        subtitle="Activa, reordena y programa los bloques del Home. La estructura base no puede romperse."
        actions={<Btn><Eye size={16} />Vista previa</Btn>}
      />
      <Card>
        <div className="divide-y divide-slate-100">
          {bloques.map((b, i) => (
            <div key={b.id} className="flex items-center gap-3 px-4 py-3">
              <span className="text-slate-300"><GripVertical size={16} /></span>
              <div className="flex flex-col">
                <button disabled={i === 0} onClick={() => move(i, -1)} className="text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp size={14} /></button>
                <button disabled={i === bloques.length - 1} onClick={() => move(i, 1)} className="text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown size={14} /></button>
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  {b.nombre}
                  {b.bloqueado && <span className="inline-flex items-center gap-1 text-xs text-slate-400"><Lock size={11} />Fijo</span>}
                </p>
                <p className="text-xs text-slate-400">{b.tipo}{b.programado ? ` · ${b.programado}` : ""}</p>
              </div>
              {b.programado && <Pill tone="amber">Programado</Pill>}
              <Pill tone={b.activo ? "green" : "slate"}>{b.activo ? "Activo" : "Inactivo"}</Pill>
              <Btn size="sm" disabled={b.bloqueado}><Pencil size={14} />Editar</Btn>
              <label className="inline-flex cursor-pointer items-center">
                <input type="checkbox" checked={b.activo} disabled={b.bloqueado} onChange={() => toggle(b.id)} className="peer sr-only" />
                <span className="h-5 w-9 rounded-full bg-slate-200 p-0.5 transition-colors peer-checked:bg-kelder-600 peer-disabled:opacity-40">
                  <span className="block h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                </span>
              </label>
            </div>
          ))}
        </div>
      </Card>
      <p className="text-xs text-slate-400">El bloque “Hero / Saldo” es estructural y no puede desactivarse ni moverse para no romper el diseño de la app.</p>
    </div>
  );
}

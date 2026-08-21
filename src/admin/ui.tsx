import { useState, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { Search, SlidersHorizontal, MoreHorizontal, X, Check, Monitor, Smartphone, AppWindow } from "lucide-react";
import type { Estado, Canal } from "./lib/data";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ── Botones ─────────────────────────────────────────────── */
type BtnVariant = "primary" | "secondary" | "ghost" | "danger";
export function Btn({
  children, variant = "secondary", size = "md", className = "", ...rest
}: { children: ReactNode; variant?: BtnVariant; size?: "sm" | "md" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 whitespace-nowrap";
  const sizes = size === "sm" ? "h-8 px-3 text-[13px]" : "h-9 px-3.5 text-sm";
  const variants: Record<BtnVariant, string> = {
    primary: "bg-kelder-600 text-white hover:bg-kelder-700",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
  };
  return (
    <button className={cx(base, sizes, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/* ── Card / PageHeader ───────────────────────────────────── */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-xl border border-slate-200 bg-white shadow-sm", className)}>{children}</div>;
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ── Estados / Badges ────────────────────────────────────── */
const ESTADO_STYLE: Record<Estado, string> = {
  borrador: "bg-slate-100 text-slate-600 ring-slate-200",
  programado: "bg-amber-50 text-amber-700 ring-amber-200",
  publicado: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  pausado: "bg-slate-100 text-slate-500 ring-slate-200",
  finalizado: "bg-slate-50 text-slate-400 ring-slate-200",
};
const ESTADO_LABEL: Record<Estado, string> = {
  borrador: "Borrador", programado: "Programado", publicado: "Publicado", pausado: "Pausado", finalizado: "Finalizado",
};
export function StatusPill({ estado }: { estado: Estado }) {
  return <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset", ESTADO_STYLE[estado])}>
    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{ESTADO_LABEL[estado]}
  </span>;
}

export function Pill({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "green" | "amber" | "red" | "blue" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-kelder-50 text-kelder-700 ring-kelder-100",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
  } as const;
  return <span className={cx("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset", tones[tone])}>{children}</span>;
}

// Canal muy visible (tienda física vs online) — requisito del negocio.
export function CanalBadge({ canal }: { canal: Canal }) {
  const map = {
    tienda: { label: "Solo tienda", tone: "amber" as const },
    online: { label: "Solo online", tone: "blue" as const },
    ambos: { label: "Tienda y online", tone: "green" as const },
  };
  return <Pill tone={map[canal].tone}>{map[canal].label}</Pill>;
}

/* ── Tabla ───────────────────────────────────────────────── */
export function Table({ head, children }: { head: ReactNode; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wide text-slate-400">{head}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}
export function Th({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <th className={cx("px-4 py-2.5 font-medium", className)}>{children}</th>;
}
export function Td({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <td className={cx("px-4 py-3 align-middle text-slate-700", className)}>{children}</td>;
}

/* ── Menú de fila (3 puntos) ─────────────────────────────── */
export function RowMenu({ items }: { items: { label: string; onClick?: () => void; danger?: boolean }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Más acciones">
        <MoreHorizontal size={18} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {items.map((it) => (
              <button key={it.label} onClick={() => { setOpen(false); it.onClick?.(); }} className={cx("block w-full px-3 py-2 text-left text-sm hover:bg-slate-50", it.danger ? "text-red-600" : "text-slate-700")}>
                {it.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Toolbar (búsqueda + filtros) ────────────────────────── */
export function Toolbar({ search = "Buscar…", onSearch, filtros, right }: { search?: string; onSearch?: (v: string) => void; filtros?: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 p-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input onChange={(e) => onSearch?.(e.target.value)} placeholder={search} className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-100" />
      </div>
      {filtros}
      <Btn size="sm"><SlidersHorizontal size={15} />Filtros</Btn>
      {right}
    </div>
  );
}

/* ── Estado vacío ────────────────────────────────────────── */
export function EmptyState({ title, hint, action, icon }: { title: string; hint?: string; action?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {icon && <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">{icon}</div>}
      <p className="text-sm font-medium text-slate-900">{title}</p>
      {hint && <p className="mt-1 max-w-sm text-sm text-slate-500">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* ── Formularios ─────────────────────────────────────────── */
export function Field({ label, hint, children, required }: { label: string; hint?: string; children: ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-slate-700">{label}{required && <span className="text-kelder-600"> *</span>}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}
const inputCls = "h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-100";
export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx(inputCls, props.className)} />;
}
export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cx("min-h-[84px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-100", props.className)} />;
}
export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cx(inputCls, "appearance-none", props.className)} />;
}

/* ── Drawer (slide-over derecho) ─────────────────────────── */
export function Drawer({ open, onClose, title, children, footer, width = "max-w-lg" }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode; width?: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onClose} />
      <div className={cx("relative flex h-full w-full flex-col bg-white shadow-2xl", width)}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}

/* ── Modal de confirmación ───────────────────────────────── */
export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div className="px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <div className="mt-2 text-sm text-slate-600">{children}</div>
        </div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}

/* ── Tabs ────────────────────────────────────────────────── */
export function Tabs({ tabs, value, onChange }: { tabs: { id: string; label: string }[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-1 border-b border-slate-200">
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)} className={cx("relative px-3 py-2 text-sm font-medium", value === t.id ? "text-slate-900" : "text-slate-500 hover:text-slate-700")}>
          {t.label}
          {value === t.id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-kelder-600" />}
        </button>
      ))}
    </div>
  );
}

/* ── Preview segmentado (Desktop / Mobile / App) ─────────── */
export function PreviewTabs({ children }: { children?: ReactNode }) {
  const opts = [{ id: "desktop", label: "Desktop", icon: Monitor }, { id: "mobile", label: "Mobile", icon: Smartphone }, { id: "app", label: "App", icon: AppWindow }];
  const [v, setV] = useState("desktop");
  return (
    <div>
      <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
        {opts.map((o) => {
          const Icon = o.icon;
          return (
            <button key={o.id} onClick={() => setV(o.id)} className={cx("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium", v === o.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}>
              <Icon size={14} />{o.label}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
        <div className={cx("overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm", v === "mobile" ? "w-[280px]" : v === "app" ? "w-[300px]" : "w-full max-w-2xl")}>
          {children ?? <div className="p-8 text-center text-sm text-slate-400">Vista previa del contenido en contexto {v}.</div>}
        </div>
      </div>
    </div>
  );
}

/* ── Stepper del wizard ──────────────────────────────────── */
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      {steps.map((s, i) => {
        const done = i < current, active = i === current;
        return (
          <li key={s} className="flex items-center gap-2">
            <span className={cx("flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold", done ? "bg-kelder-600 text-white" : active ? "bg-kelder-50 text-kelder-700 ring-1 ring-kelder-200" : "bg-slate-100 text-slate-400")}>
              {done ? <Check size={13} /> : i + 1}
            </span>
            <span className={cx("hidden sm:inline", active ? "font-medium text-slate-900" : "text-slate-400")}>{s}</span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-5 bg-slate-200" />}
          </li>
        );
      })}
    </ol>
  );
}

/* ── Resumen clave/valor ─────────────────────────────────── */
export function KV({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium text-slate-900">{children}</span>
    </div>
  );
}

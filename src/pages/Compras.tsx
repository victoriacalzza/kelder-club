import { Receipt } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { compras, formatMXN } from "@/lib/mock-data";

export function Compras() {
  return (
    <div className="mx-auto max-w-3xl">
      <TopBar title="Compras" subtitle="Extracto de tus compras en tiendas del grupo." />

      <ol className="relative">
        {compras.map((c, i) => (
          <li key={c.id} className="relative flex gap-4 pb-6 last:pb-0">
            {i < compras.length - 1 && (
              <span className="absolute left-[21px] top-11 h-full w-px bg-ink-200" aria-hidden="true" />
            )}
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink-500 shadow-soft">
              <Receipt size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 rounded-2xl bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink-900">{c.sucursal}</p>
                  <p className="text-sm text-ink-500">{c.fecha}</p>
                </div>
                <p className="shrink-0 text-xl font-semibold text-ink-900">{formatMXN(c.monto)}</p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4 text-sm">
                <span className="font-medium text-success-600">+{formatMXN(c.cashback)} cashback generado</span>
                <a href={c.ticketUrl} className="font-medium text-kelder-600">
                  Ver ticket
                </a>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

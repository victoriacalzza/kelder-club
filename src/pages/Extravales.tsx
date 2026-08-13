import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { ExtravaleCard } from "@/components/ui/CrediValeCard";
import { extravales, formatMXN } from "@/lib/mock-data";

/**
 * Dedicated Extravales screen. Reached from the highlighted "Extravale disponible" block in
 * Crédito y Vales (and from Mi K). Keeps the Extravale highly visible without duplicating the
 * card inside the CrediVales screen. Extravales are AVAILABLE money, never a debt.
 */
export function Extravales() {
  const navigate = useNavigate();
  const total = extravales.reduce((s, v) => s + v.disponible, 0);

  return (
    <div className="mx-auto max-w-2xl">
      <BackButton to="/vales" label="Crédito y vales" />
      <TopBar title="Extravales" subtitle="Saldo disponible que te sobró de tus CrediVales. Úsalo cuando quieras antes de su vigencia." />

      {extravales.length > 0 ? (
        <>
          <div className="mb-5 rounded-2xl border border-success-100 bg-success-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-success-700">Total disponible</p>
            <p className="mt-0.5 text-3xl font-semibold tracking-tight text-ink-900">{formatMXN(total)}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {extravales.map((v) => (
              <ExtravaleCard key={v.id} vale={v} onClick={() => navigate(`/vales/${v.id}`)} />
            ))}
          </div>
        </>
      ) : (
        <p className="rounded-2xl border border-ink-100 bg-white px-5 py-10 text-center text-sm text-ink-500">
          No tienes Extravales disponibles por ahora.
        </p>
      )}
    </div>
  );
}

import type { Producto } from "@/lib/mock-data";
import { formatMXN, precioConCashback } from "@/lib/mock-data";

/**
 * Card for the "Aprovecha tu cashback" screen — it answers "what can I do with my $245", NOT
 * "here are more store products". So the hero is the ECONOMIC benefit: either "Te alcanza con tu
 * cashback" (price ≤ cashback) or a breakdown ending in a prominent "Tú pagas $X" (price > cashback).
 * Cashback is a positive benefit, so the discount reads in green — never red-as-debt. Store
 * availability is present but secondary (discovery lives in Home's "Disponible en tu tienda").
 */
export function CashbackProductCard({
  producto,
  cashback,
  disponibilidadLabel,
  onClick,
}: {
  producto: Producto;
  cashback: number;
  disponibilidadLabel?: string;
  onClick?: () => void;
}) {
  const alcanza = producto.precio <= cashback;
  const pagas = precioConCashback(producto.precio, cashback);

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-2xl border border-ink-100 bg-white p-4 text-left shadow-soft transition-shadow hover:shadow-card"
    >
      <span className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink-50">
        {producto.imagen ? (
          <img src={producto.imagen} alt={`${producto.marca} ${producto.modelo}`} className="h-full w-full object-contain p-2" />
        ) : (
          <span className="text-2xl font-semibold text-ink-300" aria-hidden="true">{producto.marca.slice(0, 1)}</span>
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs text-ink-400">{producto.marca}</span>
        <span className="block truncate text-[15px] font-medium text-ink-900">{producto.modelo}</span>

        {alcanza ? (
          <>
            <span className="mt-1 block text-lg font-semibold text-ink-900">{formatMXN(producto.precio)}</span>
            <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-xs font-semibold text-success-700">
              ✓ Te alcanza con tu cashback
            </span>
          </>
        ) : (
          <span className="mt-1.5 block max-w-[240px]">
            <span className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-ink-500">Precio</span>
              <span className="font-medium text-ink-700">{formatMXN(producto.precio)}</span>
            </span>
            <span className="mt-0.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="text-ink-500">Tu cashback</span>
              <span className="font-semibold text-success-700">−{formatMXN(cashback)}</span>
            </span>
            <span className="mt-1 flex items-baseline justify-between gap-3 border-t border-ink-100 pt-1">
              <span className="text-sm font-medium text-ink-900">Tú pagas</span>
              <span className="text-xl font-bold tracking-tight text-ink-900">{formatMXN(pagas)}</span>
            </span>
          </span>
        )}

        {disponibilidadLabel && (
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-success-700">
            <span className="h-1.5 w-1.5 rounded-full bg-success-600" aria-hidden="true" />
            {disponibilidadLabel}
          </span>
        )}
      </span>
    </button>
  );
}

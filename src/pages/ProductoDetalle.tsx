import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { catalogo, cuenta, sucursales, tiendaCercana, formatMXN, cashbackDe, precioConCashback, type Producto } from "@/lib/mock-data";

export function ProductoDetalle({ producto: prodProp }: { producto?: Producto }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = prodProp ?? catalogo.find((p) => p.id === id) ?? catalogo[0];
  const [talla, setTalla] = useState<number | null>(null);

  const cashbackGen = cashbackDe(producto.precio);
  const conCashback = precioConCashback(producto.precio, cuenta.cashbackDisponible);
  const tiendasDisponibles = sucursales.slice(0, producto.tiendas ?? 3);

  return (
    <div className="mx-auto max-w-5xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl pr-3 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Volver
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* photo */}
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-ink-100 bg-ink-50">
          {producto.imagen && (
            <img src={producto.imagen} alt={`${producto.marca} ${producto.modelo}`} className="h-full w-full object-contain p-8" />
          )}
        </div>

        {/* info */}
        <div className="flex flex-col">
          <p className="text-sm text-ink-500">{producto.marca}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900">{producto.modelo}</h1>
          <p className="mt-2 text-2xl font-semibold text-ink-900">{formatMXN(producto.precio)}</p>
          <p className="mt-0.5 text-sm font-semibold text-kelder-600">Generas {formatMXN(cashbackGen)} de cashback</p>

          {/* cashback purchasing power — useful info, not a promo */}
          <div className="mt-4 rounded-2xl border border-ink-100 bg-white p-4">
            <p className="text-sm text-ink-500">
              Tu cashback: <span className="font-medium text-ink-900">{formatMXN(cuenta.cashbackDisponible)}</span>
            </p>
            <p className="mt-0.5 text-[15px] text-ink-700">
              Con tu cashback pagarías <span className="font-semibold text-ink-900">{formatMXN(conCashback)}</span>
            </p>
          </div>

          {/* sizes */}
          {producto.tallas && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-ink-900">Tallas disponibles</p>
              <div className="flex flex-wrap gap-2">
                {producto.tallas.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTalla(t)}
                    aria-pressed={talla === t}
                    className={`flex h-11 min-w-[44px] items-center justify-center rounded-xl border px-3 text-sm font-medium ${
                      talla === t ? "border-kelder-600 bg-kelder-50 text-kelder-700" : "border-ink-200 text-ink-900 hover:border-ink-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* availability */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-ink-900">
              Disponible en {producto.tiendas ?? tiendasDisponibles.length} tiendas
            </p>
            <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
              {tiendasDisponibles.map((t, i) => (
                <div key={t.id} className="flex items-center gap-3 px-4 py-3">
                  <MapPin size={18} className="shrink-0 text-kelder-600" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-900">
                      {t.nombre}
                      {i === 0 && <span className="ml-2 rounded-full bg-ink-100 px-2 py-0.5 text-xs font-medium text-ink-600">Más cercana</span>}
                    </p>
                    <p className="inline-flex items-center gap-1.5 text-sm text-ink-500">
                      <Clock size={13} aria-hidden="true" />
                      <span className={t.abierta ? "text-success-700" : "text-ink-500"}>{t.abierta ? "Abierta" : "Cerrada"}</span>
                      · A {t.distancia}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-2.5">
            <Button fullWidth>Ver disponibilidad</Button>
            <Button variant="secondary" fullWidth icon={<ArrowUpRight size={18} aria-hidden="true" />} onClick={() => navigate("/tiendas")}>
              Cómo llegar a {tiendaCercana.nombre}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

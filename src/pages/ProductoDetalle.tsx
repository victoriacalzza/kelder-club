import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, ArrowUpRight, Heart, ListPlus, Check, Store } from "lucide-react";
import { BackButton } from "@/components/layout/BackButton";
import { Button } from "@/components/ui/Button";
import {
  catalogo,
  cuenta,
  formatMXN,
  cashbackDe,
  precioConCashback,
  disponibilidadDeProducto,
  tiendaDeProductoCercana,
  type Producto,
} from "@/lib/mock-data";
import { useClub } from "@/lib/ClubContext";
import { track } from "@/lib/analytics";

export function ProductoDetalle({ producto: prodProp }: { producto?: Producto }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = prodProp ?? catalogo.find((p) => p.id === id) ?? catalogo[0];
  const [talla, setTalla] = useState<string | null>(null);
  const dispRef = useRef<HTMLDivElement>(null);
  const { esFavorito, toggleFavorito, enVisita, toggleVisita } = useClub();

  const guardado = esFavorito(producto.id);
  const enMiVisita = enVisita(producto.id);

  const cashbackGen = cashbackDe(producto.precio);
  const conCashback = precioConCashback(producto.precio, cuenta.cashbackDisponible);
  const disponibilidad = disponibilidadDeProducto(producto);
  const cercana = tiendaDeProductoCercana(producto);
  const tallas = producto.tallas?.map(String) ?? producto.tallasRopa ?? null;

  useEffect(() => {
    track("product_view", { producto: producto.id });
  }, [producto.id]);

  return (
    <div className="mx-auto max-w-5xl">
      <BackButton />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* photo */}
        <div className="relative flex aspect-square min-w-0 items-center justify-center overflow-hidden rounded-3xl border border-ink-100 bg-ink-50">
          {producto.imagen && (
            <img src={producto.imagen} alt={`${producto.marca} ${producto.modelo}`} className="h-full w-full object-contain p-8" />
          )}
          <button
            onClick={() => {
              toggleFavorito(producto.id);
              if (!guardado) track("product_favorite", { producto: producto.id });
            }}
            aria-label={guardado ? "Quitar de favoritos" : "Guardar"}
            aria-pressed={guardado}
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow-soft backdrop-blur transition-colors hover:text-kelder-600"
          >
            <Heart size={20} className={guardado ? "fill-kelder-600 text-kelder-600" : ""} aria-hidden="true" />
          </button>
        </div>

        {/* info */}
        <div className="flex min-w-0 flex-col">
          <p className="text-sm text-ink-500">{producto.marca}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900">{producto.modelo}</h1>
          <p className="mt-2 text-2xl font-semibold text-ink-900">{formatMXN(producto.precio)}</p>
          <p className="mt-0.5 text-sm font-semibold text-kelder-600">Generas {formatMXN(cashbackGen)} de cashback</p>

          {/* cashback purchasing power — a simulation, clearly labeled */}
          <div className="mt-4 rounded-2xl border border-ink-100 bg-white p-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-ink-500">Precio</span>
              <span className="text-sm font-medium text-ink-900">{formatMXN(producto.precio)}</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between gap-3">
              <span className="text-sm text-ink-500">Tu cashback</span>
              <span className="text-sm font-medium text-kelder-600">−{formatMXN(cuenta.cashbackDisponible)}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-3 border-t border-ink-100 pt-2">
              <span className="text-sm font-medium text-ink-900">Te quedarían</span>
              <span className="text-lg font-semibold text-ink-900">{formatMXN(conCashback)}*</span>
            </div>
            <p className="mt-1.5 text-xs text-ink-400">*Simulación aplicando tu cashback disponible. No es un cargo ni un nuevo saldo.</p>
          </div>

          {/* sizes — prepared for real inventory later */}
          {tallas && tallas.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-ink-900">Tallas disponibles</p>
              <div className="flex flex-wrap gap-2">
                {tallas.map((t) => (
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

          {/* availability by store */}
          <div ref={dispRef} className="mt-6 scroll-mt-20">
            <p className="mb-2 text-sm font-medium text-ink-900">Disponible en {disponibilidad.length} {disponibilidad.length === 1 ? "tienda" : "tiendas"}</p>
            <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
              {disponibilidad.map(({ tienda, estado }, i) => (
                <div key={tienda.id} className="flex items-center gap-3 px-4 py-3">
                  <MapPin size={18} className="shrink-0 text-kelder-600" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-900">
                      {tienda.nombre}
                      {i === 0 && <span className="ml-2 rounded-full bg-ink-100 px-2 py-0.5 text-xs font-medium text-ink-600">Más cercana</span>}
                    </p>
                    <p className="inline-flex items-center gap-1.5 text-sm text-ink-500">
                      <Clock size={13} aria-hidden="true" />
                      A {tienda.distancia} ·{" "}
                      <span className={estado === "Disponible" ? "font-medium text-success-700" : "font-medium text-warning-600"}>{estado}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => {
                        track("store_view", { tienda: tienda.id, producto: producto.id });
                        navigate(`/tienda/${tienda.id}`);
                      }}
                      className="rounded-full px-2.5 py-1.5 text-xs font-semibold text-kelder-600 hover:bg-kelder-50"
                    >
                      Ver tienda
                    </button>
                    <button
                      onClick={() => track("directions_click", { tienda: tienda.id, producto: producto.id })}
                      aria-label={`Cómo llegar a ${tienda.nombre}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:bg-ink-50 hover:text-ink-900"
                    >
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs — discovery + visit intent, no checkout yet */}
          <div className="mt-6 flex flex-col gap-2.5">
            <Button
              fullWidth
              icon={<Store size={18} aria-hidden="true" />}
              onClick={() => {
                track("store_availability_view", { producto: producto.id });
                dispRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Ver disponibilidad
            </Button>
            <Button
              variant="secondary"
              fullWidth
              icon={enMiVisita ? <Check size={18} aria-hidden="true" /> : <ListPlus size={18} aria-hidden="true" />}
              onClick={() => {
                toggleVisita(producto.id);
                if (!enMiVisita) track("visit_list_add", { producto: producto.id });
              }}
            >
              {enMiVisita ? "En mi lista para visitar" : "Agregar a mi lista para visitar"}
            </Button>
            <button
              onClick={() => track("directions_click", { tienda: cercana.id, producto: producto.id })}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-sm font-semibold text-kelder-600"
            >
              <ArrowUpRight size={16} aria-hidden="true" />
              Cómo llegar a {cercana.nombre}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

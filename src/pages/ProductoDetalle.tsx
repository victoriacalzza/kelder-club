import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, ArrowUpRight, Heart, ListPlus, Check, Bell, Package, ChevronDown } from "lucide-react";
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
  disponibilidadContextual,
  cashbackItemPorId,
  type Producto,
} from "@/lib/mock-data";
import { useClub } from "@/lib/ClubContext";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import { track } from "@/lib/analytics";

export function ProductoDetalle({ producto: prodProp }: { producto?: Producto }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = prodProp ?? catalogo.find((p) => p.id === id) ?? cashbackItemPorId(id) ?? catalogo[0];
  const { esFavorito, toggleFavorito, enVisita, toggleVisita, tallaMx } = useClub();
  const { tienda: miTienda } = useTiendaContexto();

  const guardado = esFavorito(producto.id);
  const enMiVisita = enVisita(producto.id);

  const cashbackGen = cashbackDe(producto.precio);
  const conCashback = precioConCashback(producto.precio, cuenta.cashbackDisponible);
  const disponibilidad = disponibilidadDeProducto(producto);
  const cercana = tiendaDeProductoCercana(producto);
  const tallas = producto.tallas?.map(String) ?? producto.tallasRopa ?? null;
  const esCalzado = (producto.tallas?.length ?? 0) > 0;
  const [talla, setTalla] = useState<string | null>(esCalzado && tallaMx != null && (producto.tallas ?? []).includes(tallaMx) ? String(tallaMx) : null);

  // Contextual availability for THIS member (size + selected store), and where to send them.
  const ctx = miTienda ? disponibilidadContextual(producto, miTienda.id, tallaMx) : null;
  const tallaAqui = ctx?.tallaEnTienda ?? false;
  const puedeAvisar = ctx?.tono === "avisar"; // product in my store but my size isn't here
  const otraTienda = disponibilidad.find((d) => !miTienda || d.tienda.id !== miTienda.id)?.tienda ?? cercana;
  const destino = tallaAqui && miTienda ? miTienda : otraTienda;
  const dispRef = useRef<HTMLDivElement>(null);
  const [otras, setOtras] = useState(false);
  const [avisado, setAvisado] = useState(false);

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

          {/* Contextual availability for the member's size in their selected store */}
          {miTienda && ctx && (
            <div
              className={`mt-4 flex items-start gap-2.5 rounded-2xl border p-3.5 ${
                tallaAqui ? "border-success-100 bg-success-50" : puedeAvisar ? "border-warning-100 bg-warning-50" : "border-ink-100 bg-ink-50"
              }`}
            >
              <span className="mt-0.5 shrink-0" aria-hidden="true">
                {tallaAqui ? <Check size={18} className="text-success-700" /> : ctx.tono === "envio" ? <Package size={18} className="text-ink-500" /> : <MapPin size={18} className={puedeAvisar ? "text-warning-600" : "text-ink-500"} />}
              </span>
              <div className="min-w-0">
                {esCalzado && tallaMx != null && <p className="text-xs font-medium text-ink-500">Tu talla: {tallaMx} MX</p>}
                {tallaAqui ? (
                  <>
                    <p className="text-sm font-semibold text-success-700">Disponible en {miTienda.nombre}</p>
                    <p className="text-sm text-ink-500">A {miTienda.distancia} de ti</p>
                  </>
                ) : puedeAvisar ? (
                  <>
                    <p className="text-sm font-semibold text-warning-700">Tu talla no está disponible aquí</p>
                    <p className="text-sm text-ink-600">Disponible en {otraTienda.nombre} · {otraTienda.distancia}</p>
                  </>
                ) : ctx.tono === "envio" ? (
                  <p className="text-sm font-semibold text-ink-900">Disponible para envío</p>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-ink-900">{ctx.mensaje}</p>
                    <p className="text-sm text-ink-600">{otraTienda.nombre} · {otraTienda.distancia}</p>
                  </>
                )}
              </div>
            </div>
          )}

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

          {/* sizes — the member's habitual size is highlighted */}
          {tallas && tallas.length > 0 && (
            <div className="mt-5">
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <p className="text-sm font-medium text-ink-900">Tallas disponibles</p>
                {esCalzado && tallaMx != null && <p className="text-xs text-ink-500">Tu talla: <span className="font-semibold text-ink-900">{tallaMx} MX</span></p>}
              </div>
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

          {/* availability across other stores — on demand, so the selected-store signal leads */}
          <div ref={dispRef} className="mt-6 scroll-mt-20">
            <button
              onClick={() => setOtras((o) => !o)}
              aria-expanded={otras}
              className="mb-2 flex w-full items-center justify-between gap-2 text-left text-sm font-medium text-ink-900"
            >
              Ver disponibilidad en otras tiendas
              <span className="inline-flex items-center gap-1 text-xs font-normal text-ink-500">
                {disponibilidad.length} {disponibilidad.length === 1 ? "tienda" : "tiendas"}
                <ChevronDown size={16} className={`transition-transform ${otras ? "rotate-180" : ""}`} aria-hidden="true" />
              </span>
            </button>
            <div className={`divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white ${otras ? "" : "hidden"}`}>
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

          {/* CTAs — DESCUBRIR → ENCONTRAR → VISITAR. Primary is "Cómo llegar", not "Comprar". */}
          <div className="mt-6 flex flex-col gap-2.5">
            {ctx?.tono !== "envio" && (
              <Button
                fullWidth
                icon={<ArrowUpRight size={18} aria-hidden="true" />}
                onClick={() => track("directions_click", { tienda: destino.id, producto: producto.id })}
              >
                Cómo llegar a {destino.nombre}
              </Button>
            )}
            {puedeAvisar && miTienda && (
              <Button
                variant="secondary"
                fullWidth
                icon={avisado ? <Check size={18} aria-hidden="true" /> : <Bell size={18} aria-hidden="true" />}
                onClick={() => {
                  if (!avisado) track("size_alert", { producto: producto.id, tienda: miTienda.id });
                  setAvisado(true);
                }}
              >
                {avisado ? `Te avisaremos cuando llegue a ${miTienda.nombre}` : `Avísame cuando llegue a ${miTienda.nombre}`}
              </Button>
            )}
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
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, ArrowUpRight, Phone, Star, Check } from "lucide-react";
import { BackButton } from "@/components/layout/BackButton";
import { ProductPeekCard } from "@/components/ui/ProductPeekCard";
import { PromoCard } from "@/components/ui/PromoCard";
import {
  tiendaPorId,
  novedadesDeTienda,
  promocionesDeTienda,
  comercialDeTienda,
  serviciosDeTienda,
  logoDeUnidad,
} from "@/lib/mock-data";
import { useClub } from "@/lib/ClubContext";
import { track } from "@/lib/analytics";

type Tab = "productos" | "promociones" | "informacion";

// "9:00" → "9:00 AM" · "21:00" → "9:00 PM"
function to12h(hhmm: string): string {
  const m = hhmm.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return hhmm.trim();
  const h = Number(m[1]);
  return `${h % 12 === 0 ? 12 : h % 12}:${m[2]} ${h >= 12 ? "PM" : "AM"}`;
}
// "9:00 – 21:00" → "9:00 AM – 9:00 PM"
function horarioLegible(horario: string): string {
  const [a, b] = horario.split("–").map((s) => s.trim());
  return b ? `${to12h(a)} – ${to12h(b)}` : to12h(a);
}
const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

/**
 * Store detail — much more than a locator. A store owns its page: commercial headline (promos,
 * novedades), a way to become "Mi tienda preferida", and internal navigation Productos ·
 * Promociones · Información. It's the destination of HOME/PRODUCTO → TIENDA → VISITA.
 */
export function TiendaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tienda = tiendaPorId(id);
  const [tab, setTab] = useState<Tab>("productos");
  const { tiendaPreferidaId, setTiendaPreferida } = useClub();

  useEffect(() => {
    if (tienda) track("store_view", { tienda: tienda.id });
  }, [tienda]);

  if (!tienda) {
    return (
      <div>
        <BackButton />
        <p className="mt-8 text-center text-sm text-ink-500">No encontramos esta tienda.</p>
      </div>
    );
  }

  const cierre = to12h(tienda.horario.split("–").pop()?.trim() ?? "");
  const servicios = serviciosDeTienda(tienda.id);
  const [verSemanal, setVerSemanal] = useState(false);
  const { promociones: nPromos, novedades: nNovedades } = comercialDeTienda(tienda.id);
  const productos = novedadesDeTienda(tienda.id);
  const promos = promocionesDeTienda(tienda.id);
  const esPreferida = tiendaPreferidaId === tienda.id;

  const tabs: { key: Tab; label: string }[] = [
    { key: "productos", label: "Productos" },
    { key: "promociones", label: "Promociones" },
    { key: "informacion", label: "Información" },
  ];

  return (
    <div>
      <BackButton />

      {/* hero image */}
      <div className="overflow-hidden rounded-2xl border border-ink-100">
        <div className="h-40 w-full overflow-hidden sm:h-52">
          {tienda.imagen ? (
            <img src={tienda.imagen} alt={`Tienda ${tienda.nombre}`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-ink-950 px-8" aria-hidden="true">
              <img src={logoDeUnidad(tienda.unidad)} alt="" className="max-h-10 w-auto max-w-[60%] object-contain" style={{ filter: "brightness(0) invert(1)" }} />
            </div>
          )}
        </div>
      </div>

      {/* headline */}
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-400">{tienda.unidad}</p>
      <h1 className="mt-0.5 text-2xl font-semibold tracking-tight text-ink-900">{tienda.nombre}</h1>
      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
        <span className="inline-flex items-center gap-1.5">
          <Clock size={14} aria-hidden="true" />
          <span className={tienda.abierta ? "font-medium text-success-700" : "font-medium text-ink-500"}>
            {tienda.abierta ? (cierre ? `Abierta hasta ${cierre}` : "Abierta") : "Cerrada"}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={14} aria-hidden="true" />A {tienda.distancia}
        </span>
      </p>

      {/* commercial counts — interactive, they jump to the matching tab instead of adding buttons */}
      <p className="mt-2 text-sm text-ink-600">
        <button onClick={() => setTab("promociones")} className="font-semibold text-ink-900 underline-offset-2 hover:underline">
          {nPromos} promociones activas
        </button>
        {" · "}
        <button onClick={() => setTab("productos")} className="underline-offset-2 hover:underline">
          {nNovedades} novedades
        </button>
      </p>

      {/* actions */}
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          onClick={() => track("directions_click", { tienda: tienda.id })}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-kelder-600 px-5 text-sm font-semibold text-white"
        >
          Cómo llegar
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
        <button
          onClick={() => setTiendaPreferida(esPreferida ? null : tienda.id)}
          aria-pressed={esPreferida}
          className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-5 text-sm font-semibold transition-colors ${
            esPreferida ? "border-kelder-600 bg-kelder-50 text-kelder-700" : "border-ink-200 text-ink-700 hover:bg-ink-50"
          }`}
        >
          {esPreferida ? <Check size={16} aria-hidden="true" /> : <Star size={16} aria-hidden="true" />}
          {esPreferida ? "Tu tienda preferida" : "Hacer mi tienda preferida"}
        </button>
      </div>

      {/* internal tabs */}
      <div role="tablist" aria-label="Secciones de la tienda" className="mt-6 flex gap-1 border-b border-ink-100">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`relative min-h-[44px] px-3 text-sm font-medium transition-colors ${
              tab === t.key ? "text-ink-900" : "text-ink-500 hover:text-ink-900"
            }`}
          >
            {t.label}
            {tab === t.key && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-kelder-600" />}
          </button>
        ))}
      </div>

      {/* tab content */}
      <div className="mt-5">
        {tab === "productos" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {productos.map((p) => (
              <ProductPeekCard
                key={p.id}
                producto={p}
                onClick={() => {
                  track("product_view", { producto: p.id, tienda: tienda.id });
                  navigate(`/producto/${p.id}`);
                }}
                disponibilidadLabel="Disponible en esta tienda"
              />
            ))}
          </div>
        )}

        {tab === "promociones" &&
          (promos.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {promos.map((promo) => (
                <PromoCard key={promo.id} promo={promo} mostrarTienda={false} onVerProductos={() => navigate(`/promocion/${promo.id}`)} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-ink-500">Esta tienda no tiene promociones activas por ahora.</p>
          ))}

        {tab === "informacion" && (
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-ink-900">Información de la sucursal</h2>

            {/* Horario */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Horario</p>
              <p className="mt-1 text-[15px] text-ink-900">Hoy · {horarioLegible(tienda.horario)}</p>
              <button onClick={() => setVerSemanal((v) => !v)} className="mt-1.5 text-sm font-semibold text-kelder-600">
                {verSemanal ? "Ocultar horario semanal" : "Ver horario semanal"}
              </button>
              {verSemanal && (
                <ul className="mt-3 divide-y divide-ink-100 rounded-2xl border border-ink-100">
                  {diasSemana.map((d) => (
                    <li key={d} className="flex items-center justify-between px-4 py-2.5 text-sm">
                      <span className="text-ink-600">{d}</span>
                      <span className="text-ink-900">{d === "Domingo" ? "10:00 AM – 8:00 PM" : horarioLegible(tienda.horario)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Teléfono</p>
              <p className="mt-1 text-[15px] text-ink-900">669 000 0000</p>
              <a href="tel:6690000000" onClick={() => track("call_store", { tienda: tienda.id })} className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-kelder-600">
                <Phone size={15} aria-hidden="true" />
                Llamar
              </a>
            </div>

            {/* Servicios disponibles */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Servicios disponibles</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {servicios.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-700">
                    <Check size={14} className="text-success-600" aria-hidden="true" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Ubicación — compact preview that opens the location; no big "Cómo llegar" (it's in the header) */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Ubicación</p>
              <p className="mt-1 text-[15px] text-ink-900">Plaza principal, {tienda.ciudad}</p>
              <button
                onClick={() => track("directions_click", { tienda: tienda.id })}
                className="mt-2 flex w-full items-center gap-3 rounded-2xl border border-ink-100 bg-white p-3 text-left transition-colors hover:bg-ink-50"
              >
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-ink-100 to-ink-200">
                  <span className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(90deg, transparent 46%, #fff 47%, #fff 53%, transparent 54%), linear-gradient(0deg, transparent 46%, #fff 47%, #fff 53%, transparent 54%)" }} aria-hidden="true" />
                  <MapPin size={20} className="relative text-kelder-600" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium text-ink-900">Ver ubicación en el mapa</span>
                  <span className="block text-xs text-ink-400">Abrir cómo llegar</span>
                </span>
                <ArrowUpRight size={16} className="text-ink-400" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

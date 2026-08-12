import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, ArrowUpRight, Phone, Star, Check, Store } from "lucide-react";
import { BackButton } from "@/components/layout/BackButton";
import { ProductPeekCard } from "@/components/ui/ProductPeekCard";
import { PromoCard } from "@/components/ui/PromoCard";
import {
  tiendaPorId,
  novedadesDeTienda,
  promocionesDeTienda,
  comercialDeTienda,
  logoDeUnidad,
} from "@/lib/mock-data";
import { useClub } from "@/lib/ClubContext";
import { track } from "@/lib/analytics";

type Tab = "productos" | "promociones" | "informacion";

// "9:00 – 21:00" → "9:00 PM"
function cierre12h(horario: string): string | null {
  const end = horario.split("–").pop()?.trim();
  const m = end?.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = Number(m[1]);
  return `${h % 12 === 0 ? 12 : h % 12}:${m[2]} ${h >= 12 ? "PM" : "AM"}`;
}

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

  const cierre = cierre12h(tienda.horario);
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

      {/* commercial counts */}
      <p className="mt-2 text-sm text-ink-600">
        <span className="font-semibold text-ink-900">{nPromos} promociones activas</span> · {nNovedades} novedades
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
          <div className="space-y-4">
            <InfoRow icon={<MapPin size={18} aria-hidden="true" />} label="Dirección">
              Plaza principal, {tienda.ciudad}
            </InfoRow>
            <InfoRow icon={<Clock size={18} aria-hidden="true" />} label="Horario">
              Todos los días · {tienda.horario}
            </InfoRow>
            <InfoRow icon={<Phone size={18} aria-hidden="true" />} label="Teléfono">
              669 000 0000
            </InfoRow>
            {/* map placeholder — real map integration comes later */}
            <div className="flex h-40 w-full items-center justify-center rounded-2xl border border-ink-100 bg-ink-50 text-ink-400">
              <span className="inline-flex items-center gap-2 text-sm">
                <Store size={16} aria-hidden="true" />
                Mapa de ubicación
              </span>
            </div>
            <button
              onClick={() => track("directions_click", { tienda: tienda.id })}
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-kelder-600"
            >
              Cómo llegar
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-600">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
        <p className="text-[15px] text-ink-900">{children}</p>
      </div>
    </div>
  );
}

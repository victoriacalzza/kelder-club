import { useNavigate } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Store } from "lucide-react";
import { ProductPeekCard } from "@/components/ui/ProductPeekCard";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import { novedadesDeTienda, comercialDeTienda, disponibilidadDeProducto, type Tienda } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

/**
 * Home's store-driven discovery module — the heart of "descubre qué puedes comprar cerca de ti".
 * It replaces a generic "Recomendados para ti" (no personalization algorithm yet): the context
 * is the member's preferred store, else the nearest one. The title/content slot is reusable
 * (novedades, recién llegados, lo más buscado…). Connects HOME → PRODUCTO → TIENDA → VISITA.
 * When we have no store context, it invites the member to choose one instead of inventing a location.
 */

// "9:00 – 21:00" → "9:00 PM" (closing time, 12h). Falls back to the raw range if it can't parse.
function cierre12h(horario: string): string | null {
  const end = horario.split("–").pop()?.trim();
  const m = end?.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = Number(m[1]);
  const suf = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m[2]} ${suf}`;
}

function tituloDe(t: Tienda, preferida: boolean): { eyebrow: string; titulo: string } {
  return preferida
    ? { eyebrow: "Tu tienda", titulo: `Novedades en ${t.nombre}` }
    : { eyebrow: "Cerca de ti", titulo: `Recomendaciones de ${t.nombre}` };
}

export function StoreContextModule() {
  const navigate = useNavigate();
  const { tienda, origen } = useTiendaContexto();

  // No store context → invite to choose one (never fabricate a location).
  if (!tienda || origen === "ninguna") {
    return (
      <section aria-label="Encuentra productos cerca de ti">
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-kelder-50 text-kelder-600" aria-hidden="true">
            <Store size={20} />
          </span>
          <div>
            <p className="text-[17px] font-semibold text-ink-900">Encuentra productos cerca de ti</p>
            <p className="mt-0.5 text-sm text-ink-500">Selecciona una tienda para descubrir qué puedes encontrar.</p>
          </div>
          <button
            onClick={() => navigate("/tiendas")}
            className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-kelder-600 px-5 text-sm font-semibold text-white"
          >
            Elegir tienda
          </button>
        </div>
      </section>
    );
  }

  const { eyebrow, titulo } = tituloDe(tienda, origen === "preferida");
  const cierre = cierre12h(tienda.horario);
  const { promociones, novedades } = comercialDeTienda(tienda.id);
  const productos = novedadesDeTienda(tienda.id).slice(0, 6);

  return (
    <section aria-label={titulo}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{eyebrow}</p>
      <h2 className="mt-1 text-lg font-semibold text-ink-900">{titulo}</h2>
      <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-500">
        <span className="inline-flex items-center gap-1">
          <MapPin size={14} aria-hidden="true" />A {tienda.distancia}
        </span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={14} aria-hidden="true" />
          <span className={tienda.abierta ? "font-medium text-success-700" : "font-medium text-ink-500"}>
            {tienda.abierta ? (cierre ? `Abierta hasta las ${cierre}` : "Abierta") : "Cerrada"}
          </span>
        </span>
      </p>
      <p className="mt-0.5 text-xs text-ink-400">
        {promociones} promociones activas · {novedades} novedades
      </p>

      {/* horizontal product carousel */}
      <div className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {productos.map((p) => {
          const disp = disponibilidadDeProducto(p);
          const aqui = disp.find((d) => d.tienda.id === tienda.id);
          const ultimas = aqui?.estado === "Últimas piezas";
          return (
            <div key={p.id} className="w-[42%] min-w-[150px] max-w-[190px] shrink-0 snap-start sm:w-[30%] lg:w-[19%]">
              <ProductPeekCard
                producto={p}
                onClick={() => {
                  track("product_view", { producto: p.id, origen: "store_context" });
                  navigate(`/producto/${p.id}`);
                }}
                disponibilidadLabel={ultimas ? "Últimas piezas" : "Disponible en esta tienda"}
                disponibilidadTono={ultimas ? "low" : "ok"}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          track("store_view", { tienda: tienda.id, origen: "store_context" });
          navigate(`/tienda/${tienda.id}`);
        }}
        className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600"
      >
        Ver más de esta tienda
        <ArrowRight size={15} aria-hidden="true" />
      </button>
    </section>
  );
}

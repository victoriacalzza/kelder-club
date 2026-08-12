import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, Package, PackageCheck, Check, X, ArrowRight, SlidersHorizontal, Search } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { Sheet } from "@/components/ui/Sheet";
import { useTiendaContexto } from "@/lib/useTiendaContexto";
import {
  compras,
  resumenCompras,
  totalCompra,
  articulosCompra,
  formatMXN,
  type Compra,
  type CompraCanal,
  type CompraEstado,
} from "@/lib/mock-data";

const canalLabel: Record<CompraCanal, string> = { tienda: "Compra en tienda", linea: "Pedido en línea" };

// Normalized status (in-store purchases count as delivered).
type Estatus = "todas" | "en_proceso" | "en_camino" | "listas" | "entregadas" | "canceladas";
const quickChips: { key: Estatus; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "en_proceso", label: "En proceso" },
  { key: "en_camino", label: "En camino" },
];
const estadoOpciones: { key: Estatus; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "en_proceso", label: "En proceso" },
  { key: "en_camino", label: "En camino" },
  { key: "listas", label: "Listas para recoger" },
  { key: "entregadas", label: "Entregadas" },
  { key: "canceladas", label: "Canceladas" },
];
function estatusDe(c: Compra): Exclude<Estatus, "todas"> {
  switch (c.estado) {
    case "En preparación": return "en_proceso";
    case "En camino": return "en_camino";
    case "Lista para recoger": return "listas";
    case "Cancelada": return "canceladas";
    default: return "entregadas";
  }
}

const badge: Record<CompraEstado, { cls: string; icon: typeof Truck }> = {
  "En preparación": { cls: "bg-info-100 text-info-700", icon: Package },
  "En camino": { cls: "bg-info-100 text-info-700", icon: Truck },
  "Lista para recoger": { cls: "bg-success-100 text-success-700", icon: PackageCheck },
  Entregado: { cls: "bg-success-100 text-success-700", icon: Check },
  Cancelada: { cls: "bg-ink-100 text-ink-500", icon: X },
};

// ── date helpers ──
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
function parseFecha(s: string): Date {
  const [d, m, y] = s.split(" ");
  return new Date(Number(y), Math.max(0, MESES.indexOf(m.toLowerCase())), Number(d));
}
type FechaRango = "todas" | "30d" | "3m" | "6m" | "custom";

interface Avanzados {
  fecha: FechaRango;
  desde: string; // YYYY-MM-DD (custom)
  hasta: string;
  tipo: "todas" | CompraCanal;
  tienda: "todas" | "mi_tienda" | string; // store name when specific
  texto: string;
}
const avVacios: Avanzados = { fecha: "todas", desde: "", hasta: "", tipo: "todas", tienda: "todas", texto: "" };

export function Compras() {
  const navigate = useNavigate();
  const { tienda: miTienda } = useTiendaContexto();
  const [estatus, setEstatus] = useState<Estatus>("todas");
  const [adv, setAdv] = useState<Avanzados>(avVacios);
  const [sheet, setSheet] = useState(false);

  // Reference "now" = the most recent purchase, so relative ranges are deterministic in the demo.
  const refDate = useMemo(() => new Date(Math.max(...compras.map((c) => parseFecha(c.fecha).getTime()))), []);
  const tiendasCompra = useMemo(() => [...new Set(compras.map((c) => c.tienda))], []);

  // Advanced filters active (those NOT covered by the 3 visible quick chips) → the "Filtros" badge.
  const estadoAvanzado = estatus !== "todas" && estatus !== "en_proceso" && estatus !== "en_camino";
  const nActivos =
    (estadoAvanzado ? 1 : 0) +
    (adv.fecha !== "todas" ? 1 : 0) +
    (adv.tipo !== "todas" ? 1 : 0) +
    (adv.tienda !== "todas" ? 1 : 0) +
    (adv.texto.trim() ? 1 : 0);

  const enRango = (c: Compra) => {
    if (adv.fecha === "todas") return true;
    const t = parseFecha(c.fecha).getTime();
    if (adv.fecha === "custom") {
      const okDesde = !adv.desde || t >= new Date(adv.desde).getTime();
      const okHasta = !adv.hasta || t <= new Date(adv.hasta).getTime();
      return okDesde && okHasta;
    }
    const dias = adv.fecha === "30d" ? 30 : adv.fecha === "3m" ? 90 : 180;
    return t >= refDate.getTime() - dias * 24 * 60 * 60 * 1000;
  };

  const lista = compras.filter((c) => {
    if (estatus !== "todas" && estatusDe(c) !== estatus) return false;
    if (!enRango(c)) return false;
    if (adv.tipo !== "todas" && c.canal !== adv.tipo) return false;
    if (adv.tienda === "mi_tienda" && c.tienda !== miTienda?.nombre) return false;
    if (adv.tienda !== "todas" && adv.tienda !== "mi_tienda" && c.tienda !== adv.tienda) return false;
    if (adv.texto.trim() && !c.ticket.toLowerCase().replace("#", "").includes(adv.texto.trim().toLowerCase().replace("#", ""))) return false;
    return true;
  });

  return (
    <div>
      <BackButton to="/club" label="Mi Club" />
      <TopBar title="Mis compras" subtitle="Consulta tus compras, pedidos y el cashback que has generado." />

      {/* Compact horizontal cashback summary (not three big cards) */}
      <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-ink-100 bg-white px-6 py-4">
        <div>
          <span className="text-sm text-ink-500">Cashback disponible</span>{" "}
          <span className="text-base font-semibold text-ink-900">{formatMXN(resumenCompras.cashbackDisponible)}</span>
        </div>
        <span className="hidden h-4 w-px bg-ink-100 sm:block" aria-hidden="true" />
        <div>
          <span className="text-sm text-ink-500">Cashback generado</span>{" "}
          <span className="text-base font-semibold text-ink-900">{formatMXN(resumenCompras.cashbackGenerado)}</span>
        </div>
        <span className="hidden h-4 w-px bg-ink-100 sm:block" aria-hidden="true" />
        <div>
          <span className="text-sm text-ink-500">Compras realizadas</span>{" "}
          <span className="text-base font-semibold text-ink-900">{resumenCompras.comprasRealizadas}</span>
        </div>
        <button onClick={() => navigate("/cashback")} className="ml-auto inline-flex min-h-[40px] items-center gap-1 text-sm font-semibold text-kelder-600">
          Ver movimientos de cashback
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>

      {/* Quick filters (3) + a clearly separated "Filtros" button — nothing overlaps.
          The chips scroll horizontally if the width is tight; the button never shrinks. */}
      <div className="mb-5 flex items-center gap-2">
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickChips.map((t) => (
            <button
              key={t.key}
              onClick={() => setEstatus(t.key)}
              className={`min-h-[40px] shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${
                estatus === t.key ? "border-kelder-600 bg-kelder-600 text-white" : "border-ink-200 text-ink-700 hover:bg-ink-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSheet(true)}
          className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border border-ink-200 px-4 text-sm font-medium text-ink-700 hover:bg-ink-50"
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          Filtros
          {nActivos > 0 && (
            <span className="ml-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-kelder-600 px-1 text-[11px] font-semibold text-white">{nActivos}</span>
          )}
        </button>
      </div>

      {/* One card per transaction (ticket / order) */}
      <div className="space-y-4">
        {lista.map((c) => {
          const total = totalCompra(c);
          const nArt = articulosCompra(c);
          const thumbs = c.items.slice(0, 3);
          const extra = c.items.length - thumbs.length;
          const B = c.estado ? badge[c.estado] : null;
          const trackable = c.estado === "En preparación" || c.estado === "En camino";
          return (
            <div key={c.id} className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">{c.tienda}</p>
                  <p className="text-sm text-ink-500">
                    {c.fecha} · {canalLabel[c.canal]} · Ticket {c.ticket}
                  </p>
                </div>
                {B && c.estado && (
                  <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${B.cls}`}>
                    <B.icon size={13} aria-hidden="true" />
                    {c.estado}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2">
                {thumbs.map((it, i) => (
                  <span key={i} className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-ink-50">
                    {it.imagen && <img src={it.imagen} alt={`${it.marca} ${it.modelo}`} className="h-full w-full object-contain p-1.5" />}
                  </span>
                ))}
                {extra > 0 && (
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink-50 text-sm font-semibold text-ink-500">+{extra}</span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-ink-100 pt-4">
                <div>
                  <p className="text-[15px] font-semibold text-ink-900">
                    {nArt} {nArt === 1 ? "artículo" : "artículos"} · Total {formatMXN(total)}
                  </p>
                  {c.cashback > 0 && <p className="text-sm font-semibold text-success-600">+{formatMXN(c.cashback)} cashback</p>}
                </div>
                <div className="flex items-center gap-4">
                  {trackable && (
                    <button onClick={() => navigate(`/compras/${c.id}`)} className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-900">
                      Seguir pedido
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  )}
                  <button onClick={() => navigate(`/compras/${c.id}`)} className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600">
                    Ver detalle
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {lista.length === 0 && (
          <p className="rounded-2xl border border-ink-100 bg-white px-5 py-10 text-center text-sm text-ink-500">No encontramos compras con estos filtros.</p>
        )}
      </div>

      {sheet && (
        <FiltrosSheet
          estatus={estatus}
          adv={adv}
          tiendas={tiendasCompra}
          onApply={(e, a) => {
            setEstatus(e);
            setAdv(a);
            setSheet(false);
          }}
          onClose={() => setSheet(false)}
        />
      )}
    </div>
  );
}

/* ─────────────────────────── Filtros sheet ─────────────────────────── */

function FiltrosSheet({
  estatus,
  adv,
  tiendas,
  onApply,
  onClose,
}: {
  estatus: Estatus;
  adv: Avanzados;
  tiendas: string[];
  onApply: (e: Estatus, a: Avanzados) => void;
  onClose: () => void;
}) {
  const [est, setEst] = useState<Estatus>(estatus);
  const [draft, setDraft] = useState<Avanzados>(adv);
  const [verTiendas, setVerTiendas] = useState(adv.tienda !== "todas" && adv.tienda !== "mi_tienda");

  const fechas: { key: FechaRango; label: string }[] = [
    { key: "30d", label: "Últimos 30 días" },
    { key: "3m", label: "Últimos 3 meses" },
    { key: "6m", label: "Últimos 6 meses" },
    { key: "custom", label: "Personalizado" },
  ];

  return (
    <Sheet title="Filtros" description="Encuentra un pedido específico." onClose={onClose}>
      {/* Search by ticket / order number */}
      <label className="relative block">
        <span className="sr-only">Buscar por número de pedido o ticket</span>
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
        <input
          value={draft.texto}
          onChange={(e) => setDraft({ ...draft, texto: e.target.value })}
          placeholder="Número de pedido o ticket"
          className="h-12 w-full rounded-2xl border border-ink-200 bg-white pl-11 pr-4 text-base"
        />
      </label>

      <Grupo titulo="Estado">
        {estadoOpciones.map((o) => (
          <Opcion key={o.key} label={o.label} activo={est === o.key} onClick={() => setEst(o.key)} />
        ))}
      </Grupo>

      <Grupo titulo="Fecha">
        <Opcion label="Todas" activo={draft.fecha === "todas"} onClick={() => setDraft({ ...draft, fecha: "todas" })} />
        {fechas.map((f) => (
          <Opcion key={f.key} label={f.label} activo={draft.fecha === f.key} onClick={() => setDraft({ ...draft, fecha: f.key })} />
        ))}
      </Grupo>
      {draft.fecha === "custom" && (
        <div className="mt-3 flex gap-3">
          <label className="flex-1 text-xs font-medium text-ink-500">
            Desde
            <input type="date" value={draft.desde} onChange={(e) => setDraft({ ...draft, desde: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-900" />
          </label>
          <label className="flex-1 text-xs font-medium text-ink-500">
            Hasta
            <input type="date" value={draft.hasta} onChange={(e) => setDraft({ ...draft, hasta: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-900" />
          </label>
        </div>
      )}

      <Grupo titulo="Tipo de compra">
        <Opcion label="Todas" activo={draft.tipo === "todas"} onClick={() => setDraft({ ...draft, tipo: "todas" })} />
        <Opcion label="Compra en tienda" activo={draft.tipo === "tienda"} onClick={() => setDraft({ ...draft, tipo: "tienda" })} />
        <Opcion label="Pedido" activo={draft.tipo === "linea"} onClick={() => setDraft({ ...draft, tipo: "linea" })} />
      </Grupo>

      <Grupo titulo="Tienda">
        <Opcion label="Todas" activo={draft.tienda === "todas"} onClick={() => { setDraft({ ...draft, tienda: "todas" }); setVerTiendas(false); }} />
        <Opcion label="Mi tienda" activo={draft.tienda === "mi_tienda"} onClick={() => { setDraft({ ...draft, tienda: "mi_tienda" }); setVerTiendas(false); }} />
        <Opcion label="Seleccionar tienda" activo={verTiendas || (draft.tienda !== "todas" && draft.tienda !== "mi_tienda")} onClick={() => setVerTiendas(true)} />
      </Grupo>
      {verTiendas && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tiendas.map((t) => (
            <Opcion key={t} label={t} activo={draft.tienda === t} onClick={() => setDraft({ ...draft, tienda: t })} />
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => { setEst("todas"); setDraft(avVacios); setVerTiendas(false); }}
          className="min-h-[48px] flex-1 rounded-full border border-ink-200 text-sm font-semibold text-ink-700 hover:bg-ink-50"
        >
          Limpiar filtros
        </button>
        <button onClick={() => onApply(est, draft)} className="min-h-[48px] flex-1 rounded-full bg-kelder-600 text-sm font-semibold text-white">
          Aplicar filtros
        </button>
      </div>
    </Sheet>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-medium text-ink-900">{titulo}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Opcion({ label, activo, onClick }: { label: string; activo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[38px] rounded-full border px-3.5 text-sm font-medium transition-colors ${
        activo ? "border-kelder-600 bg-kelder-50 text-kelder-700" : "border-ink-200 text-ink-600 hover:bg-ink-50"
      }`}
    >
      {label}
    </button>
  );
}

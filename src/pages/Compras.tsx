import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, Package, PackageCheck, Check, X, ArrowRight, SlidersHorizontal, Search } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BackButton } from "@/components/layout/BackButton";
import { Sheet } from "@/components/ui/Sheet";
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

// Normalized status used by the top chips (in-store purchases count as delivered).
type Estatus = "todas" | "en_proceso" | "en_camino" | "listas" | "entregadas" | "canceladas";
const estatusChips: { key: Estatus; label: string }[] = [
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
    default: return "entregadas"; // "Entregado" or in-store (no estado)
  }
}

const badge: Record<CompraEstado, { cls: string; icon: typeof Truck }> = {
  "En preparación": { cls: "bg-info-100 text-info-700", icon: Package },
  "En camino": { cls: "bg-info-100 text-info-700", icon: Truck },
  "Lista para recoger": { cls: "bg-success-100 text-success-700", icon: PackageCheck },
  Entregado: { cls: "bg-success-100 text-success-700", icon: Check },
  Cancelada: { cls: "bg-ink-100 text-ink-500", icon: X },
};

interface Avanzados {
  anio: string; // "todos" | year
  tienda: string; // "todas" | store name
  tipo: "todos" | CompraCanal;
  texto: string; // ticket / order search
}
const avanzadosVacios: Avanzados = { anio: "todos", tienda: "todas", tipo: "todos", texto: "" };

export function Compras() {
  const navigate = useNavigate();
  const [estatus, setEstatus] = useState<Estatus>("todas");
  const [adv, setAdv] = useState<Avanzados>(avanzadosVacios);
  const [sheet, setSheet] = useState(false);

  const anios = useMemo(() => [...new Set(compras.map((c) => c.fecha.split(" ").pop()!))].sort().reverse(), []);
  const tiendas = useMemo(() => [...new Set(compras.map((c) => c.tienda))], []);
  const nActivos = (adv.anio !== "todos" ? 1 : 0) + (adv.tienda !== "todas" ? 1 : 0) + (adv.tipo !== "todos" ? 1 : 0) + (adv.texto.trim() ? 1 : 0);

  const lista = compras.filter((c) => {
    if (estatus !== "todas" && estatusDe(c) !== estatus) return false;
    if (adv.anio !== "todos" && c.fecha.split(" ").pop() !== adv.anio) return false;
    if (adv.tienda !== "todas" && c.tienda !== adv.tienda) return false;
    if (adv.tipo !== "todos" && c.canal !== adv.tipo) return false;
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

      {/* Status chips (horizontal scroll on mobile) + secondary "Filtros" */}
      <div className="mb-5 flex items-center gap-2">
        <div className="-mx-4 flex flex-1 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {estatusChips.map((t) => (
            <button
              key={t.key}
              onClick={() => setEstatus(t.key)}
              className={`min-h-[38px] shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${
                estatus === t.key ? "border-kelder-600 bg-kelder-600 text-white" : "border-ink-200 text-ink-700 hover:bg-ink-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSheet(true)}
          className="relative inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full border border-ink-200 px-4 text-sm font-medium text-ink-700 hover:bg-ink-50"
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

              {/* product thumbnails */}
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

              {/* summary + actions */}
              <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-ink-100 pt-4">
                <div>
                  <p className="text-[15px] font-semibold text-ink-900">
                    {nArt} {nArt === 1 ? "artículo" : "artículos"} · Total {formatMXN(total)}
                  </p>
                  {c.cashback > 0 && <p className="text-sm font-semibold text-success-600">+{formatMXN(c.cashback)} cashback</p>}
                </div>
                <div className="flex items-center gap-4">
                  {trackable && (
                    <button
                      onClick={() => navigate(`/compras/${c.id}`)}
                      className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-900"
                    >
                      Seguir pedido
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/compras/${c.id}`)}
                    className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-kelder-600"
                  >
                    Ver detalle
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {lista.length === 0 && (
          <p className="rounded-2xl border border-ink-100 bg-white px-5 py-10 text-center text-sm text-ink-500">
            No encontramos compras con estos filtros.
          </p>
        )}
      </div>

      {sheet && (
        <FiltrosSheet
          adv={adv}
          anios={anios}
          tiendas={tiendas}
          onApply={(next) => {
            setAdv(next);
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
  adv,
  anios,
  tiendas,
  onApply,
  onClose,
}: {
  adv: Avanzados;
  anios: string[];
  tiendas: string[];
  onApply: (a: Avanzados) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Avanzados>(adv);

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

      <Grupo titulo="Fecha">
        <Opcion label="Todo" activo={draft.anio === "todos"} onClick={() => setDraft({ ...draft, anio: "todos" })} />
        {anios.map((a) => (
          <Opcion key={a} label={a} activo={draft.anio === a} onClick={() => setDraft({ ...draft, anio: a })} />
        ))}
      </Grupo>

      <Grupo titulo="Tienda">
        <Opcion label="Todas" activo={draft.tienda === "todas"} onClick={() => setDraft({ ...draft, tienda: "todas" })} />
        {tiendas.map((t) => (
          <Opcion key={t} label={t} activo={draft.tienda === t} onClick={() => setDraft({ ...draft, tienda: t })} />
        ))}
      </Grupo>

      <Grupo titulo="Tipo de compra">
        <Opcion label="Todos" activo={draft.tipo === "todos"} onClick={() => setDraft({ ...draft, tipo: "todos" })} />
        <Opcion label="En tienda" activo={draft.tipo === "tienda"} onClick={() => setDraft({ ...draft, tipo: "tienda" })} />
        <Opcion label="En línea" activo={draft.tipo === "linea"} onClick={() => setDraft({ ...draft, tipo: "linea" })} />
      </Grupo>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setDraft(avanzadosVacios)}
          className="min-h-[48px] flex-1 rounded-full border border-ink-200 text-sm font-semibold text-ink-700 hover:bg-ink-50"
        >
          Limpiar
        </button>
        <button onClick={() => onApply(draft)} className="min-h-[48px] flex-1 rounded-full bg-kelder-600 text-sm font-semibold text-white">
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

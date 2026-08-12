import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Camera, ScanLine, SlidersHorizontal, ChevronDown, X, Check } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackButton } from "@/components/layout/BackButton";
import { Button } from "@/components/ui/Button";
import {
  catalogo,
  busquedasSugeridas,
  cuenta,
  formatMXN,
  departamentos,
  tiposProducto,
  marcasBusqueda,
  coloresBusqueda,
  rangosPrecio,
  unidadesNegocio,
  tallasDeTipo,
  tallasDeProducto,
  availabilityForStore,
  type Producto,
  type Departamento,
  type TipoProducto,
  type UnidadNegocio,
} from "@/lib/mock-data";
import { useTiendaContexto } from "@/lib/useTiendaContexto";

type Modo = "texto" | "codigo" | "foto";
type Orden = "relevancia" | "precio_asc" | "precio_desc" | "recientes";

interface Filtros {
  departamento: Departamento | null;
  tipo: TipoProducto | null;
  tallas: string[];
  marcas: string[];
  colores: string[];
  precio: string | null; // rango id
  unidad: UnidadNegocio | null;
  soloDisponibles: boolean;
}

const filtrosVacios: Filtros = {
  departamento: null,
  tipo: null,
  tallas: [],
  marcas: [],
  colores: [],
  precio: null,
  unidad: null,
  soloDisponibles: false,
};

const generico = ["tenis", "calzado", "zapato", "zapatos", "sneakers", "correr", "running", "ropa", "accesorios"];
const stopwords = new Set(["de", "la", "el", "los", "las", "para", "con", "por", "una", "uno", "del", "en"]);

function buscar(query: string): Producto[] {
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !stopwords.has(t));
  if (tokens.length === 0) return [];
  if (tokens.some((t) => generico.includes(t))) return catalogo;
  return catalogo.filter((p) => {
    const heno = `${p.marca} ${p.modelo} ${p.categoria ?? ""} ${p.color ?? ""} ${p.tipo ?? ""} ${p.departamento ?? ""}`.toLowerCase();
    return tokens.some((t) => heno.includes(t));
  });
}

function aplicaFiltros(items: Producto[], f: Filtros): Producto[] {
  return items.filter((p) => {
    if (f.departamento && p.departamento !== f.departamento) return false;
    if (f.tipo && p.tipo !== f.tipo) return false;
    if (f.marcas.length && !f.marcas.includes(p.marca)) return false;
    if (f.colores.length && (!p.color || !f.colores.includes(p.color))) return false;
    if (f.tallas.length) {
      const ts = tallasDeProducto(p);
      if (!f.tallas.some((t) => ts.includes(t))) return false;
    }
    if (f.precio) {
      const r = rangosPrecio.find((x) => x.id === f.precio);
      if (r && !(p.precio >= r.min && p.precio < r.max)) return false;
    }
    if (f.unidad && p.unidad !== f.unidad) return false;
    if (f.soloDisponibles && p.disponible === false) return false;
    return true;
  });
}

function ordenar(items: Producto[], orden: Orden): Producto[] {
  const a = [...items];
  if (orden === "precio_asc") return a.sort((x, y) => x.precio - y.precio);
  if (orden === "precio_desc") return a.sort((x, y) => y.precio - x.precio);
  if (orden === "recientes") return a.sort((x, y) => (y.orden ?? 0) - (x.orden ?? 0));
  return items;
}

const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

interface BuscarProps {
  initialModo?: Modo;
  initialQuery?: string;
  initialSubmitted?: boolean;
  initialDrawer?: boolean; // storyboard preview of the mobile filters sheet
  initialFiltros?: Partial<Filtros>; // storyboard preview of active filters/chips
}

export function Buscar({
  initialModo = "texto",
  initialQuery = "",
  initialSubmitted = false,
  initialDrawer = false,
  initialFiltros,
}: BuscarProps) {
  const navigate = useNavigate();
  const [modo, setModo] = useState<Modo>(initialModo);
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialSubmitted);
  const [orden, setOrden] = useState<Orden>("relevancia");
  const [filtros, setFiltros] = useState<Filtros>({ ...filtrosVacios, ...initialFiltros });
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(initialDrawer);
  const [dispFiltro, setDispFiltro] = useState<"todos" | "en_tienda" | "extendido">("todos");
  const { tienda: miTienda } = useTiendaContexto();
  const storeId = miTienda?.id ?? "t1";

  const base = buscar(query);
  const resultadosBase = ordenar(aplicaFiltros(base, filtros), orden);
  // Availability is relative to the selected store; in-store results are surfaced first.
  const enTienda = (p: Producto) => {
    const a = availabilityForStore(p, storeId);
    return a === "in_store" || a === "low_stock";
  };
  const rank = (p: Producto) => (enTienda(p) ? 0 : 1);
  const resultados = resultadosBase
    .filter((p) => (dispFiltro === "en_tienda" ? enTienda(p) : dispFiltro === "extendido" ? !enTienda(p) : true))
    .sort((a, b) => rank(a) - rank(b));

  const set = (patch: Partial<Filtros>) => setFiltros((f) => ({ ...f, ...patch }));
  const chips = chipsActivos(filtros, set);
  const nActivos = chips.length;

  function run(q?: string) {
    const term = (q ?? query).trim();
    if (!term) return;
    setQuery(term);
    setSubmitted(true);
    setOpenDrop(null);
  }

  // ─────────────────────────── Results view ───────────────────────────
  if (submitted) {
    return (
      <div>
        <BackButton />
        {/* sticky search bar */}
        <div className="sticky top-16 z-20 -mx-5 mb-5 border-b border-ink-100 bg-cream/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
          <label className="relative block">
            <span className="sr-only">Buscar producto</span>
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              className="h-12 w-full rounded-2xl border border-ink-200 bg-white pl-11 pr-4 text-base"
            />
          </label>
        </div>

        {/* Desktop / tablet filter row (wraps) */}
        <div className="mb-3 hidden flex-wrap items-center gap-2 md:flex">
          <FilterDropdown
            id="dep"
            label={filtros.departamento ?? "Departamento"}
            active={!!filtros.departamento}
            open={openDrop}
            setOpen={setOpenDrop}
          >
            <OptionList
              options={departamentos}
              selected={filtros.departamento ? [filtros.departamento] : []}
              single
              onToggle={(v) => set({ departamento: filtros.departamento === v ? null : (v as Departamento) })}
            />
          </FilterDropdown>

          <FilterDropdown
            id="tipo"
            label={filtros.tipo ?? "Categoría"}
            active={!!filtros.tipo}
            open={openDrop}
            setOpen={setOpenDrop}
          >
            <OptionList
              options={tiposProducto}
              selected={filtros.tipo ? [filtros.tipo] : []}
              single
              onToggle={(v) => set({ tipo: filtros.tipo === v ? null : (v as TipoProducto), tallas: [] })}
            />
          </FilterDropdown>

          <FilterDropdown
            id="talla"
            label={filtros.tallas.length ? `Talla · ${filtros.tallas.length}` : "Talla"}
            active={filtros.tallas.length > 0}
            open={openDrop}
            setOpen={setOpenDrop}
          >
            <p className="mb-2 text-xs text-ink-400">
              {filtros.tipo === "Ropa" ? "Tallas de ropa" : filtros.tipo === "Accesorios" ? "Talla única" : "Tallas de calzado"}
            </p>
            <OptionList options={tallasDeTipo(filtros.tipo)} selected={filtros.tallas} onToggle={(v) => set({ tallas: toggle(filtros.tallas, v) })} />
          </FilterDropdown>

          <FilterDropdown
            id="marca"
            label={filtros.marcas.length ? `Marca · ${filtros.marcas.length}` : "Marca"}
            active={filtros.marcas.length > 0}
            open={openDrop}
            setOpen={setOpenDrop}
          >
            <OptionList options={marcasBusqueda} selected={filtros.marcas} onToggle={(v) => set({ marcas: toggle(filtros.marcas, v) })} />
          </FilterDropdown>

          <FilterDropdown
            id="precio"
            label={filtros.precio ? rangosPrecio.find((r) => r.id === filtros.precio)!.label : "Precio"}
            active={!!filtros.precio}
            open={openDrop}
            setOpen={setOpenDrop}
          >
            <OptionList
              options={rangosPrecio.map((r) => r.label)}
              selected={filtros.precio ? [rangosPrecio.find((r) => r.id === filtros.precio)!.label] : []}
              single
              onToggle={(label) => {
                const r = rangosPrecio.find((x) => x.label === label)!;
                set({ precio: filtros.precio === r.id ? null : r.id });
              }}
            />
          </FilterDropdown>

          <FilterDropdown id="mas" label="Más filtros" icon active={!!(filtros.colores.length || filtros.unidad || filtros.soloDisponibles)} align="right" open={openDrop} setOpen={setOpenDrop} wide>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-ink-900">Color</p>
                <OptionList options={coloresBusqueda} selected={filtros.colores} onToggle={(v) => set({ colores: toggle(filtros.colores, v) })} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-ink-900">Tienda / Unidad de negocio</p>
                <OptionList
                  options={unidadesNegocio.map((u) => u.nombre)}
                  selected={filtros.unidad ? [filtros.unidad] : []}
                  single
                  onToggle={(v) => set({ unidad: filtros.unidad === v ? null : (v as UnidadNegocio) })}
                />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-ink-900">Disponibilidad</p>
                <button
                  onClick={() => set({ soloDisponibles: !filtros.soloDisponibles })}
                  className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-3.5 text-sm ${
                    filtros.soloDisponibles ? "border-kelder-600 bg-kelder-50 text-kelder-700" : "border-ink-200 text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  {filtros.soloDisponibles && <Check size={15} aria-hidden="true" />}
                  Solo productos disponibles
                </button>
              </div>
            </div>
          </FilterDropdown>

          {nActivos > 0 && (
            <button onClick={() => setFiltros(filtrosVacios)} className="ml-1 min-h-[40px] text-sm font-medium text-ink-500 hover:text-ink-900">
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Mobile filter/sort controls */}
        <div className="mb-3 flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDrawer(true)}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-ink-200 bg-white text-sm font-medium text-ink-900"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            Filtros
            {nActivos > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-kelder-600 px-1.5 text-xs font-semibold text-white">{nActivos}</span>
            )}
          </button>
          <OrdenSelect orden={orden} setOrden={setOrden} className="h-11 flex-1" />
        </div>

        {/* Active chips */}
        {nActivos > 0 && <ChipsRow chips={chips} onClear={() => setFiltros(filtrosVacios)} />}

        {/* Results header */}
        <div className="mb-5 mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-ink-900">
              Resultados para <span className="text-ink-900">«{query}»</span>
            </h1>
            <p className="mt-0.5 text-sm text-ink-500">
              {resultados.length} {resultados.length === 1 ? "producto" : "productos"}
              <span className="ml-2 text-ink-400">· Tu cashback: {formatMXN(cuenta.cashbackDisponible)}</span>
            </p>
          </div>
          <div className="hidden items-center gap-2 text-sm text-ink-500 md:flex">
            <span>Ordenar por</span>
            <OrdenSelect orden={orden} setOrden={setOrden} className="h-11" />
          </div>
        </div>

        {/* Availability quick-filter — prioritizes the selected store */}
        <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {([
            { key: "todos", label: "Todos" },
            { key: "en_tienda", label: miTienda ? `En ${miTienda.nombre}` : "En mi tienda" },
            { key: "extendido", label: "Catálogo extendido" },
          ] as const).map((c) => (
            <button
              key={c.key}
              onClick={() => setDispFiltro(c.key)}
              className={`min-h-[34px] shrink-0 rounded-full border px-3.5 text-sm font-medium transition-colors ${
                dispFiltro === c.key ? "border-kelder-600 bg-kelder-600 text-white" : "border-ink-200 text-ink-600 hover:bg-ink-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results grid / empty */}
        {resultados.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {resultados.map((p) => (
              <ProductCard
                key={p.id}
                producto={p}
                poderCompraCashback={cuenta.cashbackDisponible}
                mostrarDisponibilidad
                onClick={() => navigate(`/producto/${p.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md py-10 text-center">
            <p className="text-lg font-semibold text-ink-900">No encontramos productos con estos filtros</p>
            <p className="mt-1 text-sm text-ink-500">Prueba con otras palabras, ajusta los filtros o busca con una foto.</p>
            <div className="mt-6 flex flex-col gap-2.5">
              {nActivos > 0 && (
                <Button variant="secondary" fullWidth onClick={() => setFiltros(filtrosVacios)}>
                  Limpiar filtros
                </Button>
              )}
              <Button variant="secondary" fullWidth icon={<Camera size={18} aria-hidden="true" />} onClick={() => { setSubmitted(false); setModo("foto"); }}>
                Buscar con foto
              </Button>
            </div>
          </div>
        )}

        {drawer && (
          <FiltrosDrawer
            filtros={filtros}
            set={set}
            onClear={() => setFiltros(filtrosVacios)}
            total={resultados.length}
            onClose={() => setDrawer(false)}
          />
        )}
      </div>
    );
  }

  // ─────────────────────────── Initial view ───────────────────────────
  return (
    <div className="mx-auto max-w-2xl">
      <BackButton />
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl lg:text-4xl">Encuentra lo que buscas</h1>
        <p className="mt-1.5 text-sm text-ink-500 sm:text-base">Busca productos disponibles en las tiendas del grupo.</p>
      </header>

      {/* mode selector — full width on mobile */}
      <div role="tablist" aria-label="Forma de búsqueda" className="mb-5 flex w-full items-center gap-1 rounded-full border border-ink-100 bg-white p-1 sm:inline-flex sm:w-auto">
        {(["texto", "codigo", "foto"] as Modo[]).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={modo === m}
            onClick={() => setModo(m)}
            className={`min-h-[44px] flex-1 rounded-full px-4 text-sm font-medium transition-colors sm:flex-none sm:px-5 ${
              modo === m ? "bg-kelder-600 text-white" : "text-ink-500 hover:text-ink-900"
            }`}
          >
            {m === "codigo" ? "Código" : m === "foto" ? "Foto" : "Texto"}
          </button>
        ))}
      </div>

      {modo === "texto" && (
        <div>
          <label className="block">
            <span className="mb-2 block font-medium text-ink-900">¿Qué estás buscando?</span>
            <span className="relative block">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && run()}
                placeholder="Ej. tenis blancos para niño"
                className="h-14 w-full rounded-2xl border border-ink-200 bg-white pl-12 pr-4 text-base"
              />
            </span>
          </label>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button fullWidth className="sm:w-auto" onClick={() => run()} disabled={query.trim().length === 0}>
              Buscar producto
            </Button>
            <button onClick={() => setModo("foto")} className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-sm font-semibold text-kelder-600">
              <Camera size={17} aria-hidden="true" />
              Buscar con foto
            </button>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">Búsquedas sugeridas</p>
            <div className="flex flex-wrap gap-2">
              {busquedasSugeridas.map((s) => (
                <button
                  key={s}
                  onClick={() => run(s)}
                  className="min-h-[40px] rounded-full border border-ink-200 px-4 text-sm font-medium text-ink-700 hover:bg-ink-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modo === "codigo" && (
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Buscar por código de artículo</h2>
          <p className="mt-1 text-sm text-ink-500">Ingresa el código que aparece en la etiqueta, ticket o información del producto.</p>
          <label className="mt-4 block">
            <span className="mb-2 block font-medium text-ink-900">Código de artículo</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="Ej. NB-530-WHT"
              className="h-14 w-full rounded-2xl border border-ink-200 bg-white px-4 text-base"
            />
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button fullWidth className="sm:w-auto" onClick={() => run()} disabled={query.trim().length === 0}>
              Buscar producto
            </Button>
            <button className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-sm font-semibold text-kelder-600 sm:hidden">
              <ScanLine size={17} aria-hidden="true" />
              Escanear código
            </button>
          </div>
        </div>
      )}

      {modo === "foto" && (
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Encuentra algo parecido</h2>
          <p className="mt-1 text-sm text-ink-500">Sube o toma una foto de un producto y encuentra opciones similares en las tiendas del grupo.</p>

          {/* Single upload/camera zone — no duplicated action inside the Foto tab */}
          <label className="mt-5 flex cursor-pointer flex-col items-center gap-4 rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-10 text-center transition-colors hover:border-kelder-300 hover:bg-kelder-50/40">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-kelder-50 text-kelder-600">
              <Camera size={26} aria-hidden="true" />
            </span>
            <span className="font-medium text-ink-900">Subir o tomar una foto</span>
            <span className="max-w-xs text-sm text-ink-500">Toca para elegir una imagen de tu galería o usar la cámara. JPG o PNG.</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={() => run("tenis")}
            />
          </label>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── Active-filter chips ───────────────────────────

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

function chipsActivos(f: Filtros, set: (p: Partial<Filtros>) => void): Chip[] {
  const chips: Chip[] = [];
  if (f.departamento) chips.push({ key: "dep", label: f.departamento, onRemove: () => set({ departamento: null }) });
  if (f.tipo) chips.push({ key: "tipo", label: f.tipo, onRemove: () => set({ tipo: null, tallas: [] }) });
  f.tallas.forEach((t) => chips.push({ key: `t-${t}`, label: `Talla ${t}`, onRemove: () => set({ tallas: f.tallas.filter((x) => x !== t) }) }));
  f.marcas.forEach((m) => chips.push({ key: `m-${m}`, label: m, onRemove: () => set({ marcas: f.marcas.filter((x) => x !== m) }) }));
  f.colores.forEach((c) => chips.push({ key: `c-${c}`, label: c, onRemove: () => set({ colores: f.colores.filter((x) => x !== c) }) }));
  if (f.precio) {
    const r = rangosPrecio.find((x) => x.id === f.precio);
    if (r) chips.push({ key: "precio", label: r.label, onRemove: () => set({ precio: null }) });
  }
  if (f.unidad) chips.push({ key: "unidad", label: f.unidad, onRemove: () => set({ unidad: null }) });
  if (f.soloDisponibles) chips.push({ key: "disp", label: "Disponibles", onRemove: () => set({ soloDisponibles: false }) });
  return chips;
}

function ChipsRow({ chips, onClear }: { chips: Chip[]; onClear: () => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
      {chips.map((c) => (
        <button
          key={c.key}
          onClick={c.onRemove}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-kelder-200 bg-kelder-50 py-1.5 pl-3 pr-2 text-sm font-medium text-kelder-700"
        >
          {c.label}
          <X size={14} aria-hidden="true" />
        </button>
      ))}
      <button onClick={onClear} className="shrink-0 whitespace-nowrap px-2 text-sm font-medium text-ink-500 hover:text-ink-900">
        Limpiar
      </button>
    </div>
  );
}

// ─────────────────────────── Sort ───────────────────────────

function OrdenSelect({ orden, setOrden, className = "" }: { orden: Orden; setOrden: (o: Orden) => void; className?: string }) {
  return (
    <select
      value={orden}
      onChange={(e) => setOrden(e.target.value as Orden)}
      aria-label="Ordenar resultados"
      className={`rounded-2xl border border-ink-200 bg-white px-3 text-sm font-medium text-ink-900 ${className}`}
    >
      <option value="relevancia">Relevancia</option>
      <option value="precio_asc">Menor precio</option>
      <option value="precio_desc">Mayor precio</option>
      <option value="recientes">Más recientes</option>
    </select>
  );
}

// ─────────────────────────── Desktop dropdown ───────────────────────────

function FilterDropdown({
  id,
  label,
  active,
  icon,
  wide,
  align = "left",
  open,
  setOpen,
  children,
}: {
  id: string;
  label: string;
  active?: boolean;
  icon?: boolean;
  wide?: boolean;
  align?: "left" | "right";
  open: string | null;
  setOpen: (v: string | null) => void;
  children: ReactNode;
}) {
  const isOpen = open === id;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(isOpen ? null : id)}
        className={`flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors ${
          active ? "border-kelder-600 bg-kelder-50 text-kelder-700" : "border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
        }`}
      >
        {icon && <SlidersHorizontal size={15} aria-hidden="true" />}
        {label}
        <ChevronDown size={15} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(null)} aria-hidden="true" />
          <div
            className={`absolute z-40 mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-ink-100 bg-white p-4 shadow-card ${
              align === "right" ? "right-0" : "left-0"
            } ${wide ? "w-72" : "w-64"} max-w-[85vw]`}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

function OptionList({
  options,
  selected,
  onToggle,
  single,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  single?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <button
            key={o}
            onClick={() => onToggle(o)}
            aria-pressed={on}
            className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors ${
              on ? "border-kelder-600 bg-kelder-50 text-kelder-700" : "border-ink-200 text-ink-700 hover:bg-ink-50"
            }`}
          >
            {on && !single && <Check size={14} aria-hidden="true" />}
            {o}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────── Mobile bottom-sheet drawer ───────────────────────────

function FiltrosDrawer({
  filtros,
  set,
  onClear,
  total,
  onClose,
}: {
  filtros: Filtros;
  set: (p: Partial<Filtros>) => void;
  onClear: () => void;
  total: number;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/40" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full flex-col rounded-t-3xl bg-white"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Filtrar productos"
      >
        {/* header */}
        <div className="flex shrink-0 items-center justify-between border-b border-ink-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-ink-900">Filtrar productos</h2>
          <button onClick={onClose} aria-label="Cerrar" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* scrollable body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <Group titulo="Departamento">
            <OptionList options={departamentos} single selected={filtros.departamento ? [filtros.departamento] : []} onToggle={(v) => set({ departamento: filtros.departamento === v ? null : (v as Departamento) })} />
          </Group>
          <Group titulo="Categoría">
            <OptionList options={tiposProducto} single selected={filtros.tipo ? [filtros.tipo] : []} onToggle={(v) => set({ tipo: filtros.tipo === v ? null : (v as TipoProducto), tallas: [] })} />
          </Group>
          <Group titulo={filtros.tipo === "Ropa" ? "Talla (ropa)" : filtros.tipo === "Accesorios" ? "Talla" : "Talla (calzado)"}>
            <OptionList options={tallasDeTipo(filtros.tipo)} selected={filtros.tallas} onToggle={(v) => set({ tallas: toggle(filtros.tallas, v) })} />
          </Group>
          <Group titulo="Marca">
            <OptionList options={marcasBusqueda} selected={filtros.marcas} onToggle={(v) => set({ marcas: toggle(filtros.marcas, v) })} />
          </Group>
          <Group titulo="Precio">
            <OptionList
              options={rangosPrecio.map((r) => r.label)}
              single
              selected={filtros.precio ? [rangosPrecio.find((r) => r.id === filtros.precio)!.label] : []}
              onToggle={(label) => {
                const r = rangosPrecio.find((x) => x.label === label)!;
                set({ precio: filtros.precio === r.id ? null : r.id });
              }}
            />
          </Group>
          <Group titulo="Color">
            <OptionList options={coloresBusqueda} selected={filtros.colores} onToggle={(v) => set({ colores: toggle(filtros.colores, v) })} />
          </Group>
          <Group titulo="Tienda / Unidad de negocio">
            <OptionList options={unidadesNegocio.map((u) => u.nombre)} single selected={filtros.unidad ? [filtros.unidad] : []} onToggle={(v) => set({ unidad: filtros.unidad === v ? null : (v as UnidadNegocio) })} />
          </Group>
          <Group titulo="Disponibilidad">
            <button
              onClick={() => set({ soloDisponibles: !filtros.soloDisponibles })}
              className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-3.5 text-sm ${
                filtros.soloDisponibles ? "border-kelder-600 bg-kelder-50 text-kelder-700" : "border-ink-200 text-ink-700 hover:bg-ink-50"
              }`}
            >
              {filtros.soloDisponibles && <Check size={15} aria-hidden="true" />}
              Solo productos disponibles
            </button>
          </Group>
        </div>

        {/* persistent footer */}
        <div className="flex shrink-0 items-center gap-3 border-t border-ink-100 px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <button onClick={onClear} className="min-h-[48px] px-2 text-sm font-medium text-ink-500 hover:text-ink-900">
            Limpiar
          </button>
          <Button fullWidth onClick={onClose}>
            Ver {total} {total === 1 ? "producto" : "productos"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Group({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-ink-900">{titulo}</p>
      {children}
    </div>
  );
}

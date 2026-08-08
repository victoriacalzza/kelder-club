import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Camera, ImagePlus, ScanLine, SlidersHorizontal, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { catalogo, busquedasSugeridas, cuenta, formatMXN, type Producto } from "@/lib/mock-data";

type Modo = "texto" | "codigo" | "foto";
type Orden = "recomendados" | "precio" | "cashback";

const generico = ["tenis", "calzado", "zapato", "zapatos", "sneakers", "correr", "running"];
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
    const heno = `${p.marca} ${p.modelo} ${p.categoria ?? ""} ${p.color ?? ""}`.toLowerCase();
    return tokens.some((t) => heno.includes(t));
  });
}

function ordenar(items: Producto[], orden: Orden) {
  if (orden === "precio") return [...items].sort((a, b) => a.precio - b.precio);
  if (orden === "cashback") return [...items].sort((a, b) => b.precio - a.precio);
  return items;
}

interface BuscarProps {
  initialModo?: Modo;
  initialQuery?: string;
  initialSubmitted?: boolean;
}

export function Buscar({ initialModo = "texto", initialQuery = "", initialSubmitted = false }: BuscarProps) {
  const navigate = useNavigate();
  const [modo, setModo] = useState<Modo>(initialModo);
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialSubmitted);
  const [orden, setOrden] = useState<Orden>("recomendados");
  const [filtros, setFiltros] = useState(false);

  const resultados = ordenar(buscar(query), orden);

  function run(q?: string) {
    const term = (q ?? query).trim();
    if (!term) return;
    setQuery(term);
    setSubmitted(true);
  }

  // ---- Results / no-results ----
  if (submitted) {
    return (
      <div>
        {/* sticky search bar */}
        <div className="sticky top-16 z-20 -mx-5 mb-6 border-b border-ink-100 bg-cream/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
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

        {resultados.length > 0 ? (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-500">
                {resultados.length} resultados para <span className="font-medium text-ink-900">«{query}»</span>
                <span className="ml-2 text-ink-400">· Tu cashback: {formatMXN(cuenta.cashbackDisponible)}</span>
              </p>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm text-ink-500">
                  Ordenar
                  <select
                    value={orden}
                    onChange={(e) => setOrden(e.target.value as Orden)}
                    className="h-11 rounded-2xl border border-ink-200 bg-white px-3 text-sm font-medium text-ink-900"
                  >
                    <option value="recomendados">Recomendados</option>
                    <option value="precio">Precio</option>
                    <option value="cashback">Mayor cashback</option>
                  </select>
                </label>
                <button
                  onClick={() => setFiltros(true)}
                  className="flex h-11 items-center gap-2 rounded-2xl border border-ink-200 bg-white px-4 text-sm font-medium text-ink-900 hover:bg-ink-50"
                >
                  <SlidersHorizontal size={16} aria-hidden="true" />
                  Filtros
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
          </>
        ) : (
          <div className="mx-auto max-w-md py-10 text-center">
            <p className="text-lg font-semibold text-ink-900">No encontramos exactamente lo que buscas</p>
            <p className="mt-1 text-sm text-ink-500">Prueba con otras palabras o busca con una foto.</p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Button variant="secondary" fullWidth onClick={() => setSubmitted(false)}>
                Modificar búsqueda
              </Button>
              <Button variant="secondary" fullWidth icon={<Camera size={18} aria-hidden="true" />} onClick={() => { setSubmitted(false); setModo("foto"); }}>
                Buscar con foto
              </Button>
              <button onClick={() => { setQuery("tenis"); }} className="mt-1 inline-flex items-center justify-center gap-1 text-sm font-semibold text-kelder-600">
                Ver productos similares
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {filtros && <FiltrosSheet onClose={() => setFiltros(false)} />}
      </div>
    );
  }

  // ---- Initial state ----
  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Encuentra lo que buscas</h1>
        <p className="mt-1.5 text-ink-500">Busca productos disponibles en las tiendas del grupo.</p>
      </header>

      {/* mode selector */}
      <div role="tablist" aria-label="Forma de búsqueda" className="mb-5 inline-flex items-center gap-1 rounded-full border border-ink-100 bg-white p-1">
        {(["texto", "codigo", "foto"] as Modo[]).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={modo === m}
            onClick={() => setModo(m)}
            className={`min-h-[40px] rounded-full px-5 text-sm font-medium capitalize transition-colors ${
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

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button onClick={() => run()} disabled={query.trim().length === 0}>
              Buscar producto
            </Button>
            <button onClick={() => setModo("foto")} className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-kelder-600">
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
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button onClick={() => run()} disabled={query.trim().length === 0}>
              Buscar producto
            </Button>
            <button className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-kelder-600 sm:hidden">
              <ScanLine size={17} aria-hidden="true" />
              Escanear código
            </button>
          </div>
        </div>
      )}

      {modo === "foto" && (
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Encuentra algo parecido</h2>
          <p className="mt-1 text-sm text-ink-500">Sube una foto de un producto y encuentra opciones similares disponibles en las tiendas del grupo.</p>
          <div className="mt-5 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-kelder-50 text-kelder-600">
              <ImagePlus size={26} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2.5 sm:flex-row-reverse">
              <Button icon={<ImagePlus size={18} aria-hidden="true" />} onClick={() => run("tenis")}>
                Subir imagen
              </Button>
              <Button variant="secondary" icon={<Camera size={18} aria-hidden="true" />} onClick={() => run("tenis")}>
                Tomar foto
              </Button>
            </div>
            <p className="text-xs text-ink-400">JPG o PNG · Encontraremos productos similares del grupo</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FiltrosSheet({ onClose }: { onClose: () => void }) {
  const grupos: { titulo: string; opciones: string[] }[] = [
    { titulo: "Marca", opciones: ["On", "Puma", "Converse", "Asics", "New Balance"] },
    { titulo: "Categoría", opciones: ["Running", "Lifestyle"] },
    { titulo: "Talla", opciones: ["24", "25", "26", "27", "28", "29"] },
    { titulo: "Color", opciones: ["Blanco", "Negro", "Plata", "Gris"] },
    { titulo: "Rango de precio", opciones: ["Hasta $1,500", "$1,500 – $2,500", "Más de $2,500"] },
    { titulo: "Tienda", opciones: ["Kelder Plaza Forum", "CalzzaSport Centro", "Calzzapato Paseo Mochis"] },
  ];
  return (
    <Sheet title="Filtros" description="Refina los resultados de tu búsqueda." onClose={onClose}>
      <div className="space-y-5">
        {grupos.map((g) => (
          <div key={g.titulo}>
            <p className="mb-2 text-sm font-medium text-ink-900">{g.titulo}</p>
            <div className="flex flex-wrap gap-2">
              {g.opciones.map((o) => (
                <button key={o} className="min-h-[40px] rounded-full border border-ink-200 px-3.5 text-sm text-ink-700 hover:border-kelder-600 hover:text-kelder-700">
                  {o}
                </button>
              ))}
            </div>
          </div>
        ))}
        <Button fullWidth onClick={onClose}>
          Ver resultados
        </Button>
      </div>
    </Sheet>
  );
}

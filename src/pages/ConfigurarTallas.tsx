import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Ruler } from "lucide-react";
import { BackButton } from "@/components/layout/BackButton";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { WheelPicker } from "@/components/ui/WheelPicker";
import { useClub, type TallaSistema, type Medidas } from "@/lib/ClubContext";

// Footwear sizes aligned by index across systems, so switching system keeps the same physical size.
const CALZADO: Record<TallaSistema, number[]> = {
  MX: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  US: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  EU: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
};
const ROPA = ["XS", "S", "M", "L", "XL", "XXL"];
const rango = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const MEDIDAS: { key: keyof Medidas; label: string; rango: number[]; como: string }[] = [
  { key: "estatura", label: "Estatura", rango: rango(140, 200), como: "De pie, sin zapatos, con la espalda recta contra la pared." },
  { key: "cintura", label: "Cintura", rango: rango(55, 120), como: "Rodea la parte más estrecha del torso, sobre el ombligo." },
  { key: "cadera", label: "Cadera", rango: rango(80, 130), como: "Rodea la parte más ancha de la cadera, de pie y relajada." },
  { key: "pecho", label: "Pecho", rango: rango(75, 130), como: "Rodea la parte más amplia del pecho, bajo las axilas." },
];
const DEF_MEDIDA: Record<keyof Medidas, number> = { estatura: 165, cintura: 72, cadera: 96, pecho: 90 };

/**
 * Dedicated, immersive size-configuration tool (Zara-like behavior, Kelder look). Progressive
 * disclosure: basic footwear/apparel size first; optional body measurements only when the member
 * chooses to improve their recommendation. Single "Guardar" commits everything to ClubContext.
 */
export function ConfigurarTallas() {
  const navigate = useNavigate();
  const { tallaMx, tallaRopa, tallaSistema, medidas, setTallaMx, setTallaRopa, setTallaSistema, setMedidas } = useClub();

  const [sistema, setSistema] = useState<TallaSistema>(tallaSistema);
  // Index of the current footwear size (aligned across systems). Seed from the stored MX value.
  const [idx, setIdx] = useState(() => {
    const i = CALZADO.MX.indexOf(tallaMx ?? 24);
    return i >= 0 ? i : CALZADO.MX.indexOf(24);
  });
  const [ropa, setRopa] = useState(tallaRopa ?? "M");
  const [mejorar, setMejorar] = useState(false);
  const [comoMedir, setComoMedir] = useState(false);
  const [medDraft, setMedDraft] = useState<Record<keyof Medidas, number>>({
    estatura: medidas.estatura ?? DEF_MEDIDA.estatura,
    cintura: medidas.cintura ?? DEF_MEDIDA.cintura,
    cadera: medidas.cadera ?? DEF_MEDIDA.cadera,
    pecho: medidas.pecho ?? DEF_MEDIDA.pecho,
  });

  const opciones = CALZADO[sistema];

  function guardar() {
    setTallaSistema(sistema);
    setTallaMx(CALZADO.MX[idx]);
    setTallaRopa(ropa);
    if (mejorar) setMedidas(medDraft);
    navigate("/perfil");
  }

  return (
    <div className="mx-auto max-w-xl pb-4">
      <BackButton to="/perfil" label="Perfil" />
      <TopBar title="Configurar tallas" subtitle="Ajusta tus tallas para encontrar productos que puedes comprar en tu medida." />

      {/* ── Calzado ── */}
      <section className="rounded-3xl bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-ink-900">Calzado</h2>
          {/* size system */}
          <div className="inline-flex items-center rounded-full border border-ink-200 bg-white p-0.5">
            {(["MX", "US", "EU"] as TallaSistema[]).map((s) => (
              <button
                key={s}
                onClick={() => setSistema(s)}
                className={`min-h-[30px] rounded-full px-3 text-xs font-semibold transition-colors ${
                  sistema === s ? "bg-kelder-600 text-white" : "text-ink-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-1 text-sm text-ink-500">Tu talla habitual</p>
        <div className="mt-2">
          <WheelPicker
            key={sistema}
            options={opciones}
            value={opciones[idx]}
            onChange={(v) => setIdx(opciones.indexOf(v))}
            unit={sistema}
          />
        </div>
      </section>

      {/* ── Ropa ── */}
      <section className="mt-4 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-base font-semibold text-ink-900">Ropa</h2>
        <p className="mt-1 text-sm text-ink-500">Tu talla habitual</p>
        <div className="mt-2">
          <WheelPicker orientation="h" options={ROPA} value={ropa} onChange={setRopa} />
        </div>

        {/* Optional: improve the recommendation with body measurements (progressive disclosure) */}
        <button
          onClick={() => setMejorar((m) => !m)}
          aria-expanded={mejorar}
          className="mt-2 flex w-full items-center justify-between gap-2 border-t border-ink-100 pt-3 text-left text-sm font-semibold text-kelder-600"
        >
          <span className="inline-flex items-center gap-1.5">
            <Ruler size={16} aria-hidden="true" />
            Mejorar recomendación de talla
          </span>
          <ChevronDown size={16} className={`transition-transform ${mejorar ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>

        {mejorar && (
          <div className="mt-3">
            <p className="text-sm text-ink-500">Opcional. Nos ayuda a recomendarte mejor tu talla. Ninguna medida es obligatoria.</p>
            <button onClick={() => setComoMedir((c) => !c)} className="mt-2 text-sm font-medium text-ink-600 underline underline-offset-2">
              ¿Cómo medirme?
            </button>
            {comoMedir && (
              <ul className="mt-2 space-y-1.5 rounded-2xl bg-ink-50 p-4 text-sm text-ink-600">
                {MEDIDAS.map((m) => (
                  <li key={m.key}>
                    <span className="font-medium text-ink-900">{m.label}:</span> {m.como}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {MEDIDAS.map((m) => (
                <div key={m.key} className="rounded-2xl border border-ink-100 p-2">
                  <p className="text-center text-xs font-medium text-ink-500">{m.label}</p>
                  <WheelPicker
                    options={m.rango}
                    value={medDraft[m.key]}
                    onChange={(v) => setMedDraft((d) => ({ ...d, [m.key]: v }))}
                    unit="cm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="mt-5">
        <Button fullWidth onClick={guardar}>
          Guardar
        </Button>
      </div>
    </div>
  );
}

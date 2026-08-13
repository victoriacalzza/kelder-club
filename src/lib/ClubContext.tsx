import { createContext, useContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Client-side personalization state for Kelder Club: preferred store, saved products
 * (favoritos) and the conceptual "lista para visitar". Persisted to localStorage so it
 * survives reloads. Personalization in this phase comes from store context + collections,
 * NOT from a recommendation algorithm.
 *
 * A safe default value lets components read the context outside a provider (e.g. isolated
 * storyboards) without crashing — collections just won't persist there.
 */
export type TallaSistema = "MX" | "US" | "EU";
export interface Medidas {
  estatura?: number;
  cintura?: number;
  cadera?: number;
  pecho?: number;
}

interface ClubState {
  tiendaPreferidaId: string | null;
  setTiendaPreferida: (id: string | null) => void;

  // The member's habitual sizes. Set once, remembered, used to personalize catalog/search/
  // availability. `tallaMx` = footwear (MX number); `tallaRopa` = apparel (XS…XXL). More size
  // categories (pantalón, infantil…) can be added later without reworking consumers.
  tallaMx: number | null;
  setTallaMx: (t: number | null) => void;
  tallaRopa: string | null;
  setTallaRopa: (t: string | null) => void;
  tallaSistema: TallaSistema; // display system for footwear (value is always stored as MX)
  setTallaSistema: (s: TallaSistema) => void;
  medidas: Medidas; // optional body measurements to improve size recommendations
  setMedidas: (m: Medidas) => void;

  favoritos: string[]; // product ids
  toggleFavorito: (id: string) => void;
  esFavorito: (id: string) => boolean;

  visita: string[]; // product ids on "mi lista para visitar"
  toggleVisita: (id: string) => void;
  enVisita: (id: string) => boolean;
}

const noop = () => {};
const DEFAULT_TALLA = 24; // demo default so personalization is visible from the first run
const DEFAULT_TALLA_ROPA = "M";
const ClubContext = createContext<ClubState>({
  tiendaPreferidaId: null,
  setTiendaPreferida: noop,
  tallaMx: DEFAULT_TALLA,
  setTallaMx: noop,
  tallaRopa: DEFAULT_TALLA_ROPA,
  setTallaRopa: noop,
  tallaSistema: "MX",
  setTallaSistema: noop,
  medidas: {},
  setMedidas: noop,
  favoritos: [],
  toggleFavorito: noop,
  esFavorito: () => false,
  visita: [],
  toggleVisita: noop,
  enVisita: () => false,
});

function usePersistedList(key: string): [string[], (id: string) => void] {
  const [list, setList] = useState<string[]>(() => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      /* ignore quota / unavailable storage */
    }
  }, [key, list]);
  const toggle = useCallback((id: string) => {
    setList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);
  return [list, toggle];
}

export function ClubProvider({ children }: { children: ReactNode }) {
  const [tiendaPreferidaId, setTiendaPreferidaState] = useState<string | null>(() => {
    try {
      return typeof localStorage !== "undefined" ? localStorage.getItem("kc.tiendaPreferida") : null;
    } catch {
      return null;
    }
  });
  const setTiendaPreferida = useCallback((id: string | null) => {
    setTiendaPreferidaState(id);
    try {
      if (id) localStorage.setItem("kc.tiendaPreferida", id);
      else localStorage.removeItem("kc.tiendaPreferida");
    } catch {
      /* ignore */
    }
  }, []);

  const [tallaMx, setTallaMxState] = useState<number | null>(() => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem("kc.tallaMx") : null;
      return raw !== null ? Number(raw) : DEFAULT_TALLA;
    } catch {
      return DEFAULT_TALLA;
    }
  });
  const setTallaMx = useCallback((t: number | null) => {
    setTallaMxState(t);
    try {
      if (t !== null) localStorage.setItem("kc.tallaMx", String(t));
      else localStorage.removeItem("kc.tallaMx");
    } catch {
      /* ignore */
    }
  }, []);

  const [tallaRopa, setTallaRopaState] = useState<string | null>(() => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem("kc.tallaRopa") : null;
      return raw !== null ? raw : DEFAULT_TALLA_ROPA;
    } catch {
      return DEFAULT_TALLA_ROPA;
    }
  });
  const setTallaRopa = useCallback((t: string | null) => {
    setTallaRopaState(t);
    try {
      if (t !== null) localStorage.setItem("kc.tallaRopa", t);
      else localStorage.removeItem("kc.tallaRopa");
    } catch {
      /* ignore */
    }
  }, []);

  const [tallaSistema, setTallaSistemaState] = useState<TallaSistema>(() => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem("kc.tallaSistema") : null;
      return raw === "US" || raw === "EU" ? raw : "MX";
    } catch {
      return "MX";
    }
  });
  const setTallaSistema = useCallback((s: TallaSistema) => {
    setTallaSistemaState(s);
    try {
      localStorage.setItem("kc.tallaSistema", s);
    } catch {
      /* ignore */
    }
  }, []);

  const [medidas, setMedidasState] = useState<Medidas>(() => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem("kc.medidas") : null;
      return raw ? (JSON.parse(raw) as Medidas) : {};
    } catch {
      return {};
    }
  });
  const setMedidas = useCallback((m: Medidas) => {
    setMedidasState(m);
    try {
      localStorage.setItem("kc.medidas", JSON.stringify(m));
    } catch {
      /* ignore */
    }
  }, []);

  const [favoritos, toggleFavorito] = usePersistedList("kc.favoritos");
  const [visita, toggleVisita] = usePersistedList("kc.visita");

  const value = useMemo<ClubState>(
    () => ({
      tiendaPreferidaId,
      setTiendaPreferida,
      tallaMx,
      setTallaMx,
      tallaRopa,
      setTallaRopa,
      tallaSistema,
      setTallaSistema,
      medidas,
      setMedidas,
      favoritos,
      toggleFavorito,
      esFavorito: (id) => favoritos.includes(id),
      visita,
      toggleVisita,
      enVisita: (id) => visita.includes(id),
    }),
    [tiendaPreferidaId, setTiendaPreferida, tallaMx, setTallaMx, tallaRopa, setTallaRopa, tallaSistema, setTallaSistema, medidas, setMedidas, favoritos, toggleFavorito, visita, toggleVisita],
  );

  return <ClubContext.Provider value={value}>{children}</ClubContext.Provider>;
}

export function useClub() {
  return useContext(ClubContext);
}

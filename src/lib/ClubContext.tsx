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
interface ClubState {
  tiendaPreferidaId: string | null;
  setTiendaPreferida: (id: string | null) => void;

  favoritos: string[]; // product ids
  toggleFavorito: (id: string) => void;
  esFavorito: (id: string) => boolean;

  visita: string[]; // product ids on "mi lista para visitar"
  toggleVisita: (id: string) => void;
  enVisita: (id: string) => boolean;
}

const noop = () => {};
const ClubContext = createContext<ClubState>({
  tiendaPreferidaId: null,
  setTiendaPreferida: noop,
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

  const [favoritos, toggleFavorito] = usePersistedList("kc.favoritos");
  const [visita, toggleVisita] = usePersistedList("kc.visita");

  const value = useMemo<ClubState>(
    () => ({
      tiendaPreferidaId,
      setTiendaPreferida,
      favoritos,
      toggleFavorito,
      esFavorito: (id) => favoritos.includes(id),
      visita,
      toggleVisita,
      enVisita: (id) => visita.includes(id),
    }),
    [tiendaPreferidaId, setTiendaPreferida, favoritos, toggleFavorito, visita, toggleVisita],
  );

  return <ClubContext.Provider value={value}>{children}</ClubContext.Provider>;
}

export function useClub() {
  return useContext(ClubContext);
}

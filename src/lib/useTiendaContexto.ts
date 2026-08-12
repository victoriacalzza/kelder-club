import { useClub } from "@/lib/ClubContext";
import { sucursales, tiendaCercana, tiendaPorId, type Tienda } from "@/lib/mock-data";

export type OrigenTienda = "preferida" | "cercana" | "ninguna";

export interface TiendaContexto {
  tienda: Tienda | null;
  origen: OrigenTienda;
}

/**
 * Resolves which store personalizes the experience, in priority order:
 *   1. the member's "Mi tienda preferida" (if set)
 *   2. otherwise the nearest store by location
 *   3. if we had no location we'd return `ninguna` and the UI invites picking one
 *
 * This prototype has no real geolocation, so with no preference we fall back to the nearest
 * known store. We never invent a location. To exercise the "elige una tienda" empty state,
 * pass `simularSinUbicacion`.
 */
export function useTiendaContexto(simularSinUbicacion = false): TiendaContexto {
  const { tiendaPreferidaId } = useClub();

  const preferida = tiendaPorId(tiendaPreferidaId ?? undefined);
  if (preferida) return { tienda: preferida, origen: "preferida" };

  if (simularSinUbicacion) return { tienda: null, origen: "ninguna" };

  const cercana = [...sucursales].sort((a, b) => a.distanciaKm - b.distanciaKm)[0] ?? tiendaCercana;
  return { tienda: cercana, origen: "cercana" };
}

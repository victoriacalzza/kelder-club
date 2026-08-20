/**
 * Sesión ligera del lado del cliente para Kelder Club+ (prototipo, sin backend).
 * Sólo marca si hay una sesión activa, persistida en localStorage. Cuando exista un
 * backend real, reemplazar estas funciones por la autenticación correspondiente.
 */
const KEY = "kc.session";

export function isLoggedIn(): boolean {
  try {
    return typeof localStorage !== "undefined" && localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function login(): void {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* ignore quota / unavailable storage */
  }
}

export function logout(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

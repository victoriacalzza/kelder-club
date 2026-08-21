/**
 * Sesión del BACKOFFICE — completamente separada de la sesión de clientes de Kelder Club+.
 * Prototipo sin backend: persiste en localStorage bajo una clave distinta (`kc.admin.session`).
 * Cuando exista backend, reemplazar por autenticación real (SSO/JWT) sin tocar la UI.
 */
export type AdminRole = "admin" | "mercadotecnia" | "ecommerce" | "atencion" | "lectura";

export interface AdminUser {
  nombre: string;
  email: string;
  role: AdminRole;
}

const KEY = "kc.admin.session";

export const ROLE_LABEL: Record<AdminRole, string> = {
  admin: "Administrador general",
  mercadotecnia: "Mercadotecnia",
  ecommerce: "Ecommerce",
  atencion: "Atención al cliente",
  lectura: "Solo lectura",
};

// Permisos por rol (granular: ver/crear/editar/publicar/eliminar). Crear y Publicar son separados.
export type Permiso = "ver" | "crear" | "editar" | "publicar" | "eliminar";
export const ROLE_PERMISOS: Record<AdminRole, Permiso[]> = {
  admin: ["ver", "crear", "editar", "publicar", "eliminar"],
  mercadotecnia: ["ver", "crear", "editar", "publicar"],
  ecommerce: ["ver", "crear", "editar"],
  atencion: ["ver"],
  lectura: ["ver"],
};

const DEMO_USER: AdminUser = { nombre: "Victoria Calzza", email: "victoria@calzzapato.com", role: "admin" };

export function getAdminUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

export function isAdminLoggedIn(): boolean {
  return getAdminUser() !== null;
}

export function adminLogin(user: AdminUser = DEMO_USER): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(user));
  } catch {
    /* ignore */
  }
}

export function adminLogout(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function can(role: AdminRole, p: Permiso): boolean {
  return ROLE_PERMISOS[role].includes(p);
}

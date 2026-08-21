import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Home, Megaphone, Star, LayoutGrid, Percent, Bell, Globe, Store, Users,
  Filter, History, Settings, ChevronsLeft, ChevronsRight, LogOut, Search,
} from "lucide-react";
import { cx } from "./ui";
import { getAdminUser, adminLogout, ROLE_LABEL } from "./lib/adminAuth";
import logoKelderClub from "../assets/logos/kelder-club.png";

type Item = { to: string; label: string; icon: typeof Home; end?: boolean };
type Group = { title?: string; items: Item[] };

const NAV: Group[] = [
  { items: [{ to: "/admin", label: "Inicio", icon: LayoutDashboard, end: true }] },
  {
    title: "Contenido",
    items: [
      { to: "/admin/home", label: "Home", icon: Home },
      { to: "/admin/publicidad", label: "Publicidad / Banners", icon: Megaphone },
      { to: "/admin/productos", label: "Productos destacados", icon: Star },
      { to: "/admin/colecciones", label: "Colecciones", icon: LayoutGrid },
    ],
  },
  {
    items: [
      { to: "/admin/promociones", label: "Promociones", icon: Percent },
      { to: "/admin/notificaciones", label: "Notificaciones", icon: Bell },
      { to: "/admin/landing", label: "Landing", icon: Globe },
      { to: "/admin/tiendas", label: "Tiendas", icon: Store },
      { to: "/admin/usuarios", label: "Usuarios y permisos", icon: Users },
    ],
  },
  {
    title: "Configuración",
    items: [
      { to: "/admin/configuracion", label: "Catálogos y parámetros", icon: Settings },
      { to: "/admin/segmentacion", label: "Segmentaciones", icon: Filter },
      { to: "/admin/auditoria", label: "Auditoría", icon: History },
    ],
  },
];

export function AdminShell() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = getAdminUser();

  function salir() {
    adminLogout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className={cx("sticky top-0 flex h-screen shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-200", collapsed ? "w-[68px]" : "w-64")}>
        {/* Marca */}
        <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-3.5">
          <img src={logoKelderClub} alt="Kelder Club+" className="h-5 w-auto shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-slate-900">Backoffice</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Producción
              </span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {NAV.map((group, gi) => (
            <div key={gi} className={gi > 0 ? "mt-4" : ""}>
              {group.title && !collapsed && (
                <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{group.title}</p>
              )}
              <div className="space-y-0.5">
                {group.items.map((it) => {
                  const Icon = it.icon;
                  return (
                    <NavLink
                      key={it.to}
                      to={it.to}
                      end={it.end}
                      title={collapsed ? it.label : undefined}
                      className={({ isActive }) => cx(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
                        collapsed && "justify-center",
                        isActive ? "bg-kelder-50 text-kelder-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                      )}
                    >
                      <Icon size={17} className="shrink-0" />
                      {!collapsed && <span className="truncate">{it.label}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Usuario / rol / salir */}
        <div className="border-t border-slate-200 p-2">
          {!collapsed ? (
            <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                {user?.nombre.slice(0, 2).toUpperCase() ?? "—"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-slate-900">{user?.nombre ?? "—"}</p>
                <p className="truncate text-[11px] text-slate-400">{user ? ROLE_LABEL[user.role] : ""}</p>
              </div>
              <button onClick={salir} title="Cerrar sesión" className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-kelder-600">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={salir} title="Cerrar sesión" className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-kelder-600">
              <LogOut size={17} />
            </button>
          )}
        </div>
      </aside>

      {/* Columna principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur">
          <button onClick={() => setCollapsed((c) => !c)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Contraer menú">
            {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
          </button>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input placeholder="Buscar en el backoffice…" className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-300 focus:bg-white" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-kelder-600" />
            </button>
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 p-5 lg:p-7">
          <div className="mx-auto max-w-[1200px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

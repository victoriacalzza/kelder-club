import { NavLink, useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { user } from "@/lib/mock-data";

/**
 * Top navigation — part of the Calzzapato ecosystem. The magnifier is the universal entry
 * point to the dedicated "Buscar productos" screen (/buscar); it is NOT a nav destination,
 * so the primary menu stays Inicio · Cashback · Mis vales · Compras · Tiendas.
 */
const items = [
  { to: "/", label: "Inicio" },
  { to: "/cashback", label: "Cashback" },
  { to: "/vales", label: "Mis vales" },
  { to: "/compras", label: "Compras" },
  { to: "/tiendas", label: "Tiendas" },
];

export function TopNav() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 sm:px-8">
        <NavLink to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-kelder-600 text-sm font-bold text-white">K</span>
          <span className="hidden text-base font-semibold tracking-tight text-ink-900 sm:inline">
            Kelder <span className="text-ink-400">Club</span>
          </span>
        </NavLink>

        <nav className="flex flex-1 items-center justify-center gap-0.5 overflow-x-auto">
          {items.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative flex min-h-[40px] items-center whitespace-nowrap px-3 text-[15px] font-medium transition-colors ${
                  isActive ? "text-ink-900" : "text-ink-500 hover:text-ink-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-kelder-600" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => navigate("/buscar")}
            aria-label="Buscar productos"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 hover:bg-white hover:text-ink-900"
          >
            <Search size={20} aria-hidden="true" />
          </button>
          <button aria-label="Notificaciones" className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink-500 hover:bg-white">
            <Bell size={20} aria-hidden="true" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-kelder-600" />
          </button>
          <NavLink to="/perfil" aria-label="Perfil" className="flex h-11 w-11 items-center justify-center rounded-full">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kelder-50 text-sm font-semibold text-kelder-600">
              {user.nombre.slice(0, 2).toUpperCase()}
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

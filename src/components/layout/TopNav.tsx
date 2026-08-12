import { NavLink, useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { user } from "@/lib/mock-data";
import logoKelderClub from "../../assets/logos/kelder-club.png";

/**
 * Top navigation — part of the Calzzapato ecosystem. The magnifier is the universal entry
 * point to the dedicated "Buscar productos" screen (/buscar); it is NOT a nav destination,
 * so the primary menu stays Inicio · Mis vales · Compras · Tiendas. Cashback is not a
 * standalone section — it lives in the Home hero and inside Compras.
 */
const items = [
  { to: "/", label: "Inicio" },
  { to: "/vales", label: "Crédito y vales" },
  { to: "/compras", label: "Compras" },
  { to: "/tiendas", label: "Tiendas" },
];

export function TopNav() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-cream/85 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 sm:px-8">
        <NavLink to="/" className="flex shrink-0 items-center" aria-label="Kelder Club — Inicio">
          <img src={logoKelderClub} alt="Kelder Club" className="h-6 w-auto sm:h-7" />
        </NavLink>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 overflow-x-auto lg:flex">
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

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0">
          <button
            onClick={() => navigate("/buscar")}
            aria-label="Buscar productos"
            className="flex h-11 min-w-[44px] items-center gap-2 rounded-full border border-ink-200 bg-white px-2.5 text-ink-500 transition-colors hover:border-ink-300 hover:text-ink-900 md:px-4"
          >
            <Search size={18} aria-hidden="true" />
            <span className="hidden text-sm font-medium md:inline">Buscar productos</span>
            <span className="hidden text-sm font-medium sm:inline md:hidden">Buscar</span>
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

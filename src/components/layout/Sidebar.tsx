import { NavLink } from "react-router-dom";
import { Home, WalletCards, PercentCircle, Receipt, User, LogOut } from "lucide-react";
import { user } from "@/lib/mock-data";

const items = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/vales", label: "Mis Vales", icon: WalletCards },
  { to: "/cashback", label: "Cashback", icon: PercentCircle },
  { to: "/compras", label: "Compras", icon: Receipt },
  { to: "/perfil", label: "Perfil", icon: User },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink-100 bg-white px-4 py-6 lg:flex">
      <div className="flex items-center gap-2 px-2 pb-8">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-kelder-600 text-sm font-bold text-white">
          K
        </span>
        <span className="text-lg font-semibold tracking-tight text-ink-900">
          Kelder <span className="text-ink-400">Club</span>
        </span>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex min-h-[48px] items-center gap-3 rounded-2xl px-3 text-[15px] font-medium transition-colors ${
                    isActive ? "bg-kelder-50 text-kelder-600" : "text-ink-500 hover:bg-ink-50 hover:text-ink-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} strokeWidth={isActive ? 2.4 : 2} aria-hidden="true" />
                    {label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-ink-100 pt-4">
        <div className="flex items-center gap-3 rounded-2xl px-3 py-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-kelder-50 text-sm font-semibold text-kelder-600">
            {user.nombre.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink-900">{user.nombreCompleto}</p>
            <p className="truncate text-xs text-ink-400">{user.correo}</p>
          </div>
        </div>
        <button className="mt-1 flex min-h-[44px] w-full items-center gap-3 rounded-2xl px-3 text-sm font-medium text-ink-500 hover:bg-ink-50">
          <LogOut size={18} aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

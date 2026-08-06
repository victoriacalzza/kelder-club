import { NavLink } from "react-router-dom";
import { Home, WalletCards, PercentCircle, Receipt, User } from "lucide-react";

const items = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/vales", label: "Mis Vales", icon: WalletCards },
  { to: "/cashback", label: "Cashback", icon: PercentCircle },
  { to: "/compras", label: "Compras", icon: Receipt },
  { to: "/perfil", label: "Perfil", icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-ink-100 bg-white/95 backdrop-blur">
      <ul className="flex items-stretch justify-between px-1">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex min-h-[64px] flex-col items-center justify-center gap-1 py-2 text-xs font-medium ${
                  isActive ? "text-kelder-600" : "text-ink-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={22} strokeWidth={isActive ? 2.4 : 2} aria-hidden="true" />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

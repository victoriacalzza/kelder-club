import { NavLink, useLocation } from "react-router-dom";
import { Home, Wallet, Store, Sparkles } from "lucide-react";
// Official Kelder "K" (white, isolated). Swap this single import for the brand's dedicated
// white-K asset if/when one is provided — the FAB renders whatever this points to.
import kelderK from "../../assets/logos/kelder-k.png";

/**
 * Mobile bottom navigation (hidden on desktop, where the top nav stays). Inicio · Crédito y
 * Vales · [Pagar] · Tiendas · Mi Club. Product search lives in the header magnifier, not here.
 * The center Pagar FAB is the app's primary action: one tap opens the payment sheet over the
 * current screen. Respects the iOS home indicator via safe-area.
 */
const tabs = [
  { to: "/", label: "Inicio", icon: Home, match: (p: string) => p === "/" },
  {
    to: "/vales",
    label: "Crédito y Vales",
    icon: Wallet,
    match: (p: string) => p.startsWith("/vales") || p.startsWith("/credito") || p.startsWith("/extravales"),
  },
  { to: "/tiendas", label: "Tiendas", icon: Store, match: (p: string) => p.startsWith("/tiendas") || p.startsWith("/tienda/") },
  {
    to: "/club",
    label: "Mi Club",
    icon: Sparkles,
    match: (p: string) =>
      ["/club", "/cashback", "/compras", "/perfil", "/proximamente", "/promociones", "/promocion", "/favoritos", "/mi-visita"].some((r) =>
        p.startsWith(r),
      ),
  },
];

export function BottomNav({ onPagar }: { onPagar: () => void }) {
  const { pathname } = useLocation();
  const [inicio, explorar, tiendas, club] = tabs;

  const Tab = ({ tab }: { tab: (typeof tabs)[number] }) => {
    const active = tab.match(pathname);
    const Icon = tab.icon;
    return (
      <NavLink
        to={tab.to}
        className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-0.5 py-2"
        aria-label={tab.label}
      >
        <Icon size={22} strokeWidth={active ? 2.4 : 2} className={active ? "text-kelder-600" : "text-ink-400"} aria-hidden="true" />
        <span className={`max-w-full truncate text-[10px] font-medium leading-tight ${active ? "text-kelder-600" : "text-ink-500"}`}>{tab.label}</span>
      </NavLink>
    );
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden" aria-label="Navegación principal">
      <div className="relative border-t border-ink-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="relative mx-auto flex h-16 max-w-lg items-stretch">
          <Tab tab={inicio} />
          <Tab tab={explorar} />
          <div className="w-16 shrink-0" aria-hidden="true" />
          <Tab tab={tiendas} />
          <Tab tab={club} />

          {/* Center Pagar FAB — brand identity (Kelder K), elevated primary action. The QR itself
              lives inside the Pagar sheet, not on the button. */}
          <button
            onClick={onPagar}
            aria-label="Mi K — identifícate y paga"
            className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          >
            <span className="lift flex h-14 w-14 items-center justify-center rounded-full bg-kelder-600 shadow-card ring-[6px] ring-cream">
              <img src={kelderK} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
            </span>
          </button>
          <span className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-kelder-700">
            Mi K
          </span>
        </div>
      </div>
    </nav>
  );
}

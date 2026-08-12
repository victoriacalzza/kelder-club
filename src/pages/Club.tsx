import { useNavigate } from "react-router-dom";
import {
  Gift,
  ShoppingBag,
  PercentCircle,
  Bell,
  User,
  Heart,
  Store,
  SlidersHorizontal,
  HelpCircle,
  MessageCircle,
  FileText,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { user } from "@/lib/mock-data";

/**
 * "Mi Club" — the member's personal center: "everything about me, my purchases, benefits and
 * settings." Architecture inspired by a clean app menu (primary tiles on top, tidy lists
 * below) but with Kelder's own premium identity. It never answers "how much credit / how many
 * CrediVales / how do I pay" — those live in the Crédito y Vales tab and the Pagar action —
 * and it doesn't repeat the cashback balance (that's on the Home).
 */
interface Acceso {
  label: string;
  desc: string;
  icon: typeof Gift;
  tint: string;
  to: string;
}
interface Fila {
  label: string;
  desc?: string;
  icon: typeof User;
  to: string;
}

const accesos: Acceso[] = [
  { label: "Beneficios", desc: "Recompensas y promociones", icon: Gift, tint: "bg-warning-100 text-warning-600", to: "/proximamente/beneficios" },
  { label: "Mis compras", desc: "Tickets y pedidos", icon: ShoppingBag, tint: "bg-info-100 text-info-700", to: "/compras" },
  { label: "Mi cashback", desc: "Saldo y movimientos", icon: PercentCircle, tint: "bg-success-100 text-success-600", to: "/cashback" },
  { label: "Notificaciones", desc: "Avisos y novedades", icon: Bell, tint: "bg-kelder-50 text-kelder-600", to: "/proximamente/notificaciones" },
];

const cuenta: Fila[] = [
  { label: "Mis datos", desc: "Información personal", icon: User, to: "/perfil" },
  { label: "Mis favoritos", desc: "Productos que guardaste", icon: Heart, to: "/proximamente/favoritos" },
  { label: "Mi tienda preferida", desc: "Tu sucursal principal", icon: Store, to: "/tiendas" },
  { label: "Preferencias", desc: "Configuración de tu experiencia", icon: SlidersHorizontal, to: "/proximamente/preferencias" },
];

const ayuda: Fila[] = [
  { label: "Centro de ayuda", icon: HelpCircle, to: "/proximamente/ayuda" },
  { label: "Contáctanos", icon: MessageCircle, to: "/proximamente/contacto" },
  { label: "Términos y privacidad", icon: FileText, to: "/proximamente/terminos" },
];

export function Club() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header — compact */}
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">Mi Club</h1>
        <p className="mt-1 text-[15px] text-ink-600">
          Hola, <span className="font-medium text-ink-900">{user.nombre}</span>
        </p>
        <p className="text-sm text-ink-500">Administra tu cuenta, compras y beneficios.</p>
      </header>

      {/* Accesos principales — grid 2x2 */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {accesos.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              onClick={() => navigate(a.to)}
              className="flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-4 text-left shadow-soft transition-shadow hover:shadow-card"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.tint}`} aria-hidden="true">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-ink-900">{a.label}</p>
                <p className="text-xs text-ink-500">{a.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mi cuenta — list */}
      <p className="mb-2 mt-7 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Mi cuenta</p>
      <div className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        {cuenta.map((f) => {
          const Icon = f.icon;
          return (
            <button
              key={f.label}
              onClick={() => navigate(f.to)}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-ink-50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-600" aria-hidden="true">
                <Icon size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium text-ink-900">{f.label}</p>
                {f.desc && <p className="truncate text-sm text-ink-500">{f.desc}</p>}
              </div>
              <ChevronRight size={18} className="shrink-0 text-ink-400" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {/* Ayuda — list */}
      <p className="mb-2 mt-7 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Ayuda</p>
      <div className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        {ayuda.map((f) => {
          const Icon = f.icon;
          return (
            <button
              key={f.label}
              onClick={() => navigate(f.to)}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-ink-50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-600" aria-hidden="true">
                <Icon size={18} />
              </span>
              <p className="min-w-0 flex-1 text-[15px] font-medium text-ink-900">{f.label}</p>
              <ChevronRight size={18} className="shrink-0 text-ink-400" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {/* Cerrar sesión — visible but low-key */}
      <button className="mx-auto mt-7 flex min-h-[44px] items-center justify-center gap-2 text-sm font-medium text-ink-500 hover:text-kelder-600">
        <LogOut size={17} aria-hidden="true" />
        Cerrar sesión
      </button>
    </div>
  );
}

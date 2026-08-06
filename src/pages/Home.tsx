import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PercentCircle,
  WalletCards,
  FileText,
  Search,
  PiggyBank,
  Ticket,
  CalendarClock,
  ChevronRight,
} from "lucide-react";
import { KelderCard } from "@/components/ui/KelderCard";
import { QuickAction } from "@/components/ui/QuickAction";
import { ActivityItem } from "@/components/ui/ActivityItem";
import { QRModal } from "@/components/modals/QRModal";
import { RedeemFlow } from "@/components/modals/RedeemFlow";
import { SearchSheet } from "@/components/modals/SearchSheet";
import { RequestValeSheet } from "@/components/modals/RequestValeSheet";
import { cuenta, actividad, recomendaciones, user, formatMXN } from "@/lib/mock-data";

type ActiveModal = "qr" | "canjear" | "buscar" | "solicitar-vale" | null;

export function Home() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ActiveModal>(null);

  const oportunidades = [
    {
      id: "op1",
      icon: PiggyBank,
      tint: "bg-success-100 text-success-600",
      titulo: `Tienes ${formatMXN(cuenta.cashbackDisponible)} para ahorrar en tu próxima compra`,
      cta: "Usar cashback",
      onClick: () => setModal("canjear"),
    },
    {
      id: "op2",
      icon: Ticket,
      tint: "bg-kelder-50 text-kelder-600",
      titulo: `Tienes ${cuenta.valesActivos} vales listos para usar`,
      cta: "Ver mis vales",
      onClick: () => navigate("/vales"),
    },
    {
      id: "op3",
      icon: CalendarClock,
      tint: "bg-warning-100 text-warning-700",
      titulo: `Tu siguiente pago vence en ${cuenta.proximoPago.enDias} días`,
      extra: formatMXN(cuenta.proximoPago.monto),
      cta: "Ver detalle",
      onClick: () => navigate("/compras"),
    },
  ];

  return (
    <div>
      <header className="mb-6">
        <p className="text-sm text-ink-500">Qué gusto verte de nuevo</p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Hola, {user.nombre} 👋</h1>
      </header>

      {/* Wallet card + oportunidades */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,430px)_1fr]">
        <KelderCard onShowQR={() => setModal("qr")} />

        <section aria-label="Tus oportunidades" className="flex flex-col">
          <h2 className="mb-3 text-lg font-semibold text-ink-900">Tus oportunidades</h2>
          <div className="flex flex-1 flex-col gap-3">
            {oportunidades.map(({ id, icon: Icon, tint, titulo, extra, cta, onClick }) => (
              <button
                key={id}
                onClick={onClick}
                className="lift group flex flex-1 items-center gap-4 rounded-3xl bg-white p-5 text-left shadow-soft hover:shadow-card"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tint}`}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink-900">{titulo}</p>
                  {extra && <p className="mt-0.5 text-2xl font-semibold text-ink-900">{extra}</p>}
                  <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-kelder-600">
                    {cta}
                    <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Acciones rápidas */}
      <section className="mt-8" aria-label="Acciones rápidas">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">¿Qué quieres hacer?</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickAction tint="green" icon={<PercentCircle size={22} aria-hidden="true" />} label="Usar cashback" subtitle="Págalo en línea o en caja" onClick={() => setModal("canjear")} />
          <QuickAction tint="kelder" icon={<WalletCards size={22} aria-hidden="true" />} label="Mis vales" subtitle="Vales y CrediVales" onClick={() => navigate("/vales")} />
          <QuickAction tint="amber" icon={<FileText size={22} aria-hidden="true" />} label="Solicitar vale" subtitle="Para tu próxima compra" onClick={() => setModal("solicitar-vale")} />
          <QuickAction tint="info" icon={<Search size={22} aria-hidden="true" />} label="Buscar producto" subtitle="En todo el grupo" onClick={() => setModal("buscar")} />
        </div>
      </section>

      {/* Actividad + recomendaciones */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2" aria-label="Tu actividad">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink-900">Tu actividad</h2>
            <button onClick={() => navigate("/compras")} className="text-sm font-semibold text-kelder-600">
              Ver todo
            </button>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
            <ul className="relative">
              {actividad.map((item, i) => (
                <ActivityItem key={item.id} item={item} last={i === actividad.length - 1} />
              ))}
            </ul>
          </div>
        </section>

        <section aria-label="Recomendaciones para ti">
          <h2 className="mb-3 text-lg font-semibold text-ink-900">Elegido para ti</h2>
          <div className="rounded-3xl bg-white p-3 shadow-soft">
            <ul className="divide-y divide-ink-100">
              {recomendaciones.map((p) => (
                <li key={p.id}>
                  <button className="lift flex w-full items-center gap-3 rounded-2xl p-2 text-left hover:bg-ink-50">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-[10px] text-ink-300">
                      {p.marca}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink-900">{p.marca}</span>
                      <span className="block truncate text-sm text-ink-500">{p.modelo}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-ink-900">{formatMXN(p.precio)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {modal === "qr" && <QRModal onClose={() => setModal(null)} />}
      {modal === "canjear" && <RedeemFlow onClose={() => setModal(null)} />}
      {modal === "buscar" && <SearchSheet onClose={() => setModal(null)} />}
      {modal === "solicitar-vale" && <RequestValeSheet onClose={() => setModal(null)} />}
    </div>
  );
}

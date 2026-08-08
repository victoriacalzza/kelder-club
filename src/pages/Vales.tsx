import { useNavigate } from "react-router-dom";
import { WalletCards } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { ValeCard } from "@/components/ui/ValeCard";
import { Button } from "@/components/ui/Button";
import { vales as valesDefault, cuenta, formatMXN, type Vale } from "@/lib/mock-data";

export function Vales({ vales = valesDefault }: { vales?: Vale[] }) {
  const navigate = useNavigate();

  if (vales.length === 0) {
    return (
      <div>
        <TopBar title="Mis Vales" subtitle="Vales y CrediVales digitales para tus compras." />
        <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 rounded-3xl bg-white p-10 text-center shadow-soft">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-50 text-ink-400">
            <WalletCards size={26} aria-hidden="true" />
          </span>
          <p className="font-medium text-ink-900">Todavía no tienes vales</p>
          <p className="text-sm text-ink-500">
            Cuando recibas un vale o CrediVale digital, aparecerá aquí listo para usarse en caja o en línea.
          </p>
          <Button className="mt-2" onClick={() => navigate("/")}>
            Solicitar un vale
          </Button>
        </div>
      </div>
    );
  }

  const activos = vales.filter((v) => v.estado === "activo" || v.estado === "por_vencer");
  const pasados = vales.filter((v) => v.estado === "usado" || v.estado === "vencido");

  const { saldoPendiente, proximoPago } = cuenta.credito;

  return (
    <div>
      <TopBar title="Mis Vales" subtitle="Tu Crédito Kelder y los vales asociados." />

      {/* Credit summary — answers "cuánto debo, cuánto sigue, cuándo" at a glance */}
      <div className="mb-8 rounded-2xl border border-ink-100 bg-white p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Crédito Kelder</p>
        <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <p className="text-sm text-ink-500">Saldo pendiente total</p>
            <p className="mt-0.5 text-4xl font-semibold tracking-tight text-ink-900">{formatMXN(saldoPendiente)}</p>
          </div>
          <div className="sm:border-l sm:border-ink-100 sm:pl-5">
            <p className="text-sm text-ink-500">Próximo pago</p>
            <p className="mt-0.5 text-2xl font-semibold text-ink-900">{formatMXN(proximoPago.monto)}</p>
          </div>
          <div className="sm:border-l sm:border-ink-100 sm:pl-5">
            <p className="text-sm text-ink-500">Fecha próxima</p>
            <p className="mt-0.5 text-2xl font-semibold text-ink-900">{proximoPago.fecha}</p>
            <p className="text-sm text-ink-500">en {proximoPago.enDias} días</p>
          </div>
        </div>
      </div>

      {activos.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium text-ink-500">Disponibles</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {activos.map((v) => (
              <ValeCard key={v.id} vale={v} onClick={() => navigate(`/vales/${v.id}`)} />
            ))}
          </div>
        </section>
      )}

      {pasados.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-ink-500">Historial</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pasados.map((v) => (
              <ValeCard key={v.id} vale={v} onClick={() => navigate(`/vales/${v.id}`)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

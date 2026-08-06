import { useState } from "react";
import { QrCode, PercentCircle, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QRModal } from "@/components/modals/QRModal";
import { RedeemFlow } from "@/components/modals/RedeemFlow";
import { cuenta, movimientosCashback, formatMXN } from "@/lib/mock-data";

export function Cashback() {
  const [modal, setModal] = useState<"qr" | "canjear" | null>(null);

  return (
    <div>
      <TopBar title="Cashback" subtitle="El cashback que generas en cada compra del grupo." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Saldo + acciones */}
        <div className="lg:sticky lg:top-10 lg:self-start">
          <Card className="lg:p-6">
            <p className="text-sm text-ink-500">Saldo disponible</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-ink-900">{formatMXN(cuenta.cashbackDisponible)}</p>
            <div className="mt-5 space-y-3">
              <Button fullWidth icon={<QrCode size={18} aria-hidden="true" />} onClick={() => setModal("qr")}>
                Mostrar QR
              </Button>
              <Button fullWidth variant="secondary" icon={<PercentCircle size={18} aria-hidden="true" />} onClick={() => setModal("canjear")}>
                Canjear en línea
              </Button>
            </div>
          </Card>
        </div>

        {/* Historial */}
        <section className="lg:col-span-2" aria-label="Historial de cashback">
          <h2 className="mb-3 text-lg font-semibold text-ink-900">Historial</h2>
          <Card className="divide-y divide-ink-100 p-0">
            {movimientosCashback.map((m) => (
              <div key={m.id} className="flex items-center gap-4 px-5 py-4 first:pt-5 last:pb-5">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    m.tipo === "ingreso" ? "bg-success-100 text-success-600" : "bg-ink-50 text-ink-500"
                  }`}
                >
                  {m.tipo === "ingreso" ? <ArrowDownLeft size={18} aria-hidden="true" /> : <ArrowUpRight size={18} aria-hidden="true" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink-900">{m.tienda}</p>
                  <p className="text-sm text-ink-500">{m.tipo === "ingreso" ? "Cashback generado" : "Canje aplicado"} · {m.fecha}</p>
                </div>
                <span className={`shrink-0 text-sm font-semibold ${m.tipo === "ingreso" ? "text-success-600" : "text-ink-500"}`}>
                  {m.tipo === "ingreso" ? "+" : "-"}
                  {formatMXN(m.monto)}
                </span>
              </div>
            ))}
          </Card>
        </section>
      </div>

      {modal === "qr" && <QRModal onClose={() => setModal(null)} />}
      {modal === "canjear" && <RedeemFlow onClose={() => setModal(null)} />}
    </div>
  );
}

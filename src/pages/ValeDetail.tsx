import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, CreditCard, Ticket, QrCode, Calendar, Store } from "lucide-react";
import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/Button";
import { vales, formatMXN, type Vale } from "@/lib/mock-data";

export function ValeDetail({ vale: valeProp }: { vale?: Vale }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const vale = valeProp ?? vales.find((v) => v.id === id) ?? vales[0];
  const isCredivale = vale.tipo === "credivale";
  const canUse = vale.estado === "activo" || vale.estado === "por_vencer";

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={() => navigate("/vales")}
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl pr-3 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Mis Vales
      </button>

      <div className={`rounded-3xl p-7 shadow-card ${isCredivale ? "bg-ink-950 text-white" : "bg-white text-ink-900"}`}>
        <div className="flex items-start justify-between">
          <span className={`flex h-12 w-12 items-center justify-center rounded-full ${isCredivale ? "bg-white/10" : "bg-kelder-50 text-kelder-600"}`}>
            {isCredivale ? <CreditCard size={24} aria-hidden="true" /> : <Ticket size={24} aria-hidden="true" />}
          </span>
          <StatusPill estado={vale.estado} />
        </div>
        <p className="mt-6 text-5xl font-semibold">{formatMXN(vale.monto)}</p>
        <p className={`mt-1 text-sm ${isCredivale ? "text-white/60" : "text-ink-500"}`}>
          {isCredivale ? "CrediVale digital" : "Vale de compra"} · {vale.mayorista}
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Store, label: "Mayorista", value: vale.mayorista },
          { icon: Calendar, label: "Emisión", value: vale.fechaEmision },
          { icon: Calendar, label: "Vigente hasta", value: vale.fechaVigencia },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl bg-white p-4 shadow-soft">
            <Icon size={18} className="text-ink-400" aria-hidden="true" />
            <p className="mt-2 text-sm text-ink-500">{label}</p>
            <p className="font-medium text-ink-900">{value}</p>
          </div>
        ))}
      </div>

      {canUse && (
        <Button icon={<QrCode size={18} aria-hidden="true" />} className="mt-6">
          Usar en caja
        </Button>
      )}

      <p className="mt-4 text-sm text-ink-500">
        Presenta este vale en caja o úsalo en línea con el correo asociado a tu cuenta Kelder Club. Un solo uso, no reembolsable.
      </p>
    </div>
  );
}

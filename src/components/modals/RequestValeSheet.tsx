import { useState } from "react";
import { Check } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { tiendasEnLinea } from "@/lib/mock-data";

export function RequestValeSheet({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [mayorista, setMayorista] = useState(tiendasEnLinea[0].id);
  const [monto, setMonto] = useState(500);

  if (sent) {
    return (
      <Sheet title="Solicitud enviada" onClose={onClose}>
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-100 text-success-600">
            <Check size={28} aria-hidden="true" />
          </span>
          <p className="text-ink-900">Tu solicitud de vale está en revisión. Te avisamos en cuanto esté disponible en Mis Vales.</p>
          <Button fullWidth onClick={onClose} className="mt-2">
            Entendido
          </Button>
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet title="Solicitar vale" description="Pide un vale nuevo para tu próxima compra." onClose={onClose}>
      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-900">Mayorista</span>
          <select
            value={mayorista}
            onChange={(e) => setMayorista(e.target.value)}
            className="h-12 w-full rounded-2xl border border-ink-200 px-4 text-base"
          >
            {tiendasEnLinea.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-900">Monto solicitado</span>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
            className="h-12 w-full rounded-2xl border border-ink-200 px-4 text-base"
          />
        </label>
        <Button fullWidth onClick={() => setSent(true)}>
          Enviar solicitud
        </Button>
      </div>
    </Sheet>
  );
}

import { useState } from "react";
import { Check } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { cuenta, tiendasEnLinea, user, formatMXN } from "@/lib/mock-data";

type Step = "tienda" | "monto" | "confirmar" | "listo";

const steps: { key: Step; label: string }[] = [
  { key: "tienda", label: "Tienda" },
  { key: "monto", label: "Monto" },
  { key: "confirmar", label: "Confirmar" },
];

export function RedeemFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("tienda");
  const [tiendaId, setTiendaId] = useState<string>(tiendasEnLinea[1].id);
  const [monto, setMonto] = useState(cuenta.cashbackDisponible);

  const tienda = tiendasEnLinea.find((t) => t.id === tiendaId)!;
  const stepIndex = steps.findIndex((s) => s.key === step);

  if (step === "listo") {
    return (
      <Sheet title="Cupón generado" onClose={onClose}>
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-100 text-success-600">
            <Check size={28} aria-hidden="true" />
          </span>
          <p className="text-ink-900">
            Enviamos un cupón de <strong>{formatMXN(monto)}</strong> a tu correo para usarlo en{" "}
            <strong>{tienda.dominio}</strong>.
          </p>
          <Button fullWidth onClick={onClose} className="mt-2">
            Entendido
          </Button>
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet title="Canjear cashback" description="Convierte tu cashback en un cupón para tiendas en línea del grupo." onClose={onClose}>
      <ol className="mb-6 flex items-center gap-2 text-sm font-medium text-ink-400">
        {steps.map((s, i) => (
          <li key={s.key} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                i < stepIndex ? "bg-success-600 text-white" : i === stepIndex ? "bg-kelder-600 text-white" : "bg-ink-100 text-ink-400"
              }`}
            >
              {i < stepIndex ? <Check size={13} aria-hidden="true" /> : i + 1}
            </span>
            <span className={i === stepIndex ? "text-ink-900" : ""}>{s.label}</span>
            {i < steps.length - 1 && <span className="h-px w-4 bg-ink-200" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      {step === "tienda" && (
        <div className="space-y-3">
          <p className="text-sm text-ink-500">Elige dónde usarás tu cupón. Solo será válido en esa tienda.</p>
          <div className="space-y-2">
            {tiendasEnLinea.map((t) => (
              <label
                key={t.id}
                className={`flex min-h-[56px] cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 ${
                  tiendaId === t.id ? "border-kelder-600 bg-kelder-50" : "border-ink-200"
                }`}
              >
                <span>
                  <span className="block font-medium text-ink-900">{t.nombre}</span>
                  <span className="block text-sm text-ink-500">{t.dominio}</span>
                </span>
                <input
                  type="radio"
                  name="tienda"
                  checked={tiendaId === t.id}
                  onChange={() => setTiendaId(t.id)}
                  className="h-5 w-5 accent-[var(--color-kelder-600)]"
                />
              </label>
            ))}
          </div>
          <Button fullWidth className="mt-2" onClick={() => setStep("monto")}>
            Continuar
          </Button>
        </div>
      )}

      {step === "monto" && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-kelder-50 px-4 py-3 text-sm text-kelder-800">
            Saldo disponible: <strong>{formatMXN(cuenta.cashbackDisponible)}</strong> · 1 punto = 1 peso (MXN)
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-900">Monto a canjear</span>
            <input
              type="number"
              value={monto}
              max={cuenta.cashbackDisponible}
              onChange={(e) => setMonto(Math.min(Number(e.target.value), cuenta.cashbackDisponible))}
              className="h-12 w-full rounded-2xl border border-ink-200 px-4 text-base"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-900">Correo de tu cuenta en la tienda</span>
            <input
              type="email"
              defaultValue={user.correo}
              readOnly
              className="h-12 w-full rounded-2xl border border-ink-200 bg-ink-50 px-4 text-base text-ink-500"
            />
            <span className="mt-1.5 block text-sm text-ink-500">El cupón queda ligado a este correo.</span>
          </label>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep("tienda")}>
              Atrás
            </Button>
            <Button fullWidth onClick={() => setStep("confirmar")}>
              Continuar
            </Button>
          </div>
        </div>
      )}

      {step === "confirmar" && (
        <div className="space-y-4">
          <div className="divide-y divide-ink-100 rounded-2xl border border-ink-200">
            {[
              ["Tienda", tienda.nombre],
              ["Puntos a canjear", `${monto} puntos`],
              ["Valor del cupón", formatMXN(monto)],
              ["Correo", user.correo],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-ink-500">{label}</span>
                <span className="text-sm font-medium text-ink-900">{value}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-ink-50 p-4 text-sm text-ink-500">
            <p className="mb-1 font-medium text-ink-900">Condiciones del canje</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>El cupón es de un solo uso y no es reembolsable.</li>
              <li>Solo funciona en {tienda.dominio} con el correo indicado.</li>
              <li>Los puntos canjeados se descontarán de tu saldo.</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep("monto")}>
              Atrás
            </Button>
            <Button fullWidth onClick={() => setStep("listo")}>
              Canjear puntos
            </Button>
          </div>
        </div>
      )}
    </Sheet>
  );
}

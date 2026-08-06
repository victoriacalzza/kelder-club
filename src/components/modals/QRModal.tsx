import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";

const QR_SECONDS = 30 * 60;

function formatCountdown(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function QRModal({ onClose }: { onClose: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState(QR_SECONDS);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Sheet
      title="Muestra tu código"
      description="Preséntalo en caja antes de pagar para usar tu cashback."
      onClose={onClose}
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-ink-50 p-6">
        <div className="flex h-44 w-44 items-center justify-center rounded-2xl bg-white p-3 shadow-soft">
          <svg viewBox="0 0 110 110" className="h-full w-full text-ink-900" aria-hidden="true">
            {[
              [0, 0],
              [82, 0],
              [0, 82],
            ].map(([cx, cy]) => (
              <g key={`${cx}-${cy}`}>
                <rect x={cx} y={cy} width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x={cx + 10} y={cy + 10} width="8" height="8" fill="currentColor" />
              </g>
            ))}
            {Array.from({ length: 11 }).map((_, row) =>
              Array.from({ length: 11 }).map((_, col) => {
                const inCorner = (row < 4 && col < 4) || (row < 4 && col > 6) || (row > 6 && col < 4);
                if (inCorner) return null;
                const on = (row * 7 + col * 13 + row * col) % 5 < 2;
                return on ? (
                  <rect key={`${row}-${col}`} x={col * 10} y={row * 10} width="8" height="8" fill="currentColor" />
                ) : null;
              }),
            )}
          </svg>
        </div>
        <p className="text-sm font-medium text-ink-500">Código: 167 087 0163</p>
        <div className="flex items-center gap-2 text-sm text-ink-500">
          <span>Vigencia {formatCountdown(secondsLeft)}</span>
          <span aria-hidden="true">·</span>
          <span>se renueva automáticamente</span>
        </div>
      </div>
      <Button
        variant="secondary"
        fullWidth
        icon={<RefreshCw size={18} aria-hidden="true" />}
        className="mt-4"
        onClick={() => setSecondsLeft(QR_SECONDS)}
      >
        Renovar código
      </Button>
    </Sheet>
  );
}

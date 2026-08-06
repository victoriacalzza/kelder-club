import { useState } from "react";
import { Search } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";

export function SearchSheet({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  return (
    <Sheet title="Buscar producto" description="Busca por descripción o código de artículo." onClose={onClose}>
      <label className="relative block">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej. tenis blancos para niño"
          className="h-12 w-full rounded-2xl border border-ink-200 pl-11 pr-4 text-base"
        />
      </label>
      <Button fullWidth className="mt-4" disabled={query.trim().length === 0}>
        Buscar
      </Button>
    </Sheet>
  );
}

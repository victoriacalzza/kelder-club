import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { CompraDetalle } from "@/pages/CompraDetalle";
import { compras } from "@/lib/mock-data";

export default function CompraDetalleStoryboard() {
  return (
    <MemoryRouter initialEntries={["/compras/c1"]}>
      <AppShell>
        <CompraDetalle compra={compras[0]} />
      </AppShell>
    </MemoryRouter>
  );
}

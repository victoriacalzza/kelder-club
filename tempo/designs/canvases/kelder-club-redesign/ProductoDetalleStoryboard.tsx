import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ProductoDetalle } from "@/pages/ProductoDetalle";
import { catalogo } from "@/lib/mock-data";

export default function ProductoDetalleStoryboard() {
  return (
    <MemoryRouter initialEntries={["/producto/p5"]}>
      <AppShell>
        <ProductoDetalle producto={catalogo[4]} />
      </AppShell>
    </MemoryRouter>
  );
}

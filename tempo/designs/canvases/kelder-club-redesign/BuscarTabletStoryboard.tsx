import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Buscar } from "@/pages/Buscar";

export default function BuscarTabletStoryboard() {
  return (
    <MemoryRouter initialEntries={["/buscar"]}>
      <AppShell>
        <Buscar initialQuery="tenis blancos" initialSubmitted initialFiltros={{ marcas: ["Nike", "Adidas"] }} />
      </AppShell>
    </MemoryRouter>
  );
}

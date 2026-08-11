import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Buscar } from "@/pages/Buscar";

export default function BuscarDrawerStoryboard() {
  return (
    <MemoryRouter initialEntries={["/buscar"]}>
      <AppShell>
        <Buscar
          initialQuery="tenis blancos"
          initialSubmitted
          initialDrawer
          initialFiltros={{ departamento: "Mujer", tipo: "Calzado", tallas: ["24"] }}
        />
      </AppShell>
    </MemoryRouter>
  );
}

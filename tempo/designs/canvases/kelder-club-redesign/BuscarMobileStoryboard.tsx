import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Buscar } from "@/pages/Buscar";

export default function BuscarMobileStoryboard() {
  return (
    <MemoryRouter initialEntries={["/buscar"]}>
      <AppShell>
        <Buscar
          initialQuery="tenis blancos"
          initialSubmitted
          initialFiltros={{ departamento: "Mujer", marcas: ["Nike"], tallas: ["24"] }}
        />
      </AppShell>
    </MemoryRouter>
  );
}

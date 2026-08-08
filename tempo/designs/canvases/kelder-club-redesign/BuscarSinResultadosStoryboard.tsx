import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Buscar } from "@/pages/Buscar";

export default function BuscarSinResultadosStoryboard() {
  return (
    <MemoryRouter initialEntries={["/buscar"]}>
      <AppShell>
        <Buscar initialQuery="bolsa de mano" initialSubmitted />
      </AppShell>
    </MemoryRouter>
  );
}

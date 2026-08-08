import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Buscar } from "@/pages/Buscar";

export default function BuscarTextoStoryboard() {
  return (
    <MemoryRouter initialEntries={["/buscar"]}>
      <AppShell>
        <Buscar initialModo="texto" />
      </AppShell>
    </MemoryRouter>
  );
}

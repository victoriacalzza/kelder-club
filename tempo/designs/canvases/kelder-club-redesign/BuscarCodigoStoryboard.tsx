import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Buscar } from "@/pages/Buscar";

export default function BuscarCodigoStoryboard() {
  return (
    <MemoryRouter initialEntries={["/buscar"]}>
      <AppShell>
        <Buscar initialModo="codigo" />
      </AppShell>
    </MemoryRouter>
  );
}

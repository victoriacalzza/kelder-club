import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Buscar } from "@/pages/Buscar";

export default function BuscarFotoStoryboard() {
  return (
    <MemoryRouter initialEntries={["/buscar"]}>
      <AppShell>
        <Buscar initialModo="foto" />
      </AppShell>
    </MemoryRouter>
  );
}

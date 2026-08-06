import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Perfil } from "@/pages/Perfil";

export default function PerfilStoryboard() {
  return (
    <MemoryRouter initialEntries={["/perfil"]}>
      <AppShell>
        <Perfil />
      </AppShell>
    </MemoryRouter>
  );
}

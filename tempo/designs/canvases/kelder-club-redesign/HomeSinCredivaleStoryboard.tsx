import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Home } from "@/pages/Home";

export default function HomeSinCredivaleStoryboard() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <AppShell>
        <Home profile={{ cashback: 245, credito: "no_miembro", pedidoEnCurso: false }} />
      </AppShell>
    </MemoryRouter>
  );
}

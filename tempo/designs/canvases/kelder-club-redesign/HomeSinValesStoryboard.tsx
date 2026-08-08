import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Home } from "@/pages/Home";

export default function HomeSinValesStoryboard() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <AppShell>
        <Home profile={{ cashback: 245, credito: "sin_vales", pedidoEnCurso: false }} />
      </AppShell>
    </MemoryRouter>
  );
}

import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Tiendas } from "@/pages/Tiendas";

export default function TiendasStoryboard() {
  return (
    <MemoryRouter initialEntries={["/tiendas"]}>
      <AppShell>
        <Tiendas />
      </AppShell>
    </MemoryRouter>
  );
}

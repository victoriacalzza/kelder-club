import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Compras } from "@/pages/Compras";

export default function ComprasStoryboard() {
  return (
    <MemoryRouter initialEntries={["/compras"]}>
      <AppShell>
        <Compras />
      </AppShell>
    </MemoryRouter>
  );
}

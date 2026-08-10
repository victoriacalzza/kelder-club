import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Vales } from "@/pages/Vales";

// Scenario D — no Crédito Kelder and no vales (both empty states).
export default function ValesVaciosStoryboard() {
  return (
    <MemoryRouter initialEntries={["/vales"]}>
      <AppShell>
        <Vales vales={[]} tieneCredito={false} />
      </AppShell>
    </MemoryRouter>
  );
}

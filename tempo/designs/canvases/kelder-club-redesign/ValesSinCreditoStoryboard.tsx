import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Vales } from "@/pages/Vales";

// Scenario C — no Crédito Kelder, but has vales.
export default function ValesSinCreditoStoryboard() {
  return (
    <MemoryRouter initialEntries={["/vales"]}>
      <AppShell>
        <Vales tieneCredito={false} />
      </AppShell>
    </MemoryRouter>
  );
}

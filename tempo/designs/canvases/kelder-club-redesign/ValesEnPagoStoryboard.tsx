import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Vales } from "@/pages/Vales";

export default function ValesEnPagoStoryboard() {
  return (
    <MemoryRouter initialEntries={["/vales"]}>
      <AppShell>
        <Vales initialTab="en_pago" />
      </AppShell>
    </MemoryRouter>
  );
}

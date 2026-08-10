import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { CreditoDetalle } from "@/pages/CreditoDetalle";

export default function CreditoDetalleStoryboard() {
  return (
    <MemoryRouter initialEntries={["/credito"]}>
      <AppShell>
        <CreditoDetalle />
      </AppShell>
    </MemoryRouter>
  );
}

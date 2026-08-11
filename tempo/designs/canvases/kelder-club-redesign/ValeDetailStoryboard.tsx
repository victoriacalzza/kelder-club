import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ValeDetail } from "@/pages/ValeDetail";
import { vales } from "@/lib/mock-data";

export default function ValeDetailStoryboard() {
  const enPago = vales.find((v) => v.estado === "en_pago") ?? vales[0];
  return (
    <MemoryRouter initialEntries={[`/vales/${enPago.id}`]}>
      <AppShell>
        <ValeDetail vale={enPago} />
      </AppShell>
    </MemoryRouter>
  );
}

import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ValeDetail } from "@/pages/ValeDetail";
import { valePorId } from "@/lib/mock-data";

export default function ExtravaleDetalleStoryboard() {
  const extravale = valePorId("ev1");
  return (
    <MemoryRouter initialEntries={["/vales/ev1"]}>
      <AppShell>
        <ValeDetail vale={extravale} />
      </AppShell>
    </MemoryRouter>
  );
}

import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ValeDetail } from "@/pages/ValeDetail";
import { vales } from "@/lib/mock-data";

export default function ValeDetailStoryboard() {
  return (
    <MemoryRouter initialEntries={["/vales/v1"]}>
      <AppShell>
        <ValeDetail vale={vales[0]} />
      </AppShell>
    </MemoryRouter>
  );
}

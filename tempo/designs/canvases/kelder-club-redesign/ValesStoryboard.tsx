import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Vales } from "@/pages/Vales";

export default function ValesStoryboard() {
  return (
    <MemoryRouter initialEntries={["/vales"]}>
      <AppShell>
        <Vales />
      </AppShell>
    </MemoryRouter>
  );
}

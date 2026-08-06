import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Cashback } from "@/pages/Cashback";

export default function CashbackStoryboard() {
  return (
    <MemoryRouter initialEntries={["/cashback"]}>
      <AppShell>
        <Cashback />
      </AppShell>
    </MemoryRouter>
  );
}

import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { CreditoKelderCard } from "@/components/ui/CreditoKelderCard";

export default function CreditoKelderInvitacionMobileStoryboard() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <AppShell>
        <div className="py-4">
          <CreditoKelderCard />
        </div>
      </AppShell>
    </MemoryRouter>
  );
}

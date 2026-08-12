import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Club } from "@/pages/Club";

export default function MobileClubStoryboard() {
  return (
    <MemoryRouter initialEntries={["/club"]}>
      <AppShell>
        <Club />
      </AppShell>
    </MemoryRouter>
  );
}

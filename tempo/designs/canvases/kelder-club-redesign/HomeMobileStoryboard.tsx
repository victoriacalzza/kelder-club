import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Home } from "@/pages/Home";

export default function HomeMobileStoryboard() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <AppShell>
        <Home />
      </AppShell>
    </MemoryRouter>
  );
}

import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { AprovechaCashback } from "@/pages/AprovechaCashback";

export default function MobileCatalogoCashbackStoryboard() {
  return (
    <MemoryRouter initialEntries={["/aprovecha-cashback"]}>
      <AppShell>
        <Routes>
          <Route path="/aprovecha-cashback" element={<AprovechaCashback />} />
        </Routes>
      </AppShell>
    </MemoryRouter>
  );
}

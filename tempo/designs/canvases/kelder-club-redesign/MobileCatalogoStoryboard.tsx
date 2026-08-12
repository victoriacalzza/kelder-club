import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Catalogo } from "@/pages/Catalogo";

export default function MobileCatalogoStoryboard() {
  return (
    <MemoryRouter initialEntries={["/catalogo"]}>
      <AppShell>
        <Routes>
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
      </AppShell>
    </MemoryRouter>
  );
}

import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Promociones } from "@/pages/Promociones";

export default function MobilePromocionesStoryboard() {
  return (
    <MemoryRouter initialEntries={["/promociones"]}>
      <AppShell>
        <Routes>
          <Route path="/promociones" element={<Promociones />} />
        </Routes>
      </AppShell>
    </MemoryRouter>
  );
}

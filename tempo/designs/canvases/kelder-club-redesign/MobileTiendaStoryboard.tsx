import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { TiendaDetalle } from "@/pages/TiendaDetalle";

export default function MobileTiendaStoryboard() {
  return (
    <MemoryRouter initialEntries={["/tienda/t1"]}>
      <AppShell>
        <Routes>
          <Route path="/tienda/:id" element={<TiendaDetalle />} />
        </Routes>
      </AppShell>
    </MemoryRouter>
  );
}

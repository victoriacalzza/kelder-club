import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Catalogo } from "@/pages/Catalogo";

export default function MobileCatalogoCashbackStoryboard() {
  return (
    <MemoryRouter initialEntries={[{ pathname: "/catalogo", search: "?contexto=cashback" }]}>
      <AppShell>
        <Routes>
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
      </AppShell>
    </MemoryRouter>
  );
}

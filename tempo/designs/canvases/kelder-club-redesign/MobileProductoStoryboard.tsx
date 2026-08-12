import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ProductoDetalle } from "@/pages/ProductoDetalle";

export default function MobileProductoStoryboard() {
  return (
    <MemoryRouter initialEntries={["/producto/p7"]}>
      <AppShell>
        <Routes>
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Routes>
      </AppShell>
    </MemoryRouter>
  );
}

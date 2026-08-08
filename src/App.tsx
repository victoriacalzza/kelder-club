import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Home } from "@/pages/Home";
import { Vales } from "@/pages/Vales";
import { ValeDetail } from "@/pages/ValeDetail";
import { Cashback } from "@/pages/Cashback";
import { Compras } from "@/pages/Compras";
import { Tiendas } from "@/pages/Tiendas";
import { Perfil } from "@/pages/Perfil";
import { Buscar } from "@/pages/Buscar";
import { ProductoDetalle } from "@/pages/ProductoDetalle";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vales" element={<Vales />} />
          <Route path="/vales/:id" element={<ValeDetail />} />
          <Route path="/cashback" element={<Cashback />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/tiendas" element={<Tiendas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

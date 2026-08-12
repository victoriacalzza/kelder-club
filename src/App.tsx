import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { NativeBackButton } from "@/components/system/NativeBackButton";
import { ClubProvider } from "@/lib/ClubContext";
import { Home } from "@/pages/Home";
import { Vales } from "@/pages/Vales";
import { ValeDetail } from "@/pages/ValeDetail";
import { CreditoDetalle } from "@/pages/CreditoDetalle";
import { Cashback } from "@/pages/Cashback";
import { Compras } from "@/pages/Compras";
import { CompraDetalle } from "@/pages/CompraDetalle";
import { Tiendas } from "@/pages/Tiendas";
import { TiendaDetalle } from "@/pages/TiendaDetalle";
import { Perfil } from "@/pages/Perfil";
import { Club } from "@/pages/Club";
import { Proximamente } from "@/pages/Proximamente";
import { Buscar } from "@/pages/Buscar";
import { Catalogo } from "@/pages/Catalogo";
import { ProductoDetalle } from "@/pages/ProductoDetalle";
import { Promociones } from "@/pages/Promociones";
import { PromocionDetalle } from "@/pages/PromocionDetalle";
import { Favoritos } from "@/pages/Favoritos";
import { MiVisita } from "@/pages/MiVisita";
import { Notificaciones } from "@/pages/Notificaciones";

export default function App() {
  return (
    <BrowserRouter>
      <ClubProvider>
        <NativeBackButton />
        <AppShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vales" element={<Vales />} />
            <Route path="/vales/:id" element={<ValeDetail />} />
            <Route path="/credito" element={<CreditoDetalle />} />
            <Route path="/cashback" element={<Cashback />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/compras/:id" element={<CompraDetalle />} />
            <Route path="/tiendas" element={<Tiendas />} />
            <Route path="/tienda/:id" element={<TiendaDetalle />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/club" element={<Club />} />
            <Route path="/proximamente/:slug" element={<Proximamente />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/promociones" element={<Promociones />} />
            <Route path="/promocion/:id" element={<PromocionDetalle />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/mi-visita" element={<MiVisita />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
          </Routes>
        </AppShell>
      </ClubProvider>
    </BrowserRouter>
  );
}

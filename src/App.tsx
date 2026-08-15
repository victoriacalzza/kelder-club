import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { NativeBackButton } from "@/components/system/NativeBackButton";
import { ClubProvider } from "@/lib/ClubContext";
import { Landing } from "@/pages/Landing";
import { Home } from "@/pages/Home";
import { Vales } from "@/pages/Vales";
import { Extravales } from "@/pages/Extravales";
import { ValeDetail } from "@/pages/ValeDetail";
import { CreditoDetalle } from "@/pages/CreditoDetalle";
import { Cashback } from "@/pages/Cashback";
import { Compras } from "@/pages/Compras";
import { CompraDetalle } from "@/pages/CompraDetalle";
import { Tiendas } from "@/pages/Tiendas";
import { TiendaDetalle } from "@/pages/TiendaDetalle";
import { Perfil } from "@/pages/Perfil";
import { ConfigurarTallas } from "@/pages/ConfigurarTallas";
import { Club } from "@/pages/Club";
import { Proximamente } from "@/pages/Proximamente";
import { Buscar } from "@/pages/Buscar";
import { Catalogo } from "@/pages/Catalogo";
import { AprovechaCashback } from "@/pages/AprovechaCashback";
import { ProductoDetalle } from "@/pages/ProductoDetalle";
import { Promociones } from "@/pages/Promociones";
import { PromocionDetalle } from "@/pages/PromocionDetalle";
import { Favoritos } from "@/pages/Favoritos";
import { MiVisita } from "@/pages/MiVisita";
import { Notificaciones } from "@/pages/Notificaciones";

// Redeploy trigger (no-op) — force Vercel to build latest main.
export default function App() {
  return (
    <BrowserRouter>
      <ClubProvider>
        <NativeBackButton />
        <Routes>
          {/* Public marketing entry — lives OUTSIDE the app shell (its own header/footer) */}
          <Route path="/landing" element={<Landing />} />

          {/* The loyalty app (bottom nav / top nav shell) */}
          <Route
            path="*"
            element={
              <AppShell>
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* Temporary: real auth/registro comes later; for now entering goes to the app */}
                  <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/vales" element={<Vales />} />
            <Route path="/extravales" element={<Extravales />} />
            <Route path="/vales/:id" element={<ValeDetail />} />
            <Route path="/credito" element={<CreditoDetalle />} />
            <Route path="/cashback" element={<Cashback />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/compras/:id" element={<CompraDetalle />} />
            <Route path="/tiendas" element={<Tiendas />} />
            <Route path="/tienda/:id" element={<TiendaDetalle />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/configurar-tallas" element={<ConfigurarTallas />} />
            <Route path="/club" element={<Club />} />
            <Route path="/proximamente/:slug" element={<Proximamente />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/aprovecha-cashback" element={<AprovechaCashback />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/promociones" element={<Promociones />} />
            <Route path="/promocion/:id" element={<PromocionDetalle />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/mi-visita" element={<MiVisita />} />
                  <Route path="/notificaciones" element={<Notificaciones />} />
                </Routes>
              </AppShell>
            }
          />
        </Routes>
      </ClubProvider>
    </BrowserRouter>
  );
}

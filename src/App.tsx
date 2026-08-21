import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { NativeBackButton } from "@/components/system/NativeBackButton";
import { ClubProvider } from "@/lib/ClubContext";
import { Landing } from "@/pages/Landing";
import { Login } from "@/pages/Login";
import { Registro } from "@/pages/Registro";
import { isLoggedIn } from "@/lib/auth";
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

/**
 * Acceso — pantalla de Login (fuera del AppShell). Si ya hay sesión, entra directo al Home
 * sin volver a pedir credenciales. La verificación corre al renderizar la ruta (reactiva a la
 * navegación), no una sola vez al montar la app.
 */
function LoginRoute() {
  return isLoggedIn() ? <Navigate to="/" replace /> : <Login />;
}

/**
 * Acceso diferenciado en la raíz y en el resto de rutas de la app:
 *  - Invitado en "/"  → landing informativa pública (kelderclub.com).
 *  - Con sesión en "/" → Home autenticado dentro del AppShell.
 * Todo lo demás (rutas de la app) vive dentro del mismo AppShell, así que navegar entre el
 * Home y las otras pestañas NO remonta el shell. No cambia diseño; sólo la lógica de acceso.
 */
function AppOrLanding() {
  const { pathname } = useLocation();
  if (!isLoggedIn() && pathname === "/") return <Landing />;
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ClubProvider>
        <NativeBackButton />
        <Routes>
          {/* Landing informativa pública — accesible sin cuenta (también en "/" para invitados) */}
          <Route path="/landing" element={<Landing />} />

          {/* Acceso de usuarios registrados. Si ya hay sesión, /login lleva directo al Home. */}
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/registro" element={<Registro />} />

          {/* Raíz + resto de la app: invitado en "/" ve la landing; con sesión ve el Home. */}
          <Route path="*" element={<AppOrLanding />} />
        </Routes>
      </ClubProvider>
    </BrowserRouter>
  );
}

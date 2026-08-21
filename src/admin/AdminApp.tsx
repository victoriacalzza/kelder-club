import { Routes, Route, Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "./lib/adminAuth";
import { AdminShell } from "./AdminShell";
import { AdminLogin } from "./pages/AdminLogin";
import { Dashboard } from "./pages/Dashboard";
import { HomeAdmin } from "./pages/HomeAdmin";
import { Publicidad } from "./pages/Publicidad";
import { PublicidadWizard } from "./pages/PublicidadWizard";
import { Promociones } from "./pages/Promociones";
import { PromocionForm } from "./pages/PromocionForm";
import { ProductosDestacados } from "./pages/ProductosDestacados";
import { Colecciones } from "./pages/Colecciones";
import { Notificaciones } from "./pages/Notificaciones";
import { LandingEditor } from "./pages/LandingEditor";
import { TiendasAdmin } from "./pages/TiendasAdmin";
import { Usuarios } from "./pages/Usuarios";
import { Segmentacion } from "./pages/Segmentacion";
import { Auditoria } from "./pages/Auditoria";
import { Configuracion } from "./pages/Configuracion";

/** Guard: sin sesión administrativa → Login. Con sesión → shell del backoffice. */
function RequireAdmin() {
  return isAdminLoggedIn() ? <AdminShell /> : <Navigate to="/admin/login" replace />;
}
/** Si ya hay sesión, el login del backoffice lleva directo al dashboard. */
function LoginGate() {
  return isAdminLoggedIn() ? <Navigate to="/admin" replace /> : <AdminLogin />;
}

export function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<LoginGate />} />
      <Route element={<RequireAdmin />}>
        <Route index element={<Dashboard />} />
        <Route path="home" element={<HomeAdmin />} />
        <Route path="publicidad" element={<Publicidad />} />
        <Route path="publicidad/nueva" element={<PublicidadWizard />} />
        <Route path="promociones" element={<Promociones />} />
        <Route path="promociones/nueva" element={<PromocionForm />} />
        <Route path="productos" element={<ProductosDestacados />} />
        <Route path="colecciones" element={<Colecciones />} />
        <Route path="notificaciones" element={<Notificaciones />} />
        <Route path="landing" element={<LandingEditor />} />
        <Route path="tiendas" element={<TiendasAdmin />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="segmentacion" element={<Segmentacion />} />
        <Route path="auditoria" element={<Auditoria />} />
        <Route path="configuracion" element={<Configuracion />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

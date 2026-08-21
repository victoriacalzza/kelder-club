import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { adminLogin } from "../lib/adminAuth";
import { Btn } from "../ui";
import logoKelderClub from "../../assets/logos/kelder-club.png";

/**
 * Acceso al BACKOFFICE — separado de los usuarios cliente de Kelder Club+. Prototipo sin backend:
 * cualquier credencial válida abre la sesión administrativa (rol demo: Administrador general).
 */
export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    adminLogin();
    navigate("/admin", { replace: true });
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-2.5">
          <img src={logoKelderClub} alt="Kelder Club+" className="h-6 w-auto" />
          <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-[11px] font-semibold text-white">Backoffice</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-semibold text-slate-900">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-slate-500">Acceso exclusivo para personal autorizado.</p>
          <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
            <label className="block">
              <span className="text-[13px] font-medium text-slate-700">Correo corporativo</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nombre@garlo.mx"
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100" />
            </label>
            <label className="block">
              <span className="text-[13px] font-medium text-slate-700">Contraseña</span>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100" />
            </label>
            <Btn variant="primary" size="md" className="h-10 w-full" type="submit">Entrar</Btn>
          </form>
          <p className="mt-4 flex items-center gap-1.5 text-[12px] text-slate-400">
            <ShieldCheck size={14} /> Sesión segura · No compartas tus credenciales.
          </p>
        </div>
      </div>
    </div>
  );
}

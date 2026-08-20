import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { login } from "@/lib/auth";
import logoKelderClub from "../assets/logos/kelder-club.png";

/**
 * Acceso de usuarios existentes. Prototipo sin backend: valida presencia de credenciales y
 * abre sesión local, luego entra al Home. Se muestra fuera del AppShell (pantalla completa).
 */
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-cream text-ink-900">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/landing" className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900">
          <ArrowLeft size={18} aria-hidden="true" />
          Volver
        </Link>
        <Link to="/landing" aria-label="Kelder Club+">
          <img src={logoKelderClub} alt="Kelder Club+" className="h-6 w-auto" />
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8">
        <div className="w-full max-w-[420px]">
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Bienvenido de nuevo</h1>
          <p className="mt-2 text-[15px] text-ink-600">Inicia sesión para entrar a tu cuenta Kelder Club+.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-[13px] font-medium text-ink-700">Correo electrónico</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="mt-1.5 min-h-[52px] w-full rounded-2xl border border-ink-200 bg-white px-4 text-[15px] text-ink-900 outline-none placeholder:text-ink-300 focus:border-kelder-600 focus:ring-2 focus:ring-kelder-100"
              />
            </label>
            <label className="block">
              <span className="text-[13px] font-medium text-ink-700">Contraseña</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 min-h-[52px] w-full rounded-2xl border border-ink-200 bg-white px-4 text-[15px] text-ink-900 outline-none placeholder:text-ink-300 focus:border-kelder-600 focus:ring-2 focus:ring-kelder-100"
              />
            </label>

            <button
              type="submit"
              className="lift flex min-h-[54px] w-full items-center justify-center rounded-full bg-kelder-600 text-base font-semibold text-white hover:bg-kelder-700"
            >
              Iniciar sesión
            </button>
          </form>

          <p className="mt-6 text-center text-[15px] text-ink-600">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="font-semibold text-kelder-600 hover:text-kelder-700">
              Crear mi cuenta
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

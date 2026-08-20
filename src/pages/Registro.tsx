import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { login } from "@/lib/auth";
import logoKelderClub from "../assets/logos/kelder-club.png";

/**
 * Registro de nuevos usuarios. Prototipo sin backend: crea la sesión local y entra al Home.
 * Se muestra fuera del AppShell (pantalla completa). Es el destino del CTA "Crear mi cuenta".
 */
export function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
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
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Crea tu cuenta</h1>
          <p className="mt-2 text-[15px] text-ink-600">Únete gratis a Kelder Club+ y empieza a disfrutar tus beneficios.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-[13px] font-medium text-ink-700">Nombre</span>
              <input
                type="text"
                required
                autoComplete="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="mt-1.5 min-h-[52px] w-full rounded-2xl border border-ink-200 bg-white px-4 text-[15px] text-ink-900 outline-none placeholder:text-ink-300 focus:border-kelder-600 focus:ring-2 focus:ring-kelder-100"
              />
            </label>
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crea una contraseña"
                className="mt-1.5 min-h-[52px] w-full rounded-2xl border border-ink-200 bg-white px-4 text-[15px] text-ink-900 outline-none placeholder:text-ink-300 focus:border-kelder-600 focus:ring-2 focus:ring-kelder-100"
              />
            </label>

            <button
              type="submit"
              className="lift flex min-h-[54px] w-full items-center justify-center rounded-full bg-kelder-600 text-base font-semibold text-white hover:bg-kelder-700"
            >
              Crear mi cuenta
            </button>
          </form>

          <p className="mt-6 text-center text-[15px] text-ink-600">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="font-semibold text-kelder-600 hover:text-kelder-700">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  Home as HomeIcon,
  Wallet,
  Store,
  Sparkles,
  Check,
  ArrowRight,
  ChevronDown,
  MapPin,
  ShoppingBag,
  Ticket,
  Package,
} from "lucide-react";
import logoKelderClub from "../assets/logos/kelder-club.png";
import kelderK from "../assets/logos/kelder-k.png";
import credivaleCard from "../assets/credivale-card.png";
import prodOn from "../assets/prod-on.png";
import prodNb530 from "../assets/hero-nb530.png";
import prodAdidas from "../assets/pedido-adidas.png";
import tiendaFoto from "../assets/tienda-forum.jpg";
import calzzapato from "../assets/logos/calzzapato.png";
import kelder from "../assets/logos/kelder.png";
import urbanna from "../assets/logos/urbanna.png";
import calzzasport from "../assets/logos/calzzasport.png";
import calzakids from "../assets/logos/calzakids.png";

/* ═══════════════════════ type + layout tokens ═══════════════════════ */
// Mobile-first: los mínimos del clamp están calibrados para 375–430 px (sin desbordes),
// y crecen progresivamente hacia tablet/desktop.
const h1: CSSProperties = { fontSize: "clamp(2.05rem, 8vw, 4.75rem)", lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 600 };
const h2: CSSProperties = { fontSize: "clamp(1.7rem, 5.2vw, 3.4rem)", lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 600 };
const h3: CSSProperties = { fontSize: "clamp(1.4rem, 2.4vw, 2rem)", lineHeight: 1.12, letterSpacing: "-0.01em", fontWeight: 600 };
const lead: CSSProperties = { fontSize: "clamp(1.0625rem, 1.25vw, 1.25rem)", lineHeight: 1.6 };
const sectionPad: CSSProperties = { paddingBlock: "clamp(2.75rem, 7vw, 6.5rem)" };
const sectionPadCompact: CSSProperties = { paddingBlock: "clamp(2.25rem, 4.5vw, 4rem)" };

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}
function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.22em] text-kelder-600 ${className}`}>{children}</p>;
}

/* ═══════════════════════ media query hook (mobile-first) ═══════════════════════ */
function useMinWidth(px: number) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [px]);
  return match;
}

/* ═══════════════════════ scroll reveal ═══════════════════════ */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return setShown(true);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════ phone mock (scaled → real proportions) ═══════════════════════ */
const PW = 300; // logical design width
const PH = Math.round(PW * (19.5 / 9)); // ≈ 650

function PhoneMock({ children, w = PW, className = "", style }: { children: ReactNode; w?: number; className?: string; style?: CSSProperties }) {
  const s = w / PW;
  return (
    <div style={{ width: w, height: PH * s, ...style }} className={`relative ${className}`}>
      <div
        style={{ width: PW, height: PH, transform: `scale(${s})`, transformOrigin: "top left" }}
        className="absolute left-0 top-0 overflow-hidden rounded-[3rem] border-[13px] border-ink-950 bg-ink-950 shadow-modal"
      >
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.1rem] bg-cream">
          <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-950" aria-hidden="true" />
          {children}
        </div>
      </div>
    </div>
  );
}

function NavStub({ active = 0 }: { active?: number }) {
  const icons = [HomeIcon, Wallet, Store, Sparkles];
  return (
    <div className="relative mt-auto flex items-center justify-around border-t border-ink-100 bg-white/95 px-4 pb-3 pt-2">
      {[0, 1].map((i) => {
        const Icon = icons[i];
        return <Icon key={i} size={19} className={active === i ? "text-kelder-600" : "text-ink-300"} aria-hidden="true" />;
      })}
      <span className="w-10" aria-hidden="true" />
      {[2, 3].map((i) => {
        const Icon = icons[i];
        return <Icon key={i} size={19} className={active === i ? "text-kelder-600" : "text-ink-300"} aria-hidden="true" />;
      })}
      <span className="absolute left-1/2 top-0 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-kelder-600 shadow-card ring-[5px] ring-cream">
        <img src={kelderK} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
      </span>
    </div>
  );
}

function HomeMock() {
  return (
    <div className="flex h-full flex-col pt-9">
      <div className="flex items-center justify-between px-4 py-2.5">
        <img src={logoKelderClub} alt="" className="h-4 w-auto" />
        <Bell size={16} className="text-ink-400" aria-hidden="true" />
      </div>
      <div className="flex-1 overflow-hidden px-4">
        <p className="text-[11px] text-ink-500">Hola, Ana</p>
        <div className="mt-2 rounded-2xl bg-ink-950 p-4 text-white">
          <p className="text-[7.5px] font-semibold uppercase tracking-[0.18em] text-white/55">Tu saldo disponible</p>
          <p className="mt-1 text-[34px] font-semibold leading-none tracking-tight">$245</p>
          <p className="mt-0.5 text-[8px] text-white/55">245 puntos Kelder Club+</p>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-2/3 rounded-full bg-white" />
          </div>
          <div className="mt-3 rounded-full bg-white py-1.5 text-center text-[10px] font-semibold text-ink-950">Ver qué puedo comprar</div>
        </div>
        <p className="mt-3.5 text-[11px] font-semibold text-ink-900">Novedades en tu tienda</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[
            { img: prodOn, marca: "On", modelo: "Cloud 5", precio: "$2,449" },
            { img: prodNb530, marca: "New Balance", modelo: "530", precio: "$2,499" },
          ].map((p) => (
            <div key={p.modelo} className="rounded-xl border border-ink-100 bg-white p-2">
              <div className="aspect-square overflow-hidden rounded-lg bg-ink-50">
                <img src={p.img} alt="" className="h-full w-full object-contain p-1.5" />
              </div>
              <p className="mt-1.5 text-[8px] text-ink-400">{p.marca}</p>
              <p className="truncate text-[10px] font-medium text-ink-900">{p.modelo}</p>
              <p className="text-[10px] font-semibold text-ink-900">{p.precio}</p>
              <p className="mt-0.5 inline-flex items-center gap-0.5 text-[8px] font-medium text-success-700">
                <MapPin size={8} aria-hidden="true" /> Tu talla está aquí
              </p>
            </div>
          ))}
        </div>
      </div>
      <NavStub active={0} />
    </div>
  );
}

function ValesMock() {
  return (
    <div className="flex h-full flex-col pt-9">
      <div className="px-4 py-2.5">
        <p className="text-[14px] font-semibold text-ink-900">Crédito y vales</p>
      </div>
      <div className="flex-1 overflow-hidden px-4">
        <div className="flex items-center justify-between rounded-2xl border border-success-100 bg-success-50 p-3">
          <div>
            <p className="text-[7.5px] font-semibold uppercase tracking-[0.14em] text-success-700">Extravale disponible</p>
            <p className="mt-0.5 text-[24px] font-semibold leading-none tracking-tight text-ink-900">$300</p>
          </div>
          <span className="text-[10px] font-semibold text-kelder-600">Ver Extravale ›</span>
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
          <img src={credivaleCard} alt="" className="w-full object-cover" />
        </div>
        <div className="mt-3 rounded-2xl border border-ink-100 bg-white p-3">
          <p className="font-mono text-[10px] text-ink-500">•••• 7710</p>
          <p className="text-[11px] font-semibold text-ink-900">Ana López</p>
          <div className="mt-1.5 flex items-center justify-between text-[10px]">
            <span className="text-ink-500">Próximo pago</span>
            <span className="font-semibold text-ink-900">$620 · 15 ago</span>
          </div>
        </div>
      </div>
      <NavStub active={1} />
    </div>
  );
}

function QRMock() {
  return (
    <div className="flex h-full flex-col pt-9">
      <div className="px-4 py-2.5">
        <p className="text-[14px] font-semibold text-ink-900">Mi K</p>
        <p className="text-[9px] text-ink-500">Muéstralo en caja para identificarte y pagar.</p>
      </div>
      <div className="flex-1 px-4">
        <div className="flex flex-col items-center gap-2.5 rounded-2xl bg-ink-50 p-4">
          <div className="h-28 w-28 rounded-xl bg-white p-2.5 shadow-soft">
            <svg viewBox="0 0 110 110" className="h-full w-full text-ink-900" aria-hidden="true">
              {[
                [0, 0],
                [82, 0],
                [0, 82],
              ].map(([cx, cy]) => (
                <g key={`${cx}-${cy}`}>
                  <rect x={cx} y={cy} width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x={cx + 10} y={cy + 10} width="8" height="8" fill="currentColor" />
                </g>
              ))}
              {Array.from({ length: 11 }).map((_, row) =>
                Array.from({ length: 11 }).map((_, col) => {
                  const inCorner = (row < 4 && col < 4) || (row < 4 && col > 6) || (row > 6 && col < 4);
                  if (inCorner) return null;
                  return (row * 7 + col * 13 + row * col) % 5 < 2 ? (
                    <rect key={`${row}-${col}`} x={col * 10} y={row * 10} width="8" height="8" fill="currentColor" />
                  ) : null;
                }),
              )}
            </svg>
          </div>
          <p className="font-mono text-[10px] tracking-wide text-ink-600">167 087 0163</p>
        </div>
        <div className="mt-3 space-y-2">
          {[
            { label: "Cashback", monto: "$245", on: true },
            { label: "CrediVales", monto: "$1,250" },
            { label: "Extravales", monto: "$300" },
          ].map((r) => (
            <div key={r.label} className={`flex items-center justify-between rounded-xl border p-2.5 ${r.on ? "border-kelder-600 bg-kelder-50/60" : "border-ink-100 bg-white"}`}>
              <span className="text-[10.5px] font-medium text-ink-900">{r.label}</span>
              <span className="text-[10.5px] font-semibold text-ink-900">{r.monto}</span>
            </div>
          ))}
        </div>
      </div>
      <NavStub active={-1} />
    </div>
  );
}

/* floating chip around the hero phone */
function Chip({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div style={style} className={`absolute z-20 rounded-2xl bg-white/95 px-4 py-2.5 shadow-modal ring-1 ring-ink-100 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════ FAQ ═══════════════════════ */
const faqs = [
  { q: "¿Kelder Club+ tiene costo?", a: "No. Registrarte es completamente gratuito." },
  { q: "¿Cuánto vale un punto Kelder Club+?", a: "Cada punto equivale a $1 peso en beneficios. Por eso mostramos primero tu saldo disponible en pesos: así sabes fácilmente cuánto puedes utilizar." },
  { q: "¿Cómo acumulo puntos?", a: "Acumulas puntos con cada compra participante, tanto en tiendas físicas como en tiendas en línea participantes, sujeto a las políticas del programa." },
  { q: "¿Puedo utilizar mis puntos en compras en línea?", a: "Sí. Para utilizarlos debes generar previamente un cupón desde Kelder Club+, seleccionar la tienda en línea participante donde realizarás tu compra y utilizar el código generado durante el checkout." },
  { q: "¿Mis puntos tienen vigencia?", a: "La vigencia se rige por los términos y condiciones vigentes del programa." },
  { q: "¿Dónde puedo utilizar mis beneficios?", a: "En las unidades de negocio y franquicias participantes (no aplica en Choix). Muestra Mi K en caja para identificarte y utilizar tus beneficios." },
  { q: "¿Qué son los CrediVales?", a: "Son vales digitales que puedes consultar desde Kelder Club+. Son un producto independiente del Crédito Kelder." },
];
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between gap-5 px-6 py-4 text-left">
        <span className="text-base font-medium text-ink-900 sm:text-[17px]">{q}</span>
        <ChevronDown size={19} className={`shrink-0 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[15px] leading-relaxed text-ink-600">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ page ═══════════════════════ */
const navLinks = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Preguntas frecuentes", href: "#faq" },
];
const marcas = [
  { src: calzzapato, name: "Calzzapato" },
  { src: kelder, name: "Kelder" },
  { src: urbanna, name: "Urbanna" },
  { src: calzzasport, name: "CalzzaSport" },
  { src: calzakids, name: "CalzaKids" },
];

/* ═══════════════════════ Sección "También en línea" (ecommerce) ═══════════════════════ */
const redeemSteps = [
  { n: "01", t: "Genera tu cupón", d: "Inicia sesión en Kelder Club+ y selecciona “Canjear en línea”." },
  { n: "02", t: "Elige dónde y cuánto", d: "Selecciona la tienda en línea, indica los puntos que deseas canjear e ingresa el correo de tu cuenta en esa tienda. Después confirma la información." },
  { n: "03", t: "Copia tu código", d: "Kelder Club+ generará tu código de cupón. Cópialo para utilizarlo en tu compra." },
  { n: "04", t: "Úsalo al comprar", d: "Ve a la tienda en línea, realiza tu compra y pega el código durante el checkout para aplicar tus puntos." },
];

/* flecha del flujo: apunta hacia abajo en móvil, hacia la derecha en desktop */
function FlowArrow() {
  return (
    <div className="flex shrink-0 items-center justify-center">
      <ArrowRight size={18} className="rotate-90 text-ink-300 sm:rotate-0" aria-hidden="true" />
    </div>
  );
}

function SeccionEnLinea() {
  const [open, setOpen] = useState(false);
  return (
    <section id="en-linea" className="scroll-mt-24 bg-cream" style={sectionPad}>
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>También en línea</Eyebrow>
          <h2 style={h2} className="mt-4 text-ink-900 text-balance">
            Tus puntos también van contigo en línea.
          </h2>
          <p style={lead} className="mt-5 text-ink-600 sm:mt-6">
            Compra en nuestras tiendas en línea participantes, acumula puntos y utilízalos en futuras compras.
          </p>
        </Reveal>

        {/* dos beneficios · móvil: horizontal compacto */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10">
          {[
            { icon: <ShoppingBag size={22} aria-hidden="true" />, t: "Compra y acumula", d: "Tus compras en línea también generan puntos Kelder Club+." },
            { icon: <Ticket size={22} aria-hidden="true" />, t: "Canjea en línea", d: "Genera un cupón con tus puntos y utilízalo durante el checkout de la tienda participante." },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 80}>
              <div className="flex h-full flex-row items-center gap-4 rounded-3xl border border-ink-100 bg-white p-5 sm:flex-col sm:items-start sm:p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-kelder-50 text-kelder-600">{b.icon}</span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-ink-900 sm:mt-5 sm:text-xl">{b.t}</h3>
                  <p className="mt-0.5 text-sm text-ink-500 sm:mt-1.5">{b.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA secundario + desplegable "Cómo canjear en línea" */}
        <div className="mt-7 sm:mt-8">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="canje-online"
            className="lift inline-flex min-h-[52px] items-center gap-2 rounded-full bg-ink-950 px-7 text-sm font-semibold text-white hover:bg-ink-900"
          >
            Cómo canjear en línea
            <ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>

          <div id="canje-online" className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <div className="mt-5 rounded-3xl border border-ink-100 bg-white p-5 sm:mt-6 sm:p-8">
                {/* flujo visual: Kelder Club+ → cupón → checkout (vertical en móvil, horizontal en desktop) */}
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex-1 rounded-2xl bg-ink-950 p-4 text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-kelder-400">Kelder Club+</p>
                    <p className="mt-1 text-2xl font-semibold leading-none">
                      250 <span className="text-sm font-medium text-white/60">puntos</span>
                    </p>
                  </div>
                  <FlowArrow />
                  <div className="flex-1 rounded-2xl border border-kelder-200 bg-kelder-50/60 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-kelder-600">Cupón generado</p>
                    <p className="mt-1 font-mono text-lg font-semibold tracking-tight text-ink-900">KELDER-XXXX</p>
                  </div>
                  <FlowArrow />
                  <div className="flex-1 rounded-2xl border border-ink-100 bg-white p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">Checkout</p>
                    <p className="mt-1 text-[15px] font-semibold text-ink-900">Aplica el cupón en la tienda en línea</p>
                  </div>
                </div>

                {/* 4 pasos · vertical en móvil, 4 columnas en desktop */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                  {redeemSteps.map((s) => (
                    <div key={s.n}>
                      <span className="text-4xl font-semibold tracking-tight text-kelder-600 sm:text-5xl">{s.n}</span>
                      <h4 className="mt-3 text-base font-semibold text-ink-900">{s.t}</h4>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tiendas en línea participantes */}
        <div className="mt-8 sm:mt-10">
          <p className="text-sm text-ink-500">Disponible en las tiendas en línea participantes.</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-4">
            {marcas.map((m) => (
              <img key={m.name} src={m.src} alt={m.name} className="h-6 w-auto max-w-[120px] object-contain opacity-45" style={{ filter: "brightness(0)" }} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Landing() {
  const [menu, setMenu] = useState(false);
  const isSm = useMinWidth(640); // Tailwind `sm`
  const heroPhoneW = isSm ? 252 : 208; // teléfono del hero: proporcional en móvil

  // Header dinámico: sólido y alto arriba; glass translúcido y más bajo al hacer scroll.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white text-ink-900" style={{ scrollBehavior: "smooth" }}>
      {/* ───────── Header (dinámico al scroll) ───────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "border-b border-ink-100/70 bg-white/80 shadow-[0_1px_2px_rgba(0,0,0,0.05)] backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
            : "border-b border-transparent bg-white"
        }`}
      >
        <Container className={`flex items-center justify-between transition-all duration-300 ease-out ${scrolled ? "h-[56px]" : "h-[70px]"}`}>
          <a href="#top" className="flex shrink-0 items-center" aria-label="Kelder Club+">
            <img src={logoKelderClub} alt="Kelder Club+" className={`w-auto transition-all duration-300 ease-out ${scrolled ? "h-[22px] sm:h-6" : "h-6 sm:h-7"}`} />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900">
                {l.label}
              </a>
            ))}
            <Link to="/login" className="text-sm font-semibold text-ink-900 hover:text-kelder-600">
              Iniciar sesión
            </Link>
          </nav>
          <div className="flex items-center gap-3 md:hidden">
            <Link to="/login" className="text-[15px] font-semibold text-ink-900">
              Iniciar sesión
            </Link>
            <button onClick={() => setMenu((m) => !m)} aria-label="Menú" aria-expanded={menu} className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-50">
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>
        {menu && (
          <div className="border-t border-ink-100 bg-white md:hidden">
            <Container className="flex flex-col py-2">
              {navLinks.map((l, i) => (
                <a key={l.href} href={l.href} onClick={() => setMenu(false)} className={`min-h-[48px] py-3 text-[15px] font-medium text-ink-700 ${i < navLinks.length - 1 ? "border-b border-ink-50" : ""}`}>
                  {l.label}
                </a>
              ))}
            </Container>
          </div>
        )}
      </header>

      <main id="top">
        {/* ═══════════ 1 · HERO ═══════════ */}
        <section className="relative overflow-hidden bg-white">
          <Container>
            <div className="grid items-center gap-8 pb-8 pt-6 sm:pb-16 sm:pt-12 md:min-h-[82vh] md:grid-cols-[1.05fr_1fr] md:gap-6 md:py-8">
              {/* left */}
              <Reveal className="relative z-10 max-w-xl">
                <Eyebrow>Kelder Club+</Eyebrow>
                <h1 style={h1} className="mt-4 text-ink-900 text-balance sm:mt-5">
                  Comprar tiene más beneficios. <span className="text-kelder-600">Muchos más.</span>
                </h1>
                <p style={lead} className="mt-5 max-w-xl text-ink-600 sm:mt-7">
                  Descubre productos, encuentra tu talla, acumula puntos y lleva tus compras, crédito y vales contigo.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
                  <Link to="/login" className="lift inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-kelder-600 px-8 text-base font-semibold text-white hover:bg-kelder-700 sm:w-auto">
                    Crear mi cuenta
                  </Link>
                  <Link to="/tiendas" className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full border border-ink-200 px-8 text-base font-semibold text-ink-900 hover:bg-ink-50 sm:w-auto">
                    Encontrar una tienda
                  </Link>
                </div>
              </Reveal>

              {/* right — phone integrated in a warm panel with floating chips + product (solo desktop/tablet) */}
              <Reveal delay={140} className="relative hidden md:block">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-kelder-50 via-cream to-white ring-1 ring-ink-100 sm:rounded-[2.5rem]">
                  {/* product accent */}
                  <img src={prodNb530} alt="" className="pointer-events-none absolute -left-8 bottom-6 w-44 -rotate-12 opacity-95 drop-shadow-xl sm:-left-10 sm:w-64" />
                  {/* phone */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 sm:right-8">
                    <PhoneMock w={heroPhoneW}>
                      <HomeMock />
                    </PhoneMock>
                  </div>
                </div>
                {/* floating chips — máximo 2, sin badges promocionales contradictorios */}
                <Chip className="left-1 top-6 px-3 py-2 sm:-left-3 sm:top-8 sm:px-4 sm:py-2.5">
                  <p className="text-base font-semibold leading-tight text-ink-900 sm:text-lg">$245 disponibles</p>
                  <p className="text-[11px] font-medium text-ink-500 sm:text-xs">245 puntos Kelder Club+</p>
                </Chip>
                <Chip className="-bottom-2 right-1 flex items-center gap-2 px-3 py-2 sm:-bottom-3 sm:right-6 sm:px-4 sm:py-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success-100 text-success-700">
                    <Check size={14} aria-hidden="true" />
                  </span>
                  <span className="text-[13px] font-semibold text-ink-900 sm:text-sm">Tu talla está aquí</span>
                </Chip>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* ═══════════ 2 · BENEFICIOS (campaña) ═══════════ */}
        <section id="beneficios" className="scroll-mt-24 bg-ink-950 text-white" style={sectionPad}>
          <Container>
            <Reveal>
              <Eyebrow className="text-kelder-400">Ser parte tiene sus beneficios</Eyebrow>
              <h2 style={h2} className="mt-4 max-w-2xl text-balance">
                Tus compras, recompensadas.
              </h2>
            </Reveal>
            <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 lg:mt-14">
              {[
                { big: "$50", t: "en puntos de bienvenida" },
                { big: "10%", t: "en tu primera compra*" },
              ].map((b, i) => (
                <Reveal key={b.big} delay={i * 100} className="border-t border-white/15 pt-5 sm:pt-6">
                  <p style={{ fontSize: "clamp(2.9rem, 11vw, 7.5rem)", lineHeight: 0.92, letterSpacing: "-0.03em", fontWeight: 600 }}>{b.big}</p>
                  <p className="mt-3 max-w-[16rem] text-[15px] text-white/70 sm:mt-4 sm:text-lg">{b.t}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="mt-10 max-w-2xl border-t border-white/15 pt-6 sm:mt-14 sm:pt-8">
                <p className="text-lg font-semibold text-white sm:text-2xl">Y sigue acumulando puntos con tus compras.</p>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/70 sm:text-base">Después de tu primera compra acumulas 1% en puntos Kelder Club+.</p>
                <p className="mt-5 text-[13px] leading-relaxed text-white/45 sm:text-sm">
                  * Sujeto a las políticas del programa. 1 punto Kelder Club+ equivale a $1 peso en beneficios.
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ═══════════ 3 · DÓNDE PUEDES DISFRUTAR KELDER CLUB+ (tiendas · compacta) ═══════════ */}
        <section className="bg-cream" style={sectionPadCompact}>
          <Container>
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow className="text-center">Tiendas participantes</Eyebrow>
              <h2 style={h3} className="mt-3 text-ink-900 text-balance">
                Disfruta Kelder Club+ en tus tiendas favoritas.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] text-ink-600 sm:text-base">
                Acumula puntos con tus compras y utiliza tus beneficios en las tiendas participantes de Grupo Garlo.
              </p>
            </Reveal>

            {/* Marquee continuo (todos los tamaños): loop seamless, lento, pausa en hover, fade en extremos.
                Respeta prefers-reduced-motion (index.css detiene .animate-marquee → logos estáticos). */}
            <div
              className="marquee-group mt-8 overflow-hidden"
              style={{ maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)" }}
            >
              <ul className="animate-marquee flex w-max items-center gap-16 sm:gap-24">
                {[...marcas, ...marcas].map((m, i) => (
                  <li key={i} className="shrink-0">
                    <img
                      src={m.src}
                      alt={i < marcas.length ? m.name : ""}
                      className="h-7 w-auto max-w-[150px] object-contain opacity-45"
                      style={{ filter: "brightness(0)" }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Link to="/tiendas" className="lift inline-flex min-h-[50px] items-center gap-2 rounded-full bg-kelder-600 px-7 text-sm font-semibold text-white hover:bg-kelder-700">
                Ver tiendas cerca de mí
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <p className="text-center text-sm text-ink-500">
                Aplica en las unidades de negocio y franquicias participantes. <span className="font-medium text-ink-700">No aplica en Choix.</span>
              </p>
            </div>
          </Container>
        </section>

        {/* ═══════════ 4 · UN CLUB PENSADO PARA TUS COMPRAS (foto 50/50) ═══════════ */}
        <section style={sectionPad}>
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal className="order-2 overflow-hidden rounded-[2rem] lg:order-1">
                <img src={tiendaFoto} alt="Cliente en una tienda del grupo" className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[440px]" />
              </Reveal>
              <Reveal delay={120} className="order-1 lg:order-2">
                <Eyebrow>Compra con confianza</Eyebrow>
                <h2 style={h2} className="mt-4 text-ink-900 text-balance">
                  Compra en tienda con más confianza.
                </h2>
                <p style={lead} className="mt-6 max-w-md text-ink-600">
                  Encuentra productos, revisa dónde está tu talla y visita la sucursal que lo tiene disponible.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-ink-700">
                  {["Pruébatelo", "Cambios en tienda", "Asesoría"].map((t, i) => (
                    <span key={t} className="inline-flex items-center gap-4">
                      {i > 0 && <span className="text-ink-300" aria-hidden="true">·</span>}
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* ═══════════ 5 · ENCUENTRA LO QUE QUIERES (demo real: producto + talla + disponibilidad) ═══════════ */}
        <section className="bg-cream" style={sectionPad}>
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow>Producto · Talla · Tienda</Eyebrow>
              <h2 style={h2} className="mt-4 text-ink-900 text-balance">
                Encuentra lo que quieres. Y descubre dónde está.
              </h2>
              <p style={lead} className="mt-6 text-ink-600">
                Consulta productos, disponibilidad y talla antes de visitar una tienda.
              </p>
            </Reveal>

            {/* Mobile: cards horizontales compactas (miniatura + info, sin hueco) · Desktop (md+): 3 columnas verticales */}
            <div className="mt-6 grid grid-cols-1 gap-3 md:mt-12 md:grid-cols-3 md:gap-6">
              {[
                { img: prodNb530, marca: "New Balance", modelo: "530", precio: "$2,499", talla: "24 MX", estado: "Tu talla está aquí", detalle: "Calzzapato Galerías", tono: "aqui" as const, cta: "Cómo llegar", to: "/tienda/t1" },
                { img: prodAdidas, marca: "Adidas", modelo: "Ultraboost Light", precio: "$3,499", talla: "24 MX", estado: "Tu talla está en otra tienda", detalle: "Forum · 2.4 km", tono: "cerca" as const, cta: "Ver tienda", to: "/tienda/t2" },
                { img: prodOn, marca: "On", modelo: "Cloud 5", precio: "$2,449", talla: "24 MX", estado: "Disponible por solicitud", detalle: "Consultar disponibilidad", tono: "solicitud" as const, cta: "Consultar disponibilidad", to: "/buscar" },
              ].map((p, i) => (
                <Reveal key={p.modelo} delay={i * 80}>
                  <div className="flex flex-row overflow-hidden rounded-2xl border border-ink-100 bg-white md:h-full md:flex-col md:rounded-3xl">
                    <div className="flex w-28 shrink-0 items-center justify-center bg-gradient-to-br from-cream to-white p-3 md:h-52 md:w-full md:p-6">
                      <img src={p.img} alt={`${p.marca} ${p.modelo}`} className="h-24 w-full object-contain md:h-full" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-4 md:justify-start md:p-6">
                      <p className="text-[11px] text-ink-400 md:text-xs">{p.marca}</p>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-base font-semibold tracking-tight text-ink-900 md:text-lg">{p.modelo}</p>
                        <p className="text-base font-semibold text-ink-900">{p.precio}</p>
                      </div>
                      <p className="mt-1 text-[13px] text-ink-500">Talla {p.talla}</p>
                      <div className="mt-2 flex items-start gap-1.5 md:mt-4 md:gap-2">
                        <span className="mt-0.5 shrink-0" aria-hidden="true">
                          {p.tono === "aqui" ? (
                            <Check size={16} className="text-success-700" />
                          ) : p.tono === "cerca" ? (
                            <MapPin size={16} className="text-kelder-600" />
                          ) : (
                            <Package size={16} className="text-ink-400" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className={`text-[13px] font-semibold md:text-sm ${p.tono === "aqui" ? "text-success-700" : "text-ink-900"}`}>{p.estado}</p>
                          <p className="text-xs text-ink-500">{p.detalle}</p>
                        </div>
                      </div>
                      <Link to={p.to} className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-kelder-600 md:mt-5 md:text-sm">
                        {p.cta}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ═══════════ 5 · MUCHO MÁS QUE PUNTOS (bento) ═══════════ */}
        <section className="bg-cream" style={sectionPad}>
          <Container>
            <Reveal>
              <Eyebrow>Todo en un lugar</Eyebrow>
              <h2 style={h2} className="mt-4 max-w-xl text-ink-900 text-balance">
                Mucho más que puntos.
              </h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:mt-12">
              {/* featured: tus tallas disponibles cerca — imagen pequeña de apoyo en móvil, protagonista en desktop */}
              <Reveal className="sm:col-span-2">
                <div className="flex h-full flex-row items-center gap-4 overflow-hidden rounded-3xl border border-ink-100 bg-white p-5 sm:gap-6 sm:p-7">
                  <div className="min-w-0 flex-1">
                    <Eyebrow>Tus tallas</Eyebrow>
                    <h3 style={h3} className="mt-2 text-ink-900 sm:mt-3">Tus tallas, disponibles cerca de ti.</h3>
                    <div className="mt-3 flex flex-wrap gap-2 sm:mt-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-3 py-1.5 text-sm">
                        <span className="text-[11px] font-medium text-ink-500">Calzado</span>
                        <span className="font-semibold text-ink-900">24 MX</span>
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-3 py-1.5 text-sm">
                        <span className="text-[11px] font-medium text-ink-500">Ropa</span>
                        <span className="font-semibold text-ink-900">M</span>
                      </span>
                    </div>
                    <p className="mt-3 max-w-sm text-sm text-ink-500 sm:mt-4">Encuentra productos disponibles en tu talla y descubre en qué tienda están.</p>
                  </div>
                  <div className="flex w-20 shrink-0 items-center justify-center sm:w-56 sm:rounded-2xl sm:bg-gradient-to-br sm:from-cream sm:to-white sm:p-4">
                    <img src={prodNb530} alt="New Balance 530" className="h-20 w-full object-contain sm:h-40" />
                  </div>
                </div>
              </Reveal>

              {/* mi saldo (dark) — $ principal, puntos secundario */}
              <Reveal delay={80}>
                <div className="flex h-full flex-col rounded-3xl bg-ink-950 p-5 text-white sm:justify-between sm:p-7">
                  <Eyebrow className="text-kelder-400">Mis beneficios</Eyebrow>
                  <div className="mt-3 sm:mt-6">
                    <p style={{ fontSize: "clamp(2.75rem,6vw,4.25rem)", lineHeight: 1, fontWeight: 600, letterSpacing: "-0.02em" }}>$245</p>
                    <p className="mt-1 text-base text-white/70">disponibles</p>
                    <p className="mt-2 text-sm text-white/45 sm:mt-3">245 puntos Kelder Club+</p>
                  </div>
                </div>
              </Reveal>

              {/* crédito y vales (breve — hay sección dedicada) · móvil: horizontal compacto */}
              <Reveal>
                <div className="flex h-full flex-row items-center gap-4 rounded-3xl border border-ink-100 bg-white p-5 sm:flex-col sm:items-start sm:p-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-kelder-50 text-kelder-600">
                    <Ticket size={22} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-ink-900 sm:mt-5 sm:text-xl">Crédito y Vales</h3>
                    <p className="mt-0.5 text-sm text-ink-500 sm:mt-1.5">Consulta tu Crédito Kelder y tus CrediVales.</p>
                  </div>
                </div>
              </Reveal>

              {/* mis compras · móvil: horizontal compacto */}
              <Reveal delay={80}>
                <div className="flex h-full flex-row items-center gap-4 rounded-3xl border border-ink-100 bg-white p-5 sm:flex-col sm:items-start sm:p-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-kelder-50 text-kelder-600">
                    <ShoppingBag size={22} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-ink-900 sm:mt-5 sm:text-xl">Mis compras</h3>
                    <p className="mt-0.5 text-sm text-ink-500 sm:mt-1.5">Consulta tus compras y tickets.</p>
                  </div>
                </div>
              </Reveal>

              {/* mi tienda (foto) · móvil: más baja */}
              <Reveal delay={160}>
                <div className="relative flex h-full min-h-[128px] flex-col justify-end overflow-hidden rounded-3xl sm:min-h-[200px]">
                  <img src={tiendaFoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
                  <div className="relative p-5 text-white sm:p-7">
                    <h3 className="text-lg font-semibold sm:text-xl">Mi tienda</h3>
                    <p className="mt-1 text-sm text-white/80">Consulta información de tu tienda seleccionada.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* ═══════════ 5 · CÓMO FUNCIONA (01/02/03) ═══════════ */}
        <section id="como-funciona" className="scroll-mt-24" style={sectionPadCompact}>
          <Container>
            <Reveal>
              <Eyebrow>Cómo funciona</Eyebrow>
              <h2 style={h2} className="mt-4 text-ink-900 text-balance">
                Así de fácil.
              </h2>
            </Reveal>
            <div className="relative mt-11">
              <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-ink-100 md:block" aria-hidden="true" />
              <div className="grid gap-10 md:grid-cols-3 md:gap-8">
                {[
                  { n: "01", t: "Crea tu cuenta", d: "Registrarte es gratuito y toma pocos minutos.", s: undefined as string | undefined },
                  { n: "02", t: "Muestra tu K al comprar", d: "Identifícate con Mi K al realizar tus compras.", s: "También puedes identificarte con tu número celular." },
                  { n: "03", t: "Acumula y disfruta", d: "Tus compras en tiendas físicas y en línea participantes generan puntos que podrás utilizar en futuras compras.", s: undefined },
                ].map((s, i) => (
                  <Reveal key={s.n} delay={i * 120} className="relative">
                    <span className="relative inline-block bg-white pr-4 text-6xl font-semibold tracking-tight text-kelder-600 sm:text-7xl md:pr-6">{s.n}</span>
                    <h3 className="mt-6 text-2xl font-semibold text-ink-900">{s.t}</h3>
                    <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-ink-500">{s.d}</p>
                    {s.s && <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-ink-400">{s.s}</p>}
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ═══════════ 5b · TAMBIÉN EN LÍNEA (ecommerce: acumula + canjea con cupón) ═══════════ */}
        <SeccionEnLinea />

        {/* ═══════════ 6 · LA APP (dark, 3 teléfonos) ═══════════ */}
        <section className="overflow-hidden bg-ink-950 text-white" style={sectionPad}>
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <Eyebrow className="text-kelder-400">La app</Eyebrow>
                <h2 style={h2} className="mt-4 text-balance">
                  Todo Kelder Club+ en tu bolsillo.
                </h2>
                <p style={lead} className="mx-auto mt-6 max-w-xl text-white/70">
                  Tus beneficios, compras, vales y tu identificación siempre contigo.
                </p>
              </Reveal>
            </div>

            {/* 3 phones — el cluster se escala en bloque para móvil (proporcional, sin desbordes) */}
            <Reveal delay={120}>
              <div className="relative mx-auto mt-9 h-[400px] max-w-4xl sm:mt-12 sm:h-[620px]">
                <div className="absolute inset-0 flex origin-center scale-[0.62] items-center justify-center sm:scale-100">
                  <div className="absolute left-1/2 -translate-x-[94%] rotate-[-9deg] sm:-translate-x-[112%]">
                    <PhoneMock w={248}>
                      <ValesMock />
                    </PhoneMock>
                  </div>
                  <div className="absolute left-1/2 -translate-x-[6%] rotate-[9deg] sm:translate-x-[12%]">
                    <PhoneMock w={248}>
                      <QRMock />
                    </PhoneMock>
                  </div>
                  <div className="relative z-10">
                    <PhoneMock w={292}>
                      <HomeMock />
                    </PhoneMock>
                  </div>
                </div>
                {/* Mi K identification badge, near the QR phone */}
                <div className="absolute right-0 top-8 z-30 hidden max-w-[220px] rounded-2xl bg-white px-4 py-3 shadow-modal lg:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kelder-600">Mi K</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink-900">Tu identificación Kelder Club+</p>
                </div>
              </div>
            </Reveal>

            <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-white/65">
              Tu <span className="font-semibold text-white">K</span> te identifica como miembro de Kelder Club+. Muéstrala al comprar para acceder a tus beneficios.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/70">
              {["Consulta tu saldo", "Muestra tu K", "Revisa tus compras", "Consulta crédito y vales", "Encuentra productos"].map((t, i) => (
                <span key={t} className="inline-flex items-center gap-3">
                  {i > 0 && <span className="text-white/25" aria-hidden="true">•</span>}
                  {t}
                </span>
              ))}
            </div>
          </Container>
        </section>

        {/* ═══════════ 9 · CREDIVALE (50/50 con profundidad · compacta) ═══════════ */}
        <section style={sectionPadCompact}>
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <Eyebrow>Crédito y Vales</Eyebrow>
                <h2 style={h2} className="mt-4 text-ink-900 text-balance">
                  Tus CrediVales, siempre contigo.
                </h2>
                <p style={lead} className="mt-5 max-w-md text-ink-600">
                  Consulta tus vales digitales, saldo disponible y la información que necesitas desde Kelder Club+.
                </p>
                <Link to="/login" className="mt-7 inline-flex min-h-[52px] items-center gap-2 rounded-full border border-ink-200 px-7 text-base font-semibold text-ink-900 hover:bg-ink-50">
                  Conocer Crédito y Vales
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </Reveal>

              <Reveal delay={120} className="relative flex h-[240px] items-center justify-center sm:h-[300px]">
                <img src={credivaleCard} alt="" className="absolute w-[70%] max-w-[330px] -translate-x-10 -rotate-[9deg] rounded-2xl shadow-modal" />
                <img src={credivaleCard} alt="" className="absolute w-[70%] max-w-[330px] translate-x-10 rotate-[7deg] rounded-2xl shadow-modal" />
                <img src={credivaleCard} alt="Tarjeta CrediVale de Kelder Club+" className="relative z-10 w-[70%] max-w-[330px] rounded-2xl shadow-modal ring-1 ring-ink-100" />
              </Reveal>
            </div>
          </Container>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section id="faq" className="scroll-mt-24" style={sectionPadCompact}>
          <div className="mx-auto w-full max-w-[860px] px-5 sm:px-8">
            <Reveal className="text-center">
              <Eyebrow className="text-center">FAQ</Eyebrow>
              <h2 style={h2} className="mt-4 text-ink-900 text-balance">
                ¿Tienes dudas?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] text-ink-600 sm:text-base">
                Aquí te contamos lo más importante sobre Kelder Club+.
              </p>
            </Reveal>
            <div className="mt-9 space-y-3">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 40}>
                  <FaqItem q={f.q} a={f.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 10 · CTA FINAL (full-width rojo) ═══════════ */}
        <section className="bg-kelder-600 text-white" style={sectionPad}>
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 style={h2} className="mx-auto max-w-2xl text-balance">
                Haz que tu próxima compra cuente.
              </h2>
              <p style={lead} className="mx-auto mt-5 max-w-xl text-white/85 sm:mt-6">
                Únete gratis a Kelder Club+ y lleva tus beneficios siempre contigo.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10">
                <Link to="/login" className="lift inline-flex min-h-[56px] w-full max-w-xs items-center justify-center rounded-full bg-white px-10 text-base font-semibold text-kelder-700 hover:bg-white/90 sm:w-auto">
                  Crear mi cuenta
                </Link>
                <Link to="/login" className="text-sm font-medium text-white/85 underline underline-offset-4 hover:text-white">
                  Ya tengo cuenta
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className="border-t border-ink-100 bg-white">
        <Container className="flex flex-col items-center gap-6 py-12 sm:flex-row sm:justify-between">
          <img src={logoKelderClub} alt="Kelder Club+" className="h-6 w-auto" />
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {[
              { label: "Beneficios", href: "#beneficios" },
              { label: "Preguntas frecuentes", href: "#faq" },
              { label: "Términos y condiciones", href: "#" },
              { label: "Aviso de privacidad", href: "#" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-ink-500 hover:text-ink-900">
                {l.label}
              </a>
            ))}
            <Link to="/login" className="text-sm font-medium text-ink-700 hover:text-kelder-600">
              Iniciar sesión
            </Link>
          </nav>
        </Container>
        <div className="border-t border-ink-50 py-5">
          <p className="text-center text-xs text-ink-400">© Kelder Club+ · Grupo Garlo</p>
        </div>
      </footer>
    </div>
  );
}

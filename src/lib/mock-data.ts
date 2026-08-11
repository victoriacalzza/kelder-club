// DISPONIBLE (unused — no payments), EN PAGO (used — paid every quincena), EXTRAVALE (leftover
// AVAILABLE balance from a used CrediVale — NOT a debt), or VENCIDO (expired unused). These drive
// the "Mis CrediVales" tabs.
export type ValeEstado = "disponible" | "en_pago" | "extravale" | "vencido";
export type ValeTipo = "vale" | "credivale";

export interface ValeMovimiento {
  id: string;
  concepto: string;
  fecha: string;
  monto: number;
  tipo: "emision" | "uso";
}

// A scheduled payment — shared shape for both a CrediVale's payment plan and the personal
// Crédito Kelder plan (they are DIFFERENT products; this is only a common data shape).
export type PagoEstado = "pagado" | "proximo" | "pendiente";
export interface PagoProgramado {
  id: string;
  numero: number;
  fecha: string;
  monto: number;
  estado: PagoEstado;
}

export interface Vale {
  id: string;
  tipo: ValeTipo;
  monto: number; // monto autorizado (importe original de la credencial)
  disponible: number; // remaining balance
  utilizado: number; // amount already used
  estado: ValeEstado;
  mayorista: string; // business unit (e.g. Calzzapato)
  mayoristaPersona: string; // the assigned mayorista (a person)
  folio: string; // masked, e.g. "•••• 2845"
  fechaEmision: string;
  fechaVigencia: string;
  // CrediVale credential fields (mirror the real CrediVale card). Optional so existing
  // asset variants stay valid; views fall back to the account holder when absent.
  titular?: string; // e.g. "ANA VICTORIA ARAGÓN GÓMEZ"
  celular?: string; // e.g. "667 100 3010"
  postergado?: boolean; // real CrediVale "Postergado: Sí/No" flag
  // Payments the member owes on THIS CrediVale (tied to its mayorista). Independent of
  // Crédito Kelder — the mayorista relationship lives ONLY inside the CrediVale.
  saldoPendiente?: number;
  proximoPago?: { monto: number; fecha: string; enDias: number };
  pagoActual?: number;
  pagosTotales?: number;
  pagos?: PagoProgramado[];
  // Extravale links: a used CrediVale that left money over points to the Extravale it created;
  // an Extravale points back to the CrediVale that originated it.
  extravaleId?: string; // on the origin CrediVale → the Extravale it generated
  extravaleMonto?: number; // on the origin CrediVale → leftover amount
  origenId?: string; // on an Extravale → the origin CrediVale's id
  origenFolio?: string; // on an Extravale → the origin CrediVale's folio
  movimientos?: ValeMovimiento[];
  compras?: { id: string; tienda: string; fecha: string; monto: number }[];
}

export type CompraCanal = "tienda" | "linea";
export type CompraEstado = "En preparación" | "En camino" | "Entregado";

// A purchase groups one OR MORE line items under a single ticket/order.
export interface CompraItem {
  marca: string;
  modelo: string;
  imagen?: string;
  talla?: number;
  cantidad: number;
  precioUnitario: number;
}

export interface Compra {
  id: string;
  tienda: string; // store name or online channel
  canal: CompraCanal;
  estado?: CompraEstado; // only for online orders
  fecha: string;
  ticket: string; // ticket # (in-store) or order # (online)
  items: CompraItem[];
  cashback: number; // cashback this whole purchase generated
}

export function totalCompra(c: Compra) {
  return c.items.reduce((s, i) => s + i.precioUnitario * i.cantidad, 0);
}
export function articulosCompra(c: Compra) {
  return c.items.reduce((s, i) => s + i.cantidad, 0);
}

export interface MovimientoCashback {
  id: string;
  tienda: string;
  fecha: string;
  monto: number;
  tipo: "ingreso" | "egreso";
}

import prodPuma from "../assets/prod-puma.png";
import prodOn from "../assets/prod-on.png";
import prodConverse from "../assets/prod-converse.png";
import prodAsics from "../assets/prod-asics.png";
import prodNb530 from "../assets/hero-nb530.png";
import fotoTienda from "../assets/tienda-forum.jpg";
import pedidoAdidas from "../assets/pedido-adidas.png";
import campanaRegreso from "../assets/campana-regreso.png";
import logoCalzzapato from "../assets/logos/calzzapato.png";
import logoKelder from "../assets/logos/kelder.png";
import logoUrbanna from "../assets/logos/urbanna.png";
import logoCalzzasport from "../assets/logos/calzzasport.png";
import logoCalzakids from "../assets/logos/calzakids.png";
import imgCreditoKelder from "../assets/credito-kelder.png";

// Editorial photo for the "Conoce Crédito Kelder" invitation card (Home, no-credit state).
export { imgCreditoKelder };

export type Departamento = "Mujer" | "Hombre" | "Niños";
export type TipoProducto = "Calzado" | "Ropa" | "Accesorios";

export interface Producto {
  id: string;
  marca: string;
  modelo: string;
  precio: number;
  imagen?: string;
  categoria?: string;
  color?: string;
  tallas?: number[]; // footwear sizes
  tallasRopa?: string[]; // apparel/accessory sizes (XS…XXL / Única)
  tiendas?: number; // number of group stores where it's available
  departamento?: Departamento;
  tipo?: TipoProducto; // Calzado / Ropa / Accesorios
  unidad?: UnidadNegocio; // business unit that sells it
  disponible?: boolean; // in stock (false → out of stock)
  orden?: number; // recency index for "Más recientes" sorting (higher = newer)
}

// Cashback a purchase generates (product-search & detail use this — same 5% rule as elsewhere).
export function cashbackDe(precio: number) {
  return Math.round(precio * 0.05);
}
// What the member would pay applying their available cashback (never below 0). Not a new balance.
export function precioConCashback(precio: number, cashback: number) {
  return Math.max(0, precio - cashback);
}

export const user = {
  nombre: "Ana",
  nombreCompleto: "Ana Victoria Aragón Gómez",
  correo: "anavaragong@gmail.com",
};

// Only the concepts the product actually has — no invented "total balance" or
// unified wallet. Cashback and CrediVale credit are kept strictly separate.
export const cuenta = {
  cashbackDisponible: 245,
  cashbackAcumulado: 1240,
  cashbackUtilizado: 380,
  // The same amount expressed as real, tangible use — a dynamic slot fed by business
  // rules, NOT a new financial figure. Null when no eligible product exists.
  equivalencia: "Alcanza para el 10% de unas New Balance 530" as string | null,
  // progress toward the next reward — the same story as the cashback amount
  proximaRecompensa: { faltan: 55, meta: 300 },
  nivelClub: "Oro",
  ultimaCompra: { monto: 899, fecha: "hace 3 días", sucursal: "Adidas Galerías Mazatlán" },
  valesActivos: 2,
  // CrediVale credit — a distinct concept, never merged with cashback
  credito: {
    saldoPendiente: 1860,
    valesActivos: 2,
    mayorista: "Calzzapato",
    proximoPago: { monto: 620, fecha: "18 ago", enDias: 12 },
  },
};

/**
 * Crédito Kelder is a REMINDER on the Home, not a financial module: who I pay, how much,
 * and when. Payments are a recurring biweekly SERIES, each mayorista on their own calendar.
 * Never a summed total across mayoristas, never a "saldo". Authoritative data lives in the
 * separate Crédito Kelder app — this only reminds.
 */
export interface PagoMayorista {
  id: string;
  mayorista: string; // the person the client pays
  monto: number; // the next (or overdue) biweekly payment — never a total balance
  fecha?: string; // absolute date of the next payment, e.g. "19 ago"
  enDias?: number; // relative days until the next payment
  pagoActual: number; // e.g. 3
  pagosTotales: number; // e.g. 6 → "Pago 3 de 6"
  vencido?: boolean;
  vencidoDesde?: string; // e.g. "3 ago" (only when vencido)
}

// The credit product the member actually holds — drives the label and the block icon.
// "CrediVale" and "Crédito Kelder" are distinct products; never hardcode one.
export const productoCredito: "CrediVale" | "Crédito Kelder" = "CrediVale";

// Demo: two mayoristas, both al corriente. Soonest payment first.
export const pagosMayoristas: PagoMayorista[] = [
  { id: "pm1", mayorista: "Carlos Pérez", monto: 310, fecha: "12 ago", enDias: 5, pagoActual: 2, pagosTotales: 4 },
  { id: "pm2", mayorista: "Ana López", monto: 620, fecha: "19 ago", enDias: 12, pagoActual: 3, pagosTotales: 6 },
];

// Mayoristas assigned to the member (used by block B to name where to request a vale).
export const mayoristasAsignados = ["Ana López"];

/**
 * CRÉDITO KELDER — a single PERSONAL credit. It has NOTHING to do with mayoristas or with
 * CrediVales: no mayorista names, no vouchers, no folios. Just the member's own balance,
 * upcoming payments and history. Never render mayorista data on any Crédito Kelder surface.
 */
export interface CreditoKelder {
  saldoPendiente: number;
  estado: string; // e.g. "Al corriente"
  proximoPago: { monto: number; fecha: string; enDias: number };
  pagoActual: number;
  pagosTotales: number;
  pagos: PagoProgramado[];
}

export const creditoKelder: CreditoKelder = {
  saldoPendiente: 1860,
  estado: "Al corriente",
  proximoPago: { monto: 620, fecha: "18 ago", enDias: 12 },
  pagoActual: 4,
  pagosTotales: 6,
  pagos: [
    { id: "ck-1", numero: 1, fecha: "05 jun 2026", monto: 620, estado: "pagado" },
    { id: "ck-2", numero: 2, fecha: "19 jun 2026", monto: 620, estado: "pagado" },
    { id: "ck-3", numero: 3, fecha: "03 ago 2026", monto: 620, estado: "pagado" },
    { id: "ck-4", numero: 4, fecha: "18 ago 2026", monto: 620, estado: "proximo" },
    { id: "ck-5", numero: 5, fecha: "01 sep 2026", monto: 620, estado: "pendiente" },
    { id: "ck-6", numero: 6, fecha: "15 sep 2026", monto: 620, estado: "pendiente" },
  ],
};

// Two-letter initials from a person's name — e.g. "Carlos Pérez" → "CP".
export function iniciales(nombre: string) {
  return nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export interface Pedido {
  id: string;
  compraId: string; // the purchase/order this card represents → its detail screen
  producto: string;
  marca: string;
  estado: string;
  fechaEntrega: string;
  imagen?: string;
}

export const pedidoActivo: Pedido = {
  id: "ped1",
  compraId: "c2", // Adidas Ultraboost Light · En camino (Kelder.com)
  producto: "Ultraboost Light",
  marca: "Adidas",
  estado: "En camino",
  fechaEntrega: "Llega el 9 de agosto",
  imagen: pedidoAdidas,
};

/**
 * The Home adapts to the member's real situation — no invented data.
 * Each condition drives exactly one branch of a mutually-exclusive slot.
 */
export type CreditoEstado = "con_vales" | "sin_vales" | "no_miembro";

export interface ClientProfile {
  cashback: number; // 0 → "sin cashback" state
  credito: CreditoEstado; // A: con_vales · B: sin_vales · C: no_miembro
  pedidoEnCurso: boolean; // block 3 renders only when true
}

export const perfilDemo: ClientProfile = { cashback: 245, credito: "con_vales", pedidoEnCurso: true };

export type UnidadNegocio = "Calzzapato" | "Kelder" | "Urbanna" | "CalzzaSport" | "CalzaKids";

// Business units with their logo — used for filters and to render the correct brand image.
export const unidadesNegocio: { nombre: UnidadNegocio; logo: string }[] = [
  { nombre: "Calzzapato", logo: logoCalzzapato },
  { nombre: "Kelder", logo: logoKelder },
  { nombre: "Urbanna", logo: logoUrbanna },
  { nombre: "CalzzaSport", logo: logoCalzzasport },
  { nombre: "CalzaKids", logo: logoCalzakids },
];

export function logoDeUnidad(unidad: UnidadNegocio) {
  return unidadesNegocio.find((u) => u.nombre === unidad)?.logo;
}

export interface Tienda {
  id: string;
  unidad: UnidadNegocio;
  nombre: string;
  ciudad: string;
  horario: string;
  abierta: boolean;
  distancia: string;
  distanciaKm: number; // for ordering by proximity
  imagen?: string; // real storefront photo (only when it matches the unit); else the unit logo is shown
}

// Nearest store — the real storefront photo we have IS a Calzzapato store, so the unit is Calzzapato.
export const tiendaCercana: Tienda = {
  id: "t1",
  unidad: "Calzzapato",
  nombre: "Calzzapato Galerías Mazatlán",
  ciudad: "Mazatlán",
  horario: "9:00 – 21:00",
  abierta: true,
  distancia: "1.2 km",
  distanciaKm: 1.2,
  imagen: fotoTienda,
};

export const sucursales: Tienda[] = [
  tiendaCercana,
  { id: "t2", unidad: "Kelder", nombre: "Kelder Plaza Forum", ciudad: "Mazatlán", horario: "10:00 – 22:00", abierta: true, distancia: "2.4 km", distanciaKm: 2.4 },
  { id: "t3", unidad: "CalzzaSport", nombre: "CalzzaSport Centro", ciudad: "Mazatlán", horario: "10:00 – 20:00", abierta: false, distancia: "3.4 km", distanciaKm: 3.4 },
  { id: "t4", unidad: "Urbanna", nombre: "Urbanna Paseo Mochis", ciudad: "Los Mochis", horario: "9:00 – 21:00", abierta: true, distancia: "5.1 km", distanciaKm: 5.1 },
  { id: "t5", unidad: "CalzaKids", nombre: "CalzaKids Galerías", ciudad: "Mazatlán", horario: "10:00 – 21:00", abierta: true, distancia: "6.2 km", distanciaKm: 6.2 },
  { id: "t6", unidad: "Calzzapato", nombre: "Calzzapato Plaza Palmares", ciudad: "Los Mochis", horario: "9:00 – 21:00", abierta: true, distancia: "7.0 km", distanciaKm: 7.0 },
];

export interface Campania {
  id: string;
  etiqueta: string;
  titulo: string;
  detalle: string;
  cta: string;
  imagen?: string;
}

// Reusable temporary-campaign slot (Regreso a clases, Buen Fin, Navidad, lanzamientos…).
// The photography carries the concept; the copy stays minimal.
export const campaniaDestacada: Campania = {
  id: "camp1",
  etiqueta: "Regreso a clases",
  titulo: "Listos para volver",
  detalle: "Encuentra tenis para este regreso a clases en las tiendas del grupo.",
  cta: "Ver colección",
  imagen: campanaRegreso,
};

// Ecosystem search — recent queries the member actually ran (nav search initial state).
export const busquedasRecientes = ["adidas Forum Low", "Kelder Plaza Forum", "Cloud 5"];

export type ActividadTipo = "compra" | "vale" | "canje";

export interface Actividad {
  id: string;
  tipo: ActividadTipo;
  titulo: string;
  detalle: string;
  tiempo: string;
  monto: string;
  positivo: boolean;
  nuevo?: boolean;
}

export const actividad: Actividad[] = [
  {
    id: "act1",
    tipo: "vale",
    titulo: "Recibiste un vale de regalo",
    detalle: "Disponible para tu próxima compra",
    tiempo: "Hace 2 horas",
    monto: "+$450",
    positivo: true,
    nuevo: true,
  },
  {
    id: "act2",
    tipo: "compra",
    titulo: "Compraste en Adidas Galerías Mazatlán",
    detalle: "Ganaste $45 de cashback",
    tiempo: "Hace 3 días",
    monto: "+$45",
    positivo: true,
  },
  {
    id: "act3",
    tipo: "canje",
    titulo: "Usaste $120 de cashback",
    detalle: "Compra realizada correctamente",
    tiempo: "Hace una semana",
    monto: "-$120",
    positivo: false,
  },
  {
    id: "act4",
    tipo: "compra",
    titulo: "Compraste en Kelder MyE Paseo Mochis",
    detalle: "Ganaste $62 de cashback",
    tiempo: "16 nov 2025",
    monto: "+$62",
    positivo: true,
  },
];

/**
 * CrediVales — individual digital credentials, a product SEPARATE from Crédito Kelder.
 * Each CrediVale is its own card: folio, monto autorizado, titular, celular, vigencia,
 * estado and postergado. Never summed together and never mixed with Crédito Kelder's
 * saldo/pagos. The real CrediVale credential is the visual reference.
 */
export const vales: Vale[] = [
  // ── DISPONIBLES · not yet used → no payments, no progress, no debt ──
  {
    id: "v1",
    tipo: "credivale",
    monto: 500,
    disponible: 500,
    utilizado: 0,
    estado: "disponible",
    mayorista: "Calzzapato",
    mayoristaPersona: "Carlos Pérez",
    folio: "•••• 6190",
    titular: "ANA VICTORIA ARAGÓN GÓMEZ",
    celular: "667 100 3010",
    postergado: false,
    fechaEmision: "02 ago 2026",
    fechaVigencia: "02 nov 2026",
    movimientos: [{ id: "m1", concepto: "CrediVale emitido", fecha: "02 ago 2026", monto: 500, tipo: "emision" }],
    compras: [],
  },
  {
    id: "v2",
    tipo: "credivale",
    monto: 750,
    disponible: 750,
    utilizado: 0,
    estado: "disponible",
    mayorista: "Kelder",
    mayoristaPersona: "Ana López",
    folio: "•••• 4102",
    titular: "ANA VICTORIA ARAGÓN GÓMEZ",
    celular: "667 100 3010",
    postergado: false,
    fechaEmision: "10 ago 2026",
    fechaVigencia: "18 dic 2026",
    movimientos: [{ id: "m1", concepto: "CrediVale emitido", fecha: "10 ago 2026", monto: 750, tipo: "emision" }],
    compras: [],
  },
  // ── EN PAGO · already used → quincenal payments, progress, pending balance ──
  {
    id: "v3",
    tipo: "credivale",
    monto: 1540,
    disponible: 0,
    utilizado: 1240,
    estado: "en_pago",
    mayorista: "Calzzapato",
    mayoristaPersona: "Carlos Pérez",
    folio: "•••• 2845",
    titular: "ANA VICTORIA ARAGÓN GÓMEZ",
    celular: "667 100 3010",
    postergado: false,
    fechaEmision: "18 jul 2026",
    fechaVigencia: "18 ene 2027",
    saldoPendiente: 930,
    proximoPago: { monto: 310, fecha: "15 ago", enDias: 8 },
    pagoActual: 2,
    pagosTotales: 4,
    // Used $1,240 of a $1,540 CrediVale → the $300 left over became an Extravale (available).
    extravaleId: "ev1",
    extravaleMonto: 300,
    pagos: [
      { id: "v3p1", numero: 1, fecha: "31 jul 2026", monto: 310, estado: "pagado" },
      { id: "v3p2", numero: 2, fecha: "15 ago 2026", monto: 310, estado: "proximo" },
      { id: "v3p3", numero: 3, fecha: "30 ago 2026", monto: 310, estado: "pendiente" },
      { id: "v3p4", numero: 4, fecha: "14 sep 2026", monto: 310, estado: "pendiente" },
    ],
    movimientos: [
      { id: "m1", concepto: "CrediVale emitido", fecha: "18 jul 2026", monto: 1540, tipo: "emision" },
      { id: "m2", concepto: "Compra en Calzzapato Galerías", fecha: "20 jul 2026", monto: 1240, tipo: "uso" },
      { id: "m3", concepto: "Extravale generado por saldo restante", fecha: "20 jul 2026", monto: 300, tipo: "emision" },
    ],
    compras: [{ id: "cv3", tienda: "Calzzapato Galerías Mazatlán", fecha: "20 jul 2026", monto: 1240 }],
  },
  // ── EXTRAVALE · leftover AVAILABLE balance from a used CrediVale (NOT a debt) ──
  {
    id: "ev1",
    tipo: "credivale",
    monto: 300,
    disponible: 300,
    utilizado: 0,
    estado: "extravale",
    mayorista: "Calzzapato",
    mayoristaPersona: "Carlos Pérez",
    folio: "•••• 9021",
    titular: "ANA VICTORIA ARAGÓN GÓMEZ",
    celular: "667 100 3010",
    postergado: false,
    fechaEmision: "20 jul 2026",
    fechaVigencia: "18 ene 2027",
    origenId: "v3",
    origenFolio: "•••• 2845",
    movimientos: [{ id: "m1", concepto: "Extravale generado por saldo restante de CrediVale •••• 2845", fecha: "20 jul 2026", monto: 300, tipo: "emision" }],
    compras: [],
  },
  {
    id: "v4",
    tipo: "credivale",
    monto: 4000,
    disponible: 280,
    utilizado: 3720,
    estado: "en_pago",
    mayorista: "Kelder",
    mayoristaPersona: "Ana López",
    folio: "•••• 7710",
    titular: "ANA VICTORIA ARAGÓN GÓMEZ",
    celular: "667 100 3010",
    postergado: false,
    fechaEmision: "16 jul 2026",
    fechaVigencia: "16 ene 2027",
    saldoPendiente: 2480,
    proximoPago: { monto: 620, fecha: "15 ago", enDias: 8 },
    pagoActual: 3,
    pagosTotales: 6,
    pagos: [
      { id: "v4p1", numero: 1, fecha: "16 jul 2026", monto: 620, estado: "pagado" },
      { id: "v4p2", numero: 2, fecha: "31 jul 2026", monto: 620, estado: "pagado" },
      { id: "v4p3", numero: 3, fecha: "15 ago 2026", monto: 620, estado: "proximo" },
      { id: "v4p4", numero: 4, fecha: "30 ago 2026", monto: 620, estado: "pendiente" },
      { id: "v4p5", numero: 5, fecha: "14 sep 2026", monto: 620, estado: "pendiente" },
      { id: "v4p6", numero: 6, fecha: "29 sep 2026", monto: 620, estado: "pendiente" },
    ],
    movimientos: [
      { id: "m1", concepto: "CrediVale emitido", fecha: "16 jul 2026", monto: 4000, tipo: "emision" },
      { id: "m2", concepto: "Compra en Kelder Plaza Forum", fecha: "18 jul 2026", monto: 3720, tipo: "uso" },
    ],
    compras: [{ id: "cv4", tienda: "Kelder Plaza Forum", fecha: "18 jul 2026", monto: 3720 }],
  },
  // ── VENCIDO · expired without being used → no payments ──
  {
    id: "v5",
    tipo: "credivale",
    monto: 150,
    disponible: 150,
    utilizado: 0,
    estado: "vencido",
    mayorista: "Urbanna",
    mayoristaPersona: "Ana López",
    folio: "•••• 3098",
    titular: "ANA VICTORIA ARAGÓN GÓMEZ",
    celular: "667 100 3010",
    postergado: false,
    fechaEmision: "02 mar 2026",
    fechaVigencia: "02 jun 2026",
    movimientos: [{ id: "m1", concepto: "CrediVale emitido", fecha: "02 mar 2026", monto: 150, tipo: "emision" }],
    compras: [],
  },
];

// CrediVales currently EN PAGO (used → generating quincenal payments). Powers the Home
// "Tus CrediVales" compromisos, the "En pago" tab summary and the count. Soonest first.
export const credivalesEnPago = vales
  .filter((v) => v.estado === "en_pago")
  .sort((a, b) => (a.proximoPago?.enDias ?? 99) - (b.proximoPago?.enDias ?? 99));

// CrediVales DISPONIBLES (unused → NOT a debt). Shown apart from the en-pago ones so an
// available voucher is never read as money owed.
export const credivalesDisponibles = vales.filter((v) => v.estado === "disponible");
export const resumenCrediValesDisponibles = {
  count: credivalesDisponibles.length,
  total: credivalesDisponibles.reduce((s, v) => s + v.monto, 0),
};

// Extravales — leftover AVAILABLE balances (never a debt). Live in their own tab.
export const extravales = vales.filter((v) => v.estado === "extravale");
export function valePorId(id?: string) {
  return vales.find((v) => v.id === id);
}

/**
 * Summary of the member's EN PAGO CrediVales — a distinct figure from Crédito Kelder.
 * "Próxima quincena" sums only the payments that fall in the soonest fortnight, so the user
 * sees exactly what to pay next (e.g. $310 + $620 = $930).
 */
export const resumenCrediVales = (() => {
  const enPago = credivalesEnPago;
  const saldoPendiente = enPago.reduce((s, v) => s + (v.saldoPendiente ?? 0), 0);
  const proximaFecha = enPago[0]?.proximoPago?.fecha ?? "—";
  const proximaQuincena = enPago
    .filter((v) => v.proximoPago?.fecha === proximaFecha)
    .reduce((s, v) => s + (v.proximoPago?.monto ?? 0), 0);
  return { saldoPendiente, proximaQuincena, proximaFecha, enPago: enPago.length };
})();

export const compras: Compra[] = [
  {
    id: "c1",
    tienda: "Calzzapato Galerías Mazatlán",
    canal: "tienda",
    fecha: "12 jul 2026",
    ticket: "#458721",
    cashback: 217,
    items: [
      { marca: "New Balance", modelo: "530", imagen: prodNb530, talla: 27, cantidad: 1, precioUnitario: 2199 },
      { marca: "Puma", modelo: "Suede Classic", imagen: prodPuma, talla: 26, cantidad: 1, precioUnitario: 1299 },
      { marca: "Converse", modelo: "Chuck 70", imagen: prodConverse, talla: 24, cantidad: 1, precioUnitario: 849 },
    ],
  },
  {
    id: "c2",
    tienda: "Kelder.com",
    canal: "linea",
    estado: "En camino",
    fecha: "05 ago 2026",
    ticket: "#A-100923",
    cashback: 45,
    items: [{ marca: "Adidas", modelo: "Ultraboost Light", imagen: pedidoAdidas, talla: 27, cantidad: 1, precioUnitario: 900 }],
  },
  {
    id: "c3",
    tienda: "CalzzaSport Centro",
    canal: "tienda",
    fecha: "16 nov 2025",
    ticket: "#451205",
    cashback: 38,
    items: [{ marca: "Asics", modelo: "Gel-1130", imagen: prodAsics, talla: 28, cantidad: 1, precioUnitario: 760 }],
  },
  {
    id: "c4",
    tienda: "Kelder.com",
    canal: "linea",
    estado: "Entregado",
    fecha: "18 oct 2025",
    ticket: "#A-098877",
    cashback: 30,
    items: [{ marca: "On", modelo: "Cloud 5", imagen: prodOn, talla: 26, cantidad: 1, precioUnitario: 600 }],
  },
];

// Compact summary for the Mis compras header. Generado = sum of purchase cashback.
export const resumenCompras = {
  cashbackDisponible: 245,
  cashbackGenerado: compras.reduce((s, c) => s + c.cashback, 0),
  comprasRealizadas: compras.length,
};

export const movimientosCashback: MovimientoCashback[] = [
  { id: "m1", tienda: "Adidas Galerías Mazatlán", fecha: "12 jul 2026", monto: 45, tipo: "ingreso" },
  { id: "m2", tienda: "Canje en línea · Calzzapato", fecha: "02 jun 2026", monto: 120, tipo: "egreso" },
  { id: "m3", tienda: "Kelder MyE Paseo Mochis", fecha: "16 nov 2025", monto: 62, tipo: "ingreso" },
  { id: "m4", tienda: "Adidas Plaza Palmares", fecha: "30 dic 2025", monto: 28, tipo: "ingreso" },
  { id: "m5", tienda: "Adidas Paseo Mochis", fecha: "18 oct 2025", monto: 10, tipo: "ingreso" },
];

// Full searchable catalog across the group's stores. First 6 keep their ids/images (used by
// Home "Recomendados" and product detail); the rest broaden departments, types and stores so
// the search filters have something real to act on.
export const catalogo: Producto[] = [
  { id: "p1", marca: "On", modelo: "Cloud 5", precio: 2449, imagen: prodOn, categoria: "Running", color: "Blanco", tallas: [25, 26, 27, 28], tiendas: 3, departamento: "Mujer", tipo: "Calzado", unidad: "Kelder", disponible: true, orden: 16 },
  { id: "p2", marca: "Puma", modelo: "Suede Classic", precio: 1499, imagen: prodPuma, categoria: "Lifestyle", color: "Negro", tallas: [24, 25, 26, 27], tiendas: 5, departamento: "Hombre", tipo: "Calzado", unidad: "CalzzaSport", disponible: true, orden: 12 },
  { id: "p3", marca: "Converse", modelo: "Chuck 70", precio: 1699, imagen: prodConverse, categoria: "Lifestyle", color: "Negro", tallas: [23, 24, 25, 26, 27], tiendas: 2, departamento: "Mujer", tipo: "Calzado", unidad: "Urbanna", disponible: true, orden: 11 },
  { id: "p4", marca: "Asics", modelo: "Gel-1130", precio: 2199, imagen: prodAsics, categoria: "Running", color: "Plata", tallas: [26, 27, 28, 29], tiendas: 6, departamento: "Hombre", tipo: "Calzado", unidad: "Calzzapato", disponible: true, orden: 9 },
  { id: "p5", marca: "New Balance", modelo: "530", precio: 2499, imagen: prodNb530, categoria: "Running", color: "Blanco", tallas: [24, 25, 26, 27, 28], tiendas: 4, departamento: "Hombre", tipo: "Calzado", unidad: "Calzzapato", disponible: true, orden: 15 },
  { id: "p6", marca: "On", modelo: "Cloudmonster", precio: 3199, imagen: prodOn, categoria: "Running", color: "Gris", tallas: [26, 27, 28], tiendas: 3, departamento: "Mujer", tipo: "Calzado", unidad: "Kelder", disponible: false, orden: 8 },
  { id: "p7", marca: "Adidas", modelo: "Ultraboost Light", precio: 2899, imagen: pedidoAdidas, categoria: "Running", color: "Negro", tallas: [25, 26, 27, 28], tiendas: 4, departamento: "Hombre", tipo: "Calzado", unidad: "Kelder", disponible: true, orden: 14 },
  { id: "p8", marca: "Nike", modelo: "Court Vision", precio: 1799, categoria: "Lifestyle", color: "Blanco", tallas: [24, 25, 26, 27], tiendas: 3, departamento: "Mujer", tipo: "Calzado", unidad: "CalzzaSport", disponible: true, orden: 13 },
  { id: "p9", marca: "Nike", modelo: "Revolution 7", precio: 1599, categoria: "Running", color: "Negro", tallas: [25, 26, 27, 28, 29], tiendas: 5, departamento: "Hombre", tipo: "Calzado", unidad: "Calzzapato", disponible: true, orden: 10 },
  { id: "p10", marca: "CalzaKids", modelo: "Runner Jr", precio: 699, categoria: "Lifestyle", color: "Blanco", tallas: [18, 19, 20, 21, 22], tiendas: 4, departamento: "Niños", tipo: "Calzado", unidad: "CalzaKids", disponible: true, orden: 7 },
  { id: "p11", marca: "Puma", modelo: "Sudadera Essentials", precio: 899, categoria: "Ropa", color: "Negro", tallasRopa: ["S", "M", "L", "XL"], tiendas: 3, departamento: "Hombre", tipo: "Ropa", unidad: "CalzzaSport", disponible: true, orden: 6 },
  { id: "p12", marca: "Nike", modelo: "Playera Sportswear", precio: 599, categoria: "Ropa", color: "Blanco", tallasRopa: ["XS", "S", "M", "L"], tiendas: 4, departamento: "Mujer", tipo: "Ropa", unidad: "Urbanna", disponible: true, orden: 5 },
  { id: "p13", marca: "Adidas", modelo: "Pants Tiro", precio: 1099, categoria: "Ropa", color: "Negro", tallasRopa: ["S", "M", "L", "XL"], tiendas: 2, departamento: "Hombre", tipo: "Ropa", unidad: "Kelder", disponible: false, orden: 4 },
  { id: "p14", marca: "Urbanna", modelo: "Gorra Logo", precio: 399, categoria: "Accesorios", color: "Negro", tallasRopa: ["Única"], tiendas: 3, departamento: "Hombre", tipo: "Accesorios", unidad: "Urbanna", disponible: true, orden: 3 },
  { id: "p15", marca: "Kelder", modelo: "Mochila Urbana", precio: 799, categoria: "Accesorios", color: "Gris", tallasRopa: ["Única"], tiendas: 5, departamento: "Mujer", tipo: "Accesorios", unidad: "Kelder", disponible: true, orden: 2 },
  { id: "p16", marca: "CalzaKids", modelo: "Tenis Escolar", precio: 549, categoria: "Lifestyle", color: "Negro", tallas: [17, 18, 19, 20, 21], tiendas: 4, departamento: "Niños", tipo: "Calzado", unidad: "CalzaKids", disponible: true, orden: 1 },
];

// Search-filter vocabularies (order matters for the UI). Sizes are category-aware.
export const departamentos: Departamento[] = ["Mujer", "Hombre", "Niños"];
export const tiposProducto: TipoProducto[] = ["Calzado", "Ropa", "Accesorios"];
export const marcasBusqueda = ["Nike", "Adidas", "Puma", "On", "New Balance", "Asics", "Converse", "CalzaKids", "Urbanna", "Kelder"];
export const coloresBusqueda = ["Blanco", "Negro", "Gris", "Plata"];
export const tallasCalzado = ["17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"];
export const tallasRopa = ["XS", "S", "M", "L", "XL", "XXL"];
export const tallasAccesorio = ["Única"];

export interface RangoPrecio {
  id: string;
  label: string;
  min: number;
  max: number; // Infinity for open-ended
}
export const rangosPrecio: RangoPrecio[] = [
  { id: "r1", label: "Hasta $1,000", min: 0, max: 1000 },
  { id: "r2", label: "$1,000 – $2,000", min: 1000, max: 2000 },
  { id: "r3", label: "$2,000 – $3,000", min: 2000, max: 3000 },
  { id: "r4", label: "Más de $3,000", min: 3000, max: Infinity },
];

// Category-aware size options for the Talla filter.
export function tallasDeTipo(tipo: TipoProducto | null): string[] {
  if (tipo === "Ropa") return tallasRopa;
  if (tipo === "Accesorios") return tallasAccesorio;
  return tallasCalzado; // Calzado or unspecified
}

// All sizes a product offers, as strings (footwear numbers + apparel letters).
export function tallasDeProducto(p: Producto): string[] {
  return [...(p.tallas ?? []).map(String), ...(p.tallasRopa ?? [])];
}

// Home "Recomendados para ti" — a curated subset of the catalog.
export const recomendaciones: Producto[] = catalogo.slice(0, 4);

// Discreet suggested searches for the product search initial state.
export const busquedasSugeridas = ["Tenis para correr", "Nike blancos", "Bolsa negra", "Calzado para niño"];

export const tiendasEnLinea = [
  { id: "calzzapato", nombre: "Calzzapato", dominio: "calzzapato.com" },
  { id: "kelder", nombre: "Kelder", dominio: "kelder.mx" },
  { id: "calzzasport", nombre: "CalzzaSport", dominio: "calzzasport.com" },
  { id: "urbanna", nombre: "Urbanna", dominio: "urbanna.mx" },
  { id: "atok", nombre: "Atok", dominio: "atok.mx" },
];

export function formatMXN(value: number) {
  return value.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}

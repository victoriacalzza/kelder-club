export type ValeEstado = "activo" | "por_vencer" | "usado" | "vencido";
export type ValeTipo = "vale" | "credivale";

export interface ValeMovimiento {
  id: string;
  concepto: string;
  fecha: string;
  monto: number;
  tipo: "emision" | "uso";
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

export interface Producto {
  id: string;
  marca: string;
  modelo: string;
  precio: number;
  imagen?: string;
  categoria?: string;
  color?: string;
  tallas?: number[];
  tiendas?: number; // number of group stores where it's available
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
  producto: string;
  marca: string;
  estado: string;
  fechaEntrega: string;
  imagen?: string;
}

export const pedidoActivo: Pedido = {
  id: "ped1",
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
  {
    id: "v1",
    tipo: "credivale",
    monto: 500,
    disponible: 500,
    utilizado: 0,
    estado: "activo",
    mayorista: "Calzzapato",
    mayoristaPersona: "Carlos Pérez",
    folio: "•••• 2845",
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
    monto: 1000,
    disponible: 350,
    utilizado: 650,
    estado: "por_vencer",
    mayorista: "Kelder",
    mayoristaPersona: "Ana López",
    folio: "•••• 7710",
    titular: "ANA VICTORIA ARAGÓN GÓMEZ",
    celular: "667 100 3010",
    postergado: true,
    fechaEmision: "14 jul 2026",
    fechaVigencia: "10 ago 2026",
    movimientos: [
      { id: "m1", concepto: "CrediVale emitido", fecha: "14 jul 2026", monto: 1000, tipo: "emision" },
      { id: "m2", concepto: "Compra en Kelder Plaza Forum", fecha: "22 jul 2026", monto: 650, tipo: "uso" },
    ],
    compras: [{ id: "cv2", tienda: "Kelder Plaza Forum", fecha: "22 jul 2026", monto: 650 }],
  },
  {
    id: "v3",
    tipo: "credivale",
    monto: 300,
    disponible: 0,
    utilizado: 300,
    estado: "usado",
    mayorista: "CalzzaSport",
    mayoristaPersona: "Carlos Pérez",
    folio: "•••• 5521",
    titular: "ANA VICTORIA ARAGÓN GÓMEZ",
    celular: "667 100 3010",
    postergado: false,
    fechaEmision: "18 jun 2026",
    fechaVigencia: "18 sep 2026",
    movimientos: [
      { id: "m1", concepto: "CrediVale emitido", fecha: "18 jun 2026", monto: 300, tipo: "emision" },
      { id: "m2", concepto: "Compra en CalzzaSport Centro", fecha: "25 jun 2026", monto: 300, tipo: "uso" },
    ],
    compras: [{ id: "cv3", tienda: "CalzzaSport Centro", fecha: "25 jun 2026", monto: 300 }],
  },
  {
    id: "v4",
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

// Full searchable catalog across the group's stores.
export const catalogo: Producto[] = [
  { id: "p1", marca: "On", modelo: "Cloud 5", precio: 2449, imagen: prodOn, categoria: "Running", color: "Blanco", tallas: [25, 26, 27, 28], tiendas: 3 },
  { id: "p2", marca: "Puma", modelo: "Suede Classic", precio: 1499, imagen: prodPuma, categoria: "Lifestyle", color: "Negro", tallas: [24, 25, 26, 27], tiendas: 5 },
  { id: "p3", marca: "Converse", modelo: "Chuck 70", precio: 1699, imagen: prodConverse, categoria: "Lifestyle", color: "Negro", tallas: [23, 24, 25, 26, 27], tiendas: 2 },
  { id: "p4", marca: "Asics", modelo: "Gel-1130", precio: 2199, imagen: prodAsics, categoria: "Running", color: "Plata", tallas: [26, 27, 28, 29], tiendas: 6 },
  { id: "p5", marca: "New Balance", modelo: "530", precio: 2499, imagen: prodNb530, categoria: "Running", color: "Blanco", tallas: [24, 25, 26, 27, 28], tiendas: 4 },
  { id: "p6", marca: "On", modelo: "Cloudmonster", precio: 3199, imagen: prodOn, categoria: "Running", color: "Gris", tallas: [26, 27, 28], tiendas: 3 },
];

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

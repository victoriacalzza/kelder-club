export type ValeEstado = "activo" | "por_vencer" | "usado" | "vencido";
export type ValeTipo = "vale" | "credivale";

export interface Vale {
  id: string;
  tipo: ValeTipo;
  monto: number;
  estado: ValeEstado;
  mayorista: string;
  fechaEmision: string;
  fechaVigencia: string;
}

export type CompraCanal = "tienda" | "linea";
export type CompraEstado = "Preparando" | "Enviado" | "En camino" | "Entregado";

export interface Compra {
  id: string;
  producto: string;
  marca: string;
  sucursal: string; // display name of the store or online channel
  canal: CompraCanal;
  estado?: CompraEstado; // only for online orders
  fecha: string;
  monto: number;
  cashback: number;
  imagen?: string;
  ticketUrl: string;
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

export interface Tienda {
  id: string;
  nombre: string;
  horario: string;
  abierta: boolean;
  distancia: string;
  imagen?: string;
}

export const tiendaCercana: Tienda = {
  id: "t1",
  nombre: "Kelder Plaza Forum",
  horario: "9:00 – 21:00",
  abierta: true,
  distancia: "1.2 km",
  imagen: fotoTienda,
};

export const sucursales: Tienda[] = [
  tiendaCercana,
  { id: "t2", nombre: "Kelder Galerías Mazatlán", horario: "10:00 – 22:00", abierta: true, distancia: "3.4 km" },
  { id: "t3", nombre: "Calzzapato Paseo Mochis", horario: "9:00 – 21:00", abierta: true, distancia: "5.1 km" },
  { id: "t4", nombre: "CalzzaSport Centro", horario: "10:00 – 20:00", abierta: false, distancia: "6.8 km" },
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

export const vales: Vale[] = [
  {
    id: "v1",
    tipo: "vale",
    monto: 500,
    estado: "activo",
    mayorista: "Calzzapato",
    fechaEmision: "02 ago 2026",
    fechaVigencia: "02 nov 2026",
  },
  {
    id: "v2",
    tipo: "vale",
    monto: 450,
    estado: "por_vencer",
    mayorista: "Kelder",
    fechaEmision: "14 jul 2026",
    fechaVigencia: "10 ago 2026",
  },
  {
    id: "v3",
    tipo: "vale",
    monto: 300,
    estado: "usado",
    mayorista: "CalzzaSport",
    fechaEmision: "18 jun 2026",
    fechaVigencia: "18 sep 2026",
  },
  {
    id: "v4",
    tipo: "vale",
    monto: 150,
    estado: "vencido",
    mayorista: "Urbanna",
    fechaEmision: "02 mar 2026",
    fechaVigencia: "02 jun 2026",
  },
];

export const compras: Compra[] = [
  { id: "c1", producto: "Cloud 5", marca: "On", sucursal: "Kelder.com", canal: "linea", estado: "En camino", fecha: "12 jul 2026", monto: 2449, cashback: 122, imagen: prodOn, ticketUrl: "#" },
  { id: "c2", producto: "Suede Classic", marca: "Puma", sucursal: "Kelder Plaza Forum", canal: "tienda", fecha: "16 nov 2025", monto: 1499, cashback: 75, imagen: prodPuma, ticketUrl: "#" },
  { id: "c3", producto: "Chuck 70", marca: "Converse", sucursal: "CalzzaSport Centro", canal: "tienda", fecha: "30 dic 2025", monto: 1699, cashback: 85, imagen: prodConverse, ticketUrl: "#" },
  { id: "c4", producto: "Gel-1130", marca: "Asics", sucursal: "Kelder.com", canal: "linea", estado: "Entregado", fecha: "18 oct 2025", monto: 2199, cashback: 110, imagen: prodAsics, ticketUrl: "#" },
];

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

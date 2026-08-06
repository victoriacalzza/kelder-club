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

export interface Compra {
  id: string;
  sucursal: string;
  fecha: string;
  monto: number;
  cashback: number;
  ticketUrl: string;
}

export interface MovimientoCashback {
  id: string;
  tienda: string;
  fecha: string;
  monto: number;
  tipo: "ingreso" | "egreso";
}

export interface Producto {
  id: string;
  marca: string;
  modelo: string;
  precio: number;
}

export const user = {
  nombre: "Ana",
  nombreCompleto: "Ana Victoria Aragón Gómez",
  correo: "anavaragong@gmail.com",
};

// Only what the product actually has today: cashback, vales, purchases.
// CrediVale, payments and credit limits are FUTURE features — intentionally absent.
export const cuenta = {
  cashbackDisponible: 245,
  ultimaCompra: { monto: 899, fecha: "hace 3 días", sucursal: "Adidas Galerías Mazatlán" },
  valesActivos: 2,
  beneficio: "Gana cashback en cada compra del grupo",
};

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
    tipo: "credivale",
    monto: 2500,
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
  { id: "c1", sucursal: "Adidas Galerías Mazatlán", fecha: "12 jul 2026", monto: 899, cashback: 45, ticketUrl: "#" },
  { id: "c2", sucursal: "Kelder MyE Paseo Mochis", fecha: "16 nov 2025", monto: 1240, cashback: 62, ticketUrl: "#" },
  { id: "c3", sucursal: "Adidas Plaza Palmares", fecha: "30 dic 2025", monto: 560, cashback: 28, ticketUrl: "#" },
  { id: "c4", sucursal: "Adidas Paseo Mochis", fecha: "18 oct 2025", monto: 210, cashback: 10, ticketUrl: "#" },
  { id: "c5", sucursal: "Zamba Los Mochis", fecha: "08 mar 2025", monto: 780, cashback: 39, ticketUrl: "#" },
];

export const movimientosCashback: MovimientoCashback[] = [
  { id: "m1", tienda: "Adidas Galerías Mazatlán", fecha: "12 jul 2026", monto: 45, tipo: "ingreso" },
  { id: "m2", tienda: "Canje en línea · Calzzapato", fecha: "02 jun 2026", monto: 120, tipo: "egreso" },
  { id: "m3", tienda: "Kelder MyE Paseo Mochis", fecha: "16 nov 2025", monto: 62, tipo: "ingreso" },
  { id: "m4", tienda: "Adidas Plaza Palmares", fecha: "30 dic 2025", monto: 28, tipo: "ingreso" },
  { id: "m5", tienda: "Adidas Paseo Mochis", fecha: "18 oct 2025", monto: 10, tipo: "ingreso" },
];

export const recomendaciones: Producto[] = [
  { id: "p1", marca: "Adidas", modelo: "Core Black / Cloud White", precio: 1299 },
  { id: "p2", marca: "Asics", modelo: "Clay Grey / Pure Silver", precio: 1899 },
  { id: "p3", marca: "On Cloud", modelo: "Eclipse / Black", precio: 2450 },
  { id: "p4", marca: "Flexi", modelo: "Negro formal", precio: 999 },
];

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

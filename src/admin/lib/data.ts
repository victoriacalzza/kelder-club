/**
 * Datos de ejemplo del backoffice (prototipo). Representan cómo se verían los registros
 * gestionados desde el sistema. Lo marcado como "solo lectura" simula datos que en producción
 * vendrían de otros sistemas (catálogo, maestro de tiendas, segmentación real).
 */

export type Estado = "borrador" | "programado" | "publicado" | "pausado" | "finalizado";
export type Canal = "tienda" | "online" | "ambos";

export interface Banner {
  id: string;
  nombre: string;
  ubicaciones: string[];
  audiencia: string;
  desde: string;
  hasta: string | null;
  estado: Estado;
  modificado: string;
  modificadoPor: string;
  imagenMobile: boolean;
  destino: string | null;
}

export const banners: Banner[] = [
  { id: "b1", nombre: "Regreso a Clases 2026", ubicaciones: ["Home app", "Home web", "Landing"], audiencia: "Todos", desde: "12 ago 2026", hasta: "31 ago 2026", estado: "publicado", modificado: "Hoy, 09:14", modificadoPor: "Victoria", imagenMobile: true, destino: "/promociones" },
  { id: "b2", nombre: "Buen Fin — Adelanto", ubicaciones: ["Home app"], audiencia: "Clientes con Crédito Kelder", desde: "01 nov 2026", hasta: "18 nov 2026", estado: "programado", modificado: "Ayer, 17:40", modificadoPor: "Mercadotecnia", imagenMobile: false, destino: "/promociones" },
  { id: "b3", nombre: "Nueva colección Running", ubicaciones: ["Home web", "Landing"], audiencia: "Por unidad de negocio", desde: "05 ago 2026", hasta: "20 ago 2026", estado: "publicado", modificado: "Lun, 11:02", modificadoPor: "Ecommerce", imagenMobile: true, destino: "/catalogo" },
  { id: "b4", nombre: "Aniversario Calzzapato", ubicaciones: ["Home app", "Home web"], audiencia: "Todos", desde: "—", hasta: "—", estado: "borrador", modificado: "Vie, 08:22", modificadoPor: "Victoria", imagenMobile: false, destino: null },
  { id: "b5", nombre: "Liquidación temporada", ubicaciones: ["Landing"], audiencia: "Por ciudad/plaza", desde: "01 jul 2026", hasta: "31 jul 2026", estado: "finalizado", modificado: "01 ago 2026", modificadoPor: "Mercadotecnia", imagenMobile: true, destino: "/promociones" },
  { id: "b6", nombre: "Promo Urbanna", ubicaciones: ["Home app"], audiencia: "Todos", desde: "10 ago 2026", hasta: "—", estado: "pausado", modificado: "Mar, 14:10", modificadoPor: "Ecommerce", imagenMobile: true, destino: "/tiendas" },
];

export interface Promocion {
  id: string;
  nombre: string;
  beneficio: string;
  canal: Canal;
  tiendas: string;
  desde: string;
  hasta: string | null;
  estado: Estado;
  unidad: string;
}

export const promociones: Promocion[] = [
  { id: "p1", nombre: "20% en Nike seleccionados", beneficio: "20% descuento", canal: "ambos", tiendas: "Todas", desde: "10 ago 2026", hasta: "24 ago 2026", estado: "publicado", unidad: "Calzzapato" },
  { id: "p2", nombre: "2x1 en calcetería", beneficio: "2x1", canal: "tienda", tiendas: "12 tiendas", desde: "15 ago 2026", hasta: "18 ago 2026", estado: "programado", unidad: "Calzzasport" },
  { id: "p3", nombre: "Envío gratis +$999", beneficio: "Envío gratis", canal: "online", tiendas: "Ecommerce", desde: "01 ago 2026", hasta: null, estado: "publicado", unidad: "Todas" },
  { id: "p4", nombre: "Precio especial mochilas", beneficio: "Precio especial", canal: "tienda", tiendas: "8 tiendas", desde: "—", hasta: "—", estado: "borrador", unidad: "CalzaKids" },
  { id: "p5", nombre: "15% miembros Kelder Club+", beneficio: "15% descuento", canal: "ambos", tiendas: "Todas", desde: "20 jul 2026", hasta: "05 ago 2026", estado: "finalizado", unidad: "Kelder" },
];

export interface HomeBloque {
  id: string;
  nombre: string;
  tipo: string;
  activo: boolean;
  programado: string | null;
  bloqueado?: boolean; // estructura fija que no debe romperse
}

export const homeBloques: HomeBloque[] = [
  { id: "h1", nombre: "Hero / Saldo", tipo: "Sistema", activo: true, programado: null, bloqueado: true },
  { id: "h2", nombre: "Campaña principal", tipo: "Banner", activo: true, programado: "Hasta 31 ago" },
  { id: "h3", nombre: "Novedades en tu tienda", tipo: "Productos", activo: true, programado: null },
  { id: "h4", nombre: "Promociones", tipo: "Promos", activo: true, programado: null },
  { id: "h5", nombre: "Colección destacada", tipo: "Colección", activo: false, programado: null },
  { id: "h6", nombre: "Tienda seleccionada", tipo: "Módulo", activo: true, programado: null },
  { id: "h7", nombre: "Bloque informativo", tipo: "Editorial", activo: false, programado: "Desde 01 sep" },
];

export interface ProductoDestacado {
  id: string;
  sku: string;
  nombre: string;
  marca: string;
  categoria: string;
  campania: string | null;
  orden: number;
  vigencia: string;
  disponibilidad: string; // solo lectura (viene del catálogo)
}

export const productosDestacados: ProductoDestacado[] = [
  { id: "d1", sku: "NB-530-WHT", nombre: "New Balance 530", marca: "New Balance", categoria: "Running", campania: "Nuevos ingresos", orden: 1, vigencia: "Hasta 31 ago", disponibilidad: "En 24 tiendas" },
  { id: "d2", sku: "AD-UB-LGT", nombre: "Adidas Ultraboost Light", marca: "Adidas", categoria: "Running", campania: "Running", orden: 2, vigencia: "Sin término", disponibilidad: "En 12 tiendas" },
  { id: "d3", sku: "ON-CL5-BLK", nombre: "On Cloud 5", marca: "On", categoria: "Lifestyle", campania: null, orden: 3, vigencia: "Hasta 20 ago", disponibilidad: "Por solicitud" },
];

export interface Coleccion {
  id: string;
  nombre: string;
  productos: number;
  audiencia: string;
  desde: string;
  hasta: string | null;
  estado: Estado;
}

export const colecciones: Coleccion[] = [
  { id: "c1", nombre: "Regreso a clases", productos: 24, audiencia: "Todos", desde: "01 ago 2026", hasta: "10 sep 2026", estado: "publicado" },
  { id: "c2", nombre: "Nuevos ingresos", productos: 18, audiencia: "Por unidad de negocio", desde: "05 ago 2026", hasta: null, estado: "publicado" },
  { id: "c3", nombre: "Running", productos: 12, audiencia: "Tipo de cliente", desde: "—", hasta: "—", estado: "borrador" },
  { id: "c4", nombre: "Día del padre", productos: 30, audiencia: "Todos", desde: "01 jun 2026", hasta: "18 jun 2026", estado: "finalizado" },
];

export type NotifTipo = "Promoción" | "Cashback/puntos" | "Crédito" | "CrediVale" | "Pedido" | "Tienda" | "General";

export interface Notificacion {
  id: string;
  titulo: string;
  tipo: NotifTipo;
  audiencia: string;
  programacion: string;
  estado: Estado;
  enviadas: number | null;
  aperturas: number | null; // % — null si no hay métrica
}

export const notificaciones: Notificacion[] = [
  { id: "n1", titulo: "¡Llegó el Regreso a Clases!", tipo: "Promoción", audiencia: "Todos", programacion: "12 ago, 10:00", estado: "publicado", enviadas: 48210, aperturas: 22 },
  { id: "n2", titulo: "Tienes $245 de cashback", tipo: "Cashback/puntos", audiencia: "Con saldo > $100", programacion: "Hoy, 18:00", estado: "programado", enviadas: null, aperturas: null },
  { id: "n3", titulo: "Tu CrediVale está por vencer", tipo: "CrediVale", audiencia: "Con CrediVale activo", programacion: "—", estado: "borrador", enviadas: null, aperturas: null },
  { id: "n4", titulo: "Nuevos ingresos Running", tipo: "Promoción", audiencia: "Categoría favorita: Running", programacion: "08 ago, 12:00", estado: "finalizado", enviadas: 12040, aperturas: 31 },
];

export interface LandingBloque {
  id: string;
  nombre: string;
  descripcion: string;
  estado: "Publicado" | "Cambio pendiente";
  actualizado: string;
}

export const landingBloques: LandingBloque[] = [
  { id: "l1", nombre: "Hero", descripcion: "Título, subtítulo y CTAs principales", estado: "Publicado", actualizado: "10 ago 2026" },
  { id: "l2", nombre: "Beneficios", descripcion: "$50 de bienvenida · 10% primera compra", estado: "Publicado", actualizado: "10 ago 2026" },
  { id: "l3", nombre: "Tiendas", descripcion: "Marquee de marcas y logos participantes", estado: "Cambio pendiente", actualizado: "Hoy, 08:40" },
  { id: "l4", nombre: "Cómo funciona", descripcion: "Pasos 01 · 02 · 03", estado: "Publicado", actualizado: "05 ago 2026" },
  { id: "l5", nombre: "Ecommerce", descripcion: "Uso y canje de puntos en línea", estado: "Publicado", actualizado: "06 ago 2026" },
  { id: "l6", nombre: "FAQ", descripcion: "Preguntas frecuentes", estado: "Publicado", actualizado: "06 ago 2026" },
  { id: "l7", nombre: "Contacto", descripcion: "Teléfono 800 927 28 67", estado: "Publicado", actualizado: "07 ago 2026" },
  { id: "l8", nombre: "CTA final", descripcion: "Cierre 'Haz que tu próxima compra cuente'", estado: "Publicado", actualizado: "05 ago 2026" },
];

export interface Tienda {
  id: string;
  nombre: string;
  unidad: string;
  plaza: string;
  direccion: string;
  horario: string;
  telefono: string;
  visible: boolean;
  foto: boolean;
}

export const tiendas: Tienda[] = [
  { id: "t1", nombre: "Calzzapato Galerías", unidad: "Calzzapato", plaza: "Culiacán", direccion: "Blvd. Diego Valadez 1900", horario: "11:00 – 21:00", telefono: "667 123 4567", visible: true, foto: true },
  { id: "t2", nombre: "Kelder Forum", unidad: "Kelder", plaza: "Culiacán", direccion: "Av. Álvaro Obregón 2200", horario: "11:00 – 21:00", telefono: "667 234 5678", visible: true, foto: false },
  { id: "t3", nombre: "Urbanna Centro", unidad: "Urbanna", plaza: "Los Mochis", direccion: "Leyva 450", horario: "10:00 – 20:00", telefono: "668 345 6789", visible: true, foto: true },
  { id: "t4", nombre: "CalzaKids Plaza", unidad: "CalzaKids", plaza: "Mazatlán", direccion: "Av. Reforma 100", horario: "11:00 – 21:00", telefono: "669 456 7890", visible: false, foto: false },
];

export interface AdminUsuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  estado: "Activo" | "Invitado" | "Inactivo";
  ultimoAcceso: string;
}

export const adminUsuarios: AdminUsuario[] = [
  { id: "u1", nombre: "Victoria Calzza", email: "victoria@calzzapato.com", rol: "Administrador general", estado: "Activo", ultimoAcceso: "Hoy, 09:14" },
  { id: "u2", nombre: "Laura Medina", email: "laura.medina@garlo.mx", rol: "Mercadotecnia", estado: "Activo", ultimoAcceso: "Ayer, 18:02" },
  { id: "u3", nombre: "Diego Ortiz", email: "diego.ortiz@garlo.mx", rol: "Ecommerce", estado: "Activo", ultimoAcceso: "Hoy, 08:30" },
  { id: "u4", nombre: "Centro de Contacto", email: "cc@garlo.mx", rol: "Atención al cliente", estado: "Activo", ultimoAcceso: "Lun, 12:00" },
  { id: "u5", nombre: "Auditoría Interna", email: "auditoria@garlo.mx", rol: "Solo lectura", estado: "Invitado", ultimoAcceso: "—" },
];

export interface Auditoria {
  id: string;
  usuario: string;
  accion: string;
  modulo: string;
  registro: string;
  fecha: string;
  antes: string;
  despues: string;
}

export const auditoria: Auditoria[] = [
  { id: "a1", usuario: "Victoria", accion: "Modificó", modulo: "Publicidad", registro: "Banner Regreso a Clases", fecha: "Hoy, 09:14", antes: "Vigencia 30 ago", despues: "Vigencia 31 ago" },
  { id: "a2", usuario: "Mercadotecnia", accion: "Publicó", modulo: "Promociones", registro: "20% Nike seleccionados", fecha: "Hoy, 08:50", antes: "Borrador", despues: "Publicado" },
  { id: "a3", usuario: "Ecommerce", accion: "Creó", modulo: "Colecciones", registro: "Running", fecha: "Ayer, 17:20", antes: "—", despues: "Borrador" },
  { id: "a4", usuario: "Victoria", accion: "Desactivó", modulo: "Home", registro: "Colección destacada", fecha: "Ayer, 16:05", antes: "Activo", despues: "Inactivo" },
  { id: "a5", usuario: "Mercadotecnia", accion: "Programó", modulo: "Notificaciones", registro: "Tienes $245 de cashback", fecha: "Ayer, 15:40", antes: "Borrador", despues: "Programado" },
];

// Segmentaciones — sólo las conectadas están disponibles; el resto se marca "Próximamente".
export interface Segmento {
  nombre: string;
  disponible: boolean;
}
export const segmentos: Segmento[] = [
  { nombre: "Todos", disponible: true },
  { nombre: "Unidad de negocio", disponible: true },
  { nombre: "Plaza", disponible: true },
  { nombre: "Tienda", disponible: true },
  { nombre: "Canal", disponible: true },
  { nombre: "Tipo de cliente", disponible: true },
  { nombre: "Tiene Crédito Kelder", disponible: false },
  { nombre: "Tiene CrediVale", disponible: false },
  { nombre: "Tiene Extravale", disponible: false },
  { nombre: "Saldo de puntos", disponible: false },
  { nombre: "Frecuencia de compra", disponible: false },
  { nombre: "Categoría favorita", disponible: false },
  { nombre: "Talla", disponible: false },
  { nombre: "Usuarios inactivos", disponible: false },
];

export const ubicaciones = ["Home app", "Home web", "Landing", "Tienda", "Promociones"];
export const unidades = ["Calzzapato", "Kelder", "Urbanna", "Calzzasport", "CalzaKids"];

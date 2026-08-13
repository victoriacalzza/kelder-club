# PRD — Kelder Club

> App de lealtad de Grupo Calzzapato. Un **compañero digital** para la experiencia en tienda física: antes, durante y después de la visita.

| | |
|---|---|
| **Producto** | Kelder Club (app de lealtad multiunidad) |
| **Plataformas** | iOS nativo (Capacitor) + Web responsive |
| **Unidades de negocio** | Calzzapato · Kelder · CalzzaSport · Urbanna · CalzaKids |
| **North star** | `BENEFICIO → PRODUCTO → DISPONIBILIDAD → TIENDA → VISITA` |
| **Estado** | Prototipo funcional (datos simulados), en iteración de diseño/UX |
| **Audiencia de este PRD** | Producto, Diseño, Stakeholders de negocio |

---

## 1. TL;DR

Kelder Club convierte los beneficios del cliente —**cashback, Crédito Kelder y CrediVales**— en un motor para **visitar la tienda física**. No es un ecommerce: en lugar de "Comprar", el usuario **descubre productos, confirma si están en su talla y en su tienda, y va por ellos**. La app unifica lo que hoy está disperso (saldos, crédito, vales, compras, promociones) en una experiencia limpia y premium, guiada por *progressive disclosure*. La pieza central de la sesión es **Mi K**: el código de identificación en caja + los recursos que el cliente puede elegir usar al pagar.

**Por qué importa:** las tiendas físicas son el corazón del negocio. La app existe para **generar y enriquecer visitas**, no para desviar ventas a un checkout digital.

---

## 2. Background y contexto

Grupo Calzzapato opera múltiples cadenas físicas y sitios de ecommerce. El cliente de lealtad ya:
- Genera **cashback** (~5% por compra).
- Puede tener un **Crédito Kelder** (crédito personal a plazos).
- Recibe **CrediVales** de mayoristas (créditos por sucursal/persona), que a su vez pueden generar **Extravales** (saldo sobrante disponible).

Hoy esa información vive en canales distintos y no impulsa la visita. La referencia conceptual (no estética) es una app tipo Disney: la capa digital **acompaña** la experiencia física en sus tres momentos.

### Momentos del cliente
- **Antes de ir a tienda:** consultar productos, disponibilidad, promociones, tienda, cashback, crédito y vales.
- **Durante la visita:** usar cashback, acceder al QR/código, descubrir productos, decidir qué recurso usar en caja.
- **Después de comprar:** consultar compras/pedidos, cashback generado, Crédito Kelder, CrediVales, notificaciones.

---

## 3. Problema y usuarios objetivo

### 3.1 Problemas
1. **Fragmentación de beneficios.** Cashback, crédito, vales, compras y promociones están separados; falta una vista clara de "qué tengo y qué puedo usar".
2. **Descubrimiento sin acción física.** Los catálogos se sienten como ecommerce genérico y no responden "¿lo tienen en mi talla, en mi tienda?".
3. **Complejidad financiera.** Crédito Kelder, CrediVales y Extravales se confunden entre sí y con el cashback.
4. **App percibida como "consulta de saldos".** No invita a la acción ni a la visita.
5. **Sobrecarga visual.** Feedback de usuarios: la app puede sentirse abrumadora.

### 3.2 Personas

**Ana — la clienta frecuente (primaria).** Compra calzado para ella y su familia, genera cashback y a veces usa CrediVales de mayorista. Quiere saber rápido cuánto tiene disponible, qué puede llevarse y dónde. Valora la cercanía a su sucursal.

**Carlos — el cliente a crédito.** Tiene Crédito Kelder y/o varios CrediVales con distintos mayoristas. Necesita claridad sobre **cuánto debe, a quién y cuándo paga** sin recorrer pantallas largas.

**Sofía — la exploradora previa a la visita.** Investiga antes de ir: revisa novedades, promociones y disponibilidad por talla; llega a la tienda con una lista mental (o "Mi lista para visitar").

### 3.3 Impacto del problema
Menos visitas a tienda originadas por la app, beneficios (cashback/vales/Extravales) sin utilizar, y baja frecuencia de uso.

---

## 4. Objetivos y métricas de éxito

### 4.1 Objetivos de producto
1. **Generar visitas físicas** originadas desde la app.
2. **Aumentar el uso de beneficios** (cashback, CrediVales, Extravales).
3. **Claridad en <2 s**: "qué tengo, qué debo y qué puedo usar".
4. **Reducir la sobrecarga** con *progressive disclosure* sin perder funciones.
5. Establecer **Mi K** como el punto de contacto en caja (identidad + recursos).

### 4.2 Métricas
| Categoría | Métrica |
|---|---|
| Visita | Taps en **"Cómo llegar"**; aperturas de **Mi K**; scans del código en caja |
| Beneficios | **Tasa de uso** de cashback / CrediVales / Extravales (utilizado ÷ disponible) |
| Descubrimiento | Vistas de producto, activaciones de **"Avísame cuando llegue mi talla"**, uso de favoritos y "Mi lista para visitar" |
| Personalización | % de usuarios con **talla configurada** y **tienda preferida** |
| Engagement | Frecuencia y retención por momento (antes/durante/después) |

### 4.3 Anti-metas (qué NO optimizamos)
- Volumen de checkout en la app (no hay checkout).
- Tiempo en pantalla por sí solo (preferimos claridad y acción rápida).

---

## 5. Principios de producto

1. **La visita física es el objetivo.** CTAs priorizados: "Cómo llegar", "Ver disponibilidad", "Avísame cuando llegue". **Nunca** "Comprar" como CTA general.
2. **Contexto transversal.** "Mi tienda" y la talla del usuario personalizan catálogo, búsqueda y disponibilidad en toda la app.
3. **Progressive disclosure.** Cada pantalla responde una pregunta principal; el detalle aparece a demanda.
4. **Separación conceptual estricta.** Cashback ≠ Crédito Kelder ≠ CrediVale ≠ Extravale. Nunca se suman en un "saldo total".
5. **Una sola señal por tarjeta.** Los productos muestran **una** indicación contextual de disponibilidad, no múltiples badges.
6. **Rojo con moderación.** El rojo Kelder se reserva a acción principal, estado activo y elementos interactivos clave; el dinero disponible va en verde, "solo en tienda"/"avísame" en ámbar.
7. **Premium y ligero.** Fondo claro, mucho espacio en blanco, bordes suaves, microinteracciones sutiles.

Cada pantalla responde principalmente **una** pregunta:

| Pantalla | Pregunta |
|---|---|
| Home | ¿Qué tengo y qué hay para mí? |
| Crédito y Vales | ¿Cuánto tengo disponible y cuánto debo? |
| Buscar / Catálogo | ¿Qué puedo comprar y dónde lo consigo? |
| Tiendas | ¿Qué hay en esta tienda? |
| Mi Club | ¿Qué he comprado y cuál es mi información? |
| Mi K | ¿Qué puedo utilizar al momento de comprar? |

---

## 6. Arquitectura de la experiencia

### 6.1 Navegación

**Móvil (experiencia primaria)** — bottom nav de 4 destinos + botón central **K**:
- Inicio · Crédito y Vales · **Mi K** (FAB central) · Tiendas · Mi Club.
- El **QR de pago vive dentro de Mi K**, no en el botón.

**Web / desktop** — navegación superior (incluye "Mi Club"); **sin** bottom nav ni FAB. El acceso al QR de cashback vive en el **hero de cashback** del Home. La web aprovecha el ancho (cuadrículas/carruseles amplios) manteniendo patrones de escritorio.

**Transversales**
- **Mi tienda** siempre visible en el header; se cambia desde Tiendas.
- **Campana → pantalla propia de Notificaciones**; cada aviso enlaza a su contenido.
- **Buscar** desde la lupa del header (typeahead).

### 6.2 Mapa de pantallas

| Área | Pantallas |
|---|---|
| Home | Inicio |
| Beneficios | Cashback (movimientos), Aprovecha tu cashback, Mi K |
| Crédito y Vales | Crédito y Vales (hub), Detalle Crédito Kelder, Detalle CrediVale, Extravales (pantalla propia) |
| Descubrimiento | Buscar, Catálogo, Detalle de producto |
| Tiendas | Tiendas (lista + Mi tienda), Detalle de tienda |
| Compras | Mis compras, Detalle de compra/pedido |
| Promociones | Promociones, Detalle de promoción |
| Mi Club | Mi Club (hub), Perfil, Configurar tallas, Favoritos, Mi lista para visitar |
| Sistema | Notificaciones, Próximamente (placeholders) |

---

## 7. Especificación por módulo

### 7.1 Home — "¿Qué tengo y qué hay para mí?"
- **Hero de cashback:** saldo disponible (verde/positivo), progreso a la próxima recompensa; CTA principal **"Ver qué puedo comprar"**; acceso a **QR** (desktop) / dentro de Mi K (móvil); enlace "Canjear en línea".
- **Franja de marcas** (unidades de negocio) como contenido secundario, discreto (no compite con el cashback).
- **Resumen de Crédito y Vales** (solo resumen, dirige a la pestaña).
- **Pedido en curso** (cuando existe).
- **Novedades en tu tienda:** carrusel corto de productos nuevos de la sucursal seleccionada (con su nombre), cada tarjeta con **una** señal de disponibilidad. No es todo el catálogo.
- **Campaña/promoción destacada** al final.

### 7.2 Cashback
- **Movimientos de cashback:** saldo disponible, generado, historial de ingresos/egresos, acceso a QR.
- **Aprovecha tus $X** (no es un catálogo): responde "¿qué puedo hacer con mi saldo?". Filtros **Me alcanza / Pongo un poco más / Todo**. Tarjetas con desglose: Precio · Tu cashback · **Tú pagas $X** (jerarquía alta) o "Te alcanza con tu cashback". Disponibilidad como dato secundario. Ámbito: tienda seleccionada.
- **Regla de color:** el saldo disponible **nunca** en rojo (no es deuda).

### 7.3 Crédito Kelder (crédito personal)
- Producto **independiente** de CrediVales. Muestra: saldo pendiente, próximo pago (monto + fecha), avance ("Pago 4 de 6"), estado (Al corriente), calendario/historial.
- **Nunca** muestra mayoristas, folios ni CrediVales. Datos autoritativos viven en el sistema de Crédito Kelder (esta vista es recordatorio/consulta).

### 7.4 CrediVales
- Cada CrediVale es una deuda con un **mayorista distinto** (persona), con **folio** propio (p. ej. "•••• 2845"), titular, celular, vigencia.
- **Estados:** Disponible · En pago · Extravale · Utilizado · Vencido.
- **Pestañas:** Disponibles · En pago · Historial (Extravales tiene su propia pantalla; ver 7.5).
- **En pago:** resumen compacto arriba (Próxima quincena, **Total a pagar**, **desglose por mayorista**, Deuda total). Debajo, **tarjetas accordion** (colapsadas por defecto, **una expandida a la vez**): folio, mayorista, próximo pago·fecha, saldo pendiente, "2 de 4 pagos"; al expandir, barra de progreso y "Ver detalle".
- **Disponibles:** tarjeta compacta a 2 columnas (logo pequeño + folio, estado, **monto como héroe**, mayorista + vigencia, "Ver CrediVale").
- **Detalle de CrediVale:** encabezado, **Extravale** prominente (si aplica), 4 datos (saldo/quincenal/próximo/avance) y una sola sección **"Pagos"** que unifica calendario e historial (✓ pagado · ● próximo · ○ pendiente).

### 7.5 Extravale
- Saldo **disponible** sobrante de un CrediVale usado (no es deuda). Vinculado a su CrediVale de origen.
- **Alta visibilidad sin duplicar:** bloque destacado "Extravale disponible $X · Ver Extravale" en Crédito y Vales y en Mi K; **pantalla propia** (`/extravales`) con total disponible y detalle. No se muestra la tarjeta de Extravale dentro de la lista de CrediVales.

### 7.6 Buscar
- **Typeahead** (resultados en vivo al escribir), además de búsqueda por texto/código/foto.
- **Filtros simples** siempre visibles: Mi talla · Mujer/Hombre · Calzado/Ropa/Accesorios, y selector **[Mi tienda] [Todo]**. Filtros avanzados disponibles en un sheet/dropdown, sin saturar.
- Resultados **ordenados por facilidad de obtención** (ver 8.2). Tarjetas simplificadas (ver 7.7).

### 7.7 Catálogo y tarjeta de producto
- **Catálogo único** (se eliminó "Catálogo extendido" como concepto/CTA separado). La diferencia entre productos es **cómo conseguirlos** (tienda, inventario, talla, cercanía).
- **Tarjeta de producto:** imagen · marca · nombre · precio · **una** indicación contextual de disponibilidad · favorito. Sin múltiples badges.

### 7.8 Detalle de producto
- Fotografía, marca, precio, cashback que genera.
- **"Tu talla: 24 MX"** y disponibilidad contextual:
  - Si está: "Disponible en {tienda} · {km}" → CTA **"Cómo llegar"**.
  - Si tu talla no está aquí: "Tu talla no está disponible aquí" + "Disponible en {otra tienda} · {km}" → **"Cómo llegar"** + acción secundaria **"Avísame cuando llegue a {mi tienda}"**.
- Tallas (con la habitual resaltada), disponibilidad en **otras tiendas** (expandible), "Agregar a mi lista para visitar".
- **Sin "Comprar".**

### 7.9 Tiendas
- **Lista + Mi tienda:** foto de la sucursal, estado (abierta/cerrada), hora de cierre, distancia; acciones "Cómo llegar" y "Cambiar tienda"; otras tiendas cercanas.
- **Detalle de tienda:** cabecera-resumen (foto, unidad, nombre, estado·distancia, contadores **interactivos** de promociones/novedades, "Cómo llegar", "Hacer mi tienda preferida") y pestañas **Productos / Promociones / Información** (horario del día + semanal, teléfono con "Llamar", **servicios** en chips, ubicación con mini-mapa). Sin duplicar datos entre cabecera e Información.

### 7.10 Mis compras
- Lista de compras (tickets en tienda) y pedidos (en línea).
- **Chips rápidos** (Todas · En proceso · En camino) + botón **"Filtros"** con badge de filtros activos → sheet con **búsqueda por ticket/pedido**, **estado** (6), **fecha** (30 días / 3 / 6 meses / personalizado), **tipo de compra** (tienda / pedido) y **tienda**.
- Diferencia visual "Compra en tienda" vs "Pedido"; badges por estado; cashback generado por compra.
- **Detalle de compra:** artículos, totales, cashback, seguimiento (si aplica).

### 7.11 Mi K (durante la compra)
- Se abre desde el botón central **K**.
- **Primero el código** de identificación/pago para caja (QR + barras + numérico, con vigencia).
- Debajo, **recursos seleccionables**: Cashback, CrediVales disponibles, Extravales, Crédito Kelder — el usuario elige qué desea usar.
- **Importante:** por ahora es **solo visual** (arquitectura lista para integrarse con POS); no aplica saldos automáticamente.

### 7.12 Configurar tallas
- En Perfil, una **card compacta** ("Mis tallas · Calzado 24 MX · Ropa M · Configurar tallas →") — solo el resultado.
- Pantalla dedicada e inmersiva: **Calzado** con selector tipo **rueda** (valor central destacado) + sistema **MX/US/EU**; **Ropa** con selector deslizable S/M/L…; y **"Mejorar recomendación de talla"** (opcional, progressive disclosure) con medidas (estatura/cintura/cadera/pecho) en selectores deslizables + **"¿Cómo medirme?"**. Ninguna medida obligatoria. Un único CTA **"Guardar"**.
- Extensible a nuevas categorías (pantalón, infantil, accesorios) sin rediseñar.

### 7.13 Promociones
- Deben leerse en **<2 s** como **exclusivas de tienda física**: encabezado "Promociones para aprovechar en tienda física", **franja destacada por promoción** ("Promoción exclusiva en tienda física"), sucursal con pin y vigencia; CTA "Ver productos en tienda" + "Cómo llegar". El rojo se reserva a descuento/CTA.

### 7.14 Notificaciones
- **Pantalla propia** (no modal). Lista limpia con categoría, título, descripción, fecha/hora, punto rojo si no leída; "Marcar todas como leídas".
- Categorías: cashback, promoción, pedido, Crédito Kelder, CrediVales, novedades de tienda. **Cada aviso enlaza a su contenido** (movimientos de cashback, promoción, pedido específico, detalle de crédito, novedades de la tienda).

### 7.15 Mi Club y Perfil
- **Mi Club:** centro personal — Beneficios, Mis compras, Mi cashback, Promociones vigentes, y sección de cuenta (Mis datos, Mis favoritos, Mi tienda preferida, Preferencias). **No** duplica Notificaciones (viven en el header) ni el detalle financiero.
- **Perfil:** información personal + card de "Mis tallas" (→ Configurar tallas).

---

## 8. Lógica de personalización y disponibilidad

### 8.1 Estado persistido (por usuario)
- **Tienda preferida** ("Mi tienda").
- **Tallas:** calzado (MX; se muestra en MX/US/EU), ropa (XS–XXL), **medidas** opcionales (estatura, cintura, cadera, pecho).
- **Colecciones:** favoritos, "Mi lista para visitar".
- Todo se **recuerda entre sesiones**; no se pide la talla repetidamente.

### 8.2 Disponibilidad contextual (una sola señal)
Cada producto muestra el mensaje **más útil** para ese usuario, priorizando la disponibilidad física en su talla:
- 🟢 **Tu talla está aquí** (mi talla + mi tienda)
- 📍 **Tu talla está a X km** (mi talla + tienda cercana)
- 🔔 **Avísame cuando llegue tu talla** (el producto está en mi tienda, pero no mi talla)
- 📦 **Disponible para envío** (no está físicamente cerca)

**Orden del catálogo/búsqueda** (ranking interno, no visible): (1) mi talla + mi tienda → (2) mi talla + cercanas → (3) mi tienda otras tallas → (4) otras tiendas → (5) otro mecanismo → (6) solo en línea.

### 8.3 "Avísame cuando llegue mi talla"
Acción secundaria y sencilla (no es apartado). Cuando haya inventario, se genera una notificación. *(Backend real pendiente.)*

---

## 9. Requerimientos (criterios de aceptación)

**Personalización**
- El usuario puede fijar **Mi tienda** y **tallas**; se recuerdan.
- Cada producto muestra **una** indicación contextual, priorizando disponibilidad física en su talla.
- Resultados ordenados por facilidad de obtención, sin exponer la jerarquía.

**Beneficios**
- Cashback: saldo en verde, progreso a próxima recompensa, CTA "Ver qué puedo comprar"; QR accesible.
- Mi K: código primero + selección de recurso (sin aplicar saldos automáticamente).
- Extravale identificable desde Crédito y Vales y Mi K, con pantalla propia; sin duplicar la tarjeta.

**Crédito y CrediVales**
- Crédito Kelder y CrediVales independientes (Crédito nunca muestra mayoristas/folios).
- "En pago": resumen con **desglose por mayorista** + tarjetas accordion (una expandida a la vez).
- Detalle con una sola sección "Pagos".

**Descubrimiento y promociones**
- Catálogo único; tarjetas con solo 6 elementos (imagen, marca, nombre, precio, una disponibilidad, favorito).
- Promociones evidencian "solo en tienda física" en <2 s.

**Tiendas / Compras / Notificaciones**
- Detalle de tienda sin duplicar datos entre cabecera e Información.
- Mis compras con estados + sheet de filtros (búsqueda por ticket, fecha, tienda, tipo).
- Notificaciones como pantalla propia con deep-link por aviso.

**Responsive**
- Funciona en desktop, laptop, tablet y navegador móvil. En desktop **no** se usa el bottom nav de la app.

---

## 10. Estados, vacíos y casos borde

| Situación | Comportamiento esperado |
|---|---|
| Sin tienda seleccionada | Home invita a "Elegir tienda"; disponibilidad usa una sucursal por defecto o pide seleccionar |
| Sin talla configurada | La disponibilidad cae a nivel tienda ("Disponible en tu tienda"/"a X km"), sin lenguaje de talla |
| Sin CrediVales | Banner de invitación; sin pestañas |
| Sin Crédito Kelder | Tarjeta de invitación "Conoce Crédito Kelder" |
| Sin Extravales | No se muestra el bloque; la pantalla /extravales muestra vacío amable |
| Producto agotado / solo en línea | "Disponible para envío" (o "Avísame") en vez de "Cómo llegar" |
| CrediVale cancelado/entregado | No mostrar "Seguir pedido"/acciones que no apliquen |
| Compras sin resultados con filtros | Estado vacío "No encontramos compras con estos filtros" |

---

## 11. Requisitos no funcionales

- **Rendimiento/UX:** transiciones suaves (accordion, sheets), listas escaneables, sin bloqueos al escribir (typeahead).
- **Responsive:** móvil-first; adaptación a tablet/desktop sin convertir la web en la app.
- **Accesibilidad:** color **siempre** acompañado de icono/texto (no color-solo); áreas táctiles ≥44px; roles/aria en tabs, sheets y toggles.
- **Internacionalización:** español (MX); formato de moneda MXN; sistema de tallas configurable (MX/US/EU).
- **Persistencia local:** preferencias del usuario sobreviven recargas.
- **Preparación de integración:** disponibilidad/inventario mockeada de forma determinista, reemplazable por datos reales **sin** cambiar la UI; Mi K listo para POS.

---

## 12. Analítica (eventos clave)

- `product_view`, `product_favorite`, `visit_list_add`
- `store_view`, `directions_click`, `call_store`
- `cashback_product_click`, `size_alert`
- `promotion_view`, `promotion_product_click`

**Preguntas que deben responder:** ¿cuántas visitas origina la app? ¿qué % de cashback/vales se usa? ¿qué productos generan más "Cómo llegar"/"Avísame"?

---

## 13. Diseño (resumen)

- **Paleta:** crema de fondo; **rojo Kelder** solo para acción principal/estado activo/interactivos; **verde** = dinero disponible; **ámbar** = "solo en tienda"/"avísame"; **azul** = estados de pedido/crédito; neutros "ink".
- **Semántica accesible:** nunca color sin icono/etiqueta.
- **Componentes reutilizables:** tarjeta de producto (una señal), tarjeta de promoción (franja ámbar), sheets (bottom en móvil, centrado en desktop), WheelPicker, StatusPill, tarjetas accordion, selectores segmentados, chips.
- **Tono:** premium, limpio, con microinteracciones sutiles y mucho espacio en blanco.

---

## 14. Fuera de alcance (por ahora)

- **Checkout/pago dentro de la app.** La compra ocurre en caja (QR) o en los sitios de ecommerce (pedidos rastreados en Mis compras).
- **Aplicación automática de saldos en POS.** Mi K solo prepara la selección; la integración es posterior.
- **Apartado/reserva.** "Mi lista para visitar" es planeación, no apartado (posible Click & Collect futuro).
- **Inventario en tiempo real.** Hoy simulado.
- **Sección Beneficios** (recompensas de membresía) — placeholder "Próximamente".
- **Autenticación, backend y datos autoritativos** de Crédito/CrediVales (sistemas externos).
- **Motor real de recomendación de talla** a partir de medidas (hoy solo se almacenan).

---

## 15. Roadmap por fases (propuesta)

**Fase 1 — Prototipo de experiencia (actual).** Navegación, personalización (tienda + tallas), disponibilidad contextual, Crédito/CrediVales/Extravales, cashback, Mi K (visual), compras, promociones, notificaciones — con datos simulados.

**Fase 2 — Datos reales.** Auth + perfil real; inventario/disponibilidad por tienda y talla en vivo; saldos autoritativos de cashback/Crédito/CrediVales; notificaciones reales (incl. "Avísame cuando llegue tu talla").

**Fase 3 — Integración POS (Mi K).** Selección de recurso aplicable en caja; reglas de combinación/prioridad de saldos; confirmación de uso.

**Fase 4 — Extensiones.** Motor de recomendación de talla con medidas; "Mi lista para visitar" → Click & Collect/apartado; compra en línea para productos habilitados; Beneficios de membresía.

---

## 16. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Que la app se perciba como ecommerce | Sin "Comprar"; CTAs de visita; disponibilidad y "Cómo llegar" al centro |
| Confusión entre beneficios financieros | Separación estricta + lenguaje/color distintos; nunca "saldo total" |
| Sobrecarga visual | Progressive disclosure; una señal por tarjeta; rojo reservado |
| Disponibilidad simulada ≠ realidad | Resolver reemplazable; UI agnóstica al origen de datos |
| Expectativa de que Mi K ya "paga solo" | Copy explícito: selección informativa, integración POS futura |
| Fricción al pedir talla | Talla opcional/recordada; disponibilidad degrada con gracia sin talla |

---

## 17. Preguntas abiertas

- **Mi K / POS:** ¿qué recursos son combinables y en qué orden se aplican en caja?
- **"Avísame":** ¿inventario en vivo y SLA de la notificación?
- **Medidas:** ¿alimentan un motor de recomendación real o solo se almacenan?
- **"Mi lista para visitar":** ¿evoluciona a Click & Collect/apartado?
- **Analítica:** ¿fuente de verdad para "visitas originadas por la app"?
- **Compra en línea:** ¿qué productos/unidades quedan habilitados para ecommerce?
- **Auth/identidad:** ¿cómo se vincula la cuenta de lealtad con el código de Mi K?

---

## 18. Supuestos

| Supuesto | Confianza |
|---|---|
| El objetivo primario es impulsar la visita física, no ventas online | Alta |
| El cashback es poder de compra (no una wallet con "saldo total") | Alta |
| Crédito Kelder y CrediVales permanecen conceptualmente separados | Alta |
| La talla por defecto (24 MX / M) es solo demo; en producción se configura | Media |
| Mi K reemplaza el rol de "Pagar" del botón central y será el punto de integración POS | Media |
| La disponibilidad/inventario mostrada hoy es simulada y se sustituirá por datos reales | Alta |
| La app se distribuye como app nativa (iOS) además de web responsive | Alta |

---

## 19. Glosario

- **Cashback:** saldo a favor generado por compras; poder de compra, no wallet.
- **Crédito Kelder:** crédito personal a plazos, independiente de mayoristas.
- **CrediVale:** crédito por mayorista/sucursal, con folio y calendario de pagos propios.
- **Extravale:** saldo disponible sobrante de un CrediVale usado (no es deuda).
- **Mi tienda:** sucursal seleccionada; contexto transversal de disponibilidad.
- **Mi K:** pantalla de identidad en tienda (código + recursos utilizables).
- **Disponibilidad contextual:** la señal más útil de disponibilidad para el usuario según su talla y tienda.
- **Progressive disclosure:** mostrar primero lo esencial y el detalle a demanda.

---

_Documento espejo del PRD en Docs de Tempo. Fuente de verdad: pestaña **Docs** del workspace._

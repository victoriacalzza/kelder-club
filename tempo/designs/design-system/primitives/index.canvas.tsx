import { Canvas, Storyboard } from "tempo-sdk/canvas";
import { defineAsset } from "tempo-sdk/assets";
import { PercentCircle } from "lucide-react";
import Primitivesshowcase from "./PrimitivesShowcase";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { QuickAction } from "@/components/ui/QuickAction";
import { ValeCard } from "@/components/ui/ValeCard";
import { KelderCard } from "@/components/ui/KelderCard";
import { ActivityItem } from "@/components/ui/ActivityItem";
import { StorePreview } from "@/components/ui/StorePreview";
import { PromoBanner } from "@/components/ui/PromoBanner";
import { CreditoKelderCard } from "@/components/ui/CreditoKelderCard";
import { CreditSummary } from "@/components/ui/CreditSummary";
import { OrderInProgress } from "@/components/ui/OrderInProgress";
import { ProductCard } from "@/components/ui/ProductCard";

export default function PrimitivesCanvas() {
  return (
    <Canvas name="Primitives">
      <Storyboard
        id="Showcase"
        name="Primitivas Kelder Club"
        component={Primitivesshowcase}
        layout={{ x: 0, y: 0, width: 700, height: 1100 }}
      />
    </Canvas>
  );
}

defineAsset(Button, {
  libraries: ["core"],
  usageInstructions: "Primary interactive control. variant=\"primary\" (Kelder red) is reserved for the one important action on a screen — everything else uses secondary/ghost.",
  variants: {
    Primary: { props: { children: "Mostrar QR", variant: "primary" } },
    Secondary: { props: { children: "Canjear", variant: "secondary" } },
    Ghost: { props: { children: "Atrás", variant: "ghost" } },
  },
});

defineAsset(Card, {
  libraries: ["core"],
  usageInstructions: "Base white surface for grouped content — large radius, soft shadow. Default container for balances, summaries, and list groups.",
});

defineAsset(StatusPill, {
  libraries: ["core"],
  usageInstructions: "State indicator that always pairs an icon with a label — never color alone. Use for vale/CrediVale status (activo, por_vencer, usado, vencido).",
  variants: {
    Activo: { props: { estado: "activo" } },
    PorVencer: { props: { estado: "por_vencer" } },
    Usado: { props: { estado: "usado" } },
    Vencido: { props: { estado: "vencido" } },
  },
});

defineAsset(QuickAction, {
  libraries: ["core"],
  usageInstructions: "Friendly quick-action tile: colored icon medallion + label + benefit subtitle. Pick a `tint` per action for personality (kelder/green/amber/info). Use in the Home actions grid.",
  variants: {
    Cashback: { props: { icon: <PercentCircle size={22} />, label: "Usar cashback", subtitle: "Págalo en línea o en caja", tint: "green" } },
    Buscar: { props: { icon: <PercentCircle size={22} />, label: "Buscar producto", subtitle: "En todo el grupo", tint: "info" } },
  },
});

defineAsset(ValeCard, {
  libraries: ["core"],
  usageInstructions: "Wallet-style card for a vale/reward, proportioned like a loyalty pass (Apple Wallet) rather than a product card. Shows amount, status (icon + text), mayorista and validity. The component keeps a `credivale` branch ready for that FUTURE feature, but only vales are shown today.",
  variants: {
    Activo: {
      props: {
        vale: {
          id: "v1",
          tipo: "vale",
          monto: 500,
          disponible: 500,
          utilizado: 0,
          estado: "activo",
          mayorista: "Calzzapato",
          mayoristaPersona: "Carlos Pérez",
          folio: "•••• 2845",
          fechaEmision: "02 ago 2026",
          fechaVigencia: "02 nov 2026",
        },
      },
    },
    PorVencer: {
      props: {
        vale: {
          id: "v2",
          tipo: "vale",
          monto: 1000,
          disponible: 350,
          utilizado: 650,
          estado: "por_vencer",
          mayorista: "Kelder",
          mayoristaPersona: "Ana López",
          folio: "•••• 7710",
          fechaEmision: "14 jul 2026",
          fechaVigencia: "10 ago 2026",
        },
      },
    },
  },
});

defineAsset(KelderCard, {
  libraries: ["core"],
  usageInstructions: "The cashback hero — the protagonist of the Home. A dark, editorial retail banner (Nike Membership feel) presenting cashback as a reward, not a bank balance. Two states: `cashback > 0` shows the balance + Mostrar QR / Canjear; `cashback === 0` shows the aspirational 'start earning' empty state. One per screen, only on Home.",
  variants: {
    ConCashback: { props: { cashback: 245 } },
    SinCashback: { props: { cashback: 0 } },
  },
});

defineAsset(StorePreview, {
  libraries: ["core"],
  usageInstructions: "\"Tu tienda más cercana\" card — bridges the digital club and the physical stores. Shows nearest store, open state, hours, distance and directions. Left panel is an image slot for a real storefront photo.",
  variants: {
    Abierta: {
      props: { tienda: { id: "t1", nombre: "Kelder Plaza Forum", horario: "9:00 – 21:00", abierta: true, distancia: "1.2 km" } },
    },
  },
});

defineAsset(PromoBanner, {
  libraries: ["core"],
  usageInstructions: "Featured campaign banner — editorial content that gives members a reason to return (promo of the week, benefit of the month, launches). Wide and aspirational, NOT a product catalog. One per Home.",
  variants: {
    Promo: {
      props: {
        campania: {
          id: "camp1",
          etiqueta: "Solo por esta semana",
          titulo: "20% de descuento",
          detalle: "En productos seleccionados Adidas de temporada",
          cta: "Ver promoción",
        },
      },
    },
  },
});

defineAsset(CreditoKelderCard, {
  libraries: ["core"],
  usageInstructions: "Home block 2b — the CrediVale INVITATION, shown ONLY to members without credit. Lifestyle card: 'Conoce Crédito Kelder', buy-now-pay-later copy, single 'Conocer más' CTA. Never coexists with CreditSummary (2a); never uses the red gradient.",
});

defineAsset(CreditSummary, {
  libraries: ["core"],
  usageInstructions: "Home block 2a — the consolidated CrediVale summary, shown ONLY to members WITH credit. Saldo pendiente is the hero figure; vales activos, mayorista and próximo pago are support; one CTA to Mis vales (never lists individual vales). Never coexists with CreditoKelderCard (2b).",
});

defineAsset(OrderInProgress, {
  libraries: ["core"],
  usageInstructions: "Home block 3 — an active order (product image, status, estimated delivery, tracking CTA). Render ONLY when an order exists; otherwise omit the block entirely (no empty state).",
  variants: {
    EnCamino: {
      props: {
        pedido: { id: "ped1", producto: "Ultraboost Light", marca: "Adidas", estado: "En camino", fechaEntrega: "Llega el 9 de agosto" },
      },
    },
  },
});

defineAsset(ProductCard, {
  libraries: ["core"],
  usageInstructions: "Home block 4 item — a recommended product, Nike-style: large product photo on a very light surface, then brand, short name and price. Not a catalog tile — no badges, stock counts or filters. Max four per Home.",
  variants: {
    Producto: { props: { producto: { id: "p1", marca: "Adidas", modelo: "Core Black / Cloud White", precio: 1299 } } },
  },
});

defineAsset(ActivityItem, {
  libraries: ["core"],
  usageInstructions: "One narrative entry in the activity timeline — reads like a small story (title + benefit detail + relative time) with a tinted icon medallion and amount badge. Set `last` on the final item to hide the connector line; `item.nuevo` adds a pulsing 'Nuevo' ring.",
  variants: {
    ValeNuevo: {
      props: {
        item: {
          id: "act1",
          tipo: "vale",
          titulo: "Recibiste un vale de regalo",
          detalle: "Disponible para tu próxima compra",
          tiempo: "Hace 2 horas",
          monto: "+$450",
          positivo: true,
          nuevo: true,
        },
      },
    },
    Compra: {
      props: {
        item: {
          id: "act2",
          tipo: "compra",
          titulo: "Compraste en Adidas Galerías Mazatlán",
          detalle: "Ganaste $45 de cashback",
          tiempo: "Hace 3 días",
          monto: "+$45",
          positivo: true,
        },
        last: true,
      },
    },
  },
});

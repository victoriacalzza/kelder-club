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
  usageInstructions: "Wallet-style card for a Vale or CrediVale digital, proportioned like a payment card rather than a product card. CrediVale digital renders on a dark surface to read as a credit instrument; vale de compra renders on white.",
  variants: {
    CrediValeDigital: {
      props: {
        vale: {
          id: "v1",
          tipo: "credivale",
          monto: 2500,
          estado: "activo",
          mayorista: "Calzzapato",
          fechaEmision: "02 ago 2026",
          fechaVigencia: "02 nov 2026",
        },
      },
    },
    ValeDeCompra: {
      props: {
        vale: {
          id: "v2",
          tipo: "vale",
          monto: 450,
          estado: "por_vencer",
          mayorista: "Kelder",
          fechaEmision: "14 jul 2026",
          fechaVigencia: "10 ago 2026",
        },
      },
    },
  },
});

defineAsset(KelderCard, {
  libraries: ["core"],
  usageInstructions: "The Kelder Club wallet card — the emotional centerpiece of the Home. A premium loyalty/financial pass (Apple Wallet / Nubank feel): available money is the hero, CrediVale + cashback are pills, membership level is the badge, and it carries the single primary 'Mostrar QR' action. One per screen, only on Home.",
});

defineAsset(ActivityItem, {
  libraries: ["core"],
  usageInstructions: "One narrative entry in the activity timeline — reads like a small story (title + benefit detail + relative time) with a tinted icon medallion and amount badge. Set `last` on the final item to hide the connector line; `item.nuevo` adds a pulsing 'Nuevo' ring.",
  variants: {
    CrediValeNuevo: {
      props: {
        item: {
          id: "act1",
          tipo: "credivale",
          titulo: "Recibiste un nuevo CrediVale",
          detalle: "Disponible para usar en línea o en caja",
          tiempo: "Hace 2 horas",
          monto: "+$2,500",
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

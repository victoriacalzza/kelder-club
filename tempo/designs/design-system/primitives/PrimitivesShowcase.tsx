import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { ValeCard } from "@/components/ui/ValeCard";
import { KelderCard } from "@/components/ui/KelderCard";
import { CreditSummary } from "@/components/ui/CreditSummary";
import { CreditoKelderCard } from "@/components/ui/CreditoKelderCard";
import { OrderInProgress } from "@/components/ui/OrderInProgress";
import { ProductCard } from "@/components/ui/ProductCard";
import { StorePreview } from "@/components/ui/StorePreview";
import { PromoBanner } from "@/components/ui/PromoBanner";
import { vales, tiendaCercana, campaniaDestacada, pedidoActivo, recomendaciones } from "@/lib/mock-data";

export default function PrimitivesShowcase() {
  return (
    <div className="space-y-8 bg-cream p-8">
      <section className="flex flex-wrap gap-3">
        <Button variant="primary">Mostrar QR</Button>
        <Button variant="secondary">Canjear</Button>
        <Button variant="ghost">Atrás</Button>
      </section>

      <section className="flex flex-wrap gap-3">
        <StatusPill estado="activo" />
        <StatusPill estado="por_vencer" />
        <StatusPill estado="usado" />
        <StatusPill estado="vencido" />
      </section>

      <section className="w-72">
        <Card>Card base — superficie neutra para agrupar contenido.</Card>
      </section>

      <section className="w-[720px]">
        <KelderCard cashback={245} />
      </section>

      <section className="w-[720px]">
        <CreditSummary />
      </section>

      <section className="w-[720px]">
        <CreditoKelderCard />
      </section>

      <section className="w-[720px]">
        <OrderInProgress pedido={pedidoActivo} />
      </section>

      <section className="grid w-[720px] grid-cols-4 gap-4">
        {recomendaciones.slice(0, 4).map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </section>

      <section className="w-[720px]">
        <PromoBanner campania={campaniaDestacada} />
      </section>

      <section className="w-[720px]">
        <StorePreview tienda={tiendaCercana} />
      </section>

      <section className="grid w-80 gap-3">
        <ValeCard vale={vales[0]} />
        <ValeCard vale={vales[1]} />
      </section>
    </div>
  );
}

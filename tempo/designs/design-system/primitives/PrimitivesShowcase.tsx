import { PercentCircle, WalletCards, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { QuickAction } from "@/components/ui/QuickAction";
import { ValeCard } from "@/components/ui/ValeCard";
import { KelderCard } from "@/components/ui/KelderCard";
import { ActivityItem } from "@/components/ui/ActivityItem";
import { vales, actividad } from "@/lib/mock-data";

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

      <section className="grid w-80 grid-cols-2 gap-3">
        <QuickAction tint="green" icon={<PercentCircle size={22} />} label="Usar cashback" subtitle="En línea o en caja" />
        <QuickAction tint="kelder" icon={<WalletCards size={22} />} label="Mis vales" subtitle="Vales y CrediVales" />
        <QuickAction tint="info" icon={<Search size={22} />} label="Buscar" subtitle="En todo el grupo" />
      </section>

      <section className="w-72">
        <Card>Card base — superficie neutra para agrupar contenido.</Card>
      </section>

      <section className="w-[420px]">
        <KelderCard />
      </section>

      <section className="w-[440px] rounded-3xl bg-white p-6 shadow-soft">
        <ul>
          <ActivityItem item={actividad[0]} />
          <ActivityItem item={actividad[1]} />
          <ActivityItem item={actividad[2]} last />
        </ul>
      </section>

      <section className="grid w-80 gap-3">
        <ValeCard vale={vales[0]} />
        <ValeCard vale={vales[1]} />
      </section>
    </div>
  );
}

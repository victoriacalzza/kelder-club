import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { KelderCard } from "@/components/ui/KelderCard";
import { CreditSummary } from "@/components/ui/CreditSummary";
import { CreditoKelderCard } from "@/components/ui/CreditoKelderCard";
import { CrediValesEmpty } from "@/components/ui/CrediValesEmpty";
import { OrderInProgress } from "@/components/ui/OrderInProgress";
import { ProductCard } from "@/components/ui/ProductCard";
import { PromoBanner } from "@/components/ui/PromoBanner";
import { MarcasMarquee } from "@/components/ui/MarcasMarquee";
import { StorePreview } from "@/components/ui/StorePreview";
import { QRModal } from "@/components/modals/QRModal";
import { RedeemFlow } from "@/components/modals/RedeemFlow";
import {
  tiendaCercana,
  campaniaDestacada,
  pedidoActivo,
  recomendaciones,
  user,
  perfilDemo,
  type ClientProfile,
} from "@/lib/mock-data";

type ActiveModal = "qr" | "canjear" | null;

export function Home({ profile = perfilDemo }: { profile?: ClientProfile }) {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ActiveModal>(null);

  return (
    <div>
      {/* Welcome */}
      <header>
        <p className="text-sm text-ink-500">Qué gusto verte de nuevo</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Hola, {user.nombre}</h1>
      </header>

      {/* 1 · Cashback hero — the only dark/red surface on the page */}
      <div className="mt-6">
        <KelderCard
          cashback={profile.cashback}
          onShowQR={() => setModal("qr")}
          onUse={() => setModal("canjear")}
          onStart={() => navigate("/tiendas")}
        />
      </div>

      {/* Business units — compact recognition strip, right under the hero */}
      <div className="mt-7">
        <MarcasMarquee onSelect={() => navigate("/buscar")} />
      </div>

      {/* 2 · Conditional credit slot — one branch only, never both, never empty.
          con_vales → Crédito Kelder payment reminder · sin_vales → CrediVales empty state
          · no_miembro → Crédito Kelder invitation. Crédito Kelder and CrediVale are
          independent products; each branch shows exactly one of them. */}
      <div className="mt-8">
        {profile.credito === "con_vales" && <CreditSummary estado="con_vales" onVerCredito={() => navigate("/credito")} />}
        {profile.credito === "sin_vales" && <CrediValesEmpty onConocer={() => navigate("/vales")} />}
        {profile.credito === "no_miembro" && <CreditoKelderCard onConocer={() => navigate("/vales")} />}
      </div>

      {/* 3 · Order in progress — only when one exists */}
      {profile.pedidoEnCurso && (
        <div className="mt-8">
          <OrderInProgress pedido={pedidoActivo} onTrack={() => navigate("/compras")} />
        </div>
      )}

      {/* 4 · Recommended for you — cards sit directly on the page, no container */}
      <section className="mt-14" aria-label="Recomendados para ti">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">Recomendados para ti</h2>
          <button onClick={() => navigate("/buscar")} className="inline-flex items-center gap-1 text-sm font-semibold text-kelder-600">
            Explorar productos
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="flex snap-x gap-4 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible">
          {recomendaciones.slice(0, 4).map((p) => (
            <div key={p.id} className="w-[68%] min-w-[240px] shrink-0 snap-start sm:w-[46%] lg:w-auto lg:min-w-0">
              <ProductCard producto={p} onClick={() => navigate(`/producto/${p.id}`)} />
            </div>
          ))}
        </div>
      </section>

      {/* 5 · Featured campaign — light, photographic, launch theme */}
      <div className="mt-10">
        <PromoBanner campania={campaniaDestacada} onClick={() => navigate("/buscar")} />
      </div>

      {/* 6 · Nearest store */}
      <div className="mt-16">
        <StorePreview tienda={tiendaCercana} onDirections={() => navigate("/tiendas")} onVerTodas={() => navigate("/tiendas")} />
      </div>

      {modal === "qr" && <QRModal onClose={() => setModal(null)} />}
      {modal === "canjear" && <RedeemFlow onClose={() => setModal(null)} />}
    </div>
  );
}

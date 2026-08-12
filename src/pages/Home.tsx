import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { KelderCard } from "@/components/ui/KelderCard";
import { CreditoKelderHome } from "@/components/ui/CreditoKelderHome";
import { CrediValesEnPagoHome, CrediValesDisponiblesHome } from "@/components/ui/CrediValesHome";
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

      {/* 2 · Financial products — each is its own MODULE with a bold colored product header,
          so Crédito Kelder (red) and CrediVales (charcoal) never look like the same product.
          CrediVales "en pago" (a debt) and "disponibles" (usable) are kept strictly apart. */}
      {profile.credito === "no_miembro" ? (
        <div className="mt-8">
          <CreditoKelderCard onConocer={() => navigate("/vales")} />
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <CreditoKelderHome onVer={() => navigate("/credito")} />
          {profile.credito === "con_vales" ? (
            <>
              <CrediValesEnPagoHome onVer={() => navigate("/vales")} />
              <CrediValesDisponiblesHome onVer={() => navigate("/vales")} />
            </>
          ) : (
            <CrediValesEmpty onConocer={() => navigate("/vales")} />
          )}
        </div>
      )}

      {/* 3 · Order in progress — only when one exists */}
      {profile.pedidoEnCurso && (
        <div className="mt-8">
          <OrderInProgress pedido={pedidoActivo} onTrack={() => navigate(`/compras/${pedidoActivo.compraId}`)} />
        </div>
      )}

      {/* 4 · Recommended — horizontal swipe carousel on mobile, 4-up grid on desktop */}
      <section className="mt-12 lg:mt-14" aria-label="Recomendados para ti">
        <div className="mb-4 flex items-center justify-between lg:mb-5">
          <h2 className="text-lg font-semibold text-ink-900">Recomendados para ti</h2>
          <button onClick={() => navigate("/buscar")} className="inline-flex items-center gap-1 text-sm font-semibold text-kelder-600">
            Explorar productos
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:gap-4 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {recomendaciones.slice(0, 4).map((p) => (
            <div key={p.id} className="w-[58%] min-w-[168px] max-w-[210px] shrink-0 snap-start sm:w-[46%] sm:max-w-none lg:w-auto lg:min-w-0">
              <ProductCard producto={p} onClick={() => navigate(`/producto/${p.id}`)} />
            </div>
          ))}
        </div>
      </section>

      {/* 5 · Featured campaign — light, photographic, launch theme */}
      <div className="mt-8 lg:mt-10">
        <PromoBanner campania={campaniaDestacada} onClick={() => navigate("/buscar")} />
      </div>

      {/* 6 · Nearest store */}
      <div className="mt-10 lg:mt-16">
        <StorePreview tienda={tiendaCercana} onDirections={() => navigate("/tiendas")} onVerTodas={() => navigate("/tiendas")} />
      </div>

      {modal === "qr" && <QRModal onClose={() => setModal(null)} />}
      {modal === "canjear" && <RedeemFlow onClose={() => setModal(null)} />}
    </div>
  );
}

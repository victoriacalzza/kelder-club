import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KelderCard } from "@/components/ui/KelderCard";
import { CreditoVadesResumen } from "@/components/ui/CreditoVadesResumen";
import { OrderInProgress } from "@/components/ui/OrderInProgress";
import { PromoBanner } from "@/components/ui/PromoBanner";
import { MarcasMarquee } from "@/components/ui/MarcasMarquee";
import { StoreContextModule } from "@/components/ui/StoreContextModule";
import { ExtendedCatalogTeaser } from "@/components/ui/ExtendedCatalogTeaser";
import { QRModal } from "@/components/modals/QRModal";
import { RedeemFlow } from "@/components/modals/RedeemFlow";
import { track } from "@/lib/analytics";
import {
  campaniaDestacada,
  pedidoActivo,
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

      {/* 1 · Cashback hero — compact on mobile. Its primary action turns the balance into
          commercial discovery (Ver qué puedo comprar); paying with QR lives in the Pagar action. */}
      <div className="mt-6">
        <KelderCard
          cashback={profile.cashback}
          onShowQR={() => setModal("qr")}
          onUse={() => setModal("canjear")}
          onStart={() => navigate("/tiendas")}
          onComprar={() => {
            track("cashback_product_click", { cashback: profile.cashback });
            navigate("/aprovecha-cashback");
          }}
        />
      </div>

      {/* Business units — compact recognition strip */}
      <div className="mt-7">
        <MarcasMarquee onSelect={() => navigate("/buscar")} />
      </div>

      {/* 2 · Crédito y vales — Home only RESUMES and DIRECTS into the dedicated tab. Content is
          built from the member's real state; it never shows products/catalog/promotions/cashback. */}
      <div className="mt-8">
        <CreditoVadesResumen
          tieneCredito={profile.credito === "con_vales" || profile.credito === "sin_vales"}
          tieneCredivales={profile.credito === "con_vales"}
          onVer={() => navigate("/vales")}
          onConocerCredito={() => navigate("/vales")}
          onConocerCredivale={() => navigate("/vales")}
        />
      </div>

      {/* 3 · Order in progress — only when one exists */}
      {profile.pedidoEnCurso && (
        <div className="mt-8">
          <OrderInProgress pedido={pedidoActivo} onTrack={() => navigate(`/compras/${pedidoActivo.compraId}`)} />
        </div>
      )}

      {/* 4 · Store-driven discovery — HOME → PRODUCTO → TIENDA → VISITA */}
      <div className="mt-12 lg:mt-14">
        <StoreContextModule />
      </div>

      {/* 5 · Catálogo extendido — natural continuation of the in-store carousel (before any campaign) */}
      <div className="mt-5">
        <ExtendedCatalogTeaser />
      </div>

      {/* 6 · Promociones — featured campaign, leads to actionable promotions */}
      <div className="mt-12 lg:mt-14">
        <PromoBanner campania={campaniaDestacada} onClick={() => navigate("/promociones")} />
      </div>

      {modal === "qr" && <QRModal onClose={() => setModal(null)} />}
      {modal === "canjear" && <RedeemFlow onClose={() => setModal(null)} />}
    </div>
  );
}

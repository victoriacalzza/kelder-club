import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { KelderCard } from "@/components/ui/KelderCard";
import { CreditoVadesResumen } from "@/components/ui/CreditoVadesResumen";
import { CreditoKelderCard } from "@/components/ui/CreditoKelderCard";
import { OrderInProgress } from "@/components/ui/OrderInProgress";
import { PromoBanner } from "@/components/ui/PromoBanner";
import { MarcasMarquee } from "@/components/ui/MarcasMarquee";
import { StoreContextModule } from "@/components/ui/StoreContextModule";
import { QRModal } from "@/components/modals/QRModal";
import { RedeemFlow } from "@/components/modals/RedeemFlow";
import { track } from "@/lib/analytics";
import {
  campaniaDestacada,
  pedidoActivo,
  user,
  perfilDemo,
  formatMXN,
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

      {/* 1 · Cashback hero — compact on mobile. Paying with QR lives in the central Pagar action. */}
      <div className="mt-6">
        <KelderCard
          cashback={profile.cashback}
          onShowQR={() => setModal("qr")}
          onUse={() => setModal("canjear")}
          onStart={() => navigate("/tiendas")}
          onVerMovimientos={() => navigate("/cashback")}
        />
      </div>

      {/* Cashback → catalog bridge: make the balance actionable, not just a number */}
      <button
        onClick={() => {
          track("cashback_product_click", { cashback: profile.cashback });
          navigate("/catalogo");
        }}
        className="mt-3 flex w-full items-center justify-between rounded-2xl border border-ink-100 bg-white px-4 py-3 text-left shadow-soft"
      >
        <span className="text-sm text-ink-700">
          Tienes <span className="font-semibold text-ink-900">{formatMXN(profile.cashback)}</span> de cashback
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-kelder-600">
          Ver qué puedo comprar
          <ArrowRight size={15} aria-hidden="true" />
        </span>
      </button>

      {/* Business units — compact recognition strip */}
      <div className="mt-7">
        <MarcasMarquee onSelect={() => navigate("/buscar")} />
      </div>

      {/* 2 · Crédito y vales — Home only RESUMES and DIRECTS into the dedicated tab */}
      <div className="mt-8">
        {profile.credito === "no_miembro" ? (
          <CreditoKelderCard onConocer={() => navigate("/vales")} />
        ) : (
          <CreditoVadesResumen onVer={() => navigate("/vales")} onDescubrir={() => navigate("/catalogo")} />
        )}
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

      {/* 5 · Featured campaign — light, photographic, launch theme */}
      <div className="mt-10 lg:mt-12">
        <PromoBanner campania={campaniaDestacada} onClick={() => navigate("/promociones")} />
      </div>

      {modal === "qr" && <QRModal onClose={() => setModal(null)} />}
      {modal === "canjear" && <RedeemFlow onClose={() => setModal(null)} />}
    </div>
  );
}

import { Canvas, Storyboard } from "tempo-sdk/canvas";
import Homestoryboard from "./HomeStoryboard";
import Valesstoryboard from "./ValesStoryboard";
import Valesemptystoryboard from "./ValesEmptyStoryboard";
import Valedetailstoryboard from "./ValeDetailStoryboard";
import Cashbackstoryboard from "./CashbackStoryboard";
import Qrmodalstoryboard from "./QRModalStoryboard";
import Redeemflowstoryboard from "./RedeemFlowStoryboard";
import Comprasstoryboard from "./ComprasStoryboard";
import Perfilstoryboard from "./PerfilStoryboard";
import Tiendasstoryboard from "./TiendasStoryboard";
import Homesincashbackstoryboard from "./HomeSinCashbackStoryboard";
import Homesinvalesstoryboard from "./HomeSinValesStoryboard";
import Homesincredivalestoryboard from "./HomeSinCredivaleStoryboard";
import Buscartextostoryboard from "./BuscarTextoStoryboard";
import Buscarcodigostoryboard from "./BuscarCodigoStoryboard";
import Buscarfotostoryboard from "./BuscarFotoStoryboard";
import Buscarresultadosstoryboard from "./BuscarResultadosStoryboard";
import Buscarsinresultadosstoryboard from "./BuscarSinResultadosStoryboard";
import Productodetallestoryboard from "./ProductoDetalleStoryboard";
import Compradetallestoryboard from "./CompraDetalleStoryboard";
import Valessincreditostoryboard from "./ValesSinCreditoStoryboard";
import Valesvaciosstoryboard from "./ValesVaciosStoryboard";
import Creditodetallestoryboard from "./CreditoDetalleStoryboard";
import Valesenpagostoryboard from "./ValesEnPagoStoryboard";
import Valesenpagomobilestoryboard from "./ValesEnPagoMobileStoryboard";
import Homemobilestoryboard from "./HomeMobileStoryboard";
import Creditokelderinvitacionmobilestoryboard from "./CreditoKelderInvitacionMobileStoryboard";
import Mobilenavhomestoryboard from "./MobileNavHomeStoryboard";
import Mobileclubstoryboard from "./MobileClubStoryboard";
import Mobilepagarstoryboard from "./MobilePagarStoryboard";
import Valesextravalesstoryboard from "./ValesExtravalesStoryboard";
import Extravaledetallestoryboard from "./ExtravaleDetalleStoryboard";
import Buscarmobilestoryboard from "./BuscarMobileStoryboard";
import Buscardrawerstoryboard from "./BuscarDrawerStoryboard";
import Buscartabletstoryboard from "./BuscarTabletStoryboard";
import Buscarmobileiniciostoryboard from "./BuscarMobileInicioStoryboard";

export default function KelderClubRedesignCanvas() {
  return (
    <Canvas name="Kelder Club Redesign">
      <Storyboard
        id="Home"
        name="1. Home"
        component={Homestoryboard}
        layout={{ x: 0, y: 0, width: 1440, height: 2020 }}
      />
      <Storyboard
        id="MisVales"
        name="2. Crédito y vales · A (crédito + vales)"
        component={Valesstoryboard}
        layout={{ x: 0, y: 2100, width: 1440, height: 760 }}
      />
      <Storyboard
        id="Cashback"
        name="3. Cashback"
        component={Cashbackstoryboard}
        layout={{ x: 0, y: 2940, width: 1440, height: 780 }}
      />
      <Storyboard
        id="Compras"
        name="4. Compras"
        component={Comprasstoryboard}
        layout={{ x: 0, y: 3800, width: 1440, height: 940 }}
      />
      <Storyboard
        id="Perfil"
        name="5. Perfil"
        component={Perfilstoryboard}
        layout={{ x: 0, y: 4820, width: 1440, height: 900 }}
      />
      <Storyboard
        id="DetalleVale"
        name="6. Detalle de CrediVale"
        component={Valedetailstoryboard}
        layout={{ x: 1540, y: 0, width: 1440, height: 1500 }}
      />
      <Storyboard
        id="MisValesVacio"
        name="Crédito y vales · B (crédito, sin CrediVales)"
        component={Valesemptystoryboard}
        layout={{ x: 1540, y: 860, width: 1100, height: 620 }}
      />
      <Storyboard
        id="ValesSinCredito"
        name="Crédito y vales · C (sin crédito, con CrediVales)"
        component={Valessincreditostoryboard}
        layout={{ x: 6160, y: 5100, width: 1440, height: 900 }}
      />
      <Storyboard
        id="ValesVacios"
        name="Crédito y vales · Descubrimiento (ambos vacíos)"
        component={Valesvaciosstoryboard}
        layout={{ x: 4620, y: 5100, width: 1100, height: 980 }}
      />
      <Storyboard
        id="CreditoDetalle"
        name="Mi Crédito Kelder"
        component={Creditodetallestoryboard}
        layout={{ x: 3080, y: 5100, width: 1440, height: 1120 }}
      />
      <Storyboard
        id="ValesEnPago"
        name="CrediVales · En pago (desktop)"
        component={Valesenpagostoryboard}
        layout={{ x: 4620, y: 6400, width: 1440, height: 1600 }}
      />
      <Storyboard
        id="ValesEnPagoMobile"
        name="CrediVales · En pago (móvil 390)"
        component={Valesenpagomobilestoryboard}
        layout={{ x: 6160, y: 6400, width: 390, height: 1900 }}
      />
      <Storyboard
        id="HomeMobile"
        name="Home · productos (móvil 390)"
        component={Homemobilestoryboard}
        layout={{ x: 6620, y: 6400, width: 390, height: 2200 }}
      />
      <Storyboard
        id="CreditoKelderInvMobile"
        name="Invitación Crédito Kelder (móvil 390)"
        component={Creditokelderinvitacionmobilestoryboard}
        layout={{ x: 8700, y: 6400, width: 390, height: 620 }}
      />
      <Storyboard
        id="MobileNavHome"
        name="App móvil · Home + bottom nav (390×844)"
        component={Mobilenavhomestoryboard}
        layout={{ x: 9200, y: 6400, width: 390, height: 844 }}
      />
      <Storyboard
        id="MobileHomeFull"
        name="App móvil · Home completo (390)"
        component={Mobilenavhomestoryboard}
        layout={{ x: 10700, y: 6400, width: 390, height: 2160 }}
      />
      <Storyboard
        id="MobileHome360"
        name="App móvil · Home (360 · iPhone SE/Android)"
        component={Mobilenavhomestoryboard}
        layout={{ x: 11200, y: 6400, width: 360, height: 2160 }}
      />
      <Storyboard
        id="HomeTablet768"
        name="App · Home tablet (768)"
        component={Mobilenavhomestoryboard}
        layout={{ x: 11700, y: 6400, width: 768, height: 1500 }}
      />
      <Storyboard
        id="MobileClub"
        name="App móvil · Mi Club (390×844)"
        component={Mobileclubstoryboard}
        layout={{ x: 9700, y: 6400, width: 390, height: 844 }}
      />
      <Storyboard
        id="MobilePagar"
        name="App móvil · Sheet Pagar (390×844)"
        component={Mobilepagarstoryboard}
        layout={{ x: 10200, y: 6400, width: 390, height: 844 }}
      />
      <Storyboard
        id="ValesExtravales"
        name="CrediVales · Extravales"
        component={Valesextravalesstoryboard}
        layout={{ x: 7100, y: 6400, width: 1100, height: 900 }}
      />
      <Storyboard
        id="ExtravaleDetalle"
        name="Detalle de Extravale"
        component={Extravaledetallestoryboard}
        layout={{ x: 8280, y: 6400, width: 900, height: 900 }}
      />
      <Storyboard
        id="MostrarQR"
        name="8. Modal — Mostrar QR"
        component={Qrmodalstoryboard}
        layout={{ x: 1540, y: 1500, width: 900, height: 780 }}
      />
      <Storyboard
        id="CanjearCashback"
        name="9. Flujo — Canjear cashback"
        component={Redeemflowstoryboard}
        layout={{ x: 1540, y: 2360, width: 900, height: 880 }}
      />
      <Storyboard
        id="Tiendas"
        name="10. Tiendas"
        component={Tiendasstoryboard}
        layout={{ x: 1540, y: 3320, width: 1440, height: 820 }}
      />
      <Storyboard
        id="HomeSinCashback"
        name="Estado — Sin cashback + sin CrediVale"
        component={Homesincashbackstoryboard}
        layout={{ x: 3080, y: 0, width: 1440, height: 1900 }}
      />
      <Storyboard
        id="CreditoBloqueB"
        name="Home — sin CrediVales (estado vacío)"
        component={Homesinvalesstoryboard}
        layout={{ x: 4620, y: 0, width: 1440, height: 1820 }}
      />
      <Storyboard
        id="CreditoBloqueC"
        name="Home — sin Crédito Kelder (invitación)"
        component={Homesincredivalestoryboard}
        layout={{ x: 6160, y: 0, width: 1440, height: 1900 }}
      />
      <Storyboard
        id="BuscarTexto"
        name="Buscar — inicial (Texto)"
        component={Buscartextostoryboard}
        layout={{ x: 3080, y: 2000, width: 1440, height: 760 }}
      />
      <Storyboard
        id="BuscarCodigo"
        name="Buscar — Código"
        component={Buscarcodigostoryboard}
        layout={{ x: 4620, y: 2000, width: 1440, height: 620 }}
      />
      <Storyboard
        id="BuscarFoto"
        name="Buscar — Foto"
        component={Buscarfotostoryboard}
        layout={{ x: 6160, y: 2000, width: 1440, height: 700 }}
      />
      <Storyboard
        id="BuscarResultados"
        name="Buscar — resultados (grid)"
        component={Buscarresultadosstoryboard}
        layout={{ x: 3080, y: 2860, width: 1440, height: 1160 }}
      />
      <Storyboard
        id="BuscarSinResultados"
        name="Buscar — sin resultados"
        component={Buscarsinresultadosstoryboard}
        layout={{ x: 4620, y: 2860, width: 1440, height: 720 }}
      />
      <Storyboard
        id="BuscarTablet"
        name="Buscar — tablet (768)"
        component={Buscartabletstoryboard}
        layout={{ x: 6160, y: 6100, width: 768, height: 1200 }}
      />
      <Storyboard
        id="BuscarMobile"
        name="Buscar — móvil resultados (390)"
        component={Buscarmobilestoryboard}
        layout={{ x: 7000, y: 6100, width: 390, height: 1200 }}
      />
      <Storyboard
        id="BuscarMobileInicio"
        name="Buscar — móvil inicio (390)"
        component={Buscarmobileiniciostoryboard}
        layout={{ x: 7460, y: 6100, width: 390, height: 900 }}
      />
      <Storyboard
        id="BuscarDrawer"
        name="Buscar — móvil filtros (390)"
        component={Buscardrawerstoryboard}
        layout={{ x: 7920, y: 6100, width: 390, height: 1200 }}
      />
      <Storyboard
        id="ProductoDetalle"
        name="Detalle de producto"
        component={Productodetallestoryboard}
        layout={{ x: 6160, y: 2860, width: 1440, height: 1120 }}
      />
      <Storyboard
        id="CompraDetalle"
        name="Detalle de compra (ticket)"
        component={Compradetallestoryboard}
        layout={{ x: 6160, y: 4060, width: 1440, height: 980 }}
      />
    </Canvas>
  );
}

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

export default function KelderClubRedesignCanvas() {
  return (
    <Canvas name="Kelder Club Redesign">
      <Storyboard
        id="Home"
        name="1. Home"
        component={Homestoryboard}
        layout={{ x: 0, y: 0, width: 1440, height: 1000 }}
      />
      <Storyboard
        id="MisVales"
        name="2. Mis Vales"
        component={Valesstoryboard}
        layout={{ x: 0, y: 1080, width: 1440, height: 760 }}
      />
      <Storyboard
        id="Cashback"
        name="3. Cashback"
        component={Cashbackstoryboard}
        layout={{ x: 0, y: 1920, width: 1440, height: 780 }}
      />
      <Storyboard
        id="Compras"
        name="4. Compras"
        component={Comprasstoryboard}
        layout={{ x: 0, y: 2780, width: 1440, height: 940 }}
      />
      <Storyboard
        id="Perfil"
        name="5. Perfil"
        component={Perfilstoryboard}
        layout={{ x: 0, y: 3800, width: 1440, height: 900 }}
      />
      <Storyboard
        id="DetalleVale"
        name="6. Detalle de vale"
        component={Valedetailstoryboard}
        layout={{ x: 1540, y: 0, width: 1440, height: 780 }}
      />
      <Storyboard
        id="MisValesVacio"
        name="7. Mis Vales — vacío"
        component={Valesemptystoryboard}
        layout={{ x: 1540, y: 860, width: 1100, height: 560 }}
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
    </Canvas>
  );
}

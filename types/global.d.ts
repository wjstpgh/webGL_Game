import { OrbitControls } from "three/examples/jsm/Addons.js";

export declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: OrbitControls;
      portalMaterial: PortalMaterial;
    }
  }
}

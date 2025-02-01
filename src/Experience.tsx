import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.js";
import Level from "./Level.js";
import { Physics } from "@react-three/rapier";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />

      <Physics debug>
        <Lights />

        <Level />
      </Physics>
    </>
  );
}

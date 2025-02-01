import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";

interface BlockProps {
  position?: number[];
}

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

const BlockStart = ({ position = [0, 0, 0] }: BlockProps) => {
  return (
    <group position={new THREE.Vector3(...position)}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
};

const BlockSpinner = ({ position = [0, 0, 0] }: BlockProps) => {
  const obstacle = useRef<RapierRigidBody>(null!);
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={new THREE.Vector3(...position)}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const Level = () => {
  return (
    <>
      <BlockStart position={[0, 0, 4]} />
      <BlockSpinner position={[0, 0, 0]} />
    </>
  );
};

export default Level;

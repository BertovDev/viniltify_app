import React from "react";
import { SpotLight } from "@react-three/drei";

export default function Lights({ refLight }) {
  return (
    <group ref={refLight}>
      <SpotLight
        castShadow
        distance={100}
        angle={5}
        attenuation={6}
        anglePower={6} // Diffuse-cone anglePower (default: 5)
        color="#c21728"
        position={[5, 4, 0]}
      />
      <SpotLight
        castShadow
        distance={100}
        angle={5}
        attenuation={6}
        anglePower={6} // Diffuse-cone anglePower (default: 5)
        color="#110dfc"
        position={[-5, 4, 0]}
      />
      <SpotLight
        castShadow
        distance={100}
        angle={5}
        attenuation={6}
        anglePower={6} // Diffuse-cone anglePower (default: 5)
        color="#6504db"
        position={[2, 4, -3]}
      />
    </group>
  );
}

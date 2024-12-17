import React, { useRef } from "react";
import { SpotLight } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

export default function Lights({ refLight }) {
  const light1 = useRef();
  const light2 = useRef();
  const light3 = useRef();

  const light1Controls = useControls("Light 1", {
    intensity: { value: 2, min: 0, max: 10 },
    positionX: { value: 0, min: -10, max: 10 },
    positionY: { value: 5, min: -10, max: 10 },
    positionZ: { value: 0, min: -10, max: 10 },
    angle: { value: 0.5, min: 0, max: Math.PI / 2 },
    penumbra: { value: 1, min: 0, max: 1 },
    color: "#c21728",
  });

  const light2Controls = useControls("Light 2", {
    intensity: { value: 2, min: 0, max: 10 },
    positionX: { value: 0, min: -10, max: 10 },
    positionY: { value: 5, min: -10, max: 10 },
    positionZ: { value: 0, min: -10, max: 10 },
    angle: { value: 0.5, min: 0, max: Math.PI / 2 },
    penumbra: { value: 1, min: 0, max: 1 },
    color: "#110dfc",
  });

  const light3Controls = useControls("Light 3", {
    intensity: { value: 2, min: 0, max: 10 },
    positionX: { value: 0, min: -10, max: 10 },
    positionY: { value: 5, min: -10, max: 10 },
    positionZ: { value: 0, min: -10, max: 10 },
    angle: { value: 0.5, min: 0, max: Math.PI / 2 },
    penumbra: { value: 1, min: 0, max: 1 },
    color: "#6504db",
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    light1.current.position.x = Math.sin(t * 0.7) * 3;
    light1.current.position.z = Math.cos(t * 0.7) * 3;

    light2.current.position.x = Math.sin(t * 0.5 + 2) * 3;
    light2.current.position.z = Math.cos(t * 0.5 + 2) * 3;

    light3.current.position.x = Math.sin(t * 0.3 + 4) * 3;
    light3.current.position.z = Math.cos(t * 0.3 + 4) * 3;

    // light1.current.color.setHSL((t * 0.1) % 1, 1, 0.5);
    // light2.current.color.setHSL((t * 0.1 + 0.3) % 1, 1, 0.5);
    // light3.current.color.setHSL((t * 0.1 + 0.6) % 1, 1, 0.5);
  });

  return (
    <group ref={refLight}>
      <spotLight
        ref={light1}
        intensity={light1Controls.intensity}
        position={[
          light1Controls.positionX,
          light1Controls.positionY,
          light1Controls.positionZ,
        ]}
        angle={light1Controls.angle}
        penumbra={light1Controls.penumbra}
        color={light1Controls.color}
      />
      <spotLight
        ref={light2}
        intensity={light2Controls.intensity}
        position={[
          light2Controls.positionX,
          light2Controls.positionY,
          light2Controls.positionZ,
        ]}
        angle={light2Controls.angle}
        penumbra={light2Controls.penumbra}
        color={light2Controls.color}
      />
      <spotLight
        ref={light3}
        intensity={light3Controls.intensity}
        position={[
          light3Controls.positionX,
          light3Controls.positionY,
          light3Controls.positionZ,
        ]}
        angle={light3Controls.angle}
        penumbra={light3Controls.penumbra}
        color={light3Controls.color}
      />
    </group>
  );
}

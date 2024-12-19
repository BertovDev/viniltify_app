import React, { useRef } from "react";
import { SpotLight } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

export default function Lights() {
  const light1 = useRef();

  const light1Controls = useControls("Light 1", {
    intensity: { value: 5.7, min: 0, max: 10 },
    positionX: { value: 0, min: -10, max: 10 },
    positionY: { value: 2, min: -10, max: 10 },
    positionZ: { value: 0, min: -10, max: 10 },
    angle: { value: 1.02, min: 0, max: Math.PI / 2 },
    penumbra: { value: 0.36, min: 0, max: 1 },
    color: "#ffffff",
  });

  useFrame(({ pointer, viewport }) => {
    const mouseX = 0.5 + (pointer.x * viewport.width) / 2;
    const mouseY = pointer.y * 10;

    light1.current.position.z = -mouseY;
    light1.current.position.x = mouseX;
  });

  return (
    <pointLight
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
      distance={light1Controls.distance}
    />
  );
}

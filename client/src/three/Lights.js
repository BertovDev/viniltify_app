import React, { useEffect, useRef } from "react";
import { SpotLight, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame, useThree } from "@react-three/fiber";
import { AxesHelper, Object3D, PointLightHelper, Vector3 } from "three";

export default function Lights() {
  const light1 = useRef();
  const target = new Vector3(0, 0, 0);
  // useHelper(light1, PointLightHelper, 1, "red");

  const light1Controls = useControls("Light 1", {
    intensity: { value: 5.7, min: 0, max: 10 },
    positionX: { value: 0, min: -10, max: 10 },
    positionY: { value: 2, min: -10, max: 10 },
    positionZ: { value: 0, min: -10, max: 10 },
    rotationX: { value: 0, min: -10, max: 10 },
    rotationY: { value: 0, min: -10, max: 10 },
    rotationZ: { value: 0, min: -10, max: 10 },

    angle: { value: 1.02, min: 0, max: Math.PI / 2 },
    penumbra: { value: 0.36, min: 0, max: 1 },
    color: "#ffffff",
  });

  const light2Controls = useControls("point 2", {
    intensity: { value: 6.6, min: 0, max: 10 },
    positionX: { value: 3.8, min: -10, max: 10 },
    positionY: { value: 1.8, min: -10, max: 10 },
    positionZ: { value: 0, min: -10, max: 10 },
    rotationX: { value: 0, min: -10, max: 10 },
    rotationY: { value: 0, min: -10, max: 10 },
    rotationZ: { value: 0, min: -10, max: 10 },
    angle: { value: 0.9, min: 0, max: Math.PI / 2 },
    penumbra: { value: 0.46, min: 0, max: 1 },
    color: "#ffffff",
  });

  useFrame(({ pointer, viewport, camera }) => {
    camera.getWorldDirection(target);

    const directionZ = target.z / Math.abs(target.z);
    const directionY = target.y / Math.abs(target.y);
    const directionX = target.x / Math.abs(target.x);

    // Calculate mouse position in world space
    const mouseX = (pointer.x * viewport.width) / 2;
    const mouseY = pointer.y * 10 * directionZ;

    // Define camera orientation states
    const isCameraFacingBack = directionX === -1 && directionY === -1;
    const isCameraFacingForward = directionZ === 1;

    // Determine light position adjustments based on camera orientation
    let lightPositionX = mouseX;
    let lightPositionZ = mouseY;

    if (isCameraFacingBack) {
      if (isCameraFacingForward) {
        lightPositionX = -mouseY;
        lightPositionZ = -mouseX;
      }
    } else if (isCameraFacingForward) {
      lightPositionX = mouseY;
      lightPositionZ = mouseX;
    }

    light1.current.position.x = lightPositionX;
    light1.current.position.z = lightPositionZ;
  });

  return (
    <>
      <pointLight
        ref={light1}
        intensity={light1Controls.intensity}
        position={[
          light1Controls.positionX,
          light1Controls.positionY,
          light1Controls.positionZ,
        ]}
        rotation={[
          light1Controls.rotationX,
          light1Controls.rotationY,
          light1Controls.rotationZ,
        ]}
        angle={light1Controls.angle}
        penumbra={light1Controls.penumbra}
        color={light1Controls.color}
        distance={light1Controls.distance}
      />
      <pointLight
        intensity={light2Controls.intensity}
        position={[
          light2Controls.positionX,
          light2Controls.positionY,
          light2Controls.positionZ,
        ]}
        rotation={[
          light2Controls.rotationX,
          light2Controls.rotationY,
          light2Controls.rotationZ,
        ]}
        angle={light2Controls.angle}
        penumbra={light2Controls.penumbra}
        color={light2Controls.color}
        distance={light2Controls.distance}
      />
    </>
  );
}

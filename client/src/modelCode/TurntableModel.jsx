/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 public/turntable/turntableFinal3.glb 
*/

import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { changePointer } from "../Utils";

export function TurntableModel({ handleClick, isPlaying }, props) {
  const { nodes, materials } = useGLTF("turntable/turntableFinal3.glb");
  const armRef = useRef();

  const position = [0.08, -0.19, -0.14];
  const rotation = [0, 1.5, 0];
  const scale = 2.1;

  const armFinalRotation = [0, -0.47, 0];

  const { auxPos, auxRot, auxScale } = useControls({
    auxPos: position,
    auxRot: rotation,
    auxScale: scale,
  });

  const { armRot } = useControls({
    armRot: [0, 0, 0],
  });

  useFrame(() => {
    if (isPlaying && armRef.current.children[0].rotation.y > -0.47) {
      armRef.current.children.forEach((el) => {
        el.rotation.y -= 0.04;
      });
    }

    if (!isPlaying && armRef.current.children[0].rotation.y < 0) {
      armRef.current.children.forEach((el) => {
        el.rotation.y += 0.04;
      });
    }
  }, [isPlaying]);

  useEffect(() => {}, [isPlaying]);

  return (
    <group
      {...props}
      dispose={null}
      scale={scale}
      rotation={rotation}
      position={position}
    >
      <group position={[-2.66, 1.5, -4.55]}>
        <group position={[-0.377, -1.299, -0.649]}>
          <group position={[-0.042, 0.019, 0]}>
            <mesh
              geometry={nodes.piece_rota3_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[3.429, -0.119, 5.727]}
            />
          </group>
          <group position={[-0.042, 0.019, -0.979]}>
            <mesh
              geometry={nodes.piece_rota5_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[3.429, -0.119, 5.727]}
            />
          </group>
          <group position={[0.997, 0, 0]}>
            <mesh
              geometry={nodes.Pied_platine3_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[2.293, -0.283, 5.844]}
            />
          </group>
          <group position={[0.997, 0, 0]}>
            <mesh
              geometry={nodes.Pied_platine4_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[2.293, -0.283, 4.666]}
            />
          </group>
          <group position={[0.377, 1.299, 0.727]}>
            <mesh
              geometry={nodes.tapis1_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[2.399, -1.387, 4.352]}
            />
          </group>
          <mesh
            geometry={nodes.base_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[2.803, 0.702, 5.174]}
          />
          <mesh
            geometry={nodes.base_bras_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[3.063, -0.119, 5.655]}
          />
          <group position={[0, 0, -0.03]}>
            <mesh
              geometry={nodes.pCylinder4_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[2.316, -0.119, 5.499]}
            />
          </group>
          <group position={[0, 0.163, -0.03]} scale={[1, 2.52, 1]}>
            <mesh
              geometry={nodes.pCylinder5_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[2.315, -0.108, 5.499]}
            />
          </group>
          <group position={[0, 0, 0.108]}>
            <mesh
              geometry={nodes.pCylinder6_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[2.316, -0.119, 5.499]}
            />
          </group>
          <group position={[0, 0.163, 0.108]} scale={[1, 2.52, 1]}>
            <mesh
              geometry={nodes.pCylinder7_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[2.315, -0.108, 5.499]}
            />
          </group>

          <mesh
            geometry={nodes.centre_base_bras_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[-10.148, 0, 0]}
          />
          <group
            name="Arm"
            onClick={handleClick}
            ref={armRef}
            onPointerOver={() => changePointer(true)}
            onPointerLeave={() => changePointer(false)}
          >
            <mesh
              geometry={nodes.bras_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[3.056, -0.036, 5.65]}
            />
            <mesh
              geometry={nodes.tete_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[3.057, -0.036, 5.648]}
            />
            <mesh
              geometry={nodes.pointe1_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[3.057, -0.036, 5.648]}
            />
            <mesh
              geometry={nodes.base1_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[3.057, -0.036, 5.648]}
            />
            <mesh
              geometry={nodes.contre_poids_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[3.057, -0.036, 5.648]}
            />
            <mesh
              geometry={nodes.pivot_bras_lambert1_0.geometry}
              material={materials["lambert1.001"]}
              position={[3.056, -0.036, 5.65]}
            />
          </group>

          {/* <mesh
            geometry={nodes.couvercle_lambert2_0.geometry}
            material={materials["lambert2.001"]}
            position={[3.378, -0.083, 5.278]}
          /> */}
          <mesh
            geometry={nodes.Pied_platine1_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[2.293, -0.283, 4.666]}
          />
          <mesh
            geometry={nodes.Pied_platine2_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[2.293, -0.283, 5.844]}
          />

          <mesh
            geometry={nodes.plateau_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[2.785, -0.105, 5.076]}
          />
          <mesh
            geometry={nodes.pointe_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[2.775, -0.086, 5.079]}
          />
          <mesh
            geometry={nodes.porte_bras_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[2.886, -0.064, 5.7]}
          />
          <mesh
            geometry={nodes.potard_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[2.632, -0.111, 5.818]}
          />
          <mesh
            geometry={nodes.Potards2_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[2.299, -0.105, 4.698]}
          />
          <mesh
            geometry={nodes.Potards3_lambert1_0.geometry}
            material={materials["lambert1.001"]}
            position={[2.299, -0.105, 4.602]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("turntable/turntableFinal3.glb");

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model3(props) {
  const { nodes, materials } = useGLTF('/vinyl_3.gltf')
  return (
    <group {...props} dispose={null}>
      <pointLight intensity={3} decay={2} position={[0.22, 0.05, 0.3]} rotation={[-1.84, 0.6, 1.93]} />
      <pointLight intensity={0.1} decay={2} position={[0.27, 0.07, -0.11]} rotation={[-1.84, 0.6, 1.93]} />
      <group position={[-0.201, 0.02, 0.105]}>
        <mesh geometry={nodes.Cylinder095.geometry} material={materials.PowerOnOff} />
        <mesh geometry={nodes.Cylinder095_1.geometry} material={materials['Tex.Power-OnOff.top']} />
        <mesh geometry={nodes.Cylinder095_2.geometry} material={materials['LED.Power.emi']} />
        <mesh geometry={nodes.Cylinder095_3.geometry} material={materials['Tex.Power-Noppen.side']} />
      </group>
      <mesh geometry={nodes['05Adapter'].geometry} material={materials.Adapter} position={[-0.19, 0.02, -0.14]} />
      <mesh geometry={nodes['03Pitcher'].geometry} material={materials.Pitcher} position={[0.1958, 0.03, 0.07]} />
      <group position={[-0.05, 0.04, 0]}>
        <mesh geometry={nodes.Cylinder106.geometry} material={materials['Tex.Technics-Matte_2nd']} />
        <mesh geometry={nodes.Cylinder106_1.geometry} material={materials['Tex.Technics-Matte_2nd']}/>
      </group>
      <group position={[-0.05, 0.04, 0]}>
        <mesh geometry={nodes.Cylinder001.geometry} material={materials['Disk.silver']} />
        <mesh geometry={nodes.Cylinder001_1.geometry} material={materials['Tex.Dots']} />
      </group>
      <group position={[0.15, 0.04, -0.09]} rotation={[0,-0.1,0]}>
        <mesh geometry={nodes.Circle028.geometry} material={materials.Armbase} />
        <mesh geometry={nodes.Circle028_1.geometry} material={materials.Clip} />
        <mesh geometry={nodes.Circle028_2.geometry} material={materials.Screws} />
        <mesh geometry={nodes.Circle028_3.geometry} material={materials.Armholder} />
        <mesh geometry={nodes.Circle028_4.geometry} material={materials.Lift} />
      </group>
      <group position={[0, 0.02, 0]}>
        <mesh geometry={nodes.Cube078.geometry} material={materials['Tex.Model']} />
        <mesh geometry={nodes.Cube078_1.geometry} material={materials.TopCover} />
        <mesh geometry={nodes.Cube078_2.geometry} material={materials['Tex.Speed']} />
        <mesh geometry={nodes.Cube078_3.geometry} material={materials['LED.Pitcher.emi']} />
        <mesh geometry={nodes.Cube078_4.geometry} material={materials['Tex.Pichter']} />
        <mesh geometry={nodes.Cube078_5.geometry} material={materials['Tex.PitchAdj']} />
        <mesh geometry={nodes.Cube078_6.geometry} material={materials.Body} />
        <mesh geometry={nodes.Cube078_7.geometry} material={materials['Cinch.gold']} />
        <mesh geometry={nodes.Cube078_8.geometry} material={materials['Cinch.red']} />
        <mesh geometry={nodes.Cube078_9.geometry} material={materials['Cinch.white']} />
        <mesh geometry={nodes.Cube078_10.geometry} material={materials['Stands.chrome']} />
        <mesh geometry={nodes.Cube078_11.geometry} material={materials['Stands.rubber']} />
        <mesh geometry={nodes.Cube078_12.geometry} material={materials['Tex.Stands_Noppen']} />
        <mesh geometry={nodes.Cube078_13.geometry} material={materials.KeyFrame} />
        <mesh geometry={nodes.Cube078_14.geometry} material={materials['Tex.33']} />
        <mesh geometry={nodes.Cube078_15.geometry} material={materials['Tex.45']} />
        <mesh geometry={nodes.Cube078_16.geometry} material={materials['LED_45.emi']} />
        <mesh geometry={nodes.Cube078_17.geometry} material={materials['LED_33.emi']} />
        <mesh geometry={nodes.Cube078_18.geometry} material={materials['Tex.StartStop']} />
        <mesh geometry={nodes.Cube078_19.geometry} material={materials.LiPin} />
        <mesh geometry={nodes.Cube078_20.geometry} material={materials['LED.LiPin.emi']} />
        <mesh geometry={nodes.Cube078_21.geometry} material={materials.Base} />
      </group>
      <group position={[0.2, 0.04, -0.08]}>
        <mesh geometry={nodes.Cylinder102.geometry} material={materials['Tex.Antiskating-Scale.top']} />
        <mesh geometry={nodes.Cylinder102_1.geometry} material={materials['Tex.Antiskating-Noppen.side']} />
      </group>
      <group position={[0.15, 0.03, -0.09]}>
        <mesh geometry={nodes.Cylinder103.geometry} material={materials['Tex.Meter-Scale.top']} />
        <mesh geometry={nodes.Cylinder103_1.geometry} material={materials['Tex.Meter-Noppen.side']} />
        <mesh geometry={nodes.Cylinder103_2.geometry} material={materials.Meter} />
      </group>
      <group position={[0.17, 0.04, -0.1]}>
        <mesh geometry={nodes.Cylinder104.geometry} material={materials.Lock} />
        <mesh geometry={nodes.Cylinder104_1.geometry} material={materials['Tex.Lock']} />
      </group>
      <group position={[0.15, 0.05, -0.09]}>
        <mesh geometry={nodes.Cylinder105.geometry} material={materials.Armholder} />
        <mesh geometry={nodes.Cylinder105_1.geometry} material={materials.Screws} />
      </group>
      <group position={[0.18, 0.04, -0.07]}>
        <mesh geometry={nodes.Cube066.geometry} material={materials.Lifter} />
        <mesh geometry={nodes.Cube066_1.geometry} material={materials.Lifter_2} />
      </group>

      {/* position={[]} rotation=[] */}
      <group position={[0.16, 0.06, 0.09]} >
        <mesh geometry={nodes.Cylinder098.geometry} material={materials.si_ma_SysVer} />
        <mesh geometry={nodes.Cylinder098_1.geometry} material={materials.Tex_nop_SysVer} />
        <mesh geometry={nodes.Cylinder098_2.geometry} material={materials.Sys} />
        <mesh geometry={nodes.Cylinder098_3.geometry} material={materials.Lifter_2} />
        <mesh geometry={nodes.Cylinder098_4.geometry} material={materials.Arm} />
        <mesh geometry={nodes.Cylinder098_5.geometry} material={materials.Weight} />
        <mesh geometry={nodes.Cylinder098_6.geometry} material={materials['black.metalic.matt_Gew']} />
        <mesh geometry={nodes.Cylinder098_7.geometry} material={materials['Tex.Weight-Noppen']} />
        <mesh geometry={nodes.Cylinder098_8.geometry} material={materials['chrom.glanz_Arm']} />
        <mesh geometry={nodes.Cylinder098_9.geometry} material={materials['Tex.Weight-Scale']} />
        <mesh geometry={nodes.Cylinder098_10.geometry} material={materials.T} />
        <mesh geometry={nodes.Cylinder098_11.geometry} material={materials.Screws} />
      </group>
      <group position={[-0.05,0.04, 0]}>
        <mesh geometry={nodes.Circle003.geometry} material={materials['Vinyl_5.001']} />
        <mesh geometry={nodes.Circle003_1.geometry} material={materials['Vinyl_2.001']} />
        <mesh geometry={nodes.Circle003_2.geometry} material={materials['Vinyl_3.001']} />
        <mesh geometry={nodes.Circle003_3.geometry} material={materials['Vinyl_4.001']} />
        <mesh geometry={nodes.Circle003_4.geometry} material={materials['Tex.Blender-Label']} />
        <mesh geometry={nodes.Circle003_5.geometry} material={materials['Vinyl.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/vinyl_3.gltf')

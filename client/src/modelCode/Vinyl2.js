/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, PerspectiveCamera, Box,SpotLight, OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import DiskPlane from '../components/DiskPlane';
import {TWEEN} from "three/examples/jsm/libs/tween.module.min.js"
 

function changePointer(hover){
  if(hover){
    document.body.style.cursor = "pointer"
  } else {
    document.body.style.cursor = "grab"
  }
}

function createDiskCollection(){
  let array = []
  let imgArray = ["sm.jpg","as.jpg","ep.jpg","pts.jpg","sa.jpg"];

  for(let i = 0;i<5;i++){

    const angle = Math.random() * Math.PI * 2;
    const radius = 2.5+ Math.random() * 4.5;
    const x = Math.cos(angle) * radius;
    const z = (0.3 +Math.abs((Math.sin(angle) * radius))) * -1;
    const y = (Math.random() * (0.38 - 0.40) ) + 0.38
    const rotation = (Math.random() - 0.5) * 4

    array.push(<DiskPlane key={i} playingTrack={imgArray[i]} position={[x,-y,z]} rotation={[-Math.PI/2,0,rotation]}/>)
  }

  return array;
}

function handleDiskInfo(diskInfo){
  console.log(diskInfo)
}

export function Model2({vinylPlay,setVinylPlay,props}) {
  const animationSpeed = 0.04;
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const [diskArray, setDiskArray] = useState([]);

  const ref = useRef();
  const refLight = useRef();
  const refDisk = useRef();
  const refDiskSupport = useRef();
  const refControls = useRef();
  
  let num;

  const {camera} = useThree()


  useEffect(() => {
    setClicked(vinylPlay);
  },[vinylPlay])

  
  useEffect(() => {
    setDiskArray(createDiskCollection());
    document.body.style.cursor = "grab"
    refControls.current.enabled = false

    new TWEEN.Tween(camera.position.set(0.1,1.5,1)).to({ // from camera position
      x: 0.3, //desired x position to go
      y: 3, //desired y position to go
      z: 5 //desired z position to go
  }, 5500) // time take to animate
  .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
  .onComplete(function () { //on finish animation
      refControls.current.enabled = true;
      TWEEN.remove(this) // remove the animation from memory
  })
  
    new TWEEN.Tween(camera.rotation.set(camera.rotation.x - 0.5,camera.rotation.y,camera.rotation.z)).to({
      x:-0.5404195002705843,
      y:camera.rotation.y,
      z:camera.rotation.z,
    },5500)
    .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start()
    .onComplete(function () { //on finish animation
      TWEEN.remove(this) // remove the animation from memory
    })

  },[])


  useFrame((state,delta) => {
    num = (ref.current.rotation.y)
    
    // pivot rotation to disk
    if(clicked && ref.current.rotation.y < 0.7){
        ref.current.rotation.y += animationSpeed
    }

    // pivotX rotation
    if(num.toFixed(2) == 0.72){
      ref.current.rotation.x = Math.PI + 0.09
    } else {
      ref.current.rotation.x = Math.PI
    }
    // pivot rotation to 0
    if(!clicked && ref.current.rotation.y > 0 ){
      ref.current.rotation.y -= animationSpeed
    }
    // diskSupport and disk rotation
    if(clicked && num.toFixed(2) == 0.72){
      refDisk.current.rotation.y += animationSpeed - 0.02
      refDiskSupport.current.rotation.y += animationSpeed - 0.02;
    }

    if(clicked){
      refLight.current.rotation.y += 0.02
    }

  },[clicked])

  useFrame(() => {
    TWEEN.update();
  })


  const { nodes, materials } = useGLTF('/vinyl2.glb')
  return (

      <group {...props} dispose={null}>
        <OrbitControls ref={refControls} enablePan={false} maxDistance={8}  maxPolarAngle={1.5} zoomSpeed={2}/>
        <group ref={refDisk} position={[0, 0, 0]}>
          <mesh geometry={nodes.Mesh_1.geometry} material={materials.Record} />
          <mesh geometry={nodes.Mesh_2.geometry} material={materials.Label} />
          <mesh geometry={nodes.Text021.geometry} material={materials.Record} position={[0, 0.01, -0.1]} scale={0.54} />
        <mesh geometry={nodes.Text024.geometry} material={materials.Record} position={[-0.2, 0.01, 0.1]} />
        </group>

        <group ref={refDiskSupport} position={[0, -0.04, 0]}>
          <mesh geometry={nodes.Cylinder002.geometry} material={materials.TurntableRubber} />
          <mesh geometry={nodes.Cylinder002_1.geometry} material={materials.TurnTableMetal} />
        </group>
        {/* <pointLight intensity={300} decay={2} position={[-3.55, 1.1, -2.94]} rotation={[-1.84, 0.6, 1.93]} /> */}
        <PerspectiveCamera makeDefault={false} far={100} near={0.1} fov={31.08} position={[-2.97, 5.39, 5.48]} rotation={[-0.8, -0.4, -0.38]} />
        {/* <pointLight intensity={0.2} decay={2} color="#ff3309" position={[0.92, 1, -2.75]} rotation={[-1.84, 0.6, 1.93]} /> */}
        {/* <pointLight intensity={0.2} decay={2} color="#197aff" position={[-2.6, 1.1, 0.88]} rotation={[-1.84, 0.6, 1.93]} /> */}
        {/* <pointLight intensity={0.3} decay={2} position={[2.04, 1.41, 1.7]} rotation={[-Math.PI / 2, 0, 0]} /> */}
        {/* <pointLight intensity={1} decay={2} position={[-0.79, 1.04, 0.92]} rotation={[-Math.PI / 2, 0, 0]} /> */}
        <mesh geometry={nodes.Spindle.geometry} material={materials.SpindleMetal} />
        <mesh geometry={nodes.Record_Player_Body.geometry} material={materials['Record Player']} position={[0.22, -0.36, 0.17]} />
        <mesh geometry={nodes.VolumeKnob.geometry} material={materials.VolumeKnob} position={[1.39, -0.2, 0.7]} />
        <mesh ref={ref} onPointerOver={() => {setHover(false);changePointer(hover)}} onPointerLeave={() =>{setHover(true);changePointer(hover)}} onClick={() => {setVinylPlay(!vinylPlay)}} geometry={nodes.ArmPivot.geometry} material={materials.TurnTableMetal} position={[1.39, 0.01, -0.56]} rotation={[-Math.PI, 0, 0]}>
          <group position={[0, -0.07, -0.26]} rotation={[1.49, 0, 0]}>
            <mesh geometry={nodes.Cylinder004.geometry} material={materials.VolumeKnob} />
            <mesh geometry={nodes.Cylinder004_1.geometry} material={materials.TurnTableMetal} />
          </group>
        </mesh>
        <mesh geometry={nodes.SPINNYBOI_4000.geometry} material={materials.LogoText} position={[-1.25, -0.15, 1.47]} />
        <mesh receiveShadow geometry={nodes.Plane.geometry} material={materials.tABLE} scale={3} position={[0, -0.39, 0]} />

        <DiskPlane playingTrack={"pf.jpg"} position={[3,-0.38,-2]} rotation={[-Math.PI/2,0,-0.8]}/>
        {diskArray.map(el => {
          return el;
        })}
        <group ref={refLight}>
          <SpotLight
              castShadow
              distance={100}
              angle={5}
              attenuation={6}
              anglePower={6} // Diffuse-cone anglePower (default: 5)
              color="#c21728"
              position={[5,4,0]}
            />
            <SpotLight
              castShadow
              distance={100}
              angle={5}
              attenuation={6}
              anglePower={6} // Diffuse-cone anglePower (default: 5)
              color="#110dfc"
              position={[-5,4,0]}
            /> 
            <SpotLight
              castShadow
              distance={100}
              angle={5}
              attenuation={6}
              anglePower={6} // Diffuse-cone anglePower (default: 5)
              color="#6504db"
              position={[2,4,-3]}
            /> 
        </group>
        {/* <Plane receiveShadow position={[0, -0.43, 0]} rotation={[-Math.PI/2,0,0]} scale={30} >
          <meshStandardMaterial color="gray" roughness={0.27}/>
        </Plane> */}
      </group>
  )
}

useGLTF.preload('/vinyl2.glb')

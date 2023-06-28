import React, { useEffect, useRef, useState } from "react";
import {
  useGLTF,
  PerspectiveCamera,
  SpotLight,
  OrbitControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import * as THREE from "three";
import { createDiskCollection } from "../three/CreateDiskCollection";
import { musicTracks } from "../three/CreateDiskCollection";
import { InitAnimation } from "../three/Animations";
import Lights from "../three/Lights";

function changePointer(hover) {
  if (hover) {
    document.body.style.cursor = "pointer";
  } else {
    document.body.style.cursor = "grab";
  }
}

const listener = new THREE.AudioListener();
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

export function Model2({
  vinylPlay,
  setVinylPlay,
  setCurrentPlaying,
  setCurrentState,
  props,
}) {
  const { nodes, materials } = useGLTF("/vinyl2.glb");
  const animationSpeed = 0.04;
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const [diskArray, setDiskArray] = useState([]);
  const [track, setTrack] = useState({
    song: musicTracks[0].song,
    artist: musicTracks[0].artist,
    name: musicTracks[0].name,
  });

  const ref = useRef();
  const refLight = useRef();
  const refDisk = useRef();
  const refDiskSupport = useRef();
  const refControls = useRef();

  let num;

  const { camera } = useThree();
  camera.add(listener);

  useEffect(() => {
    setClicked(vinylPlay);
    if (vinylPlay) {
      sound.play();
    } else {
      sound.pause();
    }
  }, [vinylPlay]);

  useEffect(() => {
    setDiskArray(createDiskCollection());
    document.body.style.cursor = "grab";
    refControls.current.enabled = false;
    InitAnimation(camera, refControls);
  }, []);

  useEffect(() => {
    audioLoader.load(
      track.song,
      function (buffer) {
        sound.setBuffer(buffer);
        setCurrentPlaying(track.name + " - " + track.artist);
        if (sound.source != null && sound.isPlaying) {
          sound.stop();
          setVinylPlay(!vinylPlay);
        }
        sound.setVolume(0.5);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        setCurrentState((xhr.loaded / xhr.total) * 100);
      }
    );
  }, [track]);

  useFrame(
    (state, delta) => {
      num = ref.current.rotation.y;

      // pivot rotation to disk
      if (clicked && ref.current.rotation.y < 0.7) {
        ref.current.rotation.y += animationSpeed;
      }

      // pivotX rotation
      if (num.toFixed(2) == 0.72) {
        ref.current.rotation.x = Math.PI + 0.09;
      } else {
        ref.current.rotation.x = Math.PI;
      }
      // pivot rotation to 0
      if (!clicked && ref.current.rotation.y > 0) {
        ref.current.rotation.y -= animationSpeed;
      }
      // diskSupport and disk rotation
      if (clicked && num.toFixed(2) == 0.72) {
        refDisk.current.rotation.y += animationSpeed - 0.02;
        refDiskSupport.current.rotation.y += animationSpeed - 0.02;
      }

      if (clicked) {
        refLight.current.rotation.y += 0.02;
      }
    },
    [clicked]
  );

  useFrame(() => {
    TWEEN.update();
  });

  return (
    <group {...props} dispose={null}>
      <OrbitControls
        ref={refControls}
        enablePan={false}
        maxDistance={8}
        maxPolarAngle={1.5}
        zoomSpeed={2}
      />
      <group ref={refDisk} position={[0, 0, 0]}>
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.Record} />
        <mesh geometry={nodes.Mesh_2.geometry} material={materials.Label} />
        <mesh
          geometry={nodes.Text021.geometry}
          material={materials.Record}
          position={[0, 0.01, -0.1]}
          scale={0.54}
        />
        <mesh
          geometry={nodes.Text024.geometry}
          material={materials.Record}
          position={[-0.2, 0.01, 0.1]}
        />
      </group>

      <group ref={refDiskSupport} position={[0, -0.04, 0]}>
        <mesh
          geometry={nodes.Cylinder002.geometry}
          material={materials.TurntableRubber}
        />
        <mesh
          geometry={nodes.Cylinder002_1.geometry}
          material={materials.TurnTableMetal}
        />
      </group>
      {/* <pointLight intensity={300} decay={2} position={[-3.55, 1.1, -2.94]} rotation={[-1.84, 0.6, 1.93]} /> */}
      <PerspectiveCamera
        makeDefault={false}
        far={100}
        near={0.1}
        fov={31.08}
        position={[-2.97, 5.39, 5.48]}
        rotation={[-0.8, -0.4, -0.38]}
      />
      <mesh
        geometry={nodes.Spindle.geometry}
        material={materials.SpindleMetal}
      />
      <mesh
        geometry={nodes.Record_Player_Body.geometry}
        material={materials["Record Player"]}
        position={[0.22, -0.36, 0.17]}
      />
      <mesh
        geometry={nodes.VolumeKnob.geometry}
        material={materials.VolumeKnob}
        position={[1.39, -0.2, 0.7]}
      />
      <mesh
        ref={ref}
        onPointerOver={() => {
          setHover(false);
          changePointer(hover);
        }}
        onPointerLeave={() => {
          setHover(true);
          changePointer(hover);
        }}
        onClick={() => {
          setVinylPlay(!vinylPlay);
        }}
        geometry={nodes.ArmPivot.geometry}
        material={materials.TurnTableMetal}
        position={[1.39, 0.01, -0.56]}
        rotation={[-Math.PI, 0, 0]}
      >
        <group position={[0, -0.07, -0.26]} rotation={[1.49, 0, 0]}>
          <mesh
            geometry={nodes.Cylinder004.geometry}
            material={materials.VolumeKnob}
          />
          <mesh
            geometry={nodes.Cylinder004_1.geometry}
            material={materials.TurnTableMetal}
          />
        </group>
      </mesh>
      <mesh
        geometry={nodes.SPINNYBOI_4000.geometry}
        material={materials.LogoText}
        position={[-1.25, -0.15, 1.47]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.tABLE}
        scale={3}
        position={[0, -0.39, 0]}
      />

      {diskArray.map((el) => {
        return (
          <group
            key={musicTracks[el.key].id}
            onPointerOver={() => {
              setHover(false);
              changePointer(hover);
            }}
            onPointerLeave={() => {
              setHover(true);
              changePointer(hover);
            }}
            onClick={() =>
              setTrack({
                song: musicTracks[el.key].song,
                name: musicTracks[el.key].name,
                artist: musicTracks[el.key].artist,
              })
            }
          >
            {el}
          </group>
        );
      })}
      <Lights refLight={refLight} />
    </group>
  );
}

useGLTF.preload("/vinyl2.glb");

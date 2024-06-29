import { Plane } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { TextureLoader } from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import * as THREE from "three";
import { useControls } from "leva";
import { DiskAnimation } from "../three/Animations";
// position={[-2.7,-0.38,0]} rotation={[-Math.PI/2,0,0.8]}

export default function DiskPlane(playingTrack, key, song, artist, name) {
  const texture = useLoader(TextureLoader, Object.values(playingTrack)[0]);
  const position = Object.values(playingTrack)[1];
  const rotation = Object.values(playingTrack)[2];
  const originalPos = position;
  const originalRot = rotation;
  const [hover, setHover] = useState(false);
  const diskRef = useRef();
  const [clicked, setClicked] = useState(false);

  const { diskRotation, diskPosition } = useControls({
    diskRotation: rotation,
    diskPosition: position,
  });

  function setTrack(song, artist, name) {
    if (clicked === false) {
      window.track = {
        song: song,
        artist: artist,
        name: name,
      };
    }
  }

  function changePointer(hover) {
    if (hover) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "grab";
    }
  }

  return (
    <Plane
      onClick={() => {
        setTrack(
          Object.values(playingTrack)[3],
          Object.values(playingTrack)[4],
          Object.values(playingTrack)[5]
        );
        DiskAnimation(
          clicked,
          originalPos,
          originalRot,
          diskRef.current.position,
          diskRef.current.rotation
        );
        setClicked(!clicked);
      }}
      onPointerOver={() => {
        setHover(false);
        changePointer(hover);
      }}
      onPointerLeave={() => {
        setHover(true);
        changePointer(hover);
      }}
      key={key}
      position={position}
      rotation={rotation}
      scale={1.5}
      ref={diskRef}
      name={"disk " + Object.values(playingTrack)[5]}
    >
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </Plane>
  );
}

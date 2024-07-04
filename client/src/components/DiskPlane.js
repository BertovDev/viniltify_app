import { Plane } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { TextureLoader } from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import * as THREE from "three";
import { useControls } from "leva";
import { DiskAnimation } from "../three/Animations";

export default function DiskPlane(playingTrack, key, song, artist, name) {
  const texture = useLoader(TextureLoader, Object.values(playingTrack)[0]);
  const position = Object.values(playingTrack)[1];
  const rotation = Object.values(playingTrack)[2];
  const originalPos = position;
  const originalRot = rotation;
  const originalPosVec = new THREE.Vector3(
    originalPos[0],
    originalPos[1],
    originalPos[2]
  );
  const [hover, setHover] = useState(false);
  const diskRef = useRef();
  const [isClicked, setIsClicked] = useState(false);

  const { diskRotation, diskPosition } = useControls({
    diskRotation: rotation,
    diskPosition: position,
  });

  function setTrack(song, artist, name) {
    if (isClicked === false) {
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

  const onMissedEventHandler = (event) => {
    if (window.currentClicked === true) {
      if (!originalPosVec.equals(diskRef.current.position)) {
        DiskAnimation(
          true,
          originalPos,
          originalRot,
          diskRef.current.position,
          diskRef.current.rotation
        );
      }
      setIsClicked(true);
      diskRef.current.material.opacity = 0.7;

      setTimeout(() => {
        setIsClicked(false);
        diskRef.current.material.opacity = 1;
      }, 1800);
    }
  };

  const clickEventHandler = (event) => {
    if (isClicked === false) {
      setTrack(
        Object.values(playingTrack)[3],
        Object.values(playingTrack)[4],
        Object.values(playingTrack)[5]
      );
      setIsClicked(!isClicked);
      DiskAnimation(
        isClicked,
        originalPos,
        originalRot,
        diskRef.current.position,
        diskRef.current.rotation
      );
      event.stopPropagation();
    } else {
      DiskAnimation(
        true,
        originalPos,
        originalRot,
        diskRef.current.position,
        diskRef.current.rotation
      );
    }
  };

  return (
    <Plane
      onClick={clickEventHandler}
      onPointerOver={() => {
        window.currentClicked = true;
        setHover(false);
        changePointer(hover);
      }}
      onPointerLeave={() => {
        window.currentClicked = false;
        setHover(true);
        changePointer(hover);
      }}
      onPointerMissed={onMissedEventHandler}
      key={key}
      position={position}
      rotation={rotation}
      scale={1.5}
      ref={diskRef}
      name={"disk " + Object.values(playingTrack)[5]}
    >
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent={true}
        alpa
      />
    </Plane>
  );
}

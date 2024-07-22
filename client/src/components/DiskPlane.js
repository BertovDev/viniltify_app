import { Plane } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useControls } from "leva";

export default function DiskPlane(playingTrack, key, song, artist, name) {
  const texture = useLoader(TextureLoader, Object.values(playingTrack)[0]);
  const position = Object.values(playingTrack)[1];
  const rotation = Object.values(playingTrack)[2];

  const diskRef = useRef();

  // const { diskRotation, diskPosition } = useControls({
  //   diskRotation: rotation,
  //   diskPosition: position,
  // });

  function setTrack(song, artist, name) {
    window.track = {
      song: song,
      artist: artist,
      name: name,
    };
  }

  const clickEventHandler = () => {
    setTrack(
      Object.values(playingTrack)[3],
      Object.values(playingTrack)[4],
      Object.values(playingTrack)[5]
    );
  };

  return (
    <Plane
      onClick={clickEventHandler}
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

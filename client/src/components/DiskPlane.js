import { Plane } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useContext, useEffect, useRef } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useControls } from "leva";
import { PlayerContext, PlayerDispatchContext } from "./PlayerContext";

export default function DiskPlane({ playingTrack, id, song, artist, name }) {
  const texture = useLoader(TextureLoader, playingTrack);
  const diskRef = useRef();

  const dispatch = useContext(PlayerDispatchContext);

  const angle = Math.random() * Math.PI * 2;
  const radius = 2.4 + Math.random() * 3;
  let x = Math.sin(angle) * radius;
  let z = Math.cos(angle) * radius;

  let y = Math.random() * (0.38 - 0.4) + 0.38;
  let rotation = (Math.random() - 0.5) * 4;
  let position = [x, -y, z];

  function setTrack(song, artist, name) {
    dispatch({
      type: "update",
      payload: {
        song,
        artist,
        name,
      },
    });
  }

  const clickEventHandler = () => {
    setTrack(song, artist, name);
  };

  return (
    <Plane
      onClick={clickEventHandler}
      key={id}
      position={position}
      rotation={[-Math.PI / 2, 0, rotation]}
      scale={1.5}
      ref={diskRef}
      name={"disk " + name}
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

import { Plane } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useState } from "react";
import { TextureLoader } from "three";
import { Color } from "three";

// position={[-2.7,-0.38,0]} rotation={[-Math.PI/2,0,0.8]}

export default function DiskPlane(playingTrack, key, song, name) {
  const texture = useLoader(TextureLoader, Object.values(playingTrack)[0]);
  const position = Object.values(playingTrack)[1];
  const rotation = Object.values(playingTrack)[2];
  const [isHover,setHover] = useState(false)

  let color = new Color(isHover ? "#d6ccc2" : "white")

  return (
    <Plane key={key} position={position} rotation={rotation} scale={1.5}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <meshStandardMaterial map={texture} color={color}/>
    </Plane>
  );
}

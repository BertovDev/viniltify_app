import { Plane } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React from 'react'
import { TextureLoader } from 'three'

// position={[-2.7,-0.38,0]} rotation={[-Math.PI/2,0,0.8]}

export default function DiskPlane(playingTrack) {
    const texture = useLoader(TextureLoader,(Object.values(playingTrack)[0]));
    const position = Object.values(playingTrack)[1]
    const rotation = Object.values(playingTrack)[2]
    
    return (

    <Plane position={position} rotation={rotation} scale={1.5} >
        <meshStandardMaterial map={texture}/>
    </Plane>
  )
}

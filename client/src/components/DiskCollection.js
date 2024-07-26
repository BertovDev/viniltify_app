import React, { useEffect, useState, useRef } from "react";
import { createDiskCollection } from "../three/CreateDiskCollection";
import { musicTracks } from "../three/CreateDiskCollection";
import { DiskAnimation, FrontToFloorAnimation } from "../three/Animations";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { changePointer } from "../Utils";

export default function DiskCollection() {
  let FRONT_VINYL_POSITION = new THREE.Vector3(-2.6, -0.3, 0.8);
  let FRONT_VINYL_ROTATION = new THREE.Vector3(-1.58, 0, 0.5);

  const [diskArray, setDiskArray] = useState([]);
  const [clickedRef, setclickedRef] = useState({});
  const [vinylsMesh, setVinylsMesh] = useState([]);
  const [hover, setHover] = useState(false);

  const currentObj = useRef({});
  const currentPos = useRef({ pos: undefined, rot: undefined });

  const { scene, raycaster, camera } = useThree();

  useEffect(() => {
    setDiskArray(createDiskCollection());
    raycaster.layers.set(0);
    camera.layers.enable(1);
  }, []);

  useEffect(() => {
    let aux = [];
    scene.traverse((mesh) => {
      if (mesh instanceof THREE.Mesh && mesh.name.includes("disk")) {
        aux.push(mesh);
      }
    });
    setVinylsMesh(aux);
  }, [diskArray]);

  useEffect(() => {
    if (clickedRef !== currentObj.current) {
      if (Object.keys(currentObj.current).length > 0) {
        FrontToFloorAnimation(
          currentObj.current.position,
          currentObj.current.rotation,
          currentPos.current.pos,
          currentPos.current.rot
        );
      }
      currentObj.current = clickedRef;
    }
  }, [clickedRef]);

  const SelectVinylToAnimate = (e) => {
    vinylsMesh.forEach((mesh) => {
      if (mesh instanceof THREE.Mesh && mesh.name.includes("disk")) {
        if (mesh !== e.object) {
          mesh.layers.set(1);
          mesh.material.opacity = 0.7;

          setTimeout(() => {
            mesh.layers.set(0);
            mesh.material.opacity = 1;
          }, 1800);
        } else {
          currentPos.current.pos = e.object.position;
          currentPos.current.rot = e.object.rotation;

          setclickedRef(e.object);

          if (e.object.position.x === -1.5) {
            FrontToFloorAnimation(
              currentObj.current.position,
              currentObj.current.rotation,
              FRONT_VINYL_POSITION,
              FRONT_VINYL_ROTATION
            );
          } else {
            DiskAnimation(e.object.position, e.object.rotation);
          }
        }
      }
    });
  };

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        SelectVinylToAnimate(e);
      }}
      onPointerOver={() => {
        setHover(false);
        changePointer(hover);
      }}
      onPointerLeave={() => {
        setHover(true);
        changePointer(hover);
      }}
    >
      {diskArray.map((el) => {
        return <group key={musicTracks[el.key].id}>{el}</group>;
      })}
    </group>
  );
}

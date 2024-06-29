import React, { useEffect, useState } from "react";
import { createDiskCollection } from "../three/CreateDiskCollection";
import { musicTracks } from "../three/CreateDiskCollection";
import { DiskAnimation } from "../three/Animations";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function DiskCollection() {
  const [diskArray, setDiskArray] = useState([]);
  const { scene } = useThree();
  const [diskReferences, setDiskReferences] = useState([]);

  useEffect(() => {
    setDiskArray(createDiskCollection());
  }, []);

  useEffect(() => {
    let references = [];
    scene.traverse((el) => {
      if (
        el instanceof THREE.Mesh &&
        el.geometry instanceof THREE.PlaneGeometry &&
        el.name.slice(0, 4) === "disk"
      ) {
        references.push(el);
      }
    });
    setDiskReferences(references);
  }, [diskArray]);

  function getDiskNotInUsing() {
    return diskReferences.filter(
      (el) => el.name.slice(5) !== window.track.name
    );
  }

  function getReferenceByName(name) {
    return getDiskNotInUsing().filter((el) => el["name"].slice(5) === name);
  }

  useEffect(() => {
    diskArray.map((el) => {
      if (el.props.name !== window.track.name && el.props !== undefined) {
        const meshRef = getReferenceByName(el.props.name)[0];
        let pos, rot;
        if (meshRef !== undefined) {
          pos = meshRef["position"];
          rot = meshRef["rotation"];

          const vec3 = new THREE.Vector3(
            el.props.position[0],
            el.props.position[1],
            el.props.position[2]
          );

          if (!vec3.equals(pos)) {
            DiskAnimation(
              true,
              el.props.position,
              el.props.rotation,
              pos,
              rot,
              0
            );
          }
        }
      }
    });
  }, [window.track, diskReferences]);

  return (
    <group>
      {diskArray.map((el) => {
        return <group key={musicTracks[el.key].id}>{el}</group>;
      })}
    </group>
  );
}

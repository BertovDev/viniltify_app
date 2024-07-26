import React, { useEffect, useRef, useState } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import * as THREE from "three";
import { musicTracks } from "../three/CreateDiskCollection";
import { InitAnimation } from "../three/Animations";
import Lights from "../three/Lights";
import { useControls } from "leva";
import { TurntableModel } from "./TurntableModel";
import TableAndRecord from "./TableAndRecord";

const listener = new THREE.AudioListener();
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

export function ModelsManager({ setCurrentPlaying, props }) {
  const animationSpeed = 0.04;
  const [vinylPlay, setVinylPlay] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [track, setTrack] = useState({
    song: musicTracks[0].song,
    artist: musicTracks[0].artist,
    name: musicTracks[0].name,
  });

  const refLight = useRef();
  const refDisk = React.createRef();
  const refControls = useRef();

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

  function updateCurrentSong(track) {
    if (track) {
      audioLoader.load(
        track.song,
        function (buffer) {
          sound.setBuffer(buffer);
          setCurrentPlaying(track.name + " - " + track.artist);
          if (sound.source != null && sound.isPlaying) {
            sound.stop();
            setVinylPlay(!vinylPlay);
          }
          sound.setVolume(0.2);
        },
        function (xhr) {
          // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          // setCurrentState((xhr.loaded / xhr.total) * 100);
        }
      );
    }
  }

  useEffect(() => {
    window.track = track;
    updateCurrentSong(track);
    document.body.style.cursor = "grab";
    refControls.current.enabled = true;
    InitAnimation(camera, refControls);
  }, []);

  useFrame(() => {
    if (window.track.name !== track.name) {
      setTrack(window.track);
      updateCurrentSong(window.track);
    }
    if (clicked) {
      refDisk.current.rotation.y += animationSpeed - 0.02;
    }

    if (sound.isPlaying === false) {
      setVinylPlay(false);
    }
    TWEEN.update();
  });

  const { positiomDisk, scaleDisk } = useControls({
    positiom: [-0.21, 0.06, 0.39],
    scale: 0.88,
  });

  function handleClick(event, vinylPlay) {
    event.stopPropagation();
    setVinylPlay(!vinylPlay);
  }

  return (
    <group {...props} dispose={null}>
      <OrbitControls
        ref={refControls}
        enablePan={false}
        maxDistance={8}
        maxPolarAngle={1.5}
        zoomSpeed={2}
      />

      <TurntableModel
        handleClick={(event) => handleClick(event, vinylPlay)}
        isPlaying={vinylPlay}
      />
      <TableAndRecord ref={refDisk} />
      <Lights refLight={refLight} />
    </group>
  );
}

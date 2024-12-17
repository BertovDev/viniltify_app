import React, { useContext, useEffect, useRef, useState } from "react";
import { useGLTF, OrbitControls, useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { InitAnimation } from "../three/Animations";
import Lights from "../three/Lights";
import { TurntableModel } from "./TurntableModel";
import TableAndRecord from "./TableAndRecord";
import { PlayerContext } from "../components/PlayerContext";

export function ModelsManager({ setCurrentPlaying, props }) {
  const animationSpeed = 0.04;
  const [vinylPlay, setVinylPlay] = useState(false);
  const [clicked, setClicked] = useState(false);

  const songContext = useContext(PlayerContext);
  const { camera } = useThree();

  const [track, setTrack] = useState({
    song: songContext.song,
    artist: songContext.artist,
    name: songContext.name,
  });

  const refLight = useRef();
  const refDisk = React.createRef();
  const refControls = useRef();

  useEffect(() => {
    setClicked(vinylPlay);
  }, [vinylPlay]);

  useEffect(() => {
    setCurrentPlaying({
      text: track.name + " - " + track.artist,
      playStatus: false,
    });

    document.body.style.cursor = "grab";
    refControls.current.enabled = true;
    // InitAnimation(camera, refControls);
  }, []);

  useFrame(() => {
    if (songContext.song !== track.song) {
      setTrack({
        song: songContext.song,
        artist: songContext.artist,
        name: songContext.name,
      });
      setCurrentPlaying({
        text: songContext.name + " - " + songContext.artist,
        playStatus: vinylPlay,
      });
    }
    if (clicked) {
      refLight.current.rotation.y += 0.02;
      refDisk.current.rotation.y += animationSpeed - 0.02;
    }

    TWEEN.update();
  });

  // const { positiomDisk, scaleDisk } = useControls({
  //   positiom: [-0.21, 0.06, 0.39],
  //   scale: 0.88,
  // });

  function handleClick(event, vinylPlay) {
    event.stopPropagation();
    setVinylPlay(!vinylPlay);
    setCurrentPlaying({
      text: track.name + " - " + track.artist,
      playStatus: !vinylPlay,
    });
  }

  return (
    <>
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
    </>
  );
}

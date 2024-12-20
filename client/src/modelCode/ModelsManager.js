import React, { useContext, useEffect, useRef, useState } from "react";
import { useGLTF, OrbitControls, useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { InitAnimation } from "../three/Animations";
import Lights from "../three/Lights";
import { TurntableModel } from "./TurntableModel";
import Vinyl from "./NewVinyl";
import { PlayerContext } from "../components/PlayerContext";
import { useControls } from "leva";

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

  useFrame(({ clock }) => {
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
      refDisk.current.rotation.y += animationSpeed - 0.02;
    }
  });

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

        <group position={[0, 0, -0.5]}>
          <TurntableModel
            handleClick={(event) => handleClick(event, vinylPlay)}
            isPlaying={vinylPlay}
          />
          <Vinyl ref={refDisk} />
        </group>
        <Lights />
      </group>
    </>
  );
}

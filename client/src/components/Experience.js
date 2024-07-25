import React, { useState, useEffect, Suspense, useRef } from "react";
import PlayerHeader from "./PlayerHeader";
import { checkMobile } from "../Utils";

import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { ModelsManager } from "../modelCode/ModelsManager";

import DiskCollection from "./DiskCollection";

export default function Experience() {
  const [currentPlaying, setCurrentPlaying] = useState("");

  window.mobileCheck = checkMobile;
  let loaderFontSize = window.mobileCheck() ? "22px" : "30px";

  return (
    <>
      <PlayerHeader currentPlaying={currentPlaying} />
      {/* ThreeJs code  */}
      <Canvas
        style={{ height: "100vh", background: "black" }}
        camera={{
          position: [0.3, 3, 5],
          fov: window.mobileCheck() ? 80 : 45,
          rotation: [
            -0.5404195002705843, 0.051404250823021816, 0.03081920793238793,
          ],
        }}
        shadows
      >
        <directionalLight intensity={0.4} castShadow color="white" />
        <Suspense fallback={null}>
          <ModelsManager setCurrentPlaying={setCurrentPlaying} />
          <DiskCollection />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{
          backgroundImage:
            "linear-gradient(to top, #370497, #2f0580, #27056a, #1f0555, #180341)",
        }}
        dataInterpolation={(p) => `
          Loading ${p.toFixed(2)}%
          ☝️🤓 A compilation of some of my favorite songs...
          You can move the screen by pressing it down and move
        `} // Text
        innerStyles={{
          fontSize: loaderFontSize,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      />
    </>
  );
}

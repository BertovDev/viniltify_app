import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import { Points, Point, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function InitAnimation(camera, refControls) {
  new TWEEN.Tween(camera.position.set(0.1, 1.5, 1))
    .to(
      {
        // from camera position
        x: 0.3, //desired x position to go
        y: 3, //desired y position to go
        z: 5, //desired z position to go
      },
      5500
    ) // time take to animate
    .delay(1000)
    .easing(TWEEN.Easing.Quartic.InOut)
    .start() // define delay, easing
    .onComplete(function () {
      //on finish animation
      refControls.current.enabled = true; // reactivate controls
      TWEEN.remove(this); // remove the animation from memory
    });
  new TWEEN.Tween(
    camera.rotation.set(
      camera.rotation.x - 0.5,
      camera.rotation.y,
      camera.rotation.z
    )
  )
    .to(
      {
        x: -0.5404195002705843,
        y: camera.rotation.y,
        z: camera.rotation.z,
      },
      5500
    )
    .delay(1000)
    .easing(TWEEN.Easing.Quartic.InOut)
    .start()
    .onComplete(function () {
      //on finish animation
      TWEEN.remove(this); // remove the animation from memory
    });
}

export function DiskAnimation(
  clicked,
  originalPos,
  originalRot,
  diskRefPos,
  diskRefRot,
  delay
) {
  if (!clicked) {
    new TWEEN.Tween(diskRefPos)
      .to(
        {
          // from camera position
          x: -1.5, //desired x position to go
          y: 1.6, //desired y position to go
          z: 1.5, //desired z position to go
        },
        2500
      )
      .delay(0)
      .easing(TWEEN.Easing.Quartic.InOut)
      .start()
      .onComplete(function () {
        //on finish animation
        TWEEN.remove(this); // remove the animation from memory
      });

    new TWEEN.Tween(diskRefRot)
      .to(
        {
          // from camera position
          x: -0.79, //desired x position to go
          y: 0.25, //desired y position to go
          z: 0.14, //desired z position to go
        },
        2500
      ) // time take to animate
      .delay(0)
      .easing(TWEEN.Easing.Quartic.InOut)
      .start()
      .onComplete(function () {
        //on finish animation
        TWEEN.remove(this); // remove the animation from memory
      });
  } else {
    new TWEEN.Tween(diskRefPos)
      .to(
        {
          // from camera position
          x: originalPos[0], //desired x position to go
          y: originalPos[1], //desired y position to go
          z: originalPos[2], //desired z position to go
        },
        1500
      )
      .delay(0)
      .easing(TWEEN.Easing.Quartic.InOut)
      .start()
      .onComplete(function () {
        //on finish animation
        TWEEN.remove(this); // remove the animation from memory
      });

    new TWEEN.Tween(diskRefRot)
      .to(
        {
          // from camera position
          x: originalRot[0], //desired x position to go
          y: originalRot[1], //desired y position to go
          z: originalRot[2], //desired z position to go
        },
        1500
      ) // time take to animate
      .delay(0)
      .easing(TWEEN.Easing.Quartic.InOut)
      .start()
      .onComplete(function () {
        //on finish animation
        TWEEN.remove(this); // remove the animation from memory
      });
  }
}

import { TWEEN } from "three/examples/jsm/libs/tween.module.min";

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

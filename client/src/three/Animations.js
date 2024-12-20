import gsap from "gsap";

export function CameraAnimation(camera, refControls) {
  // Camera position animation
  gsap.to(camera.position, {
    x: 0.3,
    y: 3,
    z: 5,
    duration: 5.5,
    delay: 1,
    ease: "power4.inOut",
    onComplete: () => {
      refControls.current.enabled = true;
    },
  });

  // Camera rotation animation
  gsap.to(camera.rotation, {
    x: -0.5404195002705843,
    duration: 5.5,
    delay: 1,
    ease: "power4.inOut",
  });
}

export function DiskAnimation(diskRefPos, diskRefRot) {
  // Disk position animation
  gsap.to(diskRefPos, {
    x: -1.5,
    y: 1.6,
    z: 1.5,
    duration: 1.5,
    ease: "power4.inOut",
  });

  // Disk rotation animation
  gsap.to(diskRefRot, {
    x: -0.79,
    y: 0.25,
    z: 0.14,
    duration: 1.5,
    ease: "power4.inOut",
  });
}

export function FrontToFloorAnimation(
  diskRefPos,
  diskRefRot,
  originalPos,
  originalRot
) {
  // Return to original position
  gsap.to(diskRefPos, {
    x: originalPos.x,
    y: originalPos.y,
    z: originalPos.z,
    duration: 1.5,
    ease: "power4.inOut",
  });

  // Return to original rotation
  gsap.to(diskRefRot, {
    x: originalRot.x,
    y: originalRot.y,
    z: originalRot.z,
    duration: 1.5,
    ease: "power4.inOut",
  });
}

export function InitAnimation(camera, refControls) {
  // Set initial camera position
  camera.position.set(0.1, 1.5, 1);
  camera.rotation.x -= 0.5;

  // Camera position animation
  gsap.to(camera.position, {
    x: 0.3,
    y: 3,
    z: 5,
    duration: 5.5,
    delay: 1,
    ease: "power4.inOut",
    onComplete: () => {
      refControls.current.enabled = true;
    },
  });

  // Camera rotation animation
  gsap.to(camera.rotation, {
    x: -0.5404195002705843,
    duration: 5.5,
    delay: 1,
    ease: "power4.inOut",
  });
}

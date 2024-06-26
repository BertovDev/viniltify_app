import React, { useState, useEffect, Suspense, useRef } from "react";
import {
  Container,
  Form,
  Modal,
  Button,
  Alert,
  ProgressBar,
  Col,
  Row,
} from "react-bootstrap";

import TrackSearchResult from "./TrackSearchResult";

import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Model2 } from "../modelCode/Vinyl2";
import DiskPlane from "./DiskPlane";

// Icons
import {
  Coin,
  Github,
  Linkedin,
  Twitter,
  WindowFullscreen,
} from "react-bootstrap-icons";
import { useControls } from "leva";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";

function renderLoop() {
  TWEEN.update();
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();
  const [vinylPlay, setVinylPlay] = useState(false);
  const [diskInfo, setDiskInfo] = useState({ clicked: false, timesClicked: 0 });
  const [currentPlaying, setCurrentPlaying] = useState("");
  const [currentState, setCurrentState] = useState();

  window.mobileCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };
  let loaderFontSize = window.mobileCheck() ? "22px" : "30px";

  const refDiskInfo = useRef();

  // const {rotation,position,delayR,delayP,rotationX,rotationY} = useControls({rotation:[0,0,0],position:[0,0,0],delayR:500,delayP:1500,rotationX:1.1});

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  const handleOpenHelp = () => setShowHelpModal(true);
  const handleCloseHelp = () => setShowHelpModal(false);

  useEffect(() => {
    if (diskInfo.clicked) {
      new TWEEN.Tween(refDiskInfo.current.position.set(0, 0, 0))
        .to(
          {
            // from camera position
            x: 2, //desired x position to go
            y: 0, //desired y position to go
            z: 3.5, //desired z position to go
          },
          2500
        ) // time take to animate
        .delay(700)
        .easing(TWEEN.Easing.Quartic.InOut)
        .start() // define delay, easing
        .onComplete(function () {
          //on finish animation
          TWEEN.remove(this); // remove the animation from memory
        });

      new TWEEN.Tween(refDiskInfo.current.rotation.set(0, 0, 0))
        .to(
          {
            // from camera position
            x: 1.1, //desired x position to go
            y: 5.5, //desired y position to go
            z: 0, //desired z position to go
          },
          2500
        ) // time take to animate
        .delay(1400)
        .easing(TWEEN.Easing.Quartic.InOut)
        .start() // define delay, easing
        .onComplete(function () {
          //on finish animation
          TWEEN.remove(this); // remove the animation from memory
        });
    }

    if (!diskInfo.clicked && diskInfo.timesClicked > 0) {
      new TWEEN.Tween(refDiskInfo.current.position.set(2, 0, 3.5))
        .to(
          {
            // from camera position
            x: 0, //desired x position to go
            y: 0, //desired y position to go
            z: 0, //desired z position to go
          },
          1500
        ) // time take to animate
        .delay(1500)
        .easing(TWEEN.Easing.Quartic.InOut)
        .start() // define delay, easing
        .onComplete(function () {
          //on finish animation
          TWEEN.remove(this); // remove the animation from memory
        });

      new TWEEN.Tween(refDiskInfo.current.rotation.set(1.1, 5.5, 0))
        .to(
          {
            // from camera position
            x: 0, //desired x position to go
            y: 0, //desired y position to go
            z: 0, //desired z position to go
          },
          1500
        ) // time take to animate
        .delay(500)
        .easing(TWEEN.Easing.Quartic.InOut)
        .start() // define delay, easing
        .onComplete(function () {
          //on finish animation
          TWEEN.remove(this); // remove the animation from memory
        });
    }
  }, [diskInfo]);

  useEffect(() => {
    console.log(currentState);
  }, [currentState]);

  renderLoop();

  return (
    <>
      <Container
        className="d-flex flex-row gap-2 justify-content-between py-2"
        style={{ width: "100%", cursor: "auto" }}
      >
        <Row
          xs={1}
          sm={1}
          md={2}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Col
            style={{
              padding: "5px 12px",
              color: "white",
              fontSize: "16px",
              fontFamily: "monospace",
            }}
          >
            Playing:{" "}
            <span style={{ color: "#fab14e", fontSize: "14px" }}>
              {currentPlaying}
            </span>
          </Col>
          <Col
            style={{
              padding: "5px 12px",
              color: "gray",
              fontSize: "15px",
              fontFamily: "monospace",
            }}
          >
            ☝️🤓 Click/touch a vinyl and then the turntable lever to play the
            song
          </Col>
        </Row>
      </Container>
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
        {/* <ambientLight/> */}
        <directionalLight intensity={0.5} castShadow color="white" />
        {/* <OrbitControls ref={refControls} enablePan={false} maxDistance={8}  maxPolarAngle={1.5} zoomSpeed={2}/> */}
        <Suspense fallback={null}>
          {/* <Model/> */}
          <Model2
            vinylPlay={vinylPlay}
            setVinylPlay={setVinylPlay}
            setCurrentPlaying={setCurrentPlaying}
            setCurrentState={setCurrentState}
          />
          <group
            ref={refDiskInfo}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            onClick={() => {
              setDiskInfo({ clicked: !diskInfo.clicked, timesClicked: 1 });
            }}
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "grab";
            }}
          >
            <DiskPlane
              playingTrack={
                playingTrack !== undefined ? playingTrack.albumUrl : "3318.jpg"
              }
              position={[-2.7, -0.38, 0]}
              rotation={[-Math.PI / 2, 0, 0.8]}
            />
          </group>
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

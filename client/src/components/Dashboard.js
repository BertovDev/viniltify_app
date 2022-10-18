import React, { useState, useEffect, Suspense, useRef } from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

import useAuth from "./useAuth";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";

import { Canvas } from "@react-three/fiber";
import {Loader } from "@react-three/drei";
import { Model2 } from "../modelCode/Vinyl2";
import DiskPlane from "./DiskPlane";

// Icons
import {Github,Linkedin,Twitter} from "react-bootstrap-icons"
import { useControls } from "leva";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";

const spotifyApi = new SpotifyWebApi({
  clientId: "c9833a3d046f479f9d742874913f4428",
});

function renderLoop(){
  TWEEN.update()
}


export default function Dashboard({ code }) {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showHelpModal,setShowHelpModal] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();
  const [vinylPlay, setVinylPlay] = useState(false);
  const [diskInfo,setDiskInfo] = useState({clicked:false,timesClicked:0})

  const refDiskInfo = useRef();

  // const {rotation,position,delayR,delayP,rotationX,rotationY} = useControls({rotation:[0,0,0],position:[0,0,0],delayR:500,delayP:1500,rotationX:1.1});


  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  const handleOpenHelp = () => setShowHelpModal(true)
  const handleCloseHelp = () => setShowHelpModal(false)

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);


  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const bestResolutionAlbumImage = track.album.images.reduce(
            (bestResolution, image) => {
              if (image.height > bestResolution.height) return image;
              return bestResolution;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: bestResolutionAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  

  

  useEffect(() => {
    if(diskInfo.clicked){
      new TWEEN.Tween(refDiskInfo.current.position.set(0,0,0)).to({ // from camera position
            x: 2, //desired x position to go
            y: 0, //desired y position to go
            z: 3.5 //desired z position to go
        }, 2500) // time take to animate
        .delay(700).easing(TWEEN.Easing.Quartic.InOut).start()// define delay, easing
        .onComplete(function () { //on finish animation
            TWEEN.remove(this) // remove the animation from memory
        })

        new TWEEN.Tween(refDiskInfo.current.rotation.set(0,0,0)).to({ // from camera position
          x: 1.1, //desired x position to go
          y: 5.5, //desired y position to go
          z: 0 //desired z position to go
      }, 2500) // time take to animate
      .delay(1400).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
      .onComplete(function () { //on finish animation
          TWEEN.remove(this) // remove the animation from memory
      })

    }
  
    if(!diskInfo.clicked && diskInfo.timesClicked > 0){
      new TWEEN.Tween(refDiskInfo.current.position.set(2,0,3.5)).to({ // from camera position
          x: 0, //desired x position to go
          y: 0, //desired y position to go
          z: 0 //desired z position to go
      }, 1500) // time take to animate
      .delay(1500).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
      .onComplete(function () { //on finish animation
          TWEEN.remove(this) // remove the animation from memory
      })

      new TWEEN.Tween(refDiskInfo.current.rotation.set(1.1,5.5,0)).to({ // from camera position
        x: 0, //desired x position to go
        y: 0, //desired y position to go
        z: 0 //desired z position to go
    }, 1500) // time take to animate
    .delay(500).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
    .onComplete(function () { //on finish animation
        TWEEN.remove(this) // remove the animation from memory
    })
    }

  },[diskInfo])


  renderLoop();



  return (
    <>
      <Container
        className="d-flex flex-row gap-2 justify-content-between py-2"
        style={{ width: "100%",cursor:"auto" }}
      >
        <Button variant="success" style={{width:"20%"}} onClick={handleOpenHelp}>How to use</Button>

        <Button variant="primary" style={{width:"100%"}} onClick={handleOpen}>
          Search Songs/Artists
        </Button>

        <Modal
          show={showModal}
          onHide={handleClose}
          size="lg"
          style={{ overflowY: "auto" }}
        >
          <Modal.Header>
            <Form.Control
              type="search"
              placeholder="Search Songs/Artists"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></Form.Control>
          </Modal.Header>

          <Modal.Body s>
            {searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
                closeModal={handleClose}
              />
            ))}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showHelpModal}
          onHide={handleCloseHelp}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          style={{cursor:"auto"}}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              How to use
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Move the scene</h4>
              <p>
                Maintain left click to move the scene or use the mouse wheel to zoom!
              </p>
              <hr/>
            <h4>Select a song</h4>
            <p>
              Select a song in the <b>Search Songs/Artists</b> button and then play it with the turntable,
              play around with it to discover how!
            </p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseHelp}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Player accessToken={accessToken} trackUri={playingTrack?.uri} vinilPlay={vinylPlay} setVinilPlay={setVinylPlay}/>
        <a href="https://github.com/BertovDev" target="_blank">
          <Github color="white" size={35}/>
        </a>
        <a href="https://www.linkedin.com/in/bautista-berto/" target="_blank">
          <Linkedin color="white" size={35}/>
        </a>
        <a href="https://twitter.com/tongenjs" target="_blank">
          <Twitter color="white" size={35}/>
        </a>
      </Container>
      {/* ThreeJs code  */}
      <Canvas style={{height:"100vh",background:"black"}} camera={{ position:[0.3,3,5],fov:35,rotation:[-0.5404195002705843,0.051404250823021816,0.03081920793238793]}} shadows>
        {/* <ambientLight/> */}
        <directionalLight intensity={0.5} castShadow color="white"/>
        {/* <OrbitControls ref={refControls} enablePan={false} maxDistance={8}  maxPolarAngle={1.5} zoomSpeed={2}/> */}
        <Suspense fallback={null}>
          {/* <Model/> */}
          <Model2 vinylPlay={vinylPlay} setVinylPlay={setVinylPlay}/> 
          <group  ref={refDiskInfo} position={[0,0,0]} rotation={[0,0,0]} onClick={() => {setDiskInfo({clicked:!diskInfo.clicked,timesClicked:1})}} onPointerOver={() => {document.body.style.cursor = "pointer"}} onPointerOut={() => {document.body.style.cursor = "grab"}}>
            <DiskPlane playingTrack={playingTrack !== undefined ? playingTrack.albumUrl : "3318.jpg" } position={[-2.7,-0.38,0]} rotation={[-Math.PI/2,0,0.8]}/>
          </group>
        </Suspense>
      </Canvas>
      <Loader 
        containerStyles={{"backgroundImage":"linear-gradient(to top, #370497, #2f0580, #27056a, #1f0555, #180341)"}}
        innerStyles={{"fontSize":"30px"}}
      />
    </>
  );
}

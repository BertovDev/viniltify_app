import React, { useState, useEffect, Suspense } from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

import useAuth from "./useAuth";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";

import { Canvas, useLoader } from "@react-three/fiber";
import { Loader, OrbitControls,Plane, PresentationControls } from "@react-three/drei";
import { Model2 } from "../modelCode/Vinyl2";
import { TextureLoader } from "three";
import DiskPlane from "./DiskPlane";

// Icons
import {Github,Linkedin,Twitter} from "react-bootstrap-icons"

const spotifyApi = new SpotifyWebApi({
  clientId: "c9833a3d046f479f9d742874913f4428",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showHelpModal,setShowHelpModal] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();

  const [vinylPlay, setVinylPlay] = useState(false);

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


  return (
    <>
      <Container
        className="d-flex flex-row gap-2 justify-content-between py-2"
        style={{ width: "100%",background:"black",cursor:"auto" }}
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

        <Player accessToken={accessToken} trackUri={playingTrack?.uri} vinilPlay={vinylPlay}/>
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
      <Canvas style={{height:"100vh",background:"black"}} camera={{ position:[0.3,3,5],fov:45 }} shadows>
        {/* <ambientLight/> */}
        <directionalLight intensity={0.5} castShadow color="white"/>
        <Suspense fallback={null}>
          {/* <Model/> */}
          <Model2 vinylPlay={vinylPlay} setVinylPlay={setVinylPlay}/> 
          <DiskPlane playingTrack={playingTrack !== undefined ? playingTrack.albumUrl : "3318.jpg" } position={[-2.7,-0.38,0]} rotation={[-Math.PI/2,0,0.8]}/>
        </Suspense>
      </Canvas>
    </>
  );
}
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


const spotifyApi = new SpotifyWebApi({
  clientId: "c9833a3d046f479f9d742874913f4428",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();

  const [vinylPlay, setVinylPlay] = useState(false);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

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
        <Button variant="success" style={{width:"20%"}}>How to use it</Button>

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

        <Player accessToken={accessToken} trackUri={playingTrack?.uri} vinilPlay={vinylPlay}/>
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

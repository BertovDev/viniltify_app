import React, { useState, useEffect, Suspense } from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

import useAuth from "./useAuth";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";

import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import { Model } from "../modelCode/Vinyl";
import { Model2 } from "../modelCode/Vinyl2";

const spotifyApi = new SpotifyWebApi({
  clientId: "c9833a3d046f479f9d742874913f4428",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();

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
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <>
      <Container
        className="d-flex flex-column py-2"
        style={{ width: "100%",background:"black" }}
      >
        <Button variant="primary" onClick={handleOpen}>
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

        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </Container>
      {/* ThreeJs code  */}
      <Canvas style={{height:"100vh",background:"black"}} camera={{ position:[0.3,3,5],fov:45 }}>
        {/* <ambientLight/> */}
        <OrbitControls />
        <Suspense fallback={null}>
          {/* <Model/> */}
          <Model2 />
        </Suspense>
      </Canvas>
    </>
  );
}

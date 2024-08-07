import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({
  accessToken,
  trackUri,
  currentPlaying,
  setCurrentPlaying,
}) {
  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      initialVolume={0.1}
      callback={(state) => {
        if (!state.isPlaying)
          setCurrentPlaying({ text: currentPlaying.text, playStatus: false });
      }}
      play={currentPlaying.playStatus}
      uris={[window.track?.song]}
    />
  );
}

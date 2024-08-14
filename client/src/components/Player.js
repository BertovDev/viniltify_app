import React, { useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { PlayerContext } from "./PlayerContext";

export default function Player({ accessToken, currentPlaying }) {
  const { song } = useContext(PlayerContext);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      initialVolume={0.1}
      play={currentPlaying.playStatus}
      uris={[song]}
    />
  );
}

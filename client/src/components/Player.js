import React, { useEffect, useState } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, trackUri,vinilPlay }) {

    const [play, setPlay] = useState(false)

    useEffect(() => {
        setPlay(true)
    }, [trackUri])

    const playerButton = document.querySelector(".rswp__toggle");
    if(playerButton !== null){
        playerButton.style.display = "none";
    }


    if (!accessToken) return null
    return (
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            callback={state => {
                if(!state.isPlaying) setPlay(false)
            }}
            play={vinilPlay}
            uris={trackUri ? [trackUri] : []}
        />
    )
}

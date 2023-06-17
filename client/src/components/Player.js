import React, { useEffect, useState } from 'react'


export default function Player({ accessToken, trackUri,vinilPlay, setVinilPlay}) {

    // const [play, setPlay] = useState(false)

    // useEffect(() => {
    //     setPlay(true)
    // }, [trackUri])

    // const playerButton = document.querySelector(".rswp__toggle");
    // if(playerButton !== null){
    //     playerButton.style.display = "none";
    // }


    // if (!accessToken) return null
    // return (
    //     <SpotifyPlayer
    //         token={accessToken}
    //         showSaveIcon
    //         callback={state => {
    //             if(!state.isPlaying) setPlay(false)
    //             if(!state.isPlaying && vinilPlay === true) {setVinilPlay(play)}
    //         }}
    //         play={vinilPlay}
    //         uris={trackUri ? [trackUri] : []}
    //     />
    // )
}

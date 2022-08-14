import React from 'react'

export default function TrackSearchResult({ track, chooseTrack,closeModal }) {

    function handlePlay() {
        chooseTrack(track)
        closeModal()
    }

    return (
        <div className="d-flex m-2 align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handlePlay}
        >
            <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
            <div className='m-3'>
                <div >{track.title}</div>
                <div className='text-muted'>{track.artist}</div>
            </div>
        </div>
    )
}

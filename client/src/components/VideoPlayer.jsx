import React from 'react'
import { useRef } from 'react'
import UseVideoPlayer from '../hooks/UseVideoPlayer'
//load dynamiclly
// import video from '../assets/temp_video1.mp4'

const VideoPlayer = ({ parentToChild }) => {
    const videoElement = useRef(null)
    const { playerState, togglePlay, handleOnTimeUpdate, handleVideoProgress, handleVideoSpeed, toggleMute } =
        UseVideoPlayer(videoElement)

    return (
        // video = https://www.youtube.com/watch?v=wOMx9xXGuME
        <div className="">
            <div className="video-wrapper">
                <video src={parentToChild} ref={videoElement} onTimeUpdate={handleOnTimeUpdate} />
            </div>
            <div className="controls">
                <div className="actions">
                    <button onClick={togglePlay}>
                        {!playerState.isPlaying ? <i className="bx bx-play"></i> : <i className="bx bx-pause"></i>} Play
                        Btn "(no CSS)"
                    </button>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={playerState.progress}
                    onChange={(e) => handleVideoProgress(e)}
                />
                <select className="velocity" value={playerState.speed} onChange={(e) => handleVideoSpeed(e)}>
                    <option value="0.50">0.50x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="2">2x</option>
                </select>
                <button className="mute-btn" onClick={toggleMute}>
                    {!playerState.isMuted ? (
                        <i className="bx bxs-volume-full"></i>
                    ) : (
                        <i className="bx bxs-volume-mute"></i>
                    )}
                </button>
                {/* <select className="Segments" value={playerState.progress} onChange={(e) => handleVideoProgress(e)}>
                    <option value={playerState.progress}>Chapter</option>
                    <option value="0">Start</option>
                    <option value="25">Chapter 1</option>
                    <option value="50">Chapter 2</option>
                    <option value="75">Chapter 3</option>
                </select> */}
                <button
                    onClick={(e) => {
                        e.target.value = 0
                        handleVideoProgress(e)
                    }}
                >
                    Restart
                </button>
            </div>
            <div></div>
        </div>
    )
}

export default VideoPlayer

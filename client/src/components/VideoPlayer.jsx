import React from 'react'
import { useRef } from 'react'
import UseVideoPlayer from '../hooks/UseVideoPlayer'

const VideoPlayer = ({ setURL }) => {
    const videoElement = useRef(null)
    const {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
        seekVideo,
    } = UseVideoPlayer(videoElement)

    return (
        <div className="video-wrapper ">
            <div className="video-src grid place-items-center bg-background bg-slate-600 py-0.5 ">
                <video className="max-h-96" src={setURL.url} ref={videoElement} onTimeUpdate={handleOnTimeUpdate} />
            </div>
            <div className="video-controls border border-slate-300/75 rounded-md p-2 bg-background bg-slate-600	py-1.5">
                <button className="p-1.5" onClick={togglePlay}>
                    {!playerState.isPlaying ? <i className="bx bx-play"></i> : <i className="bx bx-pause"></i>} Play Btn
                </button>
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

                <button
                    onClick={(e) => {
                        e.target.value = 0
                        handleVideoProgress(e)
                    }}
                >
                    Restart
                </button>
            </div>
        </div>
    )
}

export default VideoPlayer

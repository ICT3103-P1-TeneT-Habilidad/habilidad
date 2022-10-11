import React from 'react'
import { useState } from 'react'
import VideoPlayer from './VideoPlayer'
import video from '../assets/temp_video1.mp4'
import video2 from '../assets/temp_video2.mp4'

const VideoSegments = () => {
    const [data, setData] = useState('')

    const setURL = (data) => {
        setData(data)
    }

    return (
        <div>
            <VideoPlayer setURL={data} />
            <div>
                <div>
                    <select className="Chapter" onChange={(e) => setURL(e.target.value)}>
                        <option disabled> Choose Videos</option>
                        <option value={video}>Video1</option>
                        <option value={video2}>Video2</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default VideoSegments

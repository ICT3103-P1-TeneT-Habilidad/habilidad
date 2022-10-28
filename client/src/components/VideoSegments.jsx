import React from 'react'
import { useState } from 'react'
import VideoPlayer from './VideoPlayer'
import video from '../assets/temp_video1.mp4'
import video2 from '../assets/temp_video2.mp4'

const VideoSegments = () => {
    const [data, setData] = useState('')

    const parentToChild = (data) => {
        setData(data)
    }

    return (
        <div>
            <VideoPlayer parentToChild={data} />

            <div>
                <button primary onClick={() => parentToChild(video)}>
                    Click Parent url
                </button>
                <div>
                    <select className="Chapter" onChange={(e) => parentToChild(e.target.value)}>
                        <option value={video}>Video1</option>
                        <option value={video2}>Video2</option>
                        {/* <option value="url2">Chapter 1</option> */}
                        {/* <option value="url2">Chapter 2</option> */}
                        {/* <option value="url3">Chapter 3</option> */}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default VideoSegments

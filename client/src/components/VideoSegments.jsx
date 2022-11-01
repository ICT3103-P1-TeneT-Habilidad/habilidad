import React from 'react'
import { useState } from 'react'
import VideoPlayer from './VideoPlayer'
import video1 from '../assets/temp_video1.mp4'
import video2 from '../assets/temp_video2.mp4'

const VideoSegments = () => {
    const [data, setData] = useState('')

    const setURL = (data) => {
        setData(data)
    }

    const urlList = [
        { id: 1, title: 'Quick course', desc: 'Welcome', url: video1, duration: 1, timestamp: 0 },
        { id: 2, desc: 'What is react', url: video1, duration: 10, timestamp: 50 },
        { id: 3, desc: 'Tragedy of Darth Plagueis the wise', url: video2, duration: 10, timestamp: 11 },
        { id: 4, desc: 'Darth Sidious', url: video2, duration: 10, timestamp: 21 },
        { id: 5, desc: 'Darth Tyranus', url: video2, duration: 20, timestamp: 41 },
        { id: 6, desc: 'Maul ', url: video2, duration: 30, timestamp: 71 },
        { id: 6, desc: 'Maul ', url: video2, duration: 30, timestamp: 71 },
        { id: 6, desc: 'Maul ', url: video2, duration: 30, timestamp: 71 },
        { id: 6, desc: 'Maul ', url: video2, duration: 30, timestamp: 71 },
        { id: 6, desc: 'Maul ', url: video2, duration: 30, timestamp: 71 },
    ]

    const listSegments = urlList.map((url) => (
        <li
            video-id={url.id}
            onClick={(e) => {
                setURL(url)
            }}
        >
            {
                <div video-id={url.id}>
                    {url.id + '. ' + url.desc} {url.duration + 'min'}
                </div>
            }
        </li>
    ))

    return (
        <div className="Content">
            <VideoPlayer setURL={data} />
            <div className="Segment overflow-auto h-48 border border-slate-300/75 bg-background bg-slate-600 ">
                <h1 className=""> Course Name</h1>
                <ul>{listSegments}</ul>
            </div>
        </div>
    )
}

export default VideoSegments

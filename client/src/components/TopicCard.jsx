import React from 'react'
import NoImage from '../assets/noimage.jpg'

const TopicCard = ({ data }) => {
    const topics = data

    return (
        topics && (
            <div className="grid lg:grid-cols-5 lg:gap-y-4 lg:gap-x-5 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-5">
                {topics.map((topic) => (
                    <div
                        key={topic.topicId}
                        className="bg-white border border-slate-400 flex flex-col overflow-hidden w-min h-auto relative"
                    >
                        <div>
                            <div className="aspect-square bg-gray-200 group-hover:opacity-75 p-2 align-center flex h-48 w-auto items-center">
                                {/* image */}
                                <img
                                    src={topic.url ? topic.url : NoImage}
                                    alt="card"
                                    className="w-full h-full object-scale-down"
                                ></img>
                            </div>
                        </div>
                        {/* description */}
                        <div className="space-y-2 p-4">
                            <p className="text-center">
                                <span className="text-sm font-medium text-gray-900">{topic.topicName}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )
    )
}

export default TopicCard

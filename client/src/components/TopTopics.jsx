import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { OneTopicCard } from '../components'
import { useAppContext } from '../context/appContext'
// import icons
import { IoIosArrowForward } from 'react-icons/io'

const TopTopics = () => {
    const { top_topics, getTopTopics } = useAppContext()

    useEffect(() => {
        getTopTopics()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
            <div className="items-center">
                <span className="text-xl font-semibold">Top Topics</span>
                <Link to="/alltopics">
                    <div className="text-md flex float-right items-center">
                        <span>View More</span>
                        <IoIosArrowForward />
                    </div>
                </Link>
            </div>
            <div>
                <div className="grid lg:grid-cols-5 lg:gap-y-4 lg:gap-x-5 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-5">
                    {top_topics &&
                        top_topics.map(function (d, i) {
                            return i < 5 ? (
                                <Link to={`/topics/${d.topicName}`}>
                                    <OneTopicCard data={d} key={i} />
                                </Link>
                            ) : null
                        })}
                </div>
            </div>
        </div>
    )
}

export default TopTopics

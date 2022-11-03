import React from 'react'
import { TopicCard } from '../components'
import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'

const AllTopics = () => {
    const { topics, getAllTopics } = useAppContext()

    useEffect(() => {
        getAllTopics()
        // eslint-disable-next-line
    }, [])

    return (
        topics && (
            <div className="min-h-screen bg-background">
                <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
                    <TopicCard data={topics} />
                </div>
            </div>
        )
    )
}

export default AllTopics

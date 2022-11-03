import React, { useState } from 'react'
import { TopicCard } from '../components'
import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { compare } from '../utils/Helper'

const AllTopics = () => {
    const { topics, getAllTopics } = useAppContext()

    useEffect(() => {
        getAllTopics()
        // eslint-disable-next-line
    }, [])

    const sortTopicsByName = (topics) => {
        var newTopics = null
        console.log(topics)
        newTopics = topics.sort(function (a, b) {
            return compare(a.topicName, b.topicName)
        })
        console.log(newTopics)
    }

    let groupedData = topics.reduce((a, b) => {
        let group = b.topicName[0]

        if(!a[group]) a[group] = {group, data: [b]}
        else a[group].data.push(b)
        return a
    }, {})

    let result = Object.values(groupedData)

    console.log(result)

    return (
        topics && (
            <div className="min-h-screen bg-background">
                <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
                    {sortTopicsByName(topics)}
                    {result.map((one) => (
                        <div key={one.group} className="tw-flex tw-flex-col tw-p-2">
                            <div className="tw-border tw-border-divider tw-bg-divider tw-text-grey-base tw-p-4 tw-w-24 tw-h-12 tw-text-center tw-font-medium">
                                {one.group}
                            </div>
                            <TopicCard data={one.data} />
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}

export default AllTopics

import React, { useState } from 'react'
import { TopicCard } from '../../components'
import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { compare } from '../../utils/Helpers'

const AllTopics = () => {
    const { topics, getAllTopics } = useAppContext()
    const [sorted, setSorted] = useState([])

    useEffect(() => {
        getAllTopics()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (topics) {
            sortTopicsByName(topics)
            groupedTopics(topics)
        }
    }, [topics])

    const sortTopicsByName = (topics) => {
        topics = topics.sort(function (a, b) {
            return compare(a.topicName, b.topicName)
        })
    }

    const groupedTopics = (topics) => {
        let groupedData = topics.reduce((a, b) => {
            let group = b.topicName[0]

            if (!a[group]) a[group] = { group, data: [b] }
            else a[group].data.push(b)
            return a
        }, {})

        let result = Object.values(groupedData)

        setSorted(result)
    }

    function renderGroup() {
        return (
            <div>
                {sorted.map((alphabet) => {
                    return (
                        <div key={alphabet.group} className="flex flex-col p-2">
                            <div className="border border-slate-400 bg-slate-300 text-grey-base p-3 w-24 h-12 text-center font-medium">
                                {alphabet.group}
                            </div>
                            <TopicCard data={alphabet.data} />
                        </div>
                    )
                })}
            </div>
        )
    }

    return topics ? (
        <div className="min-h-screen bg-background">
            <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
                <h3 className="font-semibold text-2xl p-4">All Topics</h3>
                <div> {renderGroup()}</div>
            </div>
        </div>
    ) : (
        <div />
    )
}

export default AllTopics

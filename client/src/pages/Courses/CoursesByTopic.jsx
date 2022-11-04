import React, { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Error404 } from '../Errors'

const CoursesByTopic = () => {
    let { topicName } = useParams()
    const [check404, set404] = useState(true)

    const data = [
        {
            topicName: 'A',
        },
        {
            topicName: 'B',
        },
    ]

    useEffect(() => {
        const check = topicName ? data.find((item) => item.topicName === topicName) : null
        if (check) {
            set404(false)
        }
    })

    return (
        <div>
            {check404 ? (
                <Error404 />
            ) : (
                <div className="min-h-screen bg-background">
                    <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
                        <h3 className="font-semibold text-2xl p-4">{topicName}</h3>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CoursesByTopic

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CourseCard } from '../../components'
import { useAppContext } from '../../context/appContext'
import { Error404 } from '../Errors'

const CoursesByTopic = () => {
    let { topicName } = useParams()
    const { getCourseByTopic, topics, courses_topics, getAllTopics } = useAppContext()
    const [check, setCheck] = useState(false)

    useEffect(() => {
        const isFound = topics?.some((item) => {
            if (item.topicName === topicName) {
                return true
            }
            return false
        })

        if (isFound) {
            setCheck(true)
            console.log(topicName)
            getCourseByTopic(topicName)
        }
        // eslint-disable-next-line
    }, [topics])

    useEffect(() => {
        getAllTopics()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(check)
        // eslint-disable-next-line
    }, [check])

    useEffect(() => {
        console.log(courses_topics)
    }, [courses_topics])

    const empty = () => {
        return <div>There is no courses under this topic right now</div>
    }

    return (
        <div>
            {!check ? (
                <Error404 />
            ) : (
                <div className="min-h-screen bg-background">
                    <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
                        <h3 className="font-semibold text-2xl p-4">{topicName}</h3>
                        <div>
                            {courses_topics.result.data.length !== 0 ? (
                                <CourseCard data={courses_topics.result.data} />
                            ) : (
                                empty()
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CoursesByTopic

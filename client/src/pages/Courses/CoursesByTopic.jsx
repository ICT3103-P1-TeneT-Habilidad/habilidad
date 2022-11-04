import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { Error404 } from '../Errors'

const CoursesByTopic = () => {
    let { topicName } = useParams()
    const { getCourseByTopic, topics, courses_topics, getAllTopics} = useAppContext()
    const [check, setCheck] = useState(false)

    useEffect(() => {
        const isFound = topics?.some(item => {
            if (item.topicName === topicName) {
              return true;
            }
            return false;
          });

          if(isFound){
            setCheck(true)
            console.log(topicName)
            getCourseByTopic(topicName)
          }
        // eslint-disable-next-line
    }, [topics])

    useEffect(() => {
        getAllTopics()
    }, [])

    useEffect(() => {
        if (courses_topics) {
            console.log(courses_topics)
        }
    }, [courses_topics])

    useEffect(() => {
        console.log(check)
    }, [check])

    return (
        <div>
            {!check ? (
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

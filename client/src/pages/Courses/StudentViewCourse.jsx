import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'

const StudentViewCourse = () => {
    const { courseDetail, getCourseDetail } = useAppContext()
    const { courseId } = useParams()

    useEffect(() => {
        getCourseDetail(courseId)
    }, [])

    return (
        <div className="min-h-screen bg-background py-12 sm:px-6 lg:px-8 w-full">
            {courseDetail && (
                <div className="bg-white rounded-lg px-6 py-10 mx-auto relative">
                    <div className="flex justify-end">
                        <Link
                            className="absolute shadow focus:shadow-outline focus:outline-none bg-accent2 font-bold py-2 px-4 rounded"
                            to="/content"
                        >
                            Start Course
                        </Link>
                    </div>
                    <div className="lg:-mx-6 mb-5 lg:flex lg:items-center">
                        <img
                            className="object-scale-down w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
                            src={courseDetail?.imageUrl}
                            alt=""
                        />
                        <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                            <p className="block mt-4 text-4xl font-semibold text-gray-800 md:text-4xl">
                                {courseDetail?.courseName}
                            </p>
                            <p className="mt-3 text-sm text-gray-500 md:text-sm">
                                {courseDetail?.language}&ensp;SGD${courseDetail?.price}
                            </p>
                            <p className="mt-3 text-xl text-gray-500 md:text-xl">{courseDetail?.description}</p>
                            <div className="flex items-center mt-6">
                                <p className="text-sm text-grey-500 tracking-wide">
                                    Related Topics: &ensp;
                                    {courseDetail?.topicCourse?.map((topicData) => (
                                        <p>{topicData.topics.topicName} &ensp;</p>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudentViewCourse

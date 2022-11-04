import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { sortCourseMaterials } from '../../utils/Helpers'

const ViewCourse = () => {
    const { courseDetail, getCourseDetail } = useAppContext()
    const { courseId } = useParams()
    // const [courseId, setCouseId] = useState(searchParams.get('courseId'))
    const [courseData2, setCourseData2] = useState()

    console.log(courseId)

    useEffect(() => {
        getCourseDetail(courseId)
    }, [])

    useEffect(() => {
        setCourseData2(courseDetail)
        console.log(courseDetail)
    }, [courseDetail])

    return (
        <div className="min-h-screen bg-background py-12 sm:px-6 lg:px-8 w-full">
            <div className="bg-white rounded-lg px-6 py-10 mx-auto relative">
                <div className="flex justify-end">
                    <Link
                        className="absolute shadow focus:shadow-outline focus:outline-none bg-accent2 font-bold py-2 px-4 rounded"
                        to="/editcourse"
                    >
                        Edit Course
                    </Link>
                </div>
                <div className="lg:-mx-6 mb-5 lg:flex lg:items-center">
                    <img
                        className="object-scale-down w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
                        src={courseData2?.imageUrl}
                        alt=""
                    />
                    <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                        <p className="block mt-4 text-4xl font-semibold text-gray-800 md:text-4xl">
                            {courseData2?.courseName}
                        </p>
                        <p className="mt-3 text-sm text-gray-500 md:text-sm">
                            {courseData2?.language}&ensp;SGD${courseData2?.price}
                        </p>
                        <p className="mt-3 text-xl text-gray-500 md:text-xl">{courseData2?.description}</p>
                        <div className="flex items-center mt-6">
                            <p className="text-sm text-grey-500 tracking-wide">
                                Related Topics: &ensp;
                                {courseData2?.topicCourse?.map((topicData) => (
                                    <p>{topicData.topics.topicName} &ensp;</p>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="lg:-mx-6 lg:flex lg:items-center">
                    <div className="m-6 lg:w-full lg:mt-0 lg:mx-6">
                        <p className="mt-3 p-4 text-2xl text-gray-800 md:text-2xl">Course Materials</p>
                        <div className="flex flex-wrap">
                            {sortCourseMaterials(courseData2?.courseMaterial).map((material) => (
                                <div className="lg:w-1/3 sm:w-1/2 p-4">
                                    <h2 className="tracking-wide text-xl text-grey-500 mb-1">
                                        Lesson {material.order}: {material.title}
                                    </h2>
                                    <div className="flex">
                                        <iframe
                                            width="560"
                                            height="315"
                                            src={material.url}
                                            title={material.title}
                                            frameBorder="0"
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen={true}
                                        ></iframe>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCourse
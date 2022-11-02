import { React, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const ViewCourse = () => {
    const { edit_course } = useAppContext()
    const courseData = {
        courseId: 'd9f4092c-b629-494d-b223-fb5c9b076b4a',
        courseName: 'dumb',
        imageUrl: 'https://res.cloudinary.com/drznyznmo/image/upload/v1667308005/xhgr8cefstr8t0uu8nn0.jpg',
        duration: 10000,
        price: 10.99,
        description: 'test_course_1_des',
        language: 'ENGLISH',
        courseMaterial: [
            { title: 'Basics of React', url: 'https://www.youtube.com/embed/LRVVvmYg9Ls', order: 2 },
            {
                title: 'Death 1 to React',
                url: 'https://www.youtube.com/embed/HE74FKFZrtI',
                order: 1,
            },
            {
                title: 'Death 2 to React',
                url: 'https://res.cloudinary.com/drznyznmo/video/upload/v1667394035/video_2022-11-02_20-58-06_ae87rs.mp4',
                order: 4,
            },
            {
                title: 'Death 3 to React',
                url: 'https://www.youtube.com/embed/sSsMsSrXWl4',
                order: 3,
            },
        ],
        topicCourse: [
            {
                topicCourseId: '017855b1-58f4-4efd-b1ab-ce74857745a8',
                courseId: 'd9f4092c-b629-494d-b223-fb5c9b076b4a',
                topicId: '791ecc1c-4729-4838-b4bc-81cdf4ba10f3',
                topic: {
                    topicName: 'REEEEEEEEEEEE',
                    //whatever other info
                },
            },
        ],
    }

    useEffect(() => {
        edit_course = courseData
    })

    const sortCourseMaterials = (materials) => {
        const sortedMaterials = []
        console.log(materials)
        materials.forEach((element) => {
            if (sortedMaterials.length === 0) {
                sortedMaterials.push(element)
            } else {
                for (var i = 0; i < sortedMaterials.length; i++) {
                    if (element.order < sortedMaterials[i].order) {
                        sortedMaterials.splice(i, 0, element)
                        break
                    }
                }
                if (!sortedMaterials.includes(element)) {
                    sortedMaterials.push(element)
                }
            }
        })
        console.log(sortedMaterials)
        courseData.courseMaterial = sortedMaterials
        return sortedMaterials
    }

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
                        src={courseData.imageUrl}
                        alt=""
                    />
                    <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                        <p className="block mt-4 text-4xl font-semibold text-gray-800 md:text-4xl">
                            {courseData.courseName}
                        </p>
                        <p className="mt-3 text-sm text-gray-500 md:text-sm">
                            {courseData.language}&ensp;SGD${courseData.price}
                        </p>
                        <p className="mt-3 text-xl text-gray-500 md:text-xl">{courseData.description}</p>
                        <div className="flex items-center mt-6">
                            <p className="text-sm text-grey-500 tracking-wide">
                                Related Topics: &ensp;
                                {courseData.topicCourse.map((topicData) => (
                                    <p>{topicData.topic.topicName} &ensp;</p>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="lg:-mx-6 lg:flex lg:items-center">
                    <div className="m-6 lg:w-full lg:mt-0 lg:mx-6">
                        <p className="mt-3 p-4 text-2xl text-gray-800 md:text-2xl">Course Materials</p>
                        <div class="flex flex-wrap">
                            {sortCourseMaterials(courseData.courseMaterial).map((material) => (
                                <div class="lg:w-1/3 sm:w-1/2 p-4">
                                    <h2 class="tracking-wide text-xl text-grey-500 mb-1">
                                        Lesson {material.order}: {material.title}
                                    </h2>
                                    <div class="flex">
                                        <iframe
                                            width="560"
                                            height="315"
                                            src={material.url}
                                            title={material.title}
                                            frameborder="0"
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen="true"
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

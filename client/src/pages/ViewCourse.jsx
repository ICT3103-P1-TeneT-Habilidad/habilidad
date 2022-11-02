import { React } from 'react'

const ViewCourse = () => {
    const courseData = {
        courseId: 'd9f4092c-b629-494d-b223-fb5c9b076b4a',
        courseName: 'dumb',
        imageUrl: 'https://res.cloudinary.com/drznyznmo/image/upload/v1667308005/xhgr8cefstr8t0uu8nn0.jpg',
        duration: 10000,
        price: 10.99,
        description: 'test_course_1_des',
        language: 'ENGLISH',
        courseMaterial: [
            { title: 'first', url: 'https://media.giphy.com/media/XGxlscqR85DNeRRIII/giphy.gif', order: 1 },
            {
                title: 'second',
                url: 'https://giphy.com/gifs/kill-me-now-IIozzNpFTvIGc',
                order: 2,
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

    const sortCourseMaterials = () => {
        
    }

    return (
        <div className="min-h-screen bg-background py-12 sm:px-6 lg:px-8 w-full">
            <div className="bg-white rounded-lg px-6 py-10 mx-auto">
                <div className="lg:-mx-6 mb-5 lg:flex lg:items-center">
                    <img
                        className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
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
                                    <a>{topicData.topic.topicName} &ensp;</a>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>

                <hr />
                <div className="lg:-mx-6 lg:flex lg:items-center">
                    <div className="mt-6 lg:w-full lg:mt-0 lg:mx-6">
                        <p className="mt-3 text-xl text-gray-800 md:text-xl">Course Materials</p>
                        <div>
                            {
                                sortCourseMaterials(courseData.courseMaterial)

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCourse

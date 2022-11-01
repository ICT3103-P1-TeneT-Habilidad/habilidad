import React from 'react'
import NoImage from '../assets/noimage.jpg'

const CourseCard = (props) => {
    const courses = props.data.courses

    console.log(courses)

    return (
        <div className="grid lg:grid-cols-5 lg:gap-y-4 lg:gap-x-5 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-5">
            {courses.map((course) => (
                <div
                    key={course.courseId}
                    className="bg-white border border-black flex flex-col overflow-hidden w-min h-auto relative"
                >
                    <div>
                        <div className="aspect-square bg-gray-200 group-hover:opacity-75 p-2 align-center flex h-48 w-auto items-center">
                            {/* image */}
                            <img
                                src={course.imageUrl ? course.imageUrl : NoImage}
                                alt="card"
                                className="w-full h-full object-scale-down"
                            ></img>
                        </div>
                    </div>
                    {/* description */}
                    <div className='space-y-2 p-4'>
                        <p>
                            <span className="text-sm font-medium text-gray-900">{course.courseName}</span>
                        </p>
                        <p className="text-sm text-gray-500">{course.description}</p>
                        <div className="flex-1 flex flex-col justify-end">
                            <p className="text-base font-medium text-gray-900">{course.price} SGD</p>
                        </div>
                    </div>

                    {/* <div className="flex flex-col p-5">
                        <span className="text-lg">{course.courseName}</span>
                        <span className="text-md">{course.instructorId}</span>
                    </div> */}
                </div>
            ))}
        </div>
    )
}

export default CourseCard

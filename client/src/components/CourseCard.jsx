import React from 'react'
import NoImage from '../assets/noimage.jpg'
import { Link } from 'react-router-dom'

const CourseCard = (props) => {
    const courses = props.data

    console.log(courses)

    return (
        <div className="grid lg:grid-cols-5 lg:gap-y-4 lg:gap-x-5 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-5">
            {courses.map((course) => (
                <Link to={`/viewcourse/${course.courseId}`}>
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
                        <div className="space-y-2 p-4">
                            <p>
                                <span className="text-sm font-medium text-gray-900">{course.courseName}</span>
                            </p>
                            <p className="text-sm text-gray-500">{course.description}</p>
                            <span className="text-sm text-gray-500 py-2">
                                Instructor: {course.instructor.user.name}
                            </span>
                            <div className="flex-1 flex flex-col justify-end">
                                <p className="text-base font-medium text-gray-900">{course.price} SGD</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CourseCard

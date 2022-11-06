import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { OneCourseCard } from './index'

const PurchasedCourseCards = () => {
    const { purchased_courses, getPurchasedCourses } = useAppContext()

    useEffect(() => {
        getPurchasedCourses()
    }, [])

    return (
        <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
            <div className="items-center">
                <span className="text-xl font-semibold">Purchased Courses</span>
                <Link to="/purchased">
                    <div className="text-md flex float-right items-center">
                        <span>View More</span>
                        <IoIosArrowForward />
                    </div>
                </Link>
            </div>
            <div>
                <div className="grid lg:grid-cols-5 lg:gap-y-4 lg:gap-x-5 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-5">
                    {purchased_courses &&
                        purchased_courses.map(function (d, i) {
                            return i < 5 ? (
                                <Link to={`/viewcourse/${d.courseId}`}>
                                    <OneCourseCard data={d} key={i} />
                                </Link>
                            ) : null
                        })}
                </div>
            </div>
        </div>
    )
}

export default PurchasedCourseCards

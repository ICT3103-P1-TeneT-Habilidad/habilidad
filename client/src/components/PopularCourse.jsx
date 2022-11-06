import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { OneCourseCard } from '../components'
import { useAppContext } from '../context/appContext'
// import icons
import { IoIosArrowForward } from 'react-icons/io'

const PopularCourse = () => {
    const { popular_course, getPopularCourses } = useAppContext()

    useEffect(() => {
        getPopularCourses()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
            <div className="items-center">
                <span className="text-xl font-semibold">Popular courses among new signups</span>
                <Link to="/allcourses">
                    <div className="text-md flex float-right items-center">
                        <span>View More</span>
                        <IoIosArrowForward />
                    </div>
                </Link>
            </div>
            <div>
                <div className="grid lg:grid-cols-5 lg:gap-y-4 lg:gap-x-5 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-5">
                    {popular_course &&
                        popular_course.map(function (d, i) {
                            return i < 5 ? (
                                <Link>
                                    <OneCourseCard data={d} key={i} />
                                </Link>
                            ) : null
                        })}
                </div>
            </div>
        </div>
    )
}

export default PopularCourse

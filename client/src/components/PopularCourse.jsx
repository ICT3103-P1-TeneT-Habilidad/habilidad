import React from 'react'
import { Link } from 'react-router-dom'
import { CourseCard } from './index'
// import icons
import { IoIosArrowForward } from 'react-icons/io'

const PopularCourse = () => {
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
            <CourseCard />
        </div>
    )
}

export default PopularCourse

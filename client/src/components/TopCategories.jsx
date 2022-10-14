import React from 'react'
import { Link } from 'react-router-dom'
// import icons
import { IoIosArrowForward } from 'react-icons/io'

const TopCategories = () => {
    return (
        <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
            <div className="items-center">
                <span className="text-xl font-semibold">Top Categories</span>
                <Link to="/topcategories">
                    <div className="text-md flex float-right items-center">
                        <span>View More</span>
                        <IoIosArrowForward />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default TopCategories

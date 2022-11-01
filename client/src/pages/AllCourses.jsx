import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext.jsx'
import { CourseCard } from '../components/index.jsx'

const AllCourses = () => {
    const { getAllCourses, courses } = useAppContext()

    useEffect(() => {
        getAllCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
                <div>
                    <h3 className='font-semibold text-2xl p-4'>All Courses</h3>
                </div>
                <div>{courses && <CourseCard data={courses} />}</div>
            </div>
        </div>
    )
}

export default AllCourses

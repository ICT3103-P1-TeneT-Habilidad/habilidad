import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { GuestViewCourse, StudentViewCourse, ViewCourse, Error500 } from '../pages'

const GeneralViewCourse = () => {
    const { user_details } = useAppContext()

    const check = () => {
        if (user_details?.role === 'STUDENT') {
            return <StudentViewCourse />
        } else if (user_details?.role === 'MODERATOR' || user_details?.role === 'INSTRUCTOR') {
            return <ViewCourse />
        } else {
            return <GuestViewCourse />
        }
    }

    return (
        <div>
            {check()}
        </div>
    )
        
    
}

export default GeneralViewCourse

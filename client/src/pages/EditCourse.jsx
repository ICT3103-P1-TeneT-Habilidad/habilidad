import { React } from 'react'
import { useAppContext } from '../context/appContext'

const EditCourse = () => {
    const { edit_course } = useAppContext()
    console.log(edit_course)
}

export default EditCourse

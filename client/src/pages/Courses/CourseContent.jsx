import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CourseContentNav } from '../../components'
import { useAppContext } from '../../context/appContext'
import { sortCourseMaterials } from '../../utils/Helpers'

const CourseContent = () => {
    const { courseDetail, getCourseDetail } = useAppContext()
    const [selectedMaterial, setSelectedMaterial] = useState({})
    const [sortedMaterials, setSortedMaterials] = useState([])
    const { courseId } = useParams()

    useEffect(() => {
        getCourseDetail(courseId)
    }, [])

    useEffect(() => {
        if (courseDetail) {
            setSortedMaterials(sortCourseMaterials(courseDetail.courseMaterial))
            setSelectedMaterial(sortedMaterials[0])
        }
    }, [courseDetail])

    const navClickHandler = (materialId) => {
        sortedMaterials.forEach((material) => {
            if (material.courseMaterialId === materialId) {
                setSelectedMaterial(material)
            }
        })
    }

    return (
        <div className="bg-background py-12 sm:px-6 lg:px-8 w-full">
            <div className="bg-white rounded-lg px-6 py-10 mx-auto">
                {courseDetail && (
                    <div className="flex flex-row w-full">
                        <div className="flex w-1/5 border border-slate px-3 overflow-auto">
                            <CourseContentNav data={sortedMaterials} navClickHandler={navClickHandler} />
                        </div>
                        <div className="flex flex-col w-4/5 px-3">
                            <div className="flex w-full">
                                <label className="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2">
                                    {courseDetail?.courseName} - Lesson {selectedMaterial?.order}:{' '}
                                    {selectedMaterial?.title}
                                </label>
                            </div>
                            <div className="flex w-full">
                                <iframe
                                    src={selectedMaterial?.url}
                                    title={selectedMaterial?.title}
                                    frameBorder="0"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen={true}
                                    height="700"
                                    width="100%"
                                    scrolling="no"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CourseContent

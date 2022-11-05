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

    // const courseData = {
    //     courseId: 'd9f4092c-b629-494d-b223-fb5c9b076b4a',
    //     courseName: 'dumb',
    //     imageUrl: 'https://res.cloudinary.com/drznyznmo/image/upload/v1667308005/xhgr8cefstr8t0uu8nn0.jpg',
    //     duration: 10000,
    //     price: 10.99,
    //     description: 'test_course_1_des',
    //     language: 'ENGLISH',
    //     courseMaterial: [
    //         {
    //             courseMaterialId: '7477c8cb-d51e-4a25-872b-89b058656710',
    //             title: 'Basics of React',
    //             url: 'https://res.cloudinary.com/drznyznmo/video/upload/v1667394035/video_2022-11-02_20-58-06_ae87rs.mp4',
    //             order: 2,
    //         },
    //         {
    //             courseMaterialId: 'e5e7fdff-517a-4533-b024-ccda2b819601',
    //             title: 'Death 1 to React',
    //             url: 'https://www.youtube.com/embed/_lVooWWlM-k',
    //             order: 1,
    //         },
    //         {
    //             courseMaterialId: 'f921ad6d-d4cd-4b9b-9ff0-103c65e9998e',
    //             title: 'Death 4 to React',
    //             url: 'https://www.youtube.com/embed/9SEcxqq-3PI',
    //             order: 4,
    //         },
    //         {
    //             courseMaterialId: 'e5e7fdff-8893-491f-86fb-49a03a4d32c6',
    //             title: 'Death 3 to React',
    //             url: 'https://www.youtube.com/embed/LRVVvmYg9Ls',
    //             order: 3,
    //         },
    //         {
    //             courseMaterialId: 'e5e7fdff-1234-491f-86fb-49a03a4d32c6',
    //             title: 'Death 5 to React',
    //             url: 'https://res.cloudinary.com/drznyznmo/video/upload/v1667394035/video_2022-11-02_20-58-06_ae87rs.mp4',
    //             order: 5,
    //         },
    //         {
    //             courseMaterialId: '8841a240-4567-491f-86fb-49a03a4d32c6',
    //             title: 'Death 6 to React',
    //             url: 'https://res.cloudinary.com/drznyznmo/video/upload/v1667394035/video_2022-11-02_20-58-06_ae87rs.mp4',
    //             order: 6,
    //         },
    //         {
    //             courseMaterialId: '8841a240-5678-491f-86fb-49a03a4d32c6',
    //             title: 'Death 7 to React',
    //             url: 'https://res.cloudinary.com/drznyznmo/video/upload/v1667394035/video_2022-11-02_20-58-06_ae87rs.mp4',
    //             order: 7,
    //         },
    //         {
    //             courseMaterialId: '8841a240-6789-491f-86fb-49a03a4d32c6',
    //             title: 'Death 8 to React',
    //             url: 'https://res.cloudinary.com/drznyznmo/video/upload/v1667394035/video_2022-11-02_20-58-06_ae87rs.mp4',
    //             order: 8,
    //         },
    //         {
    //             courseMaterialId: '8841a240-7890-491f-86fb-49a03a4d32c6',
    //             title: 'Death 9 to React',
    //             url: 'https://res.cloudinary.com/drznyznmo/video/upload/v1667394035/video_2022-11-02_20-58-06_ae87rs.mp4',
    //             order: 9,
    //         },
    //         {
    //             courseMaterialId: '8841a240-1345-491f-86fb-49a03a4d32c6',
    //             title: 'Death 10 to React',
    //             url: 'https://res.cloudinary.com/drznyznmo/video/upload/v1667394035/video_2022-11-02_20-58-06_ae87rs.mp4',
    //             order: 10,
    //         },
    //         {
    //             courseMaterialId: '8841a240-2345-491f-86fb-49a03a4d32c6',
    //             title: 'Death 11 to React',
    //             url: 'https://res.cloudinary.com/drznyznmo/video/upload/v1667394035/video_2022-11-02_20-58-06_ae87rs.mp4',
    //             order: 11,
    //         },
    //     ],
    //     topicCourse: [
    //         {
    //             topicCourseId: '017855b1-58f4-4efd-b1ab-ce74857745a8',
    //             courseId: 'd9f4092c-b629-494d-b223-fb5c9b076b4a',
    //             topicId: '791ecc1c-4729-4838-b4bc-81cdf4ba10f3',
    //             topic: {
    //                 topicName: 'REEEEEEEEEEEE',
    //                 //whatever other info
    //             },
    //         },
    //     ],
    // }

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

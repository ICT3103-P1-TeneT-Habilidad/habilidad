import db from '../utils/db.js'

export const findCourseDetail = async (courseId) => {
    return db.course.findMany({
        where: {
            courseId: {
                equals: courseId
            }

        },
        include: {
            courseMaterial: true,
            topic: true
        }
    })
}

export const findCoursesWhereSubscribable = async () => {
    return db.course.findMany({
        where: {
            AND: [
                {
                    approvalStatus: {
                        equals: 'Approved'
                    }
                },
                {
                    status: {
                        in: ['Started', 'Ongoing', 'Completed']
                    }
                }

            ],
        }
    })
}

export const findCoursesWhereCreatedByInstructor = async (instructorId) => {
    return db.course.findMany({
        where: {
            instructorId: {
                equals: instructorId
            }
        }
    })

}

export const findCoursesWherePurchasedByStudent = async (studentId) => {
    return db.course.findMany({
        where: {
            purchasedCourse: {
                studentId: {
                    equals: studentId
                }
            }
        }
    })

}

export const findCoursesSortedByPopularity = async () => {

}

export const createNewCourse = async (info) => {
    console.log(info.topic)

    return db.course.create({
        data: {
            courseName: info.courseName,
            duration: info.duration,
            price: info.price,
            description: info.courseDescription,
            language: info.language,
            status: 'Pending',
            approvalStatus: 'Pending',
            instructorId: info.instructorId,
            topic: {
                create: info.topic
            }
        },
        include: {
            topic: true
        }
    })

}

export const updateOneCourse = async (data) => {
    console.log(data)
    return db.course.update({
        where: {
            courseId: data.courseId,
        },
        data: {
            courseName: data.courseName,
            duration: data.duration,
            price: data.price,
            description: data.courseDescription,
            language: data.language,
            topicCourse: {
                create: data.topicCourse != null ? data.topicCourse : undefined
            },
            imageAssetId: data.uploadResult != null ? data.imageAssetId : undefined,
            imagePublicId: data.uploadResult != null ? data.imagePublicId : undefined,
            approvalStatus: data.approvalStatus
        },
    })
}

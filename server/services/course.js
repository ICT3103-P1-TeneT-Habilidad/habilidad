import db from '../utils/db.js'

export const findOneCourse = async (courseId) => {
    return db.course.findMany({
        where: {
            courseId: {
                equals: courseId,
            },
        },
        include: {
            courseMaterial: true,
            topicCourse: {
                include: { topics: true }
            },
        },
    })
}

export const findCoursesWhereSubscribable = async () => {
    return db.course.findMany({
        where: {
            AND: [
                {
                    approvalStatus: {
                        equals: 'Approved',
                    },
                },
                {
                    status: {
                        in: ['Started', 'Ongoing', 'Completed'],
                    },
                },
            ],
        },
    })
}

export const findCoursesWhereCreatedByInstructor = async (instructorId) => {
    return db.course.findMany({
        where: {
            instructorId: {
                equals: instructorId,
            },
        },
        include: {
            instructor: true
        }
    })
}

export const findCoursesWherePurchasedByStudent = async (studentId) => {
    return db.course.findMany({
        where: {
            purchasedCourse: {
                studentId: {
                    equals: studentId,
                },
            },
        },
        include: {
            instructorId: true
        }
    })
}

export const findCoursesSortedByPopularity = async () => { }

export const createNewCourse = async (info) => {
    return db.course.create({
        data: {
            courseName: info.courseName,
            duration: info.duration,
            price: info.price,
            description: info.courseDescription,
            language: info.language.toUpperCase(),
            status: 'TOSTART',
            approvalStatus: 'PENDING',
            instructorId: info.instructorId,
            imageUrl: info.imageUrl,
            imagePublicId: info.imagePublicId,
            imageAssetId: info.imageAssetId,
            topicCourse: {
                create: info.topicCourse,
            },
            courseMaterial: {
                create: info.courseMaterials
            }
        },
        include: {
            topicCourse: true,
        },
    })
}

export const findAllCourses = async () => {
    return db.course.findMany()
}

export const updateCourseApprovalStatus = async (data) => {
    return db.course.update({
        where: {
            courseId: data.courseId,
        },
        data: {
            approvalStatus: data.approvalStatus,
            approvedBy: data.moderatorId,
        },
        include: {
            instructor: true,
            moderator: true
        }
    })
}

export const deleteOneCourse = async (data) => {
    return db.course.delete({
        where: {
            courseId: data.courseId,
        },
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
            imagePublicId: data.uploadResult != null ? data.imagePublicId : undefined
        },
    })
}

export const findPublicAndAssetId = async (courseId) => {
    return db.course.findUnique({
        where: {
            courseId
        },
        select: {
            imageAssetId: true,
            imagePublicId: true,
            imageUrl: true
        }

    })
}

export const findPopularCourse = async () => {
    return db.course.findMany({
        where: {
            isPopular: true
        },
        select: {
            courseId: true,
            courseName: true,
            imageUrl: true,
            description: true,
            price: true,
            duration: true,
            instructor: true
        },
        include: {
            instructor: true
        }
    })
}

export const findPopularCourseByTopic = async (topic) => {
    return db.course.findMany({
        where: {
            topicCourse: {
                some: {
                    topics: {
                        topicName: topic
                    }
                }
            }
        },
        select: {
            courseId: true,
            courseName: true,
            imageUrl: true,
            description: true,
            price: true,
            duration: true
        }
    })
}

export const updateCourseToPopular = async (courseId) => {
    return db.course.update({
        where: {
            courseId: courseId
        },
        data: {
            isPopular: true
        }

    })
}

export const updateCourseToNotPopular = async (courseId) => {
    return db.course.update({
        where: {
            courseId: courseId
        },
        data: {
            isPopular: false
        }

    })
}
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
            topicCourse: true,
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
    })
}

export const findCoursesSortedByPopularity = async () => {}

export const createNewCourse = async (info) => {
    console.log(info)
    return db.course.create({
        data: {
            courseName: info.courseName,
            duration: info.duration,
            price: info.price,
            description: info.courseDescription,
            language: info.language,
            status: 'TOSTART',
            approvalStatus: 'PENDING',
            instructorId: info.instructorId,
            imageUrl: info.imageUrl,
            topicCourse: {
                create: info.topicCourse,
            },
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
        },
    })
}

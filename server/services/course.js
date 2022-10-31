import db from '../utils/db.js'

export const findCourseDetail = async (courseId) => {
    return db.course.findMany({
        where: {
            courseId: {
                equals: courseId,
            },
        },
        include: {
            courseMaterial: true,
            topic: true,
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

// export const storeNewAccount = async (user) => {
//     return db.account.create({
//         data: {
//             email: user.email,
//             username: 'abs',
//             password: user.password,
//             phoneNumber: 12345678,
//             enabled: true,
//             user: {
//                 create: {
//                     name: 'abc',
//                     role: 'Student',
//                     deActivatedOn: null

//                 }
//             }
//         }
//     });
// }

export const updateCourseApprovalStatus = async () => {
    return db.course.update({
        where: {
            couseId: data.courseId,
        },
        data: {
            approvalStatus: 'APPROVED',
        },
    })
}

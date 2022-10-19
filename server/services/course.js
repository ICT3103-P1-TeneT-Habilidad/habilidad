import db from '../utils/db.js'

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

export const findCoursesWhereCreatedByInstructor = async () => {

}

export const findCoursesWherePurchasedByStudent = async () => {

}

export const findCoursesSortedByPopularity = async () => {

}

export const createNewCourse = async (info) => {

    return db.course.create({
        data: {
            courseName: info.courseName,
            duration: info.duration,
            price: info.price,
            description: info.courseDescription,
            language: info.language,
            status: 'Ongoing',
            approvalStatus: 'Approved',
            instructorId: user.userId,
            topics: {
                create: [
                    {
                        topicName: 'test',
                        description: 'First ',
                    }
                ]
            }
        }
    })

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


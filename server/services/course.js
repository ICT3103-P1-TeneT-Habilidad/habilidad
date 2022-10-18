import db from '../utils/db.js'

export const findCoursesWhereSubscribable = () => {
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

export const findCoursesWhereCreatedByInstructor = () => {

}

export const findCoursesWherePurchasedByStudent = () => {

}

export const findCoursesSortedByPopularity = () => {

}
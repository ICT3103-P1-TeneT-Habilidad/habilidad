import db from '../utils/db.js'

export const addOneCoursePurchased = async (data) => {
    return db.transaction.create({
        data: {
            studentId: data.studentId,
            courseId: data.courseId,
            amountPaid: data.amountPaid,
        },
        include: {
            student: true,
            course: true
        }
    })
}

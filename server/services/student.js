import db from '../utils/db.js'

export const findStudentIdByUserId = async (userId) => {
    return db.student.findUnique({
        where: {
            userId: userId,
        },
    })
}

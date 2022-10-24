export const findInstructorIdByUserId = async (userId) => {
    return db.instructor.findUnique({
        where: {
            userId: userId
        }
    })
}
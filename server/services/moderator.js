import db from '../utils/db.js'

export const findModeratorIdByUserId = async (userId) => {
    return db.moderator.findUnique({
        where: {
            userId: userId,
        },
    })
}

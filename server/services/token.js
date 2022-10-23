import db from '../utils/db.js'

export const findEmailToken = (user_id) => {
    return db.emailTokens.findUnique({
        where: {
            userId: user_id,
        },
    })
}

// export const verifyToken = (token) => {

// }

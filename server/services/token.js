import db from '../utils/db.js'

export const findEmailToken = (user_id) => {
    return db.emailToken.findUnique({
        where: {
            userId: user_id,
        },
    })
}

// export const verifyToken = (token) => {

// }

export const saveEmailToken = (user) => {
    return db.emailToken.create({
        data: {
            token: user.token,
            userId: user.userId,
            expiredAt: new Date().addHours(1),
        },
        include: {
            user: true,
        },
    })
}

export const replaceEmailToken = (user) => {
    return db.emailToken.update({
        where: {
            userId: user.userId,
        },
        data: {
            token: user.token,
            updatedAt: new Date(Date.now()),
            expiredAt: new Date(Date.now() + 1 * (60 * 60 * 1000) ),
        },
    })
}

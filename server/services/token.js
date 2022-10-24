import db from '../utils/db.js'

export const findEmailToken = (user_id) => {
    return db.emailToken.findUnique({
        where: {
            userId: user_id,
        },
    })
}

export const saveEmailToken = (user) => {
    return db.emailToken.create({
        data: {
            token: user.token,
            userId: user.userId,
            expiredAt: user.expiredAt,
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
            updatedAt: user.updatedAt,
            expiredAt: user.expiredAt,
        },
    })
}

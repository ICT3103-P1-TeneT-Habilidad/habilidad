import db from '../utils/db.js'

export const createNewOTP = async (info) => {
    return db.otpToken.create({
        data: {
            token: info.token,
            expiredAt: info.expiredAt,
            userId: info.userId
        }
    })
}

export const findOtpTokenByUsername = async (info) => {
    return db.otpToken.findMany({
        where: {
            token: info.token,
            user: {
                username: {
                    equals: info.username
                }
            }
        }
    })
}

export const deleteOtpById = async (id) => {
    return db.otpToken.delete({
        where: {
            oTokenId: id
        }
    })
}

export const deleteOtpByEmail = async (email) => {
    return db.otpToken.deleteMany({
        where: {
            user: {
                email: {
                    equals: email
                }
            }
        }
    })
}
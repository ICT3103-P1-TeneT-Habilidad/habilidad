import db from '../utils/db.js'
import { hashToken } from '../utils/hash.js'
import { decodeToken } from '../utils/jwt.js'

// used when we create a refresh token.
export const addRefreshTokenToWhitelist = ({ jti, refreshToken, userId }) => {
    return db.refreshTokens.create({
        data: {
            token: hashToken(refreshToken),
            userId: userId,
            expiredAt: new Date(decodeToken(refreshToken, 1).exp * 1000),
        },
    })
}

// used to check if the token sent by the client is in the database.
export const findRefreshTokenByUserId = (userId) => {
    return db.refreshTokens.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

// Delet tokens
export const deleteRefreshTokenByUserId = (userId) => {
    return db.refreshTokens.deleteMany({
        where: {
            userId,
        }
    })
}

export const revokeTokensByUserId = (userId) => {
    return db.refreshTokens.updateMany({
        where: {
            userId,
        },
        data: {
            revokedAt: new Date(),
        },
    })
}

export const revokeLastTokenById = (rTokenId) => {
    return db.refreshTokens.update({
        where: {
            rTokenId
        },
        data: {
            revokedAt: new Date()
        }
    })
}
import db from '../utils/db.js'
import { hashToken } from '../utils/hash.js'

// used when we create a refresh token.
export const addRefreshTokenToWhitelist = ({ jti, refreshToken, userId }) => {
    return db.refreshTokens.create({
        data: {
            token: hashToken(refreshToken),
            userId: userId,
            expiredAt: new Date(JSON.parse(Buffer.from(refreshToken.split('.')[1], 'base64').toString()).exp)
        },
    });
}

// used to check if the token sent by the client is in the database.
function findRefreshTokenById(id) {
    return db.refreshTokens.findUnique({
        where: {
            id,
        },
    });
}

// soft delete tokens after usage.
function deleteRefreshToken(id) {
    return db.refreshTokens.update({
        where: {
            id,
        },
        data: {
            revoked: true
        }
    });
}

function revokeTokens(userId) {
    return db.refreshTokens.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}
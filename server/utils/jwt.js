import jwt from 'jsonwebtoken'

// Usually I keep the token between 5 minutes - 15 minutes
const generateAccessToken = (userId) => {
    return jwt.sign({ userId: userId }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    })
}

// I choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
const generateRefreshToken = (userId, jti) => {
    return jwt.sign(
        {
            userId: userId,
            jti,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        }
    )
}

export const generateTokens = (userId, jti) => {
    const accessToken = generateAccessToken(userId)
    const refreshToken = generateRefreshToken(userId, jti)

    return {
        accessToken,
        refreshToken,
    }
}

export const decodeToken = (token, pos) => {
    return JSON.parse(Buffer.from(token.split('.')[pos], 'base64').toString())
}

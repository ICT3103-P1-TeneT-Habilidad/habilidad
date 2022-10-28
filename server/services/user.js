import db from '../utils/db.js'

export const findUserbyUserId = async (userId) => {
    return db.user.findUnique({
        where: {
            userId: userId,
        },
    })
}

export const findUserByEmail = async (email) => {
    return db.user.findMany({
        where: {
            email: email,
        },
    })
}

export const updateUserDetails = async({email,password,phoneNumber,name},userId) => {
    return db.user.update({
        where: {
            userId : userId,
        },
        data:{
            email: email,
            name: name,
            phoneNumber: phoneNumber,
            password: password,

        },
    })
}
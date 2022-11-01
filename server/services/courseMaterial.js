import { Prisma } from '@prisma/client'
import db from '../utils/db.js'

/**
 * Create Array of Course Materials
 */
export const createCourseMaterial = async (data) => {
    return db.courseMaterial.create({
        data: data
    })
}

/**
 * Update Array of Course Materials
 */
export const editCourseMaterial = async (data) => {

    const transactions = data.map((ele) => {
        return db.courseMaterial.update({
            where: {
                courseMaterialId: ele.courseMaterialId,
            },
            data: {
                assetId: ele.assetId,
                publicId: ele.publicId
            }
        })
    })

    return db.$transaction(transactions)
}

/**
 * Delete Array of Course Materials
 */
export const deleteCourseMaterial = async (data) => {
    const transactions = data.map((ele) => {
        return db.courseMaterial.delete({
            where: {
                courseMaterialId: ele.courseMaterialId,
            }
        })
    })

    return db.$transaction(transactions)
}
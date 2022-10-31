// import responses
import { Response } from '../responses/response.js'
import logger from '../utils/logging/log.js'
import { LogMessage } from '../utils/logging/logMessage.js'
import { findInstructorIdByUserId } from '../services/instructor.js'
import { findStudentIdByUserId } from '../services/student.js'

export const isRoleInstructor = async (req, res, next) => {
    try {
        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        const { userId } = req.payload

        const instructor = await findInstructorIdByUserId(userId)

        if (!instructor) {
            throw new Response('Not authorized', 'res_unauthorised')
        }
        req.payload.instructorId = instructor.instructorId
        next()
    } catch (err) {
        next(err)
    }
}

export const isRoleModerator = async (req, res, next) => {
    try {
        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        const { userId } = req.payload

        const moderator = await findStudentIdByUserId(userId)

        if (!moderator) {
            throw new Response('Not authorized', 'res_unauthorised')
        }
        req.payload.moderatorId = moderator.moderatorId
        next()
    } catch (err) {
        next(err)
    }
}

export const isRoleStudent = async (req, res, next) => {
    try {
        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        const { userId } = req.payload

        const student = await findStudentIdByUserId(userId)

        if (!student) {
            throw new Response('Not authorized', 'res_unauthorised')
        }
        req.payload.studentId = student.studentId
        next()
    } catch (err) {
        next(err)
    }
}

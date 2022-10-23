import { responseCode } from '../utils/responseCode.js'
import { findCourseDetail } from '../services/course.js'
// import logger from '../utils/log.js'
// import { LogMessage } from '../utils/logMessage.js'

export const getCourseDetail = async (req, res, next) => {

    try {

        const { courseId } = req.sanitizedBody

        const course = await findCourseDetail(courseId)

        // Log for sending response
        // let logMsg = new LogMessage(200, req).msg
        // logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                course
            }
        })

    } catch (err) {

        // Log for error message
        // let logMsg = new LogMessage(err.statusCode, req).msg
        // logger.error(logMsg)

        next(err)
    }

}
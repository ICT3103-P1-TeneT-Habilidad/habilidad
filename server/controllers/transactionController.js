import { responseCode } from '../responses/responseCode.js'
// import logs
import logger from '../utils/logging/log.js'
import { LogMessage } from '../utils/logging/logMessage.js'
// import services
import { addOneCoursePurchased } from '../services/transaction.js'

export const purchaseOneCourse = async (req, res, next) => {
    try {
        const { userId } = req.headers
        const { courseId, amountPaid } = req.body

        const { result } = await addOneCoursePurchased({ userId, courseId, amountPaid })

        res.status(responseCode.res_ok).json({
            result: {
                result,
            },
        })
    } catch (err) {
        next(err)
    }
}

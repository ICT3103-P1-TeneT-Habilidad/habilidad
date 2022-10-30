// services
import { createNewTopic, findAllTopics } from '../services/topic.js'

// responses
import { Response } from '../responses/response.js'
import { responseCode } from '../responses/responseCode.js'
import fs from 'fs'

// logs
import logger from '../utils/logging/log.js'
import { LogMessage } from '../utils/logging/logMessage.js'

export const allTopic = async (req, res, next) => {
    try {
        const topics = await findAllTopics()

        res.status(responseCode.res_ok).json({
            result: {
                topics
            },
        })
    } catch (err) {
        next(err)
    }
}

export const createTopic = async (req, res, next) => {
    try {
        const { topicName, description } = req.body
        const topicImage = req.file

        const uploadResult = await cloudinary.uploader.upload(topicImage.path)
        fs.unlinkSync(topicImage.path)

        const topic = await createNewTopic({ topicName, description, url: uploadResult.secure_url })

        res.status(responseCode.res_ok).json({
            result: {
                topic
            },
        })
    } catch (err) {
        next(err)
    }
}
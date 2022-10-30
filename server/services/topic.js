import db from '../utils/db.js'

export const findAllTopics = async () => {
    return db.topics.findMany()
}

export const createNewTopic = async (topic) => {
    return db.topics.create({
        data: {
            topicName: topic.topicName,
            description: topic.description,
            url: topic.url
        }
    })

}
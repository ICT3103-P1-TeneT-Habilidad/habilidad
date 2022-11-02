import db from '../utils/db.js'

export const findAllTopics = async () => {
    return db.topics.findMany()
}

export const createNewTopic = async (topic) => {
    return db.topics.create({
        data: {
            topicName: topic.topicName,
            description: topic.description,
            url: topic.url,
        },
    })
}

export const findTopicByName = async (topicCourse) => {
    const transactions = topicCourse.map((ele) => {
        return db.topics.findUnique({
            where: {
                topicName: ele.value,
            },
            select: {
                topicId: true
            }
        })
    })
    return db.$transaction(transactions)
}
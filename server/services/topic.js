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
                topicName: ele.label,
            },
            select: {
                topicId: true
            }
        })
    })
    return db.$transaction(transactions)
}

export const findPopularTopic = async () => {
    return db.topics.findMany({
        include: {
            _count: {
                select: { topicCourse: true }
            }
        },
        orderBy: {
            topicCourse: {
                _count: 'desc'
            }
        }

    })
}
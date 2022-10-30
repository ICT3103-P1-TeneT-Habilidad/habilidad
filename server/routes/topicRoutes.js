import express from 'express'
// import controllers
import { isAuthenticate } from '../controllers/auth.js'
import {
    allTopic,
    createTopic
} from '../controllers/topic.js'

const router = express.Router()

// Get all topics
router.route('/').get(isAuthenticate, allTopic)

// Create new topic
router.route('/create').post(isAuthenticate, createTopic)

export default router
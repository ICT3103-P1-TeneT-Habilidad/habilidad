import express from 'express'
// import controllers
import { isAuthenticate } from '../controllers/authController.js'
import { getAllTopics, createTopic } from '../controllers/topicController.js'
import { imageUpload } from '../middleware/multer.js'

const router = express.Router()

// Get all topics
router.route('/').get(getAllTopics)

// Create new topic
router.route('/create').post(isAuthenticate, imageUpload, createTopic)

export default router

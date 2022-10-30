import express from 'express'
import userRoutes from './userRoutes.js'
import courseRoutes from './courseRoutes.js'
import topicRoutes from './topicRoutes.js'

const router = express.Router()

router.use('/api/users/', userRoutes)

router.use('/api/course/', courseRoutes)

router.use('/api/topics/', topicRoutes)

export default router

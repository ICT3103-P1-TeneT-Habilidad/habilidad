import express from 'express'
import userRoutes from './userRoutes.js'
import courseRoutes from './courseRoutes.js'
import transactionRoutes from './transactionRoutes.js'
import topicRoutes from './topicRoutes.js'
import rateLimiter from 'express-rate-limit'

const router = express.Router()

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 5 requests per 'window'
    message: 'Too many requests from this IP, please try again after 15 minutes',
})

router.use('/api/users', apiLimiter, userRoutes)

router.use('/api/course', apiLimiter, courseRoutes)

router.use('/api/topics', apiLimiter, topicRoutes)

router.use('/api/transactions', apiLimiter, transactionRoutes)

export default router

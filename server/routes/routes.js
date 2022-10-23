import express from 'express'
import userRoutes from './userRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'
import courseRoutes from './courseRoutes.js'

const router = express.Router()

router.use('/api/users/', userRoutes)

router.use('/api/dashboard/', dashboardRoutes)

router.use('/api/course/', courseRoutes)

export default router
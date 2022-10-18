import express from 'express'
import userRoutes from './userRoutes.js'
import dashboardRoutes from './dashboard.js'

const router = express.Router()

router.use('/api/users/', userRoutes)

router.use('/api/dashboard/', dashboardRoutes)


export default router
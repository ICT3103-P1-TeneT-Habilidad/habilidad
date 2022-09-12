import express from 'express'

import { getUsers } from '../controllers/users.js'

const router = express.Router()

router.route('/api/users/').get(getUsers)

export default router
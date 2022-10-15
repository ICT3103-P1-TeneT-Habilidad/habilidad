import express from 'express'

import { getUser, userLogin, userLogout, userRegister, updateUser } from '../controllers/users.js'

const router = express.Router()

// Get user detail
router.route('/').get(getUser)

// Update user detail
router.route('/update').post(updateUser)

// Delete user account

// login
router.route('/login').post(userLogin)

// logout
router.route('/logout').post(userLogout)

// register
router.route('/register').post(userRegister)

// verify access token

export default router
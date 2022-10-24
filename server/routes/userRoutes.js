import express from 'express'
import { isAuthenticate } from '../controllers/auth.js'

import { getUser, userLogin, userLogout, userRegister, updateUser, userDeactivate } from '../controllers/users.js'

const router = express.Router()

// Get user detail
router.route('/').get(isAuthenticate, getUser)

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

// Deactivate user account
router.route('/deactivate').post(userDeactivate)

export default router
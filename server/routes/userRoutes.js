import express from 'express'
import { isAuthenticate } from '../controllers/auth.js'

import { getUser, userLogin, userLogout, userRegister, updateUser, sendEmailResetLink, resetPassword, sendEmailDeactivateAcc, userDeactivate } from '../controllers/users.js'

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

// send email reset link
router.route('/resetPassword').post(sendEmailResetLink)

// reset password
router.route('/resetPassword/:token').post(resetPassword)

// Deactivate user account
router.route('/deactivate').post(isAuthenticate, userDeactivate, sendEmailDeactivateAcc)

export default router

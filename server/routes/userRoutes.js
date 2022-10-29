import express from 'express'
// import controllers
import { isAuthenticate } from '../controllers/auth.js'
import {
    getUser,
    userLogin,
    userLogout,
    userRegister,
    updateUser,
    validateEmailAndPassword,
    sendEmailResetLink,
    resetPassword
} from '../controllers/users.js'

const router = express.Router()

// Get user detail
router.route('/').get(isAuthenticate, getUser)

// Update user detail
router.route('/update').post(updateUser)

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

export default router

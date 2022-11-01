import express from 'express'
// import controllers
import { isAuthenticate } from '../controllers/authController.js'
import {
    getAllUsers,
    getOneUser,
    userLogin,
    userLogout,
    userRegister,
    updateUser,
    sendEmailResetLink,
    resetPassword,
    reactivateUser,
    sendEmailDeactivateAcc,
    deactivateUser,
} from '../controllers/usersController.js'
import { isRoleModerator } from '../middleware/checkRole.js'

const router = express.Router()

// Get all users
router.route('/allUsers').get(isAuthenticate, getAllUsers)

// Get user detail
router.route('/').get(isAuthenticate, getOneUser)

// Update user detail
router.route('/').patch(isAuthenticate, updateUser)

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

// reactivate account
router.route('/reactivate').patch(isAuthenticate, isRoleModerator, reactivateUser)

// Deactivate user account
router.route('/deactivate').patch(isAuthenticate, deactivateUser, sendEmailDeactivateAcc)

export default router

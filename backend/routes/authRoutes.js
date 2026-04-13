import express, { Router } from 'express'
import { signin, logout, signup, googleSignup, googleSignin, sendOtp, verifyOtp, resetPassword } from '../controllers/authController.js'

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/logout', logout)
authRouter.post('/signup/google-auth', googleSignup)
authRouter.post('/signin/google-auth', googleSignin)
authRouter.post('/send-otp', sendOtp)
authRouter.post('/verify-otp', verifyOtp)
authRouter.post('/reset-password', resetPassword)


export default authRouter
import express, { Router } from 'express'
import { signin, logout, signup, googleSignup, googleSignin } from '../controllers/authController.js'

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/logout', logout)
authRouter.post('/signup/google-auth', googleSignup)
authRouter.post('/signin/google-auth', googleSignin)

export default authRouter
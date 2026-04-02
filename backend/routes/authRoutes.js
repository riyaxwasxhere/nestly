import express, { Router } from 'express'
import { signin, logout, signup } from '../controllers/authController.js'

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/logout', logout)

export default authRouter
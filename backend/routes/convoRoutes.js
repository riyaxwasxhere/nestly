import express, { Router } from 'express'
import { createConversation, getConversationById, getUserConversations } from '../controllers/convoController.js'

const convoRouter = Router()

convoRouter.post('/create', createConversation)
convoRouter.get('/:userId', getUserConversations)
convoRouter.get('/:conversationId', getConversationById)

export default convoRouter
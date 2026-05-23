import express, { Router } from 'express'
import { addMessage, createConversation, getConversationById, getMessagesByConversationId, getUserConversations } from '../controllers/convoController.js'

const convoRouter = Router()

convoRouter.post('/create', createConversation)
convoRouter.get('/user/:userId', getUserConversations)
convoRouter.get('/conversation/:conversationId', getConversationById)
convoRouter.post('/message', addMessage)
convoRouter.get('/messages/:conversationId', getMessagesByConversationId)

export default convoRouter
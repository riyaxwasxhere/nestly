import e from "express"
import Conversations from "../models/Conversations.js"
import Messages from "../models/Messages.js"
import User from "../models/User.js"

export const createConversation = async(req, res) => {
    try{
        const {senderId, receiverId} = req.body
        const newConversation = new Conversations({
            members: [senderId, receiverId]
        })
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation )
    }catch(error){
        res.status(500).json(error)
    }
}

export const getUserConversations = async(req, res) => {
    try{
        const userId = req.params.userId
        const conversations = await Conversations.find({
            members: { $in: [userId] }
        })
        const convoUserData = conversations.map(async (convo)=>{
            const receiverId = convo.members.find((member) => member !== userId)
            const receiver = await User.findById(receiverId)
            return ({
                conversationId: convo._id,
                receiverId: receiver._id,
                receiverName: receiver.name,
                receiverProfilePic: receiver.profilePic
            })
        })
        res.status(200).json(await Promise.all(convoUserData))
    }catch(error){
        res.status(500).json(error)
    }
}

export const getConversationById = async(req, res) => {
    try{
        const conversationId = req.params.conversationId
        const conversation = await Conversations.findById(conversationId)
        res.status(200).json(conversation)
    }catch(error){
        res.status(500).json(error)
    }
}

export const addMessage = async(req, res) => {
    try{
        const {conversationId, senderId, text} = req.body
        const newMessage = new Messages({
            conversationId,
            senderId,
            text
        })
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }catch(error){
        res.status(500).json(error)
    }
}

export const getMessagesByConversationId = async(req, res) => {
    try{
        const conversationId = req.params.conversationId
        const messages = await Messages.find({conversationId})
        const messageUserData = messages.map(async (msg)=>{
            const sender = await User.findById(msg.senderId)
            return ({
                messageId: msg._id,
                senderId: msg.senderId,
                senderProfilePic: sender.profilePic,
                text: msg.text,
                timestamp: msg.timestamp,
                user : {
                    email: sender.email,
                    fullName: sender.name
                }
            })
        })
        res.status(200).json(await Promise.all(messageUserData))
    }catch(error){
        res.status(500).json(error)
    }
}
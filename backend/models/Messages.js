import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    conversationId:{
        type: String,
        required: true
    },
    senderId:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Messages = mongoose.model('Messages', MessageSchema);

export default Messages;
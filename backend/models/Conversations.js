import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    members:{
        type: Array,
        required: true
    },
    lastMessage: {
        type: String,
        default: ""
    },
    lastMessageAt: {
        type: Date
    }
}, {timestamps: true})

const Conversations = mongoose.model('Conversations', ConversationSchema);

export default Conversations;
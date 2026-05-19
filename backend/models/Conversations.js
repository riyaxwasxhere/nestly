import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    members:{
        type: Array,
        required: true
    }
}, {timestamps: true})

const Conversations = mongoose.model('Conversations', ConversationSchema);

export default Conversations;
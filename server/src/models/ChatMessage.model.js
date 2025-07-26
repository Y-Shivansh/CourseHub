import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'ai'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 30 //30 days delete
    }
})

const Chat = mongoose.model('Chat', chatMessageSchema);
export default Chat;
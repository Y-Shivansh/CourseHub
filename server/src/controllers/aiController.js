import { getGeminiResponse } from '../services/geminiService.js'
import User from '../models/User.model.js'
import Course from '../models/Course.model.js'
import Chat from '../models/ChatMessage.model.js'

export const geminiChat = async (req, res) => {
    const { userInput, courseId } = req.body;
    const userId = req.user.userId;

    if (!userInput?.trim() || !courseId) {
        return res.status(400).json({ message: "Missing userInput or courseId" });
    }

    try {
        const user = await User.findById(userId);
        const course = await Course.findById(courseId).populate('createdBy', 'name');

        if (!user || !course) {
            return res.status(404).json({ message: "User or Course not found." });
        }

        const previousMessages = await Chat.find({
            user: userId,
            course: courseId
        }).sort({ createdAt: 1 }).limit(6).select('role message');

        const formattedPreviousMessages = previousMessages.map(
            (msg) => `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.message}`
        ).join('\n');

        const userChat = new Chat({
            user: userId,
            course: courseId,
            role: 'user',
            message: userInput
        })
        await userChat.save();

        const prompt = `
            You are a course assistant helping with "${course.name}",
            taught by ${course.createdBy.name}.
            The Description of course is ${course.description}

            Here is the previous conversation:
            ${formattedPreviousMessages}

            If user greets you first then only you greet the not in every response.

            Now, user ${user.name} asked:
            "${userInput}"

            Please reply with a clear, short, and friendly explanation and feel free to use analogies and adding emojis if needed.

            If the question is off-topic, politely say you can only help with this course and use very small response for the thing user asked and do not shift to that topic.
        `.trim();

        const reply = await getGeminiResponse(prompt);
        const aiChat = new Chat({
            user: userId,
            course: courseId,
            role: 'ai',
            message: reply
        })
        await aiChat.save();

        res.status(200).json({
            message: "Response Provided",
            reply
        })
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        res.status(503).json({
            message: "AI is currently overloaded. Please try again in a few seconds.",
        });
    }
}
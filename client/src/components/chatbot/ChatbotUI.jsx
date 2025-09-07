import { useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { privateApi } from "../../services/axios.config";

const ChatbotUI = ({courseId}) => {
    const [messages, setMessages] = useState([
        { role: 'ai', message: "Hey! I'm your course assistant. Ask me anything." },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const onSend = async (text) => {
        const userMessage = { role: 'user', message: text};
        setMessages(prev => [...prev, userMessage]) // showing user message directly.
        setIsLoading(true);

        try{
            const res = await privateApi.post('/ai/chat', {
                userInput: userMessage.message,
                courseId: courseId,
            })

            const reply = res.data.reply;

            const aiMessage = {
                role: 'ai',
                message: reply || "Sorry, no response.",
            }
            setMessages(prev => [...prev, aiMessage]);
        }catch(error){
            console.error("Chatbot Error",error);
            const errorMessage = {
                role: 'ai',
                message: "Something went wrong. Please try again later.",
              };
              setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="overflow-auto max-h-[60vh]">
        {/* Showing all messages */}
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} message={msg.message} />
        ))}
    
        {/* Input box */}
        <ChatInput onSend={onSend} disabled={isLoading} />
      </div>
    )

}

export default ChatbotUI;
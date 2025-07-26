import { useState } from 'react';
import { SendHorizonal } from 'lucide-react';

const ChatInput = ({ onSend, disabled = false }) => {
    const [text, setText] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmed = text.trim();
        if (!trimmed || disabled) return;

        onSend(trimmed);
        setText('');

    }


    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center border-t px-2 py-3 bg-background-light"
        >
            <textarea
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
                placeholder={disabled ? "Waiting for response..." : "Type your question"}
                disabled={disabled}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none bg-white dark:bg-secondary-dark text-black dark:text-white text-sm font-inter resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />

            <button
                type='submit'
                disabled={disabled}
                className='border rounded-2xl bg-primary-light dark:bg-primary-dark text-white cursor-pointer hover:bg-primary-dark dark:hover:bg-primary-light p-1.5 mx-1 disabled:opacity-50 disabled:cursor-not-allowed'
            >
                <SendHorizonal size={24} />
            </button>
        </form>
    );
}
export default ChatInput;

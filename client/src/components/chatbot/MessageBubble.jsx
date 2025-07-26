

const MessageBubble = ({message, role}) => {
    const isUser = role === 'user';

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mx-3 my-2`}>
            <div
                className={`max-w-[70%] px-4 py-2 rounded-xl text-sm font-inter whitespace-pre-wrap shadow
                    ${isUser
                        ? 'bg-primary-light dark:bg-primary-dark text-white'
                        : 'bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark'
                    }`}
            >
                {message}
            </div>
        </div>
    )
}

export default MessageBubble;
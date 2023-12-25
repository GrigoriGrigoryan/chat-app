import './styles.scss';

import { useState } from 'react';

type Props = {
    onMessage: (msg: string) => void;
}

export const ChatInput = ({ onMessage }: Props) => {
    const [message, setMessage] = useState<string>('');

    const handleMessageSend = () => {
        onMessage(message);
        setMessage('');
    };

    return (
        <div className="chat-input">
            <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write a message..."
            />
            <button onClick={handleMessageSend} disabled={!message.trim()}>
                Send
            </button>
        </div>
    );
}
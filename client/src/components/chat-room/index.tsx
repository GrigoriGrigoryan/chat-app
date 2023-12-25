import './styles.scss';

import { Message } from "../../types/chat";

type Props = {
    messages: Message[];
    currentUser: string;
}

export const ChatRoom = ({ messages, currentUser }: Props) => {
    return (
        <div className="chat-room">
            {messages.map((message, index) => (
                <div key={index} className={`message ${currentUser === message.sender ? "current-user" : ""}`}>
                    <div className="name-avatar">{message.sender[0].toUpperCase()}</div>
                    <div className="message-body">
                        <div className="sender">{message.sender}</div>
                        <div className="text">{message.body}</div>
                        <div className="time">{message.createdAt}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
import './App.scss';

import React, {useEffect, useState} from 'react';
import { WebSocketService } from "./services/websocket";
import { ChatInput } from './components/chat-input';
import { ChatRoom } from './components/chat-room';
import { Login } from './components/login';
import { ChatEvents, Message, User } from './types/chat';


export const App = () => {
    const [webSocketService] = useState(new WebSocketService());
    const [messages, setMessages] = useState<Message[]>([]);
    const [user, setUser] = useState<string | null>(null);

    const sendMessage = (message: string) => {
        if(!user) {
            return;
        }

        webSocketService.sendMessage(ChatEvents.Message, {
            sender: user,
            body: message,
        });
    };

    const loginUser = (name: string) => {
        webSocketService.sendMessage(ChatEvents.User, {
            name,
        });

        setUser(name);
    }

    const messageHandler = (message: Message) => {
        setMessages([...messages, message]);
    };

    const userHandler = (newUser: User) => {
        console.log('New user: ', newUser.name);
    };

    useEffect(() => {
        webSocketService.connect('http://localhost:5002');

        return () => {
            webSocketService.disconnect();
        };
    }, [webSocketService]);

    useEffect(() => {
        webSocketService.subscribe(ChatEvents.User, userHandler);
        webSocketService.subscribe(ChatEvents.Message, messageHandler);
    }, [webSocketService, messageHandler]);

    return (
        <div className="app">
            <h2 className="main-title">{user ? `Hi ${user}. Happy chatting...` : 'Welcome to Chat Room'}</h2>
            {user ? (
                <>
                    <div className="chat">
                        <ChatRoom messages={messages} currentUser={user} />
                        <ChatInput onMessage={sendMessage} />
                    </div>
                </>
            ) : <Login loginUser={loginUser} />}
        </div>
    );
}

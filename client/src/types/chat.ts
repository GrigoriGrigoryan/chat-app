export enum ChatEvents {
    Message = 'message',
    User = 'user',
}

export interface Message {
    id: string;
    sender: string;
    body: string;
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
}
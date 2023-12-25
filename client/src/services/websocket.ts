import { io, Socket } from 'socket.io-client';

export class WebSocketService {
    private socket: Socket | undefined;

    public connect(address: string) {
        this.socket = io(address);

        this.socket.connect();

        this.socket.on('connect_error', (error) => {
            console.error('Failed to connect to real-time messaging:', error);
        });
    }

    public subscribe(event: string, messageHandler: (...args: any[]) => void): void {
        this.socket?.on(event, messageHandler);
    }

    public sendMessage<TData>(event: string, data: TData) {
        console.log(data);
        this.socket?.emit(event, data);
    }

    public disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
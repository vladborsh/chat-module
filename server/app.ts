import { Server, createServer } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { Message } from './model/message.model';

export function createApp() {
    const app = new App()
    return app;
}

export class App {

    public readonly PORT:number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.config();
        this.listen();
    }
    
    private config(): void {
        this.app = express();
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.PORT, () => {
            console.log('Running server on port %s', this.PORT);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (message: Message) => {
                console.log('[server](message): %s', JSON.stringify(message));
                this.io.emit('message', message);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

}
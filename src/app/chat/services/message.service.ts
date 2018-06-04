import { Injectable } from "@angular/core";
import * as socketIo from "socket.io-client";
import { Observable, Subscriber } from "rxjs";
import { Message } from "../models/message.model";
const SERVER_URL: string = "http://localhost:8080";

(window as any).global = window;

@Injectable()
export class MessageService {

    private socket: socketIo.Server;

    constructor() {}
    
    public initConnection() {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(
            (observer: Subscriber<Message>) => {
                this.socket.on('message', (data: Message) => observer.next(data));
            });
    }

}

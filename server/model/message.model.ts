import { User } from "./user.model";

export class Message {
    constructor( private user: User, 
                 private content: string) {}
}
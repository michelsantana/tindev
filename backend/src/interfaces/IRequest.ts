import { Request } from 'express';
import { Socket } from 'socket.io';
export default interface IRequest extends Request {
    io: Socket,
    ConnectedUsers: any
}
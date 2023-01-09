import { atom } from 'jotai';
import { io, Socket } from 'socket.io-client';

export const SOCKET = io('https://3e72-212-31-49-235.eu.ngrok.io', { transports: ["websocket"] });
SOCKET.on('serverConnection', (message: string) => { console.log(message) });

export const atomSOCKET = atom<Socket>(SOCKET);
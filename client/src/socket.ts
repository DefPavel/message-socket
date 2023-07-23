import { io } from 'socket.io-client';

const { VITE_URL_SEVER } = import.meta.env;

export const socket = io(VITE_URL_SEVER, { 
    autoConnect: true,
});
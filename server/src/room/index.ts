import { Socket } from "socket.io";

export const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        console.log(`User with ID: ${socket.id} create room`);
    };

    const joinRoom = (data: string | string[]) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    };

    socket.on("create_room", createRoom);
    socket.on("join_room", joinRoom);
};
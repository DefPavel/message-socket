import { Socket } from "socket.io";

export const messageHandler = (socket: Socket) => {

    const sendMessage = (data : any) => {
        socket.to(data.room).emit("receive_message", data);
    };

    socket.on("send_message", sendMessage);
};
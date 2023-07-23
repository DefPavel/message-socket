import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import { roomHandler } from './room';
dotenv.config();

const { PORT } = process.env || 3434;
const WEBSOCKET_CORS = {
  origin: "*",
  methods: ["GET", "POST"]
}

const app = express();
app.use(cors);

const server = http.createServer(app);
const io = new Server(server, {
  cors: WEBSOCKET_CORS,
});

io.on("connection", function(socket: any) {
  console.log("a user connected");

  socket.on("hello", function(message: any) {
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

});

app.listen(PORT, () => {
  console.log(`⚡️Server is running at http://localhost:${PORT}`);
});
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Socket } from "socket.io-client";

type MessageData = {
    room: string,
    author: string,
    message: string,
    time: string,  
};

type ChatHandler = {
    socket: Socket,
    username: string,
    room: string,
};

function Chat({ socket, username, room } : ChatHandler) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState<MessageData[]>([]);
  
    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData: MessageData = {
          room: room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
  
        await socket.emit("send_message", messageData);
        setMessageList((list) => {
            return [...list, messageData];
        });
        setCurrentMessage("");
      }
    };
  
    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMessageList((list) => {
            return [...list, data];
        });
      });
    }, [socket]);
  
    return (
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent: MessageData) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    );
  }

  export default Chat;
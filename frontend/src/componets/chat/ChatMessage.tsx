import React, { useContext } from "react";
import { ChatContext } from "../../context/chat/ChatContext";
import { AuthContext } from "../../context/AuthContext";

interface ChatMessageProps {
  message: string;
  sender: "user" | "other";
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  timestamp,
}) => {
  return (
    <div
      className={`d-flex ${
        sender === "user" ? "justify-content-end" : "justify-content-start"
      } my-2`}
    >
      <div
        className={`p-3 rounded ${
          sender === "user"
            ? "bg-primary text-white"
            : "bg-info-subtle text-white"
        }`}
      >
        <p className="mb-0">{message}</p>
        <small className="text-muted">{timestamp}</small>
      </div>
    </div>
  );
};

export const ChatWindow: React.FC = () => {
  const { chatState } = useContext(ChatContext);
  const {
    auth: { uid },
  } = useContext(AuthContext);

  console.log("chatState", chatState);

  return (
    <div className="bg-dark p-4 overflow-auto h-auto">
    {
      chatState.mensajes.map((msg:any) => (
        <ChatMessage
          key={msg._id}
          message={msg.message}
          sender={msg.to === uid ? "user" : "other"}
          timestamp={msg.createdAt}
        />
      ))
    }


    </div>
  );
};

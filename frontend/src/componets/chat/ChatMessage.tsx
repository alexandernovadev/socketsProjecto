import React from "react";

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
          sender === "user" ? "bg-primary text-white" : "bg-info-subtle text-white"
        }`}
      >
        <p className="mb-0">{message}</p>
        <small className="text-muted">{timestamp}</small>
      </div>
    </div>
  );
};

export const ChatWindow: React.FC = () => {
  return (
    <div className="bg-dark p-4 overflow-auto" style={{ height: "87vh" }}>
      <ChatMessage
        message="Test which is a new approach to have all solutions"
        sender="other"
        timestamp="11:01 AM | June 9"
      />
      <ChatMessage
        message="Test which is a new approach to have all solutions"
        sender="user"
        timestamp="11:01 AM | June 9"
      />

      
      {/* Puedes repetir este ChatMessage para más mensajes */}
    </div>
  );
};

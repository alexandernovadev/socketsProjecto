import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/chat/ChatContext";
import { SocketContext } from "../../context/SocketContext";
import { AuthContext } from "../../context/AuthContext";

export const MessageInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const { chatState } = useContext(ChatContext);
  const { socket } = useContext(SocketContext);
  const {
    auth: { uid },
  } = useContext(AuthContext);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.length === 0) return;

    console.log("==> ", message);
    setMessage("");

    socket?.emit("mensaje-personal", {
      from: uid,
      to: chatState.chatActivo?.id,
      message,
    });
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="d-flex p-3 bg-dark border-top border-secondary"
    >
      <input
        type="text"
        className="form-control me-2 bg-dark text-white"
        placeholder="Mensaje..."
        value={message}
        onChange={({ target }) => setMessage(target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Enviar
      </button>
    </form>
  );
};

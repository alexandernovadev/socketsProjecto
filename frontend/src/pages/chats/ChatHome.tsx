import React from "react";
import { TopBar } from "../../componets/chat/TopBar";
import { ChatList } from "../../componets/chat/ChatListItem";
import { ChatWindow } from "../../componets/chat/ChatMessage";
import { MessageInput } from "../../componets/chat/MessageInput";

export const ChatHome: React.FC = () => {
  // remove scroll bar from body just in this page with useEffect
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-md-row">
      {/* Lista de Chats a la izquierda, se hará que ocupe el 100% en pantallas pequeñas */}
      <div
        className="col-12 col-md-3 p-0 border-end border-secondary"
        style={{ height: "100vh" }}
      >
        <TopBar />
        <ChatList />
      </div>

      {/* Ventana de Chat a la derecha */}
      <div
        className="col-12 col-md-9 d-flex flex-column p-0"
        style={{ height: "100vh" }}
      >
        <ChatWindow />
        <MessageInput />
      </div>
    </div>
  );
};

import React, { useContext, useEffect } from "react";
import { TopBar } from "../../componets/chat/TopBar";
import { ChatWindow } from "../../componets/chat/ChatMessage";
import { MessageInput } from "../../componets/chat/MessageInput";
import { ChatContext } from "../../context/chat/ChatContext";
import { ChatSelect } from "../../componets/chat/ChatSelect";
import { ChatList } from "../../componets/chat/ChatList";

export const ChatHome: React.FC = () => {
  const { chatState } = useContext(ChatContext);

  // remove scroll bar from body just in this page with useEffect
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-md-row">
      <div
        className="col-12 col-md-3 p-0 border-end border-secondary"
        style={{ height: "100vh" }}
      >
        <TopBar />
        <ChatList />
      </div>

      <div
        className="col-12 col-md-9 d-flex flex-column p-0"
        style={{ height: "100vh" }}
      >
        {chatState.chatActivo ? (
          <>
            <ChatWindow />
            <MessageInput />
          </>
        ) : (
          <ChatSelect />
        )}
      </div>
    </div>
  );
};

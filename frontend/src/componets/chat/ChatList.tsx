import { useContext } from "react";
import { ChatListItem } from "./ChatListItem";
import { ChatContext } from "../../context/chat/ChatContext";

export const ChatList: React.FC = () => {
  const { chatState } = useContext(ChatContext);

  

  return (
    <div
      className="bg-dark text-white overflow-auto"
      style={{ height: "100vh" }}
    >
      {chatState?.usuarios?.map((usuario) => (
        <ChatListItem
          key={usuario.id}
          name={usuario.name}
          email={usuario.email}
          online={usuario.online}
          id={usuario.id}
          surname={usuario.surname}
        />
      ))}
    </div>
  );
};

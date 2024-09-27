import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/chat/ChatContext";
import { types } from "../../types/types";

interface ChatListItemProps {
  email: string;
  id: string;
  name: string;
  online: string;
  surname: string;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  email,
  name,
  online,
  surname,
  id,
}) => {
  const { auth } = useContext(AuthContext);
  const { chatState, dispatch } = useContext(ChatContext);
  const { chatActivo } = chatState;

  const handleChat = () => {
    dispatch({
      type: types.activarChat,
      payload: {
        name,
        surname,
        email,
        id,
      },
    });
  };

  return (
    <div
      onClick={handleChat}
      className={`d-flex justify-content-between align-items-center p-2 border-bottom border-secondary cursor-pointer ${
        chatActivo?.id === id && "bg-active"
      }`}
    >
      <div className="d-flex align-items-center">
        <img
          className="rounded-circle me-2"
          width="50"
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}-${surname}`}
        />
        <div>
          <h6 className="mb-0">
            {auth.name === name ? "Yo" : `${name} ${surname}`}{" "}
          </h6>
          <small className={online ? "text-success" : "text-danger"}>
            {online ? "Online" : "Offline"}
          </small>
          <p className="mb-0 text-muted">{email}</p>
        </div>
      </div>
      {/* <small className="text-muted">{date}</small> */}
    </div>
  );
};

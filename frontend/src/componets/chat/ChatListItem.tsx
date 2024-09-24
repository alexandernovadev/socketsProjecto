import React from "react";

interface ChatListItemProps {
  name: string;
  messagePreview: string;
  status: string;
  date: string;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  messagePreview,
  status,
  date,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center p-2 border-bottom border-secondary">
      <div className="d-flex align-items-center">
        <img
          src="https://via.placeholder.com/50"
          alt="Avatar"
          className="rounded-circle me-3"
          width="50"
          height="50"
        />
        <div>
          <h6 className="mb-0">{name}</h6>
          <small
            className={status === "Online" ? "text-success" : "text-muted"}
          >
            {status}
          </small>
          <p className="mb-0 text-muted">{messagePreview}</p>
        </div>
      </div>
      <small className="text-muted">{date}</small>
    </div>
  );
};

export const ChatList: React.FC = () => {
  return (
    <div
      className="bg-dark text-white overflow-auto"
      style={{ height: "100vh" }}
    >
      <ChatListItem
        name="Sunil Rajput"
        messagePreview="Test, which is a new approach to have all solutions..."
        status="Online"
        date="Dec 25"
      />
      {/* Puedes repetir este ChatListItem para otras conversaciones */}
    </div>
  );
};

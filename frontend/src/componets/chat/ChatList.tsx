import { ChatListItem } from "./ChatListItem";

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

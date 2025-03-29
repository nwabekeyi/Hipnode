// src/components/Layout.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import SidebarLeft from "./sidebarLeft";
import SidebarRight from "./sidebarRight";
import MainContent from "./mainContent";
import { ThemeContext } from "../../context/themeContext"; // Adjust path
import { useMessaging } from "../../context/messageContext"; // Adjust path
import UsersModal from "../../Components/UsersModal"; // Adjust path
import MessageModal from "../../Components/MessageModal"; // Adjust path

const Layout = () => {
  const { themeColors } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { messages, onlineUsers } = useMessaging();
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const lastViewedTimestamps = useRef({});

  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const userId = parsedUser?._id || null;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  // Update notifications based on incoming messages
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      const lastViewed =
        lastViewedTimestamps.current[latestMessage.fromUserId] || "0";
      if (
        latestMessage.fromUserId !== userId &&
        (!isMessageModalOpen ||
          (selectedChat && latestMessage.fromUserId !== selectedChat.id)) &&
        new Date(latestMessage.timestamp) > new Date(lastViewed)
      ) {
        setNotifications((prev) => {
          const existingNotif = prev.find(
            (notif) => notif.fromUserId === latestMessage.fromUserId,
          );
          if (existingNotif) {
            return prev.map((notif) =>
              notif.fromUserId === latestMessage.fromUserId
                ? { ...notif, count: notif.count + 1 }
                : notif,
            );
          } else {
            return [
              ...prev,
              {
                fromUserId: latestMessage.fromUserId,
                message: latestMessage.message,
                timestamp: latestMessage.timestamp,
                count: 1,
              },
            ];
          }
        });
      }
    }
  }, [messages, userId, isMessageModalOpen, selectedChat]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setIsUsersModalOpen(false);
    setIsMessageModalOpen(true);
    // Update last viewed timestamp when opening a chat
    const latestMessage = messages
      .filter((msg) => msg.fromUserId === chat.id || msg.toUserId === chat.id)
      .slice(-1)[0];
    if (latestMessage) {
      lastViewedTimestamps.current[chat.id] = latestMessage.timestamp;
      setNotifications((prev) =>
        prev.filter((notif) => notif.fromUserId !== chat.id),
      );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textColor,
      }}
    >
      <Header onEnvelopeClick={() => setIsUsersModalOpen(true)} />
      <div className="flex mt-[60px] flex-1">
        <SidebarLeft />
        <MainContent />
        <SidebarRight />
      </div>

      <UsersModal
        isOpen={isUsersModalOpen}
        onClose={() => setIsUsersModalOpen(false)}
        userId={userId}
        onSelectChat={handleSelectChat}
        notifications={notifications}
        onlineUsers={onlineUsers}
      />

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        userId={userId}
        selectedChat={selectedChat}
      />
    </div>
  );
};

export default Layout;

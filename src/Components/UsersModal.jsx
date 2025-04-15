import React, { useState, useEffect } from "react";
import Modal from "./modal"; // Adjust path
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext"; // Adjust path to your ThemeContext

const UsersModal = ({
  isOpen,
  onClose,
  userId,
  onSelectChat,
  notifications,
  onlineUsers,
}) => {
  const { theme, themeColors } = useContext(ThemeContext); // Access theme and themeColors
  const [recentChats, setRecentChats] = useState(() => {
    const saved = localStorage.getItem("recentChats");
    return saved ? JSON.parse(saved) : [];
  });

  console.log("Recent Chats:", setRecentChats);

  useEffect(() => {
    localStorage.setItem("recentChats", JSON.stringify(recentChats));
  }, [recentChats]);

  if (!isOpen) return null;

  const truncateMessage = (message) => {
    if (!message) return "No messages yet";
    return message.length > 7 ? `${message.slice(0, 7)}...` : message;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      height="60%"
      position="top-right"
      size="sm"
    >
      <div
        className="h-full flex flex-col"
        style={{
          backgroundColor: themeColors.background,
          color: themeColors.textColor,
        }}
      >
        <h2
          className="text-xl text-left font-semibold mb-4"
          style={{ color: themeColors.textColor }}
        >
          Messages
        </h2>
        {onlineUsers.length > 0 && (
          <div className="mb-4">
            <h3
              className="text-lg text-left font-normal mb-2"
              style={{ color: themeColors.textColor }}
            >
              Online Users
            </h3>
            <div className="flex gap-4 overflow-x-auto">
              {onlineUsers
                .filter((user) => user.id !== userId)
                .map((user) => {
                  const unreadCount =
                    notifications.find((notif) => notif.fromUserId === user.id)
                      ?.count || 0;
                  console.log("Unread Count:", unreadCount);
                  return (
                    <div
                      key={user.id}
                      onClick={() =>
                        onSelectChat({
                          id: user.id,
                          name: user.username || `User ${user.id}`,
                        })
                      }
                      className="flex flex-col items-center p-2 cursor-pointer hover:bg-gray-100 shrink-0"
                      style={{
                        backgroundColor:
                          theme === "dark" && "hover" ? "#2c353d" : undefined, // Dark hover effect
                      }}
                    >
                      <div className="relative">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: themeColors.darkOrangeColor,
                          }}
                        >
                          <span className="text-white font-semibold">
                            {user.username
                              ? user.username[0].toUpperCase()
                              : user.id[0].toUpperCase()}
                          </span>
                        </div>
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                      </div>
                      <span
                        className="mt-1 text-sm font-semibold text-center"
                        style={{ color: themeColors.textColor }}
                      >
                        {user.username || `User ${user.id}`}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {recentChats.length > 0 && (
          <div>
            <h3
              className="text-lg text-left font-normal mb-2"
              style={{ color: themeColors.textColor }}
            >
              Recent Chats
            </h3>
            <div className="flex flex-col gap-2">
              {recentChats.map((chat) => {
                const unreadCount =
                  notifications.find((notif) => notif.fromUserId === chat.id)
                    ?.count || 0;
                const isOnline = onlineUsers.some((u) => u.id === chat.id);
                return (
                  <div
                    key={chat.id}
                    onClick={() =>
                      onSelectChat({ id: chat.id, name: chat.name })
                    }
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100 relative"
                    style={{
                      backgroundColor:
                        theme === "dark" && "hover" ? "#2c353d" : undefined, // Dark hover effect
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center relative"
                      style={{ backgroundColor: themeColors.darkOrangeColor }}
                    >
                      <span className="text-white font-semibold">
                        {chat.name[0].toUpperCase()}
                      </span>
                      {isOnline && (
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                      )}
                    </div>
                    <div className="ml-2 flex-1">
                      <h3
                        className="text-sm text-left font-semibold"
                        style={{ color: themeColors.textColor }}
                      >
                        {chat.name}
                      </h3>
                      <p
                        className="text-xs text-left italic"
                        style={{
                          color:
                            theme === "dark"
                              ? themeColors.placeholderSecondary
                              : themeColors.labelText,
                        }}
                      >
                        {truncateMessage(chat.lastMessage)}
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <span
                        className="w-5 h-5 text-white text-xs flex items-center justify-center rounded-full"
                        style={{ backgroundColor: themeColors.darkOrangeColor }}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {recentChats.length === 0 && onlineUsers.length === 0 && (
          <p style={{ color: themeColors.placeholderSecondary }}>
            No recent chats or users online
          </p>
        )}
      </div>
    </Modal>
  );
};

export default UsersModal;

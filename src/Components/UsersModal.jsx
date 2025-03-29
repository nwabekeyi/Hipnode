// src/components/UsersModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "./modal"; // Adjust path

const UsersModal = ({
  isOpen,
  onClose,
  userId,
  onSelectChat,
  notifications,
  onlineUsers,
}) => {
  const [recentChats, setRecentChats] = useState(() => {
    const saved = localStorage.getItem("recentChats");
    return saved ? JSON.parse(saved) : [];
  });

  console.log(setRecentChats);

  useEffect(() => {
    localStorage.setItem("recentChats", JSON.stringify(recentChats));
  }, [recentChats]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      height="60%"
      position="top-right"
      size="sm"
    >
      <div className="h-full flex flex-col">
        <h2 className="text-xl text-left font-semibold mb-4">Messages</h2>
        {onlineUsers.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg text-left font-normal mb-2">Online Users</h3>
            <div className="flex gap-4 overflow-x-auto">
              {onlineUsers
                .filter((user) => user.id !== userId)
                .map((user) => {
                  const unreadCount =
                    notifications.find((notif) => notif.fromUserId === user.id)
                      ?.count || 0;
                  console.log(unreadCount);
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
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.username
                              ? user.username[0].toUpperCase()
                              : user.id[0].toUpperCase()}
                          </span>
                        </div>
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                      </div>
                      <span className="mt-1 text-sm font-semibold text-center">
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
            <h3 className="text-lg text-left font-normal mb-2">Recent Chats</h3>
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
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center relative">
                      <span className="text-white font-semibold">
                        {chat.name[0].toUpperCase()}
                      </span>
                      {isOnline && (
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                      )}
                    </div>
                    <div className="ml-2 flex-1">
                      <h3 className="text-sm text-left font-semibold">
                        {chat.name}
                      </h3>
                      <p className="text-xs text-left italic text-gray-600 truncate">
                        {chat.lastMessage || "No messages yet"}
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <span className="w-5 h-5 bg-orange-600 text-white text-xs flex items-center justify-center rounded-full">
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
          <p className="text-gray-500">No recent chats or users online</p>
        )}
      </div>
    </Modal>
  );
};

export default UsersModal;

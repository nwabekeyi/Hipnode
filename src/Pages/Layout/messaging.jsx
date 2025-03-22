import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/modal";
import { useMessaging } from "../../context/messageContext";

const ChatPage = () => {
  const navigate = useNavigate();

  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const userId = parsedUser?._id || null;

  console.log("User ID:", userId);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  const {
    messages,
    sendMessage,
    onlineUsers,
    setMessages,
    typingUsers,
    sendTyping,
  } = useMessaging();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]); // Store notifications with counts
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const openChatModal = async (chat) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${userId}/${chat.id}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }

      const chatHistory = await response.json();
      console.log("Chat history loaded:", chatHistory);
      setMessages((prev) => {
        const existingIds = new Set(prev.map((msg) => msg._id).filter(Boolean));
        const newMessages = chatHistory.filter(
          (msg) => !existingIds.has(msg._id),
        );
        return [...prev, ...newMessages];
      });
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setError("Failed to load chat history. Please try again.");
    } finally {
      setIsLoading(false);
    }

    // Clear notifications for this user when chat is opened
    setNotifications((prev) =>
      prev.filter((notif) => notif.fromUserId !== chat.id),
    );
  };

  const closeChatModal = () => {
    setSelectedChat(null);
    setIsModalOpen(false);
  };

  const handleSendMessage = (message) => {
    if (selectedChat && message.trim()) {
      const messageData = {
        type: "message",
        fromUserId: userId,
        toUserId: selectedChat.id,
        message,
        timestamp: new Date().toISOString(),
      };

      console.log("Sending message:", messageData);
      setMessages((prev) => [...prev, messageData]);
      sendMessage(messageData);
    }
  };

  const handleTyping = () => {
    if (selectedChat) {
      sendTyping(selectedChat.id, true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        sendTyping(selectedChat.id, false);
      }, 1000);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (isModalOpen && messagesEndRef.current && !isLoading && !error) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isModalOpen, isLoading, error]);

  // Listen for new messages and accumulate notifications
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      console.log("Latest message in state:", latestMessage);

      if (latestMessage.fromUserId !== userId) {
        if (
          !isModalOpen ||
          (selectedChat && latestMessage.fromUserId !== selectedChat.id)
        ) {
          setNotifications((prev) => {
            const existingNotif = prev.find(
              (notif) => notif.fromUserId === latestMessage.fromUserId,
            );
            if (existingNotif) {
              // Increment count for existing sender
              return prev.map((notif) =>
                notif.fromUserId === latestMessage.fromUserId
                  ? { ...notif, count: notif.count + 1 }
                  : notif,
              );
            } else {
              // Add new notification with count 1
              const newNotification = {
                fromUserId: latestMessage.fromUserId,
                message: latestMessage.message,
                timestamp: latestMessage.timestamp,
                id: Date.now(),
                count: 1, // Start with 1 unread message
              };
              console.log("New notification added:", newNotification);

              // Auto-hide popup after 3 seconds
              setTimeout(() => {
                setNotifications((current) =>
                  current.map((notif) =>
                    notif.id === newNotification.id
                      ? { ...notif, hidden: true } // Mark as hidden but keep count
                      : notif,
                  ),
                );
              }, 3000);

              return [...prev, newNotification];
            }
          });
        }
      }
    }
  }, [messages, userId, isModalOpen, selectedChat]);

  // Clear notification when opening the relevant chat
  const handleOpenChatFromNotification = (chatId) => {
    openChatModal({ id: chatId, name: `User ${chatId}` });
    setNotifications((prev) =>
      prev.filter((notif) => notif.fromUserId !== chatId),
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      {/* Online Users List */}
      <div className="w-1/4 bg-white rounded-lg shadow-md p-4 overflow-y-auto relative">
        <h2 className="text-xl font-bold mb-4">Online Users</h2>
        {onlineUsers.length > 0 ? (
          onlineUsers
            .filter((id) => id !== userId)
            .map((id) => {
              const unreadCount =
                notifications.find((notif) => notif.fromUserId === id)?.count ||
                0;
              return (
                <div
                  key={id}
                  onClick={() => openChatModal({ id, name: `User ${id}` })}
                  className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer relative"
                >
                  <h3 className="font-semibold">User {id}</h3>
                  <p className="text-sm text-gray-600">Tap to chat</p>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
              );
            })
        ) : (
          <p className="text-gray-500">No users online</p>
        )}
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="absolute top-4 right-4 z-10">
          {notifications
            .filter((notif) => !notif.hidden) // Only show non-hidden notifications
            .map((notif) => (
              <div
                key={notif.id}
                className="bg-white p-2 mb-2 rounded-lg shadow-md cursor-pointer"
                onClick={() => handleOpenChatFromNotification(notif.fromUserId)}
              >
                <p className="text-sm">
                  `New message from User {notif.fromUserId}: ${notif.message}`
                </p>
                <small className="text-xs text-gray-400">
                  {new Date(notif.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))}
        </div>
      )}

      {/* Modal for Chat */}
      <Modal isOpen={isModalOpen} onClose={closeChatModal} size="lg">
        {selectedChat && (
          <div className="h-full flex flex-col">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-bold">{selectedChat.name}</h2>
            </div>

            {isLoading && (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading chat history...</p>
              </div>
            )}

            {error && (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {!isLoading && !error && (
              <>
                <div
                  ref={messagesEndRef}
                  className="flex-1 overflow-y-auto mb-4"
                >
                  {messages
                    .filter(
                      (msg) =>
                        (msg.fromUserId === userId &&
                          msg.toUserId === selectedChat.id) ||
                        msg.fromUserId === selectedChat.id,
                    )
                    .map((msg, index) => (
                      <div
                        key={msg._id || index}
                        className={`flex ${
                          msg.fromUserId === userId
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.fromUserId === userId
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          <p>{msg.message}</p>
                          <small className="text-xs text-gray-400 block mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </small>
                        </div>
                      </div>
                    ))}
                </div>
                {typingUsers.has(selectedChat.id) && (
                  <div className="text-sm text-gray-500 mb-2">
                    {selectedChat.name} is typing...
                  </div>
                )}
              </>
            )}

            <div className="border-t pt-4 flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg"
                onKeyPress={(e) => {
                  handleTyping(e);
                  if (e.key === "Enter" && e.target.value.trim()) {
                    handleSendMessage(e.target.value);
                    e.target.value = "";
                    sendTyping(selectedChat.id, false);
                  }
                }}
                onKeyUp={(e) => {
                  if (!e.target.value.trim()) {
                    sendTyping(selectedChat.id, false);
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector("input");
                  if (input && input.value.trim()) {
                    handleSendMessage(input.value);
                    input.value = "";
                    sendTyping(selectedChat.id, false);
                  }
                }}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ChatPage;

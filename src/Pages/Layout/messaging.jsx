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
  const [notifications, setNotifications] = useState([]);
  const [recentChats, setRecentChats] = useState(() => {
    const saved = localStorage.getItem("recentChats");
    return saved ? JSON.parse(saved) : [];
  });
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const lastViewedTimestamps = useRef({});

  // Persist recentChats to localStorage
  useEffect(() => {
    localStorage.setItem("recentChats", JSON.stringify(recentChats));
  }, [recentChats]);

  const openChatModal = async (chat) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
    setIsLoading(true);
    setError(null);

    // Add or update recent chats
    setRecentChats((prev) => {
      const exists = prev.some((c) => c.id === chat.id);
      if (!exists) {
        return [...prev, { id: chat.id, name: chat.name, lastMessage: "" }];
      }
      return prev;
    });

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

      const latestMessage = chatHistory[chatHistory.length - 1];
      if (latestMessage) {
        lastViewedTimestamps.current[chat.id] = latestMessage.timestamp;
        setRecentChats((prev) =>
          prev.map((c) =>
            c.id === chat.id ? { ...c, lastMessage: latestMessage.message } : c,
          ),
        );
      }

      setNotifications((prev) => {
        const updated = prev.filter((notif) => notif.fromUserId !== chat.id);
        console.log("Notifications after opening chat:", updated);
        return updated;
      });
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setError("Failed to load chat history. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeChatModal = () => {
    if (selectedChat) {
      setNotifications((prev) => {
        const updated = prev.filter(
          (notif) => notif.fromUserId !== selectedChat.id,
        );
        console.log("Notifications after closing modal:", updated);
        return updated;
      });
    }
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

      // Update recentChats with the latest message
      setRecentChats((prev) =>
        prev.map((c) =>
          c.id === selectedChat.id ? { ...c, lastMessage: message } : c,
        ),
      );
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

  useEffect(() => {
    if (isModalOpen && messagesEndRef.current && !isLoading && !error) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isModalOpen, isLoading, error]);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      console.log("Latest message in state:", latestMessage);

      const lastViewed =
        lastViewedTimestamps.current[latestMessage.fromUserId] || "0";
      if (
        latestMessage.fromUserId !== userId &&
        (!isModalOpen ||
          (selectedChat && latestMessage.fromUserId !== selectedChat.id)) &&
        new Date(latestMessage.timestamp) > new Date(lastViewed)
      ) {
        setNotifications((prev) => {
          const existingNotif = prev.find(
            (notif) => notif.fromUserId === latestMessage.fromUserId,
          );
          if (existingNotif) {
            const updated = prev.map((notif) =>
              notif.fromUserId === latestMessage.fromUserId
                ? { ...notif, count: notif.count + 1 }
                : notif,
            );
            console.log("Updated notifications (increment):", updated);
            return updated;
          } else {
            const newNotification = {
              fromUserId: latestMessage.fromUserId,
              message: latestMessage.message,
              timestamp: latestMessage.timestamp,
              id: Date.now(),
              count: 1,
            };
            console.log("New notification added:", newNotification);

            setTimeout(() => {
              setNotifications((current) =>
                current.map((notif) =>
                  notif.id === newNotification.id
                    ? { ...notif, hidden: true }
                    : notif,
                ),
              );
            }, 5000);

            const updated = [...prev, newNotification];
            console.log("Updated notifications (new):", updated);
            return updated;
          }
        });

        // Update recentChats with incoming message
        setRecentChats((prev) =>
          prev.map((c) =>
            c.id === latestMessage.fromUserId
              ? { ...c, lastMessage: latestMessage.message }
              : c,
          ),
        );
      }
    }
  }, [messages, userId, isModalOpen, selectedChat]);

  const handleOpenChatFromNotification = (chatId) => {
    const user = onlineUsers.find((u) => u.id === chatId);
    openChatModal({ id: chatId, name: user?.username || `User ${chatId}` });
  };

  useEffect(() => {
    console.log("Current notifications state:", notifications);
  }, [notifications]);

  return (
    <div className="flex justify-end h-screen bg-gray-100 p-4">
      {/* Online Users and Recent Chats List */}
      <div
        className="w-1/5 h-[350px] bg-white rounded-lg p-2 overflow-x-auto relative"
        style={{ position: "absolute", top: "70px", right: "100px" }}
      >
        <h2 className="text-xl text-left font-semibold text[small] mb-1">
          Messages
        </h2>

        {/* Online Users */}
        {onlineUsers.length > 0 && (
          <div className="mb-2  h-25">
            <h3 className="text-lg text-left font-normal mb-2">Online Users</h3>
            <div className="flex flex-row gap-4 p-0">
              {onlineUsers
                .filter((user) => user.id !== userId)
                .map((user) => {
                  // const unreadCount = notifications.find((notif) => notif.fromUserId === user.id)?.count || 0;
                  return (
                    <div
                      key={user.id}
                      onClick={() =>
                        openChatModal({
                          id: user.id,
                          name: user.username || `User ${user.id}`,
                        })
                      }
                      className="flex flex-col items-center w-auto h-auto p-0 rounded-full cursor-pointer relative hover:opacity-80 shrink-0"
                    >
                      <div className="w-10 h-10 bg-orange-600 flex rounded-full items-center justify-center relative">
                        <span className="text-white flex justify-center items-center font-semibold">
                          {user.username
                            ? user.username[0].toUpperCase()
                            : user.id[0].toUpperCase()}
                        </span>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                      </div>
                      <h3 className="text-sm font-semibold text-black">
                        {user.username || `User ${user.id}`}
                      </h3>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Recent Chats */}
        {recentChats.length > 0 && (
          <div>
            <h3 className="text-lg text-left font-normal mb-2">Recent Chats</h3>
            <div className="flex flex-row gap-4">
              {recentChats.map((chat) => {
                const unreadCount =
                  notifications.find((notif) => notif.fromUserId === chat.id)
                    ?.count || 0;
                const isOnline = onlineUsers.some((u) => u.id === chat.id);
                return (
                  <div
                    key={chat.id}
                    onClick={() =>
                      openChatModal({ id: chat.id, name: chat.name })
                    }
                    className="flex items-center w-full p-2 cursor-pointer relative hover:opacity-80 shrink-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center relative">
                      <span className="text-white font-semibold">
                        {chat.name[0].toUpperCase()}
                      </span>
                      {isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <span className="absolute right-0 w-5 h-5 bg-orange-600 text-white text-xs flex items-center justify-center rounded-full">
                        {unreadCount}
                      </span>
                    )}
                    <div className="ml-2">
                      <h3 className="text-sm text-left font-semibold">
                        {chat.name}
                      </h3>
                      <p className="text-xs text-left text-gray-600 truncate max-w-[100px]">
                        {chat.lastMessage || "No messages yet"}
                      </p>
                    </div>
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

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="absolute top-4 right-4 z-10">
          {notifications
            .filter((notif) => !notif.hidden)
            .map((notif) => {
              const user = onlineUsers.find((u) => u.id === notif.fromUserId);
              return (
                <div
                  key={notif.id}
                  className="bg-white p-2 mb-2 rounded-lg shadow-md cursor-pointer"
                  onClick={() =>
                    handleOpenChatFromNotification(notif.fromUserId)
                  }
                >
                  <p className="text-sm">
                    New message from{" "}
                    {user?.username || `User ${notif.fromUserId}`}: `&#34;`
                    {notif.message}`&#34;`
                  </p>
                  <small className="text-xs text-gray-400">
                    {new Date(notif.timestamp).toLocaleTimeString()}
                  </small>
                </div>
              );
            })}
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
                          className={`max-w-[70%] p-3 mb-2 mx-2 rounded-lg ${
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

import React, { useState, useEffect, useRef } from "react";
import Modal from "./modal"; // Adjust path
import { useMessaging } from "../context/messageContext"; // Adjust path
import { IoSendSharp } from "react-icons/io5";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext"; // Adjust path to your ThemeContext

const MessageModal = ({ isOpen, onClose, userId, selectedChat }) => {
  const { theme, themeColors } = useContext(ThemeContext); // Access theme and themeColors
  const {
    messages,
    sendMessage,
    setMessages,
    typingUsers,
    sendTyping,
    onlineUsers,
    lastSeen,
  } = useMessaging();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentChats, setRecentChats] = useState(() => {
    const saved = localStorage.getItem("recentChats");
    return saved ? JSON.parse(saved) : [];
  });
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  // Get current user's username from sessionStorage
  const userInfo = JSON.parse(sessionStorage.getItem("user") || "{}");
  const currentUserName = userInfo.username || "User"; // Fallback to "User" if username not found

  useEffect(() => {
    localStorage.setItem("recentChats", JSON.stringify(recentChats));
  }, [recentChats]);

  useEffect(() => {
    if (isOpen && selectedChat) {
      const fetchChatHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://localhost:5000/api/messages/${userId}/${selectedChat.id}`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch chat history");
          }
          const chatHistory = await response.json();
          setMessages((prev) => {
            const existingIds = new Set(
              prev.map((msg) => msg._id).filter(Boolean),
            );
            const newMessages = chatHistory.filter(
              (msg) => !existingIds.has(msg._id),
            );
            return [...prev, ...newMessages];
          });

          const latestMessage = chatHistory[chatHistory.length - 1];
          if (latestMessage) {
            setRecentChats((prev) =>
              prev.some((c) => c.id === selectedChat.id)
                ? prev.map((c) =>
                    c.id === selectedChat.id
                      ? { ...c, lastMessage: latestMessage.message }
                      : c,
                  )
                : [
                    ...prev,
                    {
                      id: selectedChat.id,
                      name: selectedChat.name,
                      lastMessage: latestMessage.message,
                    },
                  ],
            );
          }
        } catch (error) {
          console.error("Error fetching chat history:", error);
          setError("Failed to load chat history. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchChatHistory();
    }
  }, [isOpen, selectedChat, userId, setMessages]);

  const handleSendMessage = (message) => {
    if (selectedChat && message.trim()) {
      const messageData = {
        type: "message",
        fromUserId: userId,
        toUserId: selectedChat.id,
        message,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageData]);
      sendMessage(messageData);
      setRecentChats((prev) =>
        prev.some((c) => c.id === selectedChat.id)
          ? prev.map((c) =>
              c.id === selectedChat.id ? { ...c, lastMessage: message } : c,
            )
          : [
              ...prev,
              {
                id: selectedChat.id,
                name: selectedChat.name,
                lastMessage: message,
              },
            ],
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
    if (isOpen && messagesEndRef.current && !isLoading && !error) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen, isLoading, error]);

  if (!isOpen || !selectedChat) return null;

  const isUserOnline = onlineUsers.some((user) => user.id === selectedChat.id);
  const lastSeenTime = lastSeen[selectedChat.id]
    ? new Date(lastSeen[selectedChat.id]).toLocaleTimeString()
    : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      height="60%"
      position="bottom-right"
      size="md"
    >
      <div className="h-full flex flex-col">
        <div className="border-b pb-4 mb-4 flex items-start">
          <div className="flex flex-col items-center mr-2">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center relative">
              <span className="text-white font-semibold">
                {selectedChat.name[0].toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-xl text-left font-bold">{selectedChat.name}</h2>
            <span className="text-[10px] text-green-500">
              {isUserOnline
                ? "Online"
                : lastSeenTime
                  ? `Last seen: ${lastSeenTime}`
                  : "Offline"}
            </span>
          </div>
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
            <div ref={messagesEndRef} className="flex-1 overflow-y-scroll mb-1">
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
                    className={`flex items-start ${
                      msg.fromUserId === userId
                        ? "justify-end"
                        : "justify-start"
                    } mb-2`}
                  >
                    {/* Incoming Message Avatar (Left) */}
                    {msg.fromUserId !== userId && (
                      <div className="mr-2">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {selectedChat.name[0].toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Message Content */}
                    <div
                      className={`py-1 px-2 rounded-tl-lg rounded-bl-lg rounded-br-lg ${
                        msg.fromUserId === userId
                          ? "bg-orange-600 text-white text-right"
                          : "bg-orange-100 text-orange-600 text-left rounded-tr-lg"
                      }`}
                      style={{
                        width: "10ch",
                        height: "auto",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      <p>{msg.message}</p>
                      <small className="text-xs text-right text-[10px] text-gray-400 block mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </small>
                    </div>

                    {/* Outgoing Message Avatar (Right) */}
                    {msg.fromUserId === userId && (
                      <div className="ml-2">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {currentUserName[0].toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
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

        <div className="w-full pt-2 flex">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            style={{
              backgroundColor:
                theme === "dark"
                  ? themeColors.inputBg
                  : themeColors.inputBgPrimary,
              color: themeColors.textColor,
              borderColor: themeColors.placeholderColor,
            }}
            onKeyPress={(e) => {
              handleTyping();
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
              if (inputRef.current && inputRef.current.value.trim()) {
                handleSendMessage(inputRef.current.value);
                inputRef.current.value = "";
                sendTyping(selectedChat.id, false);
              }
            }}
            className="ml-2 px-2 py-2 text-black rounded-lg"
          >
            <IoSendSharp />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MessageModal;

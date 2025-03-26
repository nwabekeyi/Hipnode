import React, { createContext, useState, useEffect, useRef } from "react";

const MessagingContext = createContext();

export const MessagingProvider = ({ children, userId }) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const ws = useRef(null);
  const reconnectInterval = useRef(null);

  const connectWebSocket = (url) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) return;

    console.log("Connecting to WebSocket:", url);
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
      clearInterval(reconnectInterval.current);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 New message received:", data);
        switch (data.type) {
          case "message":
            setMessages((prev) => {
              const updated = [...prev, data];
              console.log("Messages state updated:", updated);
              return updated;
            });
            break;
          case "onlineUsers":
            console.log("👥 Online users updated:", data.data);
            setOnlineUsers(data.data);
            break;
          case "typing":
            console.log("✍️ Typing event:", data);
            setTypingUsers((prev) => {
              const newSet = new Set(prev);
              if (data.isTyping) newSet.add(data.fromUserId);
              else newSet.delete(data.fromUserId);
              return newSet;
            });
            break;
          default:
            console.warn("⚠️ Unknown message type:", data);
        }
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = (error) => console.error("❌ WebSocket error:", error);

    ws.current.onclose = () => {
      console.log("🔌 WebSocket disconnected, retrying...");
      if (!reconnectInterval.current) {
        reconnectInterval.current = setInterval(
          () => connectWebSocket(url),
          5000,
        );
      }
    };
  };

  const sendMessage = (messageData) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log("📤 Sending message:", messageData);
      ws.current.send(JSON.stringify(messageData));
    } else {
      console.warn("⚠️ WebSocket is not open. Cannot send message.");
    }
  };

  const sendTyping = (toUserId, isTyping) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const typingData = {
        type: "typing",
        fromUserId: userId,
        toUserId,
        isTyping,
      };
      console.log("📤 Sending typing event:", typingData);
      ws.current.send(JSON.stringify(typingData));
    }
  };

  useEffect(() => {
    if (userId) {
      const url = `ws://localhost:5000?userId=${userId}`;
      connectWebSocket(url);
    }
    return () => {
      if (ws.current) ws.current.close();
      clearInterval(reconnectInterval.current);
    };
  }, [userId]);

  return (
    <MessagingContext.Provider
      value={{
        messages,
        sendMessage,
        onlineUsers,
        setMessages,
        typingUsers,
        sendTyping,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => {
  const context = React.useContext(MessagingContext);
  if (!context)
    throw new Error("useMessaging must be used within a MessagingProvider");
  return context;
};

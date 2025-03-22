import { useEffect, useRef, useState } from "react";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsersData, setOnlineUsersData] = useState([]); // Store online users
  const ws = useRef(null);
  const reconnectInterval = useRef(null);

  const connectWebSocket = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      return; // Avoid duplicate connections
    }

    console.log("Connecting to WebSocket:", url);
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
      clearInterval(reconnectInterval.current);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "message":
            console.log("📩 New message received:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
            break;

          case "onlineUsers":
            console.log("👥 Online users updated:", data.users);
            setOnlineUsersData(data.users);
            break;

          default:
            console.warn("⚠️ Unknown message type:", data);
        }
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("🔌 WebSocket disconnected, retrying...");
      if (!reconnectInterval.current) {
        reconnectInterval.current = setInterval(connectWebSocket, 5000);
      }
    };
  };

  useEffect(() => {
    if (url) connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      clearInterval(reconnectInterval.current);
    };
  }, [url]);

  // Send a message function (expects an object)
  const sendMessage = (messageData) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log("📤 Sending message:", messageData);
      ws.current.send(JSON.stringify(messageData));
    } else {
      console.warn("⚠️ WebSocket is not open. Cannot send message.");
    }
  };

  return { messages, sendMessage, onlineUsersData };
};

export default useWebSocket;

import { useEffect, useRef, useState } from "react";

const useWebSocket = (url, userId) => {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    // Connect to WebSocket server
    ws.current = new WebSocket(url);

    // Authenticate the user once the connection is open
    ws.current.onopen = () => {
      console.log("WebSocket connected");
      ws.current.send(JSON.stringify({ type: "auth", userId }));
    };

    // Handle incoming messages
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    // Handle WebSocket errors
    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle WebSocket close
    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Cleanup on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url, userId]);

  // Function to send a message
  const sendMessage = (toUserId, message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "message",
          fromUserId: userId,
          toUserId,
          message,
        }),
      );
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;

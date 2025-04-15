import React, { useState, useEffect, useContext, useRef } from "react";
import useWebSocket from "../hooks/webSocket";
import Modal from "./modal";
import { ThemeContext } from "../context/themeContext";
import useApi from "../hooks/useApi";

const NotificationModal = ({ userId, isOpen, onClose }) => {
  const { themeColors } = useContext(ThemeContext);
  const [initialNotifications, setInitialNotifications] = useState([]);
  const { messages } = useWebSocket(
    userId ? `ws://localhost:5000?userId=${userId}` : null,
  );
  const { execute: fetchNotifications, error: fetchError } = useApi();
  const { execute: markAsRead } = useApi();
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  console.log(fetchError, "Fetch Error");
  useEffect(() => {
    if (!userId || hasFetched.current || !isOpen) return; // Only fetch when modal opens

    const fetchInitialNotifications = async () => {
      try {
        const data = await fetchNotifications(
          `https://hipnode-server.onrender.com/api/notifications/${userId}`,
          "GET",
          null,
          { requiresAuth: true },
        );
        console.log("Fetched initial notifications:", data);
        setInitialNotifications(Array.isArray(data) ? data : []);
        hasFetched.current = true;
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError(err.message);
      }
    };

    fetchInitialNotifications();
  }, [userId, fetchNotifications, isOpen]); // Add isOpen to dependency array

  const notificationMessages = messages
    .filter((msg) => msg.type === "message" && msg.toUserId === userId)
    .map((msg) => {
      const timestamp = msg.timestamp
        ? new Date(msg.timestamp).toISOString()
        : new Date().toISOString();
      console.log(
        "WebSocket message timestamp:",
        msg.timestamp,
        "Mapped to:",
        timestamp,
      );
      return {
        _id: msg._id || `${msg.fromUserId}-${timestamp}`,
        message: msg.message || "No message",
        timestamp,
        read: msg.read || false,
      };
    });

  const allNotifications = [
    ...new Map(
      [
        ...(Array.isArray(initialNotifications) ? initialNotifications : []),
        ...(Array.isArray(notificationMessages) ? notificationMessages : []),
      ].map((n) => [n._id, n]),
    ).values(),
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  useEffect(() => {
    console.log("All notifications:", allNotifications);
    const hasNewUnread = notificationMessages.some((n) => !n.read);
    if (hasNewUnread && !isOpen) {
      onClose(true);
    }
  }, [notificationMessages, isOpen, onClose]);

  const handleMarkAsRead = async (notifId) => {
    try {
      await markAsRead(
        `https://hipnode-server.onrender.com/api/notifications/${notifId}/read`,
        "PATCH",
        { read: true },
        { requiresAuth: true },
      );
      setInitialNotifications((prev) =>
        prev.map((n) => (n._id === notifId ? { ...n, read: true } : n)),
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    console.log(
      "Formatting timestamp:",
      timestamp,
      "Result:",
      date.toISOString(),
    );
    return isNaN(date.getTime()) ? "Just now" : date.toLocaleTimeString();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      height="h-80"
      position="top-right"
    >
      <div className="flex flex-col h-full p-4">
        <h2
          className="text-lg font-semibold mb-3"
          style={{ color: themeColors.textColor, textAlign: "left" }}
        >
          Notifications
        </h2>
        {error && (
          <p className="text-sm" style={{ color: themeColors.darkOrangeColor }}>
            {error === "Error: Request failed with status 429"
              ? "Too many requests. Please try again later."
              : error}
          </p>
        )}
        {allNotifications.length === 0 && !error ? (
          <p className="text-sm" style={{ color: themeColors.labelText }}>
            No notifications yet.
          </p>
        ) : (
          <ul className="space-y-2 overflow-y-auto flex-1 hide-scrollbar">
            {allNotifications.map((notif) => (
              <li
                key={notif._id}
                className="text-sm p-2 rounded transition-colors duration-200 flex items-center"
                style={{
                  backgroundColor: notif.read
                    ? themeColors.inputBgSecondary
                    : themeColors.secondaryColor + "20",
                  color: themeColors.textColor,
                }}
              >
                <div className="flex items-start flex-col w-full">
                  <p className="text-sm font-semibold text-left">
                    {notif.message}
                  </p>
                  <span
                    className="text-xs text-left italic"
                    style={{ color: themeColors.labelText }}
                  >
                    {formatTimestamp(notif.timestamp)}
                  </span>
                </div>
                {!notif.read && (
                  <button
                    onClick={() => handleMarkAsRead(notif._id)}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: themeColors.buttonBlueBg,
                      color: themeColors.buttonSecondaryText,
                    }}
                  >
                    Mark as Read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default NotificationModal;

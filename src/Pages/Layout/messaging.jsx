import React, { useState } from "react";
import Modal from "../../Components/modal";
import useWebSocket from "../../hooks/webSocket";

const ChatPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const userId = "user1"; // Replace with dynamic user ID (e.g., from authentication)

  // Use the WebSocket hook
  const { messages, sendMessage } = useWebSocket("ws://localhost:5000", userId);

  // Mock chat data
  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Jane Smith", lastMessage: "See you later!" },
    { id: 3, name: "Alice Johnson", lastMessage: "Let's catch up soon." },
  ];

  // Open modal and set the selected chat
  const openChatModal = (chat) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
  };

  // Close modal and reset the selected chat
  const closeChatModal = () => {
    setSelectedChat(null);
    setIsModalOpen(false);
  };

  // Handle sending a message
  const handleSendMessage = (message) => {
    if (selectedChat) {
      sendMessage(selectedChat.id, message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      {/* Chat List */}
      <div className="w-1/4 bg-white rounded-lg shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => openChatModal(chat)}
            className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <h3 className="font-semibold">{chat.name}</h3>
            <p className="text-sm text-gray-600">{chat.lastMessage}</p>
          </div>
        ))}
      </div>

      {/* Modal for Message UI */}
      <Modal isOpen={isModalOpen} onClose={closeChatModal} size="lg">
        {selectedChat && (
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-bold">{selectedChat.name}</h2>
              <p className="text-sm text-gray-600">
                Last message: {selectedChat.lastMessage}
              </p>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto mb-4">
              {messages
                .filter(
                  (msg) =>
                    msg.fromUserId === selectedChat.id ||
                    msg.toUserId === selectedChat.id,
                )
                .map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 mb-2 rounded-lg ${
                      msg.fromUserId === selectedChat.id
                        ? "bg-gray-100 self-start"
                        : "bg-blue-100 self-end text-right"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <small className="text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </small>
                  </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="border-t pt-4">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 border rounded-lg"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    handleSendMessage(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector("input");
                  if (input && input.value.trim()) {
                    handleSendMessage(input.value);
                    input.value = "";
                  }
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
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

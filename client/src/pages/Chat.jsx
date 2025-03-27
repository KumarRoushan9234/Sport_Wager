import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi"; // Send icon
import { FaTrash, FaUserAlt, FaRobot } from "react-icons/fa"; // Icons

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages(data.data || []);
        }
      })
      .catch((err) => console.error("Error fetching chat history:", err));
  }, []);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", parts: input }]);

    fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages((prev) => [
            ...prev,
            { role: "model", parts: data.data.response },
          ]);
        }
      })
      .catch((err) => console.error("Error sending message:", err));

    setInput(""); // Clear input
  };

  const handleDeleteHistory = () => {
    fetch("http://127.0.0.1:8000/delete_history", { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages([]);
        }
      })
      .catch((err) => console.error("Error deleting history:", err));
  };

  return (
    <div className="flex flex-col h-screen w-11/12 mx-auto mt-2 bg-gray-800 text-white rounded-md shadow-lg">
      <div className="flex-grow overflow-y-auto p-5 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-center space-x-2">
              {message.role === "user" ? (
                <FaUserAlt className="text-white text-lg" />
              ) : (
                <FaRobot className="text-green-400 text-lg" />
              )}
              <div
                className={`px-4 py-2 rounded-lg max-w-xs md:max-w-sm lg:max-w-md ${
                  message.role === "user"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {message.parts}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center p-3 bg-gray-900 border-t border-gray-700">
        <button
          onClick={handleDeleteHistory}
          className="text-red-500 hover:text-red-400 p-2"
        >
          <FaTrash className="text-xl" />
        </button>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-grow p-2 mx-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
        >
          <FiSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Chat;

import React, { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import { FiSend } from "react-icons/fi"; // Send icon
import { FaTrash } from "react-icons/fa"; // Delete history icon
import { FaUserAlt } from "react-icons/fa"; // User icon
import { FaRobot } from "react-icons/fa"; // Computer (bot) icon

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load chat history from server on component mount
  useEffect(() => {
    fetch("http://127.0.0.1:5000/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages(data.data || []);
        }
      })
      .catch((err) => console.error("Error fetching chat history:", err));
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message temporarily
    setMessages((prev) => [...prev, { role: "user", parts: input }]);

    // Send message to backend
    fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const response = {
            role: "model",
            parts: data.data.response,
          };
          setMessages((prev) => [...prev, response]);
        }
      })
      .catch((err) => console.error("Error sending message:", err));

    setInput(""); // Clear input
  };

  const handleDeleteHistory = () => {
    fetch("http://127.0.0.1:5000/delete_history", { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages([]); // Clear local messages
        }
      })
      .catch((err) => console.error("Error deleting history:", err));
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.messageWrapper} ${
              message.role === "user" ? styles.user : styles.bot
            }`}
          >
            <div className={styles.iconWrapper}>
              {/* User Icon for user message, computer icon for bot message */}
              {message.role === "user" ? (
                <FaUserAlt className={styles.userIcon} />
              ) : (
                <FaRobot className={styles.botIcon} />
              )}
            </div>
            <div className={styles.message}>{message.parts}</div>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        {/* Delete button on the left */}
        <button onClick={handleDeleteHistory} className={styles.deleteButton}>
          <FaTrash className={styles.deleteIcon} />
        </button>
        {/* Chat input */}
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className={styles.chatInput}
        />
        {/* Send button */}
        <button onClick={handleSendMessage} className={styles.sendButton}>
          <FiSend className={styles.sendIcon} />
        </button>
      </div>

      {/* Information note at the bottom right */}
      {/* <p className={styles.infoText}>
        * Kindly verify the information as AI can make mistakes.
      </p> */}
    </div>
  );
};

export default Chat;

"use client";

import { useState } from "react";
import ChatUI from "../components/ChatUI";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (input) => {
    if (!input.trim()) return;
    setLoading(true);

    // Agregar mensaje del usuario al estado
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Hacer la solicitud a la API
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      if (data.response) {
        // Agregar el mensaje del bot
        const botMessage = { role: "assistant", content: data.response.content };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatUI 
      messages={messages} 
      onSendMessage={handleSendMessage} 
      loading={loading} 
    />
  );
}

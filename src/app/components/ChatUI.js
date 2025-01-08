import { useEffect, useRef } from "react";

export default function ChatUI({ messages, onSendMessage }) {
  const messagesEndRef = useRef(null);

  // Scroll automático al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (event) => {
    event.preventDefault();
    const input = event.target.elements.messageInput;
    const newMessage = input.value.trim();
    if (newMessage) {
      onSendMessage(newMessage);
      input.value = ""; // Limpiar el campo de entrada
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen max-w-md mx-auto bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 text-center font-bold">
        Chaneque 🧌
      </header>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Caja de entrada */}
      <form
        className="flex items-center p-4 border-t border-gray-600"
        onSubmit={handleSend}
      >
        <input
          type="text"
          name="messageInput"
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-gray-800 text-gray-300 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

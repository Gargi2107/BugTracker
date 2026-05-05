import { useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Chatbot({ projectId }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const sendMessage = async () => {
  if (!message.trim()) return;

  const userMsg = { text: message, sender: "user" };
  setMessages((prev) => [...prev, userMsg]);

  setLoading(true);
  
  const res = await API.post("/chat", {
    message,
    projectId: id || null,
  });

  setLoading(false);

  const botMsg = { text: res.data.reply, sender: "bot" };
  setMessages((prev) => [...prev, botMsg]);

  setMessage("");
};

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-xl hover:scale-110 transition text-xl"
      >
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-[420px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border">
          
          {/* HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 font-bold">
            AI Assistant
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  m.sender === "user"
                    ? "bg-indigo-500 text-white ml-auto"
                    : "bg-white shadow"
                }`}
              >
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            ))}
          </div>
            {loading && (
            <div className="text-sm text-gray-400 italic">
                AI is thinking...
            </div>
            )}
          {/* INPUT */}
          <div className="p-2 border-t flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 border rounded-lg p-2 text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-3 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
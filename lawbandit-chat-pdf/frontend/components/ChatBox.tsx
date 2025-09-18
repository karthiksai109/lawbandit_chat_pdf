"use client";

import { useState } from "react";

interface Props {
  fileId: string;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatBox({ fileId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: fileId, question: input }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.answer }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { sender: "bot", text: "⚠️ Error fetching answer" }]);
    }

    setInput("");
  };

  return (
    <div className="w-full max-w-2xl border rounded p-4 space-y-4">
      <div className="h-64 overflow-y-auto bg-gray-100 p-2 rounded">
        {messages.map((m, i) => (
          <p
            key={i}
            className={`p-2 my-1 rounded ${
              m.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-300 text-left"
            }`}
          >
            {m.text}
          </p>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Ask a question..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

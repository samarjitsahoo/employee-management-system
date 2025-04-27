"use client";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    chatbase?: (method: string, options: { chatbotId: string; domain: string }) => void;
  }
}

export default function ChatBubble() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!window.chatbase) {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.defer = true;
      script.onload = () => {
        if (window.chatbase) {
          window.chatbase("init", {
            chatbotId: "zBtvX4n_L4C5CCXmRvTKW",
            domain: window.location.origin,
          });
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        💬
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white shadow-lg rounded-lg border border-gray-300">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/0SrknhihQFxT5qoBvS1ja"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      )}
    </>
  );
}

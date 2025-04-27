import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://studymates-server.onrender.com/api/chat",
        {
          message,
        }
      );
      const botMessage = { text: res.data.response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[90vh] bg-richblack-900">
      {/* Header */}
      <div className="bg-richblack-800 border-b border-richblack-700 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-10 h-10 rounded-full bg-richblue-500 flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">
              Adani University Assistant
            </h1>
            <p className="text-xs text-richblack-300">Powered by AI</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto py-6 px-4 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 bg-richblack-800 rounded-full flex items-center justify-center mb-6 border-2 border-richblue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-richblue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                How can I help you today?
              </h2>
              <p className="text-richblack-300 max-w-md">
                Ask questions about courses, admissions, faculty, or anything
                related to Adani University.
              </p>
              <div ref={messagesEndRef} />
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-3 ${
                  msg.sender === "user"
                    ? "bg-richblue-600 text-white rounded-br-none border border-richblue-400"
                    : "bg-richblack-800 text-richblack-100 rounded-bl-none border border-richblack-700"
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-richblack-800 text-white rounded-lg rounded-bl-none px-4 py-3 border border-richblack-700">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-richblue-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-richblue-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-richblue-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-richblack-800 border-t border-richblack-700 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex">
            <textarea
              rows="1"
              className="flex-1 bg-richblack-700 text-white rounded-xl py-3 px-5 pr-16 focus:outline-none focus:ring-2 focus:ring-richblue-500 focus:border-transparent resize-none border border-richblack-600 placeholder-richblack-400"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-lg ${
                message.trim() && !loading
                  ? "bg-richblue-500 hover:bg-richblue-400"
                  : "bg-richblack-600"
              } text-white flex items-center justify-center transition`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-richblack-400 mt-2 text-center">
            Adani University Assistant may produce inaccurate information about
            people, places, or facts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chat;

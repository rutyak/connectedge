import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HiArrowSmallLeft,
  HiOutlinePhone,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import { createSocketConnection } from "../../utils/socket";
import axios from "axios";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function ChatWindow() {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { targetUser } = location.state || {};
  const userId = user?._id;

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  async function getChat() {
    try {
      const res = await axios.get(`${base_url}/chat/${targetUser?.id}`, {
        withCredentials: true,
      });
      const chat = res.data?.chat?.[0];
      const formattedMessages =
        chat?.messages?.map((m) => ({
          id: m?._id,
          text: m?.text,
          sender: m.senderId?._id === userId ? "me" : "other",
          time: new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })) || [];
      setMessages(formattedMessages);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getChat();
  }, [targetUser?.id]);

  useEffect(() => {
    if (!user?._id || !targetUser?.id) return;
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket?.emit("joinChat", {
      targetUserId: targetUser?.id,
      firstname: user?.firstname,
    });

    socket.on("messageReceive", ({ text, senderId }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text,
          sender: senderId === userId ? "me" : "other",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => socket.disconnect();
  }, [userId, targetUser?.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (message?.trim() === "" || !socketRef?.current) return;
    socketRef.current?.emit("sendMessage", {
      firstname: user?.firstname,
      targetUserId: targetUser?.id,
      text: message,
    });
    setMessage("");
  }

  return (
    <div className="h-[100dvh] flex flex-col text-white bg-[#0a192f]">
      {/* Dynamic Header */}
      <header className="flex items-center justify-between px-6 py-4  backdrop-blur-md border-b border-white/5 z-20">
        <div className="flex items-center gap-4">
          <HiArrowSmallLeft
            className="lg:hidden text-2xl cursor-pointer text-slate-400 hover:text-cyan-400 transition-colors"
            onClick={() => navigate(-1)}
          />
          <div className="relative">
            <img
              src={targetUser?.imageurl}
              alt="profile"
              className="w-11 h-11 rounded-xl object-cover border-2 border-cyan-500/30"
            />
            {isOnline && (
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#020617] rounded-full"></span>
            )}
          </div>
          <div>
            <h2 className="font-bold text-slate-100">
              {targetUser?.firstname}
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-cyan-400 font-medium">
              {isOnline ? "Active Now" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <HiOutlinePhone
            className="cursor-pointer hover:text-cyan-400 transition-colors"
            size={20}
          />
          <HiOutlineVideoCamera
            className="cursor-pointer hover:text-cyan-400 transition-colors"
            size={22}
          />
        </div>
      </header>

      {/* Modern Chat Canvas */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        {messages?.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`group relative max-w-[75%] lg:max-w-[60%]`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm shadow-2xl ${
                  msg.sender === "me"
                    ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-tr-none"
                    : "bg-slate-800/80 text-slate-100 border border-white/5 rounded-tl-none backdrop-blur-sm"
                }`}
              >
                {msg.text}
              </div>
              <p
                className={`text-[10px] mt-1 text-slate-500 font-medium ${msg.sender === "me" ? "text-right" : "text-left"}`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </main>

      {/* High-Tech Input Bar */}
      <footer className="p-4 lg:p-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2 px-4 focus-within:border-cyan-500/50 transition-all shadow-inner">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a professional message..."
            className="flex-1 bg-transparent py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-0"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale"
          >
            <AiOutlineSend size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ChatWindow;

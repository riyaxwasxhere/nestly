import { PhoneOutgoingIcon, SendHorizonal } from "lucide-react";
import React, { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { serverUrl } from "../../../App";
import { socket } from "../../../socket/socket";

function Messages() {
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  console.log("conversation", conversations);

  const currentUser = useSelector((state) => state.user?.userData);
  const currentUserId = currentUser?._id;
  const selectedChat = useSelector((state) => state.user?.selectedChat);
  console.log(selectedChat)

  const filteredConversations = conversations.filter((convo) =>
    convo?.receiverName?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!selectedChat || !currentUserId) return;
    const startConversation = async () => {
      try {
        const response = await axios.post(
          `${serverUrl}/api/conversations/create`,
          {
            senderId: currentUserId,
            receiverId: selectedChat._id
          },
          { withCredentials: true }
        );
        setActiveConversation({
          conversationId: response.data._id,
          receiverId: selectedChat._id,
          receiverName: selectedChat.fullname,
          receiverProfilePic: selectedChat.receiverProfilePic
        });
      } catch (error) {
        console.log(error);
      }
    };
    startConversation();
  }, [selectedChat, currentUserId]);

  useEffect(() => {
    if (!currentUserId) return;
    socket.connect();
    socket.emit("addUser", currentUserId);
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.off("getUsers");
      socket.disconnect();
    };
  }, [currentUserId]);

  const activeConversationRef = useRef(activeConversation);
  useEffect(() => {
    activeConversationRef.current = activeConversation;
  }, [activeConversation]);

  useEffect(() => {
    socket.on("getMessage", ({ senderId, text }) => {
      if (activeConversationRef.current?.receiverId === senderId) {
        setMessages((prev) => [
          ...prev,
          {
            senderId,
            text,
            createdAt: new Date()
          }
        ]);
      }
    });
    return () => socket.off("getMessage");
  }, []);

  useEffect(() => {
    if (!currentUserId) return;
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/conversations/user/${currentUserId}`,
          { withCredentials: true }
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, [currentUserId]);

  useEffect(() => {
    if (!activeConversation?.conversationId) return;
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/conversations/messages/${activeConversation.conversationId}`,
          { withCredentials: true }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [activeConversation?.conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/conversations/message`,
        {
          conversationId: activeConversation.conversationId,
          senderId: currentUserId,
          text: newMessage.trim()
        },
        { withCredentials: true }
      );
      setMessages((prev) => [...prev, data]);
      socket.emit("sendMessage", {
        senderId: currentUserId,
        receiverId: activeConversation.receiverId,
        text: newMessage.trim()
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const isOnline = (userId) =>
    onlineUsers.some((user) => user.userId === userId);

  return (
    <div className="flex">
      {/* Conversation List */}
      <div className="p-4 border-r w-72 border-[#5a4626] h-screen overflow-y-auto no-scrollbar">
        <input
          className="w-full px-4 py-3 mb-4 border border-[#4a3720] rounded-2xl text-xs focus:outline-none bg-[#2a1d0d]/80 text-[#F0E8D8]"
          type="text"
          placeholder="Search conversations"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredConversations.map((convo) => (
          <div
            key={convo.conversationId}
            onClick={() => setActiveConversation(convo)}
            className={`flex items-center p-3 mb-2 rounded-2xl cursor-pointer transition-colors ${activeConversation?.conversationId === convo.conversationId ? "bg-[#413117]/60" : "hover:bg-[#413117]/20"}`}
          >
            <div className="relative w-10 h-10 bg-white rounded-full">
              <img
                src={
                  convo.receiverProfilePic ||
                  "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=-mUWsTSENkugJ3qs5covpaj-bhYpxXY-v9RDpzsw504="
                }
                alt={convo.receiverName[0][0]}
                className="object-cover w-full h-full scale-110 rounded-full"
              />
              {isOnline(convo.receiverId) && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#413117] rounded-full"></div>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{convo.receiverName}</p>
              <p className="w-40 text-xs text-gray-500 truncate">
                {messages.length > 0 &&
                activeConversation?.conversationId === convo.conversationId
                  ? messages[messages.length - 1]?.text
                  : "No messages yet"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Area */}

      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        {activeConversation ? (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-3 border-b border-[#4a3720] bg-[#1a0f05]/60">
              <div className="relative bg-white rounded-full w-9 h-9 shrink-0">
                <img
                  className="object-cover w-full h-full scale-110 rounded-full"
                  src={
                    activeConversation?.receiverProfilePic ||
                    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=-mUWsTSENkugJ3qs5covpaj-bhYpxXY-v9RDpzsw504="
                  }
                />
                {isOnline(activeConversation?.receiverId) && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1a0f05] rounded-full"></span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#F0E8D8]">
                  {activeConversation?.receiverName}
                </p>
                <p
                  className={`text-xs ${isOnline(activeConversation?.receiverId) ? "text-green-400" : "text-gray-500"}`}
                >
                  {isOnline(activeConversation?.receiverId)
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
              <PhoneOutgoingIcon
                height={18}
                className="cursor-pointer text-[#F5A623]"
              />
            </div>

            {/* Messages */}
            <div className="flex flex-col flex-1 gap-2 px-6 py-4 overflow-y-auto no-scrollbar">
              {messages.map((msg, i) => {
                const isSender = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg._id || i}
                    ref={i === messages.length - 1 ? scrollRef : null}
                    className={`px-4 py-2 rounded-2xl max-w-sm text-sm wrap-break-word leading-relaxed shadow-sm
                      ${
                        isSender
                          ? "bg-[#F5A623] text-black self-end rounded-br-sm"
                          : "bg-[#2e1f0a] text-[#F0E8D8] self-start rounded-bl-sm border border-[#4a3720]"
                      }`}
                  >
                    {msg.text}
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-6 py-3 border-t border-[#4a3720] bg-[#1a0f05]/60">
              <input
                type="text"
                placeholder="Type a message ..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#2a1d0d]/80 text-[#F0E8D8] border border-[#4a3720] focus:outline-none focus:border-[#F5A623] text-sm transition-colors"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="p-2.5 rounded-xl bg-[#F5A623] text-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#e09510] transition-colors"
              >
                <SendHorizonal size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 text-[#5a4626]">
            <PhoneOutgoingIcon size={48} />
            <p className="text-sm">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;

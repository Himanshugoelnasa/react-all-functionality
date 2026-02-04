import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatMain from "../../components/chat/ChatMain";

// Mock data
const mockContacts = [
  {
    id: "1",
    name: "Emma Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    lastMessage: "That sounds great! Let's do it 🎉",
    time: "2m",
    unread: 2,
    status: "online",
  },
  {
    id: "2",
    name: "James Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    lastMessage: "I'll send you the files soon",
    time: "15m",
    unread: 0,
    status: "online",
  },
  {
    id: "3",
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    lastMessage: "Meeting at 3pm tomorrow?",
    time: "1h",
    unread: 1,
    status: "away",
  },
  {
    id: "4",
    name: "Michael Brown",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    lastMessage: "Thanks for the help!",
    time: "3h",
    unread: 0,
    status: "offline",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    lastMessage: "See you later!",
    time: "1d",
    unread: 0,
    status: "offline",
  },
];

const mockMessages = {
  "1": [
    { id: "1", text: "Hey! How are you doing?", sent: false, time: "10:30 AM" },
    { id: "2", text: "I'm great! Just finished the project.", sent: true, time: "10:32 AM" },
    { id: "3", text: "That's awesome! Congratulations! 🎊", sent: false, time: "10:33 AM" },
    { id: "4", text: "Thanks! Want to celebrate this weekend?", sent: true, time: "10:35 AM" },
    { id: "5", text: "That sounds great! Let's do it 🎉", sent: false, time: "10:36 AM" },
  ],
  "2": [
    { id: "1", text: "Can you send me the project files?", sent: true, time: "9:00 AM" },
    { id: "2", text: "Sure, give me a moment", sent: false, time: "9:05 AM" },
    { id: "3", text: "I'll send you the files soon", sent: false, time: "9:10 AM" },
  ],
  "3": [
    { id: "1", text: "Hi Sarah!", sent: true, time: "Yesterday" },
    { id: "2", text: "Hey! How's the project going?", sent: false, time: "Yesterday" },
    { id: "3", text: "Almost done, just some final touches", sent: true, time: "Yesterday" },
    { id: "4", text: "Meeting at 3pm tomorrow?", sent: false, time: "Yesterday" },
  ],
};

const Index = () => {
  const [activeContactId, setActiveContactId] = useState(null);
  const [messages, setMessages] = useState(mockMessages);
  const [contacts, setContacts] = useState(mockContacts);

  const activeContact = contacts.find((c) => c.id === activeContactId) || null;
  const activeMessages = activeContactId ? messages[activeContactId] || [] : [];

  useEffect(() => {
    // Welcome notification
    toast.info("Welcome to ChatPortal! 👋", {
      position: "top-right",
      autoClose: 3000,
    });
  }, []);

  const handleSelectContact = (id) => {
    setActiveContactId(id);
    // Clear unread count
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const handleSendMessage = (text) => {
    if (!activeContactId) return;

    const newMessage = {
      id: Date.now().toString(),
      text,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage],
    }));

    // Update last message in contacts
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContactId
          ? { ...c, lastMessage: text, time: "Just now" }
          : c
      )
    );

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replies = [
        "That's interesting! Tell me more.",
        "Got it! 👍",
        "Sure, sounds good!",
        "I'll check and get back to you.",
        "Thanks for letting me know!",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const replyMessage = {
        id: (Date.now() + 1).toString(),
        text: randomReply,
        sent: false,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), replyMessage],
      }));

      toast.info(`New message from ${activeContact?.name}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }, 2000);
  };

  return (
    <div className="chat-container">
      <ChatSidebar
        contacts={contacts}
        activeContactId={activeContactId}
        onSelectContact={handleSelectContact}
      />
      <ChatMain
        contact={activeContact}
        messages={activeMessages}
        onSendMessage={handleSendMessage}
      />
      <ToastContainer
        theme="dark"
        toastStyle={{
          backgroundColor: "hsl(220, 18%, 14%)",
          color: "hsl(210, 20%, 95%)",
        }}
      />
    </div>
  );
};

export default Index

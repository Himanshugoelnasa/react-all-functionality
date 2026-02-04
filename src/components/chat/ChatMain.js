import { useState, useRef, useEffect } from "react";
import { Send, Phone, Video, Smile, Paperclip } from "lucide-react";
import { toast } from "react-toastify";
import ChatOptionsMenu from "./ChatOptionsMenu";

const ChatMain = ({
  contact = null,
  messages = [],
  onSendMessage = () => {},
}) => {

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // };

  useEffect(() => {
   // scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    onSendMessage(inputValue.trim());
    setInputValue("");

    toast.success("Message sent!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!contact) {
    return (
      <div className="chat-main flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Send className="w-10 h-10 text-muted-foreground" />
          </div>

          <h2 className="text-xl font-semibold text-foreground mb-2">
            Select a conversation
          </h2>

          <p className="text-muted-foreground">
            Choose a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-main">

      {/* Header */}
      <div className="header-bar">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className={`status-dot status-${contact.status}`} />
          </div>

          <div>
            <h2 className="font-semibold text-foreground">
              {contact.name}
            </h2>

            <p className="text-xs text-muted-foreground capitalize">
              {contact.status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Phone className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Video className="w-5 h-5 text-muted-foreground" />
          </button>

          <ChatOptionsMenu contactName={contact.name} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sent ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={
                message.sent
                  ? "message-bubble-sent"
                  : "message-bubble-received"
              }
            >
              <p>{message.text}</p>

              <span className="text-[10px] opacity-70 mt-1 block text-right">
                {message.time}
              </span>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input-container">
        <div className="flex items-center gap-3">

          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Smile className="w-5 h-5 text-muted-foreground" />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="chat-input flex-1"
          />

          <button onClick={handleSend} className="send-button">
            <Send className="w-5 h-5" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default ChatMain;

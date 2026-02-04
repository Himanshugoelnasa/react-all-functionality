import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, Search, UserPlus, Users, Hash } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const suggestedContacts = [
  {
    id: "6",
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    email: "alex.j@example.com",
    mutualFriends: 5,
  },
  {
    id: "7",
    name: "Maria Garcia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    email: "maria.g@example.com",
    mutualFriends: 3,
  },
  {
    id: "8",
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    email: "david.k@example.com",
    mutualFriends: 8,
  },
  {
    id: "9",
    name: "Sophie Turner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophie",
    email: "sophie.t@example.com",
    mutualFriends: 2,
  },
  {
    id: "10",
    name: "Ryan Cooper",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
    email: "ryan.c@example.com",
  },
];

const NewChat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("contacts");
  const navigate = useNavigate();

  const filteredContacts = suggestedContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartChat = (contact) => {
    toast.success(`Starting chat with ${contact.name}...`);
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="new-chat-container">
      <div className="new-chat-card">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/chats")}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">
            New Conversation
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedTab("contacts")}
            className={`new-chat-tab ${
              selectedTab === "contacts" ? "active" : ""
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Direct Message
          </button>

          <button
            onClick={() => setSelectedTab("group")}
            className={`new-chat-tab ${
              selectedTab === "group" ? "active" : ""
            }`}
          >
            <Users className="w-4 h-4" />
            New Group
          </button>

          <button
            onClick={() => setSelectedTab("channel")}
            className={`new-chat-tab ${
              selectedTab === "channel" ? "active" : ""
            }`}
          >
            <Hash className="w-4 h-4" />
            Channel
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {selectedTab === "contacts" && (
          <>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Suggested Contacts
            </h3>

            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleStartChat(contact)}
                  className="new-chat-contact-item"
                >
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">
                      {contact.name}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.email}
                    </p>
                  </div>

                  {contact.mutualFriends && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {contact.mutualFriends} mutual
                    </span>
                  )}
                </div>
              ))}

              {filteredContacts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No contacts found matching "{searchTerm}"
                </div>
              )}
            </div>
          </>
        )}

        {selectedTab === "group" && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Create a Group Chat
            </h3>
            <p className="text-muted-foreground mb-6">
              Select contacts to add to your new group
            </p>
            <button className="auth-button max-w-xs mx-auto">
              Select Contacts
            </button>
          </div>
        )}

        {selectedTab === "channel" && (
          <div className="text-center py-12">
            <Hash className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Create a Channel
            </h3>
            <p className="text-muted-foreground mb-6">
              Channels are great for broadcasting to large groups
            </p>
            <button className="auth-button max-w-xs mx-auto">
              Create Channel
            </button>
          </div>
        )}

      </div>

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

export default NewChat;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, MessageCircle, Bell } from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import NotificationTray from "./NotificationTray";

const ChatSidebar = ({
  contacts = [],   // prevents crash
  activeContactId = null,
  onSelectContact = () => {}
}) => {

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredContacts = contacts.filter((contact) =>
    contact?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-sidebar">

      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-2">
            <MessageCircle className="w-7 h-7 text-primary" />
            <h1 className="text-xl font-bold text-foreground">ChatPortal</h1>
          </div>

          <div className="flex gap-1">

            <button
              onClick={() => navigate("/new-chat")}
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
              title="New Chat"
            >
              <Plus className="w-5 h-5 text-muted-foreground" />
            </button>

            <NotificationTray>
              <button 
                className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
              </button>
            </NotificationTray>

            <SidebarMenu>
              <button className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </SidebarMenu>

          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-sidebar-accent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Contacts */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact.id)}
            className={`contact-item ${activeContactId === contact.id ? "active" : ""}`}
          >
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className={`status-dot status-${contact.status}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground truncate">
                  {contact.name}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {contact.time}
                </span>
              </div>

              <p className="text-sm text-muted-foreground truncate">
                {contact.lastMessage}
              </p>
            </div>

            {contact.unread > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                {contact.unread}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Profile */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3">

          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              alt="You"
              className="w-10 h-10 rounded-full"
            />
            <span className="status-dot status-online" />
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-foreground">You</h4>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ChatSidebar;

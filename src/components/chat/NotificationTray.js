import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell, MessageCircle, Users, AtSign, Check, X } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NotificationTray = ({ children }) => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "message",
      title: "Emma Wilson",
      description: "Sent you a message",
      time: "2m ago",
      read: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    {
      id: "2",
      type: "mention",
      title: "Design Team",
      description: "@you mentioned in a discussion",
      time: "15m ago",
      read: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=design",
    },
    {
      id: "3",
      type: "group",
      title: "Project Updates",
      description: "5 new messages",
      time: "1h ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=project",
    },
    {
      id: "4",
      type: "message",
      title: "James Rodriguez",
      description: "Shared a file with you",
      time: "3h ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageCircle className="w-4 h-4" />;
      case "mention":
        return <AtSign className="w-4 h-4" />;
      case "group":
        return <Users className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.info("Notification dismissed");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          {children}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-destructive text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-90 max-h-[70vh] overflow-hidden bg-card border-border p-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Notifications</h3>

            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                {unreadCount} new
              </span>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Mark all as read"
            >
              <Check className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`group flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="relative">
                  <img
                    src={notification.avatar}
                    alt={notification.title}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-card border border-border">
                    {getIcon(notification.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate mb-0">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate mb-0">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notification.id);
                  }}
                  className="p-1 rounded hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>

                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="flex items-center justify-between p-3 border-t border-border">
            <button
              onClick={() => navigate("/notifications")}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View all notifications
            </button>

            <button
              onClick={clearAll}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationTray;

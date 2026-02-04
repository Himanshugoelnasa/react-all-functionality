import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  MoreVertical,
  Pin,
  Archive,
  VolumeX,
  Trash2,
  Search,
  CheckCheck,
  Ban,
  Bell,
} from "lucide-react";
import { toast } from "react-toastify";

const ChatOptionsMenu = ({ contactName, onAction }) => {
  const handleAction = (action, label) => {
    toast.info(`${label} - ${contactName}`, {
      position: "bottom-right",
      autoClose: 2000,
    });

    // optional chaining still works in JS
    onAction?.(action);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 bg-card border-border">
        <DropdownMenuItem
          onClick={() => handleAction("pin", "Chat pinned")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <Pin className="w-4 h-4" />
          <span>Pin Chat</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAction("search", "Search in chat")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <Search className="w-4 h-4" />
          <span>Search in Chat</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAction("markRead", "Marked as read")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark as Read</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={() => handleAction("mute", "Notifications muted")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <VolumeX className="w-4 h-4" />
          <span>Mute Notifications</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAction("notifications", "Custom notifications")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <Bell className="w-4 h-4" />
          <span>Custom Notifications</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAction("archive", "Chat archived")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <Archive className="w-4 h-4" />
          <span>Archive Chat</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={() => handleAction("block", "User blocked")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted text-destructive"
        >
          <Ban className="w-4 h-4" />
          <span>Block User</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAction("delete", "Chat deleted")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted text-destructive"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Chat</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatOptionsMenu;

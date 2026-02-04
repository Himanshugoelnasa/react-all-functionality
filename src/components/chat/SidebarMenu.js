import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Settings,
  User,
  Moon,
  Bell,
  HelpCircle,
  LogOut,
  Shield,
  Palette,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SidebarMenu = ({ children }) => {
  const navigate = useNavigate();

  const handleAction = (action) => {
    switch (action) {
      case "profile":
        navigate("/profile");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "appearance":
      case "theme":
        navigate("/appearance");
        break;
      case "notifications":
        navigate("/notifications");
        break;
      case "privacy":
        navigate("/privacy");
        break;
      case "help":
        navigate("/help");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "logout":
        toast.info("Logging out...");
        setTimeout(() => navigate("/signin"), 1000);
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-56 bg-card border-border"
      >
        <DropdownMenuItem
          onClick={() => handleAction("profile")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <User className="w-4 h-4" />
          <span>My Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAction("settings")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={() => handleAction("appearance")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <Palette className="w-4 h-4" />
          <span>Appearance</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAction("theme")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <Moon className="w-4 h-4" />
          <span>Dark Mode</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAction("notifications")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={() => handleAction("privacy")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <Shield className="w-4 h-4" />
          <span>Privacy & Security</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAction("help")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={() => handleAction("admin")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Admin Panel</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={() => handleAction("logout")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted text-destructive"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarMenu;

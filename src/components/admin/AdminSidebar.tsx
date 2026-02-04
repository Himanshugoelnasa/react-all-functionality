import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart3,
  Shield,
  Settings,
  ArrowLeft,
  Bell,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
    badge: null,
  },
  {
    title: "Users",
    icon: Users,
    path: "/admin/users",
    badge: "2.4k",
  },
  {
    title: "Chats",
    icon: MessageSquare,
    path: "/admin/chats",
    badge: "156",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
    badge: null,
  },
  {
    title: "Moderation",
    icon: Shield,
    path: "/admin/moderation",
    badge: "12",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
    badge: null,
  },
];

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">Manage your app</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-muted/50 border-0 h-9"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1 font-medium">{item.title}</span>
            {item.badge && (
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-background/20"
              >
                {item.badge}
              </Badge>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Chat</span>
        </NavLink>
        
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@chatapp.com</p>
          </div>
          <Bell className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

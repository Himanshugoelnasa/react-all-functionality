import {
  Users,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  UserPlus,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const stats = [
  {
    title: "Total Users",
    value: "2,456",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Active Chats",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: MessageSquare,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Messages Today",
    value: "12.4k",
    change: "+23.1%",
    trend: "up",
    icon: MessageCircle,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Reports Pending",
    value: "12",
    change: "-4.3%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

const recentActivities = [
  {
    user: "John Doe",
    action: "created a new group",
    time: "2 minutes ago",
    avatar: "JD",
  },
  {
    user: "Sarah Wilson",
    action: "reported a message",
    time: "15 minutes ago",
    avatar: "SW",
  },
  {
    user: "Mike Johnson",
    action: "joined the platform",
    time: "32 minutes ago",
    avatar: "MJ",
  },
  {
    user: "Emily Chen",
    action: "updated profile settings",
    time: "1 hour ago",
    avatar: "EC",
  },
  {
    user: "Alex Brown",
    action: "started a new chat",
    time: "2 hours ago",
    avatar: "AB",
  },
];

const topUsers = [
  { name: "Sarah Wilson", messages: 1234, status: "online" },
  { name: "John Doe", messages: 987, status: "online" },
  { name: "Emily Chen", messages: 856, status: "away" },
  { name: "Mike Johnson", messages: 743, status: "offline" },
  { name: "Alex Brown", messages: 621, status: "online" },
];

const index = () => {
  return (
    <>
    
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your app.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart Placeholder */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Activity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl border-2 border-dashed border-border">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Activity chart visualization</p>
                <p className="text-sm text-muted-foreground/70">Connect to backend for real data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Users */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              Top Active Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topUsers.map((user, index) => (
              <div key={user.name} className="flex items-center gap-3">
                <span className="text-sm font-bold text-muted-foreground w-4">
                  {index + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {user.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.messages} messages
                  </p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    user.status === "online"
                      ? "bg-green-500"
                      : user.status === "away"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activity.time}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  View
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default index;
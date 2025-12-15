import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  TrendingDown,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Gift,
  Repeat,
  Target,
  Settings,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface NotificationsPageProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: "alert" | "reminder" | "success" | "info";
  category: "budget" | "bill" | "transaction" | "goal" | "subscription" | "general";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: any;
  colors: { bg: string; text: string };
}

export function NotificationsPage({ onBack }: NotificationsPageProps) {
  const [selectedTab, setSelectedTab] = useState<"all" | "unread">("all");

  const notifications: Notification[] = [
    {
      id: "1",
      type: "alert",
      category: "budget",
      title: "Budget Alert",
      message: "You've used 85% of your Food & Dining budget this month",
      time: "2 hours ago",
      isRead: false,
      icon: AlertCircle,
      colors: { bg: "bg-red-100", text: "text-red-600" },
    },
    {
      id: "2",
      type: "reminder",
      category: "bill",
      title: "Bill Payment Due",
      message: "Electricity bill of ₹2,450 is due in 2 days",
      time: "5 hours ago",
      isRead: false,
      icon: Calendar,
      colors: { bg: "bg-orange-100", text: "text-orange-600" },
    },
    {
      id: "3",
      type: "success",
      category: "goal",
      title: "Goal Milestone Reached!",
      message: "You've saved 50% towards your 'New Laptop' goal",
      time: "Yesterday",
      isRead: true,
      icon: Target,
      colors: { bg: "bg-green-100", text: "text-green-600" },
    },
    {
      id: "4",
      type: "info",
      category: "subscription",
      title: "Subscription Renewal",
      message: "Netflix subscription will renew tomorrow for ₹649",
      time: "Yesterday",
      isRead: false,
      icon: Repeat,
      colors: { bg: "bg-purple-100", text: "text-purple-600" },
    },
    {
      id: "5",
      type: "success",
      category: "transaction",
      title: "Salary Credited",
      message: "₹75,000 credited to HDFC Bank account",
      time: "2 days ago",
      isRead: true,
      icon: CheckCircle,
      colors: { bg: "bg-blue-100", text: "text-blue-600" },
    },
    {
      id: "6",
      type: "alert",
      category: "budget",
      title: "Shopping Budget Exceeded",
      message: "You've exceeded your Shopping budget by ₹1,200",
      time: "3 days ago",
      isRead: true,
      icon: TrendingDown,
      colors: { bg: "bg-red-100", text: "text-red-600" },
    },
    {
      id: "7",
      type: "reminder",
      category: "bill",
      title: "Credit Card Payment",
      message: "ICICI Credit Card payment of ₹8,450 is due tomorrow",
      time: "3 days ago",
      isRead: true,
      icon: CreditCard,
      colors: { bg: "bg-yellow-100", text: "text-yellow-600" },
    },
    {
      id: "8",
      type: "info",
      category: "general",
      title: "New Feature Available",
      message: "Try our new bill splitting feature with friends!",
      time: "1 week ago",
      isRead: true,
      icon: Gift,
      colors: { bg: "bg-pink-100", text: "text-pink-600" },
    },
  ];

  const filteredNotifications = selectedTab === "all" 
    ? notifications 
    : notifications.filter(n => !n.isRead);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl">Notifications</h1>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Filter Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTab("all")}
            className={`flex-1 px-3 py-2 rounded-xl transition-all text-sm ${
              selectedTab === "all"
                ? "bg-blue-100 text-blue-600 shadow-sm"
                : "bg-muted text-muted-foreground"
            }`}
          >
            All Notifications ({notifications.length})
          </button>
          <button
            onClick={() => setSelectedTab("unread")}
            className={`flex-1 px-3 py-2 rounded-xl transition-all text-sm ${
              selectedTab === "unread"
                ? "bg-orange-100 text-orange-600 shadow-sm"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Summary Card */}
        {unreadCount > 0 && (
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-orange-100">
                  <Bell className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-orange-900 mb-1">
                    You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </h3>
                  <p className="text-sm text-orange-700">
                    Stay on top of your finances with timely alerts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 rounded-full bg-muted">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">No Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      You're all caught up!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`cursor-pointer hover:shadow-md transition-all ${
                    !notification.isRead ? "border-l-4 border-l-blue-500" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className={`p-3 rounded-full ${notification.colors.bg} flex-shrink-0 self-start`}>
                        <Icon className={`h-5 w-5 ${notification.colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`font-medium ${!notification.isRead ? "" : "text-muted-foreground"}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className={`text-sm mb-2 ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${notification.colors.bg} ${notification.colors.text}`}>
                            {notification.category.charAt(0).toUpperCase() + notification.category.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Mark All as Read */}
        {unreadCount > 0 && (
          <button className="w-full p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
            Mark all as read
          </button>
        )}
      </div>
    </div>
  );
}
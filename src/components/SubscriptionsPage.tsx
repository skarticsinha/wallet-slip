import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Film,
  Music,
  Smartphone,
  Cloud,
  Dumbbell,
  BookOpen,
  Wifi,
  Package,
  MoreHorizontal,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

interface SubscriptionsPageProps {
  onBack: () => void;
}

const subscriptionIcons = {
  entertainment: Film,
  music: Music,
  software: Smartphone,
  storage: Cloud,
  fitness: Dumbbell,
  education: BookOpen,
  utility: Wifi,
  delivery: Package,
  other: MoreHorizontal,
};

const subscriptionColors = {
  entertainment: { bg: "bg-red-100", text: "text-red-600" },
  music: { bg: "bg-purple-100", text: "text-purple-600" },
  software: { bg: "bg-blue-100", text: "text-blue-600" },
  storage: { bg: "bg-indigo-100", text: "text-indigo-600" },
  fitness: { bg: "bg-green-100", text: "text-green-600" },
  education: { bg: "bg-orange-100", text: "text-orange-600" },
  utility: { bg: "bg-teal-100", text: "text-teal-600" },
  delivery: { bg: "bg-pink-100", text: "text-pink-600" },
  other: { bg: "bg-gray-100", text: "text-gray-600" },
};

export function SubscriptionsPage({ onBack }: SubscriptionsPageProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const subscriptions = [
    {
      id: "1",
      name: "Netflix",
      category: "entertainment",
      amount: 649,
      billingCycle: "monthly",
      nextBilling: "2024-12-05",
      daysUntilBilling: 5,
      isActive: true,
    },
    {
      id: "2",
      name: "Spotify Premium",
      category: "music",
      amount: 119,
      billingCycle: "monthly",
      nextBilling: "2024-12-15",
      daysUntilBilling: 15,
      isActive: true,
    },
    {
      id: "3",
      name: "Amazon Prime",
      category: "delivery",
      amount: 1499,
      billingCycle: "yearly",
      nextBilling: "2025-03-20",
      daysUntilBilling: 111,
      isActive: true,
    },
    {
      id: "4",
      name: "Google One Storage",
      category: "storage",
      amount: 130,
      billingCycle: "monthly",
      nextBilling: "2024-12-10",
      daysUntilBilling: 10,
      isActive: true,
    },
    {
      id: "5",
      name: "Gym Membership",
      category: "fitness",
      amount: 2000,
      billingCycle: "monthly",
      nextBilling: "2024-12-01",
      daysUntilBilling: 1,
      isActive: true,
    },
    {
      id: "6",
      name: "YouTube Premium",
      category: "entertainment",
      amount: 129,
      billingCycle: "monthly",
      nextBilling: "2024-11-25",
      daysUntilBilling: -5,
      isActive: false,
    },
  ];

  const activeSubscriptions = subscriptions.filter((s) => s.isActive);
  const inactiveSubscriptions = subscriptions.filter((s) => !s.isActive);
  
  const monthlyTotal = activeSubscriptions
    .filter((s) => s.billingCycle === "monthly")
    .reduce((sum, s) => sum + s.amount, 0);
  
  const yearlyTotal = activeSubscriptions
    .filter((s) => s.billingCycle === "yearly")
    .reduce((sum, s) => sum + s.amount, 0);

  const totalMonthlyEquivalent = monthlyTotal + (yearlyTotal / 12);

  const filteredSubscriptions = selectedFilter === "all" 
    ? subscriptions 
    : selectedFilter === "active"
    ? activeSubscriptions
    : inactiveSubscriptions;

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
          <h1 className="text-xl">Subscriptions</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-semibold">{activeSubscriptions.length}</div>
              <div className="text-xs opacity-90 mt-0.5">Active</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-lg font-semibold">₹{monthlyTotal.toLocaleString("en-IN")}</div>
              <div className="text-xs opacity-90 mt-0.5">Monthly</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-lg font-semibold">₹{yearlyTotal.toLocaleString("en-IN")}</div>
              <div className="text-xs opacity-90 mt-0.5">Yearly</div>
            </CardContent>
          </Card>
        </div>

        {/* Total Cost Card */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Monthly Cost</div>
            <div className="text-3xl font-semibold text-orange-600 mb-2">
              ₹{Math.round(totalMonthlyEquivalent).toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-muted-foreground">
              Including prorated yearly subscriptions
            </div>
          </CardContent>
        </Card>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All ({subscriptions.length})
          </button>
          <button
            onClick={() => setSelectedFilter("active")}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedFilter === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Active ({activeSubscriptions.length})
          </button>
          <button
            onClick={() => setSelectedFilter("inactive")}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedFilter === "inactive"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Inactive ({inactiveSubscriptions.length})
          </button>
        </div>

        {/* Subscriptions List */}
        <div className="space-y-3">
          {filteredSubscriptions.map((subscription) => {
            const Icon = subscriptionIcons[subscription.category as keyof typeof subscriptionIcons] || MoreHorizontal;
            const colors = subscriptionColors[subscription.category as keyof typeof subscriptionColors] || subscriptionColors.other;
            const isDueSoon = subscription.daysUntilBilling <= 3 && subscription.daysUntilBilling >= 0;
            const isOverdue = subscription.daysUntilBilling < 0;

            return (
              <Card
                key={subscription.id}
                className={`cursor-pointer hover:shadow-md transition-all ${
                  !subscription.isActive ? "opacity-60" : ""
                } ${isDueSoon ? "border-orange-300" : ""} ${isOverdue ? "border-red-300" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-full ${colors.bg}`}>
                        <Icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{subscription.name}</h3>
                          {!subscription.isActive && (
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                              Inactive
                            </span>
                          )}
                          {isDueSoon && subscription.isActive && (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">
                              Due Soon
                            </span>
                          )}
                          {isOverdue && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                              Overdue
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground capitalize mt-0.5">
                          {subscription.category} • {subscription.billingCycle}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{subscription.amount}</div>
                      <div className="text-xs text-muted-foreground">
                        /{subscription.billingCycle === "monthly" ? "mo" : "yr"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {isOverdue 
                          ? `Overdue by ${Math.abs(subscription.daysUntilBilling)} days`
                          : subscription.daysUntilBilling === 0
                          ? "Due today"
                          : subscription.daysUntilBilling === 1
                          ? "Due tomorrow"
                          : `Due in ${subscription.daysUntilBilling} days`
                        }
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {subscription.nextBilling}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        {activeSubscriptions.some((s) => s.daysUntilBilling <= 3 && s.daysUntilBilling >= 0) && (
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-orange-100">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-orange-900 mb-1">Upcoming Renewals</h3>
                  <p className="text-sm text-orange-700">
                    You have {activeSubscriptions.filter((s) => s.daysUntilBilling <= 3 && s.daysUntilBilling >= 0).length} subscription(s) renewing in the next 3 days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* FAB */}
      <button className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}

import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Home as HomeIcon,
  Zap,
  Wifi,
  Smartphone,
  GraduationCap,
  CreditCard,
  Building2,
  Heart,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface ScheduledPaymentsPageProps {
  onBack: () => void;
}

const paymentIcons = {
  rent: HomeIcon,
  utilities: Zap,
  internet: Wifi,
  mobile: Smartphone,
  education: GraduationCap,
  credit: CreditCard,
  loan: Building2,
  insurance: Heart,
  other: MoreHorizontal,
};

const paymentColors = {
  rent: { bg: "bg-blue-100", text: "text-blue-600" },
  utilities: { bg: "bg-purple-100", text: "text-purple-600" },
  internet: { bg: "bg-indigo-100", text: "text-indigo-600" },
  mobile: { bg: "bg-green-100", text: "text-green-600" },
  education: { bg: "bg-orange-100", text: "text-orange-600" },
  credit: { bg: "bg-pink-100", text: "text-pink-600" },
  loan: { bg: "bg-teal-100", text: "text-teal-600" },
  insurance: { bg: "bg-red-100", text: "text-red-600" },
  other: { bg: "bg-gray-100", text: "text-gray-600" },
};

export function ScheduledPaymentsPage({ onBack }: ScheduledPaymentsPageProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const scheduledPayments = [
    {
      id: "1",
      name: "Rent Payment",
      category: "rent",
      amount: 25000,
      frequency: "monthly",
      scheduledDate: "2024-12-01",
      daysUntil: 1,
      status: "pending",
      autoDebit: true,
    },
    {
      id: "2",
      name: "Electricity Bill",
      category: "utilities",
      amount: 2500,
      frequency: "monthly",
      scheduledDate: "2024-12-05",
      daysUntil: 5,
      status: "pending",
      autoDebit: true,
    },
    {
      id: "3",
      name: "Internet Bill",
      category: "internet",
      amount: 999,
      frequency: "monthly",
      scheduledDate: "2024-12-10",
      daysUntil: 10,
      status: "pending",
      autoDebit: false,
    },
    {
      id: "4",
      name: "Mobile Recharge",
      category: "mobile",
      amount: 599,
      frequency: "monthly",
      scheduledDate: "2024-12-15",
      daysUntil: 15,
      status: "pending",
      autoDebit: false,
    },
    {
      id: "5",
      name: "Credit Card Payment",
      category: "credit",
      amount: 15000,
      frequency: "monthly",
      scheduledDate: "2024-12-20",
      daysUntil: 20,
      status: "pending",
      autoDebit: true,
    },
    {
      id: "6",
      name: "Health Insurance Premium",
      category: "insurance",
      amount: 4500,
      frequency: "quarterly",
      scheduledDate: "2025-01-01",
      daysUntil: 32,
      status: "pending",
      autoDebit: true,
    },
    {
      id: "7",
      name: "Water Bill",
      category: "utilities",
      amount: 450,
      frequency: "monthly",
      scheduledDate: "2024-11-28",
      daysUntil: -2,
      status: "completed",
      autoDebit: true,
    },
  ];

  const pendingPayments = scheduledPayments.filter((p) => p.status === "pending");
  const completedPayments = scheduledPayments.filter((p) => p.status === "completed");
  const dueSoonPayments = pendingPayments.filter((p) => p.daysUntil <= 7 && p.daysUntil >= 0);

  const totalUpcoming = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = selectedFilter === "all" 
    ? scheduledPayments 
    : selectedFilter === "pending"
    ? pendingPayments
    : completedPayments;

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
          <h1 className="text-xl">Scheduled Payments</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-semibold">{pendingPayments.length}</div>
              <div className="text-xs opacity-90 mt-0.5">Pending</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-semibold">{dueSoonPayments.length}</div>
              <div className="text-xs opacity-90 mt-0.5">Due Soon</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-semibold">{completedPayments.length}</div>
              <div className="text-xs opacity-90 mt-0.5">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Total Upcoming Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Upcoming Payments</div>
            <div className="text-3xl font-semibold text-purple-600 mb-2">
              ₹{totalUpcoming.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-muted-foreground">
              {pendingPayments.length} payment{pendingPayments.length !== 1 ? 's' : ''} scheduled
            </div>
          </CardContent>
        </Card>

        {/* Due Soon Warning */}
        {dueSoonPayments.length > 0 && (
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-orange-100">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-orange-900 mb-1">Payments Due Soon</h3>
                  <p className="text-sm text-orange-700">
                    You have {dueSoonPayments.length} payment{dueSoonPayments.length !== 1 ? 's' : ''} due within the next 7 days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
            All ({scheduledPayments.length})
          </button>
          <button
            onClick={() => setSelectedFilter("pending")}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedFilter === "pending"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Pending ({pendingPayments.length})
          </button>
          <button
            onClick={() => setSelectedFilter("completed")}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedFilter === "completed"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Completed ({completedPayments.length})
          </button>
        </div>

        {/* Payments List */}
        <div className="space-y-3">
          {filteredPayments.map((payment) => {
            const Icon = paymentIcons[payment.category as keyof typeof paymentIcons] || MoreHorizontal;
            const colors = paymentColors[payment.category as keyof typeof paymentColors] || paymentColors.other;
            const isDueSoon = payment.daysUntil <= 3 && payment.daysUntil >= 0 && payment.status === "pending";
            const isCompleted = payment.status === "completed";

            return (
              <Card
                key={payment.id}
                className={`cursor-pointer hover:shadow-md transition-all ${
                  isCompleted ? "bg-green-50 border-green-200" : ""
                } ${isDueSoon ? "border-orange-300" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-full ${colors.bg}`}>
                        <Icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{payment.name}</h3>
                          {isCompleted && (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          )}
                          {isDueSoon && (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">
                              Due Soon
                            </span>
                          )}
                          {payment.autoDebit && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                              Auto
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground capitalize mt-0.5">
                          {payment.category} • {payment.frequency}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{payment.amount.toLocaleString("en-IN")}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">Completed</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4" />
                          <span>
                            {payment.daysUntil === 0
                              ? "Due today"
                              : payment.daysUntil === 1
                              ? "Due tomorrow"
                              : payment.daysUntil < 0
                              ? `Overdue by ${Math.abs(payment.daysUntil)} days`
                              : `Due in ${payment.daysUntil} days`
                            }
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{payment.scheduledDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}

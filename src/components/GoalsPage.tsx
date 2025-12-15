import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Target,
  Home as HomeIcon,
  Plane,
  Car as CarIcon,
  GraduationCap,
  Heart,
  Trophy,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

interface GoalsPageProps {
  onBack: () => void;
}

const goalTypes = [
  { id: "house", name: "House", icon: HomeIcon, colors: { bg: "bg-blue-100", text: "text-blue-600" } },
  { id: "vacation", name: "Vacation", icon: Plane, colors: { bg: "bg-green-100", text: "text-green-600" } },
  { id: "car", name: "Car", icon: CarIcon, colors: { bg: "bg-purple-100", text: "text-purple-600" } },
  { id: "education", name: "Education", icon: GraduationCap, colors: { bg: "bg-orange-100", text: "text-orange-600" } },
  { id: "wedding", name: "Wedding", icon: Heart, colors: { bg: "bg-pink-100", text: "text-pink-600" } },
  { id: "emergency", name: "Emergency", icon: Target, colors: { bg: "bg-red-100", text: "text-red-600" } },
  { id: "dream", name: "Dream", icon: Sparkles, colors: { bg: "bg-indigo-100", text: "text-indigo-600" } },
  { id: "other", name: "Other", icon: MoreHorizontal, colors: { bg: "bg-gray-100", text: "text-gray-600" } },
];

export function GoalsPage({ onBack }: GoalsPageProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const goals = [
    {
      id: "1",
      name: "Trip Savings Jar",
      type: "vacation",
      targetAmount: 43200,
      currentAmount: 44955,
      deadline: "Dec 2024",
      isCompleted: true,
    },
    {
      id: "2",
      name: "Emergency Fund",
      type: "emergency",
      targetAmount: 500000,
      currentAmount: 325000,
      deadline: "Jun 2025",
      isCompleted: false,
    },
    {
      id: "3",
      name: "New Laptop",
      type: "dream",
      targetAmount: 120000,
      currentAmount: 45000,
      deadline: "Mar 2025",
      isCompleted: false,
    },
    {
      id: "4",
      name: "Home Down Payment",
      type: "house",
      targetAmount: 2000000,
      currentAmount: 850000,
      deadline: "Dec 2026",
      isCompleted: false,
    },
  ];

  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const completedGoals = goals.filter((g) => g.isCompleted).length;

  const filteredGoals = selectedFilter === "all" 
    ? goals 
    : selectedFilter === "active"
    ? goals.filter((g) => !g.isCompleted)
    : goals.filter((g) => g.isCompleted);

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
          <h1 className="text-xl">Goals</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-semibold">{goals.length}</div>
              <div className="text-xs opacity-90 mt-0.5">Total Goals</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-semibold">{completedGoals}</div>
              <div className="text-xs opacity-90 mt-0.5">Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-semibold">{goals.length - completedGoals}</div>
              <div className="text-xs opacity-90 mt-0.5">Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Total Progress Card */}
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-muted-foreground">Total Saved</div>
                <div className="text-2xl font-semibold text-indigo-600">
                  ₹{totalSaved.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Target</div>
                <div className="text-xl">₹{totalTarget.toLocaleString("en-IN")}</div>
              </div>
            </div>
            <Progress 
              value={(totalSaved / totalTarget) * 100} 
              className="h-2.5 bg-indigo-200"
            />
            <div className="text-xs text-muted-foreground mt-2">
              {((totalSaved / totalTarget) * 100).toFixed(1)}% achieved
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
            All ({goals.length})
          </button>
          <button
            onClick={() => setSelectedFilter("active")}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedFilter === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Active ({goals.length - completedGoals})
          </button>
          <button
            onClick={() => setSelectedFilter("completed")}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedFilter === "completed"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Completed ({completedGoals})
          </button>
        </div>

        {/* Goals List */}
        <div className="space-y-3">
          {filteredGoals.map((goal) => {
            const goalType = goalTypes.find((t) => t.id === goal.type) || goalTypes[0];
            const Icon = goalType.icon;
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const isOverAchieved = progress > 100;
            const remaining = goal.targetAmount - goal.currentAmount;

            return (
              <Card
                key={goal.id}
                className={`cursor-pointer hover:shadow-md transition-all ${
                  goal.isCompleted ? "bg-green-50 border-green-200" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-3 rounded-full ${goalType.colors.bg}`}>
                      <Icon className={`h-5 w-5 ${goalType.colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{goal.name}</h3>
                        {goal.isCompleted && (
                          <div className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">
                            Completed
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Deadline: {goal.deadline}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className={isOverAchieved ? "text-green-600 font-medium" : ""}>
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(progress, 100)} 
                      className={`h-2 ${
                        goal.isCompleted 
                          ? "bg-green-200" 
                          : isOverAchieved 
                          ? "bg-green-200" 
                          : ""
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Saved</div>
                        <div className="font-medium text-green-600">
                          ₹{goal.currentAmount.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {remaining > 0 ? "Remaining" : "Over"}
                        </div>
                        <div className={`font-medium ${remaining > 0 ? "" : "text-green-600"}`}>
                          ₹{Math.abs(remaining).toLocaleString("en-IN")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Target</div>
                        <div className="font-medium">
                          ₹{goal.targetAmount.toLocaleString("en-IN")}
                        </div>
                      </div>
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

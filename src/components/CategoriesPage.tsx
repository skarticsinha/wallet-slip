import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  ShoppingCart,
  Coffee,
  Car,
  Home as HomeIcon,
  Zap,
  Heart,
  Smartphone,
  GraduationCap,
  Plane,
  Film,
  Dumbbell,
  ShoppingBag,
  Gift,
  MoreHorizontal,
  TrendingUp,
  Building2,
  Edit3,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface CategoriesPageProps {
  onBack: () => void;
}

export function CategoriesPage({ onBack }: CategoriesPageProps) {
  const [selectedTab, setSelectedTab] = useState<"expense" | "income">("expense");

  const expenseCategories = [
    { id: "groceries", name: "Groceries", icon: ShoppingCart, colors: { bg: "bg-green-100", text: "text-green-600" }, transactionCount: 45, isCustom: false },
    { id: "food", name: "Food & Dining", icon: Coffee, colors: { bg: "bg-orange-100", text: "text-orange-600" }, transactionCount: 38, isCustom: false },
    { id: "transport", name: "Transport", icon: Car, colors: { bg: "bg-blue-100", text: "text-blue-600" }, transactionCount: 52, isCustom: false },
    { id: "bills", name: "Bills & Utilities", icon: Zap, colors: { bg: "bg-purple-100", text: "text-purple-600" }, transactionCount: 12, isCustom: false },
    { id: "shopping", name: "Shopping", icon: ShoppingBag, colors: { bg: "bg-pink-100", text: "text-pink-600" }, transactionCount: 28, isCustom: false },
    { id: "entertainment", name: "Entertainment", icon: Film, colors: { bg: "bg-indigo-100", text: "text-indigo-600" }, transactionCount: 15, isCustom: false },
    { id: "health", name: "Health & Fitness", icon: Heart, colors: { bg: "bg-red-100", text: "text-red-600" }, transactionCount: 8, isCustom: false },
    { id: "education", name: "Education", icon: GraduationCap, colors: { bg: "bg-yellow-100", text: "text-yellow-600" }, transactionCount: 5, isCustom: false },
    { id: "travel", name: "Travel", icon: Plane, colors: { bg: "bg-teal-100", text: "text-teal-600" }, transactionCount: 12, isCustom: true },
    { id: "gifts", name: "Gifts & Donations", icon: Gift, colors: { bg: "bg-rose-100", text: "text-rose-600" }, transactionCount: 6, isCustom: true },
    { id: "gym", name: "Gym Membership", icon: Dumbbell, colors: { bg: "bg-emerald-100", text: "text-emerald-600" }, transactionCount: 3, isCustom: true },
  ];

  const incomeCategories = [
    { id: "salary", name: "Salary", icon: TrendingUp, colors: { bg: "bg-green-100", text: "text-green-600" }, transactionCount: 12, isCustom: false },
    { id: "business", name: "Business", icon: Building2, colors: { bg: "bg-blue-100", text: "text-blue-600" }, transactionCount: 8, isCustom: false },
    { id: "investment", name: "Investment", icon: TrendingUp, colors: { bg: "bg-purple-100", text: "text-purple-600" }, transactionCount: 5, isCustom: false },
    { id: "freelance", name: "Freelance", icon: Smartphone, colors: { bg: "bg-indigo-100", text: "text-indigo-600" }, transactionCount: 15, isCustom: true },
    { id: "gift", name: "Gift Received", icon: Heart, colors: { bg: "bg-pink-100", text: "text-pink-600" }, transactionCount: 3, isCustom: false },
    { id: "other", name: "Other Income", icon: MoreHorizontal, colors: { bg: "bg-gray-100", text: "text-gray-600" }, transactionCount: 7, isCustom: true },
  ];

  const currentCategories = selectedTab === "expense" ? expenseCategories : incomeCategories;

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
          <h1 className="text-xl">Categories</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Type Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTab("expense")}
            className={`flex-1 px-3 py-2 rounded-xl transition-all text-sm ${
              selectedTab === "expense"
                ? "bg-red-100 text-red-600 shadow-sm"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Expense Categories ({expenseCategories.length})
          </button>
          <button
            onClick={() => setSelectedTab("income")}
            className={`flex-1 px-3 py-2 rounded-xl transition-all text-sm ${
              selectedTab === "income"
                ? "bg-green-100 text-green-600 shadow-sm"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Income Categories ({incomeCategories.length})
          </button>
        </div>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <MoreHorizontal className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 mb-1">Organize Your Finances</h3>
                <p className="text-sm text-blue-700">
                  Create custom categories to better track your spending and income patterns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Default Categories Section */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Default Categories</h3>
          <div className="space-y-2">
            {currentCategories.filter((c) => !c.isCustom).map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full ${category.colors.bg}`}>
                          <Icon className={`h-5 w-5 ${category.colors.text}`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            {category.transactionCount} transaction{category.transactionCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-full transition-colors">
                          <Edit3 className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Custom Categories Section */}
        {currentCategories.some((c) => c.isCustom) && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Custom Categories</h3>
            <div className="space-y-2">
              {currentCategories.filter((c) => c.isCustom).map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.id} className="cursor-pointer hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-full ${category.colors.bg}`}>
                            <Icon className={`h-5 w-5 ${category.colors.text}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{category.name}</h3>
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                                Custom
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {category.transactionCount} transaction{category.transactionCount !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-muted rounded-full transition-colors">
                            <Edit3 className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* FAB */}
      <button className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
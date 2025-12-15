import { Card, CardContent } from "./ui/card";
import { ShoppingCart, Utensils, Car, Home, Zap, Heart, ArrowRight } from "lucide-react";

interface Budget {
  id: string;
  category: string;
  icon: any;
  spent: number;
  limit: number;
  color: string;
  bgColor: string;
}

interface BudgetCardsHorizontalProps {
  onViewAll?: () => void;
}

export function BudgetCardsHorizontal({ onViewAll }: BudgetCardsHorizontalProps) {
  const budgets: Budget[] = [
    {
      id: "1",
      category: "Groceries",
      icon: ShoppingCart,
      spent: 8500,
      limit: 12000,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "2",
      category: "Food & Dining",
      icon: Utensils,
      spent: 6200,
      limit: 8000,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: "3",
      category: "Transport",
      icon: Car,
      spent: 4500,
      limit: 5000,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: "4",
      category: "Bills",
      icon: Zap,
      spent: 12000,
      limit: 15000,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "5",
      category: "Healthcare",
      icon: Heart,
      spent: 3500,
      limit: 5000,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      id: "6",
      category: "Housing",
      icon: Home,
      spent: 25000,
      limit: 30000,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="pb-4">
      <div className="flex items-center justify-between mb-3 px-4">
        <h3 className="text-muted-foreground">Budget Tracking</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View All
            <ArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 pb-2">
        {budgets.map((budget) => {
          const Icon = budget.icon;
          const percentage = (budget.spent / budget.limit) * 100;
          const isOverBudget = percentage > 100;

          return (
            <Card 
              key={budget.id} 
              className="flex-shrink-0 w-[170px] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-full ${budget.bgColor}`}>
                    <Icon className={`h-4 w-4 ${budget.color}`} />
                  </div>
                  <span className="text-sm font-medium truncate">{budget.category}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      ₹{(budget.spent / 1000).toFixed(1)}k
                    </span>
                    <span className="text-muted-foreground">
                      ₹{(budget.limit / 1000).toFixed(1)}k
                    </span>
                  </div>

                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isOverBudget
                          ? "bg-red-500"
                          : budget.color.replace('text-', 'bg-')
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-semibold ${isOverBudget ? 'text-red-600' : budget.color}`}>
                      {percentage.toFixed(0)}%
                    </span>
                    {isOverBudget && (
                      <span className="text-xs text-red-600 font-medium">
                        Over!
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

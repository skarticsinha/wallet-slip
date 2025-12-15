import { Target, TrendingUp, AlertTriangle, ChevronDown, ChevronUp, PieChart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { useState } from "react";

interface BudgetCategory {
  category: string;
  budget: number;
  spent: number;
  icon: React.ComponentType<{ className?: string }>;
}

const budgetData: BudgetCategory[] = [
  {
    category: "Food & Dining",
    budget: 15000,
    spent: 8450,
    icon: Target,
  },
  {
    category: "Transportation",
    budget: 8000,
    spent: 6200,
    icon: TrendingUp,
  },
  {
    category: "Shopping",
    budget: 12000,
    spent: 14500,
    icon: AlertTriangle,
  },
  {
    category: "Bills & Utilities",
    budget: 20000,
    spent: 18200,
    icon: Target,
  },
];

export function BudgetTracker() {
  const [showDistribution, setShowDistribution] = useState(false);
  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-muted-foreground mb-2">Monthly Budget</h3>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-2xl text-blue-900">₹{remainingBudget.toLocaleString('en-IN')}</div>
                <div className="text-sm text-blue-700">Remaining this month</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">₹{totalSpent.toLocaleString('en-IN')} of ₹{totalBudget.toLocaleString('en-IN')}</div>
                <div className="text-xs text-blue-600">
                  {Math.round((totalSpent / totalBudget) * 100)}% used
                </div>
              </div>
            </div>
            <Progress 
              value={(totalSpent / totalBudget) * 100} 
              className="h-2"
            />
            
            {/* Category Budget Breakdown Dropdown */}
            <div className="mt-3 border-t border-blue-200 pt-3">
              <button
                onClick={() => setShowDistribution(!showDistribution)}
                className="flex items-center justify-between w-full text-sm text-blue-700 hover:text-blue-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Category Breakdown</span>
                </div>
                {showDistribution ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              
              {showDistribution && (
                <div className="mt-3 space-y-3">
                  {budgetData.map((item) => {
                    const percentage = (item.spent / item.budget) * 100;
                    const isOverBudget = item.spent > item.budget;
                    
                    return (
                      <div key={item.category} className="bg-white/50 rounded-lg p-3 border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <item.icon className={`h-4 w-4 ${isOverBudget ? 'text-red-500' : 'text-blue-600'}`} />
                            <span className="text-sm font-medium text-blue-900">{item.category}</span>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-blue-900'}`}>
                              ₹{item.spent.toLocaleString('en-IN')}
                            </div>
                            <div className="text-xs text-blue-700">
                              of ₹{item.budget.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-1.5"
                        />
                        {isOverBudget && (
                          <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Over budget by ₹{(item.spent - item.budget).toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { Card, CardContent } from "./ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface IncomeExpenseCardsProps {
  income: number;
  expense: number;
  savingsRate: string;
}

export function IncomeExpenseCards({ income, expense, savingsRate }: IncomeExpenseCardsProps) {
  return (
    <div className="px-4 pb-4">
      <h3 className="mb-3 text-muted-foreground">This Month</h3>
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-full bg-green-100">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-900">Income</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              ₹{income.toLocaleString('en-IN')}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-full bg-red-100">
                <TrendingDown className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm font-medium text-red-900">Expense</span>
            </div>
            <p className="text-2xl font-bold text-red-600">
              ₹{expense.toLocaleString('en-IN')}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Savings Summary */}
      <Card className="mt-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
             <div>
                <p className="text-sm text-blue-900 mb-1">Savings Rate</p>
                <p className="text-xl font-bold text-blue-600">{savingsRate}%</p>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
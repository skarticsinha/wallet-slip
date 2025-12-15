import { ArrowLeft, Edit, RotateCcw, Plus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

interface BudgetsPageProps {
  onBack: () => void;
}

export function BudgetsPage({ onBack }: BudgetsPageProps) {
  const budgets = [
    {
      id: "1",
      title: "Monthly Spending",
      amount: 29.71,
      total: 431.30,
      status: "overspent",
      percentage: 107,
      startDate: "Nov 1",
      endDate: "Tomorrow",
      daysRemaining: 2,
      canSpend: 461,
      color: "from-indigo-300 via-indigo-200 to-indigo-100",
      barColor: "bg-indigo-500",
      textColor: "text-indigo-900",
    },
    {
      id: "2",
      title: "Vacation",
      amount: 1168.81,
      total: 2156.48,
      status: "remaining",
      percentage: 46,
      startDate: "Nov 11",
      endDate: "Dec 2",
      daysRemaining: 4,
      canSpend: 292.20,
      color: "from-rose-300 via-rose-200 to-rose-100",
      barColor: "bg-rose-500",
      textColor: "text-rose-900",
    },
  ];

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
          <h1 className="text-xl">Budgets</h1>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Edit className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Budgets List */}
      <div className="p-4 space-y-4">
        {budgets.map((budget) => {
          const isOverspent = budget.status === "overspent";
          
          return (
            <div key={budget.id} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {/* Header Section */}
              <div className={`bg-gradient-to-br ${budget.color} p-5`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className={`text-lg mb-1 ${budget.textColor}`}>
                      {budget.title}
                    </h3>
                    <div className={`text-2xl ${budget.textColor}`}>
                      €{budget.amount}
                      <span className="text-base opacity-80 ml-1">
                        {isOverspent ? 'overspent' : 'left'} of €{budget.total}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Progress Section */}
              <div className="bg-white p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{budget.startDate}</span>
                  <span>{budget.endDate}</span>
                </div>

                <div className="relative mb-3">
                  {/* Progress Bar */}
                  <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${budget.barColor} transition-all`}
                      style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                    />
                  </div>
                  {/* Percentage Text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white pointer-events-none">
                    {budget.percentage}%
                  </div>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  {isOverspent 
                    ? `€${budget.amount} / €${budget.total} for ${budget.daysRemaining} more days`
                    : `You can spend €${budget.canSpend}/day for ${budget.daysRemaining} more days`
                  }
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Budget Card */}
        <Card className="border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 hover:bg-muted/30 transition-colors">
          <CardContent className="p-16 flex items-center justify-center">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Plus className="h-8 w-8" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* FAB */}
      <button className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
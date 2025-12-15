import { ArrowDownLeft, ArrowUpRight, IndianRupee } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function BalanceSummary() {
  return (
    <div className="p-4 space-y-4">
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="h-5 w-5" />
            <span className="text-sm opacity-90">Current Balance</span>
          </div>
          <div className="text-3xl mb-4">₹2,35,975</div>
          <div className="flex justify-between text-sm">
            <span className="opacity-90">vs last month</span>
            <span className="text-green-200">+12.5%</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownLeft className="h-4 w-4 text-red-500" />
              <span className="text-sm text-muted-foreground">Expenses</span>
            </div>
            <div className="text-xl">₹1,02,370</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Income</span>
            </div>
            <div className="text-xl">₹3,48,600</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
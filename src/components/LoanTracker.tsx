import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  HandCoins, TrendingUp, TrendingDown, User, Building2, Smartphone,
  Calendar, Plus, ChevronRight 
} from "lucide-react";

export interface Loan {
  id: string;
  type: "lent" | "borrowed";
  amount: number;
  person: string;
  personType: "person" | "bank" | "online";
  reason: string;
  date: string;
  dueDate?: string;
  status: "pending" | "partial" | "completed";
  paidAmount: number;
  note?: string;
}

interface LoanTrackerProps {
  loans: Loan[];
  onAddLoan: () => void;
  onLoanClick?: (loan: Loan) => void;
  onViewAll?: () => void;
}

const personTypeIcons = {
  person: User,
  bank: Building2,
  online: Smartphone,
};

export function LoanTracker({ loans, onAddLoan, onLoanClick, onViewAll }: LoanTrackerProps) {
  const lentLoans = loans.filter(loan => loan.type === "lent");
  const borrowedLoans = loans.filter(loan => loan.type === "borrowed");

  const totalLent = lentLoans.reduce((sum, loan) => sum + (loan.amount - loan.paidAmount), 0);
  const totalBorrowed = borrowedLoans.reduce((sum, loan) => sum + (loan.amount - loan.paidAmount), 0);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-muted-foreground">Loans & Debts</h3>
        <Button variant="ghost" size="sm" className="text-primary" onClick={onAddLoan}>
          <Plus className="h-4 w-4 mr-1" />
          Add Loan
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-green-200 via-green-100 to-green-50 border-none">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-green-300/50">
                <TrendingUp className="h-4 w-4 text-green-700" />
              </div>
              <span className="text-xs">You'll Receive</span>
            </div>
            <div className="text-xl">₹{totalLent.toLocaleString()}</div>
            <p className="text-xs opacity-70">{lentLoans.length} loans</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-200 via-red-100 to-red-50 border-none">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-red-300/50">
                <TrendingDown className="h-4 w-4 text-red-700" />
              </div>
              <span className="text-xs">You Owe</span>
            </div>
            <div className="text-xl">₹{totalBorrowed.toLocaleString()}</div>
            <p className="text-xs opacity-70">{borrowedLoans.length} loans</p>
          </CardContent>
        </Card>
      </div>

      {/* Loan List */}
      {loans.length > 0 ? (
        <div className="space-y-3">
          {loans.slice(0, 3).map((loan) => {
            const Icon = personTypeIcons[loan.personType];
            const progress = (loan.paidAmount / loan.amount) * 100;
            const remaining = loan.amount - loan.paidAmount;

            return (
              <Card 
                key={loan.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onLoanClick?.(loan)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-full ${
                        loan.type === "lent" ? "bg-green-100" : "bg-red-100"
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          loan.type === "lent" ? "text-green-600" : "text-red-600"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{loan.person}</span>
                          {loan.type === "lent" ? (
                            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                              Lent
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs bg-red-500/10 text-red-600 border-red-500/20">
                              Borrowed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{loan.reason}</p>
                        {loan.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>Due: {loan.dueDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`${
                        loan.type === "lent" ? "text-green-600" : "text-red-600"
                      }`}>
                        ₹{remaining.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        of ₹{loan.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {loan.paidAmount > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Paid ₹{loan.paidAmount.toLocaleString()}</span>
                        <span>{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {loans.length > 3 && (
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={onViewAll}
            >
              View All Loans ({loans.length})
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
              <HandCoins className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              No loans tracked yet
            </p>
            <Button onClick={onAddLoan} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Loan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

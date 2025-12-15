import { useState } from "react";
import { ArrowLeft, Plus, TrendingUp, TrendingDown, User, Building2, Globe, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { LoanManager } from "./LoanManager";
import type { Loan } from "./LoanTracker";

interface LoansPageProps {
  onBack: () => void;
  loans: Loan[];
  onAddLoan: (loan: Omit<Loan, "id" | "status" | "paidAmount">) => void;
}

export function LoansPage({ onBack, loans, onAddLoan }: LoansPageProps) {
  const [loanManagerOpen, setLoanManagerOpen] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "lent" | "borrowed">("all");

  // Calculate totals
  const totalLent = loans
    .filter(loan => loan.type === "lent")
    .reduce((sum, loan) => sum + (loan.amount - loan.paidAmount), 0);

  const totalBorrowed = loans
    .filter(loan => loan.type === "borrowed")
    .reduce((sum, loan) => sum + (loan.amount - loan.paidAmount), 0);

  const netBalance = totalLent - totalBorrowed;

  // Filter loans
  const filteredLoans = filterType === "all" 
    ? loans 
    : loans.filter(loan => loan.type === filterType);

  const getPersonIcon = (personType: string) => {
    switch (personType) {
      case "bank":
        return Building2;
      case "online":
        return Globe;
      default:
        return User;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "partial":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  const getPersonTypeColor = (personType: string) => {
    switch (personType) {
      case "bank":
        return { bg: "bg-blue-100", text: "text-blue-600" };
      case "online":
        return { bg: "bg-purple-100", text: "text-purple-600" };
      default:
        return { bg: "bg-green-100", text: "text-green-600" };
    }
  };

  return (
    <>
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
            <h1 className="text-xl">Loans & Debts</h1>
            <button 
              className="p-2 hover:bg-muted rounded-full transition-colors"
              onClick={() => setLoanManagerOpen(true)}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="p-4 space-y-3">
          {/* Net Balance Card */}
          <Card className={`${
            netBalance >= 0 
              ? "bg-gradient-to-br from-green-200 via-green-100 to-green-50" 
              : "bg-gradient-to-br from-red-200 via-red-100 to-red-50"
          } border-none`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80 mb-1">Net Balance</p>
                  <div className="text-2xl">
                    {netBalance >= 0 ? "+" : "-"}₹{Math.abs(netBalance).toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs opacity-70 mt-1">
                    {netBalance >= 0 ? "You'll receive" : "You owe"}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  netBalance >= 0 ? "bg-green-300/50" : "bg-red-300/50"
                }`}>
                  {netBalance >= 0 ? (
                    <TrendingUp className="h-6 w-6" />
                  ) : (
                    <TrendingDown className="h-6 w-6" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lent and Borrowed Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 border-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-2 rounded-full bg-blue-300/50">
                    <TrendingUp className="h-4 w-4 text-blue-700" />
                  </div>
                  <p className="text-sm">Lent Out</p>
                </div>
                <div className="text-xl">
                  ₹{totalLent.toLocaleString('en-IN')}
                </div>
                <p className="text-xs opacity-70 mt-1">
                  {loans.filter(l => l.type === "lent").length} loans
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-200 via-orange-100 to-orange-50 border-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-2 rounded-full bg-orange-300/50">
                    <TrendingDown className="h-4 w-4 text-orange-700" />
                  </div>
                  <p className="text-sm">Borrowed</p>
                </div>
                <div className="text-xl">
                  ₹{totalBorrowed.toLocaleString('en-IN')}
                </div>
                <p className="text-xs opacity-70 mt-1">
                  {loans.filter(l => l.type === "borrowed").length} loans
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-4 pb-3">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-full transition-colors ${
              filterType === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            All ({loans.length})
          </button>
          <button
            onClick={() => setFilterType("lent")}
            className={`px-4 py-2 rounded-full transition-colors ${
              filterType === "lent"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Lent ({loans.filter(l => l.type === "lent").length})
          </button>
          <button
            onClick={() => setFilterType("borrowed")}
            className={`px-4 py-2 rounded-full transition-colors ${
              filterType === "borrowed"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Borrowed ({loans.filter(l => l.type === "borrowed").length})
          </button>
        </div>

        {/* Loans List */}
        <div className="px-4 pb-4 space-y-3">
          {filteredLoans.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No loans to display</p>
                <button
                  onClick={() => setLoanManagerOpen(true)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  Add Your First Loan
                </button>
              </CardContent>
            </Card>
          ) : (
            filteredLoans.map((loan) => {
              const PersonIcon = getPersonIcon(loan.personType);
              const personColors = getPersonTypeColor(loan.personType);
              const percentage = Math.round((loan.paidAmount / loan.amount) * 100);
              const remaining = loan.amount - loan.paidAmount;

              return (
                <Card key={loan.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-3 rounded-full ${personColors.bg} flex-shrink-0`}>
                        <PersonIcon className={`h-5 w-5 ${personColors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="truncate">{loan.person}</h3>
                            <p className="text-sm text-muted-foreground">{loan.reason}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={`font-medium ${
                              loan.type === "lent" ? "text-green-600" : "text-red-600"
                            }`}>
                              {loan.type === "lent" ? "+" : "-"}₹{remaining.toLocaleString('en-IN')}
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(loan.status)}`}>
                              {loan.status === "completed" ? "Completed" : loan.status === "partial" ? "Partial" : "Pending"}
                            </span>
                          </div>
                        </div>

                        {loan.status !== "completed" && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>₹{loan.paidAmount.toLocaleString('en-IN')} paid</span>
                              <span>₹{loan.amount.toLocaleString('en-IN')} total</span>
                            </div>
                            <Progress value={percentage} className="h-2 bg-gray-200" />
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <span>Due: {loan.dueDate}</span>
                          <span className="capitalize">{loan.personType}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* FAB */}
        <button 
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center"
          onClick={() => setLoanManagerOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Loan Manager Sheet */}
      <LoanManager
        open={loanManagerOpen}
        onOpenChange={setLoanManagerOpen}
        onAddLoan={onAddLoan}
      />
    </>
  );
}

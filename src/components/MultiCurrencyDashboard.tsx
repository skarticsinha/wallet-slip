import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { AccountManager } from "./AccountManager";
import { 
  Building2, CreditCard, Smartphone, Banknote, 
  ChevronRight, TrendingUp, TrendingDown, Circle 
} from "lucide-react";

export interface CurrencyAccount {
  id: string;
  name: string;
  balance: number;
  currency: string;
  currencySymbol: string;
  type: "bank" | "card" | "wallet" | "cash" | "crypto";
  transactionCount: number;
  color: string;
  isPrimary: boolean;
  inrEquivalent?: number; // For non-INR accounts
}

const mockAccounts: CurrencyAccount[] = [
  {
    id: "1",
    name: "HDFC Bank",
    balance: 235975,
    currency: "INR",
    currencySymbol: "₹",
    type: "bank",
    transactionCount: 142,
    color: "#8B5CF6",
    isPrimary: true,
  },
  {
    id: "2",
    name: "Euros",
    balance: 103,
    currency: "EUR",
    currencySymbol: "€",
    type: "cash",
    transactionCount: 5,
    color: "#10B981",
    isPrimary: false,
    inrEquivalent: 9590, // 103 EUR * ~93
  },
  {
    id: "3",
    name: "US Dollars",
    balance: 250,
    currency: "USD",
    currencySymbol: "$",
    type: "cash",
    transactionCount: 12,
    color: "#F59E0B",
    isPrimary: false,
    inrEquivalent: 20875, // 250 USD * ~83.5
  },
  {
    id: "4",
    name: "PhonePe Wallet",
    balance: 5430,
    currency: "INR",
    currencySymbol: "₹",
    type: "wallet",
    transactionCount: 87,
    color: "#6366F1",
    isPrimary: false,
  },
];

const accountTypeIcons = {
  bank: Building2,
  card: CreditCard,
  wallet: Smartphone,
  cash: Banknote,
  crypto: Circle,
};

const accountTypeColors = {
  bank: { bg: "bg-blue-100", text: "text-blue-600" },
  card: { bg: "bg-purple-100", text: "text-purple-600" },
  wallet: { bg: "bg-indigo-100", text: "text-indigo-600" },
  cash: { bg: "bg-green-100", text: "text-green-600" },
  crypto: { bg: "bg-orange-100", text: "text-orange-600" },
};

export function MultiCurrencyDashboard() {
  const [selectedAccountId, setSelectedAccountId] = useState(mockAccounts[0].id);
  const [accountManagerOpen, setAccountManagerOpen] = useState(false);
  
  // Calculate total balance in INR
  const totalInrBalance = mockAccounts.reduce((sum, acc) => {
    if (acc.currency === "INR") {
      return sum + acc.balance;
    }
    return sum + (acc.inrEquivalent || 0);
  }, 0);

  // Monthly spending data
  const monthlyBudget = 55000;
  const monthlySpent = 42350;
  const spentPercentage = (monthlySpent / monthlyBudget) * 100;
  const isOverspent = monthlySpent > monthlyBudget;
  const daysRemaining = 8;

  // Budget categories for horizontal scrolling
  const mockBudgets = [
    {
      id: "1",
      category: "Monthly Spending",
      spent: 42350,
      limit: 55000,
      daysRemaining: 8,
    },
    {
      id: "2",
      category: "Food & Dining",
      spent: 8200,
      limit: 12000,
      daysRemaining: 8,
    },
    {
      id: "3",
      category: "Transportation",
      spent: 4500,
      limit: 4000,
      daysRemaining: 8,
    },
    {
      id: "4",
      category: "Entertainment",
      spent: 2800,
      limit: 5000,
      daysRemaining: 8,
    },
    {
      id: "5",
      category: "Shopping",
      spent: 15200,
      limit: 15000,
      daysRemaining: 8,
    },
  ];

  return (
    <>
      <div className="space-y-4 pt-4">
        {/* Multi-Currency Account Carousel */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm text-muted-foreground">Accounts</h2>
            <button 
              onClick={() => setAccountManagerOpen(true)}
              className="text-sm text-primary flex items-center gap-1 hover:underline"
            >
              Manage
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {mockAccounts.map((account) => {
            const Icon = accountTypeIcons[account.type];
            const colors = accountTypeColors[account.type];
            const isSelected = selectedAccountId === account.id;
            
            return (
              <Card
                key={account.id}
                onClick={() => setSelectedAccountId(account.id)}
                className={`flex-shrink-0 w-40 cursor-pointer transition-all ${
                  account.isPrimary
                    ? "border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50"
                    : isSelected
                    ? "border-2 border-primary bg-primary/5"
                    : "border hover:border-muted-foreground/50"
                }`}
              >
                <CardContent className="p-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <div 
                      className="p-1 rounded-full"
                      style={{ backgroundColor: `${account.color}20` }}
                    >
                      <Circle 
                        className="h-2 w-2" 
                        style={{ color: account.color, fill: account.color }}
                      />
                    </div>
                    <div className={`p-1.5 rounded-full ${colors.bg}`}>
                      <Icon className={`h-3 w-3 ${colors.text}`} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground truncate">{account.name}</div>
                    <div className="font-medium mt-0.5">
                      {account.currencySymbol}{account.balance.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {account.currency}
                    </div>
                    
                    {/* Show INR equivalent for non-INR accounts */}
                    {account.currency !== "INR" && account.inrEquivalent && (
                      <div className="text-xs text-green-600 mt-1">
                        ≈ ₹{account.inrEquivalent.toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-1.5 pt-1.5 border-t border-border/50">
                    {account.transactionCount} txns
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Total Balance in Primary Currency */}
      <div className="px-4">
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm opacity-90 mb-1">Total Balance (INR)</div>
                <div className="text-3xl mb-2">₹{totalInrBalance.toLocaleString('en-IN')}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="opacity-90">vs last month</span>
                  <div className="flex items-center gap-1 text-green-200">
                    <TrendingUp className="h-3 w-3" />
                    <span>+12.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Spending Tracker */}
      <div className="px-4">
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
          {mockBudgets.map((budget) => {
            const percentage = Math.round((budget.spent / budget.limit) * 100);
            const isOver = budget.spent > budget.limit;
            const remaining = budget.limit - budget.spent;
            
            // Different gradient colors for each budget
            const gradientClass = budget.id === "1" 
              ? "bg-gradient-to-br from-indigo-200 via-indigo-100 to-indigo-50" 
              : budget.id === "2"
              ? "bg-gradient-to-br from-rose-200 via-rose-100 to-rose-50"
              : budget.id === "3"
              ? "bg-gradient-to-br from-amber-200 via-amber-100 to-amber-50"
              : budget.id === "4"
              ? "bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-50"
              : "bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50";
            
            return (
              <div 
                key={budget.id}
                className="flex-shrink-0 w-[calc(100vw-2rem)] rounded-2xl overflow-hidden border border-gray-200 shadow-sm snap-center"
              >
                {/* Header Section with Gradient */}
                <div className={`${gradientClass} p-4 pb-3`}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-0.5">{budget.category}</h3>
                      <div className="text-xl">
                        ₹{(isOver ? budget.spent - budget.limit : remaining).toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm opacity-75 mt-0.5">
                        {isOver ? 'overspent of' : 'left of'} ₹{budget.limit.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <button className="p-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors flex-shrink-0">
                      <TrendingUp className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Section with Light Background */}
                <div className="bg-white border-t border-gray-200 p-4 pt-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Nov 1</span>
                    <span className="bg-gray-900 text-white px-2 py-0.5 rounded font-medium">
                      Today
                    </span>
                    <span>Nov 30</span>
                  </div>
                  
                  <div className="relative mb-3">
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={Math.min(percentage, 100)} 
                        className="h-7 bg-gray-100 rounded-full flex-1"
                      />
                    </div>
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium pointer-events-none"
                      style={{ 
                        color: percentage > 50 ? 'white' : '#111827'
                      }}
                    >
                      {percentage}%
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center">
                    {isOver 
                      ? `₹${budget.spent.toLocaleString('en-IN')} / ₹${budget.limit.toLocaleString('en-IN')} for ${budget.daysRemaining} more days`
                      : `You can spend ₹${Math.round(remaining / budget.daysRemaining).toLocaleString('en-IN')}/day for ${budget.daysRemaining} more days`
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-red-100">
                  <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                </div>
                <span className="text-xs text-muted-foreground">Expenses</span>
              </div>
              <div className="text-xl text-red-900">₹1,02,370</div>
              <div className="text-xs text-red-600 mt-1">This month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-green-100">
                  <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                </div>
                <span className="text-xs text-muted-foreground">Income</span>
              </div>
              <div className="text-xl text-green-900">₹3,48,600</div>
              <div className="text-xs text-green-600 mt-1">This month</div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>

      {/* Account Manager Sheet */}
      <AccountManager 
        open={accountManagerOpen}
        onOpenChange={setAccountManagerOpen}
      />
    </>
  );
}

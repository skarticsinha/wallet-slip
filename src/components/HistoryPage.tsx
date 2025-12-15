import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TransactionCard } from "./TransactionCard";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar,
  X,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "./ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface HistoryPageProps {
  onBack: () => void;
}

const allTransactions = [
  { id: "1", title: "Grocery Shopping", category: "groceries", amount: -7089, date: "Nov 13", type: "expense" as const },
  { id: "2", title: "Salary Deposit", category: "other", amount: 348600, date: "Nov 12", type: "income" as const },
  { id: "3", title: "Coffee Shop", category: "food", amount: -1058, date: "Nov 12", type: "expense" as const },
  { id: "4", title: "Petrol Station", category: "transport", amount: -3751, date: "Nov 11", type: "expense" as const },
  { id: "5", title: "Electricity Bill", category: "bills", amount: -9956, date: "Nov 10", type: "expense" as const },
  { id: "6", title: "Online Shopping", category: "shopping", amount: -4299, date: "Nov 9", type: "expense" as const },
  { id: "7", title: "Restaurant Dinner", category: "food", amount: -2850, date: "Nov 8", type: "expense" as const },
  { id: "8", title: "Freelance Payment", category: "other", amount: 25000, date: "Nov 7", type: "income" as const },
  { id: "9", title: "Gym Membership", category: "health", amount: -1500, date: "Nov 6", type: "expense" as const },
  { id: "10", title: "Uber Ride", category: "transport", amount: -450, date: "Nov 5", type: "expense" as const },
  { id: "11", title: "Vegetables Market", category: "groceries", amount: -1200, date: "Nov 4", type: "expense" as const },
  { id: "12", title: "Netflix Subscription", category: "bills", amount: -649, date: "Nov 3", type: "expense" as const },
  { id: "13", title: "Book Purchase", category: "education", amount: -899, date: "Nov 2", type: "expense" as const },
  { id: "14", title: "Medicine", category: "health", amount: -1250, date: "Nov 1", type: "expense" as const },
];

export function HistoryPage({ onBack }: HistoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<"all" | "income" | "expense">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  // Calculate statistics
  const totalIncome = allTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = allTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const transactionCount = allTransactions.length;

  // Filter and sort transactions
  const filteredTransactions = allTransactions
    .filter(transaction => {
      const matchesSearch = transaction.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || transaction.type === selectedType;
      const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "amount") {
        return Math.abs(b.amount) - Math.abs(a.amount);
      }
      return 0; // Keep date order as is
    });

  const activeFiltersCount = [
    selectedType !== "all",
    selectedCategory !== "all",
    sortBy !== "date"
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedType("all");
    setSelectedCategory("all");
    setSortBy("date");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1>Transaction History</h1>
            <p className="text-sm text-muted-foreground">
              {transactionCount} transactions
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 pt-0 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(true)}
              className="flex-1"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFilters}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-muted-foreground">Income</span>
            </div>
            <div className="text-green-600">₹{totalIncome.toLocaleString()}</div>
          </div>
          
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Expenses</span>
            </div>
            <div className="text-red-600">₹{totalExpense.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="max-w-md mx-auto px-4 pb-6 space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              id={transaction.id}
              title={transaction.title}
              category={transaction.category}
              amount={transaction.amount}
              date={transaction.date}
              type={transaction.type}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2">No transactions found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Filters Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
          <SheetHeader className="pb-6">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <div className="space-y-6 pb-6">
            {/* Transaction Type */}
            <div className="space-y-2">
              <label className="text-sm">Transaction Type</label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  onClick={() => setSelectedType("all")}
                >
                  All
                </Button>
                <Button
                  variant={selectedType === "income" ? "default" : "outline"}
                  onClick={() => setSelectedType("income")}
                  className={selectedType === "income" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  Income
                </Button>
                <Button
                  variant={selectedType === "expense" ? "default" : "outline"}
                  onClick={() => setSelectedType("expense")}
                  className={selectedType === "expense" ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  Expense
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="food">Food & Dining</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="bills">Bills & Utilities</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="health">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm">Sort By</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={sortBy === "date" ? "default" : "outline"}
                  onClick={() => setSortBy("date")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                </Button>
                <Button
                  variant={sortBy === "amount" ? "default" : "outline"}
                  onClick={() => setSortBy("amount")}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Amount
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t space-y-2">
            <Button className="w-full" onClick={() => setShowFilters(false)}>
              Apply Filters
            </Button>
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
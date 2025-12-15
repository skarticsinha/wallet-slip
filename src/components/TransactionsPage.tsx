"use client";

import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, Filter, Search, TrendingUp, TrendingDown,
  ShoppingCart, Coffee, Car, Home, MoreHorizontal,
  Repeat, Calendar as CalendarIcon, StickyNote, Image as ImageIcon,
  X, Check, Loader2, DollarSign, Briefcase, Gift
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { 
  format, startOfMonth, endOfMonth, isSameMonth, 
  eachMonthOfInterval, addMonths, subMonths, getYear 
} from "date-fns";
import supabase from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface TransactionsPageProps {
  onBack: () => void;
  onTransactionClick?: (transaction: any) => void;
}

const categoryIcons: Record<string, any> = {
  groceries: ShoppingCart,
  food: Coffee,
  transport: Car,
  bills: Home,
  rent: Home,
  entertainment: Home,
  shopping: ShoppingCart,
  salary: Briefcase,
  freelance: DollarSign,
  investment: TrendingUp,
  gifts: Gift,
  other: MoreHorizontal,
};

const getCategoryStyle = (categoryName: string, type: string) => {
  const normalized = categoryName?.toLowerCase() || 'other';
  if (type === 'INCOME') return { bg: "bg-emerald-100", text: "text-emerald-600" };
  const styles: Record<string, { bg: string, text: string }> = {
    groceries: { bg: "bg-green-100", text: "text-green-600" },
    food: { bg: "bg-orange-100", text: "text-orange-600" },
    transport: { bg: "bg-blue-100", text: "text-blue-600" },
    bills: { bg: "bg-purple-100", text: "text-purple-600" },
    entertainment: { bg: "bg-indigo-100", text: "text-indigo-600" },
    shopping: { bg: "bg-pink-100", text: "text-pink-600" },
    other: { bg: "bg-gray-100", text: "text-gray-600" },
  };
  return styles[normalized] || styles.other;
};

export function TransactionsPage({ onBack, onTransactionClick }: TransactionsPageProps) {
  const { user } = useAuth();
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [monthsList, setMonthsList] = useState<Date[]>([]);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });
  
  const monthsScrollRef = useRef<HTMLDivElement>(null);
  const selectedMonthRef = useRef<HTMLButtonElement>(null);

  // 1. Initialize Months (Past -> Future)
  useEffect(() => {
    async function initMonths() {
       if(!user) return;
       
       // Fetch earliest transaction to determine start date
       const { data } = await supabase
         .from("transactions")
         .select("transaction_date")
         .order("transaction_date", { ascending: true })
         .limit(1)
         .single();
       
       // Default to 12 months ago if no transactions, or use the earliest date
       let startDate = data ? new Date(data.transaction_date) : subMonths(new Date(), 12);
       // Ensure we don't go back unnecessarily far (optional cap at 2 years ago)
       if (startDate < subMonths(new Date(), 24)) startDate = subMonths(new Date(), 24);

       // End date: 12 months into the future for upcoming
       const endDate = addMonths(new Date(), 12);
       
       const months = eachMonthOfInterval({
           start: startDate,
           end: endDate
       });

       setMonthsList(months);
    }
    initMonths();
  }, [user]);

  // 2. Auto-scroll to selected month (Current Month)
  useEffect(() => {
    if (selectedMonthRef.current && monthsScrollRef.current) {
        const container = monthsScrollRef.current;
        const element = selectedMonthRef.current;
        
        // Center the element
        const scrollLeft = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [monthsList]); // Run when list is populated

  // 3. Fetch Transactions
  useEffect(() => {
    async function fetchTransactions() {
      if (!user) return;
      
      setLoading(true);
      try {
        const userId = user.id;

        // Step A: Get User's Account IDs
        const { data: accounts } = await supabase
          .from("accounts")
          .select("id")
          .eq("owner_id", userId);
        
        const accountIds = accounts?.map(a => a.id) || [];
        
        // Step B: Build Filter
        let orConditions = [`paid_by_id.eq.${userId}`]; 
        if (accountIds.length > 0) {
            const accountIdList = accountIds.join(',');
            orConditions.push(`paid_from_account_id.in.(${accountIdList})`);
            orConditions.push(`paid_to_account_id.in.(${accountIdList})`);
        }
        
        // Step C: Query
        const start = startOfMonth(selectedDate).toISOString();
        const end = endOfMonth(selectedDate).toISOString();

        let query = supabase
          .from("transactions")
          .select(`*, categories (name, icon, color)`)
          .or(orConditions.join(','))
          .gte("transaction_date", start)
          .lte("transaction_date", end)
          .order("transaction_date", { ascending: false });

        if (filterType !== "ALL") query = query.eq("type", filterType);
        if (searchQuery) query = query.ilike("description", `%${searchQuery}%`);

        const { data, error } = await query;
        if (error) throw error;

        setTransactions(data || []);

        // Stats
        let inc = 0, exp = 0;
        (data || []).forEach((t: any) => {
          const amt = Number(t.amount);
          if (t.type === "INCOME") inc += amt;
          else if (t.type === "EXPENSE") exp += amt;
        });
        setStats({ income: inc, expense: exp, balance: inc - exp });

      } catch (error: any) {
        console.error("Error fetching transactions:", JSON.stringify(error, null, 2));
        if (error.code !== "PGRST116") toast.error("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => fetchTransactions(), 300);
    return () => clearTimeout(timer);
  }, [user, selectedDate, filterType, searchQuery]);


  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5" />
            </button>
            {!isSearchOpen && <h1 className="text-xl font-semibold">Transactions</h1>}
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            {isSearchOpen ? (
                <div className="flex items-center gap-2 w-full max-w-[200px] animate-in fade-in slide-in-from-right-10 duration-200">
                    <Input 
                        autoFocus
                        placeholder="Search..." 
                        className="h-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="p-2 hover:bg-muted rounded-full">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className={`p-2 rounded-full transition-colors ${filterType !== 'ALL' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                                <Filter className="h-5 w-5" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setFilterType("ALL")}>All Transactions</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilterType("INCOME")}>Income Only</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilterType("EXPENSE")}>Expenses Only</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:bg-muted rounded-full transition-colors">
                        <Search className="h-5 w-5" />
                    </button>
                </>
            )}
          </div>
        </div>

        {/* Scrollable Month Selector with Year Separators */}
        <div 
            ref={monthsScrollRef}
            className="flex items-center gap-2 overflow-x-auto px-4 pb-3 no-scrollbar scroll-smooth"
        >
          {monthsList.map((date, index) => {
            const isSelected = isSameMonth(date, selectedDate);
            const showYearSeparator = index > 0 && getYear(date) !== getYear(monthsList[index - 1]);
            const isCurrentYear = index === 0 && getYear(date) !== new Date().getFullYear();

            return (
              <div key={date.toISOString()} className="flex items-center shrink-0">
                {/* Year Separator */}
                {(showYearSeparator || (index === 0 && isCurrentYear)) && (
                    <div className="flex items-center mr-2 text-muted-foreground/50 select-none">
                        <span className="text-lg font-light mx-1">|</span>
                        <span className="text-xs font-bold">{format(date, "yyyy")}</span>
                    </div>
                )}

                <button
                    ref={isSelected ? selectedMonthRef : null}
                    onClick={() => setSelectedDate(date)}
                    className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                    isSelected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                >
                    {format(date, "MMMM")}
                </button>
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="flex justify-around px-4 py-3 bg-muted/30 text-sm border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-red-600 font-medium">
              <TrendingDown className="h-3 w-3" />
              <span>₹{stats.expense.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Expense</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 font-medium">
              <TrendingUp className="h-3 w-3" />
              <span>₹{stats.income.toLocaleString('en-IN')}</span>
            </div>
             <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Income</p>
          </div>
          <div className="text-center">
             <div className={`font-medium ${stats.balance < 0 ? 'text-red-600' : 'text-blue-600'}`}>
               ₹{Math.abs(stats.balance).toLocaleString('en-IN')}
             </div>
             <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Balance</p>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-4 space-y-3">
        {loading ? (
             <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p>Loading transactions...</p>
             </div>
        ) : transactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
                <div className="inline-flex p-3 bg-muted rounded-full mb-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <p>No transactions found for {format(selectedDate, "MMMM yyyy")}.</p>
            </div>
        ) : (
             transactions.map((transaction, index) => {
                const currentDate = new Date(transaction.transaction_date).toDateString();
                const prevDate = index > 0 ? new Date(transactions[index - 1].transaction_date).toDateString() : null;
                const showDate = currentDate !== prevDate;
                const categoryName = transaction.categories?.name?.toLowerCase() || 'other';
                let styles = getCategoryStyle(categoryName, transaction.type);
                const IconComponent = categoryIcons[categoryName] || MoreHorizontal;
                const isExpense = transaction.type === "EXPENSE";

                return (
                    <div key={transaction.id}>
                    {showDate && (
                        <div className="text-xs font-semibold text-muted-foreground mb-2 mt-4 first:mt-0 px-1">
                             {format(new Date(transaction.transaction_date), "EEEE, dd MMMM")}
                        </div>
                    )}
                    <Card 
                        className="cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
                        onClick={() => onTransactionClick?.(transaction)}
                    >
                        <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-2xl ${styles.bg} flex-shrink-0`}>
                                    <IconComponent className={`h-5 w-5 ${styles.text}`} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-medium truncate max-w-[150px] sm:max-w-[200px]">
                                        {transaction.description || "Untitled"}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-muted-foreground capitalize">
                                            {transaction.categories?.name || "Uncategorized"}
                                        </span>
                                        {transaction.is_recurring && <Repeat className="h-3 w-3 text-blue-500" />}
                                        {transaction.note && <StickyNote className="h-3 w-3 text-amber-500" />}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <div className={`font-bold ${isExpense ? 'text-red-600' : 'text-green-600'}`}>
                                    {isExpense ? '-' : '+'}₹{Number(transaction.amount).toLocaleString('en-IN')}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                    {format(new Date(transaction.transaction_date), "hh:mm a")}
                                </div>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    </div>
                );
            })
        )}
      </div>
      <div className="h-10"></div>
    </div>
  );
}
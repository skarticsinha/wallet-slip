"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { type Account } from "./AccountManagerSheet";
import supabase from "@/lib/supabaseClient";

interface Transaction {
  id: string;
  type: "INCOME" | "EXPENSE"; // DB stores uppercase
  amount: number;
  description: string;
  transaction_date: string;
  categories?: { name: string };
}

interface AccountDetailViewProps {
  account: Account;
  onBack: () => void;
  balancesHidden: boolean;
}

export function AccountDetailView({ account, onBack, balancesHidden }: AccountDetailViewProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      if (!account?.id) return;
      
      const { data, error } = await supabase
        .from("transactions")
        .select(`
            id, type, amount, description, transaction_date,
            categories (name)
        `)
        // Filter where this account was the Payer OR Payee
        .or(`paid_from_account_id.eq.${account.id},paid_to_account_id.eq.${account.id}`)
        .order("transaction_date", { ascending: false });

      if (error) {
        console.error("Error fetching history:", error);
      } else {
        setTransactions(data as any);
      }
      setLoading(false);
    }

    fetchHistory();
  }, [account.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const formatBalance = (amount: number, currency: string = "INR") => {
    if (balancesHidden) return "••••••";
    const symbol = currency === "USD" ? "$" : "₹";
    return `${symbol}${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold truncate">{account.name}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Account Summary Card */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-primary-foreground/80 text-sm font-medium mb-1">Current Balance</p>
            <h2 className="text-4xl font-bold mb-6">
              {formatBalance(account.current_balance, account.currency)}
            </h2>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-300 text-sm mb-1">
                  <div className="p-1 bg-emerald-500/20 rounded-full">
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                  Total In
                </div>
                <p className="font-semibold text-lg">--</p> {/* Need separate aggregations for this */}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-rose-300 text-sm mb-1">
                  <div className="p-1 bg-rose-500/20 rounded-full">
                    <ArrowDownLeft className="h-3 w-3" />
                  </div>
                  Total Out
                </div>
                <p className="font-semibold text-lg">--</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Transactions */}
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            History
            <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {transactions.length}
            </span>
          </h3>
          
          {loading ? (
             <div className="text-center text-muted-foreground py-10">Loading history...</div>
          ) : transactions.length === 0 ? (
             <div className="text-center text-muted-foreground py-10">No transactions found</div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="border-0 shadow-sm hover:bg-muted/30 transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-2xl ${
                        transaction.type === "INCOME" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                      }`}>
                        {transaction.type === "INCOME" 
                          ? <TrendingUp className="h-5 w-5" /> 
                          : <TrendingDown className="h-5 w-5" />
                        }
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="truncate font-medium">{transaction.description || "Untitled"}</h3>
                            <p className="text-sm text-muted-foreground capitalize">
                                {transaction.categories?.name || "Uncategorized"}
                            </p>
                          </div>
                          <div className={`text-right flex-shrink-0 font-bold ${
                            transaction.type === "INCOME" ? "text-emerald-600" : "text-rose-600"
                          }`}>
                            <div>
                              {transaction.type === "INCOME" ? "+" : "-"}
                              {formatBalance(transaction.amount, account.currency)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(transaction.transaction_date)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Account, Transaction, DashboardStats } from "@/types/database";
import { useAuth } from "./useAuth"; // Import the auth hook

export function useDashboardData() {
  const { user, loading: authLoading } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    savings: 0,
    savingsRate: "0",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Wait until user is authenticated
    if (authLoading || !user) {
        if (!authLoading && !user) {
            setLoading(false); 
        }
        return; 
    }
    
    const userId = user.id;

    async function fetchData() {
      try {
        setLoading(true);

        // A. Fetch Accounts (FILTERED by owner_id)
        const { data: accountsData, error: accountsError } = await supabase
          .from("accounts")
          .select("*, id, current_balance, type, color, icon") // Explicitly select for safety
          .eq('owner_id', userId) // <-- KEY FILTER
          .order('name'); 

        if (accountsError) throw accountsError;
        
        const accountIds = (accountsData || []).map(a => a.id);
        const accountIdFilter = accountIds.length > 0 ? `paid_from_account_id.in.(${accountIds.join(',')}), paid_to_account_id.in.(${accountIds.join(',')})` : 'id.eq.null';

        // B. Fetch Recent Transactions (FILTERED by account IDs)
        const { data: recentTxns, error: txnsError } = await supabase
          .from("transactions")
          .select(`*, categories (name, type)`)
          .or(accountIdFilter)
          .order("transaction_date", { ascending: false })
          .limit(5);

        if (txnsError) throw txnsError;

        // C. Calculate Monthly Stats (FILTERED by account IDs)
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { data: monthTxns, error: monthError } = await supabase
          .from("transactions")
          .select("amount, type, paid_from_account_id, paid_to_account_id")
          .gte("transaction_date", startOfMonth.toISOString())
          .or(accountIdFilter);

        if (monthError) throw monthError;

        // --- Calculations ---
        const totalBalance = (accountsData || []).reduce(
          (sum, acc) => sum + Number(acc.current_balance || 0),
          0
        );

        let monthlyIncome = 0;
        let monthlyExpense = 0;

        (monthTxns || []).forEach((txn) => {
            const amt = Number(txn.amount);
            
            // Income: Transaction is INCOME AND deposited into one of the user's accounts
            if (txn.type === "INCOME" && accountIds.includes(txn.paid_to_account_id as string)) {
                monthlyIncome += amt;
            } 
            // Expense: Transaction is EXPENSE AND paid from one of the user's accounts
            else if (txn.type === "EXPENSE" && accountIds.includes(txn.paid_from_account_id as string)) {
                monthlyExpense += amt;
            }
        });

        const savings = monthlyIncome - monthlyExpense;
        const savingsRate = monthlyIncome > 0 
          ? ((savings / monthlyIncome) * 100).toFixed(1) 
          : "0";

        // Map data to UI format
        const uiTransactions = (recentTxns || []).map((t: any) => ({
          ...t,
          title: t.description || "Untitled",
          categoryName: t.categories?.name || "Uncategorized",
        }));

        setAccounts(accountsData as Account[]);
        setTransactions(uiTransactions as Transaction[]);
        setStats({ totalBalance, monthlyIncome, monthlyExpense, savings, savingsRate });

      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, authLoading]); // Re-run when user changes

  return { accounts, transactions, stats, loading: loading || authLoading };
}
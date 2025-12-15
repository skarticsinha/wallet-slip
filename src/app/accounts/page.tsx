"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Plus, 
  Landmark, 
  CreditCard, 
  Wallet, 
  Banknote, 
  Building2, 
  TrendingUp, 
  Bitcoin,
  Eye,
  EyeOff,
  ChevronRight,
  Circle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AccountManagerSheet, type Account } from "@/components/AccountManagerSheet";
import { AccountDetailView } from "@/components/AccountDetailView";
import supabase from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { BottomNav } from "@/components/BottomNav"; // <-- Added BottomNav Import

// Map types to Icons
const iconMap: Record<string, any> = {
  bank: Landmark,
  card: CreditCard,
  wallet: Wallet,
  cash: Banknote,
  pf: Building2,
  investment: TrendingUp,
  crypto: Bitcoin,
};

// Fallback colors if DB missing data
const colorMap: Record<string, string> = {
  bank: "#2563eb",
  card: "#9333ea",
  wallet: "#ea580c",
  cash: "#16a34a",
  pf: "#4f46e5",
  investment: "#059669",
  crypto: "#ca8a04",
};

export default function AccountsPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [accountManagerOpen, setAccountManagerOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [balancesHidden, setBalancesHidden] = useState(false);

  const fetchAccounts = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("owner_id", user.id)
        .order("name");

      if (error) throw error;
      setAccounts(data as unknown as Account[]);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user]);

  const handleAccountClick = (account: Account) => {
    setSelectedAccount(account);
  };

  const getCurrencySymbol = (currency: string) => {
    if (currency === "USD") return "$";
    if (currency === "EUR") return "€";
    if (currency === "GBP") return "£";
    return "₹";
  };

  const formatBalance = (amount: number, currency: string) => {
    if (balancesHidden) return "••••••";
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${Number(amount).toLocaleString('en-IN')}`;
  };

  // If viewing details, we don't show the main list layout
  if (selectedAccount) {
    return (
      <AccountDetailView 
        account={selectedAccount} 
        onBack={() => setSelectedAccount(null)}
        balancesHidden={balancesHidden}
      />
    );
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + (Number(acc.current_balance) || 0), 0);

  return (
    <>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground pb-8 rounded-b-[2rem] shadow-lg sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-medium">My Accounts</h1>
            <button 
              onClick={() => setBalancesHidden(!balancesHidden)}
              className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
            >
              {balancesHidden ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="text-center px-4 mt-2">
            <p className="text-primary-foreground/80 text-sm font-medium mb-1">Total Net Worth</p>
            <h2 className="text-4xl font-bold tracking-tight">
              {balancesHidden ? "••••••" : `₹${totalBalance.toLocaleString('en-IN')}`}
            </h2>
          </div>
        </div>

        {/* Account List */}
        <div className="px-4 mt-8 space-y-3 pb-20">
          {loading ? (
             <div className="text-center py-10">Loading...</div>
          ) : accounts.length === 0 ? (
             <div className="bg-card p-6 rounded-xl text-center shadow-sm border mt-4">
                <div className="inline-flex p-3 bg-muted rounded-full mb-3">
                    <Landmark className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No accounts yet</h3>
                <p className="text-muted-foreground text-sm max-w-[200px] mx-auto mt-1 mb-4">
                    Add your bank accounts, wallets, or cash to start tracking.
                </p>
                <button 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
                  onClick={() => setAccountManagerOpen(true)}
                >
                  Add Account
                </button>
             </div>
          ) : (
            accounts.map((account) => {
              const Icon = iconMap[account.type] || Landmark;
              // Use saved color or fallback
              const color = account.color && account.color.startsWith("#") 
                ? account.color 
                : colorMap[account.type] || "#6b7280";

              return (
                <Card 
                  key={account.id}
                  className="overflow-hidden border-0 shadow-sm active:scale-[0.99] transition-transform cursor-pointer hover:shadow-md"
                  onClick={() => handleAccountClick(account)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center p-4 gap-4">
                      {/* Icon Container with dynamic background opacity */}
                      <div 
                        className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${color}20` }} 
                      >
                         <Icon className="h-6 w-6" style={{ color: color }} />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold truncate pr-2">{account.name}</h3>
                          <div className="text-right">
                            <p className="font-bold text-foreground">
                              {formatBalance(account.current_balance, account.currency)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-0.5 text-xs text-muted-foreground">
                          <span className="capitalize">{account.type}</span>
                          <span className="uppercase bg-muted px-1.5 py-0.5 rounded text-[10px]">
                            {account.currency}
                          </span>
                        </div>
                      </div>
                      
                      <ChevronRight className="h-5 w-5 text-muted-foreground/50 flex-shrink-0 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Floating Action Button (Only show if not empty) */}
        {accounts.length > 0 && (
            <button 
            className="fixed bottom-24 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center z-20"
            onClick={() => setAccountManagerOpen(true)}
            >
            <Plus className="h-6 w-6" />
            </button>
        )}
        
        {/* Bottom Nav Added Here */}
        <BottomNav onAddClick={() => { /* Handle generic add */ }} />
      </div>

      <AccountManagerSheet
        open={accountManagerOpen}
        onOpenChange={setAccountManagerOpen}
        onSuccess={fetchAccounts}
      />
    </>
  );
}
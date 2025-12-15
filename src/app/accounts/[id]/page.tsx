"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, CreditCard, Smartphone, Banknote, Circle, ChevronLeft, Trash2, ExternalLink } from "lucide-react";
import supabase from "@/lib/supabaseClient";
import { Account } from "@/types/database";
import { AddAccountSheet } from "@/components/AddAccountSheet";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Link from "next/link";

const accountTypeIcons: Record<string, any> = {
  bank: Building2,
  card: CreditCard,
  wallet: Smartphone,
  cash: Banknote,
  crypto: Circle,
};

export default function AccountsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    if (!user) return;
    try {
        const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("owner_id", user.id)
        .order("name");
        
        if (error) throw error;
        setAccounts(data || []);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user]);

  const handleDelete = async (id: string, name: string) => {
      if(!confirm(`Are you sure you want to delete ${name}? This will affect transaction history.`)) return;
      
      const { error } = await supabase.from("accounts").delete().eq("id", id);
      if(error) {
          toast.error("Failed to delete account");
      } else {
          toast.success("Account deleted");
          fetchAccounts();
      }
  }

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading accounts...</div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">My Accounts</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Add New Button */}
        <Button 
            variant="outline" 
            className="w-full h-12 border-dashed border-2 hover:border-primary/50 hover:bg-muted/50"
            onClick={() => setIsAddOpen(true)}
        >
            <Plus className="h-4 w-4 mr-2" />
            Add New Account
        </Button>

        {/* Accounts List */}
        <div className="space-y-3">
          {accounts.map((account) => {
            const Icon = accountTypeIcons[account.type] || Circle;
            const bgColor = account.color ? `${account.color}20` : '#8B5CF620'; // 20% opacity hex
            
            return (
                <Card key={account.id} className="group overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4 gap-4">
                      {/* Icon */}
                      <div 
                        className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: bgColor }}
                      >
                        <Icon 
                            className="h-6 w-6" 
                            style={{ color: account.color || '#8B5CF6' }} 
                        />
                      </div>
                      
                      {/* Details */}
                      <Link href={`/accounts/${account.id}`} className="flex-1 min-w-0 cursor-pointer">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-base truncate">{account.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground capitalize">
                                {account.type} • <span className="font-medium text-foreground">₹{account.current_balance.toLocaleString()}</span>
                            </p>
                        </div>
                      </Link>

                      {/* Actions */}
                      <div className="flex gap-1">
                         <Link href={`/accounts/${account.id}`}>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                         </Link>
                         <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(account.id, account.name)}
                         >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            );
          })}

          {accounts.length === 0 && (
            <div className="text-center py-10">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No accounts yet</h3>
                <p className="text-muted-foreground mt-1 max-w-xs mx-auto">
                    Add your bank accounts, wallets, or cash to start tracking your transactions.
                </p>
            </div>
          )}
        </div>
      </div>

      <AddAccountSheet 
        open={isAddOpen} 
        onOpenChange={setIsAddOpen} 
        onSuccess={fetchAccounts} 
      />
    </div>
  );
}
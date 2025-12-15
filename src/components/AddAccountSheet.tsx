"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Building2, CreditCard, Smartphone, Banknote, Circle, Check } from "lucide-react";
import supabase from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface AddAccountSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const accountColors = [
  "#8B5CF6", "#10B981", "#F59E0B", "#6366F1", 
  "#EC4899", "#EF4444", "#3B82F6", "#06B6D4"
];

const currencies = [
  { code: "INR", symbol: "₹" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
];

export function AddAccountSheet({ open, onOpenChange, onSuccess }: AddAccountSheetProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [type, setType] = useState("bank");
  const [currency, setCurrency] = useState("INR");
  const [color, setColor] = useState(accountColors[0]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to create an account.");
      return;
    }

    if (!name || !balance) {
        toast.error("Please fill in all required fields.");
        return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase.from("accounts").insert({
        name,
        current_balance: parseFloat(balance),
        type,
        color,
        // icon: type, // Optional: if you added an icon column
        // currency: currency, // Optional: if you added a currency column
        owner_id: user.id 
      });

      if (error) throw error;
      
      toast.success("Account created successfully");
      onSuccess?.();
      onOpenChange(false);
      
      // Reset form
      setName("");
      setBalance("");
      setType("bank");
      setColor(accountColors[0]);
    } catch (error: any) {
      console.error("Error creating account:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <div className="px-6 pt-6 pb-4 border-b">
          <SheetHeader>
            <SheetTitle>Add New Account</SheetTitle>
            <SheetDescription>
              Enter details for your new wallet or bank account
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="px-6 py-6 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="space-y-2">
            <Label>Account Name</Label>
            <Input 
                placeholder="e.g. HDFC Bank, Cash, Pocket Money" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="h-12"
            />
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Account Type</Label>
                <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-12">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="bank">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" /> Bank
                        </div>
                    </SelectItem>
                    <SelectItem value="card">
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" /> Card
                        </div>
                    </SelectItem>
                    <SelectItem value="wallet">
                         <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" /> Wallet
                        </div>
                    </SelectItem>
                    <SelectItem value="cash">
                         <div className="flex items-center gap-2">
                            <Banknote className="h-4 w-4" /> Cash
                        </div>
                    </SelectItem>
                    <SelectItem value="crypto">
                         <div className="flex items-center gap-2">
                            <Circle className="h-4 w-4" /> Crypto
                        </div>
                    </SelectItem>
                </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="h-12">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {currencies.map(curr => (
                    <SelectItem key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.code}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </div>

            <div className="space-y-2">
            <Label>Current Balance</Label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                    {currencies.find(c => c.code === currency)?.symbol}
                </span>
                <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={balance} 
                    onChange={(e) => setBalance(e.target.value)} 
                    className="pl-8 h-12 text-lg"
                />
            </div>
            </div>

            <div className="space-y-3">
            <Label>Color Code</Label>
            <div className="flex gap-3 flex-wrap">
                {accountColors.map(c => (
                <button 
                    key={c}
                    className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${color === c ? 'ring-2 ring-offset-2 ring-foreground scale-110' : 'hover:scale-105'}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                >
                    {color === c && <Check className="h-5 w-5 text-white drop-shadow-md" />}
                </button>
                ))}
            </div>
            </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-background border-t">
            <Button className="w-full h-12 text-lg" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
            </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
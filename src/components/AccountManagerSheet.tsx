"use client";

import { useState } from "react";
import {
  Landmark, CreditCard, Wallet, Banknote, Building2, TrendingUp, Bitcoin
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import supabase from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface Account {
  id: string;
  name: string;
  type: "bank" | "card" | "wallet" | "cash" | "pf" | "investment" | "crypto";
  current_balance: number;
  currency: string;
  color?: string;
  icon?: any;
}

interface AccountManagerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  account?: Account;
}

// Updated with HEX colors to work with the AccountsPage opacity logic
const accountTypes = [
  { value: "bank", label: "Bank Account", icon: Landmark, color: "#2563eb", bgColor: "bg-blue-100" }, // Blue
  { value: "card", label: "Credit Card", icon: CreditCard, color: "#9333ea", bgColor: "bg-purple-100" }, // Purple
  { value: "wallet", label: "Wallet", icon: Wallet, color: "#ea580c", bgColor: "bg-orange-100" }, // Orange
  { value: "cash", label: "Cash", icon: Banknote, color: "#16a34a", bgColor: "bg-green-100" }, // Green
  { value: "pf", label: "Provident Fund", icon: Building2, color: "#4f46e5", bgColor: "bg-indigo-100" }, // Indigo
  { value: "investment", label: "Investment", icon: TrendingUp, color: "#059669", bgColor: "bg-emerald-100" }, // Emerald
  { value: "crypto", label: "Crypto", icon: Bitcoin, color: "#ca8a04", bgColor: "bg-yellow-100" }, // Yellow
];

const currencies = [
  { value: "INR", label: "Indian Rupee (₹)", symbol: "₹" },
  { value: "USD", label: "US Dollar ($)", symbol: "$" },
  { value: "EUR", label: "Euro (€)", symbol: "€" },
  { value: "GBP", label: "British Pound (£)", symbol: "£" },
];

export function AccountManagerSheet({ open, onOpenChange, onSuccess, account }: AccountManagerSheetProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Form State
  const [accountName, setAccountName] = useState(account?.name || "");
  const [accountType, setAccountType] = useState<string>(account?.type || "bank");
  const [initialBalance, setInitialBalance] = useState(account?.current_balance?.toString() || "");
  const [currency, setCurrency] = useState(account?.currency || "INR");

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to add an account.");
      return;
    }
    if (!accountName.trim() || !initialBalance) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const typeInfo = accountTypes.find(t => t.value === accountType);
      
      const payload = {
        name: accountName,
        type: accountType,
        current_balance: parseFloat(initialBalance),
        currency: currency,
        color: typeInfo?.color || "#6b7280", // Save HEX code
        icon: accountType,
        owner_id: user.id
      };

      const { error } = await supabase.from("accounts").insert(payload);

      if (error) {
        throw error;
      }

      toast.success(account ? "Account updated successfully" : "Account added successfully");
      onSuccess?.(); 
      handleClose();

    } catch (error: any) {
      // Improved error logging
      console.error("Error saving account:", JSON.stringify(error, null, 2));
      toast.error(error.message || error.details || "Failed to save account details");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAccountName("");
    setAccountType("bank");
    setInitialBalance("");
    setCurrency("INR");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{account ? "Edit Account" : "Add New Account"}</DialogTitle>
          <DialogDescription>
            {account ? "Update your account details" : "Add a new wallet, bank account, or cash stash."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Account Type Grid */}
          <div className="space-y-3">
            <Label>Account Type</Label>
            <RadioGroup
              value={accountType}
              onValueChange={setAccountType}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {accountTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = accountType === type.value;
                return (
                  <div key={type.value}>
                    <RadioGroupItem value={type.value} id={type.value} className="sr-only" />
                    <Label
                      htmlFor={type.value}
                      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? `border-primary bg-primary/5 text-primary`
                          : "border-transparent bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <div className={`p-2 rounded-full ${isSelected ? "bg-primary/10" : type.bgColor}`}>
                        <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : ""}`} style={{ color: isSelected ? undefined : type.color }} />
                      </div>
                      <span className="text-xs font-medium">{type.label}</span>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Account Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Account Name *</Label>
            <Input
              id="name"
              placeholder="e.g. HDFC Salary, Travel Wallet"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>

          {/* Current Balance */}
          <div className="space-y-2">
            <Label htmlFor="initial-balance">Current Balance *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {currencies.find(c => c.value === currency)?.symbol || "₹"}
              </span>
              <Input
                id="initial-balance"
                type="number"
                placeholder="0.00"
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                step="0.01"
                className="pl-8 text-lg font-semibold"
              />
            </div>
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.value} value={curr.value}>
                    {curr.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!accountName.trim() || loading}>
            {loading ? "Saving..." : account ? "Update Account" : "Add Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
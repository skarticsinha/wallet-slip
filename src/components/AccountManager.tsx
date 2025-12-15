import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Building2, CreditCard, Smartphone, Banknote, Circle, Plus, Edit2, Trash2 } from "lucide-react";
import type { CurrencyAccount } from "./MultiCurrencyDashboard";

interface AccountManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const accountTypeIcons = {
  bank: Building2,
  card: CreditCard,
  wallet: Smartphone,
  cash: Banknote,
  crypto: Circle,
};

const accountColors = [
  "#8B5CF6", "#10B981", "#F59E0B", "#6366F1", 
  "#EC4899", "#EF4444", "#3B82F6", "#06B6D4"
];

const currencies = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
];

export function AccountManager({ open, onOpenChange }: AccountManagerProps) {
  const [accounts, setAccounts] = useState<CurrencyAccount[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState<"bank" | "card" | "wallet" | "cash" | "crypto">("bank");
  const [currency, setCurrency] = useState("INR");
  const [balance, setBalance] = useState("");
  const [selectedColor, setSelectedColor] = useState(accountColors[0]);
  const [isPrimary, setIsPrimary] = useState(false);

  const handleAddAccount = () => {
    if (!accountName || !balance) return;

    const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0];
    
    const newAccount: CurrencyAccount = {
      id: Date.now().toString(),
      name: accountName,
      balance: parseFloat(balance),
      currency: currency,
      currencySymbol: selectedCurrency.symbol,
      type: accountType,
      transactionCount: 0,
      color: selectedColor,
      isPrimary: isPrimary,
    };

    setAccounts([...accounts, newAccount]);
    
    // Reset form
    setAccountName("");
    setBalance("");
    setAccountType("bank");
    setCurrency("INR");
    setSelectedColor(accountColors[0]);
    setIsPrimary(false);
    setShowAddForm(false);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  const handleSetPrimary = (id: string) => {
    setAccounts(accounts.map(acc => ({
      ...acc,
      isPrimary: acc.id === id
    })));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        <div className="px-6 pt-6 pb-4 border-b">
          <SheetHeader>
            <SheetTitle>Manage Accounts</SheetTitle>
            <SheetDescription>
              Add and manage your bank accounts, cards, wallets, and cash
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-200px)] hide-scrollbar space-y-4">
          {/* Add Account Button */}
          {!showAddForm && (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Account
            </Button>
          )}

          {/* Add Account Form */}
          {showAddForm && (
            <Card className="border-2 border-primary">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Account Name</Label>
                  <Input
                    placeholder="e.g., HDFC Bank, PhonePe Wallet"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select value={accountType} onValueChange={(v: any) => setAccountType(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Account</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="wallet">Digital Wallet</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
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
                  <Label>Initial Balance</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    {accountColors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color ? "border-foreground scale-110" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="primary"
                    checked={isPrimary}
                    onChange={(e) => setIsPrimary(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="primary" className="cursor-pointer">
                    Set as primary account
                  </Label>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button onClick={handleAddAccount} className="flex-1" disabled={!accountName || !balance}>
                    Add Account
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Accounts List */}
          <div className="space-y-3">
            {accounts.map(account => {
              const Icon = accountTypeIcons[account.type];
              return (
                <Card 
                  key={account.id}
                  className={account.isPrimary ? "border-2 border-green-400" : ""}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${account.color}20` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: account.color }} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>{account.name}</span>
                          {account.isPrimary && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {account.currencySymbol}{account.balance.toLocaleString()} {account.currency}
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {!account.isPrimary && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSetPrimary(account.id)}
                            className="h-8 w-8"
                          >
                            <Circle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteAccount(account.id)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {accounts.length === 0 && !showAddForm && (
              <div className="text-center py-8 text-muted-foreground">
                No accounts yet. Add your first account to get started!
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-card border-t">
          <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

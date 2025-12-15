import { useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  CreditCard, Wallet, Building2, Smartphone, User, Plus,
  Banknote, CircleDollarSign
} from "lucide-react";

export interface Account {
  id: string;
  name: string;
  type: "bank" | "card" | "wallet" | "cash";
  balance: number;
  icon: any;
  color: string;
  details?: string;
}

interface AccountSelectorProps {
  selectedAccount: string;
  onSelectAccount: (accountId: string) => void;
  accounts: Account[];
  onAddAccount: (account: Omit<Account, "id">) => void;
}

const accountTypeIcons = {
  bank: Building2,
  card: CreditCard,
  wallet: Smartphone,
  cash: Banknote,
};

const accountColors = [
  { value: "#8B5CF6", label: "Purple" },
  { value: "#EC4899", label: "Pink" },
  { value: "#F59E0B", label: "Orange" },
  { value: "#10B981", label: "Green" },
  { value: "#3B82F6", label: "Blue" },
  { value: "#EF4444", label: "Red" },
  { value: "#8B5CF6", label: "Indigo" },
  { value: "#6B7280", label: "Gray" },
];

export function AccountSelector({ selectedAccount, onSelectAccount, accounts, onAddAccount }: AccountSelectorProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountType, setNewAccountType] = useState<"bank" | "card" | "wallet" | "cash">("bank");
  const [newAccountBalance, setNewAccountBalance] = useState("");
  const [newAccountColor, setNewAccountColor] = useState("#8B5CF6");
  const [newAccountDetails, setNewAccountDetails] = useState("");

  const handleAddAccount = () => {
    if (!newAccountName) return;

    const Icon = accountTypeIcons[newAccountType];
    onAddAccount({
      name: newAccountName,
      type: newAccountType,
      balance: parseFloat(newAccountBalance) || 0,
      icon: Icon,
      color: newAccountColor,
      details: newAccountDetails,
    });

    // Reset form
    setNewAccountName("");
    setNewAccountType("bank");
    setNewAccountBalance("");
    setNewAccountColor("#8B5CF6");
    setNewAccountDetails("");
    setShowAddDialog(false);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Payment Method</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAddDialog(true)}
            className="h-auto py-1 text-primary"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Account
          </Button>
        </div>

        <RadioGroup value={selectedAccount} onValueChange={onSelectAccount}>
          <div className="space-y-2">
            {accounts.map((account) => {
              const Icon = account.icon;
              return (
                <label
                  key={account.id}
                  htmlFor={account.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAccount === account.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <RadioGroupItem value={account.id} id={account.id} />
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${account.color}20` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: account.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{account.name}</div>
                    {account.details && (
                      <div className="text-xs text-muted-foreground">{account.details}</div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ₹{account.balance.toLocaleString()}
                  </div>
                </label>
              );
            })}
          </div>
        </RadioGroup>
      </div>

      {/* Add Account Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Add a new bank account, card, wallet, or cash account
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="account-type">Account Type</Label>
              <Select value={newAccountType} onValueChange={(v: any) => setNewAccountType(v)}>
                <SelectTrigger id="account-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>Bank Account</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="card">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Credit/Debit Card</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="wallet">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <span>Digital Wallet (Paytm, PhonePe, etc.)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="cash">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      <span>Cash</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-name">Account Name</Label>
              <Input
                id="account-name"
                placeholder="e.g., HDFC Bank, PhonePe Wallet"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-details">Details (Optional)</Label>
              <Input
                id="account-details"
                placeholder="e.g., **** 1234, Last 4 digits"
                value={newAccountDetails}
                onChange={(e) => setNewAccountDetails(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-balance">Current Balance</Label>
              <Input
                id="account-balance"
                type="number"
                placeholder="0"
                value={newAccountBalance}
                onChange={(e) => setNewAccountBalance(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-color">Color</Label>
              <div className="grid grid-cols-8 gap-2">
                {accountColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setNewAccountColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      newAccountColor === color.value
                        ? "border-foreground scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAccount} disabled={!newAccountName}>
              Add Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

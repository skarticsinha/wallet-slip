import { Card, CardContent } from "./ui/card";
import { 
  Building2, CreditCard, Smartphone, Banknote 
} from "lucide-react";

interface Account {
  id: string;
  name: string;
  balance: number;
  type: "bank" | "card" | "wallet" | "cash";
  color: string;
}

const accountTypeIcons = {
  bank: Building2,
  card: CreditCard,
  wallet: Smartphone,
  cash: Banknote,
};

const accountTypeColors = {
  bank: { bg: "bg-blue-100", text: "text-blue-600" },
  card: { bg: "bg-purple-100", text: "text-purple-600" },
  wallet: { bg: "bg-indigo-100", text: "text-indigo-600" },
  cash: { bg: "bg-green-100", text: "text-green-600" },
};

export function AccountCards() {
  const accounts: Account[] = [
    {
      id: "1",
      name: "HDFC Bank",
      balance: 235975,
      type: "bank",
      color: "#8B5CF6",
    },
    {
      id: "2",
      name: "PhonePe Wallet",
      balance: 5430,
      type: "wallet",
      color: "#6366F1",
    },
    {
      id: "3",
      name: "ICICI Credit Card",
      balance: 20875,
      type: "card",
      color: "#F59E0B",
    },
    {
      id: "4",
      name: "Cash",
      balance: 9590,
      type: "cash",
      color: "#10B981",
    },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
      {accounts.map((account) => {
        const Icon = accountTypeIcons[account.type];
        const colors = accountTypeColors[account.type];

        return (
          <Card 
            key={account.id} 
            className="flex-shrink-0 w-[170px] hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-full ${colors.bg}`}>
                  <Icon className={`h-4 w-4 ${colors.text}`} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                </span>
              </div>
              <h4 className="font-medium mb-1 truncate">{account.name}</h4>
              <p className="text-xl font-bold">
                ₹{account.balance.toLocaleString('en-IN')}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
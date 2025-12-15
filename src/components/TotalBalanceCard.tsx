import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { Account } from "@/types/database";

interface TotalBalanceCardProps {
  totalBalance: number;
  accounts: Account[];
}

export function TotalBalanceCard({ totalBalance, accounts }: TotalBalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [showAccounts, setShowAccounts] = useState(false);

  return (
    <div className="p-4 space-y-3">
      <Card className="bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-700 text-white shadow-xl border-none overflow-hidden relative">
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm text-amber-200 mb-1 tracking-wide">Total Balance</p>
              {showBalance ? (
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                  ₹{totalBalance.toLocaleString('en-IN')}
                </h2>
              ) : (
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">••••••</h2>
              )}
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors border border-amber-300/30 backdrop-blur-sm"
            >
              {showBalance ? (
                <Eye className="h-5 w-5 text-amber-100" />
              ) : (
                <EyeOff className="h-5 w-5 text-amber-100" />
              )}
            </button>
          </div>

          <button
            onClick={() => setShowAccounts(!showAccounts)}
            className="w-full flex items-center justify-between p-3 bg-white/15 hover:bg-white/25 rounded-lg transition-colors border border-amber-300/20 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-white">
              View All Accounts ({accounts.length})
            </span>
            {showAccounts ? (
              <ChevronUp className="h-4 w-4 text-amber-200" />
            ) : (
              <ChevronDown className="h-4 w-4 text-amber-200" />
            )}
          </button>
        </CardContent>
      </Card>
      
      {/* Account list expansion can be implemented here later */}
    </div>
  );
}
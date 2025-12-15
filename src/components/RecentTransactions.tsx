import { TransactionCard } from "./TransactionCard";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { Transaction } from "@/types/database";
import Link from "next/link";

interface RecentTransactionsProps {
  transactions: Transaction[];
  onTransactionClick?: (transaction: Transaction) => void;
}

export function RecentTransactions({ transactions, onTransactionClick }: RecentTransactionsProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-muted-foreground">Recent Transactions</h3>
        <Link href="/transactions">
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
      
      <div className="space-y-3">
        {transactions.length === 0 ? (
           <p className="text-center text-sm text-muted-foreground py-4">No recent transactions</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              id={transaction.id}
              title={transaction.title || "Unknown"}
              category={transaction.categoryName?.toLowerCase() || "other"}
              amount={transaction.amount}
              date={new Date(transaction.transaction_date).toLocaleDateString()}
              type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
              onClick={() => onTransactionClick?.(transaction)}
            />
          ))
        )}
      </div>
    </div>
  );
}
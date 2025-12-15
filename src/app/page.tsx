"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { TotalBalanceCard } from "@/components/TotalBalanceCard";
import { BudgetCardsHorizontal } from "@/components/BudgetCardsHorizontal";
import { IncomeExpenseCards } from "@/components/IncomeExpenseCards";
import { SpendingChart } from "@/components/SpendingChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { BottomNav } from "@/components/BottomNav";
import { useDashboardData } from "@/hooks/useDashboardData";
import { AddTransactionSheet } from "@/components/AddTransactionSheet";
import { TransactionDetailSheet } from "@/components/TransactionDetailSheet";

export default function Home() {
  const { accounts, transactions, stats, loading } = useDashboardData();
  
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  if (loading) {
     return <div className="flex h-screen items-center justify-center text-muted-foreground">Loading wallet...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="max-w-md mx-auto space-y-4">
        <TotalBalanceCard 
            totalBalance={stats.totalBalance} 
            accounts={accounts} 
        />
        <BudgetCardsHorizontal />
        <IncomeExpenseCards 
            income={stats.monthlyIncome} 
            expense={stats.monthlyExpense} 
            savingsRate={stats.savingsRate}
        />
        <SpendingChart />
        <RecentTransactions 
            transactions={transactions}
            onTransactionClick={handleTransactionClick} 
        />
      </main>

      <BottomNav onAddClick={() => setIsAddTransactionOpen(true)} />

      <AddTransactionSheet 
        open={isAddTransactionOpen} 
        onOpenChange={setIsAddTransactionOpen} 
      />

      <TransactionDetailSheet
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        transaction={selectedTransaction}
      />
    </div>
  );
}
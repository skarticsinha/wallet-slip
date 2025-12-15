"use client";

import { useState } from "react";
import { TransactionsPage as TransactionsComponent } from "@/components/TransactionsPage";
import { BottomNav } from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import { AddTransactionSheet } from "@/components/AddTransactionSheet";
import { TransactionDetailSheet } from "@/components/TransactionDetailSheet";

export default function Transactions() {
  const router = useRouter();
  
  // Sheet States
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <TransactionsComponent 
        onBack={() => router.back()} 
        onTransactionClick={handleTransactionClick}
      />
      
      <BottomNav onAddClick={() => setIsAddTransactionOpen(true)} />

      {/* Sheets */}
      <AddTransactionSheet 
        open={isAddTransactionOpen} 
        onOpenChange={setIsAddTransactionOpen} 
      />

      <TransactionDetailSheet
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        transaction={selectedTransaction}
      />
    </>
  );
}
"use client";

import { LoansPage as LoansComponent } from "@/components/LoansPage";
import { useRouter } from "next/navigation";
import { useState } from "react";
// You can use the mock data temporarily until we connect DB
import { Loan } from "@/components/LoanTracker";

export default function Loans() {
  const router = useRouter();
  // Temporary local state for loans until Phase 4
  const [loans, setLoans] = useState<Loan[]>([]);

  return (
    <LoansComponent 
        onBack={() => router.back()} 
        loans={loans}
        onAddLoan={(newLoan) => {
            console.log("Add loan", newLoan);
            // Add temp logic here if you want to test UI
        }}
    />
  );
}
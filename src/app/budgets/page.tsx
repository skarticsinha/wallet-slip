"use client";
import { BudgetsPage } from "@/components/BudgetsPage";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  // Pass an onAddBudget prop if your component supports it
  return <BudgetsPage onBack={() => router.back()} />; 
}
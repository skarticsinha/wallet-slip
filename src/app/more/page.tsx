"use client";

import { MorePage as MorePageComponent } from "@/components/MorePage";
import { BottomNav } from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useState } from "react";
import { AddTransactionSheet } from "@/components/AddTransactionSheet"; // Ensure FAB works

export default function More() {
  const router = useRouter();
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  const handleNavigation = (option: string) => {
    // Map the IDs from MorePage.tsx to actual routes
    const routes: Record<string, string> = {
      accounts: "/accounts",
      settings: "/settings",
      loans: "/loans",
      goals: "/goals",
      categories: "/categories",
      subscriptions: "/subscriptions",
      scheduled: "/scheduled",
      budgets: "/budgets",
      calendar: "/transactions", // Calendar view usually lives in transactions
    };

    const route = routes[option];
    if (route) {
      router.push(route);
    } else {
      toast.info("This feature is coming soon!");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to log out");
    } else {
      toast.success("Logged out successfully");
      router.push("/login");
    }
  };

  return (
    <>
      <MorePageComponent 
        onBack={() => router.push('/')} 
        onNavigate={handleNavigation} 
        onLogout={handleLogout}
      />
      
      <BottomNav onAddClick={() => setIsAddTransactionOpen(true)} />
      
      {/* Allow adding transaction from any page via FAB */}
      <AddTransactionSheet 
        open={isAddTransactionOpen} 
        onOpenChange={setIsAddTransactionOpen} 
      />
    </>
  );
}
"use client";

import { GoalsPage as GoalsComponent } from "@/components/GoalsPage";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";

export default function Goals() {
  const router = useRouter();
  
  return (
    <>
      <GoalsComponent onBack={() => router.back()} />
      <BottomNav />
    </>
  );
}
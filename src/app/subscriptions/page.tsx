"use client";

import { SubscriptionsPage as SubscriptionsComponent } from "@/components/SubscriptionsPage";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";

export default function Subscriptions() {
  const router = useRouter();

  return (
    <>
      <SubscriptionsComponent onBack={() => router.back()} />
      <BottomNav />
    </>
  );
}
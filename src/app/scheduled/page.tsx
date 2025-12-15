"use client";
import { ScheduledPaymentsPage } from "@/components/ScheduledPaymentsPage";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return <ScheduledPaymentsPage onBack={() => router.back()} />;
}
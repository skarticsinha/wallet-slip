"use client";

import { NotificationsPage as NotificationsComponent } from "@/components/NotificationsPage";
import { useRouter } from "next/navigation";

export default function Notifications() {
  const router = useRouter();
  return <NotificationsComponent onBack={() => router.back()} />;
}
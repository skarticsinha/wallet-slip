"use client";

import { SettingsPage as SettingsComponent } from "@/components/SettingsPage";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  return (
    <SettingsComponent 
        onBack={() => router.back()} 
        onNavigate={(option) => router.push(`/${option}`)}
    />
  );
}
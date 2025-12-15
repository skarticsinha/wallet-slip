"use client";

import { ProfilePage as ProfileComponent } from "@/components/ProfilePage";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  return <ProfileComponent onBack={() => router.back()} />;
}
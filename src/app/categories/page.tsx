"use client";
import { CategoriesPage } from "@/components/CategoriesPage"; // Ensure this component handles 'Adding' internally or add a Sheet here
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return <CategoriesPage onBack={() => router.back()} />;
}
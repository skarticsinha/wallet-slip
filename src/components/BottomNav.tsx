"use client";

import { Home, Receipt, PieChart, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  onAddClick?: () => void;
}

export function BottomNav({ onAddClick }: BottomNavProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 z-50 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link href="/" className="w-full">
          <Button 
            variant="ghost" 
            className="flex flex-col gap-1 h-auto py-2 w-full hover:bg-transparent"
          >
            <Home className={`h-5 w-5 ${isActive("/") ? "fill-current text-primary" : "text-muted-foreground"}`} />
            <span className={`text-xs ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>Home</span>
          </Button>
        </Link>
        
        <Link href="/transactions" className="w-full">
          <Button 
            variant="ghost" 
            className="flex flex-col gap-1 h-auto py-2 w-full hover:bg-transparent"
          >
            <Receipt className={`h-5 w-5 ${isActive("/transactions") ? "fill-current text-primary" : "text-muted-foreground"}`} />
            <span className={`text-xs ${isActive("/transactions") ? "text-primary" : "text-muted-foreground"}`}>Transactions</span>
          </Button>
        </Link>
        
        <div className="relative -top-5">
            <Button 
            size="icon" 
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg border-4 border-background"
            onClick={onAddClick}
            >
            <Plus className="h-6 w-6" />
            </Button>
        </div>
        
        <Link href="/budgets" className="w-full">
          <Button 
            variant="ghost" 
            className="flex flex-col gap-1 h-auto py-2 w-full hover:bg-transparent"
          >
            <PieChart className={`h-5 w-5 ${isActive("/budgets") ? "fill-current text-primary" : "text-muted-foreground"}`} />
            <span className={`text-xs ${isActive("/budgets") ? "text-primary" : "text-muted-foreground"}`}>Budgets</span>
          </Button>
        </Link>
        
        <Link href="/more" className="w-full">
          <Button 
            variant="ghost" 
            className="flex flex-col gap-1 h-auto py-2 w-full hover:bg-transparent"
          >
            <MoreHorizontal className={`h-5 w-5 ${isActive("/more") ? "fill-current text-primary" : "text-muted-foreground"}`} />
            <span className={`text-xs ${isActive("/more") ? "text-primary" : "text-muted-foreground"}`}>More</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
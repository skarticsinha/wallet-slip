import { Bell, User } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

export function Header({ onNotificationsClick, onProfileClick }: HeaderProps = {}) {
  return (
    <header className="flex items-center justify-between p-4 bg-card border-b">
      <div>
        <h1 className="text-primary font-bold text-xl">Wallet Slip</h1>
        <p className="text-muted-foreground text-sm">Welcome back</p>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/notifications">
            <button 
            className="p-2 hover:bg-muted rounded-full transition-colors"
            >
            <div className="p-2 rounded-full bg-amber-100">
                <Bell className="h-4 w-4 text-amber-600" />
            </div>
            </button>
        </Link>
        <Link href="/profile">
            <button 
            className="p-2 hover:bg-muted rounded-full transition-colors"
            >
            <div className="p-2 rounded-full bg-indigo-100">
                <User className="h-4 w-4 text-indigo-600" />
            </div>
            </button>
        </Link>
      </div>
    </header>
  );
}
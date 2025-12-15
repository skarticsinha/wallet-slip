"use client";

import { 
  Settings, 
  Calendar, 
  CreditCard, 
  Target, 
  Shapes, 
  Receipt, 
  Repeat,
  ChevronRight,
  ArrowLeft,
  HelpCircle,
  Clock,
  Wallet,
  LogOut
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface MorePageProps {
  onBack: () => void;
  onNavigate: (option: string) => void;
  onLogout: () => void; // Added logout prop
}

export function MorePage({ onBack, onNavigate, onLogout }: MorePageProps) {
  const moreOptions = [
    {
      id: "accounts", // New Account Manager
      title: "Accounts & Wallets",
      description: "Manage bank accounts, cash, and cards",
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "categories",
      title: "Categories",
      description: "Manage expense and income categories",
      icon: Shapes,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: "budgets",
      title: "Budgets",
      description: "Set spending limits and alerts",
      icon: Receipt, // Using Receipt or generic icon for Budget
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: "goals",
      title: "Goals",
      description: "Set and track savings goals",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "loans",
      title: "Loans",
      description: "Track money lent and borrowed",
      icon: CreditCard,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      id: "subscriptions",
      title: "Subscriptions",
      description: "Manage recurring subscriptions",
      icon: Repeat,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      id: "scheduled",
      title: "Scheduled Payments",
      description: "Set up automatic transactions",
      icon: Clock,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
    {
      id: "settings",
      title: "Settings",
      description: "Theme, Language, Profile",
      icon: Settings,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24"> {/* Added padding bottom for nav */}
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">More Actions</h1>
          <button className="ml-auto p-2 hover:bg-muted rounded-full transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Premium Banner */}
        <Card className="bg-gradient-to-br from-purple-200 via-purple-100 to-blue-100 border-purple-200 shadow-sm overflow-hidden relative">
          <CardContent className="p-5 flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-purple-900">Wallet Slip</h3>
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider shadow-sm">
                  Pro
                </span>
              </div>
              <p className="text-sm text-purple-800/80 font-medium">Unlock advanced insights & features</p>
            </div>
            <ChevronRight className="h-5 w-5 text-purple-900" />
          </CardContent>
        </Card>

        {/* Options List */}
        <div className="space-y-3">
          {moreOptions.map((option) => (
            <Card
              key={option.id}
              className="cursor-pointer hover:bg-accent/50 transition-all active:scale-[0.99] border-border/50 shadow-sm"
              onClick={() => onNavigate(option.id)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${option.bgColor} flex-shrink-0`}>
                  <option.icon className={`h-5 w-5 ${option.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-0.5">{option.title}</h3>
                  <p className="text-xs text-muted-foreground truncate font-medium">
                    {option.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
              </CardContent>
            </Card>
          ))}

          {/* Logout Button (Styled to match but distinct) */}
          <Card
            className="cursor-pointer hover:bg-red-50 transition-all active:scale-[0.99] border-red-100 shadow-sm mt-6"
            onClick={onLogout}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-100 flex-shrink-0">
                <LogOut className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-red-700 mb-0.5">Logout</h3>
                <p className="text-xs text-red-600/70 truncate font-medium">
                  Sign out of your account
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
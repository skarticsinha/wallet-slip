"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Card, CardContent } from "./ui/card";
import { ShoppingBag, Utensils, Car, Home, Zap, Heart, ShoppingCart, GraduationCap, Upload, CalendarIcon, X, FileText, ChevronDown, ChevronUp, Plus, TrendingDown, TrendingUp, Briefcase, DollarSign, Gift, Repeat, Wallet } from "lucide-react";
import { format } from "date-fns";
import { EnhancedIconPicker } from "./EnhancedIconPicker";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import supabase from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Account } from "@/types/database";
import { useAuth } from "@/hooks/useAuth"; // <--- Added Hook

interface AddTransactionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

// --- Default Categories ---
const defaultExpenseCategories = [
  { id: "groceries", label: "Groceries", icon: ShoppingCart, image: null, iconColor: "text-blue-600", bgColor: "bg-blue-100", imageFit: "cover" },
  { id: "food", label: "Food & Dining", icon: Utensils, image: null, iconColor: "text-orange-600", bgColor: "bg-orange-100", imageFit: "cover" },
  { id: "transport", label: "Transport", icon: Car, image: null, iconColor: "text-purple-600", bgColor: "bg-purple-100", imageFit: "cover" },
  { id: "rent", label: "Rent", icon: Home, image: null, iconColor: "text-green-600", bgColor: "bg-green-100", imageFit: "cover" },
  { id: "bills", label: "Bills & Utilities", icon: Zap, image: null, iconColor: "text-yellow-600", bgColor: "bg-yellow-100", imageFit: "cover" },
  { id: "health", label: "Healthcare", icon: Heart, image: null, iconColor: "text-red-600", bgColor: "bg-red-100", imageFit: "cover" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, image: null, iconColor: "text-pink-600", bgColor: "bg-pink-100", imageFit: "cover" },
  { id: "education", label: "Education", icon: GraduationCap, image: null, iconColor: "text-indigo-600", bgColor: "bg-indigo-100", imageFit: "cover" },
];

const defaultIncomeCategories = [
  { id: "salary", label: "Salary", icon: Briefcase, image: null, iconColor: "text-blue-600", bgColor: "bg-blue-100", imageFit: "cover" },
  { id: "freelance", label: "Freelance", icon: DollarSign, image: null, iconColor: "text-purple-600", bgColor: "bg-purple-100", imageFit: "cover" },
  { id: "investment", label: "Investment", icon: TrendingUp, image: null, iconColor: "text-green-600", bgColor: "bg-green-100", imageFit: "cover" },
  { id: "gift", label: "Gift", icon: Gift, image: null, iconColor: "text-pink-600", bgColor: "bg-pink-100", imageFit: "cover" },
  { id: "refund", label: "Refund", icon: Repeat, image: null, iconColor: "text-orange-600", bgColor: "bg-orange-100", imageFit: "cover" },
  { id: "other", label: "Other", icon: DollarSign, image: null, iconColor: "text-gray-600", bgColor: "bg-gray-100", imageFit: "cover" },
];

const getCurrencyRate = (currency: string): number => {
  const rates: { [key: string]: number } = { INR: 1, USD: 83.5, EUR: 93, GBP: 105, JPY: 0.56 };
  return rates[currency] || 1;
};

export function AddTransactionSheet({ open, onOpenChange, onSuccess }: AddTransactionSheetProps) {
  const { user } = useAuth(); // <--- Get current user
  
  // State
  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [note, setNote] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Account State
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  // Categories UI State
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [customExpenseCategories, setCustomExpenseCategories] = useState<any[]>([]);
  const [customIncomeCategories, setCustomIncomeCategories] = useState<any[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  
  // Custom Category Picker State
  const [selectedIcon, setSelectedIcon] = useState<any>(ShoppingBag);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedIconColor, setSelectedIconColor] = useState("text-teal-600");
  const [selectedBgColor, setSelectedBgColor] = useState("bg-teal-100");
  const [selectedImageFit, setSelectedImageFit] = useState("cover");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  
  // Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. Fetch Accounts on Mount ---
  useEffect(() => {
    if (open && user) { // Only fetch if user exists
      const fetchAccounts = async () => {
        const { data } = await supabase
            .from("accounts")
            .select("*")
            .eq('owner_id', user.id) // Filter by owner
            .order("name");
            
        if (data) {
          setAccounts(data);
          if (data.length > 0 && !selectedAccountId) {
            setSelectedAccountId(data[0].id);
          }
        }
      };
      fetchAccounts();
    }
  }, [open, user]);

  // UI Helpers (colors, etc)
  const currentCategories = transactionType === "expense" 
    ? [...defaultExpenseCategories, ...customExpenseCategories]
    : [...defaultIncomeCategories, ...customIncomeCategories];
  
  const visibleCategories = showAllCategories 
    ? currentCategories 
    : currentCategories.slice(0, transactionType === "expense" ? 8 : 6);

  const themeColors = transactionType === "expense" 
    ? {
        gradient: "from-red-50 via-orange-50 to-pink-50",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        cardGradient: "from-red-50 to-orange-50",
        cardBorder: "border-red-200",
        textAccent: "text-red-900",
        textMuted: "text-red-700",
        buttonGradient: "from-red-500 to-orange-500",
        buttonHover: "from-red-600 to-orange-600",
        borderTop: "border-t-red-500"
      }
    : {
        gradient: "from-green-50 via-emerald-50 to-teal-50",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        cardGradient: "from-green-50 to-emerald-50",
        cardBorder: "border-green-200",
        textAccent: "text-green-900",
        textMuted: "text-green-700",
        buttonGradient: "from-green-500 to-emerald-500",
        buttonHover: "from-green-600 to-emerald-600",
        borderTop: "border-t-green-500"
      };

  // Handlers
  const handleAddAttachment = () => {
    setAttachments([...attachments, `attachment-${attachments.length + 1}.jpg`]);
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: newCategoryName.toLowerCase().replace(/\s+/g, "-"),
        label: newCategoryName,
        icon: selectedIcon,
        image: selectedImage || null,
        iconColor: selectedIconColor,
        bgColor: selectedBgColor,
        imageFit: selectedImageFit,
      };

      if (transactionType === "expense") {
        setCustomExpenseCategories([...customExpenseCategories, newCategory]);
      } else {
        setCustomIncomeCategories([...customIncomeCategories, newCategory]);
      }

      setNewCategoryName("");
      setSelectedImage("");
      setShowAddCategory(false);
    }
  };

  const handleTypeChange = (type: "expense" | "income") => {
    setTransactionType(type);
    setSelectedCategory("");
  };

  // --- 2. Save Logic with Supabase ---
  const handleSave = async () => {
    if (!user) {
        toast.error("You must be logged in to save.");
        return;
    }

    if (!amount || !selectedCategory || !selectedAccountId) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const finalAmount = parseFloat(amount);

      // A. Insert Transaction
      const { error: txError } = await supabase.from("transactions").insert({
        amount: finalAmount,
        type: transactionType.toUpperCase(), // 'INCOME' or 'EXPENSE'
        description: title,
        transaction_date: date.toISOString(),
        paid_from_account_id: transactionType === 'expense' ? selectedAccountId : null,
        paid_to_account_id: transactionType === 'income' ? selectedAccountId : null,
        paid_by_id: user.id // <--- CRITICAL FIX: Storing User ID
      });

      if (txError) throw txError;

      // B. Update Account Balance
      const { data: accData, error: accFetchError } = await supabase
        .from("accounts")
        .select("current_balance")
        .eq("id", selectedAccountId)
        .single();

      if (accFetchError) throw accFetchError;

      const newBalance = transactionType === 'income' 
        ? accData.current_balance + finalAmount
        : accData.current_balance - finalAmount;

      const { error: updateError } = await supabase
        .from("accounts")
        .update({ current_balance: newBalance })
        .eq("id", selectedAccountId);

      if (updateError) throw updateError;

      toast.success("Transaction added successfully");
      
      // Reset Form
      setAmount("");
      setTitle("");
      setNote("");
      setSelectedCategory("");
      onSuccess?.(); 
      onOpenChange(false);

    } catch (error: any) {
      console.error("Error saving transaction:", error);
      toast.error(error.message || "Failed to save transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className={`h-[90vh] rounded-t-3xl p-0 border-t-4 ${themeColors.borderTop}`}>
          {/* Header */}
          <div className={`px-6 pt-6 pb-4 bg-gradient-to-br ${themeColors.gradient} border-b`}>
            <SheetHeader>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${themeColors.iconBg}`}>
                    {transactionType === "expense" ? (
                      <TrendingDown className={`h-6 w-6 ${themeColors.iconColor}`} />
                    ) : (
                      <TrendingUp className={`h-6 w-6 ${themeColors.iconColor}`} />
                    )}
                  </div>
                  <div>
                    <SheetTitle className="text-2xl">Add Transaction</SheetTitle>
                    <SheetDescription className="text-sm">
                      Track your {transactionType}
                    </SheetDescription>
                  </div>
                </div>
              </div>

              {/* Type Toggles */}
              <div className="flex gap-2 bg-white/80 p-1 rounded-lg">
                <button
                  onClick={() => handleTypeChange("expense")}
                  className={`flex-1 py-2.5 px-4 rounded-md transition-all ${
                    transactionType === "expense"
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <TrendingDown className="h-4 w-4" />
                    <span className="font-medium">Expense</span>
                  </div>
                </button>
                <button
                  onClick={() => handleTypeChange("income")}
                  className={`flex-1 py-2.5 px-4 rounded-md transition-all ${
                    transactionType === "income"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium">Income</span>
                  </div>
                </button>
              </div>
            </SheetHeader>
          </div>

          <div className="px-6 space-y-5 py-6 overflow-y-auto max-h-[calc(90vh-280px)] hide-scrollbar">
            
            {/* 1. Account Selection */}
            <div className="space-y-2">
                <Label className={themeColors.textAccent}>
                    {transactionType === 'expense' ? 'Paid From' : 'Deposit To'} *
                </Label>
                <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                <SelectTrigger className="h-12 bg-white">
                    <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                    {accounts.map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                            <div className="flex items-center gap-2">
                                <Wallet className="h-4 w-4 text-muted-foreground"/>
                                <span>{acc.name}</span>
                                <span className="text-muted-foreground text-xs ml-1">(₹{acc.current_balance})</span>
                            </div>
                        </SelectItem>
                    ))}
                    {accounts.length === 0 && (
                         <div className="p-2 text-sm text-center text-muted-foreground">No accounts found. Create one first!</div>
                    )}
                </SelectContent>
                </Select>
            </div>

            {/* 2. Amount Input */}
            <Card className={`bg-gradient-to-br ${themeColors.cardGradient} ${themeColors.cardBorder} shadow-sm`}>
              <CardContent className="p-4 space-y-3">
                <Label className={themeColors.textAccent}>Amount *</Label>
                <div className="flex gap-2">
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger className={`w-24 bg-white ${themeColors.cardBorder}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">₹ INR</SelectItem>
                      <SelectItem value="USD">$ USD</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={`h-14 text-2xl font-semibold bg-white ${themeColors.cardBorder}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder={transactionType === "expense" ? "e.g., Grocery Shopping" : "e.g., Monthly Salary"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12"
              />
            </div>

            {/* 4. Categories */}
            <div className="space-y-3">
              <Label>Category *</Label>
              <div className={`grid ${transactionType === "expense" ? "grid-cols-4" : "grid-cols-3"} gap-2`}>
                {visibleCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                        isSelected
                          ? `${category.bgColor} ring-2 ring-offset-2 ${category.iconColor.replace('text-', 'ring-')} shadow-md scale-105`
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {category.image ? (
                         <div className={`w-8 h-8 rounded-full overflow-hidden ${isSelected ? 'bg-white/80' : category.bgColor}`}>
                          <ImageWithFallback
                            src={category.image}
                            alt={category.label}
                            className={`w-full h-full ${category.imageFit === 'contain' ? 'object-contain' : category.imageFit === 'cover' ? 'object-cover' : 'object-fill'}`}
                          />
                        </div>
                      ) : (
                        <div className={`p-2 rounded-full ${isSelected ? 'bg-white/80' : category.bgColor}`}>
                          <Icon className={`h-4 w-4 ${isSelected ? category.iconColor : category.iconColor}`} />
                        </div>
                      )}
                      <span className={`text-xs text-center leading-tight ${isSelected ? category.iconColor : 'text-muted-foreground'}`}>
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex gap-2">
                {currentCategories.length > (transactionType === "expense" ? 8 : 6) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                  >
                    {showAllCategories ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Show More
                      </>
                    )}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-dashed"
                  onClick={() => setShowAddCategory(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </div>

            {/* 5. Date */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-12 bg-muted/50">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      if (newDate) {
                        setDate(newDate);
                        setShowCalendar(false);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* 6. Note */}
            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Add any additional details..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Attachments - Expenses Only */}
            {transactionType === "expense" && (
              <div className="space-y-2 pb-4">
                <Label>Attachments</Label>
                <div className="space-y-2">
                  {attachments.map((attachment, index) => (
                    <Card key={index}>
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-blue-100">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="flex-1 text-sm">{attachment}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                            onClick={() => handleRemoveAttachment(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full border-dashed h-12"
                    onClick={handleAddAttachment}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Add Attachment
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-background border-t space-y-2">
            <Button 
              className={`w-full h-12 bg-gradient-to-r ${themeColors.buttonGradient} hover:${themeColors.buttonHover} text-white shadow-md`}
              onClick={handleSave} 
              disabled={!amount || !selectedCategory || !title || !selectedAccountId || isSubmitting}
            >
              {isSubmitting ? "Saving..." : (
                <>
                  <Plus className="mr-2 h-5 w-5" />
                  Add {transactionType === "expense" ? "Expense" : "Income"}
                </>
              )}
            </Button>
            <Button variant="outline" className="w-full h-12" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Category Dialog - Unchanged */}
      <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Category</DialogTitle>
            <DialogDescription>
              Create a new {transactionType} category
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                placeholder={transactionType === "expense" ? "e.g., Entertainment" : "e.g., Bonus"}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <EnhancedIconPicker
              selectedIcon={selectedIcon}
              selectedImage={selectedImage}
              selectedIconColor={selectedIconColor}
              selectedBgColor={selectedBgColor}
              selectedImageFit={selectedImageFit}
              onSelectIcon={setSelectedIcon}
              onSelectImage={setSelectedImage}
              onSelectIconColor={setSelectedIconColor}
              onSelectBgColor={setSelectedBgColor}
              onSelectImageFit={setSelectedImageFit}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCategory(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
import { useState } from "react";
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
import { Briefcase, DollarSign, TrendingUp, Gift, Repeat, CalendarIcon, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { format } from "date-fns";

interface AddIncomeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultIncomeCategories = [
  { id: "salary", label: "Salary", icon: Briefcase, color: "bg-blue-100", textColor: "text-blue-600" },
  { id: "freelance", label: "Freelance", icon: DollarSign, color: "bg-purple-100", textColor: "text-purple-600" },
  { id: "investment", label: "Investment", icon: TrendingUp, color: "bg-green-100", textColor: "text-green-600" },
  { id: "gift", label: "Gift", icon: Gift, color: "bg-pink-100", textColor: "text-pink-600" },
  { id: "refund", label: "Refund", icon: Repeat, color: "bg-orange-100", textColor: "text-orange-600" },
  { id: "other", label: "Other", icon: DollarSign, color: "bg-gray-100", textColor: "text-gray-600" },
];

// Helper function for currency conversion rates (INR to other currencies)
const getCurrencyRate = (currency: string): number => {
  const rates: { [key: string]: number } = {
    INR: 1,
    USD: 83.5,
    EUR: 93,
    GBP: 105,
    JPY: 0.56,
  };
  return rates[currency] || 1;
};

export function AddIncomeSheet({ open, onOpenChange }: AddIncomeSheetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [note, setNote] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [customCategories, setCustomCategories] = useState<Array<{ id: string; label: string; icon: any; color: string; textColor: string }>>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");

  const allCategories = [...defaultIncomeCategories, ...customCategories];
  const visibleCategories = showAllCategories ? allCategories : allCategories.slice(0, 6);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      setCustomCategories([
        ...customCategories,
        {
          id: newCategoryName.toLowerCase().replace(/\s+/g, "-"),
          label: newCategoryName,
          icon: DollarSign,
          color: "bg-teal-100",
          textColor: "text-teal-600",
        },
      ]);
      setNewCategoryName("");
      setShowAddCategory(false);
    }
  };

  const handleSave = () => {
    // Handle save logic
    console.log({ selectedCategory, amount, source, date, note });
    onOpenChange(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 border-t-4 border-t-green-500">
          {/* Header with gradient */}
          <div className="px-6 pt-6 pb-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-b">
            <SheetHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-full bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <SheetTitle className="text-2xl">Add Income</SheetTitle>
                  <SheetDescription className="text-sm">
                    Record your earnings with details
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="px-6 space-y-5 py-6 overflow-y-auto max-h-[calc(85vh-250px)] hide-scrollbar">
            {/* Amount Input with Currency Selector */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <Label className="text-green-900">Amount *</Label>
                <div className="flex gap-2">
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger className="w-24 bg-white border-green-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">₹ INR</SelectItem>
                      <SelectItem value="USD">$ USD</SelectItem>
                      <SelectItem value="EUR">€ EUR</SelectItem>
                      <SelectItem value="GBP">£ GBP</SelectItem>
                      <SelectItem value="JPY">¥ JPY</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-14 text-2xl font-semibold bg-white border-green-200"
                    />
                  </div>
                </div>
                {selectedCurrency !== "INR" && amount && (
                  <p className="text-sm text-green-700">
                    ≈ ₹{(parseFloat(amount) * getCurrencyRate(selectedCurrency)).toLocaleString('en-IN', { maximumFractionDigits: 2 })} INR
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Source */}
            <div className="space-y-2">
              <Label htmlFor="source">Source *</Label>
              <Input
                id="source"
                placeholder="e.g., Monthly Salary, Freelance Project"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <Label>Category *</Label>
              <div className="grid grid-cols-3 gap-2">
                {visibleCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                        isSelected
                          ? `${category.color} ring-2 ring-offset-2 ${category.textColor.replace('text-', 'ring-')} shadow-md scale-105`
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      <div className={`p-2 rounded-full ${isSelected ? 'bg-white/80' : category.color}`}>
                        <Icon className={`h-5 w-5 ${isSelected ? category.textColor : category.textColor}`} />
                      </div>
                      <span className={`text-xs text-center leading-tight ${isSelected ? category.textColor : 'text-muted-foreground'}`}>
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Show More/Less and Add Category buttons */}
              <div className="flex gap-2">
                {allCategories.length > 6 && (
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
                        Show More ({allCategories.length - 6})
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

            {/* Date Picker */}
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

            {/* Note */}
            <div className="space-y-2 pb-4">
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
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-background border-t space-y-2">
            <Button 
              className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md" 
              onClick={handleSave}
              disabled={!amount || !selectedCategory || !source}
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Income
            </Button>
            <Button variant="outline" className="w-full h-12" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Category Dialog */}
      <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Income Category</DialogTitle>
            <DialogDescription>
              Create a new category for your income sources
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="income-category-name">Category Name</Label>
              <Input
                id="income-category-name"
                placeholder="e.g., Bonus, Rental Income, Side Business"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCategory();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCategory(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddCategory} 
              disabled={!newCategoryName.trim()}
              className="bg-green-500 hover:bg-green-600"
            >
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

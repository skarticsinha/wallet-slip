import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  HandCoins, TrendingUp, TrendingDown, Plus, User, Building2, 
  Calendar as CalendarIcon, X 
} from "lucide-react";
import { format } from "date-fns";

export interface Loan {
  id: string;
  type: "lent" | "borrowed";
  amount: number;
  person: string;
  personType: "person" | "bank" | "online";
  reason: string;
  date: string;
  dueDate?: string;
  status: "pending" | "partial" | "completed";
  paidAmount: number;
  note?: string;
}

interface LoanManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLoan: (loan: Omit<Loan, "id" | "status" | "paidAmount">) => void;
}

export function LoanManager({ open, onOpenChange, onAddLoan }: LoanManagerProps) {
  const [loanType, setLoanType] = useState<"lent" | "borrowed">("borrowed");
  const [amount, setAmount] = useState("");
  const [person, setPerson] = useState("");
  const [personType, setPersonType] = useState<"person" | "bank" | "online">("person");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [note, setNote] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDueCalendar, setShowDueCalendar] = useState(false);

  const handleSubmit = () => {
    if (!amount || !person || !reason) return;

    onAddLoan({
      type: loanType,
      amount: parseFloat(amount),
      person,
      personType,
      reason,
      date: format(date, "MMM dd, yyyy"),
      dueDate: dueDate ? format(dueDate, "MMM dd, yyyy") : undefined,
      note,
    });

    // Reset form
    setAmount("");
    setPerson("");
    setPersonType("person");
    setReason("");
    setDate(new Date());
    setDueDate(undefined);
    setNote("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HandCoins className="h-5 w-5" />
            Add Loan
          </DialogTitle>
          <DialogDescription>
            Track money you've lent to others or borrowed from banks, apps, or people
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4 overflow-y-auto max-h-[60vh] hide-scrollbar px-1">
          {/* Loan Type */}
          <div className="space-y-3">
            <Label>Transaction Type</Label>
            <RadioGroup value={loanType} onValueChange={(v: any) => setLoanType(v)}>
              <div className="grid grid-cols-2 gap-3">
                <label
                  htmlFor="borrowed"
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    loanType === "borrowed"
                      ? "border-red-500 bg-red-500/5"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <RadioGroupItem value="borrowed" id="borrowed" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-red-600">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm">Borrowed</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Money you owe</p>
                  </div>
                </label>

                <label
                  htmlFor="lent"
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    loanType === "lent"
                      ? "border-green-500 bg-green-500/5"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <RadioGroupItem value="lent" id="lent" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">Lent</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Money owed to you</p>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="loan-amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="loan-amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Person Type */}
          <div className="space-y-2">
            <Label>Source/Recipient Type</Label>
            <RadioGroup value={personType} onValueChange={(v: any) => setPersonType(v)}>
              <div className="flex gap-2">
                <label
                  htmlFor="person"
                  className={`flex-1 flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    personType === "person"
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem value="person" id="person" />
                  <User className="h-4 w-4" />
                  <span className="text-sm">Person</span>
                </label>

                <label
                  htmlFor="bank"
                  className={`flex-1 flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    personType === "bank"
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem value="bank" id="bank" />
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm">Bank</span>
                </label>

                <label
                  htmlFor="online"
                  className={`flex-1 flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    personType === "online"
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem value="online" id="online" />
                  <span className="text-sm">App/Online</span>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Person/Entity Name */}
          <div className="space-y-2">
            <Label htmlFor="person-name">
              {personType === "person" ? "Person Name" : personType === "bank" ? "Bank Name" : "App/Service Name"}
            </Label>
            <Input
              id="person-name"
              placeholder={
                personType === "person" 
                  ? "e.g., John Doe" 
                  : personType === "bank" 
                  ? "e.g., HDFC Bank, SBI" 
                  : "e.g., PayLater, Lazypay"
              }
              value={person}
              onChange={(e) => setPerson(e.target.value)}
            />
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason/Purpose</Label>
            <Input
              id="reason"
              placeholder="e.g., Medical Emergency, Business Investment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "MMM dd, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      if (date) {
                        setDate(date);
                        setShowCalendar(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Due Date (Optional)</Label>
              <Popover open={showDueCalendar} onOpenChange={setShowDueCalendar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "MMM dd") : "Select"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date);
                      setShowDueCalendar(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="loan-note">Note (Optional)</Label>
            <Textarea
              id="loan-note"
              placeholder="Add any additional details..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!amount || !person || !reason}>
            Add Loan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

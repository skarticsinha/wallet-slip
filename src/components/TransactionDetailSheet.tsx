import { useState } from "react";
import {
  X,
  ShoppingCart,
  Coffee,
  Car,
  Home,
  Zap,
  Heart,
  MoreHorizontal,
  Edit3,
  Trash2,
  Calendar,
  Wallet,
  StickyNote,
  Image as ImageIcon,
  Repeat,
  Building2,
  Share2,
  Copy,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface TransactionDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  transaction: any;
}

const categoryIcons = {
  groceries: ShoppingCart,
  food: Coffee,
  transport: Car,
  bills: Zap,
  entertainment: Home,
  shopping: ShoppingCart,
  health: Heart,
  other: MoreHorizontal,
};

const categoryColors = {
  groceries: { bg: "bg-green-100", text: "text-green-600" },
  food: { bg: "bg-orange-100", text: "text-orange-600" },
  transport: { bg: "bg-blue-100", text: "text-blue-600" },
  bills: { bg: "bg-purple-100", text: "text-purple-600" },
  entertainment: { bg: "bg-indigo-100", text: "text-indigo-600" },
  shopping: { bg: "bg-pink-100", text: "text-pink-600" },
  health: { bg: "bg-red-100", text: "text-red-600" },
  other: { bg: "bg-gray-100", text: "text-gray-600" },
};

export function TransactionDetailSheet({ open, onOpenChange, onEdit, transaction }: TransactionDetailSheetProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!open || !transaction) return null;

  const IconComponent = categoryIcons[transaction.category as keyof typeof categoryIcons] || MoreHorizontal;
  const colors = categoryColors[transaction.category as keyof typeof categoryColors] || categoryColors.other;
  const isExpense = transaction.amount < 0;

  const handleDelete = () => {
    // Delete transaction logic here
    console.log("Delete transaction:", transaction.id);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => onOpenChange(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-xl">Transaction Details</h2>
          <button
            onClick={onEdit}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Edit3 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto pb-24" style={{ height: "calc(100vh - 73px)" }}>
        <div className="p-4 space-y-6">
          {/* Amount Card */}
          <Card className={`${isExpense ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${colors.bg}`}>
                  <IconComponent className={`h-8 w-8 ${colors.text}`} />
                </div>
              </div>
              <div className={`text-4xl font-semibold mb-2 ${isExpense ? "text-red-600" : "text-green-600"}`}>
                {isExpense ? "-" : "+"}₹{Math.abs(transaction.amount).toLocaleString("en-IN")}
              </div>
              <div className="text-sm text-muted-foreground">{transaction.title}</div>
              {transaction.inrAmount && (
                <div className="text-xs text-muted-foreground mt-1">
                  {transaction.inrAmount}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details */}
          <div className="space-y-3">
            <h3 className="font-medium text-muted-foreground">Details</h3>

            {/* Category */}
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${colors.bg}`}>
                    <IconComponent className={`h-4 w-4 ${colors.text}`} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Category</div>
                    <div className="capitalize">{transaction.category}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account */}
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Account</div>
                    <div>HDFC Bank</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date */}
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-purple-100">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Date</div>
                    <div>{transaction.date}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {transaction.tag && (
              <Card>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-2">Tags</div>
                  <span className="inline-block bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
                    {transaction.tag}
                  </span>
                </CardContent>
              </Card>
            )}

            {/* Flags */}
            {(transaction.isRecurring || transaction.isScheduled) && (
              <Card>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-2">Flags</div>
                  <div className="flex gap-2">
                    {transaction.isRecurring && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full">
                        <Repeat className="h-4 w-4" />
                        <span className="text-sm">Recurring</span>
                      </div>
                    )}
                    {transaction.isScheduled && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-600 rounded-full">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Scheduled</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Note */}
            {transaction.hasNote && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-amber-100">
                      <StickyNote className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Note</div>
                      <div className="text-sm">
                        Bought vegetables and fruits from the local market. Got a good deal on mangoes.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Attachments */}
            {transaction.hasAttachments && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <ImageIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Attachments</div>
                      <div className="text-sm">{transaction.attachmentCount || 1} image(s)</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: transaction.attachmentCount || 1 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-muted rounded-lg flex items-center justify-center"
                      >
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
              <Copy className="h-5 w-5" />
              <span>Duplicate</span>
            </button>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
            <span>Delete Transaction</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Delete Transaction?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                This action cannot be undone. Are you sure you want to delete this transaction?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
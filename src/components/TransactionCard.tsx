import { ShoppingCart, Coffee, Car, Home, MoreHorizontal, Paperclip, StickyNote, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { AttachmentViewer } from "./AttachmentViewer";

interface Attachment {
  id: string;
  type: 'image' | 'note';
  url?: string;
  content?: string;
  name: string;
}

interface TransactionCardProps {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: "expense" | "income";
  attachments?: Attachment[];
  note?: string;
  onClick?: () => void;
}

const categoryIcons = {
  groceries: ShoppingCart,
  food: Coffee,
  transport: Car,
  bills: Home,
  other: MoreHorizontal,
};

const categoryColors = {
  groceries: { bg: "bg-green-100", text: "text-green-600" },
  food: { bg: "bg-orange-100", text: "text-orange-600" },
  transport: { bg: "bg-blue-100", text: "text-blue-600" },
  bills: { bg: "bg-purple-100", text: "text-purple-600" },
  other: { bg: "bg-gray-100", text: "text-gray-600" },
};

export function TransactionCard({ title, category, amount, date, type, attachments = [], note, onClick }: TransactionCardProps) {
  const [showAttachments, setShowAttachments] = useState(false);
  const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || MoreHorizontal;
  const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors.other;
  
  const hasAttachments = attachments.length > 0;
  const hasNote = !!note;
  const hasImages = attachments.some(att => att.type === 'image');
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <>
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleClick}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${colors.bg}`}>
                <IconComponent className={`h-5 w-5 ${colors.text}`} />
              </div>
              <div>
                <div className="font-medium">{title}</div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground capitalize">{category}</div>
                  {(hasAttachments || hasNote) && (
                    <div className="flex items-center gap-1">
                      {hasImages && (
                        <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          <ImageIcon className="h-3 w-3" />
                          <span>{attachments.filter(att => att.type === 'image').length}</span>
                        </div>
                      )}
                      {hasNote && (
                        <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                          <StickyNote className="h-3 w-3" />
                        </div>
                      )}
                      {attachments.some(att => att.type === 'note') && (
                        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                          <Paperclip className="h-3 w-3" />
                          <span>{attachments.filter(att => att.type === 'note').length}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-medium ${type === "expense" ? "text-red-600" : "text-green-600"}`}>
                {type === "expense" ? "-" : "+"}₹{Math.abs(amount).toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-muted-foreground">{date}</div>
            </div>
          </div>
          
          {hasNote && (
            <div className="mt-3 text-sm text-muted-foreground bg-amber-50 p-2 rounded border-l-2 border-amber-200">
              <div className="flex items-start gap-2">
                <StickyNote className="h-3 w-3 mt-0.5 text-amber-600" />
                <span className="italic">"{note}"</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AttachmentViewer
        isOpen={showAttachments}
        onClose={() => setShowAttachments(false)}
        attachments={attachments}
        transactionTitle={title}
      />
    </>
  );
}
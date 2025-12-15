import { X, Download, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Attachment {
  id: string;
  type: 'image' | 'note';
  url?: string;
  content?: string;
  name: string;
}

interface AttachmentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  attachments: Attachment[];
  transactionTitle: string;
}

export function AttachmentViewer({ isOpen, onClose, attachments, transactionTitle }: AttachmentViewerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{transactionTitle}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="border rounded-lg p-3">
              {attachment.type === 'image' && attachment.url ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{attachment.name}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="aspect-video rounded-md overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={attachment.url}
                      alt={attachment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-xs text-blue-600">N</span>
                    </div>
                    <span className="text-sm font-medium">{attachment.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                    {attachment.content}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {attachments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No attachments found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
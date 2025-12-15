import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Camera, Upload, FileText, Check, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ScanReceiptSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReceiptScanned?: (data: any) => void;
}

export function ScanReceiptSheet({ open, onOpenChange, onReceiptScanned }: ScanReceiptSheetProps) {
  const [step, setStep] = useState<"upload" | "processing" | "review">("upload");
  const [scannedData, setScannedData] = useState({
    merchant: "",
    amount: "",
    date: "",
    items: [] as string[],
  });

  const handleUpload = () => {
    // Simulate file upload and OCR processing
    setStep("processing");
    
    // Simulate OCR extraction
    setTimeout(() => {
      setScannedData({
        merchant: "Reliance Fresh",
        amount: "2,456",
        date: "Nov 13, 2025",
        items: ["Rice 5kg - ₹450", "Cooking Oil 1L - ₹180", "Vegetables - ₹320", "Dairy Products - ₹506", "Others - ₹1000"],
      });
      setStep("review");
    }, 2000);
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    handleUpload();
  };

  const handleConfirm = () => {
    onReceiptScanned?.(scannedData);
    onOpenChange(false);
    // Reset for next use
    setTimeout(() => {
      setStep("upload");
      setScannedData({ merchant: "", amount: "", date: "", items: [] });
    }, 300);
  };

  const handleRetry = () => {
    setStep("upload");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
        <SheetHeader className="pb-6">
          <SheetTitle>Scan Receipt</SheetTitle>
          <SheetDescription>
            Automatically extract transaction details from your receipt image
          </SheetDescription>
        </SheetHeader>

        {step === "upload" && (
          <div className="flex flex-col items-center justify-center h-[calc(85vh-180px)] space-y-6">
            <div className="w-40 h-40 bg-accent rounded-full flex items-center justify-center">
              <Camera className="h-20 w-20 text-muted-foreground" />
            </div>
            
            <div className="text-center space-y-2">
              <h3>Capture or Upload Receipt</h3>
              <p className="text-muted-foreground text-sm">
                Automatically extract transaction details from your receipt
              </p>
            </div>

            <div className="w-full space-y-3 px-6">
              <Button
                className="w-full h-14"
                onClick={handleCameraCapture}
              >
                <Camera className="mr-2 h-5 w-5" />
                Take Photo
              </Button>
              
              <Button
                variant="outline"
                className="w-full h-14"
                onClick={handleUpload}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload from Gallery
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground px-6">
              Supported formats: JPG, PNG, PDF
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center h-[calc(85vh-180px)] space-y-6">
            <div className="relative">
              <div className="w-32 h-32 bg-accent rounded-lg flex items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-primary border-t-transparent rounded-lg animate-spin" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h3>Processing Receipt...</h3>
              <p className="text-muted-foreground text-sm">
                Extracting transaction details
              </p>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-6 pb-6 overflow-y-auto max-h-[calc(85vh-180px)] hide-scrollbar">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
              <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-green-600">Receipt Scanned Successfully</h4>
                <p className="text-sm text-muted-foreground">Review and confirm the details below</p>
              </div>
            </div>

            {/* Receipt Preview */}
            <div className="bg-accent rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Merchant</span>
                <span>{scannedData.merchant}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Date</span>
                <span>{scannedData.date}</span>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="text-xl">₹{scannedData.amount}</span>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              <h4 className="text-sm text-muted-foreground">Items</h4>
              <div className="space-y-2">
                {scannedData.items.map((item, index) => (
                  <div key={index} className="bg-card border rounded-lg p-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-sm text-blue-600">
              <p>💡 You can edit these details in the next step</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t space-y-2">
          {step === "upload" && (
            <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          )}
          
          {step === "review" && (
            <>
              <Button className="w-full" onClick={handleConfirm}>
                <Check className="mr-2 h-4 w-4" />
                Confirm & Continue
              </Button>
              <Button variant="outline" className="w-full" onClick={handleRetry}>
                <X className="mr-2 h-4 w-4" />
                Scan Again
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}